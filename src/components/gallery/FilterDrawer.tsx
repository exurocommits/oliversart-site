"use client";

import { useEffect } from "react";
import type { FilterState } from "./FilterSidebar";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  availableArtists: string[];
  onFilterChange: (filters: FilterState) => void;
  onClear: () => void;
  resultCount: number;
}

export function FilterDrawer({ isOpen, onClose, filters, availableArtists, onFilterChange, onClear, resultCount }: FilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  const toggleArtist = (artist: string) => {
    onFilterChange({
      ...filters,
      artists: filters.artists.includes(artist)
        ? filters.artists.filter((a) => a !== artist)
        : [...filters.artists, artist],
    });
  };

  const toggleEdition = (type: string) => {
    onFilterChange({
      ...filters,
      editionTypes: filters.editionTypes.includes(type)
        ? filters.editionTypes.filter((t) => t !== type)
        : [...filters.editionTypes, type],
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden rounded-t-2xl bg-surface border-t border-border max-h-[85vh] overflow-y-auto animate-slide-up">
        {/* Handle bar */}
        <div className="sticky top-0 bg-surface pt-3 pb-2 px-5 border-b border-border z-10">
          <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-lg font-bold text-text">Filters</h2>
              <p className="text-text-muted text-xs mt-0.5">{resultCount} result{resultCount !== 1 ? "s" : ""}</p>
            </div>
            <div className="flex items-center gap-3">
              {(filters.artists.length > 0 || filters.minPrice || filters.maxPrice || filters.editionTypes.length > 0) && (
                <button onClick={onClear} className="text-xs text-gold hover:text-gold-dim transition-colors">
                  Clear All
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-alt text-text-muted hover:text-text transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-6">
          {/* Artist */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Artist</h3>
            <div className="space-y-3">
              {availableArtists.map((artist) => (
                <label key={artist} className="flex items-center gap-3 cursor-pointer py-1">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      filters.artists.includes(artist)
                        ? "bg-gold border-gold"
                        : "border-border bg-surface"
                    }`}
                  >
                    {filters.artists.includes(artist) && (
                      <svg className="w-3 h-3 text-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-text">{artist}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price range */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Price Range</h3>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min £"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-gold/50"
              />
              <span className="text-text-muted">–</span>
              <input
                type="number"
                placeholder="Max £"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
                className="w-full bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-gold/50"
              />
            </div>
          </div>

          {/* Edition type */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Edition Type</h3>
            <div className="space-y-3">
              {(["Limited", "Open", "Signed"] as const).map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer py-1">
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                      filters.editionTypes.includes(type)
                        ? "bg-gold border-gold"
                        : "border-border bg-surface"
                    }`}
                  >
                    {filters.editionTypes.includes(type) && (
                      <svg className="w-3 h-3 text-surface" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-text">{type} Edition</span>
                </label>
              ))}
            </div>
          </div>

          {/* Apply button */}
          <button
            onClick={onClose}
            className="w-full bg-gold text-surface font-semibold py-3 rounded-lg hover:bg-gold-dim transition-colors"
          >
            Show {resultCount} Result{resultCount !== 1 ? "s" : ""}
          </button>
        </div>
      </div>
    </>
  );
}
