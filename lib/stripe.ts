import Stripe from "stripe"

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-11-17.clover", // Latest API version as of Stripe SDK v20.0.0
})
