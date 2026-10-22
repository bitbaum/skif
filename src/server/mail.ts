import "server-only";
import {
  appAddressFromEnv,
  conventionalFrom,
  fromAddress,
  isMailConfigured,
  sendMail,
  triageMail,
  type CompleteFn,
  type InboundMail,
  type SendResult,
} from "@bitbaum/mail-kit";
import { createHash } from "node:crypto";
import { desc, eq, lt } from "drizzle-orm";
import {
  MAIL_INBOX_LIMIT,
  MAIL_REPLY_MAX,
  MAIL_RETENTION_DAYS,
  MAIL_TRIAGE_CONTEXT,
} from "@/config/mail";
import { modelCaller } from "@/server/ai";
import {
  OPS_ALERT_SENDER_NAME,
  PUBLIC_ORIGIN_DEFAULT,
} from "@/config/ops-alerts";
import { inboundMail } from "@/db/schema";
import type { Db } from "@/db/types";

type Env = Record<string, string | undefined>;
export type StoredMail = typeof inboundMail.$inferSelect;

/** Whether the gateway can deliver here: the shared signing secret is set.
 * Environment only, so /api/health can report it for free. */
export function inboundMailStatus(
  env: Env = process.env,
): "configured" | "unconfigured" {
  return env.MAIL_INBOUND_SECRET ? "configured" : "unconfigured";
}

/** Skif's public address, hello@<its host>. */
export function skifAddress(env: Env = process.env): string {
  return (
    appAddressFromEnv(env) ??
    appAddressFromEnv({ APP_URL: PUBLIC_ORIGIN_DEFAULT })!
  );
}

/** Skif's model chain, in the shape mail-kit's triage calls: the same keys,
 * fallbacks and deadline as every other model call here. */
export function triageCaller(env: Env = process.env): CompleteFn {
  const call = modelCaller({ env });
  return ({ system, prompt, maxTokens = 200, temperature = 0 }) =>
    call({ system, prompt, maxTokens, temperature });
}

/** Delete every message older than the retention window, answered or not. */
export async function purgeExpiredMail(
  db: Db,
  now: Date = new Date(),
): Promise<void> {
  const cutoff = new Date(
    now.getTime() - MAIL_RETENTION_DAYS * 24 * 60 * 60 * 1000,
  );
  await db.delete(inboundMail).where(lt(inboundMail.receivedAt, cutoff));
}

/**
 * Keep a message the gateway delivered, sorted by a model when one answers
 * (mail-kit falls back to rules, so a vendor outage never loses mail). A
 * redelivery of the same id is a no-op: the gateway retries until it hears
 * 200, and a retry must not make a second row.
 */
export async function receiveMail(
  db: Db,
  mail: InboundMail,
  complete: CompleteFn,
): Promise<void> {
  const [known] = await db
    .select({ id: inboundMail.id })
    .from(inboundMail)
    .where(eq(inboundMail.id, mail.id));
  if (known) return;
  const triage = await triageMail(mail, complete, MAIL_TRIAGE_CONTEXT);
  await db
    .insert(inboundMail)
    .values({
      id: mail.id,
      messageId: mail.messageId ?? null,
      fromAddress: (mail.replyTo ?? mail.from).address,
      fromName: (mail.replyTo ?? mail.from).name ?? null,
      subject: mail.subject.slice(0, 500),
      body: mail.text,
      receivedAt: new Date(mail.receivedAt),
      suspect:
        mail.auth.spf === "fail" ||
        mail.auth.dkim === "fail" ||
        mail.auth.dmarc === "fail",
      kind: triage.kind,
      urgency: triage.urgency,
      summary: triage.summary,
      language: triage.language,
      needsHuman: triage.needsHuman,
      triagedBy: triage.by,
      // Spam and automated notices need nobody: they arrive already handled.
      handledAt: triage.needsHuman ? null : new Date(),
      handledBy: triage.needsHuman ? null : "triage",
    })
    .onConflictDoNothing();
  await purgeExpiredMail(db);
}

const URGENCY_ORDER = { urgent: 0, normal: 1, low: 2 } as const;

/** What Operations has to answer: unhandled first, urgent first within that. */
export async function listInbox(
  db: Db,
): Promise<{ open: StoredMail[]; handled: StoredMail[] }> {
  await purgeExpiredMail(db);
  const rows = await db
    .select()
    .from(inboundMail)
    .orderBy(desc(inboundMail.receivedAt))
    .limit(MAIL_INBOX_LIMIT);
  const open = rows
    .filter((m) => !m.handledAt)
    .sort((a, b) => URGENCY_ORDER[a.urgency] - URGENCY_ORDER[b.urgency]);
  return { open, handled: rows.filter((m) => m.handledAt) };
}

export async function getMail(db: Db, id: string): Promise<StoredMail | null> {
  await purgeExpiredMail(db);
  const [row] = await db
    .select()
    .from(inboundMail)
    .where(eq(inboundMail.id, id));
  return row ?? null;
}

export async function setHandled(
  db: Db,
  id: string,
  sub: string,
  handled: boolean,
): Promise<void> {
  await db
    .update(inboundMail)
    .set(
      handled
        ? { handledAt: new Date(), handledBy: sub }
        : { handledAt: null, handledBy: null },
    )
    .where(eq(inboundMail.id, id));
}

/**
 * Answer a message from Skif. Sent from the fleet's sender with Reply-To set
 * to hello@skif…, so the person's next answer comes back into this inbox.
 * Marks the message handled only when the mail actually went.
 */
export async function replyToMail(
  db: Db,
  id: string,
  sub: string,
  text: string,
  deps: { send?: typeof sendMail; env?: Env } = {},
): Promise<{ ok: true } | { ok: false; error: string }> {
  const env = deps.env ?? process.env;
  const body = text.trim().slice(0, MAIL_REPLY_MAX);
  if (!body) return { ok: false, error: "Write the answer first." };
  if (!isMailConfigured(env))
    return {
      ok: false,
      error: "Mail is not set up on this server, so nothing can be sent.",
    };
  const mail = await getMail(db, id);
  if (!mail)
    return {
      ok: false,
      error: "That message is gone: it was deleted after its retention period.",
    };
  const subject = /^re:/i.test(mail.subject)
    ? mail.subject
    : `Re: ${mail.subject}`;
  let result: SendResult;
  try {
    result = await (deps.send ?? sendMail)(
      {
        to: mail.fromAddress,
        subject,
        text: body,
        from: fromAddress(env) ?? conventionalFrom(OPS_ALERT_SENDER_NAME),
        replyTo: skifAddress(env),
      },
      {
        env, // The same answer submitted twice (a double tap) is sent once.
        idempotencyKey: `reply-${createHash("sha256").update(`${mail.id}\n${body}`).digest("hex").slice(0, 32)}`,
      },
    );
  } catch (error) {
    result = {
      sent: false,
      error: error instanceof Error ? error.message : String(error),
      retryable: false,
    };
  }
  if (!result.sent) {
    console.warn("mail reply not sent", {
      mail: mail.id,
      error: result.error,
      status: result.status,
    });
    return {
      ok: false,
      error: "The answer could not be sent. Try again in a minute.",
    };
  }
  const now = new Date();
  await db
    .update(inboundMail)
    .set({ repliedAt: now, handledAt: now, handledBy: sub })
    .where(eq(inboundMail.id, id));
  return { ok: true };
}
