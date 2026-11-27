"use client";

import Link from "next/link";
import Doodle from "../../../../components/Doodle";
import LocaleSwitch from "../../../../components/LocaleSwitch";
import WhoCheck from "../../../../components/WhoCheck";
import { useLocale } from "../../../../i18n/LocaleProvider";

// T033 — standalone page (linked from Help). On the result screen the same content opens in a sheet.
export default function WhoPage() {
  const { copy, href } = useLocale();
  return (
    <main className="mx-auto max-w-column px-5 py-16">
      <LocaleSwitch />
      <header className="text-center">
        <Doodle name="chat" tone="yellow" className="mx-auto" />
        <h1 className="mt-6 text-headline">{copy.who.title}</h1>
      </header>
      <WhoCheck />
      <div className="mt-10 text-center">
        <Link href={href("/help")} replace className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-6 font-display font-bold btn-outline-hover">
          {copy.who.back}
        </Link>
      </div>
    </main>
  );
}
