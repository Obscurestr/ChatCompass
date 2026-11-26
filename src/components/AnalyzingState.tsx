import { en } from "../copy/en";
import type { MaskResult } from "../lib/mask";
import MaskedChips, { withChips } from "./MaskedChips";

// T015: her (masked) text stays visible and dimmed; a calm pulsing ink dot; no spinner.
export default function AnalyzingState({ masked, counts }: { masked: string; counts: MaskResult["counts"] }) {
  return (
    <div aria-busy="true">
      <p role="status" className="flex items-center justify-center gap-3 font-display text-section font-bold">
        <span aria-hidden="true" className="pulse-dot inline-block size-3 rounded-full bg-ink" />
        {en.analyzing.status}
      </p>
      <MaskedChips counts={counts} />
      <div className="mt-6 max-h-80 overflow-y-auto whitespace-pre-wrap break-words rounded-sheet border-2 border-ink/25 bg-paper p-5 text-left opacity-60">
        {withChips(masked)}
      </div>
    </div>
  );
}
