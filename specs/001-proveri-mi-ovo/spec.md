# Feature Specification: Proveri — check a conversation for warning signs

**Feature Branch**: `001-proveri-mi-ovo`
**Created**: 2026-11-26
**Status**: Ready for plan
**Input**: SheSafe Case 3 — T.T. (15) is messaging someone who seems to be a peer. The conversation became more personal and she is being pushed toward things she isn't comfortable with. She doesn't know whether adults would take it seriously, how to verify who the person is, or how to get advice discreetly before deciding.

## User Scenarios & Testing *(mandatory)*

### User Story 0 — Choose country and language (Priority: P1)
On first open she picks her country (Serbia, Croatia, Bosnia and Herzegovina, Montenegro, North Macedonia, Albania). The app switches to that country's language and shows that country's helplines. She can change the language (all six regional languages plus English) or the country at any time.

**Why this priority**: The app is for the whole region; a teenager must read it in her own language and reach a helpline that works in her country.

**Independent Test**: Open `/`, pick North Macedonia: the home screen is in Macedonian (Cyrillic) and the help block shows North Macedonian numbers. Switch to Albanian: the same screen in Albanian, same numbers.

**Acceptance Scenarios**:
1. **Given** the start screen, **When** she taps a country, **Then** the app opens in that country's default language (Serbia → Serbian, Croatia → Croatian, Bosnia and Herzegovina → Bosnian, Montenegro → Montenegrin, North Macedonia → Macedonian, Albania → Albanian).
2. **Given** any screen, **When** she changes the language, **Then** all UI text switches and the next check's AI answer is in that language; helplines stay those of her country.
3. **Given** a check, **When** the result arrives, **Then** summary, signs and next steps are in the chosen language; quotes stay exactly as written in her chat.

---

### User Story 1 — Check a conversation (Priority: P1)
A teenager pastes part of a chat (or describes it in her own words) and gets a clear, calm answer: is there anything worrying here, what exactly, and why.

**Why this priority**: This is the product. Without it there is nothing to demo.

**Independent Test**: Paste a sample conversation from `quickstart.md`, tap "Check", and see a risk level, highlighted phrases and plain-language explanations.

**Acceptance Scenarios**:
1. **Given** the home screen, **When** the user pastes a conversation and taps "Check", **Then** within ~10 seconds she sees a risk level (Low / Worth watching / High), a one-sentence summary, and a list of warning signs.
2. **Given** a result with warning signs, **When** she looks at her text, **Then** each phrase that triggered a sign is highlighted in place, and tapping it opens a short explanation of why it matters.
3. **Given** a conversation with no clear warning signs, **When** analysed, **Then** the app says no clear signs were found, reminds her that her own uneasy feeling counts, and still shows how to talk to someone.
4. **Given** text containing phone numbers, emails or links, **When** she taps "Check", **Then** those are masked before the text leaves her device, and she can see that they were masked.

---

### User Story 2 — Know what to do next (Priority: P1)
After the result, she gets concrete next steps that fit the risk level, and a direct way to reach a real person.

**Why this priority**: Recognising risk without a next step leaves her alone with it. Case 3 explicitly asks for help "safely, discreetly and in a timely manner".

**Independent Test**: Reach a High result and confirm that the help section appears first, with a tappable helpline.

**Acceptance Scenarios**:
1. **Given** a High result, **When** the result loads, **Then** the "Talk to someone now" block is shown above the details, with tap-to-call / tap-to-chat helpline options.
2. **Given** any result, **Then** she sees 2–4 next steps written for her situation (e.g. "you don't have to reply", "don't send photos", "take screenshots and save them somewhere safe", "tell an adult you trust").
3. **Given** any screen, **When** she opens "Get help", **Then** she sees helplines, what happens when she calls, and that she can stay anonymous.

---

### User Story 3 — Leave instantly (Priority: P1)
If someone walks in, one tap hides the app.

**Why this priority**: Discretion is in the case's question. Cheap to build, high trust value.

