/**
 * The content pages in IT: each a full SitePage mirroring what the English
 * page function returns (src/site/<name>.ts) — same sections, anchors and
 * links, every sentence translated. pages.test.ts checks the shape.
 */
import type { SitePage } from "@bitbaum/sitekit";
import type { PageName } from "../../pages";
import { BUSINESS_IT } from "./business";
import { JOIN_IT } from "./join";
import { METHOD_IT } from "./method";
import { PRIVACY_IT } from "./privacy";
import { PROTECTORS_IT } from "./protectors";

export const PAGES_IT: Partial<Record<PageName, SitePage>> = {
  method: METHOD_IT,
  protectors: PROTECTORS_IT,
  business: BUSINESS_IT,
  join: JOIN_IT,
  privacy: PRIVACY_IT,
};
