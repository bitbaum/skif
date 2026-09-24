/** Customers and Protectors. Identity is the OIDC `sub`; there is no users table. */
import { sql } from "drizzle-orm";
import { check, date, integer, jsonb, pgTable, smallint, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import type { CapabilityKey } from "@/config/capabilities";
import type { AxisLeans, HardConstraintKey, LanguageKey, PresenceStyle } from "@/config/constraints";
import type { ServiceKey } from "@/config/services";
import {
  capabilityLevel,
  createdAt,
  presenceStyleKind,
  protectorStatus,
  textArray,
  verificationStatus,
} from "./shared";

export const preferenceProfiles = pgTable("preference_profiles", {
  sub: text("sub").primaryKey(),
  hardConstraints: textArray("hard_constraints").$type<HardConstraintKey[]>(),
  presenceStyle: presenceStyleKind("presence_style").notNull(),
  languages: textArray("languages").$type<LanguageKey[]>(),
  /** Trade-off leans (SPEC §3). Missing keys mean balanced. */
  axes: jsonb("axes").$type<AxisLeans>().notNull().default({}),
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
