"use client";

import { useEffect, useRef, useState } from "react";
import { en } from "../copy/en";

// Early version of T014: the paper textarea. Counter, masking chips and the Check button come later.
export default function PasteSheet() {
  const [text, setText] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  // Focus on load so the caret is already blinking in the field.
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="mt-8">
      {/* Visually hidden; kept for screen readers. */}
      <label htmlFor="chat" className="sr-only">
        {en.home.inputLabel}
      </label>
      <textarea
        id="chat"
        ref={ref}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={en.home.placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="sentences"
        spellCheck={false}
        rows={9}
        className="block w-full resize-y rounded-sheet border-2 border-ink bg-paper p-5 text-left text-body text-ink caret-berry placeholder:text-ink-muted/75 focus:border-berry focus:outline-none focus:ring-4 focus:ring-berry/15"
      />
    </div>
  );
}
