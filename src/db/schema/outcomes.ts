/** "Did it help?": what a person said about a step their Safety Plan gave
 * them (src/domain/step-outcomes.ts). One row per person and step. */
import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core";
import type { StepHelped, StepStatus } from "@/domain/step-outcomes";

export const stepOutcomes = pgTable(
  "step_outcomes",
  {
    sub: text("sub").notNull(),
    /** An intervention key from src/config/interventions.ts. */
    interventionKey: text("intervention_key").notNull(),
    status: text("status").$type<StepStatus>().notNull(),
    helped: text("helped").$type<StepHelped>(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.sub, t.interventionKey] })],
);
