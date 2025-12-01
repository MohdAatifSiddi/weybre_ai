"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";

interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "#product", label: "Product" },
  { href: "#solutions", label: "Solutions" },
  { href: "#pricing", label: "Pricing" },
  { href: "#enterprise", label: "Enterprise" },
];

function Navbar() {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  // Detect active hash for in-page sections
  useEffect(() => {
    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    setActiveHash(window.location.hash);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Polyfill smooth scrolling for older browsers
  useEffect(() => {
    if (!("scrollBehavior" in document.documentElement.style)) {
      (document.documentElement.style as any).scrollBehavior = "smooth";
    }
  }, []);

  const isActive = (href: string) => {
    if (href.startsWith("/")) return pathname === href;
    return activeHash === href;
  };

  return (
    <header className="bg-background/90 backdrop-blur-md sticky top-0 z-50">
      <nav
        className={cn(
          "mx-auto flex items-center justify-between px-6 py-4",
          "max-w-7xl"
        )}
        aria-label="Primary"
      >
        <Logo url="/" />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-10 text-sm font-medium text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "hover:text-primary transition",
                  isActive(link.href) && "text-primary border-b-2 border-primary"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-muted-foreground hover:text-foreground transition"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/sign-in"
            className="text-muted-foreground hover:text-foreground transition"
            rel="noopener noreferrer"
          >
            Login
          </Link>
          <Link
            href="/book-demo"
            className="flex items-center gap-1 px-4 py-2 rounded-lg border border-border hover:border-foreground transition text-foreground text-sm"
            rel="noopener noreferrer"
          >
            Book Demo
          </Link>
          <Link
            href="/auth/sign-up"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition text-sm"
            rel="noopener noreferrer"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-background/95 border-t border-border animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-4 px-6 py-4 text-sm font-medium text-muted-foreground">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "hover:text-primary transition block py-2",
                    isActive(link.href) && "text-primary"
                  )}
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-border">
              <Link
                href="/auth/sign-in"
                className="block py-2 text-muted-foreground hover:text-foreground transition"
                onClick={() => setIsMobileOpen(false)}
                rel="noopener noreferrer"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/book-demo"
                className="block py-2 hover:text-primary transition"
                onClick={() => setIsMobileOpen(false)}
                rel="noopener noreferrer"
              >
                Book Demo
              </Link>
            </li>
            <li>
              <Link
                href="/auth/sign-up"
                className="flex items-center justify-start gap-2 py-2 text-primary font-semibold"
                onClick={() => setIsMobileOpen(false)}
                rel="noopener noreferrer"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;