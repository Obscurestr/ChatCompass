import Link from "next/link";
import Doodle from "../../components/Doodle";
import { COUNTRIES, COUNTRY_INFO, LANG_INFO, localePath } from "../../i18n/locales";

// FR-022 — first screen: which country are you in? Sets the helplines and the default language.
// Nothing is stored; the choice lives only in the next URL.
export default function CountryPicker() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-column flex-col justify-center px-5 py-16 text-center">
      <Doodle name="chat" className="mx-auto" />
      <h1 className="mt-6 text-headline">Where are you right now?</h1>
      <p className="mx-auto mt-3 text-ink-muted">
        <span lang="sr-Latn">Gde se trenutno nalaziš?</span> · <span lang="hr">Gdje se trenutno nalaziš?</span> ·{" "}
        <span lang="mk">Каде се наоѓаш моментално?</span> · <span lang="sq">Ku ndodhesh tani?</span>
      </p>

      <ul className="mt-8 space-y-3 text-left">
        {COUNTRIES.map((id) => {
          const country = COUNTRY_INFO[id];
          return (
            <li key={id}>
              <Link
                href={localePath(id, country.defaultLang)}
                replace
                className="flex min-h-14 w-full items-center justify-between gap-3 rounded-sheet border-2 border-ink bg-paper px-5 py-3 btn-outline-hover"
              >
                <span>
                  <span lang={LANG_INFO[country.defaultLang].htmlLang} className="block font-display text-[1.125rem] font-bold">
                    {country.name}
                  </span>
                  <span className="block text-small text-ink-muted">{country.nameEn}</span>
                </span>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="shrink-0">
                  <path d="M9 5.5l6.6 6.4L9.2 18.5" />
                </svg>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
