"use client";

import type { CSSProperties } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import type { Mark } from "../lib/highlight";
import type { Risk, WarningSign } from "../lib/schema";
import { withChips } from "./MaskedChips";

// T017 — the signature element: her own text with highlighter marks.
// Marks are focusable role="button" spans (Tab, Enter, Space); each opens the sign's explanation.
export default function MarkedText({
  text,
  marks,
  signs,
  risk,
  onOpen,
}: {
  text: string;
  marks: Mark[];
  signs: WarningSign[];
  risk: Risk;
  onOpen: (signIndex: number) => void;
}) {
  const { copy } = useLocale();
  const color = risk === "high" ? "var(--color-marker-rose)" : "var(--color-marker-yellow)";
  const nodes: React.ReactNode[] = [];
  let pos = 0;

  marks.forEach((mark, i) => {
    if (mark.start > pos) nodes.push(...withChips(text.slice(pos, mark.start), copy.masked, `t${i}-`));
    const phrase = text.slice(mark.start, mark.end);
    // A <span role="button"> rather than <button>: browsers render buttons as inline-block,
    // which breaks a multi-line mark out of the text flow. Keyboard behaviour is added by hand.
    nodes.push(
      <span
        key={`m${i}`}
        role="button"
        tabIndex={0}
        className="mark"
        style={{ "--i": i, "--mark-color": color } as CSSProperties}
        aria-haspopup="dialog"
        aria-label={`${signs[mark.signIndex].title}: ${phrase}`}
        onClick={() => onOpen(mark.signIndex)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(mark.signIndex);
          }
        }}
      >
        {withChips(phrase, copy.masked, `m${i}-`)}
      </span>,
    );
    pos = mark.end;
  });
  if (pos < text.length) nodes.push(...withChips(text.slice(pos), copy.masked, "end-"));

  return (
    <div className="whitespace-pre-wrap break-words rounded-sheet border-2 border-ink bg-paper p-5 text-left">
      {nodes}
    </div>
  );
}
