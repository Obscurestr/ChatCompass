// Helplines. Numbers are configuration and MUST be verified by a human before the demo (T026).
// Set `verified: true` only after calling/confirming. Names and descriptions shown to the user live in copy/en.ts.

export interface HelpContact {
  id: "nadel" | "astra" | "police";
  phone?: string; // dialled as tel:<phone>, digits only
  displayPhone?: string; // how it's shown
  chatUrl?: string;
  hours?: string;
  showOnHighOnly?: boolean; // e.g. police
  verified: boolean;
}

export const HELP_CONTACTS: HelpContact[] = [
  {
    id: "nadel",
    phone: "116111",
    displayPhone: "116 111",
    verified: false,
  },
  {
    id: "astra",
    // TODO(T026): get the SOS hotline number and hours from ASTRA.
    verified: false,
  },
  {
    id: "police",
    phone: "192",
    displayPhone: "192",
    showOnHighOnly: true,
    verified: false,
  },
];

/** Contacts to show for a given risk level; contacts without any way to reach them are hidden. */
export function contactsFor(risk: "low" | "watch" | "high"): HelpContact[] {
  return HELP_CONTACTS.filter(
    (c) => (c.phone || c.chatUrl) && (!c.showOnHighOnly || risk === "high"),
  );
}
