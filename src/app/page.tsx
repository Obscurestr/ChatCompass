import { sr } from "../copy/sr";

// Temporary placeholder; the real state machine arrives in T019.
export default function Home() {
  return (
    <main className="mx-auto max-w-column px-5 py-12">
      <h1 className="text-headline">{sr.home.headline}</h1>
      <p className="mt-3 text-ink-muted">{sr.home.lead}</p>
      <div className="mt-8 rounded-sheet border border-edge bg-paper p-5 shadow-sheet">
        <p>
          Šđčćž — <mark className="rounded-mark bg-marker-yellow px-1">vredi pratiti</mark>{" "}
          <mark className="rounded-mark bg-marker-rose px-1">ozbiljno</mark>
        </p>
      </div>
    </main>
  );
}
