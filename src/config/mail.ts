/**
 * Mail people send to Skif: hello@skif.orangecat.ch (mail-kit's convention,
 * one address per app on its own host). The box's mail gateway receives it
 * and posts it, signed, to /api/mail/inbound.
 *
 * Receiving mail means holding the sender's address, which Skif otherwise
 * never stores. So it is held for Operations' eyes only, for a fixed time,
 * and then deleted with the message: answered or not.
 */
import type { MailKind, MailUrgency } from "@bitbaum/mail-kit";

/** Days a message is kept after it arrives. */
export const MAIL_RETENTION_DAYS = 90;

/** Messages the Operations inbox lists, newest first. */
export const MAIL_INBOX_LIMIT = 50;

/** The longest reply Operations can send from Skif. */
export const MAIL_REPLY_MAX = 5000;

/** Told to the model that sorts incoming mail, so "urgent" means what it
 * means here. Never anything about a person. */
export const MAIL_TRIAGE_CONTEXT =
  "Skif connects people in Zürich with vetted personal-safety Protectors and teaches safety skills. " +
  "Anyone saying they are in danger now is urgent, and must be told to call 117 (police) or 112.";

export const MAIL_KIND_LABELS: Record<MailKind, string> = {
  question: "Question",
  request: "Request",
  complaint: "Complaint",
  booking: "Booking",
  billing: "Billing",
  partnership: "Partnership",
  press: "Press",
  spam: "Spam",
  other: "Other",
};

export const MAIL_URGENCY_LABELS: Record<MailUrgency, string> = {
  urgent: "Urgent",
  normal: "Normal",
  low: "Low",
};
