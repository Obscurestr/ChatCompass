// Crnogorski (latinica, ijekavica). Shares most wording with Bosnian; only the lines where the
// standards differ are overridden here. Native-speaker review pending (T048).

import { bs } from "./bs";
import type { Copy } from "./en";

export const cnr: Copy = {
  ...bs,
  home: {
    ...bs.home,
    lead: "Zalijepi poruke ili dodaj skrinšotove. Pogledaćemo ih zajedno.",
    placeholder:
      "Na primjer:\nOn: Nemoj nikome da pričaš o nama.\nJa: Zašto?\n\nMožeš i svojim riječima da opišeš šta se dešava.",
    screenshot: {
      ...bs.home.screenshot,
      add: "Dodaj skrinšot",
      note: "Skrinšotovi se čitaju na tvom telefonu i nikad se ne šalju.",
      reading: (i: number, n: number, pct: number) =>
        n > 1 ? `Čitam skrinšot ${i + 1} od ${n}… ${pct}%` : `Čitam tvoj skrinšot… ${pct}%`,
      ready: (n: number) => (n === 1 ? "1 skrinšot je spreman" : n < 5 ? `${n} skrinšota su spremna` : `${n} skrinšotova je spremno`),
      removeLabel: "Ukloni skrinšotove",
      empty: "Na toj slici nijesmo našli tekst. Probaj jasniji skrinšot ili zalijepi poruke.",
      tooMany: "Odjednom možeš da dodaš najviše 5 skrinšotova.",
    },
    incognitoHint: "Savjet: otvori ovu stranicu u privatnom (incognito) prozoru da ne ostane u istoriji.",
  },
  result: {
    ...bs.result,
    headline: { ...bs.result.headline, low: "Nijesmo našli jasne znakove upozorenja" },
    summaryDefault: { ...bs.result.summaryDefault, low: "U ovom chatu nijesmo primijetili jasne znakove upozorenja." },
  },
  categories: {
    ...bs.categories,
    fast_intimacy: { ...bs.categories.fast_intimacy, example: "Pričamo tek nedjelju dana, ali mislim da te volim." },
  },
  helpPage: {
    ...bs.helpPage,
    historyTitle: "O istoriji pretraživača",
    historyNote:
      "Dugme Izađi brzo sakriva ovu stranicu, ali posjeta i dalje može da se vidi u istoriji pretraživača. Privatni (incognito) prozor je najsigurniji izbor.",
  },
  error: {
    ...bs.error,
    generic: "Ovaj put nijesmo mogli da pročitamo poruke. Tvoj tekst nije nigdje sačuvan.",
  },
};
