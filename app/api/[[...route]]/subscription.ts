import { checkGenerationLimit } from "@/app/actions/action";
import { auth } from "@/lib/auth";
import { PLAN_ENUM, PLANS } from "@/lib/constant";
import { getAuthUser } from "@/lib/hono/hono-middleware";
import prisma from "@/lib/prisma";
import { stripeClient } from "@/lib/stripe";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { success, z } from "zod";
import { zValidator } from "@hono/zod-validator";

const upgradeSchema = z.object({
    plan: z.enum([PLAN_ENUM.PLUS, PLAN_ENUM.PREMIUM]),
    callbackUrl: z.string().min(1),
});

export const subscriptionRoute = new Hono()
.post(
    "/upgrade",
    zValidator("json", upgradeSchema),
    getAuthUser,
    async (c) => {
        try {
            const body = c.req.valid("json");
            const user = c.get("user");

            const existingSubscription = await prisma.subscription.findFirst({
                where: {
                    referenceId: user.id,
                    status: "active",
                },
            });
            if (existingSubscription?.plan === body.plan) {
                throw new HTTPException(400, {
                    message: `You are already on the ${body.plan} plan`,
                });
            }

            // Find the plan details
            const plan = PLANS.find(p => p.name === body.plan);
            if (!plan || !plan.priceId) {
                throw new HTTPException(400, {
                    message: "Invalid plan or price ID not configured",
                });
            }

            // Create or update Stripe checkout session
            if (existingSubscription?.stripeSubscriptionId) {
                // Update existing subscription
                const session = await stripeClient.billingPortal.sessions.create({
                    customer: existingSubscription.stripeCustomerId!,
                    return_url: body.callbackUrl,
                });
                return c.json({
                    success: true,
                    checkoutUrl: session.url!,
                });
            } else {
                // Create new subscription checkout
                const session = await stripeClient.checkout.sessions.create({
                    customer: existingSubscription?.stripeCustomerId || undefined,
                    mode: 'subscription',
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price: plan.priceId,
                            quantity: 1,
                        },
                    ],
                    success_url: `${body.callbackUrl}?success=true`,
                    cancel_url: `${body.callbackUrl}?error=true`,
                    metadata: {
                        userId: user.id,
                        plan: body.plan,
                    },
                });
                return c.json({
                    success: true,
                    checkoutUrl: session.url!,
                });
            }
        } catch (error: any) {
            console.log(error);
            if (error instanceof HTTPException) {
                throw error;
            }
            throw new HTTPException(500, {
                message: "Failed to create checkout session, please try again..",
            });
        }
    }
)
.get("/generations", getAuthUser, async (c) => {
    try {
        const user = c.get('user');
        const data = await checkGenerationLimit(user.id);
        return c.json({
            success: true,
            data,
        });
    } catch (error) {
        if (error instanceof HTTPException) {
            throw error;
        }
        throw new HTTPException(500, {
            message: "Failed to retrieve generations data."
        });
    }
});