**Independent Test**: Tap the quick-exit control on any screen; a neutral website loads and the back button does not return to Proveri.

**Acceptance Scenarios**:
1. **Given** any screen, **When** she taps "Exit" or presses Esc twice, **Then** the page is replaced by a neutral site (default: a weather page) and the analysis is cleared from memory.
2. **Given** she exited, **When** she presses Back, **Then** Proveri is not shown.

---

### User Story 4 — Check who they really are (Priority: P2)
A short guided checklist helps her verify the other person: reverse image search of the profile photo (opens an external tool; we never upload the image), account age, mutual friends, refusal to video call, inconsistent stories.

**Why this priority**: Directly addresses "she does not know how to check whether the person is who they claim to be". Mostly static content, so cheap — but not needed for the core demo.

**Independent Test**: Open "Who's on the other side?" from a result and complete the checklist; the result is a simple tally with advice.

**Acceptance Scenarios**:
1. **Given** the checklist, **When** she answers 5–7 yes/no questions, **Then** she sees how many red flags she found and what that means.
2. **Given** the reverse image search step, **Then** the app links to an external tool and explains how to use it; the app itself never receives an image.

---

### User Story 5 — Learn the signs (Priority: P3)
A short swipeable "Warning signs" guide explains the common patterns with one illustrative example each.

**Why this priority**: Nice for the pitch and for prevention; first to cut.

### Edge Cases
- Empty or very short input (< 20 characters): the button stays disabled with a hint about what to paste.
- Very long input (> 6,000 characters): she is asked to paste the most recent or most worrying part.
- Input describes immediate danger (meeting in person soon, threats, blackmail, existing photos being used against her): result is High regardless of model output, and the help block includes the police number.
- Pasted text may be in any of the six regional languages or English (Serbian in Latin or Cyrillic); the response is always in the chosen UI language, quotes stay in the original. Quality is tested for every UI language with the translated samples in `quickstart.md`.
- She opens an old link (`/help`) or an unknown country/language in the URL: she lands on the country picker.
- AI unavailable or times out: a calm error explains that the check didn't run, offers retry, and still shows the help block and the general warning-signs list.
- AI returns a quoted phrase not present in her text: the sign is listed without an in-text highlight.
- She adds a screenshot: it is read on her phone and waits as "1 screenshot ready" until she taps Check; the image never leaves the device. If no text is found, she is told to try a clearer screenshot or paste the messages.
- Someone uses the app to test whether their own messages "pass": out of scope to prevent; the app only educates and never coaches how to avoid detection.

## Requirements *(mandatory)*

