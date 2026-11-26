# QA brief for Codex — ChatCompass (Proveri)

You are doing **black-box QA** of a deployed web app. **Do not change application code, env vars or deployments.** Write test scripts only in a scratch folder (e.g. `qa/`), and do not commit them unless asked. At the end, produce the report described in "Report format".

## What the app is
ChatCompass helps a teenager (13–17) check whether an online chat shows warning signs of grooming. She pastes messages (or adds screenshots, read **on the device**), taps **Check**, and gets:
- a risk level: `low` / `watch` / `high`,
- her own text with **highlighter marks** on the worrying phrases (tap a mark → bottom sheet with an explanation),
- next steps, help contacts (NADEL 116 111; Police 192 only on `high`), "Help me tell someone" messages, and two guides ("Check who's on the other side", "How to block and report").

A persistent **Exit** pill (top right) replaces the page with a neutral site (weather.com) in one tap; **Esc twice** does the same on desktop.

- **Live URL:** https://chatcompass.vercel.app
- **Pages:** `/` (check), `/help`, `/who`, `/block`
- **API:** `POST /api/analyze` with JSON `{ "text": "..." }` → JSON result. Text is masked in the browser before sending (phones → `[phone]`, emails → `[email]`, links → `[link]`).
- Source of truth for behaviour: `specs/001-proveri-mi-ovo/spec.md`, `plan.md`, `quickstart.md` in this repo.

## Hard rules
1. **Rate limit:** the API allows **10 checks per 10 minutes per IP**. Plan your runs in batches of ≤ 9 API calls, then wait 10 minutes. A `429` is expected behaviour, not a bug — but report it if it happens below 10 calls.
2. **Only use the fictional samples below.** Never paste real chats or personal data.
3. **Exit tests:** intercept `https://weather.com/**` (e.g. Playwright `page.route` → fulfill a tiny page) so tests are fast and don't depend on that site.
4. The AI is non-deterministic: wording differs between runs. Judge **risk level, marks, structure and safety rules**, not exact text.
5. Use Playwright (Chromium) at **390×844** unless a case says otherwise. Also run the layout cases at **360×740**.

## Useful selectors
| Thing | Selector |
|---|---|
| Text box | `#chat` |
| Check button | `button[type=submit]` |
| Length hint under the box | `#paste-hint` |
| Screenshot file input | `input[type=file]` |
| Highlight marks | `.mark` (focusable `role="button"` spans) |
| Open bottom sheet | `dialog[open]`; its close button `button[aria-label=Close]` |
| Exit pill | button with accessible name `Leave this page quickly` |
| Result sections | headings: "Your messages", "What you can do now", "Talk to someone now" (high) / "If you want to talk to someone" (others), "Help me tell someone", "More ways to get help" |
| Error screen | heading "The check didn't run" |

## Sample texts (fictional)
- **A — harmless:** `Did you do the maths homework? / Yeah, question 4 was a pain. / Haha same, let's ask the teacher tomorrow.`
- **B — secrecy:** `I really like talking to you. / Me too. / Just don't tell anyone about us, it's our secret, other people wouldn't understand.`
- **C — move app + personal info:** `Let's switch to another app, it's more private there. / Why? / No reason. Which school do you go to and when do your classes end?`
- **D — photo request:** `You're so much more mature than other girls your age. / Thanks. / Send me a pic of you, just for me, nobody else will see it. / I don't know… / Come on, don't you trust me?`
- **E — meeting + secrecy:** `Let's meet up in the park on Saturday. Don't tell your parents, they'd ruin everything.`
- **F — her own description:** `I've been chatting with a guy for a month. He says he's 16 but he never wants to video call. Lately he keeps asking me about things at home and gets angry when I don't answer.`
- **G — personal data:** `Text me on 064 123 4567 or email me at example.mail@gmail.com, here's my link https://example.com/profile. Don't tell your mum.`
- **S21 — harmless, contains "if you don't" / "see you":** `If you don't make it today, see you tomorrow at school`
- **S22 — harmless, contains "send me a pic" / "live":** `Send me a pic of the chemistry homework, we watched the game live so I didn't finish`

## Test screenshots
The repo does not contain test images. **Generate them yourself**: render a simple fake chat in HTML (white background, grey bubbles on the left, light-purple bubbles on the right, dark text, a status bar line like `9:41 5G 87%`, a "Today" label, a "Seen" label and a "Message..." input bar) and screenshot it at 390×844 with device scale 3. Make:
1. a `high` chat (photo request + "don't tell your parents"),
2. a `low` chat (homework),
3. a chat containing `+381 64 123 4567` and `https://example.com/profile`,
4. a picture **without any text** (just a colour gradient).

