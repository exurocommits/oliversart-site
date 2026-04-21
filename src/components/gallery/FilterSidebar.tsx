"use client";

export interface FilterState {
  artists: string[];
  minPrice: string;
  maxPrice: string;
  editionTypes: string[];
}

export const defaultFilters: FilterState = {
  artists: [],
  minPrice: "",
  maxPrice: "",
  editionTypes: [],
};

interface FilterSidebarProps {
  filters: FilterState;
  availableArtists: string[];
  onFilterChange: (filters: FilterState) => void;
  onClear: () => void;
}

export function FilterSidebar({ filters, availableArtists, onFilterChange, onClear }: FilterSidebarProps) {
  const hasFilters = filters.artists.length > 0 || filters.minPrice || filters.maxPrice || filters.editionTypes.length > 0;

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
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 animate-fade-in">
      <div className="bg-navy-light border border-navy-mid rounded-xl p-5 space-y-6 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-cream">Filters</h2>
          {hasFilters && (
            <button
              onClick={onClear}
              className="text-xs text-gold hover:text-gold-dim transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Artist filter */}
        <FilterGroup title="Artist">
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {availableArtists.map((artist) => (
              <label key={artist} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.artists.includes(artist)}
                  onChange={() => toggleArtist(artist)}
                  className="w-4 h-4 rounded border-navy-mid bg-navy-deep text-gold focus:ring-gold/50 focus:ring-offset-0"
                />
                <span className="text-sm text-cream-muted group-hover:text-cream transition-colors">
                  {artist}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        {/* Price range */}
        <FilterGroup title="Price Range">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
              className="w-full bg-navy-deep border border-navy-mid rounded-lg px-3 py-2 text-sm text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-gold/50"
            />
            <span className="text-cream-muted text-sm">–</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
              className="w-full bg-navy-deep border border-navy-mid rounded-lg px-3 py-2 text-sm text-cream placeholder:text-cream-muted/50 focus:outline-none focus:border-gold/50"
            />
          </div>
        </FilterGroup>

        {/* Edition type */}
        <FilterGroup title="Edition Type">
          <div className="space-y-2">
            {(["Limited", "Open", "Signed"] as const).map((type) => (
              <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.editionTypes.includes(type)}
                  onChange={() => toggleEdition(type)}
                  className="w-4 h-4 rounded border-navy-mid bg-navy-deep text-gold focus:ring-gold/50 focus:ring-offset-0"
                />
                <span className="text-sm text-cream-muted group-hover:text-cream transition-colors">
                  {type} Edition
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>
      </div>
    </aside>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-cream-muted mb-3">{title}</h3>
      {children}
    </div>
  );
}
