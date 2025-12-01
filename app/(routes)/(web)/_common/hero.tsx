"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiExternalLinkLine } from "@remixicon/react";
import { cn } from "@/lib/utils"; // Assuming utils for class merging

const Hero = () => {
  return (
    <section className="relative mt-6 min-h-[500px] flex items-center overflow-hidden rounded-3xl border border-border shadow-xl px-6 py-16 md:py-24 bg-gradient-to-b from-background to-muted">
      <div className="relative z-10 mx-auto max-w-4xl text-center w-full">

        {/* Tagline */}
        <div className="mb-6 flex items-center justify-center animate-pulse">
          <span className="rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold text-primary tracking-wide">
            The Legal AI Operating System
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-extrabold tracking-tight leading-tight text-4xl sm:text-5xl md:text-6xl">
          <span className={cn("block bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground")}>
            Transform Legal Work from Weeks to Minutes
          </span>
        </h1>

        {/* Subheadline with Animated Stats */}
        <p className="mt-5 text-lg sm:text-xl text-muted-foreground leading-relaxed">
          Full-stack AI infrastructure used by{" "}
          {/* <CountUp end={60000} separator="," duration={2} suffix="+ " className="text-emerald-400 font-semibold" /> lawyers,{" "} */}
          60,000+ lawyers, 6,000 law firms,
          government institutions, and 100,000+ professionals to research, draft,
          analyze, and execute legal decisions with precision and speed.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            className="group rounded-full px-8 py-5 sm:px-10 sm:py-6 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-200 hover:scale-105"
          >
            <Link 
              href="/auth/sign-in" 
              className="inline-flex items-center"
              rel="noopener noreferrer"
            >
              Start Free
              <RiExternalLinkLine className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>

          <Button
            variant="ghost"
            asChild
            className="group rounded-full px-8 py-5 sm:px-10 sm:py-6 text-base text-foreground hover:bg-accent transition-all duration-200 hover:scale-105"
          >
            <Link 
              href="/book-demo" 
              rel="noopener noreferrer"
            >
              Book Enterprise Demo
              <RiExternalLinkLine className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100" />
            </Link>
          </Button>
        </div>

        {/* Social Proof */}
        <p className="mt-6 text-sm text-muted-foreground">
          Trusted infrastructure for high-stakes legal and governance execution.
        </p>
      </div>
    </section>
  );
};

export default Hero;