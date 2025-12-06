"use server"
import { myProvider } from "@/lib/ai/provider";
import { PLAN_ENUM, PLANS } from "@/lib/constant";
import prisma from "@/lib/prisma";
import { generateText, type UIMessage } from "ai";
import { HTTPException } from "hono/http-exception";

export async function generateTitleForUserMessage({
    message,
}: {
    message: UIMessage;
}) {
    try {
        const { text } = await generateText({
            model: myProvider.languageModel("title-model"),
            system: `
            - you will generate a short title based on the first message a user begins a conversation with
            - ensure it is not more than 80 characters long
            - the title should be a summary of the user's message
            - do not use quotes or colons`,
            prompt: JSON.stringify(message),
        });
        return text;
    } catch (error) {
        console.log("Title ai error", error);
        return "Untitled";
    }
}

export async function createDefaultSubscription(
    userId: string,
    stripeCustomerId: string
) {
    try {
        const existingSubscription = await prisma.subscription.findFirst({
            where: {
                referenceId: userId,
            },
        });
        if (existingSubscription) {
            return {
                success: true,
                subscription: existingSubscription,
            };
        }

        const subscription = await prisma.subscription.create({
            data: {
                referenceId: userId,
                plan: PLAN_ENUM.FREE,
                stripeCustomerId: stripeCustomerId,
                status: "active",
            },
        });
        return { success: true, subscription }
    } catch (error) {
        console.log(error);
        return {
            success: false,
            error: "Failed to create subscription",
        };
    }
}

export async function checkGenerationLimit(userId: string) {
    const subscription = await prisma.subscription.findFirst({
        where: {
            referenceId: userId,
            status: "active",
        },
    });

    // Use free plan if no subscription found
    const planName = subscription?.plan || PLAN_ENUM.FREE;
    const plan = PLANS.find((p) => p.name === planName);

    if (!plan) {
        throw new HTTPException(400, {
            message: "Invalid subscription plan",
        });
    }

    const periodStart = subscription?.periodStart ?? new Date(0);
    const periodEnd = subscription?.periodEnd ?? new Date();

    const generationCount = await prisma.message.count({
        where: {
            chat: { userId },
            role: "assistant",
            createdAt: {
                gte: periodStart,
                lte: periodEnd,
            },
        },
    });
    const isAllowed =
        plan.limits.generations === Infinity ||
        generationCount < plan.limits.generations;

    const maxLimit = Math.max(0, plan.limits.generations - generationCount);

    const hasPaidSubscription = !!subscription?.stripeSubscriptionId;

    return {
        isAllowed,
        hasPaidSubscription,
        plan: planName,
        generationsUsed: generationCount,
        generationsLimit:
            plan.limits.generations === Infinity ? null : plan.limits.generations,
        remainingGenerations:
            plan.limits.generations === Infinity ? "Unlimited" : maxLimit,
    }
}