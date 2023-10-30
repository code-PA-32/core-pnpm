import { sql } from "drizzle-orm"
import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core"

import { users } from "./users.ts"

export const identities = pgTable("identities", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("createdAt").notNull().default(sql.raw("now()")),
  updatedAt: timestamp("updatedAt").notNull().default(sql.raw("now()")),
})

export type IdentitySelect = typeof identities.$inferSelect
export type IdentityInsert = typeof identities.$inferInsert
