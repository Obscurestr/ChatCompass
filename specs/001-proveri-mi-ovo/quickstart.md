# Quickstart & Manual Test Script

## Run locally
```bash
npm install
cp .env.example .env.local   # ANTHROPIC_API_KEY=..., ANTHROPIC_MODEL=claude-sonnet-5-5
npm run dev                  # http://localhost:3000
```
Phone on same Wi-Fi: open `http://<laptop-ip>:3000`. For PWA install, use the Vercel preview URL (HTTPS).

## Tamara's test script
Run on: Android Chrome, iPhone Safari, laptop Chrome. Log bugs as: *device – what I did – what happened – what I expected – screenshot*.

| # | Paste | Expected |
|---|---|---|
| S1 | Sample A (harmless) | `low`, no marks or 1 at most, help block at bottom, never says "safe" |
| S2 | Sample B (secrecy) | `watch`, the secrecy line is highlighted |
| S3 | Sample C (move platform + personal info) | `watch` or `high`, 2 marks |
| S4 | Sample D (photo request) | `high`, help block first |
| S5 | Sample E (meeting + secrecy) | `high`, help shows police |
| S6 | Sample F (own description, no quotes) | result shown, signs listed without marks |
| S7 | Sample G (contains phone + email + link) | result shows "We hid personal details before sending" with chips; marks still work |
| S8 | 10 characters | button disabled, hint shown |
| S9 | 7,000 characters | asked to shorten |
| S10 | Turn on airplane mode, tap Proveri | calm error, retry, help block |
| S11 | Tap "Exit" on home, result, help pages | neutral site in < 1 s; Back does not return |
| S12 | Laptop: press Esc twice | same as S11 |
| S13 | Tap each mark | sheet opens with explanation; closes with swipe / X / Esc |
| S14 | Keyboard only on laptop | every control reachable, visible focus ring |
| S15 | Phone in reduced-motion mode | marks appear without animation |
| S16 | Rotate phone / 360 px width | no horizontal scroll, nothing cut off |
| S17 | Install to home screen | neutral name and icon |
| S18 | Run S1–S5 three times | `high` samples never come back `low` |
| S19 | Type in the box | no autocomplete suggestions, no red spell-check underlines |
| S20 | Set `DEMO_MODE=fallback`, break the API key, paste Sample D | pre-recorded `high` result appears |
| S21 | Paste "If you don't make it today, see you tomorrow at school" | NOT forced to `high` by the keyword check |
| S23 | Tap "Add a screenshot", pick a clear chat screenshot | progress shows, then "1 screenshot ready"; the box stays as it was; Check works without typing anything |
| S24 | Pick a photo with no text (e.g. a landscape) | calm message: no text found, try a clearer screenshot or paste |
| S25 | Laptop DevTools → Network while adding a screenshot | only `/ocr/…` files load; no image is sent anywhere; Check sends text only |
| S22 | Paste "Send me a pic of the chemistry homework, we watched the game live so I didn't finish" | `low`, NOT forced to `high` |

## Sample conversations (fictional)
**A — harmless**
> Did you do the maths homework? / Yeah, question 4 was a pain. / Haha same, let's ask the teacher tomorrow.

**B — secrecy**
> I really like talking to you. / Me too. / Just don't tell anyone about us, it's our secret, other people wouldn't understand.

**C — move platform + personal info**
> Let's switch to another app, it's more private there. / Why? / No reason. Which school do you go to and when do your classes end?

**D — photo request**
> You're so much more mature than other girls your age. / Thanks. / Send me a pic of you, just for me, nobody else will see it. / I don't know… / Come on, don't you trust me?

**E — meeting + secrecy**
> Let's meet up in the park on Saturday. Don't tell your parents, they'd ruin everything.

**F — own description**
> I've been chatting with a guy for a month. He says he's 16 but he never wants to video call. Lately he keeps asking me about things at home and gets angry when I don't answer.

**G — contains data**
> Text me on +381 64 123 4567 or email me at example.mail@gmail.com, here's my link https://example.com/profile. Don't tell your mum.
