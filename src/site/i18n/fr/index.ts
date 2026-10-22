/**
 * The content pages in FR: each a full SitePage mirroring what the English
 * page function returns (src/site/<name>.ts) — same sections, anchors and
 * links, every sentence translated. pages.test.ts checks the shape.
 */
import type { SitePage } from "@bitbaum/sitekit";
import type { PageName } from "../../pages";

export const PAGES_FR: Partial<Record<PageName, SitePage>> = {};
