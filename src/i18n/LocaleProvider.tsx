"use client";

// Gives every client component the chosen country, language and copy (FR-022/FR-023).
// The values come from the URL (/{country}/{lang}) — nothing is stored in the browser.

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getCopy, type Copy } from "../copy";
import { localePath, type Country, type Lang } from "./locales";

interface LocaleValue {
  country: Country;
  lang: Lang;
  copy: Copy;
  /** In-app path that keeps the country and language, e.g. href("/help") → "/ba/hr/help". */
  href: (path?: string) => string;
}

const LocaleContext = createContext<LocaleValue | null>(null);

export default function LocaleProvider({
  country,
  lang,
  children,
}: {
  country: Country;
  lang: Lang;
  children: ReactNode;
}) {
  const value = useMemo<LocaleValue>(
    () => ({ country, lang, copy: getCopy(lang), href: (path = "/") => localePath(country, lang, path) }),
    [country, lang],
  );
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Outside a provider (the country picker) everything falls back to English and Serbia's contacts. */
const FALLBACK: LocaleValue = {
  country: "rs",
  lang: "en",
  copy: getCopy("en"),
  href: () => "/",
};

export function useLocale(): LocaleValue {
  return useContext(LocaleContext) ?? FALLBACK;
}
