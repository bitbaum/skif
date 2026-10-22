/** Mail sent to hello@skif.orangecat.ch, held for Operations only and
 * deleted MAIL_RETENTION_DAYS after it arrived (src/config/mail.ts). */
import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { mailKind, mailUrgency } from "./shared";

export const inboundMail = pgTable(
  "inbound_mail",
  {
    /** The gateway's delivery id: the same mail delivered twice is one row. */
    id: text("id").primaryKey(),
    messageId: text("message_id"),
    fromAddress: text("from_address").notNull(),
    fromName: text("from_name"),
    subject: text("subject").notNull(),
    body: text("body").notNull(),
    receivedAt: timestamp("received_at", { withTimezone: true }).notNull(),
    /** The sender's domain failed SPF, DKIM or DMARC: maybe not who it says. */
    suspect: boolean("suspect").notNull().default(false),
    kind: mailKind("kind").notNull(),
    urgency: mailUrgency("urgency").notNull(),
    summary: text("summary").notNull(),
    language: text("language").notNull(),
    needsHuman: boolean("needs_human").notNull(),
    /** "model" or "rules": whether a model sorted it or the fallback did. */
    triagedBy: text("triaged_by").notNull(),
    repliedAt: timestamp("replied_at", { withTimezone: true }),
    handledAt: timestamp("handled_at", { withTimezone: true }),
    handledBy: text("handled_by"),
  },
  (t) => [index("inbound_mail_received_idx").on(t.receivedAt)],
);
