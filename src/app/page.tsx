import { en } from "../copy/en";
import Doodle from "../components/Doodle";
import PasteSheet from "../components/PasteSheet";

// Temporary home; the real state machine arrives in T019.
export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-column flex-col justify-center px-5 py-12 text-center">
      <Doodle name="chat" className="mx-auto" />
      <h1 className="mt-6 text-headline">{en.home.headline}</h1>
      <p className="mx-auto mt-3 text-ink-muted">{en.home.lead}</p>
      <PasteSheet />
    </main>
  );
}
