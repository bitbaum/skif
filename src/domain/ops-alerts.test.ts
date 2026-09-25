import { describe, expect, it } from "vitest";
import {
  bookingAlert,
  bookingReference,
  composeOpsAlert,
  opsAlertKey,
  parseOpsRecipients,
  reportAlert,
  type OpsAlertEvent,
} from "./ops-alerts";

const BOOKING = "3f2a9c1e-7b4d-4e8a-9c21-5d6e7f809a1b";
const REPORT = "a1b2c3d4-0000-4000-8000-000000000001";
const ORIGIN = "https://skif.example.org";

describe("which events alert Operations", () => {
  it("a new booking with nobody assigned needs Operations", () => {
    expect(bookingAlert({ id: BOOKING, status: "REQUESTED", protectorId: null })).toEqual({
      kind: "BOOKING_NEEDS_ASSIGNING",
      bookingId: BOOKING,
    });
  });

  it("a booking that already has a Protector, or has moved on, does not", () => {
    expect(bookingAlert({ id: BOOKING, status: "REQUESTED", protectorId: "p1" })).toBeNull();
    expect(bookingAlert({ id: BOOKING, status: "CANCELLED", protectorId: null })).toBeNull();
  });

  it("an incident report does, a routine job report does not", () => {
    expect(reportAlert({ id: REPORT, bookingId: BOOKING, kind: "INCIDENT" })).toEqual({
      kind: "INCIDENT_FILED",
      bookingId: BOOKING,
      reportId: REPORT,
    });
    expect(reportAlert({ id: REPORT, bookingId: BOOKING, kind: "REPORT" })).toBeNull();
  });
});

describe("parseOpsRecipients", () => {
  it("splits on commas, trims, drops blanks and malformed entries, and dedupes", () => {
    expect(parseOpsRecipients(" ops@skif.ch, ,Night@Skif.ch,not-an-address,ops@SKIF.ch ")).toEqual([
      "ops@skif.ch",
      "Night@Skif.ch",
    ]);
  });

  it("is empty when unset", () => {
    expect(parseOpsRecipients(undefined)).toEqual([]);
    expect(parseOpsRecipients("")).toEqual([]);
  });
});

describe("composeOpsAlert", () => {
  const events: OpsAlertEvent[] = [
    { kind: "BOOKING_NEEDS_ASSIGNING", bookingId: BOOKING },
    { kind: "INCIDENT_FILED", bookingId: BOOKING, reportId: REPORT },
  ];

  it.each(events)("$kind names the booking by short reference and links to its Ops page", (event) => {
    const alert = composeOpsAlert(event, { recipients: ["ops@skif.ch"], origin: `${ORIGIN}/api/auth` });
    expect(bookingReference(BOOKING)).toBe("3F2A9C1E");
    expect(alert.to).toEqual(["ops@skif.ch"]);
    expect(alert.subject).toContain("3F2A9C1E");
    expect(alert.text).toContain(`${ORIGIN}/ops/bookings/${BOOKING}`);
    expect(alert.html).toContain(`href="${ORIGIN}/ops/bookings/${BOOKING}"`);
    expect(alert.idempotencyKey).toBe(opsAlertKey(event));
  });

  it("carries no personal or location data, even when the event object is handed some", () => {
    // Whatever a caller might accidentally pass along, composition reads only ids and kind.
    const leaky = {
      kind: "INCIDENT_FILED",
      bookingId: BOOKING,
      reportId: REPORT,
      meetingPoint: "Bahnhofstrasse 1, Zürich",
      notes: "Ex-partner may appear",
      summary: "A man followed us for two blocks",
      customerSub: "sub-secret-123",
      displayName: "Mira Keller",
    } as OpsAlertEvent;
    const alert = composeOpsAlert(leaky, { recipients: ["ops@skif.ch"], origin: ORIGIN });
    const everything = [alert.subject, alert.text, alert.html, alert.idempotencyKey].join("\n");
    for (const secret of ["Bahnhofstrasse", "Zürich", "Ex-partner", "followed", "sub-secret", "Mira", "Keller"]) {
      expect(everything).not.toContain(secret);
    }
  });

  it("keys incidents per report, so a second incident on one job still alerts", () => {
    const first = opsAlertKey({ kind: "INCIDENT_FILED", bookingId: BOOKING, reportId: REPORT });
    const second = opsAlertKey({ kind: "INCIDENT_FILED", bookingId: BOOKING, reportId: "other" });
    const booked = opsAlertKey({ kind: "BOOKING_NEEDS_ASSIGNING", bookingId: BOOKING });
    expect(new Set([first, second, booked]).size).toBe(3);
  });
});
