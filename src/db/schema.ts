/**
 * Database schema. There is deliberately no users table: identity is the
 * OrangeCat OIDC `sub`, stored as text wherever a row belongs to a person.
 */
import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { BOOKING_STATUSES } from "@/domain/lifecycle";
import { PAYMENT_STATUSES } from "@/domain/payment";
import type { SafetyPlan } from "@/domain/safety-plan";
import { RATING_MAX, RATING_MIN } from "@/config/ratings";
import {
  PRESENCE_STYLE_KEYS,
  type HardConstraintKey,
  type LanguageKey,
  type PresenceStyle,
} from "@/config/constraints";
import type { ProtectorSkill } from "@/config/protectors";
import { SERVICE_KEYS, type ServiceKey } from "@/config/services";
import type { ConcernKey, MeasureKey } from "@/config/assessment";

export const bookingStatus = pgEnum("booking_status", BOOKING_STATUSES);
export const paymentStatus = pgEnum("payment_status", PAYMENT_STATUSES);
export const protectorStatus = pgEnum("protector_status", ["APPLIED", "APPROVED", "SUSPENDED"]);
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

export const protectors = pgTable("protectors", {
  id: uuid("id").primaryKey().defaultRandom(),
  sub: text("sub").notNull().unique(),
  displayName: text("display_name").notNull(),
  bio: text("bio").notNull(),
  languages: textArray("languages").$type<LanguageKey[]>(),
  skills: textArray("skills").$type<ProtectorSkill[]>(),
  services: textArray("services").$type<ServiceKey[]>(),
  presenceStyles: textArray("presence_styles").$type<PresenceStyle[]>(),
  status: protectorStatus("status").notNull().default("APPLIED"),
  createdAt: createdAt(),
  approvedAt: timestamp("approved_at", { withTimezone: true }),
});

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
