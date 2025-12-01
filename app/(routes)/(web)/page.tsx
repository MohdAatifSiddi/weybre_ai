"use client"

import { useCallback } from 'react';
import Navbar from "./_common/nav-bar";
import { BoltIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Home() {
  const handleStartFree = useCallback(() => {
    // Track or redirect
    window.location.href = '/signup';
  }, []);

  const handleRequestAccess = useCallback(() => {
    // e.g., Open modal or email form
    console.log('Request access');
  }, []);

  return (
    <main className="min-h-dvh w-full relative bg-background text-foreground">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_80%,#ffffff_0%,#10b981_60%,transparent_100%)]" />
        <div className="absolute inset-0 grid-bg" /> {/* Assuming CSS class added */}
      </div>

      <div className="relative z-10">
        {/* NAV */}
        <div className="w-full border-b border-border backdrop-blur-lg sticky top-0">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Navbar />
          </div>
        </div>

        {/* HERO */}
        <section className="pt-20 pb-16 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            The AI Operating System for Law and Governance
          </h1>

          <p className="mt-6 text-muted-foreground text-lg sm:text-xl leading-relaxed">
            Full-stack legal infrastructure powering research, drafting, compliance,
            case preparation, and documentation — all in one platform.
            Trusted by 60,000+ lawyers, 6,000 firms, government institutions, and
            100,000+ users worldwide.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartFree}
              className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90"
              aria-label="Start your free trial"
            >
              Start Free
            </button>
            <button className="px-8 py-3 border border-border rounded-xl hover:border-foreground">
              Watch Demo
            </button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Becoming the global infrastructure for legal and regulatory decisions.
          </p>
        </section>

        {/* PRODUCT PREVIEW */}
        <section className="w-full max-w-5xl mx-auto px-6 pb-16">
          <div className="rounded-2xl border border-border bg-card aspect-video flex items-center justify-center">
            <video
              className="w-full h-full object-cover rounded-xl"
              poster="/demo-poster.jpg"
              controls
              preload="metadata"
            >
              <source src="/demo.mp4" type="video/mp4" />
              <span className="text-muted-foreground text-sm sm:text-base">Product Demo / Video Preview</span>
            </video>
          </div>
        </section>

        {/* VALUE PROPS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-5xl mx-auto px-6 pb-20">
          <div className="text-center">
            <ClockIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">10× Faster Workflow</h3>
            <p className="text-muted-foreground text-sm">
              Research, draft, and finalize legal work in minutes, not weeks.
            </p>
          </div>
          <div className="text-center">
            <BoltIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Enterprise-Grade Accuracy</h3>
            <p className="text-muted-foreground text-sm">
              Built on proprietary legal AGI independent from third-party APIs.
            </p>
          </div>
          <div className="text-center">
            <ShieldCheckIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Government-Level Security</h3>
            <p className="text-muted-foreground text-sm">
              Adopted across government systems with compliance at the core.
            </p>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="pb-20 text-center px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-5">
            Take control. Build the future of Legal AI.
          </h2>
          <button 
            onClick={handleRequestAccess}
            className="px-10 py-4 bg-primary text-primary-foreground text-lg font-bold rounded-xl hover:bg-primary/90"
            aria-label="Request early access to the platform"
          >
            Request Early Access
          </button>
        </section>
      </div>
    </main>
  );
}