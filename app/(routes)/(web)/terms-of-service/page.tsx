"use client"

import Navbar from "../_common/nav-bar";

export default function TermsOfService() {
  return (
    <main className="min-h-dvh w-full bg-background text-foreground">
      <div className="w-full border-b border-border backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Navbar />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-muted-foreground mb-12">Last updated: December 9, 2024</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using Weybre AI's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              Weybre AI provides an enterprise AI platform for legal professionals, including AI assistants, document analysis, knowledge management, and workflow automation tools.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To use our services, you must:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Create an account with accurate information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be at least 18 years old or have parental consent</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Acceptable Use</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You agree not to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Use the service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt the service</li>
              <li>Upload malicious code or content</li>
              <li>Violate intellectual property rights</li>
              <li>Share your account with unauthorized users</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              You retain all rights to the content you upload. We retain all rights to our platform, software, and technology. You grant us a limited license to process your content to provide our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Subscription fees are billed in advance. You are responsible for all charges incurred under your account. Refunds are provided according to our refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance and updates that temporarily affect availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the maximum extent permitted by law, Weybre AI shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may suspend or terminate your account if you violate these terms. You may cancel your subscription at any time through your account settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify you of material changes via email or through the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms are governed by the laws of the jurisdiction in which Weybre AI operates, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms of Service, contact us at:
            </p>
            <p className="text-muted-foreground mt-4">
              Email: legal@weybre.ai<br />
              Address: 123 Legal District, Business Center, City, State 12345
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
