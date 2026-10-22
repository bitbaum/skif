/**
 * The content pages in FR: each a full SitePage mirroring what the English
 * page function returns (src/site/<name>.ts) — same sections, anchors and
 * links, every sentence translated. pages.test.ts checks the shape.
 */
import type { SitePage } from "@bitbaum/sitekit";
import type { PageName } from "../../pages";
import { BUSINESS_FR } from "./business";
import { JOIN_FR } from "./join";
import { METHOD_FR } from "./method";
import { PRIVACY_FR } from "./privacy";
import { PROTECTORS_FR } from "./protectors";

export const PAGES_FR: Partial<Record<PageName, SitePage>> = {
  method: METHOD_FR,
  protectors: PROTECTORS_FR,
  business: BUSINESS_FR,
  join: JOIN_FR,
  privacy: PRIVACY_FR,
};
