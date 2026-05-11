"use client";

import type { FilterState } from "./FilterSidebar";

interface ActiveFiltersProps {
  filters: FilterState;
  onRemoveArtist: (artist: string) => void;
  onRemoveEdition: (type: string) => void;
  onClear: () => void;
}

export function ActiveFilters({ filters, onRemoveArtist, onRemoveEdition, onClear }: ActiveFiltersProps) {
  const pills: { key: string; label: string; onRemove: () => void }[] = [];

  filters.artists.forEach((artist) => {
    pills.push({ key: `artist-${artist}`, label: artist, onRemove: () => onRemoveArtist(artist) });
  });

  filters.editionTypes.forEach((type) => {
    pills.push({ key: `edition-${type}`, label: `${type} Edition`, onRemove: () => onRemoveEdition(type) });
  });

  if (filters.minPrice) {
    pills.push({
      key: "min-price",
      label: `Min £${filters.minPrice}`,
      onRemove: () => onRemoveEdition(""),
    });
  }

  if (pills.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 animate-fade-in">
      {pills.map((pill) => (
        <button
          key={pill.key}
          onClick={pill.onRemove}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface border border-border rounded-full text-xs text-text-muted hover:text-text hover:border-gold/50 transition-colors"
        >
          {pill.label}
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ))}
      <button onClick={onClear} className="text-xs text-gold hover:text-gold-dim transition-colors ml-1">
        Clear all
      </button>
    </div>
  );
}
