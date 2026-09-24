/**
 * What gets audited (SPEC §14 "sensitive administrative access should be
 * auditable"). Views are recorded as well as changes: reading someone's
 * meeting point or complaint is itself sensitive.
 */
export const AUDIT_ACTIONS = [
  "VIEW_BOOKING",
  "VIEW_COMPLAINT",
  "VIEW_PROTECTOR",
  "CHANGE_PROTECTOR_STATUS",
  "ASSESS_CAPABILITY",
  "OVERRIDE_MATCH",
] as const;
export type AuditAction = (typeof AUDIT_ACTIONS)[number];

export const AUDIT_SUBJECTS = ["BOOKING", "COMPLAINT", "PROTECTOR", "CAPABILITY"] as const;
export type AuditSubject = (typeof AUDIT_SUBJECTS)[number];

export const AUDIT_LABELS: Record<AuditAction, string> = {
  VIEW_BOOKING: "Opened a booking",
  VIEW_COMPLAINT: "Opened a complaint",
  VIEW_PROTECTOR: "Opened a Protector's profile",
  CHANGE_PROTECTOR_STATUS: "Changed a Protector's status",
  ASSESS_CAPABILITY: "Verified or rejected a capability",
  OVERRIDE_MATCH: "Assigned a Protector the matcher excluded",
};

/** How many entries the Operations audit page shows. */
export const AUDIT_PAGE_SIZE = 200;
