"use client";

import Link from "next/link";
import { useLocale } from "../i18n/LocaleProvider";
import Doodle from "./Doodle";
import HelpBlock from "./HelpBlock";

export type ErrorKind = "offline" | "rateLimited" | "tooShort" | "tooLong" | "generic";

// T025 — explains what happened, offers a retry, and still shows help + the general warning signs.
export default function ErrorState({
  kind,
  onRetry,
  onEdit,
}: {
  kind: ErrorKind;
  onRetry: () => void;
  onEdit: () => void;
}) {
  const { copy, href } = useLocale();
  const MESSAGES: Record<ErrorKind, string> = {
    offline: copy.error.offline,
    rateLimited: copy.error.rateLimited,
    tooShort: copy.home.tooShort,
    tooLong: copy.home.tooLong,
    generic: copy.error.generic,
  };
  const canRetry = kind !== "tooShort" && kind !== "tooLong";

  return (
    <div className="space-y-10">
      <header className="text-center">
        <Doodle name="chat" className="mx-auto" />
        <h1 className="mt-6 text-headline">{copy.error.title}</h1>
        <p role="alert" className="mx-auto mt-3 text-ink-muted">
          {MESSAGES[kind]}
        </p>
        <button
          type="button"
          onClick={canRetry ? onRetry : onEdit}
          className="mt-6 h-13 w-full rounded-full bg-ink px-8 font-display text-[1.125rem] font-bold text-milk hover:bg-berry active:bg-berry"
        >
          {canRetry ? copy.error.retry : copy.result.checkAnother}
        </button>
      </header>

      <HelpBlock risk="watch" />

      <section aria-labelledby="signs-title" className="text-left">
        <h2 id="signs-title" className="text-section">
          {copy.error.meanwhile}
        </h2>
        <ul className="mt-4 space-y-3">
          {Object.values(copy.categories).map((category) => (
            <li key={category.title}>
              <p className="font-bold">{category.title}</p>
              <p className="text-small text-ink-muted">{category.short}</p>
            </li>
          ))}
        </ul>
        <Link
          href={href("/signs")}
          replace
          className="mt-4 inline-flex min-h-11 items-center font-display font-bold text-berry underline decoration-2 underline-offset-4 hover:text-ink"
        >
          {copy.error.signsLink}
        </Link>
      </section>
    </div>
  );
}
