import type { Artist } from "@/types/product";
import scrapedData from "@/data/scraped-artists.json";

interface ScrapedArtist {
  name: string;
  slug: string;
  category: string;
  categoryUrl?: string;
  description?: string;
}

interface ScrapedArtistData {
  artists: ScrapedArtist[];
}

const raw = (scrapedData as unknown as ScrapedArtistData).artists ?? [];

export function getAllArtists(): Artist[] {
  return raw.map((a) => ({
    id: `artist-${a.slug}`,
    slug: a.slug,
    name: a.name,
    bio: a.description || `Artist specialising in ${a.category.toLowerCase()} art.`,
    shortBio: a.description
      ? a.description.length > 100
        ? a.description.slice(0, 100) + "…"
        : a.description
      : `${a.category} artist`,
    isActive: true,
    isFeatured: ["Robert Taylor", "Nicolas Trudgian", "Richard Taylor", "Keith Burns", "James Dietz"].includes(a.name),
    createdAt: new Date("2026-04-10"),
    updatedAt: new Date("2026-04-10"),
  }));
}

export function getArtistBySlug(slug: string): Artist | undefined {
  return getAllArtists().find((a) => a.slug === slug);
}
