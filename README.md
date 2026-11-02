# Skif

Holistic safety for people and the places they live — Zürich first, without
trading away privacy or freedom.

## What works

End to end, with everything persisted in Postgres:

1. **Customer** signs in (OrangeCat OIDC), sets a **Safety Preference Profile**
   — hard limits (no facial recognition, no interior cameras, no cloud video,
   no automatic police sharing), presence style and languages.
2. Customer **requests a service** (Night Out, Getting home, …). Payment is
   recorded as `PAYMENT_PENDING` and settled manually — never faked.
3. **Operations** (`/ops`) approves Protector applications, sees approved
   Protectors **ranked with a reason for every point** (and who is excluded,
   and why), and assigns one. The ranking is deterministic — no model.
4. The **Protector** accepts (only then sees the meeting point and notes),
   starts, files reports or incidents, and completes. A Protector never sees
   who the customer is.
5. Customer rates **respect, discretion and feeling of safety** on labelled
   scales — not stars.
6. Operations sees the whole lifecycle, the rating and every report.
7. **Safety assessment** (`/assessments`) saves a Safety Plan: the most
   proportionate step per concern within the person's hard limits, the
   trade-offs, what's excluded and why — and says **"you don't need to buy
   anything"** when that's the answer.
8. **Case files** (`/cases`) are for after a scam: the person records the
   timeline, what the scammers left behind (numbers, names, accounts,
   remote-access IDs) and ticks off the recovery steps for that kind of scam,
   then prints the report for the police or copies it as text for BACS or the
   bank. Owner-only: no Operations, Protector, AI or Loki-widget path reads it.
   The public checklist `/act/someone-got-into-my-computer` leads into it.

## Layout

```
src/config/     what exists — services, constraints, interventions, weights, the
                public site's words (site.ts), the Academy (academy.ts), guides (guides/),
                research with sources (research/), Act checklists (checklists.ts)
                and photographs with credits (photos.ts) (SSOT)
src/site/       the public content pages as @bitbaum/sitekit data, assembled from
                config (guides, research, method, protectors, join); validated in
                site.test.ts. Drawn with sitekit's renderers, except page openings
                (photographs) and tables (stack on phones), which sitekit cannot do
src/domain/     pure logic — lifecycle state machine, matching, safety plan, inputs
src/db/         Drizzle schema + client (no users table; OIDC sub is identity)
src/server/     data access + authorisation, one module per concern
src/app/        pages and server actions — (public) for the site, (app) behind sign-in
src/components/ UI
drizzle/        committed SQL migrations
```

Roles are derived, not stored on a user: **Operations** = actor ids listed in
`SKIF_OPS_SUBS`; **Protector** = a row in `protectors` (applied → approved by
Operations); everyone signed in is a **customer**.

## Run it locally

```bash
pnpm install
cp .env.example .env.local
pnpm db:local                     # in-process Postgres on :5433 (keep running)
pnpm db:migrate                   # in another shell
pnpm dev
```

Create an account at `/signin?mode=create` with any address and password.
For Operations, put that account's id (`SELECT id FROM users`) in
`SKIF_OPS_SUBS` and restart.

## Accounts

Accounts are `@bitbaum/accountkit` (`src/auth.ts`), on AccountKit's own
screens: `/signin` (password, passkey, an emailed sign-in link, recovery, the
second factor), `/signin?mode=create` and `/account` (password, passkeys,
second factor, linked sign-ins, deletion). "Continue with OrangeCat" and the
shared bitbaum sign-in appear when their clients are set; the link and
recovery when mail is.

Every row that belongs to a person stores their **actor id**. For a person
whose first way into Skif was OrangeCat (everyone who signed in before
2026-11-02, when OrangeCat was the only way in), that is their OrangeCat
`sub`, exactly as before: their first OrangeCat sign-in on AccountKit
creates the account and links it by that `sub`
(`legacyIdentityProvider: "orangecat"`), so nothing was migrated and no
address is ever used to find them. Everyone else's actor id is their account
id. `SKIF_OPS_SUBS` and `SKIF_LOKI_WATCH_SUBS` list actor ids.

## Verify

```bash
pnpm verify    # type-check, lint, tests, build
```

Tests include a full lifecycle run against in-process Postgres (PGlite) with
the committed migrations applied.

## Production

Required env on the box: `DATABASE_URL`, `AUTH_SECRET` (or
`BETTER_AUTH_SECRET`, 32+ characters), `AUTH_URL`, `SKIF_OPS_SUBS`. The landing
page needs none of them. `ORANGECAT_OAUTH_CLIENT_ID` and
`ORANGECAT_OAUTH_CLIENT_SECRET` add "Continue with OrangeCat";
`SIGNIN_ISSUER`, `SIGNIN_CLIENT_ID` and `SIGNIN_CLIENT_SECRET` the shared
sign-in (loki `app-secrets.yml action=signin-on`, once Morulia has a
provider). `RESEND_API_KEY` (and `RESEND_FROM`) sends account mail: the
emailed sign-in link and recovery are offered only with it. With
`SKIF_OPS_EMAIL` it also turns on Operations alerts by email — new bookings to assign, incidents filed — which
carry no personal or location data; `/api/health` reports `mail`.
Optional: `GROQ_API_KEY` (and/or `GEMINI_API_KEY`, `OPENROUTER_API_KEY`)
switches on AI form assistance — only on the Protector application, where a
Protector describes their own experience; it fills fields they review, and
never touches location, incident or matching data (see `src/config/ai-forms.ts`).
Optional: `SKIF_LOKI_WATCH_SUBS` (the owner's sub) loads the Loki feedback
widget inside the app for that person alone, so opening Skif from Loki's
"Open your site" link turns on watch mode: errors, failed requests and dead
taps become suggested fixes in Loki. It mounts on their own pages only, never
under `/ops` (see `src/config/feedback.ts`); unset, the app loads no
third-party script.
Migrations in `drizzle/` are applied by the deploy pipeline's schema step once the app has a database declared in its deploy manifest.
