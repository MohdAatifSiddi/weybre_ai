"use client"

import { useCallback } from 'react';
import Navbar from "./_common/nav-bar";
import { 
  ShieldCheckIcon, 
  DocumentTextIcon, 
  BoltIcon, 
  ServerStackIcon,
  BuildingOfficeIcon,
  ScaleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const handleRequestDemo = useCallback(() => {
    window.location.href = '/book-demo';
  }, []);

  return (
    <main className="min-h-dvh w-full relative bg-background text-foreground">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(125%_125%_at_50%_80%,#ffffff_0%,#10b981_60%,transparent_100%)]" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="relative z-10">
        {/* NAV */}
        <div className="w-full border-b border-border backdrop-blur-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Navbar />
          </div>
        </div>

        {/* HERO */}
        <section id="hero" className="pt-20 pb-16 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-primary/40 bg-primary/10 text-sm font-semibold text-primary">
            Enterprise AI for Law Firms & Professional Services
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
            AI that works like a partner, built for law firms and enterprises
          </h1>

          <p className="mt-6 text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
            Secure, domain-specific workflows—no generic chatbots. Augment your legal work with an AI platform designed to handle complex documents, research, and workflows safely, efficiently, and intelligently.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleRequestDemo}
              className="px-8 py-4 bg-primary text-primary-foreground text-lg font-semibold rounded-xl hover:bg-primary/90 transition-all"
              aria-label="Request a demo"
            >
              Request a Demo
            </button>
            <button 
              onClick={() => document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border border-border rounded-xl hover:border-foreground transition-all"
            >
              Learn More
            </button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Trusted by 100+ law firms • 10,000+ lawyers • 1M+ documents processed
          </p>
        </section>

        {/* PRODUCT PREVIEW */}


        {/* PRODUCT MODULES */}
        <section id="product" className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Professional-class AI platform for law, regulatory, and corporate work
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Weybre AI doesn't replace experts—it amplifies them. All workflows integrated on a single secure system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Assistant */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <BoltIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Assistant</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your personal, domain-trained AI for legal, tax, and professional tasks. Understands natural-language instructions and produces expert-quality output.
                </p>
              </div>

              {/* Knowledge */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <DocumentTextIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Knowledge</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Search, analyze, and cite across legal, regulatory, and tax documents with confidence. Comprehensive legal intelligence.
                </p>
              </div>

              {/* Vault */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <ShieldCheckIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Vault</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Secure workspaces for uploading, storing, and analyzing thousands of sensitive documents. Enterprise-grade security.
                </p>
              </div>

              {/* Workflows */}
              <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <ServerStackIcon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">Workflows</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Multi-agent AI workflows that generate outputs tailored to complex professional processes—contracts, diligence, litigation prep, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section id="solutions" className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Workflows designed for every legal role
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <BuildingOfficeIcon className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-lg font-bold mb-2">In-house Counsel</h3>
                <p className="text-sm text-muted-foreground">
                  High-volume contracts, regulatory filings, and due diligence
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <BoltIcon className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-lg font-bold mb-2">Innovation & IP Teams</h3>
                <p className="text-sm text-muted-foreground">
                  Capture and embed firm IP, streamline research
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <DocumentTextIcon className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-lg font-bold mb-2">Transactional Teams</h3>
                <p className="text-sm text-muted-foreground">
                  Automate diligence, contract drafting, and review
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <ScaleIcon className="w-10 h-10 text-primary mb-3" />
                <h3 className="text-lg font-bold mb-2">Litigation Teams</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce manual prep, focus on strategy and outcomes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Trusted by leading firms and enterprises worldwide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">100+</div>
                <div className="text-muted-foreground">Law Firms</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Lawyers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">1M+</div>
                <div className="text-muted-foreground">Documents Processed</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 max-w-3xl mx-auto">
              <p className="text-lg italic text-muted-foreground mb-4">
                "Weybre AI reduced our contract review time by 70%. It's like having a partner who never sleeps."
              </p>
              <p className="font-semibold">— Partner, Top Tier Law Firm</p>
            </div>
          </div>
        </section>

        {/* DIFFERENTIATORS */}
        <section id="enterprise" className="py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Why leading firms choose Weybre AI
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <CheckCircleIcon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Enterprise-grade security & compliance</h3>
                  <p className="text-muted-foreground">
                    Security controls aligned with SOC 2 and ISO 27001 standards. GDPR and CCPA compliant. No training on your sensitive data.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircleIcon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Domain-specific AI</h3>
                  <p className="text-muted-foreground">
                    Trained for legal, tax, and regulatory tasks—not generic chatbots.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircleIcon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Agentic workflows</h3>
                  <p className="text-muted-foreground">
                    Produce expert-level outputs with minimal input.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircleIcon className="w-8 h-8 text-primary flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">24/7 white glove support</h3>
                  <p className="text-muted-foreground">
                    Seamless adoption with dedicated support for your team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 text-center px-6 bg-gradient-to-b from-background to-muted/50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Transform your legal workflows today
            </h2>
            <p className="text-lg text-muted-foreground mb-10">
              Join 100+ leading law firms using Weybre AI to work faster, smarter, and more securely.
            </p>
            <button 
              onClick={handleRequestDemo}
              className="px-12 py-5 bg-primary text-primary-foreground text-lg font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              aria-label="Request a demo"
            >
              Request a Demo
            </button>
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required • Enterprise-ready • 24/7 support
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border py-12">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#product" className="hover:text-foreground">Assistant</a></li>
                  <li><a href="#product" className="hover:text-foreground">Knowledge</a></li>
                  <li><a href="#product" className="hover:text-foreground">Vault</a></li>
                  <li><a href="#product" className="hover:text-foreground">Workflows</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Solutions</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#solutions" className="hover:text-foreground">In-house Counsel</a></li>
                  <li><a href="#solutions" className="hover:text-foreground">Innovation & IP</a></li>
                  <li><a href="#solutions" className="hover:text-foreground">Transactional</a></li>
                  <li><a href="#solutions" className="hover:text-foreground">Litigation</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/about" className="hover:text-foreground">About</a></li>
                  <li><a href="/case-studies" className="hover:text-foreground">Case Studies</a></li>
                  <li><a href="/security" className="hover:text-foreground">Security</a></li>
                  <li><a href="/contact" className="hover:text-foreground">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="/privacy-policy" className="hover:text-foreground">Privacy Policy</a></li>
                  <li><a href="/terms-of-service" className="hover:text-foreground">Terms of Service</a></li>
                  <li><a href="/compliance" className="hover:text-foreground">Compliance</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2024 Weybre AI. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="https://www.linkedin.com/company/weybre-ai" className="hover:text-foreground">LinkedIn</a>
                <a href="https://x.com/weybre_app" className="hover:text-foreground">Twitter</a>
                <a href="mailto:aatif@weybre.com" className="hover:text-foreground">Email</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}