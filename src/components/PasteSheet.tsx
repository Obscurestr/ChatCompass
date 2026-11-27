"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { COUNTER_FROM, MAX_CHARS, MAX_SCREENSHOTS, MIN_CHARS } from "../config/app";
import { en } from "../copy/en";
import { readScreenshots } from "../lib/ocr";

/** Text read from screenshots on the device. Kept out of the textarea; sent together with it on Check. */
export interface Shots {
  count: number;
  text: string;
}

type OcrState =
  | { kind: "idle" }
  | { kind: "reading"; i: number; n: number; pct: number }
  | { kind: "message"; text: string };

/** What Check sends: typed text and screenshot text together. */
export function combinedText(typed: string, shots: Shots): string {
  return [typed.trim(), shots.text].filter(Boolean).join("\n\n");
}

// T014: the paper textarea, length hints, the Check button and the AI disclosure (FR-014).
// FR-018: screenshots are read into text on the device; the image itself never leaves it.
export default function PasteSheet({
  value,
  onChange,
  shots,
  onShotsChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  shots: Shots;
  onShotsChange: (shots: Shots) => void;
  onSubmit: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [ocr, setOcr] = useState<OcrState>({ kind: "idle" });

  // Focus on load so the caret is already blinking in the field.
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const typedLength = value.trim().length;
  const length = combinedText(value, shots).length;
  const tooShort = typedLength > 0 && length < MIN_CHARS;
  const tooLong = length > MAX_CHARS;
  const reading = ocr.kind === "reading";
  const canSubmit = length >= MIN_CHARS && !tooLong && !reading;

  async function onPick(input: HTMLInputElement) {
    const all = Array.from(input.files ?? []);
    input.value = ""; // drop our reference to the picked files right away
    if (all.length === 0) return;
    const files = all.slice(0, MAX_SCREENSHOTS);

    setOcr({ kind: "reading", i: 0, n: files.length, pct: 0 });
    try {
      const text = await readScreenshots(files, (i, n, fraction) =>
        setOcr({ kind: "reading", i, n, pct: Math.round(fraction * 100) }),
      );
      if (!text) {
        setOcr({ kind: "message", text: en.home.screenshot.empty });
        return;
      }
      onShotsChange({
        count: shots.count + files.length,
        text: [shots.text, text].filter(Boolean).join("\n\n"),
      });
      setOcr({ kind: "message", text: all.length > MAX_SCREENSHOTS ? en.home.screenshot.tooMany : "" });
    } catch {
      setOcr({ kind: "message", text: en.home.screenshot.failed });
    }
  }

  return (
    <form
      className="mt-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit) onSubmit();
      }}
    >
      {/* Visually hidden; kept for screen readers. */}
      <label htmlFor="chat" className="sr-only">
        {en.home.inputLabel}
      </label>
      <textarea
        id="chat"
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={en.home.placeholder}
        aria-describedby="paste-hint paste-note"
        aria-invalid={tooLong}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="sentences"
        spellCheck={false}
        className="block h-64 w-full resize-none overflow-y-auto overscroll-contain rounded-sheet border-2 border-ink bg-paper p-5 text-left text-body text-ink caret-berry placeholder:text-ink-muted/75 focus:border-berry focus:outline-none focus:ring-4 focus:ring-berry/15"
      />

      <div className="mt-2 flex min-h-6 items-start justify-between gap-4 text-left text-small">
        <p id="paste-hint" role="status" className={tooLong ? "font-bold text-ink" : "text-ink-muted"}>
          {tooLong ? en.home.tooLong : tooShort ? en.home.tooShort : ""}
        </p>
        {value.length > COUNTER_FROM && (
          <p className="shrink-0 tabular-nums text-ink-muted">{en.home.counter(value.length)}</p>
        )}
      </div>

      {/* Screenshot → text, on the device. The text waits in memory until Check. */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => onPick(e.currentTarget)}
      />
      <button
        type="button"
        disabled={reading}
        onClick={() => fileRef.current?.click()}
        className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink bg-paper px-5 font-display font-bold btn-outline-hover disabled:cursor-wait disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3.5" y="5" width="17" height="14" rx="3" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="M5 17.5l4.6-4.4 3.2 3 2.6-2.3 3.6 3.4" />
        </svg>
        {en.home.screenshot.add}
      </button>

      <div role="status" aria-live="polite" className="mx-auto mt-2 min-h-5 text-small">
        {reading ? (
          <span className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="pulse-dot inline-block size-2 rounded-full bg-ink" />
            {en.home.screenshot.reading(ocr.i, ocr.n, ocr.pct)}
          </span>
        ) : (
          <>
            {shots.count > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-marker-mint px-3 py-1 font-bold">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5.5 12.6l4.1 4 8.9-9.4" />
                  </svg>
                  {en.home.screenshot.ready(shots.count)}
                </span>
                <button
                  type="button"
                  aria-label={en.home.screenshot.removeLabel}
                  onClick={() => {
                    onShotsChange({ count: 0, text: "" });
                    setOcr({ kind: "idle" });
                  }}
                  className="inline-flex min-h-11 items-center px-2 font-bold text-berry underline decoration-2 underline-offset-4 hover:text-ink"
                >
                  {en.home.screenshot.remove}
                </button>
                <span className="basis-full text-ink-muted">{en.home.screenshot.readyHint}</span>
              </div>
            )}
            {ocr.kind === "message" && ocr.text && <p className="mt-1">{ocr.text}</p>}
          </>
        )}
      </div>

      <p id="paste-note" className="mx-auto mt-2 text-small text-ink-muted">
        {en.home.maskNote} {en.home.screenshot.note}
      </p>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-6 h-13 w-full rounded-full bg-ink px-8 font-display text-[1.125rem] font-bold text-milk hover:bg-berry active:bg-berry disabled:cursor-not-allowed disabled:bg-ink/25 disabled:text-ink/60"
      >
        {en.home.submit}
      </button>
      <p className="mx-auto mt-3 text-small text-ink-muted">{en.home.disclosure}</p>

      <Link
        href="/help"
        replace
        className="mt-6 inline-flex min-h-11 items-center font-display font-bold text-berry underline decoration-2 underline-offset-4 hover:text-ink"
      >
        {en.home.helpLink}
      </Link>
    </form>
  );
}
