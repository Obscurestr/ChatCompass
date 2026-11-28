// Cleans text read from a chat screenshot: drops app chrome (times, "Seen", status-bar bits)
// and keeps the messages. Pure function, tested in ocrClean.test.ts.

const TIME = String.raw`\d{1,2}[:.]\d{2}(?:\s?[ap]\.?m\.?)?`;
const TIME_ONLY = new RegExp(`^${TIME}$`, "i");
// A time at the end of a line, with the read ticks apps put after it ("✓✓" comes back as "vv", "7/7", "//",
// or Cyrillic "/У"). The colon is sometimes misread ("21:15" → "21457") or lost ("2115", Macedonian model):
// a 4-digit time only counts right after the end of a sentence, so "rođena sam 2010" keeps its year.
// The tail is only non-letters, anything with "/", or v/vv, so a real word ("ok") is never cut.
const TICKS = String.raw`(?:\s*(?:[^\s\p{L}]{1,4}|[\p{L}/]{0,3}/[\p{L}/]{0,3}|vv?))?`;
const TRAILING_TIME = new RegExp(
  String.raw`(?:\s*(?:\d{1,2}[:.]\d{2}(?:\s?[ap]\.?m\.?)?|[0-2]\d[^\s\p{L}][0-5]\d)|(?<=[?!.…])\s+[0-2]\d[0-5]\d)${TICKS}$`,
  "iu",
);
// "?" at the end of a word is sometimes read as "2" (Albanian model: "sonte2", "mirë2").
const QUESTION_AS_TWO = /(\p{L}{2,})2(?=\s|$)/gu;
// The message box placeholder, possibly merged with status-bar bits: "Message", "Message... 5 mill 82%".
// Not "Message me when you're home" (a word follows).
// English plus the regional app languages (sr/hr/bs/cnr, mk, sq).
const INPUT_PLACEHOLDER =
  /^(?:i?message|send (?:a )?message|type a message|write a message|poruka|napiši poruku|napisi poruku|pošalji poruku|posalji poruku|порака|напиши порака|mesazh|shkruaj (?:një )?mesazh|dërgo (?:një )?mesazh)(?:\.{0,3}|…)?(?:\s+[^\p{L}\s].*)?$/iu;
// Short line ending in a battery level, e.g. "5 mill 82%", "LTE 64 %".
const BATTERY_LINE = /^.{0,16}\b\d{1,3}\s?%$/;
const UI_LINE =
  /^(?:delivered|seen|read|sent|edited|typing\.*|today|yesterday|now|active now|online|message\.*|send message\.*|type a message\.*|reply|liked a message|\d+\s?%|[45]g|lte|wi-?fi|viđeno|videno|pročitano|procitano|poslato|poslano|isporučeno|dostavljeno|uređeno|kuca\.*|piše\.*|danas|juče|jučer|jucer|sada|upravo|aktivan|aktivna|na mreži|odgovori|видено|прочитано|испратено|денес|вчера|сега|активен|активна|пишува\.*|parë|lexuar|dërguar|sot|dje|tani|aktiv|po shkruan\.*|përgjigju)$/iu;

// A picture without text still gives Tesseract something to "read" (e.g. "yr" at ~58% confidence);
// real chat screenshots read at ~95%. Below these thresholds we treat the picture as having no text.
export const MIN_OCR_CONFIDENCE = 70;
const MIN_LETTERS = 6;

/** True when OCR output is worth keeping: confident enough and with a few real letters. */
export function hasReadableText(text: string, confidence: number): boolean {
  const letters = text.match(/\p{L}/gu)?.length ?? 0;
  return confidence >= MIN_OCR_CONFIDENCE && letters >= MIN_LETTERS;
}

/** Normalises one OCR line: collapses spaces, drops a trailing time, fixes "|" read for "I". */
export function cleanLine(line: string): string {
  return line
    .replace(/\s+/g, " ")
    .trim()
    .replace(TRAILING_TIME, "")
    .replace(QUESTION_AS_TWO, "$1?")
    .replace(/(^|\s)\|(?=\s|')/g, "$1I"); // OCR often reads a standalone capital "I" as "|"
}

/** False for app chrome and noise: times, "Seen", status bar, the message box, lines without letters. */
export function keepLine(line: string): boolean {
  if (!/\p{L}/u.test(line)) return false; // no letters at all: icons, numbers, noise
  if (line.length < 2) return false;
  // Status-bar bits like "5G 87%": digits with at most two letters.
  const letters = line.match(/\p{L}/gu)?.length ?? 0;
  if (letters <= 2 && /\d/.test(line)) return false;
  if (TIME_ONLY.test(line) || UI_LINE.test(line)) return false;
  if (INPUT_PLACEHOLDER.test(line) || BATTERY_LINE.test(line)) return false;
  return true;
}

/** Cleans plain OCR text (used when line positions aren't available). */
export function cleanOcrText(raw: string): string {
  const lines = raw
    .replace(/\r/g, "")
    .split("\n")
    .map(cleanLine)
    .filter((line) => !line || keepLine(line)); // keep blank lines as message gaps (collapsed below)

  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
