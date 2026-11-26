import { HELP_CONTACTS, contactsFor } from "../config/help";
import { en } from "../copy/en";
import type { Risk } from "../lib/schema";
import Doodle from "./Doodle";

// T021 — help contacts with tap-to-call, an anonymity line and the trusted-adult prompt.
// Shown on every result and error screen (constitution IV); first on `high` results.
export default function HelpBlock({
  risk,
  showAll = false,
  headingId = "help-title",
}: {
  risk: Risk;
  /** Help page: list every reachable contact, police included. */
  showAll?: boolean;
  headingId?: string;
}) {
  const contacts = showAll ? HELP_CONTACTS.filter((c) => c.phone || c.chatUrl) : contactsFor(risk);
  const urgent = risk === "high";

  return (
    <section
      aria-labelledby={headingId}
      className={`rounded-sheet border-2 border-ink p-5 text-left ${urgent ? "bg-blush" : "bg-paper"}`}
    >
      <div className="flex items-center gap-3">
        <Doodle name="phone" size={48} tone={urgent ? "paper" : "blush"} />
        <h2 id={headingId} className="text-section">
          {urgent ? en.help.titleUrgent : en.help.title}
        </h2>
      </div>

      <ul className="mt-4 divide-y-2 divide-ink/10">
        {contacts.map((contact) => {
          const copy = en.help.contacts[contact.id];
          return (
            <li key={contact.id} className="flex items-center justify-between gap-4 py-3">
              <div>
                <p>
                  <span className="font-bold">{copy.name}</span>
                  {contact.displayPhone && <span className="ml-2 tabular-nums">{contact.displayPhone}</span>}
                </p>
                <p className="text-small text-ink-muted">{copy.description}</p>
                {!contact.verified && <p className="text-small italic text-ink-muted">{en.help.unverified}</p>}
              </div>
              <div className="flex shrink-0 gap-2">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 font-display font-bold text-milk hover:bg-berry active:bg-berry"
                  >
                    {en.help.call}
                  </a>
                )}
                {contact.chatUrl && (
                  <a
                    href={contact.chatUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-5 font-display font-bold"
                  >
                    {en.help.chat}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-3 text-small">{en.help.anonymity}</p>
      <p className="mt-1 text-small text-ink-muted">{en.help.trustedAdult}</p>
    </section>
  );
}
