import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
      enabled: true,
      async sendResetPassword(data, request) {
          // Send an email to the user with a link to reset their password
      },
  },
  socialProviders: {
      google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      },
      microsoft: {
          clientId: process.env.MICROSOFT_CLIENT_ID!,
          clientSecret: process.env.MICROSOFT_CLIENT_SECRET!
      },
      apple: {
          clientId: process.env.APPLE_CLIENT_ID!,
          clientSecret: process.env.APPLE_CLIENT_SECRET!
      }
  },
  plugins: [nextCookies()] 
  /** if no database is provided, the user data will be stored in memory.
   * Make sure to provide a database to persist user data **/
});