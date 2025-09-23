import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { Resend } from "resend";
import { nextCookies } from "better-auth/next-js";
import ForgotPasswordEmail from "@/app/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: {
      enabled: true,
      sendResetPasswordEmail: async ({ user, url, token }, request) => {
          // Send an email to the user with a link to reset their password
          try {
            // The email template expects `resetLink`, not `token`
            await resend.emails.send({
              from: "info@weybre.com",
              to: user.email,
              subject: "Reset your password",
              react: ForgotPasswordEmail({
                userEmail: user.email,
                resetLink: url,
              }),
            });
          } catch (error) {
            console.error("Failed to send reset password email:", error);
            // Optional: rethrow or handle according to your error strategy
            throw error;
          }
      },
  },
  socialProviders: {
    google: { 
        clientId: process.env.GOOGLE_CLIENT_ID as string, 
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
    }, 
  },
  plugins: [nextCookies()] 
  /** if no database is provided, the user data will be stored in memory.
   * Make sure to provide a database to persist user data **/
});