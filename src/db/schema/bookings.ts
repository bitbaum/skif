/** Bookings, their lifecycle events, ratings and reports. */
import { sql } from "drizzle-orm";
import { boolean, check, index, integer, jsonb, pgTable, smallint, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { CapabilityKey } from "@/config/capabilities";
import type { HardConstraintKey, LanguageKey } from "@/config/constraints";
import { RATING_MAX, RATING_MIN } from "@/config/ratings";
import type { MatchReason } from "@/domain/matching";
import { protectors } from "./people";
import {
  bookingStatus,
  createdAt,
  paymentStatus,
  presenceStyleKind,
  reportKind,
  serviceKind,
  textArray,
} from "./shared";

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
