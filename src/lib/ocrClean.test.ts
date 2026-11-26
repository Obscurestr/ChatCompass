import { describe, expect, it } from "vitest";
import { cleanOcrText } from "./ocrClean";

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

  it("turns a standalone '|' back into 'I'", () => {
    expect(cleanOcrText("| don't know...\nand |'m scared")).toBe("I don't know...\nand I'm scared");
  });

  it("returns an empty string when nothing readable is left", () => {
    expect(cleanOcrText("9:41\n100%\n\n")).toBe("");
  });
});
