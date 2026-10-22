"use client";

import { Check, Copy, MapPin, MessageSquareText, Phone, Route, Share2 } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { COUNTRIES, countryByCode, countryForTimeZone, type CountryNumbers } from "@/config/emergency-world";
import { locationMessage, planMessage, smsLink, type Plan, type Position } from "@/lib/share-text";
import { ACTION, LABEL } from "./shell";

/**
 * The emergency page's three jobs, in the order they are needed: call the
 * right number for where you are, send someone your location, and leave
 * someone your plan. Everything is built on this device and handed to the
 * phone's own share sheet or SMS app; nothing is sent to Skif.
 */
export function EmergencyPanel() {
  const guessed = useSyncExternalStore(subscribeNothing, guessCountry, () => "CH");
  const [chosen, setChosen] = useState<string | null>(null);
  const country = countryByCode(chosen ?? guessed) ?? countryByCode("CH")!;

  return (
    <div className="space-y-10">
      <CallNow country={country} guessed={!chosen && guessed === country.code} onChoose={setChosen} />
      <ShareLocation />
      <SharePlan />
    </div>
  );
}

function subscribeNothing() {
  return () => {};
}

/** The phone's own time zone says where it is set to be, without asking for
 * its location: a guess the person can correct in one tap. */
function guessCountry(): string {
  return countryForTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone) ?? "CH";
}

