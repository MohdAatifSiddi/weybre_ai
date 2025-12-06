export const PLAN_ENUM = {
    FREE: "free",
    PLUS: "plus",
    PREMIUM: "premium",
} as const;

export type PlanEnumType = (typeof PLAN_ENUM)[keyof typeof PLAN_ENUM];

export type PaidPlanEnumType = Exclude<PlanEnumType, "free">;

export const UPGRADEABLE_PLANS = [PLAN_ENUM.PLUS, PLAN_ENUM.PREMIUM];

const PLUS_PRICE_ID = process.env.STRIPE_PLUS_PLAN_ID || "";
const PREMIUM_PRICE_ID = process.env.STRIPE_PREMIUM_PLAN_ID || "";

export const PLANS = [
    {
        id: 1,
        name: PLAN_ENUM.FREE,
        price: 0,
        priceId: undefined,
        description: "Perfect for getting started with AI-powered note-taking",
        features: [
            "20 AI generations per month",
            "Basic Support",
            "Limited notes creation",
            "Acess to core features",
            "Community access",
            "Single user only",
        ],
        limits: {
            generations: 10,
        },
    },
    {
        id: 2,
        name: PLAN_ENUM.PLUS,
        price: 12,
        priceId: PLUS_PRICE_ID,
        description: "Ideal for individuals and professionals who need more power",
        features: [
            "300 AI generations per month",
            "Priority Support",
            "Unlimited note creations",
            "Acess to core features",
            "Community access",
            "Advanced AI Search",
            "Single user only",
        ],
        limits: {
            generations: 300,
        },
    },
    {
        id: 3,
        name: PLAN_ENUM.PREMIUM,
        price: 24,
        priceId: PREMIUM_PRICE_ID,
        description: "Maximum productivity with unlimited access to all features",
        features: [
            "Unlimited AI Generations",
            "Unlimited note creations",
            "Priority Support",
            "Early Access to new Features",
            "AI Advanced Search",
            "Advanced Admin & Analytics",
        ],
        limits: {
            generations: Infinity,
        },
    },
] as const;