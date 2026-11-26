"use client";

import { useState } from "react";
import { en } from "../copy/en";

// T022 — next steps; tapping one marks it done with a mint tick. State lives in memory only.
export default function NextSteps({ steps }: { steps: string[] }) {
  const [done, setDone] = useState<ReadonlySet<number>>(new Set());

  const toggle = (i: number) =>
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section aria-labelledby="steps-title">
      <h2 id="steps-title" className="text-section">
        {en.nextSteps.title}
      </h2>
      <ul className="mt-4 space-y-3 text-left">
        {steps.map((step, i) => {
          const isDone = done.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                aria-pressed={isDone}
                onClick={() => toggle(i)}
                className="flex min-h-11 w-full items-start gap-3 rounded-sheet border-2 border-ink/15 bg-paper p-4 text-left"
              >
                <span
                  aria-hidden="true"
                  className={`mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border-2 border-ink ${isDone ? "bg-marker-mint" : ""}`}
                >
                  {isDone && (
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5.5 12.6l4.1 4 8.9-9.4" />
                    </svg>
                  )}
                </span>
                <span>
                  {step}
                  {isDone && <span className="label-doodle ml-2 whitespace-nowrap">{en.nextSteps.done}</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
