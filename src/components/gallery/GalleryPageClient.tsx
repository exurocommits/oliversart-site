"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CategoryHero } from "@/components/gallery/CategoryHero";
import { FilterSidebar, defaultFilters, type FilterState } from "@/components/gallery/FilterSidebar";
import { FilterDrawer } from "@/components/gallery/FilterDrawer";
import { SortDropdown, type SortOption } from "@/components/gallery/SortDropdown";
import { ActiveFilters } from "@/components/gallery/ActiveFilters";
import type { Product } from "@/types/product";

interface GalleryPageClientProps {
  categorySlug: string;
  categoryName: string;
  categoryDescription?: string;
  products: Product[];
}

export function GalleryPageClient({
  categorySlug,
  categoryName,
  categoryDescription,
  products: initialProducts,
}: GalleryPageClientProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("newest");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const availableArtists = useMemo(
    () => [...new Set(initialProducts.map((p) => {
      const name = p.title.includes(" by ") ? p.title.split(" by ").slice(1).join(" by ") : "";
      return name || "Unknown";
    }))].filter(Boolean).sort(),
    [initialProducts]
  );

  const filtered = useMemo(() => {
    let result = [...initialProducts];

    if (filters.artists.length > 0) {
      result = result.filter((p) => {
        const name = p.title.includes(" by ") ? p.title.split(" by ").slice(1).join(" by ") : "";
        return filters.artists.some((a) => name.includes(a));
      });
    }

    if (filters.minPrice) {
      result = result.filter((p) => p.price >= parseInt(filters.minPrice) * 100);
    }
    if (filters.maxPrice) {
      result = result.filter((p) => p.price <= parseInt(filters.maxPrice) * 100);
    }

    if (filters.editionTypes.length > 0) {
      result = result.filter((p) => {
        const matches: boolean[] = [];
        if (filters.editionTypes.includes("Limited")) matches.push(p.editionType === "limited");
        if (filters.editionTypes.includes("Open")) matches.push(p.editionType === "open");
        if (filters.editionTypes.includes("Signed")) matches.push(p.isSigned);
        return matches.some(Boolean);
      });
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "name-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }, [initialProducts, filters, sort]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleRemoveArtist = (artist: string) => {
    setFilters({ ...filters, artists: filters.artists.filter((a) => a !== artist) });
  };

  const handleRemoveEdition = (type: string) => {
    if (!type) {
      setFilters({ ...filters, minPrice: "", maxPrice: "" });
    } else {
      setFilters({ ...filters, editionTypes: filters.editionTypes.filter((t) => t !== type) });
    }
  };

  return (
    <main>
      <CategoryHero
        categoryName={categoryName}
        productCount={filtered.length}
        description={categoryDescription}
      />

      <section className="py-8 sm:py-12">
        <Container>
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 text-sm text-text hover:border-gold/50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
              <p className="text-text-muted text-sm">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
            </div>
            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {/* Active filter pills */}
          <div className="mb-6">
            <ActiveFilters
              filters={filters}
              onRemoveArtist={handleRemoveArtist}
              onRemoveEdition={handleRemoveEdition}
              onClear={() => setFilters(defaultFilters)}
            />
          </div>

          {/* Layout */}
          <div className="flex gap-8">
            <div className="hidden lg:block">
              <FilterSidebar
                filters={filters}
                availableArtists={availableArtists}
                onFilterChange={setFilters}
                onClear={() => setFilters(defaultFilters)}
              />
            </div>

            <div className="flex-1 min-w-0">
              {visible.length > 0 ? (
                <>
                  <ProductGrid products={visible} columns={3} />

                  {hasMore && (
                    <div className="mt-10 text-center">
                      <button
                        onClick={() => setVisibleCount((c) => c + 12)}
                        className="inline-flex items-center gap-2 bg-surface border border-border rounded-lg px-6 py-3 text-sm font-semibold text-gold hover:border-gold/50 hover:bg-surface-alt transition-all"
                      >
                        Load More
                        <span className="text-text-muted text-xs">({filtered.length - visibleCount} remaining)</span>
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20 animate-fade-in">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface-alt flex items-center justify-center">
                    <svg className="w-10 h-10 text-text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl font-bold text-text mb-2">No pieces found</h3>
                  <p className="text-text-muted text-sm mb-6 max-w-sm mx-auto">
                    Try adjusting your filters or clearing them to see all available pieces.
                  </p>
                  <button
                    onClick={() => setFilters(defaultFilters)}
                    className="text-gold hover:text-gold-dim text-sm font-semibold transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      <FilterDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        availableArtists={availableArtists}
        onFilterChange={setFilters}
        onClear={() => setFilters(defaultFilters)}
        resultCount={filtered.length}
      />
    </main>
  );
}
