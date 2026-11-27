import { describe, expect, it } from "vitest";
import { en } from "../copy/en";
import { speechParts } from "./ReadAloud";
import type { AnalysisResult } from "../lib/schema";

const result: AnalysisResult = {
  risk: "high",
  summary: "They asked for a photo and pushed when you hesitated.",
  signs: [{ category: "images", title: "Asking for a photo of you", explanation: "Once sent, you can't control it.", quote: "send me a pic of you" }],
  nextSteps: ["Don't send anything else.", "Talk to an adult you trust."],
  escalate: true,
  floorTriggered: true,
};

describe("speechParts", () => {
  const parts = speechParts(result, en, "rs");

  it("reads the headline, summary, signs, steps and help contacts in order", () => {
    expect(parts[0]).toBe("This is worth taking seriously.");
    expect(parts).toContain("Asking for a photo of you. Once sent, you can't control it.");
    expect(parts).toContain("Talk to an adult you trust.");
    expect(parts[parts.length - 1]).toMatch(/NADEL, 116 111.*Police, 192/);
  });

  it("never reads her own words (the quote)", () => {
    expect(parts.join(" ")).not.toContain("send me a pic of you");
  });
});
