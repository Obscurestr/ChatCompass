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
} as const;

export type Copy = typeof en;
