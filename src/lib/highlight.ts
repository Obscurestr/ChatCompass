// Finds where the model's quotes sit in the user's text so they can be marked (FR-005).
// Tolerant of case, whitespace and quote/apostrophe style; never invents a position.

export interface Mark {
  start: number;
  end: number;
  signIndex: number;
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Strip wrapping quotes and trailing ellipsis the model sometimes adds. */
function cleanQuote(quote: string): string {
  return quote
    .trim()
    .replace(/^["“”'‘’]+|["“”'‘’]+$/g, "")
    .replace(/(?:\.\.\.|…)$/, "")
    .trim();
}

/** Regex that matches the quote with any whitespace run, any apostrophe/quote style, case-insensitive. */
function tolerantPattern(quote: string): RegExp {
  const parts = cleanQuote(quote)
    .split(/\s+/)
    .map((word) =>
      escape(word)
        .replace(/['‘’`]/g, "['‘’`]")
        .replace(/["“”]/g, '["“”]')
        .replace(/(?:\\\.){3}|…/g, "(?:\\.\\.\\.|…)"),
    );
  return new RegExp(parts.join("\\s+"), "gi");
}

/** All [start, end) ranges where the quote appears in the text. */
export function findQuote(text: string, quote: string | null | undefined): Array<[number, number]> {
  if (!quote) return [];
  const cleaned = cleanQuote(quote);
  if (cleaned.length < 2) return [];
  const ranges: Array<[number, number]> = [];
  for (const m of text.matchAll(tolerantPattern(cleaned))) {
    if (m.index !== undefined && m[0].length > 0) ranges.push([m.index, m.index + m[0].length]);
  }
  return ranges;
}

/** True if the quote can be located in the text (server rule 3: otherwise drop the quote). */
export function quoteFound(text: string, quote: string | null | undefined): boolean {
  return findQuote(text, quote).length > 0;
}

const overlaps = (a: [number, number], b: Mark) => a[0] < b.end && b.start < a[1];

/**
 * One mark per sign with a findable quote. If a quote appears several times, the first
 * occurrence that doesn't overlap an earlier mark wins. Result is sorted by position.
 */
export function findMarks(text: string, signs: Array<{ quote: string | null }>): Mark[] {
  const marks: Mark[] = [];
  signs.forEach((sign, signIndex) => {
    const free = findQuote(text, sign.quote).find((range) => !marks.some((m) => overlaps(range, m)));
    if (free) marks.push({ start: free[0], end: free[1], signIndex });
  });
  return marks.sort((a, b) => a.start - b.start);
}
