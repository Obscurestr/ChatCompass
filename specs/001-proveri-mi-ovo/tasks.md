# Tasks: Proveri — check a conversation for warning signs

**Input**: `spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/analyze-api.md`, `quickstart.md`
**Format**: `[ID] [P?] [Story] Description` — `[P]` = can run in parallel (different files, no dependency)
**Done means**: works at 360 px, keyboard focusable, copy from `copy/en.ts`, no conversation text in logs or storage.
**Owners**: Dev = you, QA = Tamara (manual, per `quickstart.md`)

---

## Day 1 — Foundation + core check (US1)

### Phase 1: Setup
- [x] T001 Create Next.js (latest) + TypeScript + Tailwind v4 app in repo root; add `zod`, `@anthropic-ai/sdk`, `vitest`
- [ ] T002 [P] Add `.env.example` (`ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`, `NEXT_PUBLIC_EXIT_URL`, `NEXT_PUBLIC_APP_NAME`, `DEMO_MODE`); connect repo to Vercel, set env vars, confirm preview deploy — *deployed to chatcompass.vercel.app; GitHub auto-deploy + `ANTHROPIC_API_KEY` pending (manual)*
- [x] T003 [P] Design tokens in `src/app/globals.css` (`@theme`): colors, radii, shadow, type scale from plan.md
- [x] T004 [P] Fonts via `next/font/google`: Bricolage Grotesque (display) + Atkinson Hyperlegible Next (body), `latin-ext`, wired in `src/app/layout.tsx`
- [x] T005 [P] `src/copy/en.ts` with all strings from plan.md (headlines, buttons, errors, hints)
- [ ] T005a [P] Set a spend limit on the API key before sharing any URL — *manual*
- [ ] T005b [P] (Tamara) Get the judging criteria and pitch length from organisers; deck will follow them

### Phase 2: Foundational (blocks all stories)
- [ ] T006 `src/lib/schema.ts` — zod request/response schemas per data-model.md
- [ ] T007 [P] `src/lib/mask.ts` + Vitest tests (international + local phone formats, emails, URLs)
- [ ] T008 [P] `src/lib/safetyFloor.ts` + Vitest tests (English keyword groups from research.md)
- [ ] T009 [P] `src/lib/highlight.ts` + Vitest tests (exact, case-insensitive and whitespace-tolerant matching; returns `Mark[]`)
- [ ] T010 [P] `src/config/help.ts` and `src/config/app.ts` (helplines with `verified:false`)
- [ ] T011 `src/lib/prompt.ts` — system prompt + user template from contracts/analyze-api.md
- [ ] T012 `src/app/api/analyze/route.ts` — validate, floor, Claude call (temp 0, 20 s timeout, 1 retry), post-processing rules 1–5, rate limit, no body logging

**Checkpoint**: `curl` samples A–E against the route return valid JSON with expected risk.

### Phase 3: User Story 1 — Check a conversation (P1) 🎯 MVP
- [ ] T013 [US1] `src/app/layout.tsx` — `mist` background, neutral `<title>` from env, centered 560 px column, `lang="en"`, `noindex`; `Referrer-Policy: no-referrer` in `next.config`
- [ ] T014 [P] [US1] `PasteSheet.tsx` — paper textarea (`autocomplete="off"`, `spellcheck={false}`), AI disclosure line (FR-014), placeholder, length hints, masked chips after masking, "Check" button (disabled < 20 chars)
- [ ] T015 [P] [US1] `AnalyzingState.tsx` — dimmed text + "Reading carefully…" + ink pulse dot
- [ ] T016 [P] [US1] `RiskHeader.tsx` — three variants per plan.md
- [ ] T017 [US1] `MarkedText.tsx` — render text with `<button>` marks (yellow / rose by risk), draw-in animation, reduced-motion fallback
- [ ] T018 [US1] `SignSheet.tsx` — bottom sheet; close via X, swipe down, Esc; focus trapped and returned
- [ ] T019 [US1] `src/app/page.tsx` — state machine `idle → analysing → result | error`; signs without quotes listed under the text
- [ ] T020 [US1] Deploy preview → **QA: S1–S3, S6–S9, S13**

---

## Day 2 — Help, exit, polish (US2, US3)

### Phase 4: User Story 2 — Know what to do next (P1)
- [ ] T021 [P] [US2] `HelpBlock.tsx` — contact rows, tap-to-call `tel:` links, anonymity line; `showOnHighOnly` support
- [ ] T022 [P] [US2] `NextSteps.tsx` — list with mint tick when tapped ("done"), state in memory only
- [ ] T023 [US2] Result ordering: `high` → header, HelpBlock, marked text, steps; others → header, text, steps, HelpBlock
- [ ] T024 [P] [US2] `src/app/help/page.tsx` — Get help page: contacts, what happens when you call, trusted-adult tips
- [ ] T025 [US2] `ErrorState.tsx` — explain + retry + HelpBlock + link to general signs
- [ ] T026 [US2] Verify helpline numbers with ASTRA, set `verified:true`

### Phase 5: User Story 3 — Leave instantly (P1)
- [ ] T027 [US3] `QuickExit.tsx` in layout — `location.replace(EXIT_URL)`, clears state; Esc-Esc listener
- [ ] T028 [US3] **QA: S4, S5, S10–S12**

### Phase 6: Polish pass
- [ ] T028a [US3] Help page + home hint: honest note that history may keep the visit; how to open in incognito (FR-016)
- [ ] T029 `src/app/manifest.ts` + neutral icons in `public/icons/` (installable PWA)
- [ ] T030 Visual review on real phone at 360 px and on projector; fix spacing, contrast, tap targets ≥ 44 px
- [ ] T030a `DEMO_MODE=fallback`: save real results for samples A–G as fixtures in `src/demo/`, serve them if the API fails (FR-017, depends on T012)
- [ ] T031 Prompt tuning from QA results (focus: no `high` sample ever returns `low`)
- [ ] T032 **QA: S13–S22 full run**

**Midday checkpoint**: if T021–T028 are done, start P2. Otherwise skip Phase 7.

### Phase 7: User Story 4 — Who's really there (P2)
- [ ] T033 [P] [US4] `src/app/who/page.tsx` — 6 yes/no questions, tally, advice; reverse image search link with instructions (no upload)
- [ ] T034 [US4] Link from result screen when `identity_doubt` sign present

---

## Day 3 — Freeze & pitch

- [ ] T035 Bug fixes from QA until 12:00, then **code freeze**
- [ ] T036 [P] (P3, optional) `src/app/signs/page.tsx` — warning-signs guide, one card per category
- [ ] T037 Production deploy; run S18 three times on the production URL
- [ ] T038 [P] Pitch deck (Tamara): problem (T.T.), solution, live demo, privacy-by-design, test results (SC-002/003 numbers), next steps (partnership with ASTRA/NADEL, school workshops)
- [ ] T039 Demo script: Sample D on phone mirrored to projector → highlight moment → help block → quick exit as finale
- [ ] T040 Backup: screen recording of the full demo in case Wi-Fi fails

---

## Dependencies
- T001 → everything. T006 → T012, T019. T011 → T012. T012 → T019.
- US1 (Phase 3) → US2 (Phase 4). US3 is independent after T013.
- P2/P3 only after Phase 5 is green.

## Parallel examples
- Day 1 morning: T002, T003, T004, T005, T005a, T005b together; then T007, T008, T009, T010 together.
- Day 1 afternoon: T014, T015, T016 together.
