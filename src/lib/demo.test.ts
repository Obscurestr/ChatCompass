import { describe, expect, it } from "vitest";
import { findFixture, overlap, type DemoFixture } from "./demo";
import type { AnalysisResult } from "./schema";

const result = (risk: AnalysisResult["risk"]): AnalysisResult => ({
  risk,
  summary: "s",
  signs: [],
  nextSteps: ["a", "b"],
  escalate: false,
  floorTriggered: false,
});

const FIXTURES: DemoFixture[] = [
  { id: "A", text: "Did you do the maths homework? / Yeah, question 4 was a pain.", result: result("low") },
  {
    id: "E",
    text: "Let's meet up in the park on Saturday. Don't tell your parents, they'd ruin everything.",
    result: result("high"),
  },
];

describe("demo fallback matching", () => {
  it("matches the exact sample", () => {
    expect(findFixture(FIXTURES[1].text, FIXTURES)?.id).toBe("E");
  });

  it("matches despite case, punctuation, line breaks and small OCR slips", () => {
    const ocr = "lets meet up in the park on saturday\ndont tell your parents they would ruin everything";
    expect(findFixture(ocr, FIXTURES)?.id).toBe("E");
  });

  it("returns null for an unrelated chat", () => {
    expect(findFixture("can you send me the notes from biology class please", FIXTURES)).toBeNull();
  });

  it("overlap is 0 for empty input", () => {
    expect(overlap("", "anything")).toBe(0);
  });
});
