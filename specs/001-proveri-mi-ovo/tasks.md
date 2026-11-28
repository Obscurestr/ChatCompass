# Tasks: Proveri — check a conversation for warning signs

**Input**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/analyze-api.md`, `quickstart.md`
**Format**: `[ID] [P?] [Story] Description` — `[P]` = can run in parallel (different files, no dependency)
**Done means**: works at 360 px, keyboard focusable, copy from `copy/en.ts`, no conversation text in logs or storage.
**Owners**: Dev = you, QA = Tamara (manual, per `quickstart.md`)

---

## Day 1 — Foundation + core check (US1)

### Phase 1: Setup
- [x] T001 Create Next.js (latest) + TypeScript + Tailwind v4 app in repo root; add `zod`, `@anthropic-ai/sdk`, `vitest`
- [x] T002 [P] Add `.env.example` (`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `NEXT_PUBLIC_EXIT_URL`, `NEXT_PUBLIC_APP_NAME`, `DEMO_MODE`); connect repo to Vercel, set env vars, confirm preview deploy — *GitHub (Obscurestr/ChatCompass) connected to Vercel 2026-11-26: pushes to `main` deploy to chatcompass.vercel.app*
- [x] T003 [P] Design tokens in `src/app/globals.css` (`@theme`): colors, radii, shadow, type scale from plan.md
- [x] T004 [P] Fonts via `next/font/google`: Quicksand (display/labels) + Atkinson Hyperlegible Next (body), `latin-ext`, wired in `src/app/layout.tsx`
- [x] T005 [P] `src/copy/en.ts` with all strings from plan.md (headlines, buttons, errors, hints)
- [ ] T005a [P] Set a spend limit on the API key before sharing any URL — *manual*
- [ ] T005b [P] (Tamara) Get the judging criteria and pitch length from organisers; deck will follow them

### Phase 2: Foundational (blocks all stories)
- [x] T006 `src/lib/schema.ts` — zod request/response schemas per data-model.md
- [x] T007 [P] `src/lib/mask.ts` + Vitest tests (international + local phone formats, emails, URLs)
- [x] T008 [P] `src/lib/safetyFloor.ts` + Vitest tests (English keyword groups from research.md)
- [x] T009 [P] `src/lib/highlight.ts` + Vitest tests (exact, case-insensitive and whitespace-tolerant matching; returns `Mark[]`)
- [x] T010 [P] `src/config/help.ts` and `src/config/app.ts` (helplines with `verified:false`)
- [x] T011 `src/lib/prompt.ts` — system prompt + user template from contracts/analyze-api.md
- [x] T012 `src/app/api/analyze/route.ts` — validate, floor, Claude call (temp 0, 20 s timeout, 1 retry), post-processing rules 1–5, rate limit, no body logging

**Checkpoint**: `curl` samples A–E against the route return valid JSON with expected risk. — *passed 2026-11-26: A low, B watch, C high, D high, E high, F watch (no quotes), S22 low; 3–6 s per check.*

### Phase 3: User Story 1 — Check a conversation (P1) 🎯 MVP
- [x] T013 [US1] `src/app/layout.tsx` — `milk` background, neutral `<title>` from env, centered 560 px column, `lang="en"`, `noindex`; `Referrer-Policy: no-referrer` in `next.config`
- [x] T014 [P] [US1] `PasteSheet.tsx` — paper textarea (`autocomplete="off"`, `spellcheck={false}`), AI disclosure line (FR-014), placeholder, length hints, masked chips after masking, "Check" button (disabled < 20 chars)
- [x] T015 [P] [US1] `AnalyzingState.tsx` — "Reading carefully…" + ink pulse dot only (no text)
- [x] T016 [P] [US1] `RiskHeader.tsx` — three variants per plan.md
- [x] T017 [US1] `MarkedText.tsx` — render text with `<button>` marks (yellow / rose by risk), draw-in animation, reduced-motion fallback
- [x] T018 [US1] `SignSheet.tsx` — bottom sheet; close via X, swipe down, Esc; focus trapped and returned
- [x] T019 [US1] `src/app/page.tsx` — state machine `idle → analysing → result | error`; signs without quotes listed under the text
- [ ] T020 [US1] Deploy preview → **QA: S1–S3, S6–S9, S13**

---

## Day 2 — Help, exit, polish (US2, US3)

### Phase 4: User Story 2 — Know what to do next (P1)
- [x] T021 [P] [US2] `HelpBlock.tsx` — contact rows, tap-to-call `tel:` links, anonymity line; `showOnHighOnly` support
- [x] T022 [P] [US2] `NextSteps.tsx` — non-interactive list, each step in its own speech bubble
- [x] T023 [US2] Result ordering: `high` → header, HelpBlock, marked text, steps; others → header, text, steps, HelpBlock
- [x] T024 [P] [US2] `src/app/help/page.tsx` — Get help page: contacts, what happens when you call, trusted-adult tips
- [x] T025 [US2] `ErrorState.tsx` — explain + retry + HelpBlock + link to general signs — *general signs shown inline (no separate /signs page yet)*
- [ ] T026 [US2] Verify helpline numbers with ASTRA, set `verified:true` — *NADEL 116 111 and police 192 verified 2026-11-26; ASTRA SOS number still missing (hidden until added)*

### Phase 5: User Story 3 — Leave instantly (P1)
- [x] T027 [US3] `QuickExit.tsx` in layout — `location.replace(EXIT_URL)`, clears state; Esc-Esc listener — *internal links use `replace` so Back never returns to the app; open sheets carry their own Exit pill*
- [ ] T028 [US3] **QA: S4, S5, S10–S12**

