/** Case files (src/domain/cases.ts): what a person keeps after a scam. The
 * owner's alone — no Operations, Protector or AI path reads this table. */
import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import type { CaseKind, RecoveryStepKey } from "@/config/cases";
import type { Indicator, TimelineEntry } from "@/domain/cases";
import { createdAt, textArray } from "./shared";

export const caseFiles = pgTable(
  "case_files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerSub: text("owner_sub").notNull(),
    kind: text("kind").$type<CaseKind>().notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull().default(""),
    /** A local date (YYYY-MM-DD) or "". */
    happenedOn: text("happened_on").notNull().default(""),
    policeReference: text("police_reference").notNull().default(""),
    timeline: jsonb("timeline").$type<TimelineEntry[]>().notNull().default([]),
    indicators: jsonb("indicators").$type<Indicator[]>().notNull().default([]),
    stepsDone: textArray("steps_done").$type<RecoveryStepKey[]>(),
    createdAt: createdAt(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [index("case_files_owner_idx").on(t.ownerSub)],
);
