import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { CHECKLISTS } from "../checklists";
import { CHECKLIST_TRANSLATIONS } from "./checklists";
import { CONCERNS } from "../concerns";
import { ENVIRONMENT_TYPES } from "../environments";
import { ASSESSMENT_TRANSLATIONS, INTERVENTION_KEYS } from "./assessment";
import { ACADEMY_KEYS, ACADEMY_TRANSLATIONS } from "./academy";
import { CAPABILITIES } from "../capabilities";

describe("translations", () => {
  it("give every checklist the same steps as English, with a detail exactly where English has one", () => {
    for (const [locale, byslug] of Object.entries(CHECKLIST_TRANSLATIONS)) {
      for (const c of CHECKLISTS) {
        const t = byslug![c.slug];
        expect(t, `${locale} ${c.slug}`).toBeDefined();
        expect(t.steps.length, `${locale} ${c.slug}`).toBe(c.steps.length);
        c.steps.forEach((s, i) => expect(Boolean(t.steps[i].detail), `${locale} ${c.slug} step ${i + 1}`).toBe("detail" in s));
      }
    }
  });

  it("translate every concern, place and step the plan engine can show", () => {
    for (const [locale, t] of Object.entries(ASSESSMENT_TRANSLATIONS)) {
      for (const k of INTERVENTION_KEYS) expect(t!.interventions[k]?.title, `${locale} ${k}`).toBeTruthy();
      for (const c of CONCERNS) expect(t!.concerns[c.key]?.label, `${locale} ${c.key}`).toBeTruthy();
      for (const e of ENVIRONMENT_TYPES) expect(t!.environments[e.key]?.label, `${locale} ${e.key}`).toBeTruthy();
    }
  });

  it("translate every Academy area, course, capability and delivery", () => {
    for (const [locale, t] of Object.entries(ACADEMY_TRANSLATIONS)) {
      for (const k of ACADEMY_KEYS.areas) expect(t.areas[k]?.title && t.areas[k]?.intro, `${locale} area ${k}`).toBeTruthy();
      for (const k of ACADEMY_KEYS.courses) expect(t.courses[k]?.title && t.courses[k]?.outcome, `${locale} course ${k}`).toBeTruthy();
      for (const c of CAPABILITIES) expect(t.capabilities[c.key], `${locale} capability ${c.key}`).toBeTruthy();
      for (const k of ACADEMY_KEYS.delivery) expect(t.delivery[k], `${locale} delivery ${k}`).toBeTruthy();
    }
  });

  it("writes German the Swiss way: no ß anywhere", () => {
    for (const f of ["de.ts", "fields.ts", "checklists.ts", "assessment.de.json", "academy.de.ts"]) expect(readFileSync(join(__dirname, f), "utf8"), f).not.toContain("ß");
  });
});
