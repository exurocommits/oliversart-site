"use client";

import { useEffect, useState, useCallback } from "react";

interface HeaderProps {
  transparent?: boolean;
  showCartBadge?: boolean;
  cartItemCount?: number;
}

export function Header({ transparent = false, showCartBadge = true, cartItemCount = 0 }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const bg = transparent && !scrolled
    ? "bg-transparent"
    : "bg-surface/90 backdrop-blur-md border-b border-border";

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${bg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Oliver's Art"
                className="h-10 lg:h-12 w-auto"
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {["Aviation", "Motorsport", "Maritime", "Contemporary Art"].map((item) => (
                <a
                  key={item}
                  href={`/gallery/${item === "Contemporary Art" ? "contemporary-art" : item.toLowerCase()}`}
                  className="text-text-muted hover:text-gold transition-colors text-sm font-medium uppercase tracking-wider"
                >
                  {item}
                </a>
              ))}
              <a href="/latest-releases" className="text-text-muted hover:text-gold transition-colors text-sm font-medium uppercase tracking-wider">
                Latest Releases
              </a>
              <a href="/artists" className="text-text-muted hover:text-gold transition-colors text-sm font-medium uppercase tracking-wider">
                Artists
              </a>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <a href="/search" className="text-text-muted hover:text-gold transition-colors" aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </a>
              <a href="/cart" className="relative text-text-muted hover:text-gold transition-colors" aria-label="Cart">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {showCartBadge && cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gold text-surface text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden text-text-muted hover:text-gold transition-colors"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <MobileMenuOverlay onClose={() => setMobileOpen(false)} />
      )}
    </>
  );
}

function MobileMenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-surface shadow-2xl p-6 flex flex-col">
        <button onClick={onClose} className="self-end text-text-muted hover:text-gold mb-8" aria-label="Close menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="flex flex-col gap-4">
          {[
            { name: "Aviation", href: "/gallery/aviation" },
            { name: "Motorsport", href: "/gallery/motorsport" },
            { name: "Maritime", href: "/gallery/maritime" },
            { name: "Contemporary Art", href: "/gallery/contemporary-art" },
            { name: "Latest Releases", href: "/latest-releases" },
            { name: "Artists", href: "/artists" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-text text-lg font-medium hover:text-gold transition-colors py-2 border-b border-border"
              onClick={onClose}
            >
              {item.name}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <a href="/about" className="text-text-muted hover:text-gold transition-colors" onClick={onClose}>About</a>
          <a href="/contact" className="text-text-muted hover:text-gold transition-colors" onClick={onClose}>Contact</a>
          <a href="/faqs" className="text-text-muted hover:text-gold transition-colors" onClick={onClose}>FAQs</a>
          <a href="/shipping-returns" className="text-text-muted hover:text-gold transition-colors" onClick={onClose}>Shipping & Returns</a>
        </div>
      </div>
    </div>
  );
}
