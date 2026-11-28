// Hrvatski. Same keys as en.ts. Gender-neutral wording where possible.
// Native-speaker review pending (T048).

import { MAX_CHARS } from "../config/app";
import type { Copy } from "./en";

const num = (n: number) => n.toLocaleString("hr");

export const hr: Copy = {
  home: {
    headline: "Nešto ti je čudno u nekom chatu?",
    lead: "Zalijepi poruke ili dodaj snimke zaslona. Pogledat ćemo ih zajedno.",
    inputLabel: "Poruke ili tvoj opis",
    placeholder:
      "Na primjer:\nOn: Nemoj nikome pričati o nama.\nJa: Zašto?\n\nMožeš i svojim riječima opisati što se događa.",
    maskNote: "Brojevi telefona, e-mailovi i poveznice skrivaju se prije slanja.",
    screenshot: {
      add: "Dodaj snimku zaslona",
      note: "Snimke zaslona čitaju se na tvom mobitelu i nikad se ne šalju.",
      reading: (i: number, n: number, pct: number) =>
        n > 1 ? `Čitam snimku ${i + 1} od ${n}… ${pct}%` : `Čitam tvoju snimku zaslona… ${pct}%`,
      ready: (n: number) => (n === 1 ? "1 snimka je spremna" : n < 5 ? `${n} snimke su spremne` : `${n} snimki je spremno`),
      readyHint: "Dodirni Provjeri kad budeš spreman/na.",
      remove: "Ukloni",
      removeLabel: "Ukloni snimke zaslona",
      empty: "Na toj slici nismo pronašli tekst. Probaj jasniju snimku zaslona ili zalijepi poruke.",
      failed: "Čitanje snimke ovaj put nije uspjelo. Umjesto toga možeš zalijepiti poruke.",
      tooMany: "Odjednom možeš dodati najviše 5 snimki zaslona.",
    },
    disclosure: "Tvoj tekst ide AI servisu samo za ovu provjeru. Ne spremamo ga.",
    tooShort: "Zalijepi nekoliko poruka ili napiši par rečenica o tome što se događa.",
    tooLong: "To je puno teksta. Zalijepi samo zadnje poruke ili dio koji te najviše brine.",
    counter: (n: number) => `${num(n)} / ${num(MAX_CHARS)}`,
    submit: "Provjeri",
    helpLink: "Trebam pomoć",
    incognitoHint: "Savjet: otvori ovu stranicu u privatnom (incognito) prozoru da ne ostane u povijesti.",
  },

  masked: {
    phone: "broj skriven",
    email: "e-mail skriven",
    url: "poveznica skrivena",
    summary: "Prije slanja sakrili smo osobne podatke.",
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
      low: "Nismo pronašli jasne znakove upozorenja",
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
        "Vjeruj svom osjećaju. Ako ti kasnije nešto bude čudno, možeš ponovno provjeriti.",
        "Ako te nešto muči, razgovaraj s odraslom osobom kojoj vjeruješ.",
      ],
      watch: [
        "Ne moraš odmah odgovoriti.",
        "Razgovaraj s odraslom osobom kojoj vjeruješ ili nazovi liniju za pomoć.",
        "Napravi snimke zaslona i spremi ih na sigurno mjesto.",
      ],
      high: [
        "Ne šalji više ništa, ne pristaj na susret i ne dijeli svoju lokaciju.",
        "Napravi snimke zaslona i spremi ih na sigurno mjesto.",
        "Još danas razgovaraj s odraslom osobom kojoj vjeruješ ili nazovi liniju za pomoć.",
        "Ovo nije tvoja krivnja.",
      ],
    },
    trustFeeling:
      "Ali ako ti i dalje nešto nije u redu, vjeruj tom osjećaju. Uvijek je u redu o tome razgovarati s nekim.",
    yourMessages: "Tvoje poruke",
    markHint: "Dodirni označeni dio da vidiš zašto je važan.",
    signsWithoutQuote: "Stvari koje smo primijetili",
    notYourFault: "Nije tvoja krivnja.",
    checkAnother: "Provjeri drugi chat",
    identityLink: "Kako provjeriti tko je s druge strane",
  },

  signSheet: {
    why: "Zašto je ovo važno",
    close: "Zatvori",
  },

  categories: {
    secrecy: {
      title: "Traži da sve ostane tajna",
      short: "Netko kome je stalo do tebe ne traži da skrivaš vaše poruke od svih.",
      example: "Nemoj nikome pričati o nama, to je naša mala tajna.",
    },
    isolation: {
      title: "Udaljava te od drugih",
      short: "Kaže da te samo on/ona razumije, a da obitelj ili prijatelji to ne bi shvatili.",
      example: "Tvoji te prijatelji ne razumiju. Samo ja te razumijem.",
    },
    fast_intimacy: {
      title: "Ide prebrzo",
      short: "Puno komplimenata i bliskosti u jako kratkom vremenu.",
      example: "Pričamo tek tjedan dana, ali mislim da te volim.",
    },
    pressure: {
      title: "Pritisak",
      short: "Ne prihvaća tvoj „ne“, stalno traži ili te tjera da se osjećaš krivo.",
      example: "Ajde, zašto si takva/takav? Samo to napravi za mene.",
    },
    gifts_favours: {
      title: "Pokloni i usluge",
      short: "Novac, pokloni ili krediti za igrice, a onda očekuje nešto zauzvrat.",
      example: "Kupio sam ti kredite za igricu, sad si mi dužna/dužan.",
    },
    personal_info: {
      title: "Traži osobne podatke",
      short: "Tvoju adresu, školu, raspored, obitelj ili lozinke.",
      example: "U koju školu ideš? Kad si sam/a doma?",
    },
    images: {
      title: "Traži slike ili snimke",
      short: "Traži tvoje slike ili ti šalje seksualni sadržaj.",
      example: "Pošalji mi svoju sliku, samo za mene.",
    },
    move_platform: {
      title: "Želi prijeći u privatniju aplikaciju",
      short: "Traži da prijeđete negdje „privatnije“ ili da brišeš poruke.",
      example: "Ajmo prijeći na drugu aplikaciju, tamo je privatnije.",
    },
    identity_doubt: {
      title: "Nije jasno tko je",
      short: "Izbjegava videopozive, priča mu se ne slaže, profil djeluje čudno.",
      example: "Pokvarila mi se kamera, ne mogu na videopoziv.",
    },
    threats_guilt: {
      title: "Prijetnje ili krivnja",
      short: "Prijeti ti, ucjenjuje te ili kaže da ćeš ti biti kriv/a.",
      example: "Ako nekome kažeš, bit će tvoja krivnja.",
    },
    meeting: {
      title: "Želi se naći uživo",
      short: "Predlaže susret uživo, posebno bez znanja odraslih.",
      example: "Ajmo se naći, ali nemoj reći roditeljima.",
    },
  },

  nextSteps: {
    title: "Što sada možeš napraviti",
  },

  help: {
    titleUrgent: "Razgovaraj s nekim odmah",
    title: "Ako želiš razgovarati s nekim",
    call: "Nazovi",
    chat: "Chat",
    anonymity: "Ne moraš reći svoje ime.",
    trustedAdult: "Ili razgovaraj s odraslom osobom kojoj vjeruješ: roditeljem, nastavnikom, školskim psihologom.",
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
    whatHappensTitle: "Što se događa kad nazoveš",
    whatHappens: [
      "Javit će se netko tko je tu da te sasluša, a ne da te osuđuje.",
      "Ne moraš reći svoje ime ni gdje živiš.",
      "Razgovor možeš prekinuti kad god želiš.",
    ],
    trustedAdultTitle: "Kako reći odrasloj osobi",
    trustedAdultTips: [
      "Odaberi nekoga kome vjeruješ. Ne mora biti roditelj.",
      "Možeš početi s: „Dogodilo mi se nešto na internetu i ne znam što napraviti.“",
      "Pokaži snimke zaslona ako ti je to lakše nego objašnjavati.",
    ],
    historyTitle: "O povijesti preglednika",
    historyNote:
      "Gumb Izađi brzo skriva ovu stranicu, ali posjet se i dalje može vidjeti u povijesti preglednika. Privatni (incognito) prozor je najsigurniji izbor.",
    back: "Natrag",
  },

  error: {
    title: "Provjera nije uspjela",
    generic: "Ovaj put nismo mogli pročitati poruke. Tvoj tekst nije nigdje spremljen.",
    offline: "Izgleda da nisi na internetu. Provjeri vezu i pokušaj ponovno.",
    rateLimited: "Bilo je puno provjera u kratkom vremenu. Pričekaj nekoliko minuta i pokušaj ponovno.",
    retry: "Pokušaj ponovno",
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
    signsIntro: "Što smo primijetili.",
    stepsIntro: "Što sada možeš napraviti.",
    helpIntro: "Ako želiš razgovarati s nekim:",
  },

  more: {
    title: "Još načina da dobiješ pomoć",
    who: "Provjeri tko je s druge strane",
    whoHighlight: "Nisi siguran/na tko je ta osoba zapravo? Provjeri ovdje.",
    block: "Kako blokirati i prijaviti",
    signs: "Upoznaj znakove upozorenja",
  },

  tell: {
    title: "Pomozi mi reći nekome",
    intro: "Ne znaš kako početi? Odaberi poruku, kopiraj je i pošalji nekome kome vjeruješ.",
    copy: "Kopiraj",
    copied: "Kopirano",
    send: "Pošalji",
    copyFailed: "Kopiranje nije uspjelo. Pritisni i drži poruku da je kopiraš.",
    messages: [
      {
        to: "Roditelju ili nekome iz obitelji",
        text: "Hej, dogodilo mi se nešto na internetu i ne znam što napraviti. Možemo li danas razgovarati? Molim te, nemoj se ljutiti, samo mi treba tvoja pomoć.",
      },
      {
        to: "Nastavniku ili školskom psihologu",
        text: "Bok, bismo li mogli razgovarati nasamo? Nešto me na internetu brine i trebam savjet.",
      },
      {
        to: "Kratko i jasno",
        text: "Možemo li uskoro razgovarati? Muči me nešto na internetu i trebam pomoć.",
      },
    ],
  },

  who: {
    title: "Tko je s druge strane?",
    intro: "Odgovori na par brzih pitanja o osobi s kojom se dopisuješ. Traje minutu i ništa se ne sprema.",
    yes: "Da",
    no: "Ne",
    questions: [
      "Izbjegava li videopozive ili uvijek ima izgovor da ne pokaže lice?",
      "Je li mu se priča promijenila, npr. godine, škola ili gdje živi?",
      "Je li profil nov ili ima jako malo objava i prijatelja?",
      "Je li istina da ga nitko koga poznaješ zapravo ne zna uživo?",
      "Izgledaju li slike previše savršeno, kao od modela ili s interneta?",
      "Kaže li da je tvojih godina, a piše ili se ponaša kao puno starija osoba?",
    ],
    tally: (n: number, total: number) => `${n} od ${total} znakova za uzbunu`,
    advice: {
      none: "Ništa se ovdje ne ističe. Ipak, ne žuri dok upoznaješ ljude na internetu i vjeruj svom osjećaju.",
      some: "Neke se stvari ne slažu. Pazi što dijeliš i ne pristaj na susret. Dobro je razgovarati s nekim kome vjeruješ.",
      many: "Puno se stvari ne slaže. Ova osoba možda nije ono za što se predstavlja. Ne dijeli više ništa, ne nalazi se s njom i uskoro razgovaraj s odraslom osobom kojoj vjeruješ.",
    },
    unanswered: "Odgovori na sva pitanja da vidiš rezultat.",
    progress: (n: number, total: number) => `${n} od ${total} odgovoreno`,
    resultTitle: "Tvoj rezultat",
    startOver: "Počni ispočetka",
    reverseTitle: "Provjeri profilnu sliku",
    reverseIntro: "Lažni profili često koriste tuđe slike. Obrnuto pretraživanje slika pokazuje gdje se još ta slika pojavljuje na internetu. Mi nikad ne vidimo sliku: to radiš u drugoj aplikaciji.",
    reverseSteps: [
      "Napravi snimku zaslona njegove profilne slike.",
      "Otvori Google Lens (u Google aplikaciji ili Google Fotografijama) ili idi na images.google.com na računalu.",
      "Pretraži pomoću snimke. Ako se ista slika pojavi pod drugim imenom ili na stranici nekog modela ili banke fotografija, budi oprezan/na.",
    ],
    reverseTools: "Drugi besplatni alati: TinEye (tineye.com) i Bing Visual Search.",
    back: "Natrag",
  },

  block: {
    title: "Kako blokirati i prijaviti",
    intro: "Nekoga možeš blokirati kad god želiš. Ne moraš objašnjavati zašto.",
    evidenceTitle: "Prije blokiranja: spremi što se dogodilo",
    evidence: [
      "Napravi snimke zaslona chata, korisničkog imena i profila.",
      "Zapiši datum i aplikaciju.",
      "Spremi ih negdje privatno ili ih pokaži odrasloj osobi kojoj vjeruješ.",
    ],
    imagesWarning:
      "Ako ti je slao seksualne slike ili snimke, ili tražio tvoje, nemoj ih spremati ni prosljeđivati, čak ni kao dokaz. Umjesto toga reci odrasloj osobi kojoj vjeruješ ili policiji. Oni znaju što treba napraviti.",
    appsTitle: "Blokiranje i prijava u svakoj aplikaciji",
    apps: [
      {
        name: "Instagram",
        steps: ["Idi na njegov profil.", "Dodirni ⋯ u gornjem kutu.", "Odaberi Prijavi (Report), zatim Blokiraj (Block)."],
      },
      {
        name: "Snapchat",
        steps: ["Pritisni i drži njegovo ime na popisu chatova.", "Dodirni Upravljaj prijateljstvom (Manage Friendship).", "Odaberi Prijavi, zatim Blokiraj."],
      },
      {
        name: "TikTok",
        steps: ["Idi na njegov profil.", "Dodirni strelicu za dijeljenje ili ⋯ u gornjem kutu.", "Odaberi Prijavi, zatim Blokiraj."],
      },
      {
        name: "Discord",
        steps: [
          "Za prijavu poruke pritisni i drži je (ili desni klik na računalu) i odaberi Prijavi (Report).",
          "Za blokiranje dodirni ime ili profilnu sliku, zatim ⋯, zatim Blokiraj (Block).",
        ],
      },
    ],
    note: "Izbornici mogu malo izgledati drukčije ovisno o verziji aplikacije. Potraži Prijavi i Blokiraj na profilu ili u chatu.",
    back: "Natrag",
  },
};
