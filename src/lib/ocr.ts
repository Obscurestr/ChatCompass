// On-device screenshot reading (constitution II, v1.2.0).
// The image is read inside the browser by a Web Worker; it is never uploaded, sent to the AI,
// stored, or cached. Only the extracted text goes into the textarea, and it is masked on Check.
// tesseract.js is loaded lazily, only when she picks a screenshot, and only from our own domain.

import { cleanOcrText } from "./ocrClean";

export type OcrProgress = (fileIndex: number, fileCount: number, fraction: number) => void;

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
      const { data } = await worker.recognize(files[current]);
      const text = cleanOcrText(data.text);
      if (text) parts.push(text);
    }
    return parts.join("\n\n");
  } finally {
    await worker.terminate();
  }
}
