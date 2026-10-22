/**
 * Emergency numbers by country, for /emergency. Every row is what an official
 * source states, read on 21 October 2026: for each country the UK
 * government's travel advice ("Emergency services in …", FCDO), for the UK
 * itself the UK government, for Switzerland also the Federal Office of
 * Communications (BAKOM). A number the source does not state is not shown,
 * even where it is widely repeated (Italy's 113, 112 in Liechtenstein).
 *
 * Switzerland's own short list, used in the footer and the app, stays in
 * ./emergency.ts; the Swiss row here agrees with it (emergency-world.test.ts).
 */

/** What an extra number is for; each language words it (src/config/text). */
export type ExtraKind =
  | "european"
  | "poison"
  | "airRescue"
  | "talk"
  | "deaf"
  | "policeToo"
  | "traffic"
  | "touristPolice"
  | "fromMobile"
  | "gendarmerie"
  | "general";

export type ExtraNumber = { number: string; kind: ExtraKind };

export type CountryNumbers = {
  /** ISO 3166-1 alpha-2. */
  code: string;
  name: string;
  police: string;
  ambulance: string;
  fire: string;
  extra?: readonly ExtraNumber[];
  /** A second number that also works ("999 works too"). */
  alsoWorks?: string;
  /** An EU member: 112 reaches the emergency services free of charge. */
  eu?: boolean;
  source: string;
};

const fcdo = (slug: string) => `https://www.gov.uk/foreign-travel-advice/${slug}/getting-help`;

/** The European Commission: "112 is the European emergency phone number,
 * available everywhere in the EU, free of charge." */
export const EU_112_SOURCE = "https://digital-strategy.ec.europa.eu/en/policies/112";

/** Countries whose official source lists one number for everything. */
function one(code: string, name: string, number: string, source: string, more: Pick<CountryNumbers, "eu" | "alsoWorks"> = {}): CountryNumbers {
  return { code, name, police: number, ambulance: number, fire: number, source, ...more };
}

