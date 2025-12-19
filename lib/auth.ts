import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, bearer } from "better-auth/plugins";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma/client";
import { stripe } from "@better-auth/stripe";
import { stripeClient } from "./stripe";
import { PLANS } from "./constant";
import { createDefaultSubscription } from "@/app/actions/action";
import { Resend } from "resend";
import { lastLoginMethod, organization } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import ForgotPasswordEmail from "@/app/(routes)/auth/email/reset-password";
import VerifyEmail from "@/app/(routes)/auth/email/verify-email";

const resend = new Resend(process.env.RESEND_API_KEY as string);

const prisma = new PrismaClient();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                to: user.email,
                subject: "Verify your email",
                react: VerifyEmail({ username: user.name, verifyUrl: url }),
            });
        },
        sendOnSignUp: true
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                to: user.email,
                subject: "Reset your password",
                react: ForgotPasswordEmail({
                    resetLink: url,
                    userEmail: user.email,
                }),
            });
        },
        resetPasswordTokenExpiresIn: 3600, // 1 hour
        resetPasswordCallbackURL: "/auth/reset-password",
        requireEmailVerification: true,
        minPasswordLength: 4,
    },
    plugins: [openAPI(), bearer(), stripe({
        stripeClient,
        stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
        createCustomerOnSignUp: true,
        onCustomerCreate: async ({ stripeCustomer, user }) => {
            const userId = user.id;
            const stripeCustomerId = stripeCustomer.id;
            await createDefaultSubscription(userId, stripeCustomerId);
        },
        subscription: {
            enabled: true,
            plans: PLANS as any,
        }
    }),
    lastLoginMethod(),
    nextCookies(),
    ],
});