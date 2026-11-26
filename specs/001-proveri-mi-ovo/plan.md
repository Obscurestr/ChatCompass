# Implementation Plan: Proveri — check a conversation for warning signs

**Branch**: `001-proveri-mi-ovo` | **Date**: 2026-11-26 | **Spec**: [spec.md](./spec.md)

## Summary
A mobile-first PWA where a teenager pastes a conversation, the text is masked on-device, sent once to a single server route that calls Claude with a strict system prompt and a JSON schema, passed through a deterministic safety floor, and rendered as a calm result: risk level, the user's own text with "highlighter" marks on the worrying phrases, next steps, and help contacts. No database, no accounts, quick exit everywhere.

## Technical Context
**Language/Version**: TypeScript 5, Node 20
**Framework**: Next.js latest stable (App Router; whatever `create-next-app@latest` installs), React 19
**Styling**: Tailwind CSS v4 with the design tokens below; no component kit (keeps the look ours)
**Motion**: CSS only (one orchestrated moment, see Design)
**AI**: `@anthropic-ai/sdk`, model from `ANTHROPIC_MODEL` env (default `claude-sonnet-5-5`), `temperature: 0`, `max_tokens: 1200`, 20 s timeout, one retry on invalid JSON. Set a monthly spend limit on the API key.
**Demo mode**: `DEMO_MODE=fallback` returns pre-recorded results for samples A–G (matched by hash) if the API fails, so the live demo never dies
**Validation**: `zod` for request and response
**Storage**: none
**Testing**: manual (Tamara, `quickstart.md`) + 3–4 Vitest unit tests for `mask.ts`, `safetyFloor.ts`, `highlight.ts`
**Target**: Android Chrome, iOS Safari, desktop Chrome for the projector
**Deploy**: Vercel (env: `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `NEXT_PUBLIC_EXIT_URL`, `NEXT_PUBLIC_APP_NAME`, `DEMO_MODE`)
**Performance goal**: result in ≤ 10 s p90; first load ≤ 2 s on 4G
**Constraints**: text only; nothing persisted; no request bodies in logs

## Constitution Check
| Principle | How the plan complies |
|---|---|
| I. Safety over features | Safety floor overrides the model; help block on every result and error; never says "safe" (enforced in prompt and in a post-check) |
| II. Privacy | Textarea has `autocomplete="off"`, `spellcheck={false}` (cloud spell-check could send text elsewhere); one-line disclosure under the button that the text goes to an AI service for this check only and is not saved; No DB, no analytics, on-device masking, no localStorage, route never logs the body, text-only input |
| III. Discretion | `QuickExit` component in root layout, `location.replace`, Esc-Esc shortcut, neutral title from env, `Referrer-Policy: no-referrer`, `noindex`. Honest limit: the visit still appears in browser history, so the Help page and home hint suggest a private/incognito tab |
| IV. Human help | `HelpBlock` component reused on result, error and help screens |
| V. Calm language | All copy in `src/copy/en.ts`, reviewed against the voice rules below |
| VI. Beautiful | Design system below is binding; 360 px check in every task's done-definition |
| VII. Scope | P1 = US1–US3; P2/P3 only after Day 2 midday checkpoint |

**Gate**: PASS

## Project Structure

### Documentation (this feature)
```
specs/001-proveri-mi-ovo/
├── spec.md
├── plan.md            # this file
├── research.md
├── data-model.md
├── quickstart.md      # setup + Tamara's manual test script + sample conversations
├── contracts/
│   └── analyze-api.md # API contract + system prompt
└── tasks.md
```

### Source Code
```
src/
├── app/
│   ├── layout.tsx            # fonts, tokens, QuickExit, neutral <title>
│   ├── page.tsx              # input → loading → result state machine (no URL state)
│   ├── help/page.tsx        # Get help
│   ├── who/page.tsx          # P2 identity checklist
│   ├── signs/page.tsx        # P3 warning-signs guide
│   ├── api/analyze/route.ts  # POST, calls Claude
│   └── manifest.ts           # PWA manifest (name from env)
├── components/
│   ├── QuickExit.tsx
│   ├── PasteSheet.tsx        # the input "paper"
│   ├── AnalyzingState.tsx
│   ├── RiskHeader.tsx
│   ├── MarkedText.tsx        # user text with highlighter marks (signature element)
│   ├── SignSheet.tsx         # bottom sheet with one sign's explanation
│   ├── NextSteps.tsx
│   ├── HelpBlock.tsx
│   └── ErrorState.tsx
├── lib/
│   ├── mask.ts               # phone/email/URL masking
│   ├── safetyFloor.ts        # keyword/regex danger detector (English)
│   ├── highlight.ts          # find quote ranges in text, tolerant of whitespace/case
│   ├── prompt.ts             # system prompt (from contracts/analyze-api.md)
│   └── schema.ts             # zod schemas
├── config/
│   ├── help.ts               # helplines (verified flag)
│   └── app.ts                # app name, exit URL
└── copy/en.ts                # all UI strings
public/icons/                 # neutral PWA icons
```

**Structure Decision**: single Next.js web app; one serverless route is the only backend.

## Request Flow
1. User pastes text → `mask()` runs client-side → masked text shown as the analysed version.
2. `POST /api/analyze { text }` → zod validates length → `safetyFloor(text)` computed.
3. Claude call with system prompt + text in a `<conversation>` block; JSON parsed and zod-validated; one retry on failure.
4. Post-processing: if floor triggered, `risk = "high"` and `escalate = true`; drop any quote not found in the text (keep the sign); strip any sentence claiming the chat is "safe".
5. Response returned; nothing logged except status code and latency.
6. Client renders result; marks animate in once.

## Design System (binding)

**Concept — "a friend's doodled notebook" + "the highlighter."** The look borrows from hand-drawn phone-icon sets: thick, slightly wobbly ink outlines, soft blush circles behind each doodle, lowercase labels with wide letter-spacing, lots of white space. It feels like a friend's private notebook, cute but calm, never childish, with no mascots or characters. On the result screen the user's own messages are the hero: like a friend going over a chat with a highlighter pen, the app marks the phrases that matter and lets her tap each mark to see why.

### Color
| Token | Hex | Use |
|---|---|---|
| `milk` | `#FFFCFA` | App background (warm white, almost paper) |
| `paper` | `#FFFFFF` | The paste sheet and the marked-text sheet |
| `blush` | `#F8E8E3` | Soft circles behind doodles, chips, quiet fills |
| `ink` | `#2A2422` | Text, doodle lines, outlines, primary buttons (warm near-black, like a felt-tip pen) |
| `ink-muted` | `#6B615D` | Secondary text and labels (AA on `milk`) |
| `berry` | `#A8436A` | Links, focus ring, caret, button hover/active |
| `marker-yellow` | `#FFE48F` | "Worth watching" marks |
| `marker-rose` | `#FFC2D1` | "High" marks; rose text `#A3214A` for the high-risk label |
| `marker-mint` | `#C9EBD6` | Low-risk header wash and "done" ticks |

No traffic-light red anywhere. Danger is communicated by order (help first), wording and the rose marker, not by alarm colour. All text pairs meet WCAG AA; marks are behind `ink` text so contrast stays high.

### Doodles
- Icons are inline SVG in `src/components/Doodle.tsx`, drawn like a felt-tip pen: `stroke: ink`, stroke-width 3 on a 64 grid, round caps and joins, slightly uneven paths, no fills except `paper`/`blush` to occlude.
- Each doodle sits on a `blush` circle. One doodle per screen header, plus small ones in help rows. No characters, animals or mascots.

### Type
- **Display / labels**: *Quicksand* (variable weight), 600–700. Rounded, geometric, friendly. Headlines are sentence case.
- **Labels**: Quicksand 600, lowercase, letter-spacing 0.14em, `ink-muted`, small size — like the labels under phone icons.
- **Body/UI**: *Atkinson Hyperlegible Next*, 400/700. Designed for legibility; important when someone is reading quickly and stressed.
- Set `<html lang="en">`. Keep the `latin-ext` subset so names with š, č, ć, ž, đ still render in our fonts.
- Scale (mobile → ≥ 768 px): 34/40 headline, 22/26 section, 17/18 body (line-height 1.55), 14/15 small. Max line length 62ch.
- No all-caps, no monospace, no arrows appended to buttons.

### Layout
Single centered column (horizontally, and vertically on the home screen), `max-width: 560px`, 20 px side padding, generous vertical rhythm (8 px base). Headlines and short copy are center-aligned; long text (the textarea, her marked messages, explanations, lists) stays left-aligned for readability. Sheets are flat, like stickers: `paper` with a 2 px `ink` outline and no drop shadow. Corner radius: 24 px for sheets, 999 px for buttons and doodle circles, 6 px for marks.

```
Home                               Result (high)
┌────────────────────── [Exit] ┐   ┌────────────────────── [Exit] ┐
│ Something feels off in       │   │ This is worth taking         │
│ a chat?                      │   │ seriously                    │
│ Paste the messages. We'll    │   │ one-line summary             │
│ look at them together.       │   │ ┌ Talk to someone now ─────┐ │
│ ┌──────────────────────────┐ │   │ │ NADEL 116 111    [Call]  │ │
│ │ paper sheet / textarea   │ │   │ └──────────────────────────┘ │
│ │                          │ │   │ ┌ paper ───────────────────┐ │
│ └──────────────────────────┘ │   │ │ her text with ▓marks▓    │ │
│ Numbers and links are hidden │   │ │ tap a mark → bottom sheet│ │
│ before sending.              │   │ └──────────────────────────┘ │
│ [         Check          ]   │   │ What you can do now          │
│ Get help now                 │   │ • you don't have to reply    │
│                              │   │ • save screenshots           │
└──────────────────────────────┘   └──────────────────────────────┘
```
On `low`/`watch`, the order is: header → marked text → next steps → help block.

### Motion
- **The one moment**: when a result appears, each mark "draws" left-to-right behind its phrase (background-size 0→100%, 350 ms, 90 ms stagger). With `prefers-reduced-motion`, marks appear instantly.
- Response to action only: the sign bottom sheet slides up (200 ms); the button shows a calm pulsing ink dot while analysing. No scroll-triggered entrances, no hover effects on cards.

### Components
- **QuickExit**: top-right pill, 2 px `ink` outline, lowercase label "exit", always visible, 44 px tap target.
- **PasteSheet**: textarea on `paper` with 2 px `ink` outline, no visible label (screen-reader label only), fixed height that scrolls inside (never grows or resizes), placeholder with a short example, live counter only past 5,000 chars, masked items shown as soft grey chips after masking.
- **AnalyzingState**: the pasted text stays visible and slightly dimmed; copy "Reading carefully…"; no spinner.
- **RiskHeader**: headline + summary; `low` gets a mint wash, `watch` a yellow underline, `high` the rose label. Headlines: low "We didn't find clear warning signs", watch "Some things are worth a closer look", high "This is worth taking seriously".
- **MarkedText**: the signature; marks are focusable `role="button"` spans inside the text (Tab, Enter, Space). Not `<button>`: browsers render buttons inline-block, which breaks multi-line marks out of the text flow.
- **SignSheet**: title, 2–3 sentence explanation, "Why this matters".
- **HelpBlock**: contact rows with tap-to-call; one line on anonymity.

### Voice rules (copy)
Address her as "you", warm and direct. Short sentences, plain words (aim for a 12-year-old reading level). Name feelings without dramatising. Never blame ("It's not your fault" where relevant). Buttons say what happens: "Check", "Call", "Exit". Errors explain and give the next action, without apologising.

### Design review against defaults
- Considered and rejected: cream + serif + terracotta (generic "warm AI" look), and dark mode with neon accent (feels like a hacker tool, wrong for a scared teen).
- Chose a hand-drawn doodle style (team moodboard: doodle phone-icon set) over the earlier cool "mist + violet" look: it feels personal and teen-made rather than institutional. Kept it calm: no mascots, no stickers everywhere, one doodle per screen.
- Rejected a dashboard of identical cards for the result; replaced with one sheet built around her own text.
- Rejected traffic-light red/yellow/green risk badges; replaced with highlighter marks, which feel explanatory rather than judgmental.

## Complexity Tracking
| Item | Why needed | Simpler alternative rejected because |
|---|---|---|
| Deterministic safety floor in addition to the model | The model may under-rate an emergency; a missed "high" is the worst failure | Prompt-only safety is not reliable enough for minors |
| On-device masking | Personal data of third parties should not leave the device | Server-side masking would still transmit the data |
