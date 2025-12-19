"use client"

import Navbar from "../_common/nav-bar";
import { ShieldCheckIcon, DocumentCheckIcon, LockClosedIcon } from '@heroicons/react/24/outline';

export default function Compliance() {
  return (
    <main className="min-h-dvh w-full bg-background text-foreground">
      <div className="w-full border-b border-border backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Navbar />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Compliance & Certifications
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Weybre AI maintains the highest standards of compliance and security to protect your data and meet regulatory requirements.
          </p>
        </div>

        {/* Security Program */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Security Program</h2>
          <div className="bg-card border border-border rounded-2xl p-8 mb-8">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Weybre AI treats data protection as mission-critical. We align our security program with leading industry standards (SOC 2 Type II and ISO 27001) and apply the controls those standards require. While formal third-party certificates are in progress, we maintain comprehensive security protections today.
            </p>
            <p className="text-sm text-muted-foreground italic">
              Independent audit reports and certificates will be published once obtained. For due diligence, request our security summary and operational controls documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <ShieldCheckIcon className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">SOC 2 Type II</h3>
              <p className="text-muted-foreground">
                Controls aligned with security, availability, and confidentiality standards
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <LockClosedIcon className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">ISO 27001</h3>
              <p className="text-muted-foreground">
                Information security management system (ISMS) controls implemented
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <DocumentCheckIcon className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">GDPR & CCPA</h3>
              <p className="text-muted-foreground">
                Privacy principles followed with DPAs available on request
              </p>
            </div>
          </div>
        </section>

        {/* Compliance Standards */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Compliance Standards</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">GDPR (General Data Protection Regulation)</h3>
              <p className="text-muted-foreground">
                We comply with all GDPR requirements including data subject rights, data processing agreements, and cross-border data transfer mechanisms.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">CCPA (California Consumer Privacy Act)</h3>
              <p className="text-muted-foreground">
                We honor all CCPA rights including the right to know, delete, and opt-out of the sale of personal information.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">HIPAA (Health Insurance Portability and Accountability Act)</h3>
              <p className="text-muted-foreground">
                For healthcare-related legal work, Business Associate Agreements (BAAs) are available on request for eligible customers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">Payment Security</h3>
              <p className="text-muted-foreground">
                All payment processing is handled through PCI DSS Level 1 certified payment processors.
              </p>
            </div>
          </div>
        </section>

        {/* Data Protection */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Data Protection Measures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Encryption</h3>
              <p className="text-muted-foreground text-sm">
                AES-256 encryption at rest, TLS 1.3 in transit
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Access Controls</h3>
              <p className="text-muted-foreground text-sm">
                Role-based access control (RBAC) and multi-factor authentication
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Data Residency</h3>
              <p className="text-muted-foreground text-sm">
                Choose where your data is stored to meet local requirements
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Audit Logs</h3>
              <p className="text-muted-foreground text-sm">
                Comprehensive logging of all data access and modifications
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Data Backup</h3>
              <p className="text-muted-foreground text-sm">
                Automated daily backups with point-in-time recovery
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-2">Incident Response</h3>
              <p className="text-muted-foreground text-sm">
                24/7 security monitoring and incident response team
              </p>
            </div>
          </div>
        </section>

        {/* Compliance Documentation */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8">Available Documentation</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground mb-6">
              We provide comprehensive documentation to support your due diligence and audit requirements:
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Security summary and whitepaper</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Data Processing Agreements (DPAs)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Business Associate Agreements (BAAs) for eligible customers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Security questionnaires and assessments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Penetration test summaries (available under NDA)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>System architecture and data-flow overview</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground italic mt-6">
              SOC 2 Type II reports and ISO 27001 certificates will be available once independent audits are completed.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 bg-muted/30 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Need compliance documentation?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contact our compliance team to request reports and certificates.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            Contact Compliance Team
          </a>
        </section>
      </div>
    </main>
  );
}
