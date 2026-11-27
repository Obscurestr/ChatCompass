// Deterministic safety floor (FR-006, FR-025). If any group matches, the server forces risk = "high".
// Only unambiguous emergencies belong here; everything subtler is the model's job.
// Every phrase needs a harmless counter-example test (see safetyFloor.test.ts and research.md).
// All languages are checked on every request, whatever the UI language: chats mix languages.

export type FloorGroup = "meeting" | "threats" | "images";

export interface FloorResult {
  triggered: boolean;
  groups: FloorGroup[];
}

// Serbian + Macedonian Cyrillic → Latin, so one set of phrases covers both scripts.
// Diacritics are stripped afterwards (č→c, ž→z), so the map can already use plain letters.
const CYRILLIC: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "g", д: "d", ђ: "dj", ѓ: "gj", е: "e", ж: "z", з: "z", ѕ: "dz", и: "i", ј: "j",
  к: "k", л: "l", љ: "lj", м: "m", н: "n", њ: "nj", о: "o", п: "p", р: "r", с: "s", т: "t", ћ: "c", ќ: "kj",
  у: "u", ф: "f", х: "h", ц: "c", ч: "c", џ: "dz", ш: "s",
};

/**
 * Lowercase, Cyrillic → Latin, đ → dj, strip diacritics (č→c, ë→e, ç→c), drop apostrophes
 * ("I'll" → "ill", "t'ua" → "tua"), collapse whitespace.
 */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[Ѐ-ӿ]/g, (ch) => CYRILLIC[ch] ?? ch)
    .replace(/đ/g, "dj")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/['’‘`´]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Phrases are written already normalized (no apostrophes, no diacritics, Latin, lowercase).
const PHRASES: Record<FloorGroup, string[]> = {
  meeting: [
    // English
    "meet up",
    "meet in person",
    "meet irl",
    "lets meet",
    "come to my place",
    "come over to my",
    "ill pick you up",
    "i will pick you up",
    "i can pick you up",
    // Serbian / Croatian / Bosnian / Montenegrin (not bare "vidimo se": friends say it every day)
    "nadjimo se",
    "da se nadjemo",
    "vidimo se uzivo",
    "da se vidimo uzivo",
    "da se upoznamo uzivo",
    "upoznamo se uzivo",
    "dodji kod mene",
    "dodji do mene",
    "svrati kod mene",
    "docicu po tebe",
    "doci cu po tebe",
    "dolazim po tebe",
    "pokupicu te",
    "pokupit cu te",
    // Macedonian (да се најдеме, дојди кај мене, ќе дојдам по тебе, ќе те земам)
    "da se najdeme",
    "dojdi kaj mene",
    "kje dojdam po tebe",
    "kje te zemam",
    "da se vidime vo zivo",
    // Albanian (të takohemi, eja tek unë, do të vij të të marr)
    "te takohemi",
    "eja tek une",
    "eja te une",
    "eja ne shtepine time",
    "do te vij te te marr",
    "vij te te marr",
  ],
  threats: [
    // English
    "ill show everyone",
    "i will show everyone",
    "ill send it to your",
    "i will send it to your",
    "ill post it",
    "i will post it",
    "blackmail",
    // BCS (pokazaću svima, poslaću tvojima, objaviću slike, ucjenjujem te)
    "pokazacu svima",
    "pokazat cu svima",
    "pokazacu ih svima",
    "pokazat cu ih svima",
    "pokazacu tvojim",
    "pokazat cu tvojim",
    "poslacu tvojim",
    "poslat cu tvojim",
    "poslacu ih tvojim",
    "poslat cu ih tvojim",
    "poslacu ih svima",
    "poslat cu ih svima",
    "objavicu tvoje slike",
    "objavit cu tvoje slike",
    "objavicu slike",
    "objavit cu slike",
    "ucenjujem te",
    "ucjenjujem te",
    // Macedonian (ќе им покажам на сите, ќе ги објавам сликите, ќе им ги пратам на твоите)
    "kje im pokazam na site",
    "kje gi pokazam na site",
    "kje gi objavam slikite",
    "kje im gi pratam na tvoite",
    "kje gi pratam na tvoite",
    // Albanian (do t'ua tregoj të gjithëve, do t'ua dërgoj prindërve, do t'i publikoj fotot)
    "do tua tregoj te gjitheve",
    "do tua dergoj prinderve",
    "do ti publikoj fotot",
    "do ti shperndaj fotot",
  ],
  images: [
    // English
    "pic of you",
    "pics of you",
    "picture of you",
    "pictures of you",
    "photo of you",
    "photos of you",
    "send nudes",
    "nudes",
    "take a pic for me",
    // BCS (gole slike, slika bez odeće, slikaj se za mene)
    "gole slike",
    "golu sliku",
    "gola slika",
    "nage slike",
    "nagu sliku",
    "slike bez odece",
    "sliku bez odece",
    "slike bez odjece",
    "sliku bez odjece",
    "u donjem vesu",
    "u donjem rublju",
    "slikaj se za mene",
    "uslikaj se za mene",
    "slikaj mi se",
    // Macedonian (голи слики, слика од тебе)
    "goli sliki",
    "gola slika",
    "slika od tebe",
    "sliki od tebe",
    "fotka od tebe",
    "fotki od tebe",
    // Albanian (foto lakuriq, foto të zhveshura)
    "foto lakuriq",
    "fotot lakuriq",
    "foto te zhveshur",
    "foto te zhveshura",
    "foto nudo",
  ],
};

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const GROUP_REGEX: Record<FloorGroup, RegExp> = Object.fromEntries(
  Object.entries(PHRASES).map(([group, list]) => [
    group,
    new RegExp(String.raw`\b(?:${list.map(escape).join("|")})\b`),
  ]),
) as Record<FloorGroup, RegExp>;

// Conditional threats are only unambiguous with what is demanded or threatened right after:
// "if you don't send (me) (more) pics" / "if you tell anyone, I'll / I will ..."
// (bare "if you don't send" also fires on "if you don't send the notes I'll ask Ana").
const PHOTO = String.raw`(?:pic|pics|photo|photos|picture|pictures|selfie|selfies|nudes|video|videos)`;
const PHOTO_BCS = String.raw`(?:sliku|slike|slika|fotku|fotke|fotografiju|fotografije|selfi|selfije|snimak|snimke|video|nudes)`;
const PHOTO_MK = String.raw`(?:slika|sliki|fotka|fotki|fotografija|video|snimka)`;
const PHOTO_SQ = String.raw`(?:foto|foton|fotot|fotografi|fotografine|video|selfie)`;
// "tell" in BCS / MK / SQ, then a threat verb within a few words.
const THREAT_BCS = String.raw`(?:pokazacu|pokazat cu|poslacu|poslat cu|objavicu|objavit cu|svi ce (?:videti|vidjeti|znati))`;
const THREAT_MK = String.raw`kje (?:im |gi |im gi )?(?:pokazam|pratam|objavam)`;
const THREAT_SQ = String.raw`do t(?:ua|i|e) (?:tregoj|dergoj|publikoj|shperndaj)`;

const CONDITIONAL: Array<[FloorGroup, RegExp]> = [
  // English
  [
    "threats",
    new RegExp(String.raw`\bif you (?:dont|do not) send (?:me )?(?:a |an |another |more |some |any )?${PHOTO}\b`),
  ],
  ["threats", /\bif you (?:tell|told) (?:anyone|anybody|someone|your \w+),? (?:ill|i will|im going to|im gonna)\b/],
  // BCS: "ako (mi) ne pošalješ (još) sliku" — not "ako ne pošalješ beleške"
  [
    "threats",
    new RegExp(String.raw`\bako (?:mi )?ne (?:posaljes|posaljete|das) (?:mi )?(?:(?:jos|vise|jednu|jedan|neku|novu|tu|te|svoju|tvoju|svoje|tvoje) ){0,2}${PHOTO_BCS}\b`),
  ],
  // BCS: "ako (nekome) kažeš … pokazaću/poslaću/objaviću"
  [
    "threats",
    new RegExp(
      String.raw`\bako (?:ikome |nekome |bilo kome |svojima |roditeljima |mami |tati )?(?:kazes|reknes|javis|pricas)\b.{0,40}?\b${THREAT_BCS}\b`,
    ),
  ],
  // Macedonian: "ако не ми пратиш слика", "ако кажеш некому … ќе покажам"
  ["threats", new RegExp(String.raw`\bako ne (?:mi )?(?:pratis|ispratis) (?:mi )?(?:(?:uste|edna|nekoja|tvoja|svoja) ){0,2}${PHOTO_MK}\b`)],
  ["threats", new RegExp(String.raw`\bako (?:im )?(?:kazes|kazis)\b.{0,40}?\b${THREAT_MK}\b`)],
  // Albanian: "nëse nuk më dërgon foto", "nëse i tregon dikujt … do t'ua tregoj"
  [
    "threats",
    new RegExp(String.raw`\b(?:nese|po) nuk (?:me )?(?:dergon|dergove|con|cove) (?:nje |me shume |ndonje |edhe nje )?${PHOTO_SQ}\b`),
  ],
  ["threats", new RegExp(String.raw`\b(?:nese|po) (?:i |u )?(?:tregon|tregove|thua|the)\b.{0,40}?\b${THREAT_SQ}\b`)],
  // Images: "send me your picture" with the photo being of her
  [
    "images",
    new RegExp(String.raw`\b(?:posalji|posaljes|salji|posaljite) (?:mi )?(?:jednu )?(?:svoju|tvoju|svoje|tvoje) (?:sliku|slike|fotku|fotke|fotografiju|selfi)\b`),
  ],
  ["images", /\b(?:prati|isprati) mi (?:edna )?(?:tvoja|svoja|tvoi|svoi) (?:slika|sliki|fotka|fotki)\b/],
  ["images", /\b(?:me )?dergo(?: me)? (?:nje )?(?:foto|foton|fotot|fotografi) (?:tende|tenden|te tua|tuajen|tende)\b/],
];

// "just for me" counts only together with a photo word in the same message.
const JUST_FOR_ME = /\b(?:just for me|samo za mene|vetem per mua)\b/;
const PHOTO_WORD =
  /\b(?:pic|pics|photo|photos|picture|pictures|selfie|selfies|slika|sliku|slike|sliki|fotka|fotku|fotke|fotki|fotografiju|selfi|foto|foton|fotot)\b/;

/** Messages are separated by new lines or " / " (how people paste and how our samples are written). */
function splitMessages(normalized: string): string[] {
  return normalized.split(/\n| \/ /);
}

export function safetyFloor(text: string): FloorResult {
  // Keep line breaks for message splitting, normalize the rest.
  const lines = text.split(/\r?\n/).map(normalize);
  const joined = lines.join("\n");
  const groups = new Set<FloorGroup>();

  for (const group of Object.keys(GROUP_REGEX) as FloorGroup[]) {
    if (GROUP_REGEX[group].test(joined)) groups.add(group);
  }

  // Whitespace (incl. line breaks) already collapsed per line; join lines with spaces for phrases split across lines.
  const flat = joined.replace(/\n/g, " ");
  for (const [group, regex] of CONDITIONAL) {
    if (regex.test(flat)) groups.add(group);
  }

  for (const message of splitMessages(joined)) {
    if (JUST_FOR_ME.test(message) && PHOTO_WORD.test(message)) groups.add("images");
  }

  return { triggered: groups.size > 0, groups: [...groups] };
}
