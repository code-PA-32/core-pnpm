import { drizzle } from "drizzle-orm/postgres-js"
import { migrate } from "drizzle-orm/postgres-js/migrator"

import postgres from "postgres"

const migrationConnection = postgres("postgresql://root:root@localhost:5432/core", {
  max: 1,
  onnotice: () => {},
})

const connection = drizzle(migrationConnection)
console.info("Attempting a DB migration")
void migrate(connection, {
  migrationsFolder: "./node_modules/@core/database-schema/drizzle",
})
  .then(() => {
    console.info("Migration complete")
    process.exit(0)
  })
  .catch((err) => {
    console.error("Migration failed", err)
    process.exit(1)
  })
  .finally(async () => {
    await migrationConnection.end()
    console.info("Connection closed")
    process.exit(0)
  })