### Phase 6: Polish pass
- [x] T028a [US3] Help page + home hint: honest note that history may keep the visit; how to open in incognito (FR-016)
- [x] T029 `src/app/manifest.ts` + neutral icons in `public/icons/` (installable PWA) — *name and icon now "ChatCompass" + compass-heart icon (team decision 2026-11-26); set `NEXT_PUBLIC_APP_NAME` to a neutral name for extra discretion*
- [ ] T030 Visual review on real phone at 360 px and on projector; fix spacing, contrast, tap targets ≥ 44 px
- [x] T030a `DEMO_MODE=fallback`: save real results for samples A–G as fixtures in `src/demo/`, serve them if the API fails (FR-017, depends on T012)
- [ ] T031 Prompt tuning from QA results (focus: no `high` sample ever returns `low`)
- [ ] T032 **QA: S13–S22 full run**

- [x] T030b [US1] On-device screenshot OCR (FR-018): `lib/ocr.ts`, `lib/ocrClean.ts` + tests, "Add a screenshot" in PasteSheet, OCR files self-hosted via `scripts/copy-ocr-assets.mjs` (constitution v1.2.0)
- [x] T030c [US1] OCR: who said what — left bubbles "Them:", right bubbles "Me:" (`lib/ocrTranscript.ts`), white-on-dark bubbles and dark mode readable (`lib/ocrImage.ts`), prompt told to judge only "Them"; tests
- [x] T030d [US1] OCR accuracy: benchmark (60 screenshots, 6 app styles × 5 languages), side by left edge, per-word confidence, rescued "?", ticks/times stripped, upscale small screenshots (`ocrImage.ocrScale`); tests — *mean character error 18.9% → 1.1%*
- [x] T036a [P3] Research behind each sign: short "author, year" under every explanation and on each guide card, full references (checked) in the guide (`config/sources.ts`); prompt: grammar rules per language, no slash or gendered forms, one script per word
- [x] T034c [US2] Read aloud (FR-021): `ReadAloud.tsx`, on-device voice only, never reads her messages, Exit cancels speech; tests

**Midday checkpoint**: if T021–T028 are done, start P2. Otherwise skip Phase 7.

### Phase 7: User Story 4 — Who's really there (P2)
- [x] T033 [P] [US4] `src/app/who/page.tsx` — 6 yes/no questions, tally, advice; reverse image search link with instructions (no upload)
- [x] T034 [US4] Link from result screen when `identity_doubt` sign present — *opens in a sheet on the result (the result lives only in memory and would be lost by navigating), highlighted when `identity_doubt` is present*
- [x] T034a [US2] "Help me tell someone": ready-made messages to copy or share (fixed text, never her chat) on the result and Help page
- [x] T034b [US2] "How to block and report": save evidence first (never sexual images), then steps for Instagram, Snapchat, TikTok, Discord; `/block` page + sheet on the result

---

## Day 3 — Freeze & pitch

- [ ] T035 Bug fixes from QA until 12:00, then **code freeze**
- [x] T036 [P] (P3, optional) `src/app/signs/page.tsx` — warning-signs guide, one card per category
- [ ] T037 Production deploy; run S18 three times on the production URL
- [ ] T038 [P] Pitch deck (Tamara): problem (T.T.), solution, live demo, privacy-by-design, test results (SC-002/003 numbers), next steps (partnership with ASTRA/NADEL, school workshops)
- [ ] T039 Demo script: Sample D on phone mirrored to projector → highlight moment → help block → quick exit as finale
- [ ] T040 Backup: screen recording of the full demo in case Wi-Fi fails

---

## Phase 8: Country & language (US0, constitution v1.3.0)
- [x] T041 [US0] `src/i18n/` — languages (`sr hr bs cnr mk sq en`: names, html lang, OCR model, speech voices, number format) and countries (`rs hr ba me mk al`: names, default language); routes moved under `src/app/[country]/[lang]/` with their own root layout + `generateStaticParams`; country picker at `/` (`src/app/(start)/`)
- [x] T042 [US0] `LocaleProvider` + `useLocale()`; every component reads copy from it; internal links keep `/{country}/{lang}`; language/country switch on the home screen; Cyrillic fonts for Macedonian
- [x] T043 [P] [US0] Copy dictionaries `src/copy/{sr,hr,bs,cnr,mk,sq}.ts` typed as `Copy` (same keys as `en.ts`), gender-neutral wording
- [x] T044 [P] [US0] `config/help.ts` per country (research.md table); HelpBlock, Help page and Read aloud use the country's contacts
- [x] T045 [US0] API: `lang` in the request; `systemPrompt(lang)`; postprocess defaults + safe-claim patterns per language; demo fixtures only for their own language; tests
- [x] T046 [P] [US0] Safety floor: Cyrillic transliteration + BCS/Macedonian/Albanian phrases with harmless counter-examples (research.md); OCR model per language, regional app-chrome words; tests
- [x] T047 (Team) Verify helpline numbers for HR, BA, ME, MK, AL; set `verified: true` — *confirmed by the team 2026-11-28 (MK: 0800 12222)*
- [ ] T048 (Team) Native-speaker review of each language's copy and floor phrases — *manual*
- [ ] T049 **QA: S32–S36**

## Dependencies
- T001 → everything. T006 → T012, T019. T011 → T012. T012 → T019.
- US1 (Phase 3) → US2 (Phase 4). US3 is independent after T013.
- P2/P3 only after Phase 5 is green.

## Parallel examples
- Day 1 morning: T002, T003, T004, T005, T005a, T005b together; then T007, T008, T009, T010 together.
- Day 1 afternoon: T014, T015, T016 together.
