import { capabilityLabel, type CapabilityKey } from "@/config/capabilities";
import { constraintLabel, languageLabel, PRESENCE_STYLES, type HardConstraintKey } from "@/config/constraints";
import { ratingLabel, RATING_DIMENSIONS } from "@/config/ratings";
import { STATUS_LABELS, type BookingAction, type BookingStatus } from "@/domain/lifecycle";
import { REVIEW_LABELS } from "@/domain/incidents";
import { requirementsFor, type MatchReason } from "@/domain/matching";
import { observationLabel, severityLabel } from "@/config/reports";
import type { ServiceKey } from "@/config/services";
import type { BookingEvent, Rating, Report } from "@/server/bookings";
import { Badge, Empty, formatWhen, type Tone } from "./ui";

const STATUS_TONES: Record<BookingStatus, Tone> = {
  REQUESTED: "warn",
  ASSIGNED: "warn",
  ACCEPTED: "accent",
  CHECKED_IN: "accent",
  IN_PROGRESS: "accent",
  COMPLETED: "neutral",
  CANCELLED: "danger",
  EXPIRED: "danger",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return <Badge tone={STATUS_TONES[status]}>{STATUS_LABELS[status]}</Badge>;
}

const ACTION_LABELS: Record<BookingAction | "REQUEST", string> = {
  REQUEST: "Requested",
  ASSIGN: "Protector assigned by Operations",
  ACCEPT: "Accepted by the Protector",
  DECLINE: "Declined by the Protector — back to Operations",
  UNASSIGN: "Protector taken off the job by Operations",
  CHECK_IN: "Protector checked in at the meeting point",
  START: "Started",
  COMPLETE: "Completed",
  CANCEL: "Cancelled",
  EXPIRE: "Expired: the start time passed before anyone accepted",
};

/** `showNotes` reveals Operations' override notes — pass it on Ops pages only. */
export function Timeline({ events, showNotes = false }: { events: BookingEvent[]; showNotes?: boolean }) {
  return (
    <ol className="space-y-3 border-l border-line pl-4">
      {events.map((e) => (
        <li key={e.id} className="text-sm">
          <p className="font-medium">{ACTION_LABELS[e.action as keyof typeof ACTION_LABELS] ?? e.action}</p>
          <p className="text-muted">
            {formatWhen(e.at)} · by {e.actorRole.toLowerCase()}
          </p>
          {showNotes && e.note && <p className="text-warn">Override: {e.note}</p>}
        </li>
      ))}
    </ol>
  );
}

export function ConstraintList({ constraints }: { constraints: readonly HardConstraintKey[] }) {
  if (constraints.length === 0) return <span className="text-muted">None set</span>;
  return (
    <span className="flex flex-wrap gap-1">
      {constraints.map((c) => (
        <Badge key={c} tone="accent">
          {constraintLabel(c)}
        </Badge>
      ))}
    </span>
  );
}

export function languagesText(languages: readonly string[]): string {
  return languages.length ? languages.map(languageLabel).join(", ") : "No preference";
}

export function presenceText(style: string): string {
  return PRESENCE_STYLES.find((p) => p.key === style)?.label ?? style;
}

export function RatingSummary({ rating }: { rating: Rating | null }) {
  if (!rating) return <Empty>Not rated yet.</Empty>;
  return (
    <div className="space-y-2 text-sm">
      {RATING_DIMENSIONS.map((d) => {
        const value = rating[d.key];
        return value === null ? null : (
          <p key={d.key}>
            <span className="text-muted">{d.question}</span> <strong>{ratingLabel(value)}</strong>
          </p>
        );
      })}
      {rating.comment && <p className="italic">“{rating.comment}”</p>}
    </div>
  );
}

/** `showReview` adds Operations' review status and note — Ops pages only. */
export function ReportList({ reports, showReview = false }: { reports: Report[]; showReview?: boolean }) {
  if (reports.length === 0) return <Empty>No reports filed.</Empty>;
  return (
    <ul className="space-y-3">
      {reports.map((r) => (
        <li key={r.id} className="rounded-lg border border-line p-3 text-sm">
          <p className="mb-1 flex flex-wrap items-center gap-2">
            <Badge tone={r.kind === "INCIDENT" ? "danger" : "neutral"}>
              {r.kind === "INCIDENT" ? "Incident" : "Report"}
            </Badge>
            <span className="text-muted">{formatWhen(r.createdAt)}</span>
            {r.severity && <Badge tone={r.severity === "HIGH" ? "danger" : "warn"}>{severityLabel(r.severity)}</Badge>}
            {r.policeInvolved && <Badge tone="warn">Police involved</Badge>}
            {showReview && r.review && <Badge tone={r.review === "RESOLVED" ? "accent" : "warn"}>{REVIEW_LABELS[r.review]}</Badge>}
          </p>
          {r.observations.length > 0 && (
            <p className="mb-1 text-muted">{r.observations.map(observationLabel).join(" · ")}</p>
          )}
          <p className="whitespace-pre-wrap">{r.summary}</p>
          {showReview && r.reviewNote && <p className="mt-1 text-muted">Ops note: {r.reviewNote}</p>}
        </li>
      ))}
    </ul>
  );
}

/** The service's own requirements plus the customer's must-haves. */
export function RequirementList({ service, extra }: { service: ServiceKey; extra: readonly CapabilityKey[] }) {
  const all = requirementsFor(service, extra);
  if (all.length === 0) return <span className="text-muted">None beyond the service</span>;
  return (
    <span className="flex flex-wrap gap-1">
      {all.map((k) => (
        <Badge key={k}>{capabilityLabel(k)}</Badge>
      ))}
    </span>
  );
}

export function ReasonList({ reasons }: { reasons: readonly MatchReason[] }) {
  return (
    <ul className="space-y-0.5 text-sm">
      {reasons.map((reason) => (
        <li key={reason.label} className="flex justify-between gap-4">
          <span>{reason.label}</span>
          <span className="tabular-nums text-muted">
            {reason.points > 0 ? "+" : ""}
            {reason.points}
          </span>
        </li>
      ))}
    </ul>
  );
}
