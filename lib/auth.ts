import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { openAPI, bearer } from "better-auth/plugins";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/generated/prisma/client";
import { stripe } from "@better-auth/stripe";
import { stripeClient } from "./stripe";
import { PLANS } from "./constant";
import { createDefaultSubscription } from "@/app/actions/action";

const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 4,
    },
    plugins: [openAPI(), bearer(), stripe({
        stripeClient,
        stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
        createCustomerOnSignUp: true,
        onCustomerCreate: async ({ stripeCustomer, user}) => {
            const userId = user.id;
            const stripeCustomerId = stripeCustomer.id;
            await createDefaultSubscription(userId, stripeCustomerId);
        },
        subscription: {
            enabled: true,
            plans: PLANS,
        }
    }),
],
});