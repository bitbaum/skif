/** A 0–3 cost shown as three marks, filled one per point, the way the Method page defines it: how
 * much a step asks of your privacy or your freedom. Text is always beside
 * it, so the marks are never the only carrier of meaning. */
export function Meter({ label, value, of = 3 }: { label: string; value: number; of?: number }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="text-xs text-fg-tertiary">{label}</span>
      <span aria-hidden className="inline-flex gap-0.5">
        {Array.from({ length: of }, (_, i) => (
          <span key={i} className={`h-2.5 w-1.5 rounded-sm ${i < value ? "bg-fg-primary" : "bg-strong"}`} />
        ))}
      </span>
      <span className="font-mono text-xs tabular-nums text-fg-secondary">
        {value}/{of}
      </span>
    </span>
  );
}
