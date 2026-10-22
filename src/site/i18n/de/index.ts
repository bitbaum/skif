/**
 * The content pages in DE: each a full SitePage mirroring what the English
 * page function returns (src/site/<name>.ts) — same sections, anchors and
 * links, every sentence translated. pages.test.ts checks the shape.
 */
import type { SitePage } from "@bitbaum/sitekit";
import type { PageName } from "../../pages";
import { BUSINESS_DE } from "./business";
import { JOIN_DE } from "./join";
import { METHOD_DE } from "./method";
import { PRIVACY_DE } from "./privacy";
import { PROTECTORS_DE } from "./protectors";

export const PAGES_DE: Partial<Record<PageName, SitePage>> = {
  method: METHOD_DE,
  protectors: PROTECTORS_DE,
  business: BUSINESS_DE,
  join: JOIN_DE,
  privacy: PRIVACY_DE,
};
