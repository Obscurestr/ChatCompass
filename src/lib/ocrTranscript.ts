// Turns OCR lines with positions into a transcript that says who said what.
// In chat apps the other person's bubbles sit on the LEFT and hers on the RIGHT, so:
//   left-aligned line  → "Them: …"
//   right-aligned line → "Me: …"
//   centred line       → app chrome (date, name, status bar) → dropped
// Lines of the same bubble are joined. If the picture isn't a two-sided chat (only one side found),
// we don't guess: we return the lines as plain text. Pure function, tested in ocrTranscript.test.ts.

import { cleanLine, keepLine } from "./ocrClean";

export interface OcrLine {
  text: string;
  confidence: number;
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

type Side = "them" | "me" | "center";

export const MIN_LINE_CONFIDENCE = 50; // below this a line is usually garbage
const SIDE_MARGIN = 0.12; // share of the width by which one margin must beat the other
const HEADER = 0.105; // top share of the picture: status bar + contact name
const FOOTER = 0.92; // bottom share: the message box
const SAME_BUBBLE_GAP = 0.75; // gap below this × line height = same bubble

function sideOf(line: OcrLine, width: number): Side {
  const left = line.x0;
  const right = width - line.x1;
  const diff = (right - left) / width;
  if (diff > SIDE_MARGIN) return "them";
  if (diff < -SIDE_MARGIN) return "me";
  return "center";
}

export function buildTranscript(raw: OcrLine[], width: number, height: number): string {
  const lines = raw
    .filter((l) => l.confidence >= MIN_LINE_CONFIDENCE)
    .map((l) => ({ ...l, text: cleanLine(l.text) }))
    .filter((l) => keepLine(l.text))
    .sort((a, b) => a.y0 - b.y0)
    .map((l) => ({ ...l, side: sideOf(l, width) }));

  const hasThem = lines.some((l) => l.side === "them");
  const hasMe = lines.some((l) => l.side === "me");
  if (!hasThem || !hasMe) return lines.map((l) => l.text).join("\n");

  const messages: Array<{ side: Exclude<Side, "center">; text: string; y1: number; lineHeight: number }> = [];
  for (const line of lines) {
    if (line.side === "center") continue;
    if (line.y1 < height * HEADER || line.y0 > height * FOOTER) continue;
    const prev = messages[messages.length - 1];
    const lineHeight = line.y1 - line.y0;
    if (prev && prev.side === line.side && line.y0 - prev.y1 < SAME_BUBBLE_GAP * prev.lineHeight) {
      prev.text += ` ${line.text}`;
      prev.y1 = line.y1;
    } else {
      messages.push({ side: line.side, text: line.text, y1: line.y1, lineHeight });
    }
  }

  return messages.map((m) => `${m.side === "them" ? "Them" : "Me"}: ${m.text}`).join("\n");
}
