// Languages and countries (constitution v1.3.0, FR-022/FR-023).
// Plain data, safe to import on the server and in the browser.

export const LANGS = ["sr", "hr", "bs", "cnr", "mk", "sq", "en"] as const;
export type Lang = (typeof LANGS)[number];

export interface LangInfo {
  /** Name in the language itself, shown in the language switch. */
  name: string;
  /** BCP 47 tag for <html lang>, number formatting and screen readers. */
  htmlLang: string;
  /** Tesseract model used to read screenshots (FR-025). */
  ocr: "srp_latn" | "hrv" | "bos" | "mkd" | "sqi" | "eng";
  /** On-device voice language prefixes for Read aloud, best first. */
  voices: string[];
  /** How the system prompt names the output language. */
  promptName: string;
}

export const LANG_INFO: Record<Lang, LangInfo> = {
  sr: { name: "Srpski", htmlLang: "sr-Latn", ocr: "srp_latn", voices: ["sr", "hr", "bs"], promptName: "Serbian, Latin script, ekavian (e.g. \"primetili smo\", \"devojka\")" },
  hr: { name: "Hrvatski", htmlLang: "hr", ocr: "hrv", voices: ["hr", "bs", "sr"], promptName: "Croatian, standard ijekavian (e.g. \"primijetili smo\", \"tko\", \"obitelj\", \"tjedan\")" },
  bs: { name: "Bosanski", htmlLang: "bs", ocr: "bos", voices: ["bs", "hr", "sr"], promptName: "Bosnian, Latin script, ijekavian (e.g. \"primijetili smo\", \"ko\", \"porodica\", \"sedmica\")" },
  cnr: { name: "Crnogorski", htmlLang: "cnr", ocr: "srp_latn", voices: ["sr", "bs", "hr"], promptName: "Montenegrin, Latin script, ijekavian (e.g. \"primijetili smo\", \"ko\", \"porodica\", \"sedmica\")" },
  mk: { name: "Македонски", htmlLang: "mk", ocr: "mkd", voices: ["mk"], promptName: "Macedonian, Cyrillic script" },
  sq: { name: "Shqip", htmlLang: "sq", ocr: "sqi", voices: ["sq"], promptName: "Albanian (standard)" },
  en: { name: "English", htmlLang: "en", ocr: "eng", voices: ["en"], promptName: "English" },
};

export const COUNTRIES = ["rs", "hr", "ba", "me", "mk", "al"] as const;
export type Country = (typeof COUNTRIES)[number];

export interface CountryInfo {
  /** Name in the country's main language. */
  name: string;
  /** English name, shown under it on the picker. */
  nameEn: string;
  defaultLang: Lang;
  /** Languages listed first in the switch (the rest follow, English last). */
  langs: Lang[];
}

export const COUNTRY_INFO: Record<Country, CountryInfo> = {
  rs: { name: "Srbija", nameEn: "Serbia", defaultLang: "sr", langs: ["sr"] },
  hr: { name: "Hrvatska", nameEn: "Croatia", defaultLang: "hr", langs: ["hr"] },
  ba: { name: "Bosna i Hercegovina", nameEn: "Bosnia and Herzegovina", defaultLang: "bs", langs: ["bs", "hr", "sr"] },
  me: { name: "Crna Gora", nameEn: "Montenegro", defaultLang: "cnr", langs: ["cnr", "sr"] },
  mk: { name: "Северна Македонија", nameEn: "North Macedonia", defaultLang: "mk", langs: ["mk", "sq"] },
  al: { name: "Shqipëria", nameEn: "Albania", defaultLang: "sq", langs: ["sq"] },
};

export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);
export const isCountry = (value: string): value is Country => (COUNTRIES as readonly string[]).includes(value);

/** The language switch order for a country: its own languages, then the others, English last. */
export function langsFor(country: Country): Lang[] {
  const own = COUNTRY_INFO[country].langs;
  const rest = LANGS.filter((l) => !own.includes(l) && l !== "en");
  return [...own, ...rest, ...(own.includes("en") ? [] : (["en"] as Lang[]))];
}

/** Every country × language pair, for generateStaticParams. */
export function allLocaleParams(): Array<{ country: Country; lang: Lang }> {
  return COUNTRIES.flatMap((country) => LANGS.map((lang) => ({ country, lang })));
}

/** Path inside the app for a country + language, e.g. localePath("ba", "hr", "/help") → "/ba/hr/help". */
export function localePath(country: Country, lang: Lang, path = "/"): string {
  const rest = path === "/" ? "" : path;
  return `/${country}/${lang}${rest}`;
}
