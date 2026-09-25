/**
 * SSOT for every form an AI model may help fill. The /api/ai/form-assist route
 * accepts only these keys, and only these fields ever reach a model.
 *
 * There is exactly one, and that is a decision, not a gap:
 *
 * - Location and incident data never leave Skif's own database. Bookings,
 *   assessments, preferences, reports, incidents and complaints all carry
 *   where someone lives or goes, or what happened to them — so none of them
 *   is registered here.
 * - A model never matches, dispatches or judges people (SPEC §28). It only
 *   fills fields a person then reviews and submits; matching stays the
 *   deterministic ranking in src/domain/matching.ts, and Operations still
 *   approves every Protector.
 *
 * What remains is a Protector describing their OWN professional background.
 * Option lists are derived from the constants that define them — never retyped.
 */
import { defineFields, type FieldSpec, type FormTarget } from "@bitbaum/ai-kit/forms";
import { CAPABILITIES, CAPABILITY_LEVELS, CAPABILITY_LIMITS, capabilityFieldName } from "./capabilities";
import { LANGUAGES, PRESENCE_STYLES } from "./constraints";
import { PROTECTOR_LIMITS } from "./protectors";
import { SERVICES } from "./services";

function optionsOf(list: readonly { key: string; label: string }[]) {
  return list.map((o) => ({ value: o.key, label: o.label }));
}

/** Level and "where you gained it" per capability, named exactly as the form
 * posts them, so the model's values and the submitted form cannot drift.
 * Certificate numbers and expiry dates are not here: they are copied from a
 * document, and a model must not be the one to type a licence number
 * Operations will check. */
const capabilityFields: FieldSpec[] = CAPABILITIES.flatMap((c) => [
  {
    name: capabilityFieldName(c.key, "level"),
    label: `${c.label}: level`,
    type: "select",
    options: optionsOf(CAPABILITY_LEVELS),
    hint: "Leave empty unless the person says they have this capability",
  },
  {
    name: capabilityFieldName(c.key, "evidence"),
    label: `${c.label}: where they gained it`,
    type: "text",
    maxLength: CAPABILITY_LIMITS.evidenceMax,
  },
]);

export const PROTECTOR_APPLICATION_FORM: FormTarget = {
  key: "protector-application",
  name: "Protector application",
  fields: defineFields([
    {
      name: "displayName",
      label: "Name shown to customers",
      type: "text",
      required: true,
      maxLength: PROTECTOR_LIMITS.displayNameMax,
    },
    {
      name: "bio",
      label: "About you",
      type: "textarea",
      required: true,
      maxLength: PROTECTOR_LIMITS.bioMax,
      hint: "How they keep situations calm, in their own voice (first person). Customers read this.",
    },
    { name: "services", label: "Services you offer", type: "multiselect", options: optionsOf(SERVICES) },
    { name: "languages", label: "Languages", type: "multiselect", options: optionsOf(LANGUAGES) },
    {
      name: "experienceYears",
      label: "Years of relevant experience",
      type: "number",
      min: 0,
      max: PROTECTOR_LIMITS.experienceYearsMax,
    },
    { name: "presenceStyles", label: "Styles you work in", type: "multiselect", options: optionsOf(PRESENCE_STYLES) },
    ...capabilityFields,
  ]),
  instructions: [
    "This is a person describing their own professional experience to apply as a Protector.",
    "Declare a capability only when the person says they have it, and never at a higher level than they describe.",
    "Never invent employers, certificates, courses, years or languages.",
    "Skif values judgment and calm over intimidation: write the bio in that spirit, without exaggeration.",
    "Write the bio in the language the person wrote their description in.",
    "Do not write about customers, jobs, places or incidents.",
  ],
};

export const AI_FORMS: readonly FormTarget[] = [PROTECTOR_APPLICATION_FORM];
