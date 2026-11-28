# Research & Decisions

| Decision | Choice | Rationale | Alternatives considered |
|---|---|---|---|
| App type | PWA (Next.js) | One codebase, installable, no store review, demo on any phone via URL | React Native (too slow for 3 days), plain HTML (no clean server route for the key) |
| AI provider | Claude via `@anthropic-ai/sdk` | Allowed by hackathon; strong instruction following and good plain-English output for teens | On-device model (too heavy for phones in 3 days) |
| Structured output | JSON in prompt + zod validation + 1 retry | Simple, provider-agnostic | Tool-use schema (fine too; switch if JSON breaks more than rarely) |
| Danger safety net | Regex/keyword floor in `safetyFloor.ts` | Deterministic, testable, guards the worst failure (missed high) | Second model call (slower, costlier) |
| Masking | Client-side regex for phones (international `+…` and local digit groups), emails, URLs | Third-party data never leaves device | None good enough in time |
| Input | Text, plus on-device screenshot OCR (tesseract.js, self-hosted, `cacheMethod: none`) | Images of minors never leave the device; only extracted, masked text is sent | Sending screenshots to the AI (images of minors leave the device: privacy and legal risk); server-side OCR (same problem) |
| Fonts | Quicksand + Atkinson Hyperlegible Next via `next/font/google`, latin-ext | Distinct personality + legibility; self-hosted by Next, no third-party requests at runtime | System fonts (too generic for the brief) |
| Quick exit | `window.location.replace(EXIT_URL)` + clear state | Replaces history entry so Back doesn't return. Does NOT remove the visit from browser history — say so honestly and suggest incognito | `history.pushState` tricks (unreliable on iOS) |

## safetyFloor keyword groups (English; starting point, extend on Day 2)
- **meeting**: `meet up`, `meet in person`, `meet irl`, `let's meet`, `come to my place`, `come over to my`, `i'll pick you up`, `i can pick you up` (not bare `see you` — classmates say it every day; not bare `in person` / `live` — "we watched the game live")
- **threats/blackmail**: `i'll show everyone`, `i will show everyone`, `i'll send it to your`, `i'll post it`, `blackmail`; conditional threats only with a clear demand or threat after them: `if you don't send (me) (a/more/some) pic(s)/photo(s)/nudes/video` and `if you tell anyone/your mum…, I'll / I'm gonna …` (never bare `if you don't` or `if you don't send` — they fire on "if you don't make it today" and "if you don't send the notes I'll ask Ana"; never bare `if you tell anyone` — "if you tell anyone about the surprise party")
- **images**: `pic of you`, `picture of you`, `photo of you`, `pics of you`, `send nudes`, `nudes`, `take a pic for me`, `just for me` + `pic`/`photo`/`picture` in the same message (not bare `send me a pic` / `send me a picture` — "send me a pic of the chemistry homework" is harmless)

Rule of thumb: the floor only catches unambiguous emergencies; everything subtler is the model's job. Every new keyword gets a harmless counter-example test in Vitest.
Match case-insensitively; drop apostrophes (`I'll` → `ill`, so "ill"/"I'll"/"I’ll" all match), strip diacritics and collapse whitespace before matching.

| Languages | Route segments `/[country]/[lang]` (`generateStaticParams` for all 6×7 pairs) with their own root layout; country picker at `/` in a second root layout; copy as typed dictionaries `src/copy/{lang}.ts` given to client components through a context | `<html lang>` right from the server, no cookies/storage (constitution II/V), every page static | Cookie or localStorage (stores a trace), `Accept-Language` redirect (wrong on shared phones, needs a proxy) |
| Cyrillic fonts | Macedonian uses Comfortaa (display) + Nunito (body) with the `cyrillic` subset, not preloaded; all other languages keep Quicksand + Atkinson | Quicksand and Atkinson Hyperlegible Next have no Cyrillic | System fonts for Macedonian only (would look like a different app) |
| OCR per language | tesseract `best_int` models: sr/cnr → `srp_latn`, hr → `hrv`, bs → `bos`, mk → `mkd`, sq → `sqi`, en → `eng`; only the chosen one is downloaded | Diacritics (č ć đ š ž ë ç) and Cyrillic need their own model | One combined model (slower and bigger on phones) |
| OCR accuracy (2026-11-28) | Benchmark of 60 fictional screenshots (iMessage, WhatsApp light/dark, Instagram dark, Messenger, Viber × sr/hr/mk/sq/en; second set at low resolution + JPEG). Fixes: side by the common left edge (her wide bubbles were dropped as "centred"), per-word confidence instead of per-line (one emoji/tick no longer drops the line), misread "?" rescued, times with read ticks stripped, small screenshots upscaled to ~1300 px. Mean character error 18.9% → 1.1% (phone-size set) and 3.8% → 2.1% (low-res JPEG set) | Bigger "4.0.0" models (2–3× download) not needed |

## Regional safety-floor phrases (`safetyFloor.ts`; native review pending — T048)
All languages are checked on every request, whatever the UI language. Text is normalised first: Cyrillic (Serbian and Macedonian) is transliterated to Latin (ќ→kj, ѓ→gj, ђ→dj, ћ/ч→c …), đ→dj, diacritics stripped (č→c, ë→e, ç→c), apostrophes dropped.
- **BCS (sr/hr/bs/cnr)** — meeting: `nađimo se`, `da se nađemo`, `vidimo se uživo`, `dođi kod mene`, `doći ću po tebe`, `pokupiću te`; threats: `pokazaću svima`, `poslaću tvojima…`, `objaviću (tvoje) slike`, `ucjenjujem te`, conditional `ako (mi) ne pošalješ (još) sliku…`, `ako nekome kažeš … pokazaću/poslaću/objaviću`; images: `gole/nage slike`, `slika bez odeće`, `slikaj se za mene`, `pošalji mi svoju sliku`, `samo za mene` + photo word. Not bare `vidimo se` (friends say it daily) and not bare `ako ne pošalješ` ("ako ne pošalješ beleške, pitaću Anu").
- **Macedonian** — `да се најдеме`, `дојди кај мене`, `ќе дојдам по тебе`; `ќе им покажам на сите`, `ќе ги објавам сликите`, `ако не ми пратиш слика`; `голи слики`, `слика од тебе`.
- **Albanian** — `të takohemi`, `eja tek unë`, `do të vij të të marr`; `do t'ua tregoj të gjithëve`, `do t'ua dërgoj prindërve`, `nëse nuk më dërgon foto`; `foto lakuriq`, `foto të zhveshura`, `vetëm për mua` + foto.

## Helplines (VERIFY before demo — `config/help.ts`, `verified: false` until checked)
- NADEL — national helpline for children, 116 111
- ASTRA SOS hotline (organiser) — get number and hours from ASTRA on Day 1
- Police — 192
- Trusted adult prompt (no number)

### Per country (`config/help.ts`; numbers from Child Helpline International / UNICEF, all confirmed by the team 2026-11-28, T047)
| Country | Child helpline | Police |
|---|---|---|
| Serbia | NADEL 116 111 (verified) | 192 (verified) |
| Croatia | Hrabri telefon 116 111 (Mon–Fri 9–20, free) | 192 |
| Bosnia and Herzegovina | Plavi telefon 080 05 03 05 (weekdays 9–17) | 122 |
| Montenegro | National child helpline 116 111 (24/7) | 122 |
| North Macedonia | Alo Bushavko (Megjashi) 0800 12222 — sources disagree (CHI also lists +389 70 390 632) | 192 |
| Albania | ALO 116 111 (24/7, free) | 129 |

112 works in all six countries as the general emergency number.
