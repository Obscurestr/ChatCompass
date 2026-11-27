"use client";

import type { Copy } from "../copy";
import { useLocale } from "../i18n/LocaleProvider";
import type { MaskResult } from "../lib/mask";

const tokenLabel = (masked: Copy["masked"]): Record<string, string> => ({
  "[phone]": masked.phone,
  "[email]": masked.email,
  "[link]": masked.url,
});
const TOKEN_SPLIT = /(\[(?:phone|email|link)\])/;

const chipClass = "inline-block rounded-full bg-blush px-2 py-0.5 align-baseline text-small text-ink-muted";

/** Renders masked text, showing [phone]/[email]/[link] tokens as soft chips. */
export function withChips(text: string, masked: Copy["masked"], keyBase = "c"): React.ReactNode[] {
  const labels = tokenLabel(masked);
  return text.split(TOKEN_SPLIT).map((part, i) =>
    labels[part] ? (
      <span key={`${keyBase}${i}`} className={chipClass}>
        {labels[part]}
      </span>
    ) : (
      part
    ),
  );
}

/** "We hid personal details before sending." + one chip per kind, e.g. "number hidden ×2". */
export default function MaskedChips({ counts }: { counts: MaskResult["counts"] }) {
  const { copy } = useLocale();
  const items = [
    { n: counts.phone, label: copy.masked.phone },
    { n: counts.email, label: copy.masked.email },
    { n: counts.url, label: copy.masked.url },
  ].filter((item) => item.n > 0);
  if (items.length === 0) return null;

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <span className="text-small text-ink-muted">{copy.masked.summary}</span>
      {items.map((item) => (
        <span key={item.label} className={chipClass}>
          {item.label}
          {item.n > 1 ? ` ×${item.n}` : ""}
        </span>
      ))}
    </div>
  );
}
