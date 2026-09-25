import {
  CAPABILITIES,
  CAPABILITY_CATEGORIES,
  CAPABILITY_LEVELS,
  CAPABILITY_LIMITS,
  verificationLabel,
} from "@/config/capabilities";
import { capabilityField } from "@/domain/inputs";
import type { ProtectorCapability } from "@/server/protectors";
import { Badge } from "./ui";

const inputClass = "w-full rounded-lg border border-line bg-surface px-2 py-1.5 text-sm";

/** Live values for a row's level and evidence, when a parent owns the form's
 * state (the AI-assisted application form). Certificate and expiry stay
 * plain inputs either way: nothing but the person types those. */
export type CapabilityBinding = {
  value: (name: string) => string;
  set: (name: string, value: string) => void;
};

/** One row per capability, grouped by category. A row left at "—" is not held. */
export function CapabilityFields({ held, bind }: { held: readonly ProtectorCapability[]; bind?: CapabilityBinding }) {
  const bound = (name: string, fallback: string) =>
    bind
      ? {
          value: bind.value(name),
          onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => bind.set(name, e.target.value),
        }
      : { defaultValue: fallback };
  return (
    <fieldset className="space-y-5">
      <legend className="text-sm font-medium">Capabilities</legend>
      <p className="text-sm text-muted">
        Declare only what you can show. Operations verifies each one; a changed entry needs verifying again.
      </p>
      {CAPABILITY_CATEGORIES.map((cat) => (
        <div key={cat.key} className="space-y-2">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">{cat.label}</h3>
          {CAPABILITIES.filter((c) => c.category === cat.key).map((c) => {
            const row = held.find((h) => h.capability === c.key);
            return (
              <div
                key={c.key}
                className="grid gap-2 rounded-lg border border-line p-3 sm:grid-cols-[10rem_7rem_1fr] sm:items-start"
              >
                <div className="text-sm">
                  {c.label}
                  {row && (
                    <span className="mt-1 block">
                      <Badge tone={row.verification === "VERIFIED" ? "accent" : row.verification === "REJECTED" ? "danger" : "neutral"}>
                        {verificationLabel(row.verification)}
                      </Badge>
                    </span>
                  )}
                </div>
                <select
                  name={capabilityField(c.key, "level")}
                  {...bound(capabilityField(c.key, "level"), row?.level ?? "")}
                  aria-label={`${c.label} level`}
                  className={inputClass}
                >
                  <option value="">—</option>
                  {CAPABILITY_LEVELS.map((l) => (
                    <option key={l.key} value={l.key}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    name={capabilityField(c.key, "evidence")}
                    {...bound(capabilityField(c.key, "evidence"), row?.evidence ?? "")}
                    maxLength={CAPABILITY_LIMITS.evidenceMax}
                    placeholder="Where you gained it"
                    aria-label={`${c.label} evidence`}
                    className={inputClass}
                  />
                  {c.certified && (
                    <>
                      <input
                        name={capabilityField(c.key, "certification")}
                        defaultValue={row?.certification ?? ""}
                        maxLength={CAPABILITY_LIMITS.certificationMax}
                        placeholder="Certificate or licence"
                        aria-label={`${c.label} certificate`}
                        className={inputClass}
                      />
                      <label className="text-sm text-muted sm:col-span-2">
                        Valid until{" "}
                        <input
                          type="date"
                          name={capabilityField(c.key, "expiresOn")}
                          defaultValue={row?.expiresOn ?? ""}
                          className={`${inputClass} mt-1`}
                        />
                      </label>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </fieldset>
  );
}
