// app/auth.ts
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import React from "react";
import { lastLoginMethod } from "better-auth/plugins"
import { VerifyEmail } from "@/app/emails/verify-email";

import { Resend } from "resend";

import { nextCookies } from "better-auth/next-js";

const resend = new Resend(process.env.RESEND_API_KEY!);

// PostgreSQL connection pool
const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Function to send emails using Resend
async function sendEmail(to: string, subject: string, text: string) {
  await resend.emails.send({
    from: "no-reply@auth.weybre.com", // Replace with your verified sender
    to,
    subject,
    text,
  });
}

export const auth = betterAuth({
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: `${process.env.Email_SENDER_NAME} <${process.env.Email_SENDER_ADDRESS}>`,
        to: user.email,
        subject: 'Verify your email address',
        react: React.createElement(VerifyEmail, { username: user.name, verifyUrl: url }),
      });
    },
    sendOnSignUp: true
  },
  database: dbPool, // Persist users in PostgreSQL
  
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // Send the reset password email
      await sendEmail(
        user.email,
        "Reset your password",
        `Hey! Click the link below to reset your password:\n\n${url}\n\nIf you didn't request this, ignore this email.`
      );
    },
    onPasswordReset: async ({ user }) => {
      console.log(`Password for user ${user.email} has been reset.`);
      // Optional: Add more logic here like revoking sessions
    },
    requireEmailVerification: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [lastLoginMethod(), nextCookies()]// Integrates auth with Next.js cookies
});
