// All UI copy, in English. Voice: calm older friend, "you", short sentences, plain words, no blame.
// See plan.md → "Voice rules (copy)".

import { MAX_CHARS } from "../config/app";

export const en = {
  home: {
    headline: "Something feels off in a chat?",
    lead: "Paste the messages or upload screenshots.",
    inputLabel: "Messages or your own description",
    placeholder:
      "For example:\nThem: Don't tell anyone about us.\nMe: Why?\n\nYou can also describe what's happening in your own words.",
    maskNote: "Phone numbers, emails and links are hidden before sending.",
    screenshot: {
      add: "Add a screenshot",
      note: "Screenshots are read on your phone and never uploaded.",
      reading: (i: number, n: number, pct: number) =>
        n > 1 ? `Reading screenshot ${i + 1} of ${n}… ${pct}%` : `Reading your screenshot… ${pct}%`,
      ready: (n: number) => (n === 1 ? "1 screenshot ready" : `${n} screenshots ready`),
      readyHint: "Tap Check when you're ready.",
      remove: "Remove",
      removeLabel: "Remove the screenshots",
      empty: "We couldn't find any text in that picture. Try a clearer screenshot, or paste the messages.",
      failed: "Reading the screenshot didn't work this time. You can paste the messages instead.",
      tooMany: "You can add up to 5 screenshots at a time.",
    },
    disclosure: "Your text goes to an AI service for this check only. It isn't saved.",
    tooShort: "Paste a few messages, or write a couple of sentences about what's happening.",
    tooLong: "That's a lot. Paste just the latest messages, or the part that worries you most.",
    counter: (n: number) => `${n.toLocaleString("en")} / ${MAX_CHARS.toLocaleString("en")}`,
    submit: "Check",
    helpLink: "Get help now",
    incognitoHint: "Tip: Open this page in a private (incognito) window so it doesn't stay in your history.",
  },

  masked: {
    phone: "number hidden",
    email: "email hidden",
    url: "link hidden",
    summary: "We hid personal details before sending.",
  },

  analyzing: {
    status: "Reading carefully…",
  },

  result: {
    headline: {
      low: "We didn't find clear warning signs",
      watch: "Some things are worth a closer look",
      high: "This is worth taking seriously",
    },
    // Used by the server when the model's summary must be replaced (contract rules 2 and 4).
    summaryDefault: {
      low: "We didn't spot any clear warning signs in this chat.",
      watch: "Some things in this chat are worth a closer look. You don't have to figure it out alone.",
      high: "Some things in this chat can be signs of danger. Please talk to someone you trust soon.",
    },
    // Used when the model returns fewer than 2 usable next steps.
    nextStepsDefault: {
      low: [
        "Trust your feelings. If something feels off later, you can check again.",
        "Talk to an adult you trust if anything bothers you.",
      ],
      watch: [
        "You don't have to reply right away.",
        "Talk to an adult you trust or call a helpline.",
        "Take screenshots and save them somewhere safe.",
      ],
      high: [
        "Don't send anything else and don't agree to meet.",
        "Take screenshots and save them somewhere safe.",
        "Talk to an adult you trust or call a helpline today.",
        "This is not your fault.",
      ],
    },
    trustFeeling:
      "But if something still doesn't feel right, trust that. It's always okay to talk to someone about it.",
    yourMessages: "Your messages",
    markHint: "Tap a highlighted part to see why it matters.",
    signsWithoutQuote: "Things we noticed",
    notYourFault: "It's not your fault.",
    checkAnother: "Check another chat",
    identityLink: "How to check who's on the other side",
  },

  signSheet: {
    why: "Why this matters",
    close: "Close",
  },

  // Category names + one-line descriptions (also used as the general signs list on errors).
  categories: {
    secrecy: {
      title: "Wants it kept secret",
      short: "Someone who cares about you doesn't ask you to hide your chats from everyone.",
    },
    isolation: {
      title: "Pulls you away from others",
      short: "Says only they understand you, and your family or friends wouldn't get it.",
    },
    fast_intimacy: {
      title: "Moving too fast",
      short: "Lots of compliments and closeness in a very short time.",
    },
    pressure: {
      title: "Pressure",
      short: "Doesn't accept your “no”, keeps asking, or makes you feel guilty.",
    },
    gifts_favours: {
      title: "Gifts and favours",
      short: "Money, gifts or game credits — and then expects something back.",
    },
    personal_info: {
      title: "Asks for personal details",
      short: "Your address, school, schedule, family or passwords.",
    },
    images: {
      title: "Asks for photos or videos",
      short: "Asks for pictures of you, or sends sexual content.",
    },
    move_platform: {
      title: "Wants to move to a more private app",
      short: "Asks you to switch somewhere “more private” or to delete messages.",
    },
    identity_doubt: {
      title: "Not clear who they are",
      short: "Avoids video calls, their story doesn't add up, the profile seems odd.",
    },
    threats_guilt: {
      title: "Threats or blame",
      short: "Threatens you, blackmails you, or says it'll be your fault.",
    },
    meeting: {
      title: "Wants to meet up",
      short: "Suggests meeting in person, especially without adults knowing.",
    },
  },

  nextSteps: {
    title: "What you can do now",
  },

  help: {
    titleUrgent: "Talk to someone now",
    title: "If you want to talk to someone",
    call: "Call",
    chat: "Chat",
    anonymity: "You don't have to give your name.",
    trustedAdult: "Or talk to an adult you trust: a parent, a teacher, the school counsellor.",
    unverified: "Number not verified yet.",
    // Keyed by HelpContact.id in config/help.ts
    contacts: {
      // TODO(T026): confirm descriptions (cost, hours, anonymity) together with the numbers.
      nadel: { name: "NADEL", description: "National helpline for children and young people." },
      astra: { name: "ASTRA SOS", description: "SOS hotline run by ASTRA." },
      police: { name: "Police", description: "If you are in danger right now." },
    },
  },

  helpPage: {
    title: "Get help",
    intro: "You don't have to handle this alone. These are people who know how to help.",
    whatHappensTitle: "What happens when you call",
    whatHappens: [
      "Someone will answer who is there to listen, not to judge you.",
      "You don't have to say your name or where you live.",
      "You can end the call whenever you want.",
    ],
    trustedAdultTitle: "How to tell an adult",
    trustedAdultTips: [
      "Pick someone you trust. It doesn't have to be a parent.",
      "You can start with: “Something happened online and I don't know what to do.”",
      "Show them screenshots if that's easier than explaining.",
    ],
    historyTitle: "About your browser history",
    historyNote:
      "The Exit button hides this page fast, but the visit can still show up in your browser history. A private (incognito) window is the safest choice.",
    back: "Back",
  },

  error: {
    title: "The check didn't run",
    generic: "We couldn't read the messages this time. Your text wasn't saved anywhere.",
    offline: "Looks like you're offline. Check your connection, then try again.",
    rateLimited: "There were a lot of checks in a short time. Wait a few minutes, then try again.",
    retry: "Try again",
    meanwhile: "In the meantime, these are common warning signs:",
    signsLink: "See the warning signs",
  },

  quickExit: {
    label: "Exit",
    aria: "Leave this page quickly",
    hint: "You can also press Esc twice.",
  },

  // Links from the result screen and the Help page to the extra guides.
  more: {
    title: "More ways to get help",
    who: "Check who's on the other side",
    whoHighlight: "Not sure who they really are? Check it here.",
    block: "How to block and report",
  },

  // T034a — ready-made messages she can copy and send to someone she trusts. Never include her chat.
  tell: {
    title: "Help me tell someone",
    intro: "Not sure how to start? Pick a message, copy it and send it to someone you trust.",
    copy: "Copy",
    copied: "Copied",
    send: "Send",
    copyFailed: "Couldn't copy. Press and hold the message to copy it.",
    messages: [
      {
        to: "To a parent or family member",
        text: "Hey, something happened online and I don't know what to do. Can we talk today? Please don't be angry, I just need your help.",
      },
      {
        to: "To a teacher or school counsellor",
        text: "Hi, could I talk to you privately? Something is happening online that's worrying me, and I'd like some advice.",
      },
      {
        to: "Short and simple",
        text: "Can we talk soon? Something online is bothering me and I need help.",
      },
    ],
  },

  // T033 — Who's on the other side? (identity checklist)
  who: {
    title: "Who's on the other side?",
    intro: "Answer a few quick questions about the person you're chatting with. It only takes a minute, and nothing is saved.",
    yes: "Yes",
    no: "No",
    questions: [
      "Do they avoid video calls, or always have an excuse not to show their face?",
      "Has their story changed, like their age, school or where they live?",
      "Is their account new, or does it have very few posts or friends?",
      "Does nobody you know actually know them in real life?",
      "Do their photos look too perfect, like a model's or something from the internet?",
      "Do they say they're your age, but write or act a lot older?",
    ],
    tally: (n: number, total: number) => `${n} of ${total} red flags`,
    advice: {
      none: "Nothing here stands out. Still, take your time getting to know people online, and trust your gut.",
      some: "A few things don't add up. Be careful what you share, and don't agree to meet. It's a good idea to talk to someone you trust.",
      many: "Lots of things don't add up. This person may not be who they say they are. Don't share anything else, don't meet, and talk to an adult you trust soon.",
    },
    unanswered: "Answer all the questions to see your result.",
    reverseTitle: "Check their profile photo",
    reverseIntro: "Fake accounts often use photos copied from someone else. A reverse image search shows where else a photo appears online. We never see the photo: you do this in another app.",
    reverseSteps: [
      "Take a screenshot of their profile photo.",
      "Open Google Lens (in the Google app or Google Photos), or go to images.google.com on a computer.",
      "Search with the screenshot. If the same photo shows up under a different name, or on a model's or stock photo page, be careful.",
    ],
    reverseTools: "Other free tools: TinEye (tineye.com) and Bing Visual Search.",
    back: "Back",
  },

  // T034b — How to block and report
  block: {
    title: "How to block and report",
    intro: "You can block someone at any time. You don't have to explain why.",
    evidenceTitle: "Before you block: save what happened",
    evidence: [
      "Take screenshots of the chat, their username and their profile.",
      "Write down the date and the app.",
      "Save them somewhere private, or show them to an adult you trust.",
    ],
    imagesWarning:
      "If they sent sexual pictures or videos, or asked for yours, don't save or forward them, not even as proof. Tell an adult you trust or the police instead. They know how to handle it.",
    appsTitle: "Block and report in each app",
    apps: [
      {
        name: "Instagram",
        steps: ["Go to their profile.", "Tap ⋯ in the top corner.", "Choose Report, then Block."],
      },
      {
        name: "Snapchat",
        steps: ["Press and hold their name in your chat list.", "Tap Manage Friendship.", "Choose Report, then Block."],
      },
      {
        name: "TikTok",
        steps: ["Go to their profile.", "Tap the share arrow or ⋯ in the top corner.", "Choose Report, then Block."],
      },
      {
        name: "Discord",
        steps: [
          "To report a message, press and hold it (or right-click on a computer) and choose Report.",
          "To block, tap their name or profile picture, then ⋯, then Block.",
        ],
      },
    ],
    note: "Menus can look a little different depending on your app version. Look for Report and Block on their profile or in the chat.",
    back: "Back",
  },
} as const;

export type Copy = typeof en;
