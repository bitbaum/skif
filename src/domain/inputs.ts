/**
 * Boundary schemas for everything a person submits. Server actions parse with
 * these; server modules accept only the parsed types.
 */
import { z } from "zod";
import { ASSESSMENT_LIMITS, CONCERN_KEYS, MEASURE_KEYS } from "@/config/assessment";
import { HARD_CONSTRAINT_KEYS, LANGUAGE_KEYS, PRESENCE_STYLE_KEYS } from "@/config/constraints";
import { PROTECTOR_LIMITS, PROTECTOR_SKILL_KEYS } from "@/config/protectors";
import { RATING_COMMENT_MAX, RATING_MAX, RATING_MIN } from "@/config/ratings";
import { AREAS, BOOKING_LIMITS, SERVICE_KEYS } from "@/config/services";
import { zonedLocalToDate } from "./time";

const trimmed = (max: number) => z.string().trim().max(max);
const required = (max: number) => trimmed(max).min(1, "Required");

export const preferencesInput = z.object({
  hardConstraints: z.array(z.enum(HARD_CONSTRAINT_KEYS)),
  presenceStyle: z.enum(PRESENCE_STYLE_KEYS),
  languages: z.array(z.enum(LANGUAGE_KEYS)),
  valuesNote: trimmed(BOOKING_LIMITS.notesMax),
});
export type PreferencesInput = z.infer<typeof preferencesInput>;

export const bookingInput = z.object({
  service: z.enum(SERVICE_KEYS),
  /** A Date (from code) or a datetime-local string, read as Zürich time. */
  startsAt: z
    .union([
      z.date(),
      z.string().transform((s, ctx) => {
        const date = zonedLocalToDate(s);
        if (date) return date;
        ctx.addIssue({ code: "custom", message: "Invalid date" });
        return z.NEVER;
      }),
    ])
    .refine((d) => d.getTime() > Date.now(), "Must be in the future"),
  hours: z.coerce.number().int().min(BOOKING_LIMITS.minHours).max(BOOKING_LIMITS.maxHours),
  area: z.enum(AREAS),
  meetingPoint: required(BOOKING_LIMITS.meetingPointMax),
  notes: trimmed(BOOKING_LIMITS.notesMax),
});
export type BookingInput = z.infer<typeof bookingInput>;

export const protectorApplication = z.object({
  displayName: required(PROTECTOR_LIMITS.displayNameMax),
  bio: required(PROTECTOR_LIMITS.bioMax),
  languages: z.array(z.enum(LANGUAGE_KEYS)).min(1, "Pick at least one language"),
  skills: z.array(z.enum(PROTECTOR_SKILL_KEYS)),
  services: z.array(z.enum(SERVICE_KEYS)).min(1, "Pick at least one service"),
  presenceStyles: z.array(z.enum(PRESENCE_STYLE_KEYS)).min(1, "Pick at least one style"),
});
export type ProtectorApplication = z.infer<typeof protectorApplication>;

const ratingValue = z.coerce.number().int().min(RATING_MIN).max(RATING_MAX);

export const ratingInput = z.object({
  respect: ratingValue,
  discretion: ratingValue,
  feltSafe: ratingValue,
  comment: trimmed(RATING_COMMENT_MAX),
});
export type RatingInput = z.infer<typeof ratingInput>;

export const reportInput = z.object({
  kind: z.enum(["REPORT", "INCIDENT"]),
  summary: required(BOOKING_LIMITS.notesMax),
  policeInvolved: z.boolean(),
});
export type ReportInput = z.infer<typeof reportInput>;

export const assessmentInput = z.object({
  placeName: required(ASSESSMENT_LIMITS.placeNameMax),
  concerns: z.array(z.enum(CONCERN_KEYS)),
  measures: z.array(z.enum(MEASURE_KEYS)),
});
export type AssessmentInput = z.infer<typeof assessmentInput>;

export const idInput = z.uuid();

/** Turn FormData into a plain object; `arrays` names the multi-value fields
 * (checkbox groups) and `booleans` the single checkboxes. */
export function formFields(
  form: FormData,
  arrays: readonly string[] = [],
  booleans: readonly string[] = [],
): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of form.entries()) {
    if (!arrays.includes(key) && typeof value === "string") out[key] = value;
  }
  for (const key of arrays) out[key] = form.getAll(key).filter((v) => typeof v === "string");
  for (const key of booleans) out[key] = form.get(key) === "on";
  return out;
}

/** First zod issue as a readable sentence. */
export function describeIssue(error: z.ZodError): string {
  const issue = error.issues[0];
  if (!issue) return "Invalid input";
  const field = issue.path.join(".");
  return field ? `${field}: ${issue.message}` : issue.message;
}

/** A same-site path to redirect to, or the fallback. Rejects `//host` and
 * absolute URLs so a crafted link can't bounce someone off-site. */
export function localPath(value: unknown, fallback: string): string {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}
