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

## Layout

```
src/config/     what exists — services, constraints, interventions, weights (SSOT)
src/domain/     pure logic — lifecycle state machine, matching, safety plan, inputs
src/db/         Drizzle schema + client (no users table; OIDC sub is identity)
src/server/     data access + authorisation, one module per concern
src/app/        pages and server actions
src/components/ UI
drizzle/        committed SQL migrations
```

Roles are derived, not stored on a user: **Operations** = subs listed in
`SKIF_OPS_SUBS`; **Protector** = a row in `protectors` (applied → approved by
Operations); everyone signed in is a **customer**.

## Run it locally

```bash
pnpm install
cp .env.example .env.local        # dev login is on by default
pnpm db:local                     # in-process Postgres on :5433 (keep running)
pnpm db:migrate                   # in another shell
pnpm dev
```

Sign in with the development form using any identity. Use `ops` to get
Operations (it becomes the sub `dev:ops`, which `.env.example` lists in
`SKIF_OPS_SUBS`). The development login only mounts when `NODE_ENV` is
`development` **and** `SKIF_DEV_LOGIN=1`, so it can't exist in a production build.

## Verify

```bash
pnpm verify    # type-check, lint, tests, build
```

Tests include a full lifecycle run against in-process Postgres (PGlite) with
the committed migrations applied.

## Production

Required env on the box: `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`,
`AUTH_TRUST_HOST=true`, `ORANGECAT_OAUTH_CLIENT_ID`,
`ORANGECAT_OAUTH_CLIENT_SECRET`, `SKIF_OPS_SUBS`. The landing page needs none
of them. Migrations in `drizzle/` are applied by the deploy pipeline's schema
step once the app has a database declared in its deploy manifest.
