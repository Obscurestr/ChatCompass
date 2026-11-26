// Deterministic safety floor (FR-006). If any group matches, the server forces risk = "high".
// Only unambiguous emergencies belong here; everything subtler is the model's job.
// Every phrase needs a harmless counter-example test (see safetyFloor.test.ts and research.md).

export type FloorGroup = "meeting" | "threats" | "images";

export interface FloorResult {
  triggered: boolean;
  groups: FloorGroup[];
}

/** Lowercase, drop apostrophes ("I'll" → "ill"), strip diacritics, collapse whitespace. */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’‘`´]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Phrases are written already normalized (no apostrophes, lowercase).
const PHRASES: Record<FloorGroup, string[]> = {
  meeting: [
    "meet up",
    "meet in person",
    "meet irl",
    "lets meet",
    "come to my place",
    "come over to my",
    "ill pick you up",
    "i will pick you up",
    "i can pick you up",
  ],
  threats: [
    "ill show everyone",
    "i will show everyone",
    "ill send it to your",
    "i will send it to your",
    "ill post it",
    "i will post it",
    "blackmail",
  ],
  images: [
    "pic of you",
    "pics of you",
    "picture of you",
    "pictures of you",
    "photo of you",
    "photos of you",
    "send nudes",
    "nudes",
    "take a pic for me",
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
const CONDITIONAL: Array<[FloorGroup, RegExp]> = [
  [
    "threats",
    new RegExp(String.raw`\bif you (?:dont|do not) send (?:me )?(?:a |an |another |more |some |any )?${PHOTO}\b`),
  ],
  ["threats", /\bif you (?:tell|told) (?:anyone|anybody|someone|your \w+),? (?:ill|i will|im going to|im gonna)\b/],
];

// "just for me" counts only together with a photo word in the same message.
const JUST_FOR_ME = /\bjust for me\b/;
const PHOTO_WORD = /\b(?:pic|pics|photo|photos|picture|pictures|selfie|selfies)\b/;

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
