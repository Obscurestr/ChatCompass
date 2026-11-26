// POST /api/analyze — contracts/analyze-api.md
// Privacy (constitution II, FR-009): the request text is never logged, stored or cached.
// The only log line per request is { status, ms }.

import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import FIXTURES_JSON from "../../../demo/fixtures.json";
import { findFixture, type DemoFixture } from "../../../lib/demo";
import { floorOnlyResult, postprocess } from "../../../lib/postprocess";
import { SYSTEM_PROMPT, buildUserMessage } from "../../../lib/prompt";
import { safetyFloor } from "../../../lib/safetyFloor";
import {
  AnalysisRequestSchema,
  AnalysisResultSchema,
  ModelOutputFormatSchema,
  ModelOutputSchema,
  requestErrorCode,
  type ApiError,
  type ModelOutput,
} from "../../../lib/schema";

const FIXTURES = FIXTURES_JSON as DemoFixture[];
const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5";
const TIMEOUT_MS = 20_000;

// The SDK retries 429/5xx/connection errors once; our own loop retries once on an unusable answer.
// Created on first use so a missing key fails inside the try below (and can fall back) instead of at import.
let client: Anthropic | null = null;
const getClient = () => (client ??= new Anthropic({ timeout: TIMEOUT_MS, maxRetries: 1 }));

// T030a — demo fallback, only with DEMO_MODE=fallback.
const DEMO_FALLBACK = process.env.DEMO_MODE === "fallback";
// Never softer than the safety floor: a matched fixture below high is ignored when the floor triggered.
const demoResult = (text: string, floorTriggered: boolean) => {
  if (!DEMO_FALLBACK) return null;
  const result = findFixture(text, FIXTURES)?.result ?? null;
  return result && (!floorTriggered || result.risk === "high") ? result : null;
};

// ---- best-effort in-memory rate limit: 10 requests / 10 min / IP (per server instance) ----
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return recent.length > LIMIT;
}

function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

// ---- response helpers (the only place we log) ----
function reply(body: unknown, status: number, started: number): Response {
  console.info(JSON.stringify({ route: "analyze", status, ms: Date.now() - started }));
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}
const fail = (error: ApiError["error"], status: number, started: number) => reply({ error }, status, started);

type ModelAttempt = { kind: "ok"; output: ModelOutput } | { kind: "refusal" } | { kind: "unusable" };

async function askModel(text: string): Promise<ModelAttempt> {
  const response = await getClient().messages.parse({
    model: MODEL,
    max_tokens: 4000,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserMessage(text) }],
    // Short, structured classification: low effort keeps latency inside the 10 s goal.
    output_config: { effort: "low", format: zodOutputFormat(ModelOutputFormatSchema) },
  });

  if (response.stop_reason === "refusal") return { kind: "refusal" };
  const parsed = ModelOutputSchema.safeParse(response.parsed_output);
  return parsed.success ? { kind: "ok", output: parsed.data } : { kind: "unusable" };
}

export async function POST(request: Request): Promise<Response> {
  const started = Date.now();

  if (rateLimited(clientIp(request))) return fail("rate_limited", 429, started);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("invalid", 400, started);
  }
  const input = AnalysisRequestSchema.safeParse(body);
  if (!input.success) return fail(requestErrorCode(body), 400, started);
  const text = input.data.text;

  const floor = safetyFloor(text);

  try {
    let attempt = await askModel(text);
    if (attempt.kind === "unusable") attempt = await askModel(text); // one retry on an invalid answer

    if (attempt.kind === "ok") {
      const result = AnalysisResultSchema.parse(postprocess(text, attempt.output, floor.triggered));
      return reply(result, 200, started);
    }
    // The model declined or gave nothing usable: demo fixture if enabled, else — if the floor already
    // found danger — never leave her without an answer: a conservative high result with help first.
    const demo = demoResult(text, floor.triggered);
    if (demo) return reply(demo, 200, started);
    if (floor.triggered) return reply(floorOnlyResult(), 200, started);
    return fail("ai_unavailable", 502, started);
  } catch (error) {
    const demo = demoResult(text, floor.triggered);
    if (demo) return reply(demo, 200, started);
    if (floor.triggered) return reply(floorOnlyResult(), 200, started);
    // Log only status + error type (e.g. "authentication_error") — never the message, which can echo request details.
    const apiError = error instanceof Anthropic.APIError ? error : null;
    const errorType = (apiError?.error as { error?: { type?: string } } | undefined)?.error?.type;
    console.warn(
      JSON.stringify({
        route: "analyze",
        upstreamStatus: apiError?.status ?? null,
        errorType: errorType ?? (error instanceof Anthropic.APIConnectionError ? "connection" : "other"),
      }),
    );
    const timedOut = error instanceof Anthropic.APIConnectionTimeoutError;
    return fail("ai_unavailable", timedOut ? 504 : 502, started);
  }
}
