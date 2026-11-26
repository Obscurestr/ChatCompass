import { en } from "../copy/en";

// T022 — next steps, each in its own soft speech bubble. Not interactive.
export default function NextSteps({ steps }: { steps: string[] }) {
  return (
    <section aria-labelledby="steps-title">
      <h2 id="steps-title" className="text-section">
        {en.nextSteps.title}
      </h2>
      <ul className="mt-4 space-y-3 text-left">
        {steps.map((step, i) => (
          <li key={i} className="rounded-[22px] rounded-bl-[6px] bg-blush px-5 py-3.5">
            {step}
          </li>
        ))}
      </ul>
    </section>
  );
}
