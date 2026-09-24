import { capabilityLabel, type CapabilityKey } from "@/config/capabilities";
import { constraintLabel, languageLabel, PRESENCE_STYLES, type HardConstraintKey } from "@/config/constraints";
import { ratingLabel, RATING_DIMENSIONS } from "@/config/ratings";
import { STATUS_LABELS, type BookingStatus } from "@/domain/lifecycle";
import { requirementsFor, type MatchReason } from "@/domain/matching";
import type { ServiceKey } from "@/config/services";
import type { BookingEvent, Rating, Report } from "@/server/bookings";
import { Badge, Empty, formatWhen, type Tone } from "./ui";

const STATUS_TONES: Record<BookingStatus, Tone> = {
  REQUESTED: "warn",
  ASSIGNED: "warn",
  ACCEPTED: "accent",
  IN_PROGRESS: "accent",
  COMPLETED: "neutral",
  CANCELLED: "danger",
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  return <Badge tone={STATUS_TONES[status]}>{STATUS_LABELS[status]}</Badge>;
}

const ACTION_LABELS: Record<string, string> = {
  REQUEST: "Requested",
  ASSIGN: "Protector assigned by Operations",
  ACCEPT: "Accepted by the Protector",
  DECLINE: "Declined by the Protector — back to Operations",
  START: "Started",
  COMPLETE: "Completed",
  CANCEL: "Cancelled",
};

/** `showNotes` reveals Operations' override notes — pass it on Ops pages only. */
export function Timeline({ events, showNotes = false }: { events: BookingEvent[]; showNotes?: boolean }) {
  return (
    <ol className="space-y-3 border-l border-line pl-4">
      {events.map((e) => (
        <li key={e.id} className="text-sm">
          <p className="font-medium">{ACTION_LABELS[e.action] ?? e.action}</p>
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
      {RATING_DIMENSIONS.map((d) => (
        <p key={d.key}>
          <span className="text-muted">{d.question}</span> <strong>{ratingLabel(rating[d.key])}</strong>
        </p>
      ))}
      {rating.comment && <p className="italic">“{rating.comment}”</p>}
    </div>
  );
}

export function ReportList({ reports }: { reports: Report[] }) {
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
            {r.policeInvolved && <Badge tone="warn">Police involved</Badge>}
          </p>
          <p className="whitespace-pre-wrap">{r.summary}</p>
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
