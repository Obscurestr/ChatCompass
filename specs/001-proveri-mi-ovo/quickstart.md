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
| S1 | Sample A (harmless) | `low`, no marks or 1 at most, help block at bottom, no word "bezbedno" |
| S2 | Sample B (secrecy) | `watch`, the secrecy line is highlighted |
| S3 | Sample C (move platform + personal info) | `watch` or `high`, 2 marks |
| S4 | Sample D (photo request) | `high`, help block first |
| S5 | Sample E (meeting + secrecy) | `high`, help shows police |
| S6 | Sample F (own description, no quotes) | result shown, signs listed without marks |
| S7 | Sample G (contains phone + email + link) | masked chips visible before result; marks still work |
| S8 | 10 characters | button disabled, hint shown |
| S9 | 7,000 characters | asked to shorten |
| S10 | Turn on airplane mode, tap Proveri | calm error, retry, help block |
| S11 | Tap "Izađi" on home, result, help pages | neutral site in < 1 s; Back does not return |
| S12 | Laptop: press Esc twice | same as S11 |
| S13 | Tap each mark | sheet opens with explanation; closes with swipe / X / Esc |
| S14 | Keyboard only on laptop | every control reachable, visible focus ring |
| S15 | Phone in reduced-motion mode | marks appear without animation |
| S16 | Rotate phone / 360 px width | no horizontal scroll, nothing cut off |
| S17 | Install to home screen | neutral name and icon |
| S18 | Run S1–S5 three times | `high` samples never come back `low` |
| S19 | Type in the box | no autocomplete suggestions, no red spell-check underlines |
| S20 | Set `DEMO_MODE=fallback`, break the API key, paste Sample D | pre-recorded `high` result appears |
| S21 | Paste "Ako ne stignem danas, vidimo se sutra u školi" | NOT forced to `high` by the keyword check |
| S22 | Paste "Pošalji mi sliku domaćeg iz hemije, gledali smo utakmicu uživo pa nisam stigla" | `low`, NOT forced to `high` |

## Sample conversations (fictional)
**A — harmless**
> Jesi uradila domaći iz matematike? / Jesam, mučila sam se sa zadatkom 4. / Haha i ja, sutra ćemo pitati profesorku.

**B — secrecy**
> Baš mi je lepo da pričam s tobom. / I meni. / Samo nemoj nikome da pričaš o nama, ovo je naša tajna, drugi ne bi razumeli.

**C — move platform + personal info**
> Ajde da pređemo na drugu aplikaciju, tamo je privatnije. / Zašto? / Samo tako. Koja je tvoja škola i kad završavaš časove?

**D — photo request**
> Ti si mnogo zrelija od drugih. / Hvala. / Pošalji mi neku tvoju sliku, samo za mene, niko neće videti. / Ne znam baš… / Ma ajde, zar mi ne veruješ?

**E — meeting + secrecy**
> Hajde da se nađemo u subotu u parku. Nemoj reći roditeljima, oni bi sve pokvarili.

**F — own description**
> Dopisujem se sa jednim dečkom već mesec dana. Kaže da ima 16 ali nikad neće video poziv. U poslednje vreme stalno traži da mu pričam stvari o kući i ljuti se kad neću.

**G — contains data**
> Javi mi se na 064 123 4567 ili piši na primer.mail@gmail.com, evo i link https://example.com/profil. Nemoj da kažeš mami.
