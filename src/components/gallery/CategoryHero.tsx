"use client";

import { Container } from "@/components/ui/Container";

interface CategoryHeroProps {
  categoryName: string;
  productCount: number;
  description?: string;
}

export function CategoryHero({ categoryName, productCount, description }: CategoryHeroProps) {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden bg-surface-alt">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />

      {/* Decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <Container className="relative">
        {/* Breadcrumb */}
        <nav className="text-text-muted text-sm mb-6 animate-fade-up" style={{ animationDelay: "0ms" }}>
          <a href="/" className="hover:text-gold transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href="/gallery" className="hover:text-gold transition-colors">Gallery</a>
          <span className="mx-2">/</span>
          <span className="text-text">{categoryName}</span>
        </nav>

        {/* Title */}
        <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold mb-3">
            <span className="text-gold">{categoryName}</span>
          </h1>
        </div>

        {/* Meta */}
        <div className="animate-fade-up" style={{ animationDelay: "200ms" }}>
          <p className="text-text-muted text-base sm:text-lg">
            {productCount} piece{productCount !== 1 ? "s" : ""} in this collection
          </p>
        </div>

        {/* Description */}
        {description && (
          <div className="animate-fade-up mt-4" style={{ animationDelay: "300ms" }}>
            <p className="text-text-muted/80 text-base max-w-2xl leading-relaxed">{description}</p>
          </div>
        )}
      </Container>
    </section>
  );
}
