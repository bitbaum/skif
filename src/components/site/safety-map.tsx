import Link from "next/link";
import { HARM_FAMILIES } from "@/config/harm-families";
import { fieldHref, fieldNumber } from "@/site/fields";

/**
 * The ten fields of safety around one person, drawn from the SSOT. Each
 * segment is a link to its field's page. Geometry only lives here; labels,
 * order and paths come from src/config/harm-families.ts.
 *
 * On a phone the outer labels are hidden (they would render under 10px) and
 * the map reads as an emblem; the numbered list beside it names each field.
 */
const INNER = 62;
const OUTER = 148;
const LABEL_R = 166;
const GAP_DEG = 1.6;

const rad = (deg: number) => (deg * Math.PI) / 180;
const at = (r: number, deg: number) => [r * Math.cos(rad(deg)), r * Math.sin(rad(deg))] as const;
const fmt = (n: number) => n.toFixed(2);

function sector(start: number, end: number): string {
  const [x1, y1] = at(OUTER, start);
  const [x2, y2] = at(OUTER, end);
  const [x3, y3] = at(INNER, end);
  const [x4, y4] = at(INNER, start);
  return `M${fmt(x1)} ${fmt(y1)}A${OUTER} ${OUTER} 0 0 1 ${fmt(x2)} ${fmt(y2)}L${fmt(x3)} ${fmt(y3)}A${INNER} ${INNER} 0 0 0 ${fmt(x4)} ${fmt(y4)}Z`;
}

function anchorFor(deg: number): "start" | "middle" | "end" {
  const x = Math.cos(rad(deg));
  return Math.abs(x) < 0.2 ? "middle" : x > 0 ? "start" : "end";
}

export function SafetyMap({ caption }: { caption: string }) {
  const step = 360 / HARM_FAMILIES.length;
  return (
    <figure className="w-full">
      <nav aria-label="The ten fields of safety">
        <svg viewBox="-270 -215 540 430" className="h-auto w-full overflow-visible" role="presentation">
          {Array.from({ length: 72 }, (_, i) => {
            const [x1, y1] = at(OUTER + 6, i * 5);
            const [x2, y2] = at(OUTER + (i % 2 ? 9 : 13), i * 5);
            return <line key={i} x1={fmt(x1)} y1={fmt(y1)} x2={fmt(x2)} y2={fmt(y2)} className="stroke-strong" strokeWidth={1} />;
          })}
          <circle r={INNER - 12} className="fill-none stroke-subtle" strokeDasharray="2 4" />
          {HARM_FAMILIES.map((f, i) => {
            const start = -90 + i * step + GAP_DEG / 2;
            const end = -90 + (i + 1) * step - GAP_DEG / 2;
            const mid = (start + end) / 2;
            const [nx, ny] = at((INNER + OUTER) / 2, mid);
            const [lx, ly] = at(LABEL_R, mid);
            return (
              <Link key={f.key} href={fieldHref(f)} aria-label={`${fieldNumber(f)} ${f.label}`} className="group outline-none">
                <path
                  d={sector(start, end)}
                  className="fill-accent/10 stroke-strong transition-colors group-hover:fill-accent group-focus-visible:fill-accent"
                  strokeWidth={1}
                />
                <text
                  x={fmt(nx)}
                  y={fmt(ny)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-fg-secondary font-mono text-[15px] group-hover:fill-accent-ink group-focus-visible:fill-accent-ink"
                >
                  {fieldNumber(f)}
                </text>
                <text
                  x={fmt(lx)}
                  y={fmt(ly)}
                  textAnchor={anchorFor(mid)}
                  dominantBaseline="central"
                  className="hidden fill-fg-secondary font-sans text-[15px] group-hover:fill-accent sm:inline"
                >
                  {f.short}
                </text>
              </Link>
            );
          })}
          <circle r={INNER - 22} className="fill-accent" />
          <text textAnchor="middle" dominantBaseline="central" className="fill-accent-ink font-heading text-[17px] font-semibold">
            You
          </text>
        </svg>
      </nav>
      <figcaption className="mt-2 text-center font-mono text-xs uppercase tracking-caps text-fg-tertiary">{caption}</figcaption>
    </figure>
  );
}
