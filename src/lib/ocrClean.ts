// Cleans text read from a chat screenshot: drops app chrome (times, "Seen", status-bar bits)
// and keeps the messages. Pure function, tested in ocrClean.test.ts.

const TIME = String.raw`\d{1,2}[:.]\d{2}(?:\s?[ap]\.?m\.?)?`;
const TIME_ONLY = new RegExp(`^${TIME}$`, "i");
const TRAILING_TIME = new RegExp(`\\s+${TIME}$`, "i");
const UI_LINE =
  /^(?:delivered|seen|read|sent|edited|typing\.*|today|yesterday|now|active now|online|message\.*|send message\.*|type a message\.*|reply|liked a message|\d+\s?%|[45]g|lte|wi-?fi)$/i;

export function cleanOcrText(raw: string): string {
  const lines = raw
    .replace(/\r/g, "")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .map((line) => line.replace(TRAILING_TIME, ""))
    // OCR often reads a standalone capital "I" as "|".
    .map((line) => line.replace(/(^|\s)\|(?=\s|')/g, "$1I"))
    .filter((line) => {
      if (!line) return true; // keep blank lines as message gaps (collapsed below)
      if (!/\p{L}/u.test(line)) return false; // no letters at all: icons, numbers, noise
      if (line.length < 2) return false;
      // Status-bar bits like "5G 87%": digits with at most two letters.
      const letters = line.match(/\p{L}/gu)?.length ?? 0;
      if (letters <= 2 && /\d/.test(line)) return false;
      if (TIME_ONLY.test(line) || UI_LINE.test(line)) return false;
      return true;
    });

  return lines
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
