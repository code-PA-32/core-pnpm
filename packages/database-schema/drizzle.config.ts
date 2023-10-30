import type { Config } from "drizzle-kit"

// eslint-disable-next-line import/no-default-export
export default {
  schema: "./src/index.ts",
  driver: "pg",
  out: "./drizzle",
  breakpoints: true,
  dbCredentials: {
    connectionString: "postgresql://root:root@localhost:5432/core",
  },
} satisfies Config
