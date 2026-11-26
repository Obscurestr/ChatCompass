import Link from "next/link";
import Doodle from "../../components/Doodle";
import HelpBlock from "../../components/HelpBlock";
import MoreHelp from "../../components/MoreHelp";
import TellSomeone from "../../components/TellSomeone";
import { en } from "../../copy/en";

// T024 + T028a — Get help: contacts, what happens when you call, telling an adult,
// and the honest note about browser history (FR-016).
export default function HelpPage() {
  const p = en.helpPage;
  return (
    <main className="mx-auto max-w-column px-5 py-12">
      <header className="text-center">
        <Doodle name="phone" className="mx-auto" />
        <h1 className="mt-6 text-headline">{p.title}</h1>
        <p className="mx-auto mt-3 text-ink-muted">{p.intro}</p>
      </header>

      <div className="mt-10">
        <HelpBlock risk="high" showAll />
      </div>

      <section className="mt-10" aria-labelledby="calling">
        <h2 id="calling" className="text-section">
          {p.whatHappensTitle}
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {p.whatHappens.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="adult">
        <h2 id="adult" className="text-section">
          {p.trustedAdultTitle}
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {p.trustedAdultTips.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <TellSomeone />
      </div>

      <div className="mt-10 text-center">
        <MoreHelp />
      </div>

      <section className="mt-10 rounded-sheet bg-blush px-5 py-4" aria-labelledby="history">
        <h2 id="history" className="text-section">
          {p.historyTitle}
        </h2>
        <p className="mt-2">{p.historyNote}</p>
        <p className="mt-2 text-small text-ink-muted">{en.quickExit.hint}</p>
      </section>

      <div className="mt-10 text-center">
        <Link
          href="/"
          replace
          className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-6 font-display font-bold"
        >
          {p.back}
        </Link>
      </div>
    </main>
  );
}
