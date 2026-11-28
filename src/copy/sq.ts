// Shqip (standard). Same keys as en.ts. Gender-neutral wording where possible.
// Native-speaker review pending (T048).

import { MAX_CHARS } from "../config/app";
import type { Copy } from "./en";

const num = (n: number) => n.toLocaleString("sq");

export const sq: Copy = {
  home: {
    headline: "Diçka të duket e çuditshme në një chat?",
    lead: "Ngjit mesazhet ose shto pamje ekrani. Do t'i shohim bashkë.",
    inputLabel: "Mesazhet ose përshkrimi yt",
    placeholder:
      "Për shembull:\nAi: Mos i trego askujt për ne.\nUnë: Pse?\n\nMund të përshkruash edhe me fjalët e tua se çfarë po ndodh.",
    maskNote: "Numrat e telefonit, emailet dhe linket fshihen para dërgimit.",
    screenshot: {
      add: "Shto një pamje ekrani",
      note: "Pamjet e ekranit lexohen në telefonin tënd dhe nuk dërgohen kurrë.",
      reading: (i: number, n: number, pct: number) =>
        n > 1 ? `Po lexoj pamjen ${i + 1} nga ${n}… ${pct}%` : `Po lexoj pamjen tënde të ekranit… ${pct}%`,
      ready: (n: number) => (n === 1 ? "1 pamje ekrani gati" : `${n} pamje ekrani gati`),
      readyHint: "Prek Kontrollo kur të jesh gati.",
      remove: "Hiq",
      removeLabel: "Hiq pamjet e ekranit",
      empty: "Nuk gjetëm tekst në atë foto. Provo një pamje ekrani më të qartë ose ngjit mesazhet.",
      failed: "Leximi i pamjes së ekranit nuk funksionoi këtë herë. Mund të ngjitësh mesazhet në vend të saj.",
      tooMany: "Mund të shtosh deri në 5 pamje ekrani njëherësh.",
    },
    disclosure: "Teksti yt shkon te një shërbim AI vetëm për këtë kontroll. Nuk e ruajmë.",
    tooShort: "Ngjit disa mesazhe ose shkruaj disa fjali për atë që po ndodh.",
    tooLong: "Është shumë tekst. Ngjit vetëm mesazhet e fundit ose pjesën që të shqetëson më shumë.",
    counter: (n: number) => `${num(n)} / ${num(MAX_CHARS)}`,
    submit: "Kontrollo",
    helpLink: "Kam nevojë për ndihmë",
    incognitoHint: "Këshillë: hape këtë faqe në një dritare private (incognito) që të mos mbetet në historik.",
  },

  masked: {
    phone: "numri u fsheh",
    email: "emaili u fsheh",
    url: "linku u fsheh",
    summary: "Para dërgimit i fshehëm të dhënat personale.",
  },

  ocrLabels: { them: "Tjetri", me: "Unë" },

  locale: {
    button: (country: string, language: string) => `${language} · ${country}`,
    buttonAria: "Ndrysho gjuhën ose shtetin",
    title: "Gjuha",
    changeCountry: "Ndrysho shtetin",
  },

  analyzing: {
    status: "Po lexojmë me kujdes…",
  },

  result: {
    headline: {
      low: "Nuk gjetëm shenja të qarta paralajmëruese",
      watch: "Disa gjëra ia vlen t'i shohësh më nga afër",
      high: "Kjo duhet marrë seriozisht",
    },
    summaryDefault: {
      low: "Në këtë chat nuk vumë re shenja të qarta paralajmëruese.",
      watch: "Disa gjëra në këtë chat ia vlen t'i shohësh më nga afër. Nuk ke pse ta zgjidhësh vetëm.",
      high: "Disa gjëra në këtë chat mund të jenë shenja rreziku. Të lutemi, fol së shpejti me dikë që i beson.",
    },
    nextStepsDefault: {
      low: [
        "Besoji ndjenjës tënde. Nëse më vonë diçka të duket e çuditshme, mund të kontrollosh përsëri.",
        "Nëse diçka të shqetëson, fol me një të rritur që i beson.",
      ],
      watch: [
        "Nuk ke pse të përgjigjesh menjëherë.",
        "Fol me një të rritur që i beson ose telefono një linjë ndihme.",
        "Bëj pamje ekrani dhe ruaji në një vend të sigurt.",
      ],
      high: [
        "Mos dërgo asgjë tjetër, mos prano të takoheni dhe mos ndaj vendndodhjen tënde.",
        "Bëj pamje ekrani dhe ruaji në një vend të sigurt.",
        "Fol që sot me një të rritur që i beson ose telefono një linjë ndihme.",
        "Nuk është faji yt.",
      ],
    },
    trustFeeling:
      "Por nëse diçka ende nuk të duket në rregull, besoji asaj ndjenje. Është gjithmonë në rregull të flasësh me dikë për këtë.",
    yourMessages: "Mesazhet e tua",
    markHint: "Prek një pjesë të shënuar për të parë pse ka rëndësi.",
    signsWithoutQuote: "Gjëra që vumë re",
    notYourFault: "Nuk është faji yt.",
    checkAnother: "Kontrollo një chat tjetër",
    identityLink: "Si të kontrollosh kush është në anën tjetër",
  },

  signSheet: {
    why: "Pse ka rëndësi kjo",
    close: "Mbyll",
  },

  categories: {
    secrecy: {
      title: "Kërkon që gjithçka të mbetet sekret",
      short: "Dikush që kujdeset për ty nuk të kërkon t'i fshehësh bisedat nga të gjithë.",
      example: "Mos i trego askujt për ne, është sekreti ynë i vogël.",
    },
    isolation: {
      title: "Të largon nga të tjerët",
      short: "Thotë se vetëm ai/ajo të kupton, dhe se familja ose shokët nuk do ta kuptonin.",
      example: "Shokët e tu nuk të kuptojnë. Vetëm unë të kuptoj.",
    },
    fast_intimacy: {
      title: "Po shkon shumë shpejt",
      short: "Shumë komplimente dhe afërsi në një kohë shumë të shkurtër.",
      example: "Flasim vetëm prej një jave, por mendoj se të dua.",
    },
    pressure: {
      title: "Presion",
      short: "Nuk e pranon „jo“-në tënde, vazhdon të kërkojë ose të bën të ndihesh fajtor/e.",
      example: "Hajde, pse po bën kështu? Bëje vetëm për mua.",
    },
    gifts_favours: {
      title: "Dhurata dhe favore",
      short: "Para, dhurata ose kredite për lojëra, e pastaj pret diçka në këmbim.",
      example: "Të bleva kredite për lojën, tani ma ke borxh.",
    },
    personal_info: {
      title: "Kërkon të dhëna personale",
      short: "Adresën, shkollën, orarin, familjen ose fjalëkalimet e tua.",
      example: "Në cilën shkollë shkon? Kur je vetëm në shtëpi?",
    },
    images: {
      title: "Kërkon foto ose video",
      short: "Kërkon foto të tuat ose të dërgon përmbajtje seksuale.",
      example: "Më dërgo një foto tënden, vetëm për mua.",
    },
    move_platform: {
      title: "Do të kaloni në një aplikacion më privat",
      short: "Kërkon të kaloni diku „më privat“ ose të fshish mesazhet.",
      example: "Hajde të kalojmë në një aplikacion tjetër, atje është më privat.",
    },
    identity_doubt: {
      title: "Nuk është e qartë kush është",
      short: "Shmang videothirrjet, historia e tij nuk përputhet, profili duket i çuditshëm.",
      example: "Më është prishur kamera, nuk mund të bëj videothirrje.",
    },
    threats_guilt: {
      title: "Kërcënime ose faj",
      short: "Të kërcënon, të shantazhon ose thotë se faji do të jetë yti.",
      example: "Nëse i tregon dikujt, faji do të jetë yti.",
    },
    meeting: {
      title: "Do të takoheni",
      short: "Propozon të takoheni drejtpërdrejt, sidomos pa dijeninë e të rriturve.",
      example: "Hajde të takohemi, por mos u thuaj prindërve.",
    },
  },

  nextSteps: {
    title: "Çfarë mund të bësh tani",
  },

  help: {
    titleUrgent: "Fol me dikë tani",
    title: "Nëse do të flasësh me dikë",
    call: "Telefono",
    chat: "Chat",
    anonymity: "Nuk ke pse të thuash emrin tënd.",
    trustedAdult: "Ose fol me një të rritur që i beson: prindin, mësuesin, psikologun e shkollës.",
    unverified: "Numri ende nuk është verifikuar.",
    kinds: {
      childLine: "Linjë ndihme për fëmijët dhe të rinjtë.",
      sos: "Linja SOS e organizatës ASTRA.",
      police: "Nëse je në rrezik tani.",
    },
    policeName: "Policia",
  },

  helpPage: {
    title: "Kërko ndihmë",
    intro: "Nuk ke pse ta përballosh këtë vetëm. Këta janë njerëz që dinë si të ndihmojnë.",
    whatHappensTitle: "Çfarë ndodh kur telefonon",
    whatHappens: [
      "Do të përgjigjet dikush që është aty për të të dëgjuar, jo për të të gjykuar.",
      "Nuk ke pse të thuash emrin tënd apo ku jeton.",
      "Mund ta mbyllësh telefonatën kur të duash.",
    ],
    trustedAdultTitle: "Si t'i tregosh një të rrituri",
    trustedAdultTips: [
      "Zgjidh dikë që i beson. Nuk ka pse të jetë prind.",
      "Mund të fillosh me: „Më ndodhi diçka në internet dhe nuk di çfarë të bëj.“",
      "Trego pamjet e ekranit nëse kjo është më e lehtë se sa të shpjegosh.",
    ],
    historyTitle: "Për historikun e shfletuesit",
    historyNote:
      "Butoni Dil e fsheh shpejt këtë faqe, por vizita mund të shihet ende në historikun e shfletuesit. Një dritare private (incognito) është zgjedhja më e sigurt.",
    back: "Prapa",
  },

  error: {
    title: "Kontrolli nuk u krye",
    generic: "Këtë herë nuk arritëm t'i lexojmë mesazhet. Teksti yt nuk u ruajt askund.",
    offline: "Duket se nuk je në internet. Kontrollo lidhjen dhe provo përsëri.",
    rateLimited: "Pati shumë kontrolle në pak kohë. Prit disa minuta dhe provo përsëri.",
    retry: "Provo përsëri",
    meanwhile: "Ndërkohë, këto janë shenja të zakonshme paralajmëruese:",
    signsLink: "Shiko shenjat paralajmëruese",
  },

  quickExit: {
    label: "Dil",
    aria: "Largohu shpejt nga kjo faqe",
    hint: "Mund të shtypësh edhe Esc dy herë.",
  },

  signsGuide: {
    title: "Shenjat paralajmëruese",
    intro:
      "Këto janë truke të zakonshme që grabitqarët përdorin në internet. Një shenjë nuk do të thotë gjithmonë rrezik, por sa më shumë të shohësh, aq më e kujdesshme duhet të jesh.",
    exampleLabel: "Për shembull",
    outro: "Ke vënë re diçka nga këto? Nuk ke pse ta përballosh vetëm.",
    check: "Kontrollo një chat",
    help: "Kërko ndihmë",
  },

  readAloud: {
    start: "Lexo me zë",
    stop: "Ndalo leximin",
    signsIntro: "Çfarë vumë re.",
    stepsIntro: "Çfarë mund të bësh tani.",
    helpIntro: "Nëse do të flasësh me dikë:",
  },

  more: {
    title: "Më shumë mënyra për të marrë ndihmë",
    who: "Kontrollo kush është në anën tjetër",
    whoHighlight: "Nuk je i/e sigurt kush është në të vërtetë? Kontrollo këtu.",
    block: "Si të bllokosh dhe raportosh",
    signs: "Mëso shenjat paralajmëruese",
  },

  tell: {
    title: "Më ndihmo t'i tregoj dikujt",
    intro: "Nuk di si të fillosh? Zgjidh një mesazh, kopjoje dhe dërgoja dikujt që i beson.",
    copy: "Kopjo",
    copied: "U kopjua",
    send: "Dërgo",
    copyFailed: "Kopjimi nuk funksionoi. Mbaj të shtypur mesazhin për ta kopjuar.",
    messages: [
      {
        to: "Një prindi ose dikujt nga familja",
        text: "Hej, më ndodhi diçka në internet dhe nuk di çfarë të bëj. A mund të flasim sot? Të lutem mos u zemëro, thjesht kam nevojë për ndihmën tënde.",
      },
      {
        to: "Një mësuesi ose psikologut të shkollës",
        text: "Përshëndetje, a mund të flasim vetëm? Diçka në internet po më shqetëson dhe kam nevojë për një këshillë.",
      },
      {
        to: "Shkurt dhe thjesht",
        text: "A mund të flasim së shpejti? Diçka në internet po më shqetëson dhe kam nevojë për ndihmë.",
      },
    ],
  },

  who: {
    title: "Kush është në anën tjetër?",
    intro: "Përgjigju disa pyetjeve të shpejta për personin me të cilin po bisedon. Zgjat një minutë dhe asgjë nuk ruhet.",
    yes: "Po",
    no: "Jo",
    questions: [
      "A i shmang videothirrjet, apo ka gjithmonë një justifikim për të mos treguar fytyrën?",
      "A i ka ndryshuar historia, p.sh. mosha, shkolla ose vendi ku jeton?",
      "A është llogaria e re, apo ka shumë pak postime dhe miq?",
      "A është e vërtetë që askush që njeh nuk e njeh atë në jetën reale?",
      "A duken fotot shumë perfekte, si të një modeli ose nga interneti?",
      "A thotë se është në moshën tënde, por shkruan ose sillet si dikush shumë më i madh?",
    ],
    tally: (n: number, total: number) => `${n} nga ${total} shenja alarmi`,
    advice: {
      none: "Asgjë nuk bie në sy këtu. Megjithatë, mos u nxito kur njihesh me njerëz në internet dhe besoji ndjenjës tënde.",
      some: "Disa gjëra nuk përputhen. Ki kujdes çfarë ndan dhe mos prano të takoheni. Është mirë të flasësh me dikë që i beson.",
      many: "Shumë gjëra nuk përputhen. Ky person mund të mos jetë ai që thotë se është. Mos ndaj asgjë tjetër, mos u takoni dhe fol së shpejti me një të rritur që i beson.",
    },
    unanswered: "Përgjigju të gjitha pyetjeve për të parë rezultatin.",
    progress: (n: number, total: number) => `${n} nga ${total} të përgjigjura`,
    resultTitle: "Rezultati yt",
    startOver: "Fillo nga e para",
    reverseTitle: "Kontrollo foton e profilit",
    reverseIntro: "Llogaritë e rreme shpesh përdorin foto të dikujt tjetër. Kërkimi i kundërt i imazheve tregon ku tjetër shfaqet ajo foto në internet. Ne nuk e shohim kurrë foton: këtë e bën në një aplikacion tjetër.",
    reverseSteps: [
      "Bëj një pamje ekrani të fotos së profilit.",
      "Hap Google Lens (në aplikacionin Google ose Google Photos), ose shko te images.google.com në kompjuter.",
      "Kërko me pamjen e ekranit. Nëse e njëjta foto shfaqet me një emër tjetër, ose në faqen e një modeli apo të një banke fotosh, ki kujdes.",
    ],
    reverseTools: "Mjete të tjera falas: TinEye (tineye.com) dhe Bing Visual Search.",
    back: "Prapa",
  },

  block: {
    title: "Si të bllokosh dhe raportosh",
    intro: "Mund ta bllokosh dikë në çdo kohë. Nuk ke pse të shpjegosh pse.",
    evidenceTitle: "Para se të bllokosh: ruaj çfarë ndodhi",
    evidence: [
      "Bëj pamje ekrani të bisedës, emrit të përdoruesit dhe profilit.",
      "Shëno datën dhe aplikacionin.",
      "Ruaji diku privatisht ose tregoja një të rrituri që i beson.",
    ],
    imagesWarning:
      "Nëse të ka dërguar foto ose video seksuale, ose të ka kërkuar të tuat, mos i ruaj dhe mos i përcill, as si provë. Në vend të kësaj, tregoji një të rrituri që i beson ose policisë. Ata dinë si ta trajtojnë.",
    appsTitle: "Blloko dhe raporto në çdo aplikacion",
    apps: [
      {
        name: "Instagram",
        steps: ["Shko te profili i tij.", "Prek ⋯ në cepin e sipërm.", "Zgjidh Raporto (Report), pastaj Blloko (Block)."],
      },
      {
        name: "Snapchat",
        steps: ["Mbaj të shtypur emrin e tij në listën e bisedave.", "Prek Menaxho miqësinë (Manage Friendship).", "Zgjidh Raporto, pastaj Blloko."],
      },
      {
        name: "TikTok",
        steps: ["Shko te profili i tij.", "Prek shigjetën e ndarjes ose ⋯ në cepin e sipërm.", "Zgjidh Raporto, pastaj Blloko."],
      },
      {
        name: "Discord",
        steps: [
          "Për të raportuar një mesazh, mbaje të shtypur (ose kliko me të djathtën në kompjuter) dhe zgjidh Raporto (Report).",
          "Për të bllokuar, prek emrin ose foton e profilit, pastaj ⋯, pastaj Blloko (Block).",
        ],
      },
    ],
    note: "Menutë mund të duken pak ndryshe në varësi të versionit të aplikacionit. Kërko Raporto dhe Blloko te profili ose në bisedë.",
    back: "Prapa",
  },
};