const ROWS: readonly CountryNumbers[] = [
  {
    code: "CH",
    name: "Switzerland",
    police: "117",
    ambulance: "144",
    fire: "118",
    extra: [
      { number: "112", kind: "european" },
      { number: "145", kind: "poison" },
      { number: "1414", kind: "airRescue" },
      { number: "143", kind: "talk" },
    ],
    source: "https://www.bakom.admin.ch/en/other-numbers-free-of-charge-or-not",
  },
  { code: "LI", name: "Liechtenstein", police: "117", ambulance: "144", fire: "118", source: fcdo("liechtenstein") },
  {
    code: "DE",
    name: "Germany",
    police: "110",
    ambulance: "112",
    fire: "112",
    eu: true,
    source: fcdo("germany"),
  },
  {
    code: "AT",
    name: "Austria",
    police: "133",
    ambulance: "144",
    fire: "122",
    extra: [{ number: "112", kind: "european" }],
    eu: true,
    source: fcdo("austria"),
  },
  {
    code: "FR",
    name: "France",
    police: "17",
    ambulance: "15",
    fire: "18",
    extra: [
      { number: "112", kind: "european" },
      { number: "114", kind: "deaf" },
    ],
    eu: true,
    source: fcdo("france"),
  },
  { code: "IT", name: "Italy", police: "112", ambulance: "118", fire: "115", eu: true, source: fcdo("italy") },
  one("ES", "Spain", "112", fcdo("spain"), { eu: true }),
  one("PT", "Portugal", "112", fcdo("portugal"), { eu: true }),
  one("NL", "Netherlands", "112", fcdo("netherlands"), { eu: true }),
  one("BE", "Belgium", "112", fcdo("belgium"), { eu: true }),
  { code: "LU", name: "Luxembourg", police: "113", ambulance: "112", fire: "112", eu: true, source: fcdo("luxembourg") },
  one(
    "GB",
    "United Kingdom",
    "999",
    "https://assets.publishing.service.gov.uk/media/65fbfca4aa9b76dfc3fbda57/public_emergency_call_service_disruption_sunday_25_june_2023_post_incident_review.pdf",
    { alsoWorks: "112" },
  ),
  one("IE", "Ireland", "112", fcdo("ireland"), { eu: true, alsoWorks: "999" }),
  one("DK", "Denmark", "112", fcdo("denmark"), { eu: true }),
  one("SE", "Sweden", "112", fcdo("sweden"), { eu: true }),
  { code: "NO", name: "Norway", police: "112", ambulance: "113", fire: "110", source: fcdo("norway") },
  one("FI", "Finland", "112", fcdo("finland"), { eu: true }),
  { code: "PL", name: "Poland", police: "997", ambulance: "999", fire: "998", eu: true, source: fcdo("poland") },
  one("CZ", "Czechia", "112", fcdo("czechia"), { eu: true }),
  one("HR", "Croatia", "112", fcdo("croatia"), { eu: true }),
  one("GR", "Greece", "112", fcdo("greece"), { eu: true }),
  one("TR", "Türkiye", "112", fcdo("turkey")),
  one("US", "United States", "911", fcdo("usa")),
  one("CA", "Canada", "911", fcdo("canada")),
  one("MX", "Mexico", "911", fcdo("mexico")),
  { code: "BR", name: "Brazil", police: "190", ambulance: "192", fire: "193", extra: [{ number: "911", kind: "policeToo" }], source: fcdo("brazil") },
  one("AU", "Australia", "000", fcdo("australia")),
  one("NZ", "New Zealand", "111", fcdo("new-zealand")),
  { code: "JP", name: "Japan", police: "110", ambulance: "119", fire: "119", source: fcdo("japan") },
  { code: "KR", name: "South Korea", police: "112", ambulance: "119", fire: "119", source: fcdo("south-korea") },
  { code: "CN", name: "China", police: "110", ambulance: "120", fire: "119", extra: [{ number: "122", kind: "traffic" }], source: fcdo("china") },
  one("HK", "Hong Kong", "999", fcdo("hong-kong")),
  { code: "SG", name: "Singapore", police: "999", ambulance: "995", fire: "995", source: fcdo("singapore") },
  { code: "TH", name: "Thailand", police: "191", ambulance: "1669", fire: "199", extra: [{ number: "1155", kind: "touristPolice" }], source: fcdo("thailand") },
  one("IN", "India", "112", fcdo("india")),
  { code: "AE", name: "United Arab Emirates", police: "999", ambulance: "998", fire: "997", source: fcdo("united-arab-emirates") },
  { code: "IL", name: "Israel", police: "100", ambulance: "101", fire: "102", source: fcdo("israel") },
  { code: "EG", name: "Egypt", police: "122", ambulance: "123", fire: "180", extra: [{ number: "126", kind: "touristPolice" }], source: fcdo("egypt") },
  {
    code: "ZA",
    name: "South Africa",
    police: "10111",
    ambulance: "10177",
    fire: "10177",
    extra: [{ number: "112", kind: "fromMobile" }],
    source: fcdo("south-africa"),
  },
  { code: "MA", name: "Morocco", police: "190", ambulance: "150", fire: "150", extra: [{ number: "177", kind: "gendarmerie" }], source: fcdo("morocco") },
  { code: "RS", name: "Serbia", police: "192", ambulance: "194", fire: "193", extra: [{ number: "112", kind: "general" }], source: fcdo("serbia") },
  { code: "AL", name: "Albania", police: "112", ambulance: "127", fire: "128", source: fcdo("albania") },
  { code: "UA", name: "Ukraine", police: "102", ambulance: "103", fire: "101", source: fcdo("ukraine") },
];

export const COUNTRIES: readonly CountryNumbers[] = ROWS;

