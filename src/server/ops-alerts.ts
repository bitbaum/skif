import "server-only";
import { conventionalFrom, fromAddress, isMailConfigured, sendMail, type SendResult } from "@bitbaum/mail-kit";
import { OPS_ALERT_SENDER_NAME, PUBLIC_ORIGIN_DEFAULT } from "@/config/ops-alerts";
import { bookingReference, composeOpsAlert, parseOpsRecipients, type OpsAlertEvent } from "@/domain/ops-alerts";

type Env = Record<string, string | undefined>;

export type OpsAlertDeps = {
  send?: typeof sendMail;
  env?: Env;
  log?: (message: string, detail: Record<string, unknown>) => void;
};

export type OpsAlertOutcome = "sent" | "skipped" | "failed";

/** Mail reaches Operations only with both a working Resend setup and at least
 * one Ops address. No network: safe for every /api/health hit. */
export function opsMailStatus(env: Env = process.env): "configured" | "unconfigured" {
  return isMailConfigured(env) && parseOpsRecipients(env.SKIF_OPS_EMAIL).length > 0 ? "configured" : "unconfigured";
}

/**
 * Tell Operations something happened. Never throws and never blocks the
 * person whose action caused it: unconfigured mail is skipped quietly, a
 * failed send is logged (without addresses) and dropped.
 */
export async function alertOps(event: OpsAlertEvent | null, deps: OpsAlertDeps = {}): Promise<OpsAlertOutcome> {
  if (!event) return "skipped";
  const env = deps.env ?? process.env;
  if (opsMailStatus(env) === "unconfigured") return "skipped";
  const log = deps.log ?? ((message, detail) => console.warn(message, detail));
  let result: SendResult;
  try {
    const alert = composeOpsAlert(event, {
      recipients: parseOpsRecipients(env.SKIF_OPS_EMAIL),
      origin: env.AUTH_URL || PUBLIC_ORIGIN_DEFAULT,
    });
    result = await (deps.send ?? sendMail)(
      {
        to: alert.to,
        subject: alert.subject,
        text: alert.text,
        html: alert.html,
        from: fromAddress(env) ?? conventionalFrom(OPS_ALERT_SENDER_NAME),
      },
      { idempotencyKey: alert.idempotencyKey, env },
    );
  } catch (error) {
    // mail-kit never throws; a malformed AUTH_URL or an injected sender might.
    result = { sent: false, error: error instanceof Error ? error.message : String(error), retryable: false };
  }
  if (result.sent) return "sent";
  log("ops alert not sent", {
    kind: event.kind,
    booking: bookingReference(event.bookingId),
    error: result.error,
    status: result.status,
    retryable: result.retryable,
  });
  return "failed";
}
