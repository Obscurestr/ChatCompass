"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { contactsFor } from "../config/help";
import type { Copy } from "../copy";
import { useLocale } from "../i18n/LocaleProvider";
import { LANG_INFO, type Country, type Lang } from "../i18n/locales";
import type { AnalysisResult } from "../lib/schema";

// Reads the result aloud for users who find reading hard (dyslexia, low vision, stress).
// Privacy: only voices that run ON the device (`localService`) are used — some browsers offer
// cloud voices that send the text to a server. If there is no on-device English voice, the button
// is hidden. The voice speaks the chosen language (close languages as fallback, e.g. a Croatian voice
// for Bosnian). Her own messages are never read out (someone may be nearby); only our result is.

export function localVoice(lang: Lang): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  const local = window.speechSynthesis.getVoices().filter((v) => v.localService);
  for (const prefix of LANG_INFO[lang].voices) {
    const voices = local.filter((v) => v.lang.toLowerCase().startsWith(prefix));
    const voice = voices.find((v) => v.default) ?? voices[0];
    if (voice) return voice;
  }
  return null;
}

// Voices load asynchronously; re-check when the browser says they changed.
const subscribe = (onChange: () => void) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return () => {};
  window.speechSynthesis.addEventListener("voiceschanged", onChange);
  return () => window.speechSynthesis.removeEventListener("voiceschanged", onChange);
};

/** The pieces to speak, in order. Short items so long results aren't cut off by some browsers. */
export function speechParts(result: AnalysisResult, copy: Copy, country: Country): string[] {
  const parts = [`${copy.result.headline[result.risk]}.`, result.summary];
  if (result.signs.length > 0) {
    parts.push(copy.readAloud.signsIntro);
    for (const sign of result.signs) parts.push(`${sign.title}. ${sign.explanation}`);
  }
  parts.push(copy.readAloud.stepsIntro, ...result.nextSteps);
  const contacts = contactsFor(country, result.risk)
    .map((c) => `${c.kind === "police" ? copy.help.policeName : c.name}, ${c.displayPhone ?? ""}`.trim())
    .join(". ");
  if (contacts) parts.push(`${copy.readAloud.helpIntro} ${contacts}.`);
  return parts;
}

export default function ReadAloud({ result }: { result: AnalysisResult }) {
  const { copy, country, lang } = useLocale();
  const available = useSyncExternalStore(subscribe, () => localVoice(lang) !== null, () => false);
  const [speaking, setSpeaking] = useState(false);

  // Stop talking when the result goes away (new check, start over, leaving the page).
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  if (!available) return null;

  function start() {
    const synth = window.speechSynthesis;
    const voice = localVoice(lang);
    if (!voice) return;
    synth.cancel();
    const parts = speechParts(result, copy, country);
    parts.forEach((text, i) => {
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice;
      u.lang = voice.lang;
      u.rate = 0.95;
      if (i === parts.length - 1) u.onend = () => setSpeaking(false);
      u.onerror = () => setSpeaking(false);
      synth.speak(u);
    });
    setSpeaking(true);
  }

  function stop() {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }

  return (
    <button
      type="button"
      onClick={speaking ? stop : start}
      aria-pressed={speaking}
      className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-ink bg-paper px-5 font-display font-bold btn-outline-hover"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 9.5h3.2L12 5.6v12.8l-4.8-3.9H4z" />
        {speaking ? <path d="M16 9.5l4 5M20 9.5l-4 5" /> : <path d="M15.6 9.2c1.2 1.6 1.2 4 0 5.6M18.4 7c2.3 2.9 2.3 7.1 0 10" />}
      </svg>
      {speaking ? copy.readAloud.stop : copy.readAloud.start}
    </button>
  );
}
