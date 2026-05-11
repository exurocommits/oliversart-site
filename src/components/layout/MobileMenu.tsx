"use client";

import { useEffect, useCallback } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const links = [
    { label: "Home", href: "/" },
    { label: "Aviation", href: "/aviation" },
    { label: "Motorsport", href: "/motorsport" },
    { label: "Maritime", href: "/maritime" },
    { label: "Wildlife", href: "/wildlife" },
    { label: "Latest Releases", href: "/latest-releases" },
    { label: "Artists", href: "/artists" },
  ];

  const secondaryLinks = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-surface shadow-2xl flex flex-col animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <span className="text-gold font-serif text-xl font-bold">Menu</span>
          <button onClick={onClose} className="text-text-muted hover:text-gold transition-colors" aria-label="Close menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto p-6">
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-text text-lg font-medium hover:text-gold hover:bg-surface-alt transition-colors rounded-lg px-3 py-3"
                  onClick={onClose}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-border">
            <ul className="space-y-1">
              {secondaryLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block text-text-muted text-sm hover:text-gold transition-colors px-3 py-2"
                    onClick={onClose}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
