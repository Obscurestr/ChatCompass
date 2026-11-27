import { describe, expect, it } from "vitest";
import { prepareForOcr } from "./ocrImage";

// Build a w×h RGBA image filled with one colour, then paint some pixels.
function image(w: number, h: number, fill: [number, number, number]) {
  const px = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) px.set([...fill, 255], i * 4);
  return {
    px,
    set: (x: number, y: number, c: [number, number, number]) => px.set([...c, 255], (y * w + x) * 4),
    grey: (x: number, y: number) => px[(y * w + x) * 4],
  };
}

const BLUE: [number, number, number] = [10, 132, 255];
const WHITE: [number, number, number] = [255, 255, 255];
const BLACK: [number, number, number] = [0, 0, 0];

describe("prepareForOcr", () => {
  it("turns white text on a blue bubble into black text on white", () => {
    const img = image(40, 40, BLUE);
    img.set(20, 20, WHITE); // a "text" pixel
    prepareForOcr(img.px, 40, 40);
    expect(img.grey(20, 20)).toBe(0); // text → black
    expect(img.grey(5, 5)).toBe(255); // bubble → white
  });

  it("leaves black text on a white page alone", () => {
    const img = image(40, 40, WHITE);
    img.set(20, 20, BLACK);
    prepareForOcr(img.px, 40, 40);
    expect(img.grey(20, 20)).toBe(0);
    expect(img.grey(5, 5)).toBe(255);
  });

  it("handles dark mode (white text on black)", () => {
    const img = image(40, 40, BLACK);
    img.set(20, 20, WHITE);
    prepareForOcr(img.px, 40, 40);
    expect(img.grey(20, 20)).toBe(0);
    expect(img.grey(5, 5)).toBe(255);
  });

  it("outputs grey-scale with full opacity", () => {
    const img = image(10, 10, [200, 100, 50]);
    prepareForOcr(img.px, 10, 10);
    const [r, g, b, a] = img.px.slice(0, 4);
    expect(r).toBe(g);
    expect(g).toBe(b);
    expect(a).toBe(255);
  });
});
