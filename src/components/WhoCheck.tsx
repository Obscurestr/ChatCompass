"use client";

import { useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import Doodle from "./Doodle";

// T033 — "Who's on the other side?" checklist + reverse image search how-to.
// Answers live in memory only. We never receive any image: the search happens in another app.
// Yes = a red flag (rose), No = fine (mint). Progress bar, then a result card with a 6-dot meter.
export default function WhoCheck() {
  const { copy } = useLocale();
  const questions = copy.who.questions;
  const total = questions.length;
  const [answers, setAnswers] = useState<Array<boolean | null>>(() => questions.map(() => null));

  const answeredCount = answers.filter((a) => a !== null).length;
  const answered = answeredCount === total;
  const flags = answers.filter((a) => a === true).length;
  const level = flags === 0 ? "none" : flags <= 2 ? "some" : "many";
  const advice = copy.who.advice[level];
  const tone = { none: "bg-marker-mint", some: "bg-marker-yellow", many: "bg-marker-rose" }[level];
  const doodle = { none: "heart", some: "chat", many: "phone" } as const;

  const choose = (i: number, value: boolean) => setAnswers((prev) => prev.map((a, j) => (j === i ? value : a)));
  const reset = () => setAnswers(questions.map(() => null));

  const pill = (selected: boolean, value: boolean) =>
    [
      "inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink px-4 font-display font-bold",
      selected ? (value ? "bg-marker-rose" : "bg-marker-mint") : "bg-paper btn-outline-hover",
    ].join(" ");

  const tick = (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 12.6l4.1 4 8.9-9.4" />
    </svg>
  );

  return (
    <div className="text-left">
      <p className="mt-2 text-ink-muted">{copy.who.intro}</p>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex items-center justify-between text-small">
          <span className="label-doodle">{copy.who.progress(answeredCount, total)}</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-blush" aria-hidden="true">
          <div
            className="h-full rounded-full bg-ink transition-[width] duration-300"
            style={{ width: `${(answeredCount / total) * 100}%` }}
          />
        </div>
      </div>

      <ol className="mt-5 space-y-4">
        {questions.map((question, i) => {
          const a = answers[i];
          return (
            <li
              key={question}
              className={`rounded-[22px] border-2 p-4 ${a === null ? "border-ink/15 bg-paper" : "border-ink/30 bg-milk"}`}
            >
              <fieldset>
                <legend className="flex items-start gap-3 font-bold">
                  <span
                    aria-hidden="true"
                    className={`grid size-8 shrink-0 place-items-center rounded-full font-display text-small ${
                      a === null ? "bg-blush" : a ? "bg-marker-rose" : "bg-marker-mint"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{question}</span>
                </legend>
                <div className="mt-3 flex gap-2 pl-11">
                  <button type="button" aria-pressed={a === true} onClick={() => choose(i, true)} className={pill(a === true, true)}>
                    {a === true && tick}
                    {copy.who.yes}
                  </button>
                  <button type="button" aria-pressed={a === false} onClick={() => choose(i, false)} className={pill(a === false, false)}>
                    {a === false && tick}
                    {copy.who.no}
                  </button>
                </div>
              </fieldset>
            </li>
          );
        })}
      </ol>

      <div role="status" aria-live="polite" className="mt-6">
        {answered ? (
          <div className={`rounded-sheet border-2 border-ink p-5 text-center ${tone}`}>
            <Doodle name={doodle[level]} size={56} tone="paper" className="mx-auto" />
            <p className="label-doodle mt-3">{copy.who.resultTitle}</p>
            <p className="font-display text-section font-bold">{copy.who.tally(flags, total)}</p>
            <div className="mt-2 flex justify-center gap-1.5" aria-hidden="true">
              {answers.map((a, i) => (
                <span key={i} className={`size-3 rounded-full border-2 border-ink ${a ? "bg-ink" : "bg-paper"}`} />
              ))}
            </div>
            <p className="mx-auto mt-3">{advice}</p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-paper px-5 font-display font-bold btn-outline-hover"
            >
              {copy.who.startOver}
            </button>
          </div>
        ) : (
          <p className="text-center text-small text-ink-muted">{copy.who.unanswered}</p>
        )}
      </div>

      <section aria-labelledby="reverse-title" className="mt-10">
        <h3 id="reverse-title" className="text-section">
          {copy.who.reverseTitle}
        </h3>
        <p className="mt-2">{copy.who.reverseIntro}</p>
        <ol className="mt-4 space-y-3">
          {copy.who.reverseSteps.map((step, i) => (
            <li key={step} className="flex items-start gap-3 rounded-[22px] rounded-bl-[6px] bg-blush px-4 py-3.5">
              <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-full bg-paper font-display text-small font-bold">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-small text-ink-muted">{copy.who.reverseTools}</p>
      </section>
    </div>
  );
}
