import Link from "next/link";
import Doodle from "../../components/Doodle";
import SignsGuide from "../../components/SignsGuide";
import { en } from "../../copy/en";

// T036 / FR-013 — warning-signs guide (prevention, school workshops).
export default function SignsPage() {
  return (
    <main className="mx-auto max-w-column px-5 py-12">
      <header className="text-center">
        <Doodle name="chat" tone="yellow" className="mx-auto" />
        <h1 className="mt-6 text-headline">{en.signsGuide.title}</h1>
      </header>

      <SignsGuide />

      <section className="mt-10 rounded-sheet bg-blush px-5 py-6 text-center">
        <p className="mx-auto font-display text-section font-bold">{en.signsGuide.outro}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            replace
            className="inline-flex min-h-11 items-center rounded-full bg-ink px-6 font-display font-bold text-milk hover:bg-berry"
          >
            {en.signsGuide.check}
          </Link>
          <Link
            href="/help"
            replace
            className="inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-paper px-6 font-display font-bold btn-outline-hover"
          >
            {en.signsGuide.help}
          </Link>
        </div>
      </section>
    </main>
  );
}
