import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import type * as schema from "./schema";

/** Any Postgres-backed drizzle database with our schema: node-postgres in the
 * app, PGlite in tests. Server modules take this, never a concrete driver. */
export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;
