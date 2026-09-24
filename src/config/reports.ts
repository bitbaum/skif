/**
 * What a Protector records after a job (SPEC §6, §10, §29). Structured so
 * outcomes can be counted — how often de-escalation worked, how often force
 * or medical help was needed — without reading every narrative.
 */
export const OBSERVATIONS = [
  { key: "NOTHING_NOTABLE", label: "Nothing notable happened" },
  { key: "VERBAL_DEESCALATION", label: "Defused a situation by talking" },
  { key: "AVOIDED_BY_MOVING", label: "Avoided trouble by changing route or place" },
  { key: "PHYSICAL_INTERVENTION", label: "Physical intervention was needed" },
  { key: "MEDICAL_ASSISTANCE", label: "Gave first aid or medical help" },
  { key: "EMERGENCY_SERVICES", label: "Called emergency services" },
] as const;

export type ObservationKey = (typeof OBSERVATIONS)[number]["key"];
export const OBSERVATION_KEYS = OBSERVATIONS.map((o) => o.key) as [ObservationKey, ...ObservationKey[]];

export function observationLabel(key: string): string {
  return OBSERVATIONS.find((o) => o.key === key)?.label ?? key;
}

export const INCIDENT_SEVERITIES = [
  { key: "LOW", label: "Low — noted, no harm" },
  { key: "MEDIUM", label: "Medium — someone was at risk" },
  { key: "HIGH", label: "High — harm, force or emergency services" },
] as const;

export type IncidentSeverity = (typeof INCIDENT_SEVERITIES)[number]["key"];
export const INCIDENT_SEVERITY_KEYS = INCIDENT_SEVERITIES.map((s) => s.key) as [
  IncidentSeverity,
  ...IncidentSeverity[],
];

export function severityLabel(key: string): string {
  return INCIDENT_SEVERITIES.find((s) => s.key === key)?.label ?? key;
}

export const REVIEW_NOTE_MAX = 1000;
