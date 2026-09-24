/** Environments and the assessments made of them. */
import { index, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import type {
  ConcernKey,
  CostTier,
  ExposureKey,
  MeasureKey,
  ProtectedKey,
  ThreatKey,
} from "@/config/assessment";
import type { Area } from "@/config/services";
import type { StoredPlan } from "@/domain/plan-versions";
import { createdAt, environmentType, textArray } from "./shared";

export const environments = pgTable(
  "environments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerSub: text("owner_sub").notNull(),
    type: environmentType("type").notNull(),
    name: text("name").notNull(),
    /** Coarse only (a Kreis), never an address. */
    area: text("area").$type<Area>(),
    createdAt: createdAt(),
  },
  (t) => [index("environments_owner_idx").on(t.ownerSub)],
);

export const assessments = pgTable(
  "assessments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    customerSub: text("customer_sub").notNull(),
    environmentId: uuid("environment_id")
      .notNull()
      .references(() => environments.id),
    /** Deprecated: the place's name now lives on `environments` (0009 moved
     * it). Kept because the box's schema step refuses DROP COLUMN. */
    placeName: text("place_name").notNull().default(""),
    protecting: textArray("protecting").$type<ProtectedKey[]>(),
    concerns: textArray("concerns").$type<ConcernKey[]>(),
    exposures: textArray("exposures").$type<ExposureKey[]>(),
    threats: textArray("threats").$type<ThreatKey[]>(),
    measures: textArray("measures").$type<MeasureKey[]>(),
    /** Null on assessments made before budgets were asked. */
    budget: text("budget").$type<CostTier>(),
    upcoming: text("upcoming").notNull().default(""),
    plan: jsonb("plan").$type<StoredPlan>().notNull(),
    createdAt: createdAt(),
  },
  (t) => [index("assessments_customer_idx").on(t.customerSub)],
);
