import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  // .claude/ holds agent worktrees (whole checkouts with their own node_modules
  // and .next); .data/ is local database state. Neither is source.
  { ignores: [".next/**", "node_modules/**", "drizzle/**", "next-env.d.ts", ".claude/**", ".data/**"] },
];

export default config;
