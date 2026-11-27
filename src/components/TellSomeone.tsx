"use client";

import { useState, useSyncExternalStore } from "react";
import { en } from "../copy/en";

// Web Share exists only in some browsers; read it after hydration so server and client HTML match.
const noSubscribe = () => () => {};
const hasShare = () => typeof navigator.share === "function";

// T034a — ready-made messages to start the conversation with a trusted adult.
// Fixed text only: nothing from her chat is ever put into these messages.
export default function TellSomeone() {
  const [copied, setCopied] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const canShare = useSyncExternalStore(noSubscribe, hasShare, () => false);

  async function copy(i: number, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(i);
      setFailed(false);
    } catch {
      setFailed(true);
    }
  }

  async function share(text: string) {
    try {
      await navigator.share({ text });
    } catch {
      // she closed the share sheet — nothing to do
    }
  }

  return (
    <section aria-labelledby="tell-title" className="text-left">
      <h2 id="tell-title" className="text-center text-section">
        {en.tell.title}
      </h2>
      <p className="mx-auto mt-2 text-center text-ink-muted">{en.tell.intro}</p>

      <ul className="mt-4 space-y-3">
        {en.tell.messages.map((message, i) => (
          <li key={message.to} className="rounded-sheet border-2 border-ink bg-paper p-4">
            <p className="label-doodle">{message.to}</p>
            <p className="mt-1 select-text">{message.text}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => copy(i, message.text)}
                className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 font-display font-bold text-milk hover:bg-berry active:bg-berry"
              >
                {copied === i ? en.tell.copied : en.tell.copy}
              </button>
              {canShare && (
                <button
                  type="button"
                  onClick={() => share(message.text)}
                  className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-5 font-display font-bold btn-outline-hover"
                >
                  {en.tell.send}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p role="status" className="mt-2 min-h-5 text-small text-ink-muted">
        {failed ? en.tell.copyFailed : ""}
      </p>
    </section>
  );
}
