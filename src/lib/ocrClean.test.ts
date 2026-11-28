import { describe, expect, it } from "vitest";
import { cleanLine, cleanOcrText, hasReadableText } from "./ocrClean";

describe("hasReadableText", () => {
  it("rejects junk from a picture without text", () => {
    expect(hasReadableText("yr", 58)).toBe(false);
  });
  it("rejects low-confidence reads even with letters", () => {
    expect(hasReadableText("some blurry words here", 40)).toBe(false);
  });
  it("rejects confident but tiny reads", () => {
    expect(hasReadableText("ok", 96)).toBe(false);
  });
  it("accepts a normal chat screenshot", () => {
    expect(hasReadableText("hey u up?\nyeah why", 95)).toBe(true);
  });
});

describe("cleanOcrText", () => {
  it("keeps the messages and drops times, status bar and chat-app labels", () => {
    const raw = [
      "9:41",
      "5G 87%",
      "Today",
      "Let's meet up on Saturday 10:42",
      "",
      "",
      "",
      "Don't tell your parents 10:43 PM",
      "Seen",
      "Message...",
    ].join("\n");
    expect(cleanOcrText(raw)).toBe("Let's meet up on Saturday\n\nDon't tell your parents");
  });

  it("drops lines without any letters (icons, emoji read as symbols)", () => {
    expect(cleanOcrText("<> @ #\nhey\n12 34")).toBe("hey");
  });

  it("collapses extra whitespace inside lines", () => {
    expect(cleanOcrText("send   me  a   pic")).toBe("send me a pic");
  });

  it("keeps short real words and non-English letters", () => {
    expect(cleanOcrText("ok\nĐorđe")).toBe("ok\nĐorđe");
  });

  it("drops the message box and status bar even when OCR merges them", () => {
    const raw = "hey are you there?\nMessage 5 mill 82%\nMessage...\niMessage\n5 mill 82%\nLTE 64 %";
    expect(cleanOcrText(raw)).toBe("hey are you there?");
  });

  it("keeps real messages that start with 'Message' or mention a percentage", () => {
    const raw = "Message me when you're home\nI'm 100% sure it was him";
    expect(cleanOcrText(raw)).toBe(raw);
  });

  it("turns a standalone '|' back into 'I'", () => {
    expect(cleanOcrText("| don't know...\nand |'m scared")).toBe("I don't know...\nand I'm scared");
  });

  it("returns an empty string when nothing readable is left", () => {
    expect(cleanOcrText("9:41\n100%\n\n")).toBe("");
  });
});

describe("cleanLine — times with read ticks and misread question marks", () => {
  it.each([
    ["Ne znam baš... 21:15 vv", "Ne znam baš..."],
    ["why? 21:13vv", "why?"],
    ["Ništa posebno 21:11 7/7", "Ništa posebno"],
    ["Ne znam baš... 21457", "Ne znam baš..."],
    ["çfarë po bën sonte2", "çfarë po bën sonte?"],
    ["see you at 18:30 ok", "see you at 18:30 ok"],
    ["rođena sam 2010", "rođena sam 2010"],
  ])("%j → %j", (raw, clean) => {
    expect(cleanLine(raw)).toBe(clean);
  });
});

describe("cleanLine — Macedonian model: time without colon, ticks as Cyrillic", () => {
  it.each([
    ["Зошто? 2113", "Зошто?"],
    ["Не знам баш... 2115 /У", "Не знам баш..."],
    ["Зошто? 2113 у/У", "Зошто?"],
    ["родена сум 2010", "родена сум 2010"],
  ])("%j → %j", (raw, clean) => {
    expect(cleanLine(raw)).toBe(clean);
  });
});
