// Copies the on-device OCR files (tesseract.js worker, WASM core, language data) into public/ocr,
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

// Language data, one model per UI language (smaller "best_int" models, 0.7–3 MB gzipped each).
// The browser downloads only the one for the chosen language (src/i18n/locales.ts → LANG_INFO.ocr).
for (const model of ["eng", "srp_latn", "hrv", "bos", "mkd", "sqi"]) {
  copyFileSync(
    join(pkgDir(`@tesseract.js-data/${model}`), "4.0.0_best_int", `${model}.traineddata.gz`),
    join(out, `${model}.traineddata.gz`),
  );
}

console.log(`OCR assets copied to ${out}`);
