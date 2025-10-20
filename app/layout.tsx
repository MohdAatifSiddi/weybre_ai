import type { Metadata } from "next";
import {  Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/context/providers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weybre AI",
  description: "Weybre AI is an advanced legal intelligence system engineered for precision, speed, and strategic clarity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${geistMono.className} antialiased`}
      >
      <Providers>{children}</Providers>
      </body>
    </html>
  );
}
