// Turns OCR lines with positions into a transcript that says who said what.
// In chat apps the other person's bubbles start at the LEFT edge and hers sit on the RIGHT, so:
//   line starting at the common left edge → "Them: …"
//   line starting further right          → "Me: …"   (also her wide bubbles that don't touch the right edge)
//   centred line                          → app chrome (date, "Today", name) → dropped
// Lines of the same bubble are joined. If the picture isn't a two-sided chat (only one side found),
// we don't guess: we return the lines as plain text. Pure function, tested in ocrTranscript.test.ts.
//
// Words are filtered one by one: an emoji or a timestamp read as garbage ("2143vV", conf 15) is dropped,
// the good words of the same line are kept (FR-018, measured on the OCR benchmark).

import { cleanLine, keepLine } from "./ocrClean";

export interface OcrWord {
  text: string;
  confidence: number;
}

export interface OcrLine {
  text: string;
  confidence: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  /** When present, the line is rebuilt from its confident words. */
  words?: OcrWord[];
}

type Side = "them" | "me" | "center";

export interface SpeakerLabels {
  them: string;
  me: string;
}

const DEFAULT_LABELS: SpeakerLabels = { them: "Them", me: "Me" };

export const MIN_LINE_CONFIDENCE = 50; // below this a line is usually garbage
export const MIN_WORD_CONFIDENCE = 50; // emoji and tick marks read as text land well below this
const HEADER = 0.105; // top share of the picture: status bar + contact name
const FOOTER = 0.92; // bottom share: the message box
const SAME_BUBBLE_GAP = 0.75; // gap below this × line height = same bubble
const LEFT_EDGE_MAX = 0.18; // the other person's text starts within this share of the width
const LEFT_TOLERANCE = 0.05; // lines starting this close to the left edge belong to the other person
const CENTRED = 0.06; // |left margin − right margin| below this share = centred line
const CENTRED_MAX_WIDTH = 0.4; // …and narrower than this share of the width

// A word read with low confidence is still kept when it looks like a real word whose last character
// was misread: "Pse2" / "beson”" (a "?" the Albanian model missed) → "Pse?" / "beson?".
// Plain low-confidence words need 3+ letters; emoji garbage ("СС", "E", "[o]") stays out.
const MISREAD_QUESTION = /^(\p{L}{2,})[2”“"]$/u;
const RESCUE_MIN_CONFIDENCE = 5;

function wordText(w: OcrWord): string | null {
  const text = w.text.trim();
  if (!text) return null;
  if (w.confidence >= MIN_WORD_CONFIDENCE) return text;
  if (w.confidence < RESCUE_MIN_CONFIDENCE) return null;
  const q = text.match(MISREAD_QUESTION);
  if (q) return `${q[1]}?`;
  return /^\p{L}{3,}[.,!?…]*$/u.test(text) ? text : null;
}

/** Keeps the trustworthy words of a line; returns null when none are left. */
function confidentText(line: OcrLine): { text: string } | null {
  if (!line.words || line.words.length === 0) {
    return line.confidence >= MIN_LINE_CONFIDENCE ? { text: line.text } : null;
  }
  const kept = line.words.map(wordText).filter((t): t is string => t !== null);
  if (kept.length === 0) return null;
  return { text: kept.join(" ") };
}

export function buildTranscript(
  raw: OcrLine[],
  width: number,
  height: number,
  labels: SpeakerLabels = DEFAULT_LABELS,
): string {
  const lines = raw
    .map((l) => {
      const ok = confidentText(l);
      return ok ? { ...l, ...ok, text: cleanLine(ok.text) } : null;
    })
    .filter((l): l is NonNullable<typeof l> => l !== null && keepLine(l.text))
    .sort((a, b) => a.y0 - b.y0);

  // The other person's bubbles all start at about the same x. Find it among the chat lines.
  const chat = lines.filter((l) => l.y1 >= height * HEADER && l.y0 <= height * FOOTER);
  const minX = Math.min(...chat.map((l) => l.x0));
  const leftEdge = minX <= width * LEFT_EDGE_MAX ? minX : null;

  const sideOf = (line: OcrLine): Side => {
    const left = line.x0;
    const right = width - line.x1;
    // Dates and notices are short and centred; her wide bubble can also look centred, so width matters.
    if (Math.abs(left - right) < width * CENTRED && left > width * 0.15 && line.x1 - line.x0 < width * CENTRED_MAX_WIDTH)
      return "center";
    if (leftEdge !== null && left - leftEdge <= width * LEFT_TOLERANCE) return "them";
    return "me";
  };
  const sided = lines.map((l) => ({ ...l, side: sideOf(l) }));

  const inChat = (l: (typeof sided)[number]) => l.y1 >= height * HEADER && l.y0 <= height * FOOTER;
  const hasThem = sided.some((l) => l.side === "them" && inChat(l));
  const hasMe = sided.some((l) => l.side === "me" && inChat(l));
  if (!hasThem || !hasMe) return lines.map((l) => l.text).join("\n");

  const messages: Array<{ side: Exclude<Side, "center">; text: string; y1: number; lineHeight: number }> = [];
  for (const line of sided) {
    if (line.side === "center" || !inChat(line)) continue;
    const prev = messages[messages.length - 1];
    const lineHeight = line.y1 - line.y0;
    if (prev && prev.side === line.side && line.y0 - prev.y1 < SAME_BUBBLE_GAP * prev.lineHeight) {
      prev.text += ` ${line.text}`;
      prev.y1 = line.y1;
    } else {
      messages.push({ side: line.side, text: line.text, y1: line.y1, lineHeight });
    }
  }

  return messages.map((m) => `${m.side === "them" ? labels.them : labels.me}: ${m.text}`).join("\n");
}
