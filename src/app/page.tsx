import { en } from "../copy/en";
import PasteSheet from "../components/PasteSheet";

// Temporary home; the real state machine arrives in T019.
export default function Home() {
  return (
    <main className="mx-auto max-w-column px-5 py-12">
      <h1 className="text-headline">{en.home.headline}</h1>
      <p className="mt-3 text-ink-muted">{en.home.lead}</p>
      <PasteSheet />
    </main>
  );
}
