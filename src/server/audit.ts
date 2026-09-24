import "server-only";
import { desc } from "drizzle-orm";
import { auditEvents } from "@/db/schema";
import type { Db } from "@/db/types";
import { AUDIT_PAGE_SIZE, type AuditAction, type AuditSubject } from "@/domain/audit";

export type AuditEvent = typeof auditEvents.$inferSelect;

export async function audit(
  db: Db,
  actorSub: string,
  action: AuditAction,
  subject: { type: AuditSubject; id: string },
  detail?: Record<string, string>,
): Promise<void> {
  await db.insert(auditEvents).values({
    actorSub,
    action,
    subjectType: subject.type,
    subjectId: subject.id,
    detail: detail ?? null,
  });
}

export async function listAudit(db: Db): Promise<AuditEvent[]> {
  return db.select().from(auditEvents).orderBy(desc(auditEvents.at)).limit(AUDIT_PAGE_SIZE);
}
