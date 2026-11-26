import { en } from "../copy/en";

// T015: only a calm pulsing ink dot and "Reading carefully…". No text, no spinner.
export default function AnalyzingState() {
  return (
    <div aria-busy="true" className="flex min-h-[70dvh] items-center justify-center">
      <p role="status" className="flex items-center justify-center gap-3 font-display text-section font-bold">
        <span aria-hidden="true" className="pulse-dot inline-block size-3 rounded-full bg-ink" />
        {en.analyzing.status}
      </p>
    </div>
  );
}
