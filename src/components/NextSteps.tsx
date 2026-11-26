import { en } from "../copy/en";

// T022 — next steps as a plain, non-interactive list with small doodle bullets.
export default function NextSteps({ steps }: { steps: string[] }) {
  return (
    <section aria-labelledby="steps-title">
      <h2 id="steps-title" className="text-section">
        {en.nextSteps.title}
      </h2>
      <ul className="mt-4 space-y-3 text-left">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span aria-hidden="true" className="mt-[0.55em] size-2.5 shrink-0 rounded-full bg-ink" />
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