## Test cases
| # | Do | Expected |
|---|---|---|
| S1 | Check sample A | `low`; 0–1 marks; help block is the **last** section before the guides; no sentence claims the chat/person is "safe"/"harmless" |
| S2 | Check B | `watch`; the secrecy sentence is marked |
| S3 | Check C | `watch` or `high`; ≥ 2 marks |
| S4 | Check D | `high`; rose headline "This is worth taking seriously"; "Talk to someone now" appears **before** "Your messages" |
| S5 | Check E | `high`; help block shows **Police 192** |
| S6 | Check F | result shown; signs listed under "Things we noticed"; usually no marks |
| S7 | Check G | the request body sent to `/api/analyze` contains `[phone]`, `[email]`, `[link]` and **no** real number/email/URL; result shows chips "number hidden", "email hidden", "link hidden" |
| S8 | Type ~10 characters | Check disabled; hint "Paste a few messages…" |
| S9 | Type ~7,000 characters | Check disabled; hint "That's a lot…"; counter "… / 6,000" visible |
| S10 | Go offline (`context.setOffline(true)`), tap Check | error screen with "Try again", a help block and the warning-signs list |
| S11 | Tap Exit on `/`, on a result, on `/help`, `/who`, `/block` | neutral site in < 1 s; Back does **not** return to the app |
| S12 | Desktop: press Esc twice (no sheet open) | same as S11 |
| S13 | On a result, tap every mark | a sheet opens with a title and explanation; closes with X, Esc, backdrop tap |
| S14 | Keyboard only (Tab / Enter / Space) on home and a result | every control reachable, marks open with Enter/Space, visible focus ring |
| S15 | `reducedMotion: "reduce"` | marks appear without animation (`animation-name: none`) |
| S16 | 360 px wide: `/`, a result, `/help`, `/who`, `/block` | `document.documentElement.scrollWidth` ≤ viewport width; nothing cut off |
| S17 | Fetch `/manifest.webmanifest` and its icons | name "ChatCompass", `display: standalone`, all icon URLs return 200 |
| S18 | Check A–E **three times each** (spread over batches) | `high` samples (D, E) are **never** `low`; A is never `high` |
| S19 | Inspect `#chat` | `autocomplete="off"`, `spellcheck="false"`, `autocorrect="off"` |
| S20 | (skip — needs a broken API key; already verified by the team) | — |
| S21 | Check S21 | **not** `high`; `floorTriggered: false` |
| S22 | Check S22 | `low`; `floorTriggered: false` |
| S23 | Add generated screenshot 1 | "Reading your screenshot… N%" then "1 screenshot ready" + Remove; the text box stays **empty**; Check is enabled; Check gives `high` |
| S24 | Add the picture without text | message "We couldn't find any text in that picture…"; no "screenshot ready" |
| S25 | Record all network requests while adding a screenshot | only `chatcompass.vercel.app` is contacted (OCR files under `/ocr/`); **no POST and no image upload** during reading; on Check only a small JSON text body is sent |
| S26 | On a result, tap "Check who's on the other side", answer all 6 | sheet opens over the result; tally "N of 6 red flags" + advice; after closing, the same result is still there |
| S27 | Tap Copy on a "Help me tell someone" message | clipboard contains exactly that message (grant clipboard permissions) |
| S28 | Open "How to block and report" (from a result and at `/block`) | evidence steps, a warning not to save/forward sexual images, steps for Instagram, Snapchat, TikTok, Discord |

Also check, on every page: the **Exit** pill is visible (also inside open sheets), and there are no console errors.

## Out of scope for Codex (Tamara does these by hand on real devices)
- iPhone Safari and Android Chrome: real OCR speed, the **Send** (share) button, installing to the home screen (name + icon), Exit/Back behaviour.
- Readability on a projector.
- Whether the block/report menus match the real apps today.

## Report format
Start with a one-line summary: `X passed, Y failed, Z skipped`.

Then a table: `# | PASS / FAIL / SKIP | what you observed (risk, counts, timings)`.

For every FAIL, a bug entry:
```
Bug: <short title>
Case: S<n>
Steps: <exact steps, viewport, sample>
Actual: <what happened, with the relevant JSON or text>
Expected: <from the table above>
Evidence: <screenshot file name>
Severity: blocker / major / minor
```
Flag anything that looks like a **safety** problem as `blocker`: a `high` sample rated `low`, help missing on a result or error screen, Exit not working, any real phone/email/URL or any image leaving the browser.
