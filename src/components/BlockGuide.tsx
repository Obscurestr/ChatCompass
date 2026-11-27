"use client";

import { useLocale } from "../i18n/LocaleProvider";

// T034b — save evidence first, then block and report, per app.
export default function BlockGuide() {
  const { copy } = useLocale();
  const b = copy.block;
  return (
    <div className="text-left">
      <p className="mt-2 text-ink-muted">{b.intro}</p>

      <section aria-labelledby="evidence-title" className="mt-6">
        <h3 id="evidence-title" className="text-section">
          {b.evidenceTitle}
        </h3>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {b.evidence.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <p className="mt-4 rounded-sheet bg-marker-rose/60 px-5 py-4 font-bold">{b.imagesWarning}</p>
      </section>

      <section aria-labelledby="apps-title" className="mt-8">
        <h3 id="apps-title" className="text-section">
          {b.appsTitle}
        </h3>
        <div className="mt-3 space-y-3">
          {b.apps.map((app) => (
            <div key={app.name} className="rounded-[22px] rounded-bl-[6px] bg-blush px-5 py-4">
              <p className="font-display font-bold">{app.name}</p>
              <ol className="mt-1 list-decimal space-y-1 pl-5">
                {app.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <p className="mt-3 text-small text-ink-muted">{b.note}</p>
      </section>
    </div>
  );
}
