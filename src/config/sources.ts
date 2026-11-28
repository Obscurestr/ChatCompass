// Research behind each warning sign: why the pattern counts as grooming (shown briefly as "author, year").
// Every reference was checked against a publisher or university record (research.md, 2026-11-28).

import type { SignCategory } from "../lib/schema";

export interface Reference {
  /** Short form shown under an explanation. */
  short: string;
  /** Full reference (APA), shown in the warning-signs guide. */
  full: string;
  url: string;
}

export const REFERENCES = {
  oconnell2003: {
    short: "O'Connell, 2003",
    full: "O'Connell, R. (2003). A typology of cybersexploitation and online grooming practices. Cyberspace Research Unit, University of Central Lancashire.",
    url: "https://calio.dspacedirect.org/items/de6efbc6-1fad-4767-a234-a9ac9852026a",
  },
  winters2017: {
    short: "Winters & Jeglic, 2017",
    full: "Winters, G. M., & Jeglic, E. L. (2017). Stages of sexual grooming: Recognizing potentially predatory behaviors of child molesters. Deviant Behavior, 38(6), 724–733.",
    url: "https://doi.org/10.1080/01639625.2016.1197656",
  },
  whittle2013: {
    short: "Whittle et al., 2013",
    full: "Whittle, H., Hamilton-Giachritsis, C., Beech, A., & Collings, G. (2013). A review of online grooming: Characteristics and concerns. Aggression and Violent Behavior, 18(1), 62–70.",
    url: "https://doi.org/10.1016/j.avb.2012.09.003",
  },
  craven2006: {
    short: "Craven et al., 2006",
    full: "Craven, S., Brown, S., & Gilchrist, E. (2006). Sexual grooming of children: Review of literature and theoretical considerations. Journal of Sexual Aggression, 12(3), 287–299.",
    url: "https://doi.org/10.1080/13552600601069414",
  },
  kloess2019: {
    short: "Kloess et al., 2019",
    full: "Kloess, J. A., Hamilton-Giachritsis, C. E., & Beech, A. R. (2019). Offense processes of online sexual grooming and abuse of children via internet communication platforms. Sexual Abuse, 31(1), 73–96.",
    url: "https://doi.org/10.1177/1079063217720927",
  },
  thorn2022: {
    short: "Thorn, 2022",
    full: "Thorn (2022). Online grooming: Examining risky encounters amid everyday digital socialization.",
    url: "https://info.thorn.org/hubfs/Research/2022_Online_Grooming_Report.pdf",
  },
  wolak2008: {
    short: "Wolak et al., 2008",
    full: "Wolak, J., Finkelhor, D., Mitchell, K. J., & Ybarra, M. L. (2008). Online \"predators\" and their victims. American Psychologist, 63(2), 111–128.",
    url: "https://doi.org/10.1037/0003-066X.63.2.111",
  },
  wolak2016: {
    short: "Wolak & Finkelhor, 2016",
    full: "Wolak, J., & Finkelhor, D. (2016). Sextortion: Findings from a survey of 1,631 victims. Crimes against Children Research Center, University of New Hampshire.",
    url: "https://www.thorn.org/wp-content/uploads/2024/02/Sextortion_Report.pdf",
  },
} satisfies Record<string, Reference>;

export type ReferenceId = keyof typeof REFERENCES;

export const CATEGORY_SOURCES: Record<SignCategory, ReferenceId[]> = {
  secrecy: ["winters2017", "oconnell2003"],
  isolation: ["winters2017", "craven2006"],
  fast_intimacy: ["oconnell2003", "whittle2013"],
  pressure: ["kloess2019", "whittle2013"],
  gifts_favours: ["craven2006", "winters2017"],
  personal_info: ["oconnell2003", "whittle2013"],
  images: ["kloess2019", "winters2017"],
  move_platform: ["thorn2022"],
  identity_doubt: ["kloess2019", "whittle2013"],
  threats_guilt: ["wolak2016"],
  meeting: ["wolak2008", "winters2017"],
};

/** "Winters & Jeglic, 2017; O'Connell, 2003" */
export function shortSources(category: SignCategory): string {
  return CATEGORY_SOURCES[category].map((id) => REFERENCES[id].short).join("; ");
}
