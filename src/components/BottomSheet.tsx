"use client";

import { useEffect, useRef } from "react";
import { en } from "../copy/en";
import { QuickExitButton } from "./QuickExit";

// Shared bottom sheet. Native <dialog> + showModal(): focus is trapped inside, Esc closes,
// focus returns to whatever opened it. Also closes via the X button, a backdrop tap,
// or a swipe down (only when the sheet is scrolled to the top, so scrolling still works).
export default function BottomSheet({
  open,
  onClose,
  labelledBy,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby={labelledBy}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose(); // backdrop tap
      }}
      onTouchStart={(e) => {
        touchStartY.current = (ref.current?.scrollTop ?? 0) <= 0 ? e.touches[0].clientY : null;
      }}
      onTouchEnd={(e) => {
        const start = touchStartY.current;
        touchStartY.current = null;
        if (start !== null && e.changedTouches[0].clientY - start > 80) onClose(); // swipe down
      }}
    >
      {/* The modal makes the page behind inert, so the sheet carries its own Exit pill. */}
      {open && <QuickExitButton />}
      {open && (
        <div className="px-5 pt-3 pb-[calc(1.75rem+env(safe-area-inset-bottom))] text-left">
          <div aria-hidden="true" className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink/20" />
          <div className="flex items-start justify-between gap-4">
            <h2 id={labelledBy} className="pt-1.5 text-section">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={en.signSheet.close}
              className="grid size-11 shrink-0 place-items-center rounded-full border-2 border-ink btn-outline-hover"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6.2 6.4l11.5 11.3M17.6 6.1L6.5 17.8" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
