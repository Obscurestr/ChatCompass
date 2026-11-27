// Srpski (latinica, ekavica). Same keys as en.ts. Gender-neutral wording where possible.
// Native-speaker review pending (T048).

import { MAX_CHARS } from "../config/app";
import type { Copy } from "./en";

const num = (n: number) => n.toLocaleString("sr-Latn");

export const sr: Copy = {
  home: {
    headline: "Nešto ti je čudno u nekom četu?",
    lead: "Nalepi poruke ili dodaj skrinšotove. Pogledaćemo ih zajedno.",
    inputLabel: "Poruke ili tvoj opis",
    placeholder:
      "Na primer:\nOn: Nemoj nikome da pričaš o nama.\nJa: Zašto?\n\nMožeš i svojim rečima da opišeš šta se dešava.",
    maskNote: "Brojevi telefona, mejlovi i linkovi se sakrivaju pre slanja.",
    screenshot: {
      add: "Dodaj skrinšot",
      note: "Skrinšotovi se čitaju na tvom telefonu i nikad se ne šalju.",
      reading: (i: number, n: number, pct: number) =>
        n > 1 ? `Čitam skrinšot ${i + 1} od ${n}… ${pct}%` : `Čitam tvoj skrinšot… ${pct}%`,
      ready: (n: number) => (n === 1 ? "1 skrinšot je spreman" : n < 5 ? `${n} skrinšota su spremna` : `${n} skrinšotova je spremno`),
      readyHint: "Dodirni Proveri kad budeš spreman/na.",
      remove: "Ukloni",
      removeLabel: "Ukloni skrinšotove",
      empty: "Na toj slici nismo našli tekst. Probaj jasniji skrinšot ili nalepi poruke.",
      failed: "Čitanje skrinšota ovaj put nije uspelo. Možeš da nalepiš poruke umesto toga.",
      tooMany: "Odjednom možeš da dodaš najviše 5 skrinšotova.",
    },
    disclosure: "Tvoj tekst ide AI servisu samo za ovu proveru. Ne čuvamo ga.",
    tooShort: "Nalepi nekoliko poruka ili napiši par rečenica o tome šta se dešava.",
    tooLong: "To je mnogo teksta. Nalepi samo poslednje poruke ili deo koji te najviše brine.",
    counter: (n: number) => `${num(n)} / ${num(MAX_CHARS)}`,
    submit: "Proveri",
    helpLink: "Potrebna mi je pomoć",
    incognitoHint: "Savet: otvori ovu stranicu u privatnom (incognito) prozoru da ne ostane u istoriji.",
  },

  masked: {
    phone: "broj sakriven",
    email: "mejl sakriven",
    url: "link sakriven",
    summary: "Pre slanja smo sakrili lične podatke.",
  },

  ocrLabels: { them: "Osoba", me: "Ja" },

  locale: {
    button: (country: string, language: string) => `${language} · ${country}`,
    buttonAria: "Promeni jezik ili zemlju",
    title: "Jezik",
    changeCountry: "Promeni zemlju",
  },

  analyzing: {
    status: "Pažljivo čitamo…",
  },

  result: {
    headline: {
      low: "Nismo našli jasne znake upozorenja",
      watch: "Neke stvari vredi bolje pogledati",
      high: "Ovo treba shvatiti ozbiljno",
    },
    summaryDefault: {
      low: "U ovom četu nismo primetili jasne znake upozorenja.",
      watch: "Neke stvari u ovom četu vredi bolje pogledati. Ne moraš sama/sam da to rešavaš.",
      high: "Neke stvari u ovom četu mogu biti znak opasnosti. Molimo te, uskoro razgovaraj sa nekim kome veruješ.",
    },
    nextStepsDefault: {
      low: [
        "Veruj svom osećaju. Ako ti kasnije nešto bude čudno, možeš ponovo da proveriš.",
        "Ako te nešto muči, razgovaraj sa odraslom osobom kojoj veruješ.",
      ],
      watch: [
        "Ne moraš odmah da odgovoriš.",
        "Razgovaraj sa odraslom osobom kojoj veruješ ili pozovi liniju za pomoć.",
        "Napravi skrinšotove i sačuvaj ih na sigurnom mestu.",
      ],
      high: [
        "Ne šalji ništa više i ne pristaj na viđanje.",
        "Napravi skrinšotove i sačuvaj ih na sigurnom mestu.",
        "Još danas razgovaraj sa odraslom osobom kojoj veruješ ili pozovi liniju za pomoć.",
        "Ovo nije tvoja krivica.",
      ],
    },
    trustFeeling:
      "Ali ako ti i dalje nešto nije u redu, veruj tom osećaju. Uvek je u redu da o tome pričaš sa nekim.",
    yourMessages: "Tvoje poruke",
    markHint: "Dodirni označeni deo da vidiš zašto je važan.",
    signsWithoutQuote: "Stvari koje smo primetili",
    notYourFault: "Nije tvoja krivica.",
    checkAnother: "Proveri drugi čet",
    identityLink: "Kako da proveriš ko je sa druge strane",
  },

  signSheet: {
    why: "Zašto je ovo važno",
    close: "Zatvori",
  },

  categories: {
    secrecy: {
      title: "Traži da sve ostane tajna",
      short: "Neko kome je stalo do tebe ne traži da kriješ vaše poruke od svih.",
      example: "Nemoj nikome da pričaš o nama, to je naša mala tajna.",
    },
    isolation: {
      title: "Udaljava te od drugih",
      short: "Kaže da te samo on/ona razume, a da porodica ili drugari to ne bi shvatili.",
      example: "Tvoji drugari te ne razumeju. Samo ja te razumem.",
    },
    fast_intimacy: {
      title: "Ide prebrzo",
      short: "Mnogo komplimenata i bliskosti za jako kratko vreme.",
      example: "Pričamo tek nedelju dana, ali mislim da te volim.",
    },
    pressure: {
      title: "Pritisak",
      short: "Ne prihvata tvoje „ne“, stalno traži ili te tera da se osećaš krivo.",
      example: "Ajde, što si takva/takav? Samo uradi to za mene.",
    },
    gifts_favours: {
      title: "Pokloni i usluge",
      short: "Novac, pokloni ili kredit za igrice, a onda očekuje nešto zauzvrat.",
      example: "Kupio sam ti kredit za igricu, sad si mi dužna/dužan.",
    },
    personal_info: {
      title: "Traži lične podatke",
      short: "Tvoju adresu, školu, raspored, porodicu ili lozinke.",
      example: "U koju školu ideš? Kad si sama/sam kod kuće?",
    },
    images: {
      title: "Traži slike ili snimke",
      short: "Traži tvoje slike ili ti šalje seksualni sadržaj.",
      example: "Pošalji mi svoju sliku, samo za mene.",
    },
    move_platform: {
      title: "Hoće da pređete u privatniju aplikaciju",
      short: "Traži da pređete negde „privatnije“ ili da brišeš poruke.",
      example: "Hajde da pređemo na drugu aplikaciju, tamo je privatnije.",
    },
    identity_doubt: {
      title: "Nije jasno ko je",
      short: "Izbegava video-pozive, priča mu se ne slaže, profil deluje čudno.",
      example: "Pokvarila mi se kamera, ne mogu na video-poziv.",
    },
    threats_guilt: {
      title: "Pretnje ili krivica",
      short: "Preti ti, ucenjuje te ili kaže da ćeš ti biti kriva/kriv.",
      example: "Ako nekome kažeš, biće tvoja krivica.",
    },
    meeting: {
      title: "Hoće da se vidite",
      short: "Predlaže da se vidite uživo, naročito bez znanja odraslih.",
      example: "Hajde da se nađemo, ali nemoj da kažeš roditeljima.",
    },
  },

  nextSteps: {
    title: "Šta možeš sada da uradiš",
  },

  help: {
    titleUrgent: "Razgovaraj sa nekim odmah",
    title: "Ako želiš da razgovaraš sa nekim",
    call: "Pozovi",
    chat: "Čet",
    anonymity: "Ne moraš da kažeš svoje ime.",
    trustedAdult: "Ili razgovaraj sa odraslom osobom kojoj veruješ: roditeljem, nastavnikom, školskim psihologom.",
    unverified: "Broj još nije proveren.",
    kinds: {
      childLine: "Linija za pomoć deci i mladima.",
      sos: "SOS linija organizacije ASTRA.",
      police: "Ako si u opasnosti upravo sada.",
    },
    policeName: "Policija",
  },

  helpPage: {
    title: "Potraži pomoć",
    intro: "Ne moraš ovo sama/sam da rešavaš. Ovo su ljudi koji znaju kako da pomognu.",
    whatHappensTitle: "Šta se dešava kad pozoveš",
    whatHappens: [
      "Javiće se neko ko je tu da te sasluša, a ne da te osuđuje.",
      "Ne moraš da kažeš svoje ime ni gde živiš.",
      "Razgovor možeš da prekineš kad god želiš.",
    ],
    trustedAdultTitle: "Kako da kažeš odrasloj osobi",
    trustedAdultTips: [
      "Izaberi nekog kome veruješ. Ne mora da bude roditelj.",
      "Možeš da počneš sa: „Desilo mi se nešto na internetu i ne znam šta da radim.“",
      "Pokaži skrinšotove ako ti je to lakše nego da objašnjavaš.",
    ],
    historyTitle: "O istoriji pretraživača",
    historyNote:
      "Dugme Izađi brzo sakriva ovu stranicu, ali poseta i dalje može da se vidi u istoriji pretraživača. Privatni (incognito) prozor je najsigurniji izbor.",
    back: "Nazad",
  },

  error: {
    title: "Provera nije uspela",
    generic: "Ovaj put nismo mogli da pročitamo poruke. Tvoj tekst nije nigde sačuvan.",
    offline: "Izgleda da nisi na internetu. Proveri vezu i pokušaj ponovo.",
    rateLimited: "Bilo je mnogo provera za kratko vreme. Sačekaj nekoliko minuta i pokušaj ponovo.",
    retry: "Pokušaj ponovo",
    meanwhile: "U međuvremenu, ovo su česti znaci upozorenja:",
    signsLink: "Pogledaj znake upozorenja",
  },

  quickExit: {
    label: "Izađi",
    aria: "Brzo napusti ovu stranicu",
    hint: "Možeš i da pritisneš Esc dva puta.",
  },

  signsGuide: {
    title: "Znaci upozorenja",
    intro:
      "Ovo su česti trikovi koje predatori koriste na internetu. Jedan znak ne znači uvek opasnost, ali što ih više vidiš, to treba da budeš pažljivija/pažljiviji.",
    exampleLabel: "Na primer",
    outro: "Primetio/la si nešto od ovoga? Ne moraš sama/sam da se nosiš sa tim.",
    check: "Proveri čet",
    help: "Potraži pomoć",
  },

  readAloud: {
    start: "Pročitaj naglas",
    stop: "Prestani da čitaš",
    signsIntro: "Šta smo primetili.",
    stepsIntro: "Šta možeš sada da uradiš.",
    helpIntro: "Ako želiš da razgovaraš sa nekim:",
  },

  more: {
    title: "Još načina da dobiješ pomoć",
    who: "Proveri ko je sa druge strane",
    whoHighlight: "Nisi sigurna/siguran ko je ta osoba zapravo? Proveri ovde.",
    block: "Kako da blokiraš i prijaviš",
    signs: "Upoznaj znake upozorenja",
  },

  tell: {
    title: "Pomozi mi da kažem nekome",
    intro: "Ne znaš kako da počneš? Izaberi poruku, kopiraj je i pošalji nekome kome veruješ.",
    copy: "Kopiraj",
    copied: "Kopirano",
    send: "Pošalji",
    copyFailed: "Kopiranje nije uspelo. Pritisni i drži poruku da je kopiraš.",
    messages: [
      {
        to: "Roditelju ili nekom iz porodice",
        text: "Hej, desilo mi se nešto na internetu i ne znam šta da radim. Možemo li danas da popričamo? Molim te, nemoj da se ljutiš, samo mi treba tvoja pomoć.",
      },
      {
        to: "Nastavniku ili školskom psihologu",
        text: "Zdravo, da li bismo mogli da popričamo nasamo? Nešto me na internetu brine i treba mi savet.",
      },
      {
        to: "Kratko i jasno",
        text: "Možemo li uskoro da popričamo? Muči me nešto na internetu i treba mi pomoć.",
      },
    ],
  },

  who: {
    title: "Ko je sa druge strane?",
    intro: "Odgovori na par brzih pitanja o osobi sa kojom se dopisuješ. Traje minut i ništa se ne čuva.",
    yes: "Da",
    no: "Ne",
    questions: [
      "Da li izbegava video-pozive ili uvek ima izgovor da ne pokaže lice?",
      "Da li mu se priča promenila, na primer godine, škola ili gde živi?",
      "Da li je nalog nov ili ima jako malo objava i prijatelja?",
      "Da li ga niko koga poznaješ zapravo ne zna uživo?",
      "Da li slike izgledaju previše savršeno, kao od modela ili sa interneta?",
      "Da li kaže da je tvojih godina, a piše ili se ponaša kao mnogo starija osoba?",
    ],
    tally: (n: number, total: number) => `${n} od ${total} znakova za uzbunu`,
    advice: {
      none: "Ništa se ovde ne ističe. Ipak, ne žuri dok upoznaješ ljude na internetu i veruj svom osećaju.",
      some: "Neke stvari se ne slažu. Pazi šta deliš i ne pristaj na viđanje. Dobro je da razgovaraš sa nekim kome veruješ.",
      many: "Mnogo stvari se ne slaže. Ova osoba možda nije ono za šta se predstavlja. Ne deli ništa više, ne viđaj se i uskoro razgovaraj sa odraslom osobom kojoj veruješ.",
    },
    unanswered: "Odgovori na sva pitanja da vidiš rezultat.",
    progress: (n: number, total: number) => `${n} od ${total} odgovoreno`,
    resultTitle: "Tvoj rezultat",
    startOver: "Počni ponovo",
    reverseTitle: "Proveri profilnu sliku",
    reverseIntro: "Lažni nalozi često koriste tuđe slike. Obrnuta pretraga slika pokazuje gde se još ta slika pojavljuje na internetu. Mi nikad ne vidimo sliku: to radiš u drugoj aplikaciji.",
    reverseSteps: [
      "Napravi skrinšot njegove profilne slike.",
      "Otvori Google Lens (u Google aplikaciji ili Google Photos) ili idi na images.google.com na računaru.",
      "Pretraži pomoću skrinšota. Ako se ista slika pojavi pod drugim imenom ili na stranici nekog modela ili banke slika, budi oprezna/oprezan.",
    ],
    reverseTools: "Drugi besplatni alati: TinEye (tineye.com) i Bing Visual Search.",
    back: "Nazad",
  },

  block: {
    title: "Kako da blokiraš i prijaviš",
    intro: "Nekoga možeš da blokiraš kad god hoćeš. Ne moraš da objašnjavaš zašto.",
    evidenceTitle: "Pre blokiranja: sačuvaj šta se desilo",
    evidence: [
      "Napravi skrinšotove četa, korisničkog imena i profila.",
      "Zapiši datum i aplikaciju.",
      "Sačuvaj ih negde privatno ili ih pokaži odrasloj osobi kojoj veruješ.",
    ],
    imagesWarning:
      "Ako ti je slao seksualne slike ili snimke, ili tražio tvoje, nemoj da ih čuvaš ni prosleđuješ, čak ni kao dokaz. Umesto toga reci odrasloj osobi kojoj veruješ ili policiji. Oni znaju šta treba da se uradi.",
    appsTitle: "Blokiranje i prijava u svakoj aplikaciji",
    apps: [
      {
        name: "Instagram",
        steps: ["Idi na njegov profil.", "Dodirni ⋯ u gornjem uglu.", "Izaberi Prijavi (Report), pa Blokiraj (Block)."],
      },
      {
        name: "Snapchat",
        steps: ["Pritisni i drži njegovo ime u listi četova.", "Dodirni Upravljaj prijateljstvom (Manage Friendship).", "Izaberi Prijavi, pa Blokiraj."],
      },
      {
        name: "TikTok",
        steps: ["Idi na njegov profil.", "Dodirni strelicu za deljenje ili ⋯ u gornjem uglu.", "Izaberi Prijavi, pa Blokiraj."],
      },
      {
        name: "Discord",
        steps: [
          "Da prijaviš poruku, pritisni i drži je (ili desni klik na računaru) i izaberi Prijavi (Report).",
          "Da blokiraš, dodirni ime ili profilnu sliku, pa ⋯, pa Blokiraj (Block).",
        ],
      },
    ],
    note: "Meniji mogu malo da se razlikuju u zavisnosti od verzije aplikacije. Potraži Prijavi i Blokiraj na profilu ili u četu.",
    back: "Nazad",
  },
};
