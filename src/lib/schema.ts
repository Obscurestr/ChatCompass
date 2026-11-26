import { z } from "zod";
import { MAX_CHARS, MAX_NEXT_STEPS, MAX_SIGNS, MIN_CHARS } from "../config/app";

// Types per specs/001-proveri-mi-ovo/data-model.md

export const RISKS = ["low", "watch", "high"] as const;
export const SIGN_CATEGORIES = [
  "secrecy",
  "isolation",
  "fast_intimacy",
  "pressure",
  "gifts_favours",
  "personal_info",
  "images",
  "move_platform",
  "identity_doubt",
  "threats_guilt",
  "meeting",
] as const;

export const RiskSchema = z.enum(RISKS);
export const SignCategorySchema = z.enum(SIGN_CATEGORIES);

/** POST /api/analyze body. Text is already masked on the device. */
export const AnalysisRequestSchema = z.object({
  text: z.string().trim().min(MIN_CHARS).max(MAX_CHARS),
});

export const WarningSignSchema = z.object({
  category: SignCategorySchema,
  title: z.string().trim().min(1),
  explanation: z.string().trim().min(1),
  quote: z
    .string()
    .trim()
    .nullable()
    .transform((q) => (q ? q : null)),
});

/**
 * What we accept from the model. Slightly lenient on counts (we cap afterwards),
 * strict on shape and enums so a malformed answer triggers the one retry.
 */
export const ModelOutputSchema = z.object({
  risk: RiskSchema,
  summary: z.string().trim().min(1),
  signs: z.array(WarningSignSchema).default([]),
  nextSteps: z.array(z.string().trim().min(1)).min(1),
  escalate: z.boolean().default(false),
});

/**
 * Plain JSON shape sent to the API as the structured-output format (output_config.format).
 * No transforms, defaults or length limits — those don't translate to JSON Schema; we enforce them in code.
 */
export const ModelOutputFormatSchema = z.object({
  risk: RiskSchema,
  summary: z.string(),
  signs: z.array(
    z.object({
      category: SignCategorySchema,
      title: z.string(),
      explanation: z.string(),
      quote: z.string().nullable(),
    }),
  ),
  nextSteps: z.array(z.string()),
  escalate: z.boolean(),
});

/** What the route returns to the client. */
export const AnalysisResultSchema = z.object({
  risk: RiskSchema,
  summary: z.string(),
  signs: z.array(WarningSignSchema).max(MAX_SIGNS),
  nextSteps: z.array(z.string()).min(1).max(MAX_NEXT_STEPS),
  escalate: z.boolean(),
  floorTriggered: z.boolean(),
});

export const ApiErrorSchema = z.object({
  error: z.enum(["too_short", "too_long", "invalid", "rate_limited", "ai_unavailable"]),
});

export type Risk = z.infer<typeof RiskSchema>;
export type SignCategory = z.infer<typeof SignCategorySchema>;
export type AnalysisRequest = z.infer<typeof AnalysisRequestSchema>;
export type WarningSign = z.infer<typeof WarningSignSchema>;
export type ModelOutput = z.infer<typeof ModelOutputSchema>;
export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;

/** Maps a failed request validation to the contract's error codes. */
export function requestErrorCode(body: unknown): ApiError["error"] {
  if (!body || typeof body !== "object" || typeof (body as { text?: unknown }).text !== "string") {
    return "invalid";
  }
  const len = (body as { text: string }).text.trim().length;
  if (len < MIN_CHARS) return "too_short";
  if (len > MAX_CHARS) return "too_long";
  return "invalid";
}
