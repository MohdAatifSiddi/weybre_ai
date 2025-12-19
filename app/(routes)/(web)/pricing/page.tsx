"use client"

import Navbar from "../_common/nav-bar";
import { CheckIcon } from '@heroicons/react/24/outline';

const pricingPlans = [
  {
    name: "Professional",
    price: "$99",
    period: "per user/month",
    description: "Perfect for small firms and solo practitioners",
    features: [
      "AI Assistant with domain training",
      "Knowledge base access",
      "Up to 1,000 documents in Vault",
      "Basic workflows",
      "Email support",
      "Standard security features"
    ],
    cta: "Start Free Trial",
    highlighted: false
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact sales",
    description: "For large firms and legal departments",
    features: [
      "Everything in Professional",
      "Unlimited documents in Vault",
      "Advanced multi-agent workflows",
      "Custom AI model training",
      "SSO and advanced security",
      "Dedicated account manager",
      "24/7 priority support",
      "Custom integrations",
      "SLA guarantees"
    ],
    cta: "Contact Sales",
    highlighted: true
  },
  {
    name: "Team",
    price: "$49",
    period: "per user/month",
    description: "For growing teams and mid-size firms",
    features: [
      "Everything in Professional",
      "Up to 10,000 documents in Vault",
      "Advanced workflows",
      "Team collaboration features",
      "Priority email support",
      "Advanced security features"
    ],
    cta: "Start Free Trial",
    highlighted: false
  }
];

export default function Pricing() {
  return (
    <main className="min-h-dvh w-full bg-background text-foreground">
      <div className="w-full border-b border-border backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Navbar />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your firm's needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-card border rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? 'border-primary shadow-xl scale-105 relative'
                  : 'border-border'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.name === "Enterprise" ? "/book-demo" : "/auth/sign-up"}
                className={`block text-center px-6 py-3 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'border border-border hover:border-foreground'
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Can I switch plans later?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards, wire transfers, and can accommodate purchase orders for enterprise customers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Yes, all plans come with a 14-day free trial. No credit card required to start.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">What happens to my data if I cancel?</h3>
              <p className="text-muted-foreground">
                You can export all your data at any time. After cancellation, your data is retained for 30 days before permanent deletion.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 mt-20">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team is here to help you find the right plan.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            Contact Sales
          </a>
        </section>
      </div>
    </main>
  );
}
