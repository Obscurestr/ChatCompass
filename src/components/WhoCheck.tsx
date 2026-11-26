"use client";

import { useState } from "react";
import { en } from "../copy/en";

// T033 — "Who's on the other side?" checklist + reverse image search how-to.
// Answers live in memory only. We never receive any image: the search happens in another app.
export default function WhoCheck() {
  const questions = en.who.questions;
  const [answers, setAnswers] = useState<Array<boolean | null>>(() => questions.map(() => null));

  const answered = answers.every((a) => a !== null);
  const flags = answers.filter((a) => a === true).length;
  const advice = flags === 0 ? en.who.advice.none : flags <= 2 ? en.who.advice.some : en.who.advice.many;

  const choice = (i: number, value: boolean) =>
    setAnswers((prev) => prev.map((a, j) => (j === i ? value : a)));

  const pill = (active: boolean) =>
    `inline-flex min-h-11 min-w-16 items-center justify-center rounded-full border-2 border-ink px-4 font-display font-bold ${
      active ? "bg-ink text-milk" : "bg-paper"
    }`;

  return (
    <div className="text-left">
      <p className="mt-2 text-ink-muted">{en.who.intro}</p>

      <ol className="mt-5 space-y-4">
        {questions.map((question, i) => (
          <li key={question} className="rounded-sheet border-2 border-ink/15 bg-paper p-4">
            <fieldset>
              <legend className="font-bold">{question}</legend>
              <div className="mt-3 flex gap-2">
                <button type="button" aria-pressed={answers[i] === true} onClick={() => choice(i, true)} className={pill(answers[i] === true)}>
                  {en.who.yes}
                </button>
                <button type="button" aria-pressed={answers[i] === false} onClick={() => choice(i, false)} className={pill(answers[i] === false)}>
                  {en.who.no}
                </button>
              </div>
            </fieldset>
          </li>
        ))}
      </ol>

      <div role="status" aria-live="polite" className="mt-5">
        {answered ? (
          <div className={`rounded-sheet px-5 py-4 ${flags >= 3 ? "bg-marker-rose" : flags > 0 ? "bg-marker-yellow" : "bg-marker-mint"}`}>
            <p className="font-display text-section font-bold">{en.who.tally(flags, questions.length)}</p>
            <p className="mt-1">{advice}</p>
          </div>
        ) : (
          <p className="text-small text-ink-muted">{en.who.unanswered}</p>
        )}
      </div>

      <section aria-labelledby="reverse-title" className="mt-8">
        <h3 id="reverse-title" className="text-section">
          {en.who.reverseTitle}
        </h3>
        <p className="mt-2">{en.who.reverseIntro}</p>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          {en.who.reverseSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-3 text-small text-ink-muted">{en.who.reverseTools}</p>
      </section>
    </div>
  );
}
