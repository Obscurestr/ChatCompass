"use client";

import Link from "next/link";
import Doodle from "../../../../components/Doodle";
import LocaleSwitch from "../../../../components/LocaleSwitch";
import SignsGuide from "../../../../components/SignsGuide";
import { useLocale } from "../../../../i18n/LocaleProvider";

// T036 / FR-013 — warning-signs guide (prevention, school workshops).
export default function SignsPage() {
  const { copy, href } = useLocale();
  return (
    <main className="mx-auto max-w-column px-5 py-16">
      <LocaleSwitch />
      <header className="text-center">
        <Doodle name="chat" tone="yellow" className="mx-auto" />
        <h1 className="mt-6 text-headline">{copy.signsGuide.title}</h1>
      </header>

      <SignsGuide />

      <section className="mt-10 rounded-sheet bg-blush px-5 py-6 text-center">
        <p className="mx-auto font-display text-section font-bold">{copy.signsGuide.outro}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href={href()}
            replace
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 font-display font-bold text-milk hover:bg-berry"
          >
            {copy.signsGuide.check}
          </Link>
          <Link
            href={href("/help")}
            replace
            className="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-paper px-6 font-display font-bold btn-outline-hover"
          >
            {copy.signsGuide.help}
          </Link>
        </div>
      </section>
    </main>
  );
}
