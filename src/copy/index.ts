// All copy dictionaries. Each one has exactly the keys of en.ts (type Copy).

import type { Lang } from "../i18n/locales";
import { bs } from "./bs";
import { cnr } from "./cnr";
import { en, type Copy } from "./en";
import { hr } from "./hr";
import { mk } from "./mk";
import { sq } from "./sq";
import { sr } from "./sr";

export type { Copy };

export const COPY: Record<Lang, Copy> = { sr, hr, bs, cnr, mk, sq, en };

export const getCopy = (lang: Lang): Copy => COPY[lang];
