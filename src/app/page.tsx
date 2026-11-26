"use client";

// T019 — the check flow: idle → analysing → result | error. No URL state, nothing stored:
// her text lives only in this component's memory (FR-009).

import { useState } from "react";
import AnalyzingState from "../components/AnalyzingState";
import BlockGuide from "../components/BlockGuide";
import BottomSheet from "../components/BottomSheet";
import Doodle from "../components/Doodle";
import ErrorState, { type ErrorKind } from "../components/ErrorState";
import HelpBlock from "../components/HelpBlock";
import MarkedText from "../components/MarkedText";
import MaskedChips from "../components/MaskedChips";
import MoreHelp, { type Guide } from "../components/MoreHelp";
import NextSteps from "../components/NextSteps";
import PasteSheet, { combinedText, type Shots } from "../components/PasteSheet";
import RiskHeader from "../components/RiskHeader";
import SignSheet from "../components/SignSheet";
import TellSomeone from "../components/TellSomeone";
import WhoCheck from "../components/WhoCheck";
import { en } from "../copy/en";
import { findMarks } from "../lib/highlight";
import { mask, type MaskResult } from "../lib/mask";
import { AnalysisResultSchema, type AnalysisResult } from "../lib/schema";

type Counts = MaskResult["counts"];
type State =
  | { phase: "idle" }
  | { phase: "analysing"; masked: string; counts: Counts }
  | { phase: "result"; masked: string; counts: Counts; result: AnalysisResult; run: number }
  | { phase: "error"; masked: string; counts: Counts; error: ErrorKind };

function errorFromResponse(status: number, body: unknown): ErrorKind {
  const code = (body as { error?: string } | null)?.error;
  if (status === 429) return "rateLimited";
  if (code === "too_short") return "tooShort";
  if (code === "too_long") return "tooLong";
  return "generic";
}

