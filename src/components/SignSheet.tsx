"use client";

import { useEffect, useRef } from "react";
import { en } from "../copy/en";
import type { Risk, WarningSign } from "../lib/schema";

// T018 — bottom sheet with one sign's explanation.
// Native <dialog> + showModal(): focus is trapped inside, Esc closes, focus returns to the mark.
// Also closes via the X button, a tap on the backdrop, or a swipe down.
export default function SignSheet({
  sign,
  risk,
  onClose,
}: {
  sign: WarningSign | null;
  risk: Risk;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (sign && !dialog.open) dialog.showModal();
    if (!sign && dialog.open) dialog.close();
  }, [sign]);

  const markColor = risk === "high" ? "bg-marker-rose" : "bg-marker-yellow";

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="sign-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // backdrop tap
      }}
      onTouchStart={(e) => {
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchEnd={(e) => {
        const start = touchStartY.current;
        touchStartY.current = null;
        if (start !== null && e.changedTouches[0].clientY - start > 80) onClose(); // swipe down
      }}
    >
      {sign && (
        <div className="px-5 pt-3 pb-[calc(1.75rem+env(safe-area-inset-bottom))] text-left">
          <div aria-hidden="true" className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink/20" />
          <div className="flex items-start justify-between gap-4">
            <h2 id="sign-title" className="pt-1.5 text-section">
              {sign.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={en.signSheet.close}
              className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6.2 6.4l11.5 11.3M17.6 6.1L6.5 17.8" />
              </svg>
            </button>
          </div>

          {sign.quote && (
            <p className="mt-4">
              <span className={`rounded-mark px-1 [box-decoration-break:clone] ${markColor}`}>
                &ldquo;{sign.quote}&rdquo;
              </span>
            </p>
          )}

          <p className="label-doodle mt-6">{en.signSheet.why}</p>
          <p className="mt-1">{sign.explanation}</p>
        </div>
      )}
    </dialog>
  );
}
