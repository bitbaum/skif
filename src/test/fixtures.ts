/** Shared fixtures for server tests: a realistic Protector, a customer with
 * preferences, and a booking — each overridable per test. */
import type { Db } from "@/db/types";
import { windowFromClock } from "@/domain/availability";
import type { BookingInput, PreferencesInput, ProtectorApplication, RatingInput, ReportInput } from "@/domain/inputs";
import { saveAvailability } from "@/server/availability";
import { createBooking } from "@/server/bookings";
import { savePreferences } from "@/server/preferences";
import { applyAsProtector, setProtectorStatus } from "@/server/protectors";

export const OPS = { role: "OPS", sub: "oc-ops" } as const;

export const application: ProtectorApplication = {
  displayName: "Mira",
  bio: "Ten years of nightlife de-escalation.",
  languages: ["de", "en"],
  experienceYears: 10,
  capabilities: [
    { key: "DE_ESCALATION", level: "ADVANCED", certification: "", evidence: "Club work", expiresOn: null },
    { key: "FIRST_AID", level: "PROFICIENT", certification: "SRK", evidence: "", expiresOn: "2030-01-01" },
  ],
  services: ["NIGHT_OUT", "GET_HOME"],
  presenceStyles: ["DISCREET"],
};

export const ALWAYS = [1, 2, 3, 4, 5, 6, 7].map((weekday) => windowFromClock(weekday, 0, 0));

export const tomorrow = () => new Date(Date.now() + 24 * 60 * 60 * 1000);

/** Applied, approved and available all week. */
export async function approvedProtector(db: Db, sub: string, overrides: Partial<ProtectorApplication> = {}) {
  const p = await applyAsProtector(db, sub, { ...application, ...overrides });
  await setProtectorStatus(db, p.id, "APPROVED");
  await saveAvailability(db, p.id, ALWAYS);
  return p;
}

export async function customerWithPreferences(db: Db, sub: string, overrides: Partial<PreferencesInput> = {}) {
  await savePreferences(db, sub, {
    hardConstraints: [],
    presenceStyle: "DISCREET",
    languages: ["de"],
    valuesNote: "",
    ...overrides,
  });
}

export async function book(db: Db, customerSub: string, overrides: Partial<BookingInput> = {}) {
  const r = await createBooking(db, customerSub, {
    service: "NIGHT_OUT",
    startsAt: tomorrow(),
    hours: 3,
    area: "Kreis 4",
    meetingPoint: "Langstrasse 100",
    notes: "",
    requiredCapabilities: [],
    ...overrides,
  });
  if (!r.success) throw new Error(r.error);
  return r.data;
}

export const rating = (overrides: Partial<RatingInput> = {}): RatingInput => ({
  respect: 5,
  discretion: 5,
  feltSafe: 5,
  professionalism: 5,
  communication: 5,
  punctuality: 5,
  judgment: null,
  comment: "",
  ...overrides,
});

export const report = (overrides: Partial<ReportInput> = {}): ReportInput => ({
  kind: "REPORT",
  summary: "Quiet night.",
  policeInvolved: false,
  observations: ["NOTHING_NOTABLE"],
  severity: null,
  ...overrides,
});
