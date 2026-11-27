// Prepares a screenshot for OCR, in the browser, before Tesseract reads it.
// Problem: Tesseract reads dark text on a light background well, but misses or garbles WHITE text
// on dark/coloured bubbles (e.g. her own blue iMessage bubbles, dark mode).
// Fix: grey-scale the picture; where most of the neighbourhood is dark (inside a dark bubble or a
// dark-mode screen), flip it to black text on white. Coloured fringes at bubble edges become white.
// Pure function on RGBA pixels, edited in place.

const DARK = 170; // luminance below this counts as a dark pixel
const SATURATED = 50; // max(r,g,b) - min(r,g,b) above this counts as coloured

export function prepareForOcr(rgba: Uint8ClampedArray, width: number, height: number): void {
  const n = width * height;
  const lum = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    lum[i] = 0.299 * rgba[i * 4] + 0.587 * rgba[i * 4 + 1] + 0.114 * rgba[i * 4 + 2];
  }

  // Integral image of "is dark", for the share of dark pixels around each pixel in O(1).
  const w1 = width + 1;
  const sum = new Float64Array(w1 * (height + 1));
  for (let y = 1; y <= height; y++) {
    let row = 0;
    for (let x = 1; x <= width; x++) {
      row += lum[(y - 1) * width + (x - 1)] < DARK ? 1 : 0;
      sum[y * w1 + x] = sum[(y - 1) * w1 + x] + row;
    }
  }

  const r = Math.max(8, Math.round(width / 40));
  for (let y = 0; y < height; y++) {
    const y0 = Math.max(0, y - r);
    const y1 = Math.min(height, y + r + 1);
    for (let x = 0; x < width; x++) {
      const x0 = Math.max(0, x - r);
      const x1 = Math.min(width, x + r + 1);
      const darkShare =
        (sum[y1 * w1 + x1] - sum[y0 * w1 + x1] - sum[y1 * w1 + x0] + sum[y0 * w1 + x0]) / ((x1 - x0) * (y1 - y0));
      const i = y * width + x;
      const p = i * 4;
      const sat = Math.max(rgba[p], rgba[p + 1], rgba[p + 2]) - Math.min(rgba[p], rgba[p + 1], rgba[p + 2]);

      let v: number;
      if (darkShare > 0.5) v = lum[i] > DARK ? 0 : 255; // inside a dark area: light text → black, dark → white
      else if (darkShare > 0.1 && lum[i] < DARK && sat > SATURATED) v = 255; // coloured bubble edge → white
      else v = lum[i]; // normal light area: keep as grey

      rgba[p] = rgba[p + 1] = rgba[p + 2] = v;
      rgba[p + 3] = 255;
    }
  }
}
