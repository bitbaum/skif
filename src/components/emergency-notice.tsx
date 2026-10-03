import { EMERGENCY_NUMBERS, NOT_AN_EMERGENCY_SERVICE } from "@/config/emergency";

/** Shown wherever someone might reach for help through Skif (SPEC §24): the
 * public numbers, one tap each, and a plain statement that Skif is not one. */
export function EmergencyNotice({ className = "" }: { className?: string }) {
  return (
    <aside aria-label="In an emergency" className={`rounded-card border border-danger bg-danger-soft p-4 text-sm ${className}`}>
      <p className="font-semibold text-danger">In danger now? Call the emergency services, not Skif.</p>
      <p className="mt-1 text-muted">{NOT_AN_EMERGENCY_SERVICE}</p>
      <ul className="mt-2 flex flex-wrap gap-x-4">
        {EMERGENCY_NUMBERS.map((e) => (
          <li key={e.number}>
            <a href={`tel:${e.number}`} className="inline-flex min-h-11 items-center gap-1 font-medium text-danger underline-offset-4 hover:underline">
              <span className="font-semibold">{e.number}</span> {e.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
