"use client"

import Navbar from "../_common/nav-bar";
import { 
  ShieldCheckIcon, 
  LockClosedIcon, 
  ServerIcon, 
  DocumentCheckIcon,
  KeyIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

export default function Security() {
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
          <ShieldCheckIcon className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Enterprise-Grade Security
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your data security and privacy are our top priorities. Weybre AI is built with enterprise-grade security and compliance at its core.
          </p>
        </div>

        {/* Security Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Security & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <LockClosedIcon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">End-to-End Encryption</h3>
              <p className="text-muted-foreground">
                All data is encrypted in transit (TLS 1.3) and at rest (AES-256) to ensure maximum security.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <EyeSlashIcon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Zero Data Training</h3>
              <p className="text-muted-foreground">
                Your sensitive data is never used to train our AI models. Complete data isolation guaranteed.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <ServerIcon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Secure Infrastructure</h3>
              <p className="text-muted-foreground">
                Hosted on enterprise-grade cloud infrastructure with 99.9% uptime SLA and redundant backups.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <KeyIcon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Access Controls</h3>
              <p className="text-muted-foreground">
                Role-based access control (RBAC), SSO, and multi-factor authentication (MFA) support.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <DocumentCheckIcon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Audit Logs</h3>
              <p className="text-muted-foreground">
                Comprehensive audit trails for all user activities and data access for compliance tracking.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <ShieldCheckIcon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-3">Regular Audits</h3>
              <p className="text-muted-foreground">
                Regular third-party security audits and penetration testing to ensure ongoing protection.
              </p>
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Security Standards</h2>
          <div className="bg-card border border-border rounded-2xl p-12">
            <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
              We align our security program with leading industry standards including SOC 2 Type II and ISO 27001, implementing the controls those frameworks require. We follow GDPR and CCPA privacy principles.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">SOC 2</div>
                <p className="text-muted-foreground">Controls Aligned</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">ISO 27001</div>
                <p className="text-muted-foreground">Standards Aligned</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">GDPR</div>
                <p className="text-muted-foreground">Privacy Compliant</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Privacy */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Data Privacy Commitment</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                At Weybre AI, we understand that legal professionals handle some of the most sensitive information. That's why we've built our platform with privacy-first principles:
              </p>
              <ul className="space-y-3 list-disc list-inside">
                <li>Your data belongs to you—we never claim ownership or rights to your content</li>
                <li>We never use your data to train AI models or improve our services</li>
                <li>Data is stored in secure, isolated environments with strict access controls</li>
                <li>You can export or delete your data at any time</li>
                <li>We comply with global data protection regulations including GDPR, CCPA, and more</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Enterprise Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Enterprise Security Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Single Sign-On (SSO)</h3>
              <p className="text-muted-foreground">
                Integrate with your existing identity provider (SAML 2.0, OAuth 2.0)
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Custom Data Retention</h3>
              <p className="text-muted-foreground">
                Configure data retention policies to meet your compliance requirements
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">IP Whitelisting</h3>
              <p className="text-muted-foreground">
                Restrict access to specific IP addresses or ranges
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Dedicated Instances</h3>
              <p className="text-muted-foreground">
                Private cloud deployments for maximum isolation and control
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-muted/30 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Questions about security?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our security team is here to answer your questions.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            Contact Security Team
          </a>
        </section>
      </div>
    </main>
  );
}
