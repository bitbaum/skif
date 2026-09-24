/**
 * Database schema. There is deliberately no users table: identity is the
 * OrangeCat OIDC `sub`, stored as text wherever a row belongs to a person.
 */
import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import { BOOKING_STATUSES } from "@/domain/lifecycle";
import { PAYMENT_STATUSES } from "@/domain/payment";
import { PROTECTOR_STATUSES } from "@/domain/protector-status";
import type { MatchReason } from "@/domain/matching";
import type { SafetyPlan } from "@/domain/safety-plan";
import { RATING_MAX, RATING_MIN } from "@/config/ratings";
import {
  PRESENCE_STYLE_KEYS,
  type HardConstraintKey,
  type LanguageKey,
  type PresenceStyle,
} from "@/config/constraints";
import {
  CAPABILITY_LEVEL_KEYS,
  VERIFICATION_KEYS,
  type CapabilityKey,
} from "@/config/capabilities";
import { SERVICE_KEYS, type ServiceKey } from "@/config/services";
import type { ConcernKey, MeasureKey } from "@/config/assessment";

export const bookingStatus = pgEnum("booking_status", BOOKING_STATUSES);
export const paymentStatus = pgEnum("payment_status", PAYMENT_STATUSES);
export const protectorStatus = pgEnum("protector_status", PROTECTOR_STATUSES);
export const capabilityLevel = pgEnum("capability_level", CAPABILITY_LEVEL_KEYS);
export const verificationStatus = pgEnum("verification_status", VERIFICATION_KEYS);
export const serviceKind = pgEnum("service", SERVICE_KEYS);
export const presenceStyleKind = pgEnum("presence_style", PRESENCE_STYLE_KEYS);
export const reportKind = pgEnum("report_kind", ["REPORT", "INCIDENT"]);

const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const textArray = (name: string) => text(name).array().notNull().default(sql`'{}'::text[]`);

