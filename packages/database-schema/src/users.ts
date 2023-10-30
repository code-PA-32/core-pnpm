import { sql } from "drizzle-orm"
import { date, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email", { length: 50 }).notNull(),
  name: varchar("name", { length: 50 }).notNull(),
  birthdate: date("birthdate").notNull(),
  createdAt: timestamp("createdAt").notNull().default(sql.raw("now()")),
  updatedAt: timestamp("updatedAt").notNull().default(sql.raw("now()")),
})

export type UserSelect = typeof users.$inferSelect
export type UserInsert = typeof users.$inferInsert
