/**
 * What Skif tells Operations by email, and nothing more. Skif keeps no one's
 * email address, so mail goes only to Operations (SKIF_OPS_EMAIL), and it
 * carries no personal or location data: no names, no meeting point, no notes,
 * no report text. It says what happened, gives a short booking reference and
 * links to the page where a signed-in operator sees the rest.
 */
export const OPS_ALERT_KINDS = ["BOOKING_NEEDS_ASSIGNING", "INCIDENT_FILED"] as const;
export type OpsAlertKind = (typeof OPS_ALERT_KINDS)[number];

/** The sender's display name when RESEND_FROM is unset (mail-kit's fleet convention). */
export const OPS_ALERT_SENDER_NAME = "Skif";

/** Where links point when AUTH_URL is unset. */
export const PUBLIC_ORIGIN_DEFAULT = "https://skif.orangecat.ch";

export const OPS_ALERT_COPY: Record<
  OpsAlertKind,
  { subject: (ref: string) => string; headline: string; action: string }
> = {
  BOOKING_NEEDS_ASSIGNING: {
    subject: (ref) => `Skif: booking ${ref} needs a Protector`,
    headline: "A customer has requested a booking that needs a Protector assigned.",
    action: "Assign a Protector",
  },
  INCIDENT_FILED: {
    subject: (ref) => `Skif: incident filed on booking ${ref}`,
    headline: "A Protector has filed an incident report that needs review.",
    action: "Review the incident",
  },
};

export const OPS_ALERT_FOOTER =
  "This alert deliberately carries no names, places or report text. Sign in to Skif to see the details.";
