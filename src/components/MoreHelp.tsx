import Link from "next/link";
import { en } from "../copy/en";

export type Guide = "who" | "block" | "signs";

// Entry points to the extra guides.
// On the result screen (onOpen given) they open in a sheet, so the result isn't lost;
// elsewhere they are links to the /who and /block pages.
// With an identity_doubt sign on the result, the "who" entry is highlighted (T034).
export default function MoreHelp({
  onOpen,
  highlightWho = false,
}: {
  onOpen?: (guide: Guide) => void;
  highlightWho?: boolean;
}) {
  const base =
    "flex min-h-11 w-full items-center justify-between gap-3 rounded-sheet border-2 border-ink px-5 py-3 text-left font-display font-bold";
  const arrow = (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5.5l6.6 6.4L9.2 18.5" />
    </svg>
  );
  const items: Array<{ guide: Guide; label: string; href: string; className: string }> = [
    { guide: "who", label: en.more.who, href: "/who", className: `${base} ${highlightWho ? "bg-marker-yellow hover:brightness-95" : "bg-paper btn-outline-hover"}` },
    { guide: "block", label: en.more.block, href: "/block", className: `${base} bg-paper btn-outline-hover` },
    { guide: "signs", label: en.more.signs, href: "/signs", className: `${base} bg-paper btn-outline-hover` },
  ];

  return (
    <section aria-labelledby="more-title">
      <h2 id="more-title" className="text-section">
        {en.more.title}
      </h2>
      <div className="mt-4 space-y-3">
        {highlightWho && <p className="text-small font-bold">{en.more.whoHighlight}</p>}
        {items.map((item) =>
          onOpen ? (
            <button key={item.guide} type="button" aria-haspopup="dialog" onClick={() => onOpen(item.guide)} className={item.className}>
              {item.label}
              {arrow}
            </button>
          ) : (
            <Link key={item.guide} href={item.href} replace className={item.className}>
              {item.label}
              {arrow}
            </Link>
          ),
        )}
      </div>
    </section>
  );
}
