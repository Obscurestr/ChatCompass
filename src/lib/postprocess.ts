// Server-side rules applied to the model's answer before it reaches the user
// (contracts/analyze-api.md → Server rules 2–5). Pure and deterministic so it can be tested.

import { MAX_NEXT_STEPS, MAX_SIGNS, MIN_NEXT_STEPS } from "../config/app";
import { en } from "../copy/en";
import { quoteFound } from "./highlight";
import type { AnalysisResult, ModelOutput, Risk } from "./schema";

// Claims that the chat or the person is safe (FR-010). "save it somewhere safe" is fine; "this is safe" is not.
const SAFE_CLAIM =
  /\b(?:is|are|was|seems?|looks?|sounds?|feels?|be)\s+(?:completely\s+|totally\s+|perfectly\s+|probably\s+|pretty\s+)?(?:safe|harmless|not dangerous|trustworthy)\b|\bnothing to worry about\b|\bno need to worry\b|\b(?:safe|harmless)\s+(?:chat|conversation|person|friend)\b/i;

export function claimsSafe(sentence: string): boolean {
  return SAFE_CLAIM.test(sentence);
}

/** Keeps the first `n` sentences (split after . ! ? or … followed by whitespace). */
export function firstSentences(text: string, n: number): string {
  const sentences = text.trim().split(/(?<=[.!?…])\s+/);
  return sentences.slice(0, n).join(" ");
}

/** A conservative result when the model can't answer but the safety floor already found danger. */
export function floorOnlyResult(): AnalysisResult {
  return {
    risk: "high",
    summary: en.result.summaryDefault.high,
    signs: [],
    nextSteps: [...en.result.nextStepsDefault.high],
    escalate: true,
    floorTriggered: true,
  };
}

export function postprocess(text: string, model: ModelOutput, floorTriggered: boolean): AnalysisResult {
  // Rule 2: the safety floor overrides the model.
  const risk: Risk = floorTriggered ? "high" : model.risk;
  const escalate = floorTriggered || model.escalate;

  // Rule 3: drop quotes that aren't in her text, keep the sign. Rule 5: cap at 6.
  const signs = model.signs.slice(0, MAX_SIGNS).map((sign) => ({
    ...sign,
    quote: sign.quote && quoteFound(text, sign.quote) ? sign.quote : null,
  }));

  // Rule 4: never claim the chat or person is safe.
  let nextSteps = model.nextSteps.filter((step) => !claimsSafe(step));
  let summary = model.summary;
  const anySafeClaim = claimsSafe(summary) || nextSteps.length < model.nextSteps.length;
  // Also replace the summary when the floor raised the risk: the model's wording no longer fits the level.
  if (anySafeClaim || (floorTriggered && model.risk !== "high")) {
    summary = en.result.summaryDefault[risk];
  }

  // FR-003: summary is at most 2 sentences.
  summary = firstSentences(summary, 2);

  if (nextSteps.length < MIN_NEXT_STEPS) {
    const defaults = en.result.nextStepsDefault[risk].filter((d) => !nextSteps.includes(d));
    nextSteps = [...nextSteps, ...defaults];
  }
  nextSteps = nextSteps.slice(0, MAX_NEXT_STEPS);

  return { risk, summary, signs, nextSteps, escalate, floorTriggered };
}
