import { index, jsonb, pgTable, text, uuid } from "drizzle-orm/pg-core";
import type { ConcernKey, MeasureKey } from "@/config/assessment";
import type { SafetyPlan } from "@/domain/safety-plan";
import { createdAt, textArray } from "./shared";

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
