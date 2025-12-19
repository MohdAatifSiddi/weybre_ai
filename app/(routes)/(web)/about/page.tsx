"use client"

import Navbar from "../_common/nav-bar";
import { RocketLaunchIcon, UserGroupIcon, GlobeAltIcon, LightBulbIcon } from '@heroicons/react/24/outline';

export default function About() {
  return (
    <main className="min-h-dvh w-full bg-background text-foreground">
      <div className="w-full border-b border-border backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Navbar />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Building the future of legal AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Weybre AI is on a mission to transform how legal professionals work by providing enterprise-grade AI tools that amplify expertise, not replace it.
          </p>
        </div>

        {/* Mission */}
        <section className="mb-20">
          <div className="bg-card border border-border rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
              We believe legal professionals deserve AI tools built specifically for their domain—secure, accurate, and designed to handle the complexity of legal work. Our platform doesn't replace lawyers; it empowers them to focus on what matters most: strategic thinking, client relationships, and high-value work.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <RocketLaunchIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Pushing boundaries in legal AI technology
              </p>
            </div>

            <div className="text-center">
              <UserGroupIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Partnership</h3>
              <p className="text-muted-foreground">
                Working alongside legal professionals
              </p>
            </div>

            <div className="text-center">
              <GlobeAltIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Trust</h3>
              <p className="text-muted-foreground">
                Enterprise-grade security and compliance
              </p>
            </div>

            <div className="text-center">
              <LightBulbIcon className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                Delivering expert-quality outputs
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Weybre AI was founded by a team of legal professionals, AI researchers, and engineers who saw firsthand the challenges facing modern law firms: increasing workloads, pressure to reduce costs, and the need to deliver faster results without compromising quality.
              </p>
              <p>
                We realized that generic AI tools weren't built for the complexity, precision, and security requirements of legal work. So we set out to build something different—a professional-class AI platform designed specifically for law, regulatory, and corporate work.
              </p>
              <p>
                Today, Weybre AI serves over 100 law firms and 10,000+ legal professionals worldwide, processing millions of documents and helping teams work faster, smarter, and more securely.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-muted/30 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Join us on our mission</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for talented people who share our vision.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            Get in Touch
          </a>
        </section>
      </div>
    </main>
  );
}
