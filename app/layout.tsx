import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Provider from "@/context/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full-Stack AI Legal Engine | Legal Research, Compliance & Case Automation",
  description:
    "AI-powered legal infrastructure used by lawyers, firms, businesses and governments. Automate research, compliance, drafting, filings, and documentation with enterprise-grade accuracy.",
  keywords: [
    "AI legal engine",
    "legal research AI",
    "AI for lawyers",
    "legal automation",
    "compliance automation",
    "law firm software",
    "legal AI India",
    "case research AI",
    "government legal tech",
  ],
  openGraph: {
    title: "AI Legal Engine – Transforming Law, Business & Governance",
    description:
      "Full-stack AI system used by lawyers, firms, and government for research, drafting, compliance, and filings.",
    url: "https://weybre.com",
    type: "website",
    siteName: "AI Legal Engine",
  },
  twitter: {
    title: "AI Legal Engine – Next-Gen Legal Intelligence",
    description:
      "Research, draft, file and automate legal work with AI used by 60K+ lawyers and 6K+ firms.",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistSans.className} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
