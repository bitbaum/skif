/**
 * Skif's ways in, on a real Postgres (PGlite) carrying the committed
 * migrations, through the runtime the app builds (skifAuthOptions): what
 * AccountKit's sign-in, sign-up and account screens call.
 *
 *   - sign up with an email and a password, and be signed in;
 *   - sign out; a wrong password is refused; the right one signs in;
 *   - a reset through the mailed link sets a new password and the old one stops working;
 *   - an emailed sign-in link signs in;
 *   - a person whose first way in was OrangeCat keeps their OrangeCat `sub` as
 *     the key of every row they wrote before Skif had accounts; everyone else
 *     is their account id.
 */
import { readdirSync, readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { createAuthRuntime } from "@bitbaum/accountkit/auth/next";
import { drizzle } from "drizzle-orm/pglite";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { skifAuthOptions } from "@/config/auth";
import * as schema from "@/db/schema";
import { getPreferences } from "./preferences";

vi.mock("next/headers", () => ({ headers: async () => new Headers() }));

const SITE = "https://skif.example.test";
const ENV = { NODE_ENV: "test", AUTH_URL: SITE, BETTER_AUTH_SECRET: "s".repeat(48), DATABASE_URL: "pglite" } as NodeJS.ProcessEnv;

type Mail = { kind: string; to: string; url: string };

async function migrated(): Promise<PGlite> {
  const pg = new PGlite();
  for (const file of readdirSync("drizzle").filter((f) => /^\d{4}_.*\.sql$/.test(f)).sort()) {
    for (const sql of readFileSync(`drizzle/${file}`, "utf8").split("--> statement-breakpoint")) {
      if (sql.trim()) await pg.exec(sql);
    }
  }
  return pg;
}

describe("accounts on Skif's own migrations", () => {
  let pg: PGlite;
  let mail: Mail[];
  let runtime: ReturnType<typeof createAuthRuntime>;
  let db: ReturnType<typeof drizzle<typeof schema>>;

  beforeEach(async () => {
    pg = await migrated();
    db = drizzle(pg, { schema });
    mail = [];
    runtime = createAuthRuntime(
      skifAuthOptions({
        env: ENV,
        getDatabase: () => db,
        mail: { configured: true, send: async (kind, to, url) => void mail.push({ kind, to, url }) },
      }),
    );
  });
  afterEach(async () => {
    await pg.close();
  });

  /** One browser: a cookie jar and same-origin requests. */
  function browser() {
    const jar = new Map<string, string>();
    async function call(path: string, body?: unknown, method = body === undefined ? "GET" : "POST") {
      const headers = new Headers({ origin: SITE });
      if (jar.size) headers.set("cookie", [...jar].map(([k, v]) => `${k}=${v}`).join("; "));
      if (body !== undefined) headers.set("content-type", "application/json");
      const request = new Request(`${SITE}${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
      const response = await (method === "GET" ? runtime.GET(request) : runtime.POST(request));
      for (const c of response.headers.getSetCookie()) {
        const [pair] = c.split(";");
        const [k, ...v] = pair.split("=");
        const value = v.join("=");
        if (value && !/max-age=0/i.test(c)) jar.set(k, value);
        else jar.delete(k);
      }
      return response;
    }
    const cookies = () => new Headers({ cookie: [...jar].map(([k, v]) => `${k}=${v}`).join("; ") });
    return { call, cookies, session: () => runtime.sessionFor(cookies()) };
  }

  /** Follow a mailed link the way a browser does, up to the page it lands on. */
  async function follow(b: ReturnType<typeof browser>, url: string): Promise<URL> {
    const r = await b.call(new URL(url).pathname + new URL(url).search);
    expect(r.status).toBe(302);
    return new URL(r.headers.get("location")!, SITE);
  }

  it("signs up, signs out, refuses a wrong password, signs in", async () => {
    const b = browser();
    const up = await b.call("/api/auth/sign-up/email", { email: "neu@example.ch", password: "grüezi mitenand", name: "" });
    expect(up.status).toBe(200);
    const session = await b.session();
    expect(session?.user.email).toBe("neu@example.ch");
    // Nobody who came in by password has an OrangeCat key: their rows are their account id.
    expect(session?.user.actorId).toBe(session?.user.id);

    expect((await b.call("/api/auth/sign-out", {})).status).toBe(200);
    expect(await b.session()).toBeNull();

    expect((await b.call("/api/auth/sign-in/email", { email: "neu@example.ch", password: "falsch" })).status).toBe(401);
    expect(await b.session()).toBeNull();

    expect((await b.call("/api/auth/sign-in/email", { email: "neu@example.ch", password: "grüezi mitenand" })).status).toBe(200);
    expect((await b.session())?.user.email).toBe("neu@example.ch");
  });

  it("resets a password through the mailed link", async () => {
    const b = browser();
    await b.call("/api/auth/sign-up/email", { email: "vergessen@example.ch", password: "das alte", name: "" });
    await b.call("/api/auth/sign-out", {});
    const asked = await b.call("/api/auth/request-password-reset", {
      email: "vergessen@example.ch",
      redirectTo: `${SITE}/de/signin?next=%2Fact`,
    });
    expect(asked.status).toBe(200);
    const link = mail.find((m) => m.kind === "reset" && m.to === "vergessen@example.ch");
    expect(link).toBeDefined();
    const landed = await follow(b, link!.url);
    expect(landed.pathname).toBe("/de/signin");
    const token = landed.searchParams.get("token");
    expect(token).toBeTruthy();
    expect((await b.call("/api/auth/reset-password", { token, newPassword: "das neue" })).status).toBe(200);
    expect((await b.call("/api/auth/sign-in/email", { email: "vergessen@example.ch", password: "das alte" })).status).toBe(401);
    expect((await b.call("/api/auth/sign-in/email", { email: "vergessen@example.ch", password: "das neue" })).status).toBe(200);
  });

  it("signs in with an emailed link", async () => {
    const b = browser();
    const sent = await b.call("/api/auth/sign-in/magic-link", { email: "link@example.ch", callbackURL: "/act" });
    expect(sent.status).toBe(200);
    const link = mail.find((m) => m.kind === "magicLink" && m.to === "link@example.ch");
    expect(link).toBeDefined();
    expect((await follow(b, link!.url)).pathname).toBe("/act");
    expect((await b.session())?.user.email).toBe("link@example.ch");
  });

  it("keeps an OrangeCat person's rows under their OrangeCat sub", async () => {
    // Before accounts, a person's rows were written under their OrangeCat
    // `sub`. Their first OrangeCat sign-in on AccountKit creates an account
    // whose first way in is the `orangecat` accounts row with that `sub`
    // (better-auth's OIDC writes it; it is made by hand here because the
    // round trip needs OrangeCat). Its actorId is that `sub` again.
    const SUB = "a3c1d2e4-0000-4000-8000-0000000000aa";
    await pg.query("INSERT INTO preference_profiles (sub, presence_style) VALUES ($1, 'DISCREET')", [SUB]);
    const b = browser();
    await b.call("/api/auth/sign-up/email", { email: "oc-person@example.ch", password: "irrelevant here", name: "" });
    const { user } = (await b.session())!;
    await pg.query(
      "UPDATE accounts SET provider_id = 'orangecat', account_id = $1, password = NULL WHERE user_id = $2",
      [SUB, user.id],
    );
    // A runtime that has not seen this person yet (the app after a restart).
    const app = createAuthRuntime(
      skifAuthOptions({ env: ENV, getDatabase: () => db, mail: { configured: false, send: async () => {} } }),
    );
    const session = await app.sessionFor(b.cookies());
    expect(session?.user.actorId).toBe(SUB);
    expect(session?.user.id).not.toBe(SUB);
    expect(await getPreferences(db, SUB)).not.toBeNull();
  });
});
