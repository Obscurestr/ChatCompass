// Copies the on-device OCR files (tesseract.js worker, WASM core, English data) into public/ocr,
// so the browser loads them from our own domain — no third-party CDN requests (constitution II).
// Runs automatically before `npm run dev` and `npm run build`. public/ocr is git-ignored.

import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const out = join(process.cwd(), "public", "ocr");
mkdirSync(out, { recursive: true });

const pkgDir = (name) => dirname(require.resolve(`${name}/package.json`));

// Worker script
copyFileSync(join(pkgDir("tesseract.js"), "dist", "worker.min.js"), join(out, "worker.min.js"));

// WASM core: tesseract.js picks the right variant (SIMD or not) per device, LSTM engine only.
const coreDir = pkgDir("tesseract.js-core");
for (const file of readdirSync(coreDir).filter((f) => f.endsWith(".wasm.js"))) {
  copyFileSync(join(coreDir, file), join(out, file));
}

// English language data (smaller "best_int" model, ~3 MB gzipped)
copyFileSync(
  join(pkgDir("@tesseract.js-data/eng"), "4.0.0_best_int", "eng.traineddata.gz"),
  join(out, "eng.traineddata.gz"),
);

console.log(`OCR assets copied to ${out}`);
