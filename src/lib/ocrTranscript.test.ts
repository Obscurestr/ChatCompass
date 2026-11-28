import { describe, expect, it } from "vitest";
import { buildTranscript, type OcrLine } from "./ocrTranscript";

// Real line positions measured from a 1170×2532 test screenshot (see test-screenshots/6-dark-bubbles).
const W = 1170;
const H = 2532;
const L = (text: string, x0: number, rightMargin: number, y0: number, y1: number, confidence = 95): OcrLine => ({
  text,
  confidence,
  x0,
  x1: W - rightMargin,
  y0,
  y1,
});

const CHAT: OcrLine[] = [
  L("9:41 5G 82%", 74, 75, 58, 90),
  L("Ryan", 545, 544, 152, 189),
  L("hey, you looked really pretty in your", 85, 328, 279, 326),
  L("story today", 84, 851, 342, 389),
  L("haha thanks", 837, 82, 477, 513),
  L("you should send me a pic, just for", 82, 376, 609, 656),
  L("me", 85, 1024, 683, 708),
  L("| don't think so", 776, 83, 807, 843),
  L("come on, | thought you trusted me.", 83, 342, 942, 989),
  L("don't tell anyone ok?", 84, 648, 1005, 1052),
  L("ok", 1039, 81, 1137, 1173),
  L("iMessage", 91, 887, 2373, 2420, 57),
];

describe("buildTranscript", () => {
  it("labels who said what and joins lines of the same bubble", () => {
    expect(buildTranscript(CHAT, W, H)).toBe(
      [
        "Them: hey, you looked really pretty in your story today",
        "Me: haha thanks",
        "Them: you should send me a pic, just for me",
        "Me: I don't think so",
        "Them: come on, I thought you trusted me. don't tell anyone ok?",
        "Me: ok",
      ].join("\n"),
    );
  });

  it("drops the header (contact name) even when it sits on the left", () => {
    const withName = [L("jake_16", 182, 818, 159, 206), ...CHAT];
    expect(buildTranscript(withName, W, H)).not.toContain("jake_16");
  });

  it("drops low-confidence garbage lines", () => {
    const noisy = [...CHAT, L("PERERGENRIS", 837, 82, 1300, 1336, 0)];
    expect(buildTranscript(noisy, W, H)).not.toContain("PERERGENRIS");
  });

  it("keeps two bubbles from the same person apart when there is a clear gap", () => {
    const two = [
      L("first message", 83, 600, 400, 447),
      L("second message", 83, 600, 560, 607),
      L("yes I am here", 800, 83, 700, 747),
    ];
    expect(buildTranscript(two, W, H)).toBe("Them: first message\nThem: second message\nMe: yes I am here");
  });

  it("returns plain text (no labels) when only one side is present", () => {
    const oneSide = [L("I've been chatting with a guy for a month.", 83, 300, 400, 447), L("He never video calls.", 83, 500, 460, 507)];
    expect(buildTranscript(oneSide, W, H)).toBe("I've been chatting with a guy for a month.\nHe never video calls.");
  });
});

// Positions from the OCR benchmark (WhatsApp-style, 1170×2532): her wide bubble doesn't reach the
// right edge because the time sits on the line below; emoji and ticks come back as low-confidence words.
describe("buildTranscript — benchmark fixes", () => {
  const Wd = (text: string, confidence = 96) => ({ text, confidence });
  const line = (x0: number, x1: number, y0: number, words: Array<{ text: string; confidence: number }>): OcrLine => ({
    text: words.map((w) => w.text).join(" "),
    confidence: words.reduce((s, w) => s + w.confidence, 0) / words.length,
    x0,
    x1,
    y0,
    y1: y0 + 46,
    words,
  });
  const chat = [
    line(74, 661, 430, [Wd("Ćao,"), Wd("šta"), Wd("radiš"), Wd("večeras?"), Wd("21:10")]),
    line(290, 1000, 556, [Wd("Ništa"), Wd("posebno,"), Wd("učim"), Wd("za"), Wd("kontrolni")]),
    line(963, 1096, 636, [Wd("21:11", 10)]),
    line(714, 1096, 933, [Wd("Zašto?"), Wd("2", 48), Wd("2143vV", 15)]),
    line(77, 862, 1063, [Wd("Pošalji"), Wd("mi"), Wd("sliku")]),
    line(78, 884, 1121, [Wd("[o]", 24), Wd("21:14")]),
  ];

  it("puts her wide bubble on her side and keeps lines whose only bad words are emoji or ticks", () => {
    expect(buildTranscript(chat, W, H, { them: "Osoba", me: "Ja" })).toBe(
      ["Osoba: Ćao, šta radiš večeras?", "Ja: Ništa posebno, učim za kontrolni", "Ja: Zašto?", "Osoba: Pošalji mi sliku"].join("\n"),
    );
  });
});
