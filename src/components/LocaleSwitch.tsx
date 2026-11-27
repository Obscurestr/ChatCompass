"use client";

// FR-023 — language switch + "Change country". Top left, opposite the Exit pill.
// Switching keeps the current page; links replace the history entry like every other in-app link.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale } from "../i18n/LocaleProvider";
import { COUNTRY_INFO, LANG_INFO, langsFor, localePath } from "../i18n/locales";
import BottomSheet from "./BottomSheet";

export default function LocaleSwitch() {
  const { copy, country, lang } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // "/ba/bs/help" → "/help"
  const rest = pathname.split("/").slice(3).join("/");
  const page = rest ? `/${rest}` : "/";

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={copy.locale.buttonAria}
        onClick={() => setOpen(true)}
        className="absolute left-3 top-[max(0.75rem,env(safe-area-inset-top))] z-40 inline-flex min-h-11 max-w-[calc(100%-8.5rem)] items-center gap-2 rounded-full border-2 border-ink/15 bg-paper px-4 font-display text-small font-bold btn-outline-hover"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true" className="shrink-0">
          <circle cx="12" cy="12" r="8.6" />
          <path d="M3.6 12h16.8M12 3.4c2.4 2.5 3.5 5.3 3.5 8.6s-1.1 6.1-3.5 8.6M12 3.4C9.6 5.9 8.5 8.7 8.5 12s1.1 6.1 3.5 8.6" />
        </svg>
        <span className="truncate">{copy.locale.button(COUNTRY_INFO[country].name, LANG_INFO[lang].name)}</span>
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)} labelledBy="locale-sheet-title" title={copy.locale.title}>
        <ul className="mt-5 space-y-2">
          {langsFor(country).map((l) => (
            <li key={l}>
              <Link
                href={localePath(country, l, page)}
                replace
                lang={LANG_INFO[l].htmlLang}
                aria-current={l === lang ? "true" : undefined}
                onClick={() => setOpen(false)}
                className={`flex min-h-11 w-full items-center justify-between rounded-sheet border-2 px-5 py-3 font-display font-bold ${
                  l === lang ? "border-ink bg-marker-yellow" : "border-ink/15 bg-paper btn-outline-hover"
                }`}
              >
                {LANG_INFO[l].name}
                {l === lang && (
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12.5l4.4 4.3L19 7.4" />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 text-center">
          <Link
            href="/"
            replace
            className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-6 font-display font-bold btn-outline-hover"
          >
            {copy.locale.changeCountry}
          </Link>
        </div>
      </BottomSheet>
    </>
  );
}