export const preferenceProfiles = pgTable("preference_profiles", {
  sub: text("sub").primaryKey(),
  hardConstraints: textArray("hard_constraints").$type<HardConstraintKey[]>(),
  presenceStyle: presenceStyleKind("presence_style").notNull(),
  languages: textArray("languages").$type<LanguageKey[]>(),
  valuesNote: text("values_note").notNull().default(""),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** What a customer chooses to tell us about themselves — deliberately little. */
export const customerProfiles = pgTable("customer_profiles", {
  sub: text("sub").primaryKey(),
  /** The name a Protector should use; shown to them only once they accept. */
  preferredName: text("preferred_name").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const protectors = pgTable("protectors", {
  id: uuid("id").primaryKey().defaultRandom(),
  sub: text("sub").notNull().unique(),
  displayName: text("display_name").notNull(),
  bio: text("bio").notNull(),
  languages: textArray("languages").$type<LanguageKey[]>(),
  /** Deprecated: superseded by protector_capabilities (0001 copied it
   * across). Kept because the box's schema step refuses DROP COLUMN. */
  skills: textArray("skills"),
  experienceYears: integer("experience_years").notNull().default(0),
  services: textArray("services").$type<ServiceKey[]>(),
  presenceStyles: textArray("presence_styles").$type<PresenceStyle[]>(),
  status: protectorStatus("status").notNull().default("APPLIED"),
  createdAt: createdAt(),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
});

export const protectorCapabilities = pgTable(
  "protector_capabilities",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    protectorId: uuid("protector_id")
      .notNull()
      .references(() => protectors.id),
    capability: text("capability").$type<CapabilityKey>().notNull(),
    level: capabilityLevel("level").notNull(),
    verification: verificationStatus("verification").notNull().default("SELF_DECLARED"),
    certification: text("certification").notNull().default(""),
    evidence: text("evidence").notNull().default(""),
    expiresOn: date("expires_on", { mode: "string" }),
    /** Operations sub that verified or rejected it (the assessor, SPEC §7). */
    assessedBy: text("assessed_by"),
    assessedAt: timestamp("assessed_at", { withTimezone: true }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("protector_capabilities_unique").on(t.protectorId, t.capability)],
);

export const protectorAvailability = pgTable(
  "protector_availability",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    protectorId: uuid("protector_id")
      .notNull()
      .references(() => protectors.id),
    /** ISO weekday, 1 = Monday. Times are Zürich wall-clock. */
    weekday: smallint("weekday").notNull(),
    startMinute: smallint("start_minute").notNull(),
    durationMinutes: smallint("duration_minutes").notNull(),
  },
  (t) => [
    unique("protector_availability_day").on(t.protectorId, t.weekday),
    check("availability_weekday", sql`${t.weekday} BETWEEN 1 AND 7`),
    check("availability_start", sql`${t.startMinute} BETWEEN 0 AND 1439`),
    check("availability_duration", sql`${t.durationMinutes} BETWEEN 1 AND 1440`),
  ],
);

export const bookings = pgTable(
  "bookings",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    customerSub: text("customer_sub").notNull(),
    service: serviceKind("service").notNull(),
    status: bookingStatus("status").notNull().default("REQUESTED"),
    startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
    hours: integer("hours").notNull(),
    area: text("area").notNull(),
    meetingPoint: text("meeting_point").notNull(),
    notes: text("notes").notNull().default(""),
    languages: textArray("languages").$type<LanguageKey[]>(),
    presenceStyle: presenceStyleKind("presence_style").notNull(),
    /** Capabilities the customer insisted on (on top of the service's own). */
    requiredCapabilities: textArray("required_capabilities").$type<CapabilityKey[]>(),
    /** Snapshot of the customer's hard constraints when they booked. */
    hardConstraints: textArray("hard_constraints").$type<HardConstraintKey[]>(),
    protectorId: uuid("protector_id").references(() => protectors.id),
    paymentStatus: paymentStatus("payment_status").notNull(),
    createdAt: createdAt(),
  },
  (t) => [
    index("bookings_customer_idx").on(t.customerSub),
    index("bookings_protector_idx").on(t.protectorId),
    index("bookings_status_idx").on(t.status),
    check("bookings_hours_positive", sql`${t.hours} > 0`),
  ],
);

export const bookingEvents = pgTable(
  "booking_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id),
    action: text("action").notNull(),
    fromStatus: bookingStatus("from_status"),
    toStatus: bookingStatus("to_status").notNull(),
    actorRole: text("actor_role").notNull(),
    actorSub: text("actor_sub").notNull(),
    protectorId: uuid("protector_id").references(() => protectors.id),
    /** On ASSIGN: why this Protector was matched, as shown to Operations then. */
    matchReasons: jsonb("match_reasons").$type<MatchReason[]>(),
    /** On an override: the reason Operations gave. Operations-only. */
    note: text("note"),
    at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("booking_events_booking_idx").on(t.bookingId)],
);

const ratingValue = (name: string) => smallint(name).notNull();
// Check constraints cannot take bind parameters, so the configured bounds are
// inlined as literals.
const ratingRange = sql.raw(`BETWEEN ${RATING_MIN} AND ${RATING_MAX}`);

export const ratings = pgTable(
  "ratings",
  {
    bookingId: uuid("booking_id")
      .primaryKey()
      .references(() => bookings.id),
    respect: ratingValue("respect"),
    discretion: ratingValue("discretion"),
    feltSafe: ratingValue("felt_safe"),
    comment: text("comment").notNull().default(""),
    createdAt: createdAt(),
  },
  (t) => [
    check("ratings_respect_range", sql`${t.respect} ${ratingRange}`),
    check("ratings_discretion_range", sql`${t.discretion} ${ratingRange}`),
    check("ratings_felt_safe_range", sql`${t.feltSafe} ${ratingRange}`),
  ],
);

export const reports = pgTable(
  "reports",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    bookingId: uuid("booking_id")
      .notNull()
      .references(() => bookings.id),
    protectorId: uuid("protector_id")
      .notNull()
      .references(() => protectors.id),
    kind: reportKind("kind").notNull(),
    summary: text("summary").notNull(),
    policeInvolved: boolean("police_involved").notNull().default(false),
    createdAt: createdAt(),
  },
  (t) => [index("reports_booking_idx").on(t.bookingId)],
);

export const assessments = pgTable(
  "assessments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    customerSub: text("customer_sub").notNull(),
    placeName: text("place_name").notNull(),
    concerns: textArray("concerns").$type<ConcernKey[]>(),
    measures: textArray("measures").$type<MeasureKey[]>(),
    plan: jsonb("plan").$type<SafetyPlan>().notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("assessments_customer_idx").on(t.customerSub)],
);
