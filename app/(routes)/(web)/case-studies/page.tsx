"use client"

import Navbar from "../_common/nav-bar";
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const caseStudies = [
  {
    title: "Top Tier Law Firm Reduces Contract Review Time by 70%",
    industry: "Corporate Law",
    firmSize: "500+ lawyers",
    challenge: "High-volume contract review was creating bottlenecks and delaying client deliverables.",
    solution: "Implemented Weybre AI's Workflows module for automated contract analysis and drafting.",
    results: [
      "70% reduction in contract review time",
      "3x increase in contract throughput",
      "95% accuracy in identifying key clauses",
      "$2M+ annual cost savings"
    ],
    quote: "Weybre AI transformed our contract review process. It's like having a partner who never sleeps.",
    author: "Managing Partner"
  },
  {
    title: "Mid-Size Firm Scales Due Diligence Operations",
    industry: "M&A and Transactions",
    firmSize: "50-200 lawyers",
    challenge: "Manual due diligence processes limited the firm's ability to take on larger deals.",
    solution: "Deployed Weybre AI's Vault and Knowledge modules for document analysis and research.",
    results: [
      "5x increase in document processing capacity",
      "60% faster due diligence completion",
      "Ability to handle 3x more concurrent deals",
      "Improved client satisfaction scores"
    ],
    quote: "We can now compete for deals that were previously out of reach. Weybre AI gave us enterprise capabilities.",
    author: "Senior Partner, M&A Practice"
  },
  {
    title: "In-House Legal Team Automates Compliance Workflows",
    industry: "Financial Services",
    firmSize: "Enterprise Legal Department",
    challenge: "Keeping up with regulatory changes across multiple jurisdictions was overwhelming.",
    solution: "Integrated Weybre AI's Assistant and Knowledge modules for compliance monitoring and reporting.",
    results: [
      "80% reduction in compliance research time",
      "Real-time regulatory change alerts",
      "Automated compliance report generation",
      "Zero compliance violations in 18 months"
    ],
    quote: "Weybre AI keeps us ahead of regulatory changes. It's an essential part of our compliance infrastructure.",
    author: "General Counsel"
  }
];

export default function CaseStudies() {
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
            Success Stories
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how leading law firms and legal departments are transforming their workflows with Weybre AI.
          </p>
        </div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <article key={index} className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {study.industry}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground text-sm font-medium rounded-full">
                  {study.firmSize}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {study.title}
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-lg font-bold mb-3">Challenge</h3>
                  <p className="text-muted-foreground">
                    {study.challenge}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-3">Solution</h3>
                  <p className="text-muted-foreground">
                    {study.solution}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Results</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {study.results.map((result, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <ArrowRightIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{result}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-lg">
                <p className="text-lg italic mb-3">"{study.quote}"</p>
                <p className="text-sm font-semibold">— {study.author}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <section className="text-center py-16 mt-20 bg-muted/30 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to transform your workflows?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join 100+ leading law firms using Weybre AI.
          </p>
          <a
            href="/book-demo"
            className="inline-block px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
          >
            Request a Demo
          </a>
        </section>
      </div>
    </main>
  );
}
