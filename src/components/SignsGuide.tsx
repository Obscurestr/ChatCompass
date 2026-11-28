"use client";

import { CATEGORY_SOURCES, REFERENCES, shortSources, type ReferenceId } from "../config/sources";
import { useLocale } from "../i18n/LocaleProvider";
import { SIGN_CATEGORIES, type SignCategory } from "../lib/schema";

// T036 — one card per warning sign: title, a short made-up example with a highlighter mark,
// and why it matters. The three most serious signs use the rose marker, the rest yellow,
// the same as marks on a result.
const SERIOUS: SignCategory[] = ["images", "threats_guilt", "meeting"];
// Every reference cited on a card, once, sorted alphabetically by author.
const ALL_SOURCES = [...new Set(Object.values(CATEGORY_SOURCES).flat())].sort((a, b) =>
  REFERENCES[a].full.localeCompare(REFERENCES[b].full),
) as ReferenceId[];

export default function SignsGuide() {
  const { copy } = useLocale();
  return (
    <div className="text-left">
      <p className="mt-2 text-ink-muted">{copy.signsGuide.intro}</p>
      <ol className="mt-6 space-y-4">
        {SIGN_CATEGORIES.map((key, i) => {
          const sign = copy.categories[key];
          const marker = SERIOUS.includes(key) ? "bg-marker-rose" : "bg-marker-yellow";
          return (
            <li key={key} className="rounded-sheet border-2 border-ink bg-paper p-5">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className={`grid size-8 shrink-0 place-items-center rounded-full font-display text-small font-bold ${marker}`}
                >
                  {i + 1}
                </span>
                <h3 className="pt-0.5 font-display text-[1.125rem] font-bold leading-snug">{sign.title}</h3>
              </div>
              <p className="label-doodle mt-4">{copy.signsGuide.exampleLabel}</p>
              <p className="mt-1 inline-block max-w-full rounded-[18px] rounded-bl-[5px] bg-blush px-4 py-2.5">
                <span className={`rounded-mark px-1 [box-decoration-break:clone] ${marker}`}>{sign.example}</span>
              </p>
              <p className="mt-3">{sign.short}</p>
              <p className="mt-3 text-small text-ink-muted">
                {copy.signSheet.sources}: {shortSources(key)}
              </p>
            </li>
          );
        })}
      </ol>

      {/* Full references, cited briefly on each card. */}
      <details className="mt-6 rounded-sheet border-2 border-ink/15 bg-paper px-5 py-3 text-small">
        <summary className="min-h-11 content-center font-display font-bold">{copy.signsGuide.sourcesTitle}</summary>
        <ul className="mt-2 space-y-2 pb-2 text-ink-muted">
          {ALL_SOURCES.map((id) => (
            <li key={id}>
              {REFERENCES[id].full}{" "}
              <a href={REFERENCES[id].url} target="_blank" rel="noreferrer noopener" className="break-all text-berry underline">
                {REFERENCES[id].url.replace(/^https?:\/\//, "")}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
