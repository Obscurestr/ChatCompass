// Helplines per country (FR-024). Numbers are configuration and MUST be verified by a human before the demo (T026, T047).
// Set `verified: true` only after calling/confirming; unverified numbers show "Number not verified yet".
// Sources for the unverified ones: Child Helpline International, UNICEF (research.md, 2026-11-27).
// Names are proper names; the short description comes from copy (help.kinds) in her language.

import type { Country } from "../i18n/locales";

export type HelpKind = "childLine" | "sos" | "police";

export interface HelpContact {
  id: string;
  kind: HelpKind;
  /** Proper name; for police the localised word "Police" (help.policeName) is used instead. */
  name?: string;
  phone?: string; // dialled as tel:<phone>, digits only
  displayPhone?: string; // how it's shown
  chatUrl?: string;
  showOnHighOnly?: boolean; // e.g. police
  verified: boolean;
}

export const HELP_CONTACTS: Record<Country, HelpContact[]> = {
  rs: [
    { id: "nadel", kind: "childLine", name: "NADEL", phone: "116111", displayPhone: "116 111", verified: true }, // confirmed 2026-11-26
    // TODO(T026): get the ASTRA SOS hotline number and hours. Hidden until it has a number.
    { id: "astra", kind: "sos", name: "ASTRA SOS", verified: false },
    { id: "police", kind: "police", phone: "192", displayPhone: "192", showOnHighOnly: true, verified: true }, // confirmed 2026-11-26
  ],
  hr: [
    // Mon–Fri 9–20, free.
    { id: "hrabri", kind: "childLine", name: "Hrabri telefon", phone: "116111", displayPhone: "116 111", verified: false },
    { id: "police", kind: "police", phone: "192", displayPhone: "192", showOnHighOnly: true, verified: false },
  ],
  ba: [
    // Weekdays 9–17, free.
    { id: "plavi", kind: "childLine", name: "Plavi telefon", phone: "080050305", displayPhone: "080 05 03 05", verified: false },
    { id: "police", kind: "police", phone: "122", displayPhone: "122", showOnHighOnly: true, verified: false },
  ],
  me: [
    // 24/7.
    { id: "djecja", kind: "childLine", name: "Dječja linija", phone: "116111", displayPhone: "116 111", verified: false },
    { id: "police", kind: "police", phone: "122", displayPhone: "122", showOnHighOnly: true, verified: false },
  ],
  mk: [
    // Sources disagree: 0800 12222 (SOS line) vs +389 70 390 632 (Child Helpline International). Verify (T047).
    { id: "bushavko", kind: "childLine", name: "Ало Бушавко", phone: "080012222", displayPhone: "0800 12222", verified: false },
    { id: "police", kind: "police", phone: "192", displayPhone: "192", showOnHighOnly: true, verified: false },
  ],
  al: [
    // 24/7, free.
    { id: "alo116", kind: "childLine", name: "ALO 116 111", phone: "116111", displayPhone: "116 111", verified: false },
    { id: "police", kind: "police", phone: "129", displayPhone: "129", showOnHighOnly: true, verified: false },
  ],
};

const reachable = (c: HelpContact) => Boolean(c.phone || c.chatUrl);

/** Every reachable contact in a country (Help page). */
export function allContacts(country: Country): HelpContact[] {
  return HELP_CONTACTS[country].filter(reachable);
}

/** Contacts to show for a given risk level; contacts without any way to reach them are hidden. */
export function contactsFor(country: Country, risk: "low" | "watch" | "high"): HelpContact[] {
  return allContacts(country).filter((c) => !c.showOnHighOnly || risk === "high");
}
