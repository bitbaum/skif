/** Append-only record of sensitive Operations access. Rows are never updated. */
import { index, jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { auditAction, auditSubject } from "./shared";

export const auditEvents = pgTable(
  "audit_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorSub: text("actor_sub").notNull(),
    action: auditAction("action").notNull(),
    subjectType: auditSubject("subject_type").notNull(),
    subjectId: uuid("subject_id").notNull(),
    /** Small, non-sensitive context (e.g. the new status). Never content. */
    detail: jsonb("detail").$type<Record<string, string>>(),
    at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("audit_events_at_idx").on(t.at), index("audit_events_subject_idx").on(t.subjectType, t.subjectId)],
);
