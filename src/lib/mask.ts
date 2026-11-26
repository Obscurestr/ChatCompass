// On-device masking of phone numbers, emails and URLs (FR-002).
// Runs in the browser before the text leaves the device. Pure function, no side effects.

export interface MaskResult {
  masked: string;
  counts: { phone: number; email: number; url: number };
}

export const MASK_TOKENS = {
  phone: "[phone]",
  email: "[email]",
  url: "[link]",
} as const;

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

// Explicit links (scheme or www.) and bare domains with a common TLD (e.g. example.com/profile).
const TLDS =
  "com|net|org|io|me|co|app|dev|info|biz|link|ly|gg|tv|xyz|site|online|uk|us|ca|au|de|fr|it|es|nl|rs|ba|hr|si|mk|al|eu";
const URL = new RegExp(
  String.raw`\b(?:https?:\/\/|www\.)[^\s<>"']+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:${TLDS})\b(?:\/[^\s<>"']*)?`,
  "gi",
);

// Candidate phone numbers: start with +, 00, 0 or "(", then digits with spaces, dots, dashes, slashes, parentheses.
// Same line only. Verified afterwards by digit count so ages, scores and times are left alone.
const PHONE = /(?<![\w+])(?:\+|\(|0)[\d \t().\/-]{6,}\d/g;
const DATE = /^\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\.?$/;

const TRAILING_PUNCT = /[.,!?;:)\]]+$/;

export function mask(input: string): MaskResult {
  const counts = { phone: 0, email: 0, url: 0 };

  let text = input.replace(EMAIL, () => {
    counts.email++;
    return MASK_TOKENS.email;
  });

  text = text.replace(URL, (match) => {
    // Keep sentence punctuation that the URL regex swallowed.
    const trailing = match.match(TRAILING_PUNCT)?.[0] ?? "";
    counts.url++;
    return MASK_TOKENS.url + trailing;
  });

  text = text.replace(PHONE, (match) => {
    const digits = match.replace(/\D/g, "").length;
    if (digits < 8 || digits > 15 || DATE.test(match.trim())) return match;
    counts.phone++;
    return MASK_TOKENS.phone;
  });

  return { masked: text, counts };
}
