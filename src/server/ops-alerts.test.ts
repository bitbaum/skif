import type { MailMessage, SendOptions, SendResult } from "@bitbaum/mail-kit";
import { describe, expect, it, vi } from "vitest";
import type { OpsAlertEvent } from "@/domain/ops-alerts";
import { alertOps, opsMailStatus } from "./ops-alerts";

const EVENT: OpsAlertEvent = { kind: "BOOKING_NEEDS_ASSIGNING", bookingId: "3f2a9c1e-7b4d-4e8a-9c21-5d6e7f809a1b" };
const ENV = {
  RESEND_API_KEY: "re_live_key",
  SKIF_OPS_EMAIL: "ops@skif.ch, night@skif.ch",
  AUTH_URL: "https://skif.example.org",
};

function sender(result: SendResult) {
  return vi.fn<(m: MailMessage, o?: SendOptions) => Promise<SendResult>>(async () => result);
}

describe("opsMailStatus", () => {
  it("needs a real key and at least one Ops address", () => {
    expect(opsMailStatus(ENV)).toBe("configured");
    expect(opsMailStatus({ ...ENV, SKIF_OPS_EMAIL: "" })).toBe("unconfigured");
    expect(opsMailStatus({ ...ENV, RESEND_API_KEY: "" })).toBe("unconfigured");
    expect(opsMailStatus({ ...ENV, RESEND_API_KEY: "re_placeholder_x" })).toBe("unconfigured");
  });
});

describe("alertOps", () => {
  it("sends to every Ops address with the event's idempotency key and the fleet sender", async () => {
    const send = sender({ sent: true, id: "m1" });
    expect(await alertOps(EVENT, { send, env: ENV })).toBe("sent");
    const [message, options] = send.mock.calls[0]!;
    expect(message.to).toEqual(["ops@skif.ch", "night@skif.ch"]);
    expect(message.from).toBe("Skif <skif@fleetcrown.orangecat.ch>");
    expect(message.text).toContain("https://skif.example.org/ops/bookings/");
    expect(options?.idempotencyKey).toBe(`skif-booking_needs_assigning-${EVENT.bookingId}`);
  });

  it("uses RESEND_FROM when it is set", async () => {
    const send = sender({ sent: true, id: "m1" });
    await alertOps(EVENT, { send, env: { ...ENV, RESEND_FROM: "Ops <ops@fleetcrown.orangecat.ch>" } });
    expect(send.mock.calls[0]![0].from).toBe("Ops <ops@fleetcrown.orangecat.ch>");
  });

  it("skips quietly when mail is unconfigured or there is nothing to say", async () => {
    const send = sender({ sent: true, id: "m1" });
    const log = vi.fn();
    expect(await alertOps(EVENT, { send, log, env: { ...ENV, RESEND_API_KEY: "" } })).toBe("skipped");
    expect(await alertOps(null, { send, log, env: ENV })).toBe("skipped");
    expect(send).not.toHaveBeenCalled();
    expect(log).not.toHaveBeenCalled();
  });

  it("logs a failed send without addresses and carries on", async () => {
    const send = sender({ sent: false, error: "quota", status: 429, retryable: true });
    const log = vi.fn();
    expect(await alertOps(EVENT, { send, log, env: ENV })).toBe("failed");
    expect(log).toHaveBeenCalledOnce();
    expect(JSON.stringify(log.mock.calls[0])).not.toContain("@");
  });

  it("never throws, even if the sender does", async () => {
    const send = vi.fn(async (): Promise<SendResult> => {
      throw new Error("boom");
    });
    const log = vi.fn();
    await expect(alertOps(EVENT, { send, log, env: ENV })).resolves.toBe("failed");
    await expect(alertOps(EVENT, { send, log, env: { ...ENV, AUTH_URL: "not a url" } })).resolves.toBe("failed");
  });
});
