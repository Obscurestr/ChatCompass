import { en } from "../copy/en";
import type { MaskResult } from "../lib/mask";

const TOKEN_LABEL: Record<string, string> = {
  "[phone]": en.masked.phone,
  "[email]": en.masked.email,
  "[link]": en.masked.url,
};
const TOKEN_SPLIT = /(\[(?:phone|email|link)\])/;

const chipClass = "inline-block rounded-full bg-blush px-2 py-0.5 align-baseline text-small text-ink-muted";

/** Renders masked text, showing [phone]/[email]/[link] tokens as soft chips. */
export function withChips(text: string, keyBase = "c"): React.ReactNode[] {
  return text.split(TOKEN_SPLIT).map((part, i) =>
    TOKEN_LABEL[part] ? (
      <span key={`${keyBase}${i}`} className={chipClass}>
        {TOKEN_LABEL[part]}
      </span>
    ) : (
      part
    ),
  );
}

/** "We hid personal details before sending." + one chip per kind, e.g. "number hidden ×2". */
export default function MaskedChips({ counts }: { counts: MaskResult["counts"] }) {
  const items = [
    { n: counts.phone, label: en.masked.phone },
    { n: counts.email, label: en.masked.email },
    { n: counts.url, label: en.masked.url },
  ].filter((item) => item.n > 0);
  if (items.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <span className="text-small text-ink-muted">{en.masked.summary}</span>
      {items.map((item) => (
        <span key={item.label} className={chipClass}>
          {item.label}
          {item.n > 1 ? ` ×${item.n}` : ""}
        </span>
      ))}
    </div>
  );
}
