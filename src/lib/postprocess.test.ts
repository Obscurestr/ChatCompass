import { describe, expect, it } from "vitest";
import { en } from "../copy/en";
import { claimsSafe, firstSentences, floorOnlyResult, postprocess } from "./postprocess";
import type { ModelOutput } from "./schema";

const TEXT = "Let's meet up in the park on Saturday. Don't tell your parents, they'd ruin everything.";

const base: ModelOutput = {
  risk: "watch",
  summary: "Someone asks you to keep secrets from your parents.",
  signs: [
    { category: "secrecy", title: "Wants it kept secret", explanation: "…", quote: "Don't tell your parents" },
    { category: "meeting", title: "Wants to meet", explanation: "…", quote: "meet me at the mall" },
  ],
  nextSteps: ["You don't have to reply.", "Talk to an adult you trust."],
  escalate: false,
};

describe("postprocess", () => {
  it("rule 2: the floor forces high + escalate and replaces a summary written for a lower level", () => {
    const r = postprocess(TEXT, base, true);
    expect(r.risk).toBe("high");
    expect(r.escalate).toBe(true);
    expect(r.floorTriggered).toBe(true);
    expect(r.summary).toBe(en.result.summaryDefault.high);
  });

  it("keeps the model's risk and summary when the floor didn't trigger", () => {
    const r = postprocess(TEXT, base, false);
    expect(r.risk).toBe("watch");
    expect(r.summary).toBe(base.summary);
  });

  it("rule 3: drops a quote that isn't in the text but keeps the sign", () => {
    const r = postprocess(TEXT, base, false);
    expect(r.signs).toHaveLength(2);
    expect(r.signs[0].quote).toBe("Don't tell your parents");
    expect(r.signs[1].quote).toBeNull();
  });

  it("rule 4: replaces a summary that calls the chat safe", () => {
    const r = postprocess(TEXT, { ...base, risk: "low", summary: "This conversation is safe." }, false);
    expect(r.summary).toBe(en.result.summaryDefault.low);
  });

  it("rule 4: drops next steps that call the person safe and tops up to at least 2", () => {
    const r = postprocess(
      TEXT,
      { ...base, nextSteps: ["He seems totally safe, keep chatting.", "Talk to an adult you trust."] },
      false,
    );
    expect(r.nextSteps).not.toContain("He seems totally safe, keep chatting.");
    expect(r.nextSteps.length).toBeGreaterThanOrEqual(2);
    expect(r.summary).toBe(en.result.summaryDefault.watch);
  });

  it("rule 5: caps signs at 6 and next steps at 4", () => {
    const sign = base.signs[0];
    const r = postprocess(
      TEXT,
      { ...base, signs: Array(9).fill(sign), nextSteps: ["a", "b", "c", "d", "e", "f"] },
      false,
    );
    expect(r.signs).toHaveLength(6);
    expect(r.nextSteps).toHaveLength(4);
  });
});

describe("summary length (FR-003)", () => {
  it("keeps at most 2 sentences", () => {
    const r = postprocess(TEXT, { ...base, summary: "One. Two! Three? Four." }, false);
    expect(r.summary).toBe("One. Two!");
  });

  it("leaves a short summary alone", () => {
    expect(firstSentences("Just one sentence.", 2)).toBe("Just one sentence.");
  });
});

describe("claimsSafe", () => {
  it.each(["This chat is safe.", "He seems harmless.", "There's nothing to worry about.", "It looks completely safe"])(
    "flags %j",
    (s) => expect(claimsSafe(s)).toBe(true),
  );

  it.each([
    "Take screenshots and save them somewhere safe.",
    "Stay safe and talk to someone you trust.",
    "Your safety matters.",
  ])("allows %j", (s) => expect(claimsSafe(s)).toBe(false));
});

describe("floorOnlyResult", () => {
  it("is high, escalated, with help-first next steps", () => {
    const r = floorOnlyResult();
    expect(r).toMatchObject({ risk: "high", escalate: true, floorTriggered: true, signs: [] });
    expect(r.nextSteps.length).toBeGreaterThanOrEqual(2);
  });
});

describe("claimsSafe — regional languages (FR-010, FR-025)", () => {
  it.each([
    ["Ova osoba je potpuno bezbedna.", "Sačuvaj skrinšotove na sigurnom mestu."],
    ["Razgovor izgleda bezopasno.", "Sigurno ti je bilo neprijatno."],
    ["Nema razloga za brigu.", "Ima razloga da porazgovaraš sa nekim."],
    ["Разговорот е безбеден.", "Зачувај ги на безбедно место."],
    ["Biseda duket e sigurt.", "Ruaji në një vend të sigurt."],
  ])("flags %j but not %j", (claim, fine) => {
    expect(claimsSafe(claim)).toBe(true);
    expect(claimsSafe(fine)).toBe(false);
  });

  it("uses the chosen language for defaults", () => {
    expect(floorOnlyResult("sr").summary).toContain("razgovaraj");
    expect(floorOnlyResult("mk").nextSteps.at(-1)).toBe("Ова не е твоја вина.");
  });
});
