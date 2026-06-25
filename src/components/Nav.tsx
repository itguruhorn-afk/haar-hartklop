"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavProps {
  settings: {
    brandName: string;
    logoUrl: string | null;
  } | null;
}

const navLinks = [
  { href: "/", label: "Tuis" },
  { href: "/virtuele-bybelstudie", label: "Virtuele Bybelstudie" },
  { href: "/gebeurtenisse", label: "Gebeurtenisse" },
  { href: "/verlossing", label: "Verlossing" },
  { href: "/vennoot", label: "Vennoot" },
  { href: "/winkel", label: "Winkel" },
  { href: "/kontak", label: "Kontak" },
];

export function Nav({ settings }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-cream">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            {settings?.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt={settings.brandName}
                className="h-10 w-auto"
              />
            ) : (
              <span className="font-heading text-2xl md:text-3xl text-brand-red font-bold tracking-tight">
                ♡ {settings?.brandName || "Haar Hartklop"}
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-brand-red bg-brand-blush"
                    : "text-brand-ink hover:text-brand-red hover:bg-brand-cream/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-brand-ink hover:text-brand-red"
            aria-label={mobileOpen ? "Maak spyskaart toe" : "Maak spyskaart oop"}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-brand-cream pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  pathname === link.href
                    ? "text-brand-red bg-brand-blush"
                    : "text-brand-ink hover:text-brand-red hover:bg-brand-cream/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
