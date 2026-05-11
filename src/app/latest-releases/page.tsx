"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getAllProducts, getLatestProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import Link from "next/link";

type SortOption = "newest" | "price-asc" | "price-desc" | "title";

export default function LatestReleasesPage() {
  const allProducts = useMemo(() => getAllProducts(), []);
  const categories = useMemo(() => getAllCategories(), []);
  const latest = useMemo(() => {
    const flagged = allProducts.filter((p) => p.isNew);
    return flagged.length >= 6 ? flagged : allProducts.slice(0, 20);
  }, [allProducts]);

  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    let result = [...latest];
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.categoryId === `cat-${categoryFilter}`);
    }
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return result;
  }, [latest, sortBy, categoryFilter]);

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <nav className="text-text-muted text-sm mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-text">Latest Releases</span>
            </nav>
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-2">New Arrivals</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text mb-4">
              Latest <span className="text-gold">Releases</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              The newest additions to our collection — fresh off the press and ready to become part of your collection.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Filters & Grid */}
      <section className="py-16">
        <Container>
          {/* Filter bar */}
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Category filter */}
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-surface border border-border rounded-lg px-4 py-2.5 text-text text-sm focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="all">All Categories</option>
                  {categories
                    .filter((c) => ["aviation", "motorsport", "maritime"].includes(c.slug))
                    .map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>
              {/* Sort */}
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wide mb-1.5">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-surface border border-border rounded-lg px-4 py-2.5 text-text text-sm focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="title">Title: A–Z</option>
                </select>
              </div>
              {/* Count */}
              <div className="sm:ml-auto flex items-end">
                <p className="text-text-muted text-sm pb-2.5">
                  Showing {filtered.length} {filtered.length === 1 ? "print" : "prints"}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Grid */}
          {filtered.length > 0 ? (
            <ScrollReveal>
              <ProductGrid products={filtered} columns={4} />
            </ScrollReveal>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg mb-4">
                No prints found matching your filters.
              </p>
              <button
                onClick={() => {
                  setCategoryFilter("all");
                  setSortBy("newest");
                }}
                className="text-gold hover:text-gold-dim transition-colors font-semibold"
              >
                Clear Filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
