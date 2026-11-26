import { describe, expect, it } from "vitest";
import { mask, MASK_TOKENS } from "./mask";

describe("mask — phones", () => {
  it.each([
    "+381 64 123 4567",
    "064 123 4567",
    "064/123-4567",
    "0641234567",
    "+44 7700 900123",
    "(555) 123-4567",
    "00381 11 234 5678",
  ])("masks %s", (phone) => {
    const r = mask(`call me on ${phone} tonight`);
    expect(r.masked).toBe(`call me on ${MASK_TOKENS.phone} tonight`);
    expect(r.counts.phone).toBe(1);
  });

  it.each([
    "Question 4 was a pain",
    "I'm 16 and in class 3",
    "see you at 10:30",
    "on 01.12.2024 we talked",
    "scored 120 points",
    "it costs 0.99",
  ])("leaves harmless numbers alone: %s", (text) => {
    const r = mask(text);
    expect(r.masked).toBe(text);
    expect(r.counts.phone).toBe(0);
  });
});

describe("mask — emails and links", () => {
  it("masks emails", () => {
    const r = mask("write to example.mail@gmail.com please");
    expect(r.masked).toBe(`write to ${MASK_TOKENS.email} please`);
    expect(r.counts.email).toBe(1);
  });

  it.each(["https://example.com/profile", "http://x.io", "www.insta.com/someone", "example.com/profile"])(
    "masks link %s and keeps sentence punctuation",
    (url) => {
      const r = mask(`here's my link ${url}.`);
      expect(r.masked).toBe(`here's my link ${MASK_TOKENS.url}.`);
      expect(r.counts.url).toBe(1);
    },
  );

  it("does not treat an email as a link", () => {
    const r = mask("mail me at a.b@site.rs");
    expect(r.counts).toEqual({ phone: 0, email: 1, url: 0 });
  });

  it("does not mask ordinary sentences with dots", () => {
    const text = "Yeah. Same.Let's ask the teacher tomorrow.";
    expect(mask(text).masked).toBe(text);
  });
});

describe("mask — sample G", () => {
  it("masks phone, email and link, keeps the rest", () => {
    const g =
      "Text me on +381 64 123 4567 or email me at example.mail@gmail.com, here's my link https://example.com/profile. Don't tell your mum.";
    const r = mask(g);
    expect(r.counts).toEqual({ phone: 1, email: 1, url: 1 });
    expect(r.masked).toBe(
      `Text me on ${MASK_TOKENS.phone} or email me at ${MASK_TOKENS.email}, here's my link ${MASK_TOKENS.url}. Don't tell your mum.`,
    );
  });
});
