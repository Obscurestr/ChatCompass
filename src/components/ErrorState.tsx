import { en } from "../copy/en";
import Doodle from "./Doodle";
import HelpBlock from "./HelpBlock";

export type ErrorKind = "offline" | "rateLimited" | "tooShort" | "tooLong" | "generic";

const MESSAGES: Record<ErrorKind, string> = {
  offline: en.error.offline,
  rateLimited: en.error.rateLimited,
  tooShort: en.home.tooShort,
  tooLong: en.home.tooLong,
  generic: en.error.generic,
};

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
  const canRetry = kind !== "tooShort" && kind !== "tooLong";

  return (
    <div className="space-y-10">
      <header className="text-center">
        <Doodle name="chat" className="mx-auto" />
        <h1 className="mt-6 text-headline">{en.error.title}</h1>
        <p role="alert" className="mx-auto mt-3 text-ink-muted">
          {MESSAGES[kind]}
        </p>
        <button
          type="button"
          onClick={canRetry ? onRetry : onEdit}
          className="mt-6 h-13 w-full rounded-full bg-ink px-8 font-display text-[1.125rem] font-bold text-milk hover:bg-berry active:bg-berry"
        >
          {canRetry ? en.error.retry : en.result.checkAnother}
        </button>
      </header>

      <HelpBlock risk="watch" />

      <section aria-labelledby="signs-title" className="text-left">
        <h2 id="signs-title" className="text-section">
          {en.error.meanwhile}
        </h2>
        <ul className="mt-4 space-y-3">
          {Object.values(en.categories).map((category) => (
            <li key={category.title}>
              <p className="font-bold">{category.title}</p>
              <p className="text-small text-ink-muted">{category.short}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
