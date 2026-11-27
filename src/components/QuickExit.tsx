"use client";

import { useEffect, useRef } from "react";
import { EXIT_URL } from "../config/app";
import { en } from "../copy/en";

// T027 — Quick exit (FR-008, constitution III).
// One tap replaces the current history entry with a neutral site, so Back doesn't return here.
// Leaving the page also drops everything held in memory (her text and the result).
// Honest limit: the visit can still appear in browser history (see the Help page, FR-016).

export function quickExit() {
  try {
    // Hide everything immediately while the neutral site loads.
    document.title = "";
    document.body.style.visibility = "hidden";
  } catch {
    // ignore — leaving anyway
  }
  window.location.replace(EXIT_URL);
}

/** The pill itself. Rendered in the layout, and again inside modal sheets (which make the page behind inert). */
export function QuickExitButton() {
  return (
    <button
      type="button"
      onClick={quickExit}
      aria-label={en.quickExit.aria}
      title={en.quickExit.hint}
      className="fixed right-3 top-[max(0.75rem,env(safe-area-inset-top))] z-50 inline-flex min-h-11 items-center rounded-full border-2 border-ink bg-paper px-5 font-display font-bold text-ink btn-outline-hover"
    >
      {en.quickExit.label}
    </button>
  );
}

/** Layout-level: the pill + the Esc-Esc shortcut on desktop. */
export default function QuickExit() {
  const lastEsc = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // While a sheet is open, Esc closes the sheet (native <dialog>); it doesn't count towards exit.
      if (document.querySelector("dialog[open]")) {
        lastEsc.current = 0;
        return;
      }
      const now = Date.now();
      if (now - lastEsc.current < 800) quickExit();
      else lastEsc.current = now;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return <QuickExitButton />;
}
