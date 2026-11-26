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
        className="block w-full resize-y rounded-sheet border border-edge bg-paper p-5 text-body text-ink shadow-sheet caret-violet placeholder:text-ink-muted/70 focus:border-violet focus:outline-none focus:ring-4 focus:ring-violet/15"
      />
    </div>
  );
}
