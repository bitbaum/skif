import { z } from "zod";
import { OPS_ALERT_COPY, OPS_ALERT_FOOTER } from "@/config/ops-alerts";

/**
 * Operations alerts, composed without side effects. The only inputs are ids
 * and the event kind, so a message cannot carry personal data even by
 * accident: there is nothing personal to put in it.
 */
export type OpsAlertEvent =
  | { kind: "BOOKING_NEEDS_ASSIGNING"; bookingId: string }
  | { kind: "INCIDENT_FILED"; bookingId: string; reportId: string };

export type OpsAlert = {
  to: string[];
  subject: string;
  text: string;
  html: string;
  /** Stable per event, so a retried send cannot mail Operations twice. */
  idempotencyKey: string;
};

/** A new booking needs Operations exactly when nobody is assigned to it yet. */
export function bookingAlert(booking: {
  id: string;
  status: string;
  protectorId: string | null;
}): OpsAlertEvent | null {
  return booking.status === "REQUESTED" && !booking.protectorId
    ? { kind: "BOOKING_NEEDS_ASSIGNING", bookingId: booking.id }
    : null;
}

/** Only incidents page Operations; routine job reports wait for the dashboard. */
export function reportAlert(report: { id: string; bookingId: string; kind: string }): OpsAlertEvent | null {
  return report.kind === "INCIDENT"
    ? { kind: "INCIDENT_FILED", bookingId: report.bookingId, reportId: report.id }
    : null;
}

const email = z.email();

/** SKIF_OPS_EMAIL: comma-separated addresses; blanks and malformed entries are
 * dropped, duplicates collapsed (case-insensitively). */
export function parseOpsRecipients(raw: string | undefined): string[] {
  const seen = new Map<string, string>();
  for (const part of (raw ?? "").split(",")) {
    const address = part.trim();
    if (email.safeParse(address).success && !seen.has(address.toLowerCase())) {
      seen.set(address.toLowerCase(), address);
    }
  }
  return [...seen.values()];
}

/** Short, human-quotable booking reference: the first 8 hex digits of the id. */
export function bookingReference(bookingId: string): string {
  return bookingId.replace(/-/g, "").slice(0, 8).toUpperCase();
}

/** One key per event (per incident, not per booking: a job can have several). */
export function opsAlertKey(event: OpsAlertEvent): string {
  const subject = event.kind === "INCIDENT_FILED" ? event.reportId : event.bookingId;
  return `skif-${event.kind.toLowerCase()}-${subject}`;
}

/** Absolute link to the Operations page for the event's booking. */
export function opsLink(event: OpsAlertEvent, origin: string): string {
  return new URL(`/ops/bookings/${encodeURIComponent(event.bookingId)}`, new URL(origin).origin).href;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function composeOpsAlert(
  event: OpsAlertEvent,
  { recipients, origin }: { recipients: string[]; origin: string },
): OpsAlert {
  const copy = OPS_ALERT_COPY[event.kind];
  const ref = bookingReference(event.bookingId);
  const link = opsLink(event, origin);
  const text = [copy.headline, "", `Booking: ${ref}`, `${copy.action}: ${link}`, "", OPS_ALERT_FOOTER].join("\n");
  const html = [
    `<p>${escapeHtml(copy.headline)}</p>`,
    `<p>Booking: <strong>${escapeHtml(ref)}</strong></p>`,
    `<p><a href="${escapeHtml(link)}">${escapeHtml(copy.action)}</a></p>`,
    `<p><small>${escapeHtml(OPS_ALERT_FOOTER)}</small></p>`,
  ].join("\n");
  return { to: recipients, subject: copy.subject(ref), text, html, idempotencyKey: opsAlertKey(event) };
}
