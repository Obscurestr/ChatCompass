"use client";

import { useLocale } from "../i18n/LocaleProvider";

// T015: only a calm pulsing ink dot and "Reading carefully…". No text, no spinner.
export default function AnalyzingState() {
  const { copy } = useLocale();
  return (
    <div aria-busy="true" className="flex min-h-[70dvh] items-center justify-center">
      <p role="status" className="flex items-center justify-center gap-3 font-display text-section font-bold">
        <span aria-hidden="true" className="pulse-dot inline-block size-3 rounded-full bg-ink" />
        {copy.analyzing.status}
      </p>
    </div>
  );
}
