# Data Model

All entities live in memory only (request lifetime on the server, page lifetime in the browser).

```ts
type Risk = "low" | "watch" | "high";

type SignCategory =
  | "secrecy" | "isolation" | "fast_intimacy" | "pressure" | "gifts_favours"
  | "personal_info" | "images" | "move_platform" | "identity_doubt"
  | "threats_guilt" | "meeting";

interface AnalysisRequest { text: string }            // 20–6000 chars, masked

interface WarningSign {
  category: SignCategory;
  title: string;
  explanation: string;
  quote: string | null;                                // exact substring or null
}

interface AnalysisResult {
  risk: Risk;
  summary: string;
  signs: WarningSign[];                                // 0–6
  nextSteps: string[];                                 // 2–4
  escalate: boolean;
  floorTriggered: boolean;
}

interface HelpContact {
  id: string;
  name: string;
  description: string;
  phone?: string;
  chatUrl?: string;
  hours?: string;
  showOnHighOnly?: boolean;                            // e.g. police
  verified: boolean;                                   // must be true before demo
}

interface MaskResult { masked: string; counts: { phone: number; email: number; url: number } }
interface Mark { start: number; end: number; signIndex: number }
```

Client state machine (`page.tsx`): `idle → analysing → result | error`, and `any → exited` via QuickExit (clears state).
