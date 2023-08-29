import type { Config } from "drizzle-kit"

export default {
    schema: './src/lib/db/schema.ts',
    out: './drizzle',
    dbCredentials: {
        connectionString: process.env.DATABASE_CONNECTION_STRING as string
    },
    driver: 'pg'
} satisfies Config