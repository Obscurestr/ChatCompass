# Proveri — Project Constitution

**Version**: 1.3.0 | **Ratified**: 2026-11-26 | **Amended**: 2026-11-27 (country picker; app in the language of each Western Balkans country, English kept as an option) | **Context**: SheSafe Online Regional Hackathon, 26–29 Nov 2026, Case 3 "Grooming and trust"

Proveri ("Check it") lets a teenager privately check whether an online conversation shows warning signs of grooming, understand why, and reach a real person for help — before the situation escalates.

## Core Principles

### I. Safety over features (NON-NEGOTIABLE)
The user is likely a minor in a vulnerable moment. Every decision is judged first by "could this make her situation worse?" When in doubt, show the path to human help. The app never tells a user a conversation is definitely safe; the best it says is "no clear warning signs found — trust your feelings."

### II. Privacy by design (NON-NEGOTIABLE)
- No accounts, no sign-in, no analytics, no cookies beyond what the framework strictly needs.
- No database. Conversation text is sent to the AI for one analysis and is never stored, logged or cached by our server.
- Text only leaves the device. A screenshot may be read into text inside the browser, but the image itself is never uploaded, sent to the AI, stored, or cached; only the extracted text, masked, is sent. All OCR files are served from our own domain.
- The browser keeps nothing after the session ends (no localStorage of conversations).
- Phone numbers, emails and links are masked on the device before the text leaves it.

### III. Discretion
A persistent quick-exit control replaces the page and history entry with a neutral site in one tap. The browser tab title and installed app name are neutral and configurable.

### IV. Human help is always one tap away
The AI explains; people help. Every result screen, error screen and empty state shows how to reach a helpline or a trusted adult.

### V. Calm, clear, age-appropriate language
The app starts by asking which country she is in: Serbia, Croatia, Bosnia and Herzegovina, Montenegro, North Macedonia or Albania. The country sets the helplines and a default language (Serbian, Croatian, Bosnian, Montenegrin, Macedonian, Albanian); she can switch language at any time, and English stays available. Everything she reads (UI and AI output) is in the chosen language; pasted conversations may be in any of these languages. Serbian and Montenegrin UI use Latin script; Macedonian uses Cyrillic. Copy is written for a 13–17-year-old: short sentences, no jargon, no blame, no alarmist red, gender-neutral wording where the language allows. The app speaks like a calm older friend, not a police officer or a teacher. The country and language live only in the URL; nothing is stored to remember them.

### VI. Beautiful is part of the brief
A frightened user needs a screen that feels safe. Visual quality is a requirement, not polish: the design system in `plan.md` is binding, and every screen must work on a 360 px-wide phone.

### VII. Hackathon scope discipline
Three days, one developer, one manual tester. Prefer the simplest thing that demos well and is honest. No feature ships without a manual test path in `quickstart.md`. Anything not in P1 is cut first.

## Constraints
- Stack: Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel. One server route calls the Claude API.
- Secrets live only in environment variables.
- Helpline numbers are configuration, per country, and must be verified by a human before the demo.
- Translations and the per-language safety-floor phrases must be reviewed by a native speaker before the demo.

## Governance
This constitution overrides the spec, plan and tasks. A change requires updating the version above and re-running `/speckit.analyze`.
