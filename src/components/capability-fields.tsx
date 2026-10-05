"use client";

import { useState } from "react";
import {
  CAPABILITIES,
  CAPABILITY_CATEGORIES,
  CAPABILITY_LEVELS,
  CAPABILITY_LIMITS,
  verificationLabel,
} from "@/config/capabilities";
import { capabilityField } from "@/domain/inputs";
import type { ProtectorCapability } from "@/server/protectors";
import { Badge, segmentClass } from "./ui";

const inputClass = "min-h-11 w-full rounded-lg border border-line bg-surface px-3 py-2 text-base";
const chipClass =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm has-checked:border-accent has-checked:bg-accent-soft has-checked:font-medium has-checked:text-accent has-focus-visible:ring-2 has-focus-visible:ring-accent";

/** The form's live values, owned by the parent (the AI-assisted application),
 * so a level the assistant fills in opens its row here too. */
export type CapabilityBinding = {
  value: (name: string) => string;
  set: (name: string, value: string) => void;
};

/**
 * Pick what you can show, then say how well. Each capability is a chip; only a
 * ticked one opens its level, evidence and (where it applies) certificate, so
 * the form is as long as what the person holds. A capability counts as held
 * when its level is set — the parser (src/domain/inputs.ts) ignores the rest —
 * so unticking clears the level, and a ticked row cannot be sent without one.
 */
export function CapabilityFields({ held, bind }: { held: readonly ProtectorCapability[]; bind: CapabilityBinding }) {
  const level = (key: string) => bind.value(capabilityField(key, "level"));
  const [picked, setPicked] = useState<ReadonlySet<string>>(() => new Set());
  const ticked = (key: string) => picked.has(key) || level(key) !== "";
  const toggle = (key: string, on: boolean) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (on) next.add(key);
      else next.delete(key);
      return next;
    });
    if (!on) bind.set(capabilityField(key, "level"), "");
  };

  return (
    <fieldset className="space-y-5">
      <legend className="text-sm font-medium">What you can show</legend>
      <p className="text-sm text-muted">
        Tick only what you can show. Operations verifies each one; a changed entry needs verifying again.
      </p>
      {CAPABILITY_CATEGORIES.map((cat) => {
        const inCategory = CAPABILITIES.filter((c) => c.category === cat.key);
        return (
          <div key={cat.key} className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{cat.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {inCategory.map((c) => (
                <li key={c.key}>
                  <label className={chipClass}>
                    <input
                      type="checkbox"
                      checked={ticked(c.key)}
                      onChange={(e) => toggle(c.key, e.target.checked)}
                      className="sr-only"
                    />
                    {c.label}
                  </label>
                </li>
              ))}
            </ul>
            {inCategory
              .filter((c) => ticked(c.key))
              .map((c) => {
                const row = held.find((h) => h.capability === c.key);
                const levelName = capabilityField(c.key, "level");
                const evidenceName = capabilityField(c.key, "evidence");
                return (
                  <fieldset key={c.key} className="space-y-3 rounded-lg border border-line p-3">
                    <legend className="flex flex-wrap items-center gap-2 px-1 text-sm font-medium">
                      {c.label}
                      {row && (
                        <Badge tone={row.verification === "VERIFIED" ? "accent" : row.verification === "REJECTED" ? "danger" : "neutral"}>
                          {verificationLabel(row.verification)}
                        </Badge>
                      )}
                    </legend>
                    <div role="radiogroup" aria-label={`${c.label} level`} className="grid grid-cols-3 gap-2">
                      {CAPABILITY_LEVELS.map((l) => (
                        <label key={l.key} className={segmentClass}>
                          <input
                            type="radio"
                            name={levelName}
                            value={l.key}
                            checked={level(c.key) === l.key}
                            onChange={() => bind.set(levelName, l.key)}
                            required
                            className="sr-only"
                          />
                          {l.label}
                        </label>
                      ))}
                    </div>
                    <input
                      name={evidenceName}
                      value={bind.value(evidenceName)}
                      onChange={(e) => bind.set(evidenceName, e.target.value)}
                      maxLength={CAPABILITY_LIMITS.evidenceMax}
                      placeholder="Where you gained it"
                      aria-label={`${c.label}: where you gained it`}
                      className={inputClass}
                    />
                    {c.certified && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          name={capabilityField(c.key, "certification")}
                          defaultValue={row?.certification ?? ""}
                          maxLength={CAPABILITY_LIMITS.certificationMax}
                          placeholder="Certificate or licence"
                          aria-label={`${c.label} certificate`}
                          className={inputClass}
                        />
                        <label className="text-sm text-muted">
                          Valid until
                          <input
                            type="date"
                            name={capabilityField(c.key, "expiresOn")}
                            defaultValue={row?.expiresOn ?? ""}
                            className={`${inputClass} mt-1`}
                          />
                        </label>
                      </div>
                    )}
                  </fieldset>
                );
              })}
          </div>
        );
      })}
    </fieldset>
  );
}
