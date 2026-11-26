import { en } from "../copy/en";

// Temporary placeholder; the real state machine arrives in T019.
export default function Home() {
  return (
    <main className="mx-auto max-w-column px-5 py-12">
      <h1 className="text-headline">{en.home.headline}</h1>
      <p className="mt-3 text-ink-muted">{en.home.lead}</p>
      <div className="mt-8 rounded-sheet border border-edge bg-paper p-5 shadow-sheet">
        <p>
          Latin-ext check: šđčćž — <mark className="rounded-mark bg-marker-yellow px-1">worth watching</mark>{" "}
          <mark className="rounded-mark bg-marker-rose px-1">serious</mark>
        </p>
      </div>
    </main>
  );
}