export default function Home() {
  const [text, setText] = useState("");
  const [shots, setShots] = useState<Shots>({ count: 0, text: "" });
  const [state, setState] = useState<State>({ phase: "idle" });
  const [openSign, setOpenSign] = useState<number | null>(null);
  const [openGuide, setOpenGuide] = useState<Guide | null>(null);
  const [run, setRun] = useState(0);

  async function analyse() {
    // FR-002: personal details are masked here, before anything leaves the device.
    const { masked, counts } = mask(combinedText(text, shots));
    setOpenSign(null);
    setOpenGuide(null);
    setState({ phase: "analysing", masked, counts });
    window.scrollTo({ top: 0 });

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text: masked }),
        cache: "no-store",
        signal: AbortSignal.timeout(45_000),
      });
      const body: unknown = await res.json().catch(() => null);
      if (res.ok) {
        const parsed = AnalysisResultSchema.safeParse(body);
        if (parsed.success) {
          const next = run + 1;
          setRun(next);
          setState({ phase: "result", masked, counts, result: parsed.data, run: next });
          window.scrollTo({ top: 0 });
          return;
        }
      }
      setState({ phase: "error", masked, counts, error: errorFromResponse(res.status, body) });
    } catch {
      setState({ phase: "error", masked, counts, error: navigator.onLine === false ? "offline" : "generic" });
    }
  }

  function startOver() {
    setText("");
    setShots({ count: 0, text: "" });
    setOpenSign(null);
    setState({ phase: "idle" });
    window.scrollTo({ top: 0 });
  }

  // ---- idle ----
  if (state.phase === "idle") {
    return (
      <main className="mx-auto flex min-h-dvh max-w-column flex-col justify-center px-5 py-12 text-center">
        <Doodle name="chat" className="mx-auto" />
        <h1 className="mt-6 text-headline">{en.home.headline}</h1>
        <p className="mx-auto mt-3 text-ink-muted">{en.home.lead}</p>
        <PasteSheet
          value={text}
          onChange={setText}
          shots={shots}
          onShotsChange={setShots}
          onSubmit={analyse}
        />
        <p className="mx-auto mt-6 text-small text-ink-muted">{en.home.incognitoHint}</p>
      </main>
    );
  }

  // ---- analysing ----
  if (state.phase === "analysing") {
    return (
      <main className="mx-auto max-w-column px-5 py-12 text-center">
        <AnalyzingState />
      </main>
    );
  }

  // ---- error ----
  if (state.phase === "error") {
    return (
      <main className="mx-auto max-w-column px-5 py-12">
        <ErrorState
          kind={state.error}
          onRetry={analyse}
          onEdit={() => setState({ phase: "idle" })}
        />
      </main>
    );
  }

  // ---- result ----
  const { result, masked, counts } = state;
  const marks = findMarks(masked, result.signs);
  const marked = new Set(marks.map((m) => m.signIndex));
  const unquoted = result.signs.map((sign, i) => ({ sign, i })).filter(({ i }) => !marked.has(i));
  const dotColor = result.risk === "high" ? "bg-marker-rose" : "bg-marker-yellow";

  const header = <RiskHeader key="header" risk={result.risk} summary={result.summary} />;

  const herText = (
    <section key="text" aria-labelledby="text-title">
      <h2 id="text-title" className="text-section">
        {en.result.yourMessages}
      </h2>
      {marks.length > 0 && <p className="mx-auto mt-1 text-small text-ink-muted">{en.result.markHint}</p>}
      <MaskedChips counts={counts} />
      <div className="mt-4">
        <MarkedText text={masked} marks={marks} signs={result.signs} risk={result.risk} onOpen={setOpenSign} />
      </div>

      {unquoted.length > 0 && (
        <div className="mt-6 text-left">
          <p className="label-doodle">{en.result.signsWithoutQuote}</p>
          <ul className="mt-2 space-y-2">
            {unquoted.map(({ sign, i }) => (
              <li key={i}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setOpenSign(i)}
                  className="flex min-h-11 w-full items-center gap-3 rounded-sheet border-2 border-ink/15 bg-paper px-4 py-3 text-left font-bold"
                >
                  <span aria-hidden="true" className={`size-3 shrink-0 rounded-full ${dotColor}`} />
                  {sign.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );

  const steps = <NextSteps key="steps" steps={result.nextSteps} />;
  const help = <HelpBlock key="help" risk={result.risk} />;
  const tell = <TellSomeone key="tell" />;
  // T034 — highlight the identity check when the AI noticed identity doubts.
  const more = (
    <MoreHelp key="more" onOpen={setOpenGuide} highlightWho={result.signs.some((s) => s.category === "identity_doubt")} />
  );

  // T023 — on `high`, help comes right after the header.
  const sections =
    result.risk === "high"
      ? [header, help, herText, steps, tell, more]
      : [header, herText, steps, help, tell, more];

  return (
    <main key={state.run} className="mx-auto max-w-column space-y-12 px-5 py-12 text-center">
      {sections}
      <div>
        <button
          type="button"
          onClick={startOver}
          className="inline-flex min-h-11 items-center rounded-full border-2 border-ink px-6 font-display font-bold"
        >
          {en.result.checkAnother}
        </button>
      </div>
      <SignSheet
        sign={openSign !== null ? (result.signs[openSign] ?? null) : null}
        risk={result.risk}
        onClose={() => setOpenSign(null)}
      />
      {/* Guides open over the result so it isn't lost (it lives only in memory). */}
      <BottomSheet
        open={openGuide === "who"}
        onClose={() => setOpenGuide(null)}
        labelledBy="who-sheet-title"
        title={en.who.title}
      >
        <WhoCheck />
      </BottomSheet>
      <BottomSheet
        open={openGuide === "block"}
        onClose={() => setOpenGuide(null)}
        labelledBy="block-sheet-title"
        title={en.block.title}
      >
        <BlockGuide />
      </BottomSheet>
    </main>
  );
}
