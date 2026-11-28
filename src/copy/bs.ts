// Bosanski (latinica, ijekavica). Same keys as en.ts. Gender-neutral wording where possible.
// Native-speaker review pending (T048).

import { MAX_CHARS } from "../config/app";
import type { Copy } from "./en";

const num = (n: number) => n.toLocaleString("bs");

export const bs: Copy = {
  home: {
    headline: "Nešto ti je čudno u nekom chatu?",
    lead: "Zalijepi poruke ili dodaj snimke ekrana. Pogledat ćemo ih zajedno.",
    inputLabel: "Poruke ili tvoj opis",
    placeholder:
      "Na primjer:\nOn: Nemoj nikome pričati o nama.\nJa: Zašto?\n\nMožeš i svojim riječima opisati šta se dešava.",
    maskNote: "Brojevi telefona, e-mailovi i linkovi se sakrivaju prije slanja.",
    screenshot: {
      add: "Dodaj snimak ekrana",
      note: "Snimci ekrana se čitaju na tvom telefonu i nikad se ne šalju.",
      reading: (i: number, n: number, pct: number) =>
        n > 1 ? `Čitam snimak ${i + 1} od ${n}… ${pct}%` : `Čitam tvoj snimak ekrana… ${pct}%`,
      ready: (n: number) => (n === 1 ? "1 snimak je spreman" : n < 5 ? `${n} snimka su spremna` : `${n} snimaka je spremno`),
      readyHint: "Dodirni Provjeri kad budeš spreman/na.",
      remove: "Ukloni",
      removeLabel: "Ukloni snimke ekrana",
      empty: "Na toj slici nismo našli tekst. Probaj jasniji snimak ekrana ili zalijepi poruke.",
      failed: "Čitanje snimka ovaj put nije uspjelo. Umjesto toga možeš zalijepiti poruke.",
      tooMany: "Odjednom možeš dodati najviše 5 snimaka ekrana.",
    },
    disclosure: "Tvoj tekst ide AI servisu samo za ovu provjeru. Ne čuvamo ga.",
    tooShort: "Zalijepi nekoliko poruka ili napiši par rečenica o tome šta se dešava.",
    tooLong: "To je puno teksta. Zalijepi samo posljednje poruke ili dio koji te najviše brine.",
    counter: (n: number) => `${num(n)} / ${num(MAX_CHARS)}`,
    submit: "Provjeri",
    helpLink: "Treba mi pomoć",
    incognitoHint: "Savjet: otvori ovu stranicu u privatnom (incognito) prozoru da ne ostane u historiji.",
  },

  masked: {
    phone: "broj sakriven",
    email: "e-mail sakriven",
    url: "link sakriven",
    summary: "Prije slanja smo sakrili lične podatke.",
  },

  ocrLabels: { them: "Osoba", me: "Ja" },

  locale: {
    button: (country: string, language: string) => `${language} · ${country}`,
    buttonAria: "Promijeni jezik ili državu",
    title: "Jezik",
    changeCountry: "Promijeni državu",
  },

  analyzing: {
    status: "Pažljivo čitamo…",
  },

  result: {
    headline: {
      low: "Nismo našli jasne znakove upozorenja",
      watch: "Neke stvari vrijedi bolje pogledati",
      high: "Ovo treba shvatiti ozbiljno",
    },
    summaryDefault: {
      low: "U ovom chatu nismo primijetili jasne znakove upozorenja.",
      watch: "Neke stvari u ovom chatu vrijedi bolje pogledati. Ne moraš to rješavati sam/a.",
      high: "Neke stvari u ovom chatu mogu biti znak opasnosti. Molimo te, uskoro razgovaraj s nekim kome vjeruješ.",
    },
    nextStepsDefault: {
      low: [
        "Vjeruj svom osjećaju. Ako ti kasnije nešto bude čudno, možeš ponovo provjeriti.",
        "Ako te nešto muči, razgovaraj s odraslom osobom kojoj vjeruješ.",
      ],
      watch: [
        "Ne moraš odmah odgovoriti.",
        "Razgovaraj s odraslom osobom kojoj vjeruješ ili pozovi liniju za pomoć.",
        "Napravi snimke ekrana i sačuvaj ih na sigurnom mjestu.",
      ],
      high: [
        "Ne šalji ništa više, ne pristaj na viđanje i ne dijeli svoju lokaciju.",
        "Napravi snimke ekrana i sačuvaj ih na sigurnom mjestu.",
        "Još danas razgovaraj s odraslom osobom kojoj vjeruješ ili pozovi liniju za pomoć.",
        "Ovo nije tvoja krivica.",
      ],
    },
    trustFeeling:
      "Ali ako ti i dalje nešto nije u redu, vjeruj tom osjećaju. Uvijek je u redu razgovarati s nekim o tome.",
    yourMessages: "Tvoje poruke",
    markHint: "Dodirni označeni dio da vidiš zašto je važan.",
    signsWithoutQuote: "Stvari koje smo primijetili",
    notYourFault: "Nije tvoja krivica.",
    checkAnother: "Provjeri drugi chat",
    identityLink: "Kako provjeriti ko je s druge strane",
  },

  signSheet: {
    why: "Zašto je ovo važno",
    close: "Zatvori",
  },

  categories: {
    secrecy: {
      title: "Traži da sve ostane tajna",
      short: "Neko kome je stalo do tebe ne traži da kriješ vaše poruke od svih.",
      example: "Nemoj nikome pričati o nama, to je naša mala tajna.",
    },
    isolation: {
      title: "Udaljava te od drugih",
      short: "Kaže da te samo on/ona razumije, a da porodica ili prijatelji to ne bi shvatili.",
      example: "Tvoji te prijatelji ne razumiju. Samo ja te razumijem.",
    },
    fast_intimacy: {
      title: "Ide prebrzo",
      short: "Puno komplimenata i bliskosti za jako kratko vrijeme.",
      example: "Pričamo tek sedmicu dana, ali mislim da te volim.",
    },
    pressure: {
      title: "Pritisak",
      short: "Ne prihvata tvoje „ne“, stalno traži ili te tjera da se osjećaš krivo.",
      example: "Ajde, što si takva/takav? Samo to uradi za mene.",
    },
    gifts_favours: {
      title: "Pokloni i usluge",
      short: "Novac, pokloni ili krediti za igrice, a onda očekuje nešto zauzvrat.",
      example: "Kupio sam ti kredite za igricu, sad si mi dužna/dužan.",
    },
    personal_info: {
      title: "Traži lične podatke",
      short: "Tvoju adresu, školu, raspored, porodicu ili lozinke.",
      example: "U koju školu ideš? Kad si sam/a kod kuće?",
    },
    images: {
      title: "Traži slike ili snimke",
      short: "Traži tvoje slike ili ti šalje seksualni sadržaj.",
      example: "Pošalji mi svoju sliku, samo za mene.",
    },
    move_platform: {
      title: "Želi preći u privatniju aplikaciju",
      short: "Traži da pređete negdje „privatnije“ ili da brišeš poruke.",
      example: "Hajmo preći na drugu aplikaciju, tamo je privatnije.",
    },
    identity_doubt: {
      title: "Nije jasno ko je",
      short: "Izbjegava video pozive, priča mu se ne slaže, profil djeluje čudno.",
      example: "Pokvarila mi se kamera, ne mogu na video poziv.",
    },
    threats_guilt: {
      title: "Prijetnje ili krivica",
      short: "Prijeti ti, ucjenjuje te ili kaže da ćeš ti biti kriv/a.",
      example: "Ako nekome kažeš, bit će tvoja krivica.",
    },
    meeting: {
      title: "Želi da se vidite",
      short: "Predlaže da se vidite uživo, naročito bez znanja odraslih.",
      example: "Hajmo se naći, ali nemoj reći roditeljima.",
    },
  },

  nextSteps: {
    title: "Šta sada možeš uraditi",
  },

  help: {
    titleUrgent: "Razgovaraj s nekim odmah",
    title: "Ako želiš razgovarati s nekim",
    call: "Pozovi",
    chat: "Chat",
    anonymity: "Ne moraš reći svoje ime.",
    trustedAdult: "Ili razgovaraj s odraslom osobom kojoj vjeruješ: roditeljem, nastavnikom, školskim pedagogom ili psihologom.",
    unverified: "Broj još nije provjeren.",
    kinds: {
      childLine: "Linija za pomoć djeci i mladima.",
      sos: "SOS linija organizacije ASTRA.",
      police: "Ako si u opasnosti upravo sada.",
    },
    policeName: "Policija",
  },

  helpPage: {
    title: "Potraži pomoć",
    intro: "Ne moraš ovo rješavati sam/a. Ovo su ljudi koji znaju kako pomoći.",
    whatHappensTitle: "Šta se dešava kad pozoveš",
    whatHappens: [
      "Javit će se neko ko je tu da te sasluša, a ne da te osuđuje.",
      "Ne moraš reći svoje ime ni gdje živiš.",
      "Razgovor možeš prekinuti kad god želiš.",
    ],
    trustedAdultTitle: "Kako reći odrasloj osobi",
    trustedAdultTips: [
      "Izaberi nekoga kome vjeruješ. Ne mora biti roditelj.",
      "Možeš početi sa: „Desilo mi se nešto na internetu i ne znam šta da radim.“",
      "Pokaži snimke ekrana ako ti je to lakše nego objašnjavati.",
    ],
    historyTitle: "O historiji pretraživača",
    historyNote:
      "Dugme Izađi brzo sakriva ovu stranicu, ali posjeta se i dalje može vidjeti u historiji pretraživača. Privatni (incognito) prozor je najsigurniji izbor.",
    back: "Nazad",
  },

  error: {
    title: "Provjera nije uspjela",
    generic: "Ovaj put nismo mogli pročitati poruke. Tvoj tekst nije nigdje sačuvan.",
    offline: "Izgleda da nisi na internetu. Provjeri vezu i pokušaj ponovo.",
    rateLimited: "Bilo je puno provjera za kratko vrijeme. Sačekaj nekoliko minuta i pokušaj ponovo.",
    retry: "Pokušaj ponovo",
    meanwhile: "U međuvremenu, ovo su česti znakovi upozorenja:",
    signsLink: "Pogledaj znakove upozorenja",
  },

  quickExit: {
    label: "Izađi",
    aria: "Brzo napusti ovu stranicu",
    hint: "Možeš i dvaput pritisnuti Esc.",
  },

  signsGuide: {
    title: "Znakovi upozorenja",
    intro:
      "Ovo su česti trikovi koje predatori koriste na internetu. Jedan znak ne znači uvijek opasnost, ali što ih više vidiš, to trebaš biti oprezniji/a.",
    exampleLabel: "Na primjer",
    outro: "Primijetio/la si nešto od ovoga? Ne moraš se s tim nositi sam/a.",
    check: "Provjeri chat",
    help: "Potraži pomoć",
  },

  readAloud: {
    start: "Pročitaj naglas",
    stop: "Prestani čitati",
    signsIntro: "Šta smo primijetili.",
    stepsIntro: "Šta sada možeš uraditi.",
    helpIntro: "Ako želiš razgovarati s nekim:",
  },

  more: {
    title: "Još načina da dobiješ pomoć",
    who: "Provjeri ko je s druge strane",
    whoHighlight: "Nisi siguran/na ko je ta osoba zapravo? Provjeri ovdje.",
    block: "Kako blokirati i prijaviti",
    signs: "Upoznaj znakove upozorenja",
  },

  tell: {
    title: "Pomozi mi da kažem nekome",
    intro: "Ne znaš kako početi? Izaberi poruku, kopiraj je i pošalji nekome kome vjeruješ.",
    copy: "Kopiraj",
    copied: "Kopirano",
    send: "Pošalji",
    copyFailed: "Kopiranje nije uspjelo. Pritisni i drži poruku da je kopiraš.",
    messages: [
      {
        to: "Roditelju ili nekome iz porodice",
        text: "Hej, desilo mi se nešto na internetu i ne znam šta da radim. Možemo li danas razgovarati? Molim te, nemoj se ljutiti, samo mi treba tvoja pomoć.",
      },
      {
        to: "Nastavniku ili školskom pedagogu",
        text: "Zdravo, možemo li razgovarati nasamo? Nešto me na internetu brine i treba mi savjet.",
      },
      {
        to: "Kratko i jasno",
        text: "Možemo li uskoro razgovarati? Muči me nešto na internetu i treba mi pomoć.",
      },
    ],
  },

  who: {
    title: "Ko je s druge strane?",
    intro: "Odgovori na par brzih pitanja o osobi s kojom se dopisuješ. Traje minutu i ništa se ne čuva.",
    yes: "Da",
    no: "Ne",
    questions: [
      "Da li izbjegava video pozive ili uvijek ima izgovor da ne pokaže lice?",
      "Da li mu se priča promijenila, npr. godine, škola ili gdje živi?",
      "Da li je profil nov ili ima jako malo objava i prijatelja?",
      "Da li ga niko koga poznaješ zapravo ne zna uživo?",
      "Da li slike izgledaju previše savršeno, kao od modela ili s interneta?",
      "Da li kaže da je tvojih godina, a piše ili se ponaša kao mnogo starija osoba?",
    ],
    tally: (n: number, total: number) => `${n} od ${total} znakova za uzbunu`,
    advice: {
      none: "Ništa se ovdje ne ističe. Ipak, ne žuri dok upoznaješ ljude na internetu i vjeruj svom osjećaju.",
      some: "Neke stvari se ne slažu. Pazi šta dijeliš i ne pristaj na viđanje. Dobro je da razgovaraš s nekim kome vjeruješ.",
      many: "Mnogo stvari se ne slaže. Ova osoba možda nije ono za šta se predstavlja. Ne dijeli ništa više, ne viđaj se i uskoro razgovaraj s odraslom osobom kojoj vjeruješ.",
    },
    unanswered: "Odgovori na sva pitanja da vidiš rezultat.",
    progress: (n: number, total: number) => `${n} od ${total} odgovoreno`,
    resultTitle: "Tvoj rezultat",
    startOver: "Počni ponovo",
    reverseTitle: "Provjeri profilnu sliku",
    reverseIntro: "Lažni profili često koriste tuđe slike. Obrnuta pretraga slika pokazuje gdje se još ta slika pojavljuje na internetu. Mi nikad ne vidimo sliku: to radiš u drugoj aplikaciji.",
    reverseSteps: [
      "Napravi snimak ekrana njegove profilne slike.",
      "Otvori Google Lens (u Google aplikaciji ili Google Photos) ili idi na images.google.com na računaru.",
      "Pretraži pomoću snimka. Ako se ista slika pojavi pod drugim imenom ili na stranici nekog modela ili banke slika, budi oprezan/na.",
    ],
    reverseTools: "Drugi besplatni alati: TinEye (tineye.com) i Bing Visual Search.",
    back: "Nazad",
  },

  block: {
    title: "Kako blokirati i prijaviti",
    intro: "Nekoga možeš blokirati kad god želiš. Ne moraš objašnjavati zašto.",
    evidenceTitle: "Prije blokiranja: sačuvaj šta se desilo",
    evidence: [
      "Napravi snimke ekrana chata, korisničkog imena i profila.",
      "Zapiši datum i aplikaciju.",
      "Sačuvaj ih negdje privatno ili ih pokaži odrasloj osobi kojoj vjeruješ.",
    ],
    imagesWarning:
      "Ako ti je slao seksualne slike ili snimke, ili tražio tvoje, nemoj ih čuvati ni prosljeđivati, čak ni kao dokaz. Umjesto toga reci odrasloj osobi kojoj vjeruješ ili policiji. Oni znaju šta treba uraditi.",
    appsTitle: "Blokiranje i prijava u svakoj aplikaciji",
    apps: [
      {
        name: "Instagram",
        steps: ["Idi na njegov profil.", "Dodirni ⋯ u gornjem uglu.", "Izaberi Prijavi (Report), pa Blokiraj (Block)."],
      },
      {
        name: "Snapchat",
        steps: ["Pritisni i drži njegovo ime na listi chatova.", "Dodirni Upravljaj prijateljstvom (Manage Friendship).", "Izaberi Prijavi, pa Blokiraj."],
      },
      {
        name: "TikTok",
        steps: ["Idi na njegov profil.", "Dodirni strelicu za dijeljenje ili ⋯ u gornjem uglu.", "Izaberi Prijavi, pa Blokiraj."],
      },
      {
        name: "Discord",
        steps: [
          "Da prijaviš poruku, pritisni i drži je (ili desni klik na računaru) i izaberi Prijavi (Report).",
          "Da blokiraš, dodirni ime ili profilnu sliku, pa ⋯, pa Blokiraj (Block).",
        ],
      },
    ],
    note: "Meniji mogu malo drugačije izgledati zavisno od verzije aplikacije. Potraži Prijavi i Blokiraj na profilu ili u chatu.",
    back: "Nazad",
  },
};
