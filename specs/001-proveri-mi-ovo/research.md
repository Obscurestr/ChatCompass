# Research & Decisions

| Decision | Choice | Rationale | Alternatives considered |
|---|---|---|---|
| App type | PWA (Next.js) | One codebase, installable, no store review, demo on any phone via URL | React Native (too slow for 3 days), plain HTML (no clean server route for the key) |
| AI provider | Claude via `@anthropic-ai/sdk` | Allowed by hackathon; strong instruction following and good plain-English output for teens | On-device model (too heavy for phones in 3 days) |
| Structured output | JSON in prompt + zod validation + 1 retry | Simple, provider-agnostic | Tool-use schema (fine too; switch if JSON breaks more than rarely) |
| Danger safety net | Regex/keyword floor in `safetyFloor.ts` | Deterministic, testable, guards the worst failure (missed high) | Second model call (slower, costlier) |
| Masking | Client-side regex for phones (international `+…` and local digit groups), emails, URLs | Third-party data never leaves device | None good enough in time |
| Input | Text only | Avoids handling images of minors entirely | Screenshot OCR (privacy and legal risk) |
| Fonts | Bricolage Grotesque + Atkinson Hyperlegible Next via `next/font/google`, latin-ext | Distinct personality + legibility; self-hosted by Next, no third-party requests at runtime | System fonts (too generic for the brief) |
| Quick exit | `window.location.replace(EXIT_URL)` + clear state | Replaces history entry so Back doesn't return. Does NOT remove the visit from browser history — say so honestly and suggest incognito | `history.pushState` tricks (unreliable on iOS) |

## safetyFloor keyword groups (English; starting point, extend on Day 2)
- **meeting**: `meet up`, `meet in person`, `meet irl`, `let's meet`, `come to my place`, `come over to my`, `i'll pick you up`, `i can pick you up` (not bare `see you` — classmates say it every day; not bare `in person` / `live` — "we watched the game live")
- **threats/blackmail**: `i'll show everyone`, `i will show everyone`, `i'll send it to your`, `i'll post it`, `if you don't send`, `if you dont send`, `if you tell anyone`, `blackmail` (never bare `if you don't` — it fires on harmless text like "if you don't make it today" and would wreck SC-003)
- **images**: `pic of you`, `picture of you`, `photo of you`, `pics of you`, `send nudes`, `nudes`, `take a pic for me`, `just for me` + `pic`/`photo`/`picture` in the same message (not bare `send me a pic` / `send me a picture` — "send me a pic of the chemistry homework" is harmless)

Rule of thumb: the floor only catches unambiguous emergencies; everything subtler is the model's job. Every new keyword gets a harmless counter-example test in Vitest.
Match case-insensitively; normalise curly apostrophes (`’` → `'`) and collapse whitespace before matching.

## Helplines (VERIFY before demo — `config/help.ts`, `verified: false` until checked)
- NADEL — national helpline for children, 116 111
- ASTRA SOS hotline (organiser) — get number and hours from ASTRA on Day 1
- Police — 192
- Trusted adult prompt (no number)