### Functional Requirements
- **FR-001**: The system MUST accept free text (pasted chat or own description), 20–6,000 characters. Screenshots are only a way to produce that text on the device (FR-018).
- **FR-002**: The system MUST mask phone numbers, email addresses and URLs on the device before sending.
- **FR-003**: The system MUST return a risk level of `low`, `watch` or `high`, a summary of at most 2 sentences, 0–6 warning signs and 2–4 next steps, all in the chosen UI language.
- **FR-004**: Each warning sign MUST have a category, a short title, a plain explanation, and optionally an exact quote from the input.
- **FR-005**: The system MUST highlight quoted phrases in the user's text and let her open the explanation by tapping them.
- **FR-006**: The system MUST apply a server-side safety floor: if the input contains signs of imminent danger (in-person meeting, threats, blackmail, existing intimate images), the risk level is forced to `high`.
- **FR-007**: The system MUST show help contacts on every result and error screen, and first on `high` results.
- **FR-008**: The system MUST provide a quick-exit control on every screen that replaces the history entry with a neutral URL and clears in-memory state.
- **FR-009**: The system MUST NOT store, log or persist conversation text on the server or in browser storage.
- **FR-010**: The system MUST never state that a conversation or person is "safe".
- **FR-011**: The system MUST be installable as a PWA with a configurable neutral name and icon.
- **FR-012** (P2): The system SHOULD provide the identity-check checklist.
- **FR-013** (P3): The system MAY provide the warning-signs guide.
- **FR-014**: The home screen MUST state in one line that the text goes to an AI service only for this check and is not saved.
- **FR-015**: The input MUST disable autocomplete and browser spell-check.
- **FR-016**: The Help page MUST honestly explain that quick exit hides the screen but the visit can stay in browser history, and suggest using a private/incognito tab.
- **FR-018**: The system MUST let her add up to 5 screenshots that are read into text on the device (OCR in the browser). The image MUST never be uploaded, sent to the AI, stored or cached; the extracted text is kept in memory (not put into the input), shown as "N screenshots ready" with a Remove option, sent together with any typed text on Check, and masked like any other text. She sees the text on the result screen. When the screenshot is a two-sided chat, each message is labelled by position: left bubbles "Them:", right bubbles "Me:"; white-on-dark bubbles and dark mode are read too.
- **FR-019** (P2): The result and Help page SHOULD offer ready-made messages she can copy or share to start talking to a trusted adult. They MUST be fixed text and never contain her conversation.
- **FR-020** (P2): The system SHOULD explain how to save evidence and block/report on common apps, and MUST tell her not to save or forward sexual images, even as evidence.
- **FR-021** (P2): The result SHOULD offer "Read aloud" using an on-device voice only (`localService`); if none is available the control is hidden. It reads the result (headline, summary, signs, next steps, help contacts), never her own messages, and stops immediately on Exit.
- **FR-022**: The first screen MUST ask for the country (Serbia, Croatia, Bosnia and Herzegovina, Montenegro, North Macedonia, Albania). Country and language MUST be carried only in the URL (`/{country}/{lang}/…`), never stored in cookies or browser storage.
- **FR-023**: All UI copy MUST exist in Serbian (Latin), Croatian, Bosnian, Montenegrin, Macedonian (Cyrillic), Albanian and English; every screen MUST offer a language switch and a way back to the country picker.
- **FR-024**: Help contacts MUST be per country (child helpline + police at minimum); a contact not yet verified by a human shows "Number not verified yet".
- **FR-025**: The safety floor (FR-006), the "never safe" rule (FR-010) and screenshot reading (FR-018) MUST work for every supported language (Serbian Cyrillic included); screenshots are read with the OCR model of the chosen language.
- **FR-017**: The system SHOULD offer a demo fallback (pre-recorded results for the sample set) when the AI service is unavailable, enabled only by env flag.

### Key Entities
- **AnalysisRequest**: masked text, UI language (`sr | hr | bs | cnr | mk | sq | en`).
- **AnalysisResult**: risk level, summary, warning signs, next steps, escalate flag.
- **WarningSign**: category, title, explanation, quote (optional).
- **HelpContact**: country, kind (child line / police / SOS), name, phone/chat/link, hours, verified flag.
- **Country**: id (`rs | hr | ba | me | mk | al`), default language, languages listed first in the switch.

## Success Criteria *(mandatory)*
- **SC-001**: A first-time user goes from opening the app to seeing a result in under 60 seconds.
- **SC-002**: In Tamara's manual run of the `quickstart.md` set, every "high" sample is rated `high` and no "high" sample is rated `low`.
- **SC-003**: No more than 1 in 5 clearly harmless samples is rated `high`.
- **SC-004**: Quick exit works on every screen, in under 1 second, on Android Chrome and iOS Safari.
- **SC-005**: All screens are usable at 360 px width with no horizontal scroll, and pass WCAG AA contrast.
- **SC-006**: Live demo runs end to end without errors three times in a row on the deployed URL.

- Someone else checks her browser history later: quick exit cannot erase it; covered by FR-016 guidance.
- The user is in immediate physical danger right now: the help block shows the police number first; the app is not a substitute for an emergency call.

## Assumptions
- Users have a smartphone with a modern browser and internet.
- Helpline numbers in config are verified by the team before the demo, for every country.
- A native speaker of each language reviews the copy and safety-floor phrases before the demo.
- The Claude API is reachable from Vercel and the team has an API key.
- The team accepts that the AI provider processes the text for one request; this is disclosed on the home screen.
