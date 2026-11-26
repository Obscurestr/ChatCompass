import { en } from "../copy/en";
import type { Risk } from "../lib/schema";
import Doodle from "./Doodle";

// T016: headline + summary. low → mint wash, watch → yellow underline, high → rose label.
export default function RiskHeader({ risk, summary }: { risk: Risk; summary: string }) {
  const headline = en.result.headline[risk];

  return (
    <header className="text-center">
      {risk === "low" && <Doodle name="heart" tone="mint" className="mx-auto" />}
      {risk === "watch" && <Doodle name="chat" tone="yellow" className="mx-auto" />}
      {risk === "high" && <Doodle name="phone" tone="rose" className="mx-auto" />}

      <h1 className={`mt-6 text-headline ${risk === "high" ? "text-rose-ink" : ""}`}>
        {risk === "watch" ? (
          <span className="underline decoration-marker-yellow decoration-[0.22em] underline-offset-[0.18em] [text-decoration-skip-ink:none]">
            {headline}
          </span>
        ) : (
          headline
        )}
      </h1>

      {risk === "low" ? (
        <div className="mt-5 rounded-sheet bg-marker-mint/55 px-5 py-4">
          <p className="mx-auto">{summary}</p>
          <p className="mx-auto mt-2 text-ink-muted">{en.result.trustFeeling}</p>
        </div>
      ) : (
        <p className="mx-auto mt-3 text-ink-muted">{summary}</p>
      )}
    </header>
  );
}
