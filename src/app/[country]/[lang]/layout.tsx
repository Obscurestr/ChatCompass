// Root layout for the app itself: /{country}/{lang}/… (FR-022). Country and language come only from the URL.

import { notFound } from "next/navigation";
import QuickExit from "../../../components/QuickExit";
import LocaleProvider from "../../../i18n/LocaleProvider";
import { LANG_INFO, allLocaleParams, isCountry, isLang } from "../../../i18n/locales";
import { Shell } from "../../shell";
import "../../globals.css";

export { metadata, viewport } from "../../shell";

// Every country × language pair is prerendered; anything else is a 404 → the picker link on that page.
export async function generateStaticParams() {
  return allLocaleParams();
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[country]/[lang]">) {
  const { country, lang } = await params;
  if (!isCountry(country) || !isLang(lang)) notFound();

  return (
    <Shell lang={LANG_INFO[lang].htmlLang}>
      <LocaleProvider country={country} lang={lang}>
        <QuickExit />
        {children}
      </LocaleProvider>
    </Shell>
  );
}
