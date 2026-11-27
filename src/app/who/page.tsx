import Link from "next/link";
import Doodle from "../../components/Doodle";
import WhoCheck from "../../components/WhoCheck";
import { en } from "../../copy/en";

// T033 — standalone page (linked from Help). On the result screen the same content opens in a sheet.
export default function WhoPage() {
  return (
    <main className="mx-auto max-w-column px-5 py-12">
      <header className="text-center">
        <Doodle name="chat" tone="yellow" className="mx-auto" />
        <h1 className="mt-6 text-headline">{en.who.title}</h1>
      </header>
      <WhoCheck />
      <div className="mt-10 text-center">
        <Link href="/help" replace className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-6 font-display font-bold btn-outline-hover">
          {en.who.back}
        </Link>
      </div>
    </main>
  );
}
