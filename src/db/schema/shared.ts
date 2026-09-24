/** Enums and column helpers shared by every schema module. */
import { sql } from "drizzle-orm";
import { pgEnum, text, timestamp } from "drizzle-orm/pg-core";
import { CAPABILITY_LEVEL_KEYS, VERIFICATION_KEYS } from "@/config/capabilities";
import { PRESENCE_STYLE_KEYS } from "@/config/constraints";
import { SERVICE_KEYS } from "@/config/services";
import { BOOKING_STATUSES } from "@/domain/lifecycle";
import { PAYMENT_STATUSES } from "@/domain/payment";
import { PROTECTOR_STATUSES } from "@/domain/protector-status";
import { INCIDENT_REVIEW_STATUSES } from "@/domain/incidents";
import { INCIDENT_SEVERITY_KEYS } from "@/config/reports";

export const bookingStatus = pgEnum("booking_status", BOOKING_STATUSES);
export const paymentStatus = pgEnum("payment_status", PAYMENT_STATUSES);
export const protectorStatus = pgEnum("protector_status", PROTECTOR_STATUSES);
export const capabilityLevel = pgEnum("capability_level", CAPABILITY_LEVEL_KEYS);
export const verificationStatus = pgEnum("verification_status", VERIFICATION_KEYS);
export const serviceKind = pgEnum("service", SERVICE_KEYS);
export const presenceStyleKind = pgEnum("presence_style", PRESENCE_STYLE_KEYS);
export const reportKind = pgEnum("report_kind", ["REPORT", "INCIDENT"]);
export const incidentSeverity = pgEnum("incident_severity", INCIDENT_SEVERITY_KEYS);
export const incidentReview = pgEnum("incident_review", INCIDENT_REVIEW_STATUSES);

export const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
export const textArray = (name: string) => text(name).array().notNull().default(sql`'{}'::text[]`);
