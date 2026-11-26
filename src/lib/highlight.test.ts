import { describe, expect, it } from "vitest";
import { findMarks, findQuote, quoteFound } from "./highlight";

const D =
  "You're so much more mature than other girls your age. / Thanks. / Send me a pic of you, just for me, nobody else will see it. / I don't know… / Come on, don't you trust me?";

const slice = (text: string, [s, e]: [number, number]) => text.slice(s, e);

describe("findQuote", () => {
  it("finds an exact quote", () => {
    const [range] = findQuote(D, "Send me a pic of you");
    expect(slice(D, range)).toBe("Send me a pic of you");
  });

  it("is case-insensitive and whitespace-tolerant", () => {
    const text = "Just don't   tell\nanyone about us";
    const [range] = findQuote(text, "just don't tell anyone");
    expect(slice(text, range)).toBe("Just don't   tell\nanyone");
  });

  it("matches straight vs curly apostrophes", () => {
    const [range] = findQuote(D, "don’t you trust me");
    expect(slice(D, range)).toBe("don't you trust me");
  });

  it("ignores wrapping quotes and a trailing ellipsis added by the model", () => {
    expect(quoteFound(D, '"nobody else will see it..."')).toBe(true);
  });

  it("returns nothing for a quote that isn't in the text, or for null", () => {
    expect(findQuote(D, "send me your address")).toEqual([]);
    expect(findQuote(D, null)).toEqual([]);
    expect(quoteFound(D, "")).toBe(false);
  });
});

describe("findMarks", () => {
  it("returns one mark per findable quote, sorted by position, with the sign index", () => {
    const marks = findMarks(D, [
      { quote: "don't you trust me" },
      { quote: "not in the text" },
      { quote: null },
      { quote: "more mature than other girls" },
    ]);
    expect(marks.map((m) => m.signIndex)).toEqual([3, 0]);
    expect(D.slice(marks[0].start, marks[0].end)).toBe("more mature than other girls");
  });

  it("does not let marks overlap; uses a later occurrence when needed", () => {
    const text = "just for me. later: just for me";
    const marks = findMarks(text, [{ quote: "just for me" }, { quote: "just for me" }]);
    expect(marks).toHaveLength(2);
    expect(marks[0].start).toBe(0);
    expect(marks[1].start).toBe(text.lastIndexOf("just for me"));
  });

  it("drops a quote whose only occurrence is already marked", () => {
    const marks = findMarks(D, [{ quote: "Send me a pic of you" }, { quote: "a pic of you" }]);
    expect(marks).toHaveLength(1);
  });
});
