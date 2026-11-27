// On-device screenshot reading (constitution II, v1.2.0).
// The image is read inside the browser by a Web Worker; it is never uploaded, sent to the AI,
// stored, or cached. Only the extracted text is kept in memory, and it is masked on Check.
// tesseract.js is loaded lazily, only when she picks a screenshot, and only from our own domain.
//
// Steps per picture:
// 1. prepareForOcr: flip white-on-dark bubbles (her iMessage bubbles, dark mode) to black on white.
// 2. Tesseract reads it and reports each line's position.
// 3. buildTranscript: left bubbles → "Them:", right bubbles → "Me:", app chrome dropped.

import { cleanOcrText, hasReadableText } from "./ocrClean";
import { prepareForOcr } from "./ocrImage";
import { buildTranscript, type OcrLine } from "./ocrTranscript";

export type OcrProgress = (fileIndex: number, fileCount: number, fraction: number) => void;

const MAX_WIDTH = 1400; // larger photos are scaled down: faster, and much less memory on phones

/** Draws the picture onto a canvas, prepares it, and returns it as a PNG blob plus its size. */
async function preparedImage(file: File): Promise<{ blob: Blob; width: number; height: number } | null> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return null; // a format the browser can't decode here: fall back to reading the file directly
  }
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    bitmap.close();
    return null;
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const pixels = ctx.getImageData(0, 0, width, height);
  prepareForOcr(pixels.data, width, height);
  ctx.putImageData(pixels, 0, 0);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  canvas.width = canvas.height = 0; // free the pixels right away
  return blob ? { blob, width, height } : null;
}

export async function readScreenshots(files: File[], onProgress: OcrProgress): Promise<string> {
  const { createWorker, OEM } = await import("tesseract.js");
  const base = `${window.location.origin}/ocr`;
  let current = 0;

  const worker = await createWorker("eng", OEM.LSTM_ONLY, {
    workerPath: `${base}/worker.min.js`,
    corePath: base,
    langPath: base,
    gzip: true,
    cacheMethod: "none", // leave no trace in the browser, not even the language model
    logger: (m: { status: string; progress: number }) => {
      if (m.status === "recognizing text") onProgress(current, files.length, m.progress);
    },
  });

  try {
    const parts: string[] = [];
    for (current = 0; current < files.length; current++) {
      onProgress(current, files.length, 0);
      const prepared = await preparedImage(files[current]);
      const { data } = await worker.recognize(prepared?.blob ?? files[current], {}, { blocks: true, text: true });

      const lines: OcrLine[] =
        data.blocks?.flatMap((b) =>
          b.paragraphs.flatMap((p) => p.lines.map((l) => ({ text: l.text, confidence: l.confidence, ...l.bbox }))),
        ) ?? [];
      const text =
        prepared && lines.length > 0 ? buildTranscript(lines, prepared.width, prepared.height) : cleanOcrText(data.text);

      if (hasReadableText(text, data.confidence)) parts.push(text);
    }
    return parts.join("\n\n");
  } finally {
    await worker.terminate();
  }
}
