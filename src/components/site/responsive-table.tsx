import type { SiteSection } from "@bitbaum/sitekit";
import { Blurb } from "@bitbaum/sitekit/react";
import { LABEL } from "./shell";

type Table = Extract<SiteSection, { kind: "table" }>;

/**
 * sitekit's table data, drawn so it survives a phone. sitekit renders a
 * fixed-layout table with a 560px minimum inside a sideways scroller; with
 * five or six columns on a 390px screen that left one word per line and a
 * last column cut in half. Here a phone gets one card per row (the first
 * cell as its title, the rest as labelled lines) and a wide screen keeps the
 * aligned table. Same data, same validation, different drawing.
 */
export function ResponsiveTable({ section }: { section: Table }) {
  const [head, ...rest] = section.columns;
  const mono = new Set(section.monoColumns ?? []);
  return (
    <section id={section.anchor} className="scroll-mt-24">
      {section.heading && <h3 className="font-heading text-xl font-semibold tracking-display text-fg-primary">{section.heading}</h3>}
      {section.blurb && <Blurb>{section.blurb}</Blurb>}

      <ul className="mt-5 space-y-3 md:hidden">
        {section.rows.map((row, r) => (
          <li key={r} className="rounded-card border border-subtle bg-surface-raised p-4">
            <p className="font-medium text-fg-primary">{row[0]}</p>
            <dl className="mt-3 space-y-2">
              {rest.map((col, c) => (
                <div key={col} className="grid grid-cols-[7rem_1fr] gap-3 text-sm">
                  <dt className={LABEL}>{col}</dt>
                  <dd className={mono.has(c + 1) ? "font-mono text-xs text-fg-secondary" : "text-fg-secondary"}>{row[c + 1]}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      <div className="mt-5 hidden md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-strong">
              {[head, ...rest].map((col) => (
                <th key={col} scope="col" className={`py-2.5 pr-4 ${LABEL}`}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {section.rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    className={`py-3 pr-4 align-top leading-relaxed ${c === 0 ? "font-medium text-fg-primary" : mono.has(c) ? "font-mono text-xs text-fg-secondary" : "text-fg-secondary"}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {section.note && <p className="mt-3 max-w-prose text-xs leading-relaxed text-fg-tertiary">{section.note}</p>}
    </section>
  );
}
