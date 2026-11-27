// T030a / FR-017 — demo fallback. Only active when DEMO_MODE=fallback.
// If the AI call fails, return a pre-recorded result for a known sample so the live demo never dies.
// Matching is by word overlap (not an exact hash) so it also works for text read from screenshots,
// which never comes out exactly the same as the pasted sample.

import type { AnalysisResult } from "./schema";

export interface DemoFixture {
  id: string;
  /** Language the result was recorded in (default "en"). */
  lang?: string;
  text: string;
  result: AnalysisResult;
}

export const MIN_OVERLAP = 0.6;

function words(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/['’]/g, "")
      .split(/[^\p{L}\p{N}]+/u)
      .filter((w) => w.length >= 2),
  );
}

/** Jaccard overlap of the two texts' word sets, 0–1. */
export function overlap(a: string, b: string): number {
  const wa = words(a);
  const wb = words(b);
  if (wa.size === 0 || wb.size === 0) return 0;
  let shared = 0;
  for (const w of wa) if (wb.has(w)) shared++;
  return shared / (wa.size + wb.size - shared);
}

/** The best-matching fixture, or null if none overlaps enough. */
export function findFixture(text: string, fixtures: DemoFixture[]): DemoFixture | null {
  let best: DemoFixture | null = null;
  let bestScore = 0;
  for (const fixture of fixtures) {
    const score = overlap(text, fixture.text);
    if (score > bestScore) {
      best = fixture;
      bestScore = score;
    }
  }
  return bestScore >= MIN_OVERLAP ? best : null;
}
