// All UI copy. Serbian, Latin script. Voice: calm older friend, "ti", short sentences, no blame.
// See plan.md → "Voice rules (copy)".

export const MIN_CHARS = 20;
export const MAX_CHARS = 6000;
export const COUNTER_FROM = 5000;

export const sr = {
  home: {
    headline: "Nešto ti nije prijatno u dopisivanju?",
    lead: "Zalepi poruke. Proverićemo ih zajedno.",
    inputLabel: "Poruke ili tvoj opis",
    placeholder:
      "Na primer:\nOn: Nemoj nikome da pričaš o nama.\nJa: Zašto?\n\nMožeš i svojim rečima da opišeš šta se dešava.",
    maskNote: "Brojevi telefona, mejlovi i linkovi se sakrivaju pre slanja.",
    textOnly: "Ovde ide samo tekst. Ne šalji slike, ni nama ni toj osobi.",
    disclosure: "Tekst ide AI servisu samo za ovu proveru i ne čuva se.",
    tooShort: "Zalepi bar nekoliko poruka ili napiši par rečenica o tome šta se dešava.",
    tooLong:
      "Ovo je dugo. Zalepi samo najnovije poruke ili deo koji te najviše brine.",
    counter: (n: number) => `${n.toLocaleString("sr-Latn")} / ${MAX_CHARS.toLocaleString("sr-Latn")}`,
    submit: "Proveri",
    helpLink: "Pomoć odmah",
    incognitoHint:
      "Savet: otvori ovu stranicu u privatnom (incognito) prozoru, da ne ostane u istoriji.",
  },

  masked: {
    phone: "broj sakriven",
    email: "mejl sakriven",
    url: "link sakriven",
    summary: "Sakrili smo lične podatke pre slanja.",
  },

  analyzing: {
    status: "Čitam pažljivo…",
  },

  result: {
    headline: {
      low: "Nismo našli jasne znake upozorenja",
      watch: "Ima stvari na koje vredi obratiti pažnju",
      high: "Ovo vredi shvatiti ozbiljno",
    },
    // Used by the server when the model's summary must be replaced (contract rule 4).
    lowSummaryDefault:
      "Nismo našli jasne znake upozorenja. Ako ti je i dalje neprijatno, taj osećaj je važan.",
    trustFeeling: "Tvoj osećaj se računa. Ako ti nešto smeta, to je dovoljan razlog da pričaš s nekim.",
    yourMessages: "Tvoje poruke",
    markHint: "Dodirni označeni deo da vidiš zašto je važan.",
    signsWithoutQuote: "Još nešto što smo primetili",
    notYourFault: "Nisi ti kriva.",
    checkAnother: "Proveri drugi razgovor",
    identityLink: "Kako da proveriš ko je s druge strane",
  },

  signSheet: {
    why: "Zašto je ovo važno",
    close: "Zatvori",
  },

  // Category names + one-line descriptions (also used as the general signs list on errors).
  categories: {
    secrecy: {
      title: "Traži da sve ostane tajna",
      short: "Neko ko ti želi dobro ne traži da kriješ razgovor od svih.",
    },
    isolation: {
      title: "Udaljava te od drugih",
      short: "Govori da te samo on razume i da porodica i prijatelji ne bi shvatili.",
    },
    fast_intimacy: {
      title: "Sve ide prebrzo",
      short: "Mnogo komplimenata i bliskosti za kratko vreme.",
    },
    pressure: {
      title: "Pritisak",
      short: "Ne prihvata tvoje „ne“, stalno ponovo traži ili te čini krivom.",
    },
    gifts_favours: {
      title: "Pokloni i usluge",
      short: "Novac, pokloni ili kredit u igrici, pa posle očekuje nešto zauzvrat.",
    },
    personal_info: {
      title: "Traži lične podatke",
      short: "Adresa, škola, raspored, porodica ili lozinke.",
    },
    images: {
      title: "Traži slike ili video",
      short: "Traži tvoje slike ili šalje seksualni sadržaj.",
    },
    move_platform: {
      title: "Hoće na privatniju aplikaciju",
      short: "Traži da pređete negde gde je „privatnije“ ili da brišeš poruke.",
    },
    identity_doubt: {
      title: "Nije jasno ko je",
      short: "Izbegava video poziv, priča se ne slaže, profil deluje čudno.",
    },
    threats_guilt: {
      title: "Pretnje ili krivica",
      short: "Preti, ucenjuje ili kaže da ćeš ti biti kriva.",
    },
    meeting: {
      title: "Hoće da se nađete",
      short: "Predlaže susret uživo, naročito bez znanja odraslih.",
    },
  },

  nextSteps: {
    title: "Šta sada možeš",
    done: "uradila sam",
    markDone: "Označi kao urađeno",
  },

  help: {
    titleUrgent: "Pričaj sa nekim odmah",
    title: "Ako želiš da pričaš sa nekim",
    call: "Pozovi",
    chat: "Piši",
    anonymity: "Ne moraš da kažeš svoje ime.",
    trustedAdult: "Ili se obrati odrasloj osobi kojoj veruješ: roditelju, nastavnici, školskom psihologu.",
    unverified: "Broj još nije proveren.",
  },

  helpPage: {
    title: "Pomoć",
    intro: "Ne moraš ovo da rešavaš sama. Ovde su ljudi koji znaju kako da pomognu.",
    whatHappensTitle: "Šta se dešava kad pozoveš",
    whatHappens: [
      "Javiće ti se osoba koja je tu da sluša, ne da te osuđuje.",
      "Ne moraš da kažeš ime ni gde živiš.",
      "Možeš da prekineš razgovor kad god želiš.",
    ],
    trustedAdultTitle: "Kako da kažeš odrasloj osobi",
    trustedAdultTips: [
      "Izaberi nekog kome veruješ, ne mora da bude roditelj.",
      "Možeš da počneš sa: „Desilo mi se nešto na internetu i ne znam šta da radim.“",
      "Pokaži im snimke ekrana ako ti je lakše nego da pričaš.",
    ],
    historyTitle: "O istoriji pretraživača",
    historyNote:
      "Dugme „Izađi“ brzo sklanja ovu stranicu, ali poseta može da ostane u istoriji pretraživača. Najsigurnije je da koristiš privatni (incognito) prozor.",
    back: "Nazad",
  },

  error: {
    title: "Provera nije uspela",
    generic: "Nismo uspeli da pročitamo poruke ovog puta. Tvoj tekst nije sačuvan nigde.",
    offline: "Izgleda da nema interneta. Proveri vezu, pa pokušaj ponovo.",
    rateLimited: "Bilo je mnogo provera za kratko vreme. Sačekaj par minuta, pa pokušaj ponovo.",
    retry: "Pokušaj ponovo",
    meanwhile: "U međuvremenu, ovo su česti znaci upozorenja:",
    signsLink: "Pogledaj znake upozorenja",
  },

  quickExit: {
    label: "Izađi",
    aria: "Brzo izađi sa ove stranice",
    hint: "Možeš i da pritisneš Esc dva puta.",
  },
} as const;

export type Copy = typeof sr;
