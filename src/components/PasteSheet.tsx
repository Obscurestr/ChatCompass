"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { COUNTER_FROM, MAX_CHARS, MIN_CHARS } from "../config/app";
import { en } from "../copy/en";

// T014: the paper textarea, length hints, the Check button and the AI disclosure (FR-014).
// No image or file input exists anywhere (FR-001).
export default function PasteSheet({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  // Focus on load so the caret is already blinking in the field.
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const length = value.trim().length;
  const tooShort = length > 0 && length < MIN_CHARS;
  const tooLong = length > MAX_CHARS;
  const canSubmit = length >= MIN_CHARS && !tooLong;

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

      <p id="paste-note" className="mx-auto mt-2 text-small text-ink-muted">
        {en.home.maskNote} {en.home.textOnly}
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
        className="mt-6 inline-flex min-h-11 items-center font-display font-bold text-berry underline decoration-2 underline-offset-4"
      >
        {en.home.helpLink}
      </Link>
    </form>
  );
}