export function countryByCode(code: string): CountryNumbers | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

/** IANA time zones of the listed countries. A phone reports its zone without
 * asking for its location, which is enough for a first guess. */
const ZONES: Record<string, string> = {
  "Europe/Zurich": "CH",
  "Europe/Vaduz": "LI",
  "Europe/Berlin": "DE",
  "Europe/Busingen": "DE",
  "Europe/Vienna": "AT",
  "Europe/Paris": "FR",
  "Europe/Rome": "IT",
  "Europe/Madrid": "ES",
  "Atlantic/Canary": "ES",
  "Africa/Ceuta": "ES",
  "Europe/Lisbon": "PT",
  "Atlantic/Madeira": "PT",
  "Atlantic/Azores": "PT",
  "Europe/Amsterdam": "NL",
  "Europe/Brussels": "BE",
  "Europe/Luxembourg": "LU",
  "Europe/London": "GB",
  "Europe/Belfast": "GB",
  "Europe/Dublin": "IE",
  "Europe/Copenhagen": "DK",
  "Europe/Stockholm": "SE",
  "Europe/Oslo": "NO",
  "Europe/Helsinki": "FI",
  "Europe/Warsaw": "PL",
  "Europe/Prague": "CZ",
  "Europe/Zagreb": "HR",
  "Europe/Athens": "GR",
  "Europe/Istanbul": "TR",
  "Asia/Istanbul": "TR",
  "America/Mexico_City": "MX",
  "America/Cancun": "MX",
  "America/Merida": "MX",
  "America/Monterrey": "MX",
  "America/Tijuana": "MX",
  "America/Chihuahua": "MX",
  "America/Mazatlan": "MX",
  "America/Hermosillo": "MX",
  "America/Sao_Paulo": "BR",
  "America/Manaus": "BR",
  "America/Recife": "BR",
  "America/Fortaleza": "BR",
  "America/Bahia": "BR",
  "America/Belem": "BR",
  "Pacific/Auckland": "NZ",
  "Asia/Tokyo": "JP",
  "Asia/Seoul": "KR",
  "Asia/Shanghai": "CN",
  "Asia/Urumqi": "CN",
  "Asia/Hong_Kong": "HK",
  "Asia/Singapore": "SG",
  "Asia/Bangkok": "TH",
  "Asia/Kolkata": "IN",
  "Asia/Calcutta": "IN",
  "Asia/Dubai": "AE",
  "Asia/Jerusalem": "IL",
  "Asia/Tel_Aviv": "IL",
  "Africa/Cairo": "EG",
  "Africa/Johannesburg": "ZA",
  "Africa/Casablanca": "MA",
  "Europe/Belgrade": "RS",
  "Europe/Tirane": "AL",
  "Europe/Kyiv": "UA",
  "Europe/Kiev": "UA",
};

const US_ZONES = /^(America\/(New_York|Chicago|Denver|Los_Angeles|Phoenix|Anchorage|Detroit|Boise|Juneau|Sitka|Nome|Adak|Menominee|Indiana\/.+|Kentucky\/.+|North_Dakota\/.+)|Pacific\/Honolulu)$/;
const CA_ZONES = /^America\/(Toronto|Vancouver|Edmonton|Winnipeg|Halifax|St_Johns|Regina|Montreal|Moncton|Whitehorse|Yellowknife|Iqaluit|Glace_Bay|Goose_Bay|Swift_Current|Dawson_Creek|Fort_Nelson|Creston|Dawson|Rankin_Inlet|Resolute|Cambridge_Bay|Inuvik|Atikokan|Blanc-Sablon)$/;

export function countryForTimeZone(zone: string): string | undefined {
  if (ZONES[zone]) return ZONES[zone];
  if (zone.startsWith("Australia/")) return "AU";
  if (US_ZONES.test(zone)) return "US";
  if (CA_ZONES.test(zone)) return "CA";
  return undefined;
}
