/**
 * How an intervention sits against a person's trade-off leans (SPEC §3).
 * Explainable by construction: the result is the named leans it fits and the
 * named leans it goes against — never a hidden weight.
 */
import { PREFERENCE_AXES, type AxisLeans, type PresenceStyle } from "@/config/constraints";
import type { Intervention, Leans } from "@/config/interventions";

const DISCRETION_POLES = { left: "discretion", right: "visible deterrence" } as const;

function poleName(axis: keyof Leans, side: -1 | 1): string {
  const poles = axis === "DISCRETION" ? DISCRETION_POLES : PREFERENCE_AXES.find((a) => a.key === axis)!;
  return (side < 0 ? poles.left : poles.right).toLowerCase();
}

export type Fit = { with: string[]; against: string[] };

export function preferenceFit(i: Intervention, leans: Leans): Fit {
  const fit: Fit = { with: [], against: [] };
  for (const [axis, lean] of Object.entries(leans) as [keyof Leans, -1 | 1 | 0][]) {
    const side = i.leans[axis];
    if (!lean || !side) continue;
    (side === lean ? fit.with : fit.against).push(poleName(axis, lean));
  }
  return fit;
}

/** The profile's axes plus its presence style, as one set of leans. */
export function leansOf(axes: AxisLeans, presence: PresenceStyle): Leans {
  const leans: Leans = { DISCRETION: presence === "DISCREET" ? -1 : 1 };
  for (const [axis, lean] of Object.entries(axes)) {
    if (lean) leans[axis as keyof AxisLeans] = lean;
  }
  return leans;
}

const DISPLAY_ORDER: (keyof Leans)[] = [...PREFERENCE_AXES.map((a) => a.key), "DISCRETION"];

/** "privacy", "community solutions"… — the leans, named, in the order the
 * preferences page asks them (stored jsonb does not keep key order). */
export function describeLeans(leans: Leans): string[] {
  return DISPLAY_ORDER.flatMap((axis) => {
    const lean = leans[axis];
    return lean ? [poleName(axis, lean)] : [];
  });
}