function CallNow({ country, guessed, onChoose }: { country: CountryNumbers; guessed: boolean; onChoose: (code: string) => void }) {
  const lines =
    country.police === country.ambulance && country.ambulance === country.fire
      ? [{ label: "Police, ambulance, fire", number: country.police }]
      : [
          { label: "Police", number: country.police },
          { label: "Ambulance", number: country.ambulance },
          { label: "Fire", number: country.fire },
        ];
  return (
    <section aria-labelledby="call-title" className="rounded-card border-2 border-danger p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className={LABEL}>{guessed ? "From your phone's time zone" : "Chosen"}</p>
          <h2 id="call-title" className="mt-1 font-heading text-2xl font-semibold tracking-display text-fg-primary">
            Call in {country.name}
          </h2>
        </div>
        <label className="flex flex-col gap-1 text-sm text-fg-secondary">
          Somewhere else?
          <select
            value={country.code}
            onChange={(e) => onChoose(e.target.value)}
            className="min-h-11 rounded-lg border border-subtle bg-surface-page px-3 text-fg-primary"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <ul className={`mt-6 grid gap-3 ${lines.length === 3 ? "sm:grid-cols-3" : ""}`}>
        {lines.map((l) => (
          <li key={l.label}>
            <a
              href={`tel:${l.number}`}
              className="flex min-h-16 items-center justify-between gap-3 rounded-card bg-danger px-5 py-3 text-surface-page hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-danger"
            >
              <span className="font-medium">{l.label}</span>
              <span className="inline-flex items-center gap-2 font-heading text-2xl font-semibold tabular-nums">
                <Phone aria-hidden className="size-5" />
                {l.number}
              </span>
            </a>
          </li>
        ))}
      </ul>
      {country.extra && country.extra.length > 0 ? (
        <ul className="mt-4 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
          {country.extra.map((x) => (
            <li key={x.number}>
              <a href={`tel:${x.number}`} className="inline-flex min-h-11 items-center gap-2 text-fg-primary underline-offset-4 hover:underline">
                <span className="font-semibold tabular-nums">{x.number}</span>
                <span className="text-fg-secondary">{x.label}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-4 text-sm text-fg-tertiary">
        {country.note ? (
          <>
            {country.note}
            {country.noteSource ? (
              <>
                {" "}
                <a href={country.noteSource} rel="noopener noreferrer" className="underline underline-offset-4">
                  European Commission
                </a>
                .
              </>
            ) : null}{" "}
          </>
        ) : null}
        Skif is not an emergency service: call these, not Skif. Numbers from{" "}
        <a href={country.source} rel="noopener noreferrer" className="underline underline-offset-4">
          an official source
        </a>
        , checked 21 October 2026.
      </p>
    </section>
  );
}

/** Share sheet where the phone has one, SMS and Copy everywhere. */
function SendActions({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const canShare = useSyncExternalStore(subscribeNothing, () => typeof navigator.share === "function", () => false);
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
      {canShare ? (
        <button type="button" className={`${ACTION.primary} col-span-2 gap-2`} onClick={() => navigator.share({ text }).catch(() => {})}>
          <Share2 aria-hidden className="size-4" /> Send
        </button>
      ) : null}
      <a href={smsLink(text)} className={`${ACTION.secondary} gap-2`}>
        <MessageSquareText aria-hidden className="size-4" /> SMS
      </a>
      <button
        type="button"
        className={`${ACTION.secondary} gap-2`}
        onClick={() =>
          navigator.clipboard.writeText(text).then(
            () => setCopied(true),
            () => setCopied(false),
          )
        }
      >
        {copied ? <Check aria-hidden className="size-4" /> : <Copy aria-hidden className="size-4" />} {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

type Fix = { state: "idle" | "asking" | "denied" | "unavailable" } | { state: "found"; position: Position; at: Date };

function ShareLocation() {
  const [fix, setFix] = useState<Fix>({ state: "idle" });
  const ask = () => {
    if (!("geolocation" in navigator)) return setFix({ state: "unavailable" });
    setFix({ state: "asking" });
    navigator.geolocation.getCurrentPosition(
      (p) => setFix({ state: "found", position: { latitude: p.coords.latitude, longitude: p.coords.longitude, accuracy: p.coords.accuracy }, at: new Date() }),
      (e) => setFix({ state: e.code === e.PERMISSION_DENIED ? "denied" : "unavailable" }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 },
    );
  };
  return (
    <section aria-labelledby="where-title" className="rounded-card border border-subtle p-5 sm:p-8">
      <h2 id="where-title" className="flex items-center gap-2 font-heading text-2xl font-semibold tracking-display text-fg-primary">
        <MapPin aria-hidden className="size-6 text-fg-tertiary" /> Send someone where you are
      </h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-fg-secondary">
        Your phone finds you and writes a message with a map link. You choose who gets it. Skif never sees where you are.
      </p>
      {fix.state === "found" ? (
        <>
          <p className="mt-4 rounded-lg bg-surface-raised p-4 text-sm leading-relaxed text-fg-primary wrap-anywhere">{locationMessage(fix.position, fix.at)}</p>
          <SendActions text={locationMessage(fix.position, fix.at)} />
          <button type="button" onClick={ask} className="mt-2 inline-flex min-h-11 items-center text-sm text-fg-secondary underline underline-offset-4">
            Find me again
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={ask} disabled={fix.state === "asking"} className={`${ACTION.primary} mt-4 gap-2 disabled:opacity-60`}>
            <MapPin aria-hidden className="size-4" /> {fix.state === "asking" ? "Finding you…" : "Find me"}
          </button>
          {fix.state === "denied" ? (
            <p className="mt-3 text-sm text-danger">
              Location is off for this site. Turn it on in your browser&apos;s site settings, or describe where you are in a message: a street, a shop, a tram stop.
            </p>
          ) : null}
          {fix.state === "unavailable" ? (
            <p className="mt-3 text-sm text-danger">Your phone could not find a position. Try near a window or outside, or describe where you are.</p>
          ) : null}
        </>
      )}
    </section>
  );
}

function SharePlan() {
  const [plan, setPlan] = useState<Plan>({ where: "", with: "", backBy: "", ifNot: "" });
  const set = (k: keyof Plan) => (e: React.ChangeEvent<HTMLInputElement>) => setPlan((p) => ({ ...p, [k]: e.target.value }));
  const input = "min-h-11 w-full rounded-lg border border-subtle bg-surface-page px-3 text-fg-primary";
  return (
    <section aria-labelledby="plan-title" className="rounded-card border border-subtle p-5 sm:p-8">
      <h2 id="plan-title" className="flex items-center gap-2 font-heading text-2xl font-semibold tracking-display text-fg-primary">
        <Route aria-hidden className="size-6 text-fg-tertiary" /> Leave someone your plan
      </h2>
      <p className="mt-2 max-w-2xl leading-relaxed text-fg-secondary">
        Before a date, a hike, a long drive or a night out: one message to one person who will notice if you do not come back.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-fg-secondary sm:col-span-2">
          Where are you going?
          <input className={input} value={plan.where} onChange={set("where")} placeholder="Dinner at Rosso, then home by tram" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-fg-secondary">
          With whom? (optional)
          <input className={input} value={plan.with} onChange={set("with")} placeholder="Alex, first date" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-fg-secondary">
          Back by
          <input className={input} value={plan.backBy} onChange={set("backBy")} placeholder="23:30" />
        </label>
        <label className="flex flex-col gap-1 text-sm text-fg-secondary sm:col-span-2">
          If they have not heard from you (optional)
          <input className={input} value={plan.ifNot} onChange={set("ifNot")} placeholder="Call me twice, then call my sister" />
        </label>
      </div>
      {plan.where.trim() ? (
        <>
          <p className="mt-5 whitespace-pre-line rounded-lg bg-surface-raised p-4 text-sm leading-relaxed text-fg-primary wrap-anywhere">{planMessage(plan)}</p>
          <SendActions text={planMessage(plan)} />
        </>
      ) : null}
    </section>
  );
}
