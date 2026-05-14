import type { Category } from "@/types/product";
import scrapedData from "@/data/scraped-categories.json";

interface ScrapedCategory {
  name: string;
  slug: string;
  url?: string;
  count?: number;
  subcategories?: ScrapedCategory[];
  artist?: boolean;
}

interface ScrapedCategoryData {
  categories: ScrapedCategory[];
}

const raw = (scrapedData as unknown as ScrapedCategoryData).categories ?? [];

function mapSubcategories(subs: ScrapedCategory[]): Category[] {
  return subs.map((sub) => ({
    id: `cat-${sub.slug}`,
    slug: sub.slug,
    name: sub.name,
    description: "",
    parentId: undefined,
    icon: undefined,
    image: undefined,
    sortOrder: 0,
    showInNav: false,
    showInFooter: false,
    createdAt: new Date("2026-04-10"),
    updatedAt: new Date("2026-04-10"),
  }));
}

export function getAllCategories(): Category[] {
  return raw.map((cat, i) => ({
    id: `cat-${cat.slug}`,
    slug: cat.slug,
    name: cat.name,
    description: `Browse our ${cat.name.toLowerCase()} collection of limited edition prints.`,
    sortOrder: i + 1,
    showInNav: ["aviation", "motorsport", "maritime", "contemporary-art"].includes(cat.slug),
    showInFooter: ["aviation", "motorsport", "maritime"].includes(cat.slug),
    subcategories: cat.subcategories ? mapSubcategories(cat.subcategories) : undefined,
    createdAt: new Date("2026-04-10"),
    updatedAt: new Date("2026-04-10"),
  }));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getAllCategories().find((c) => c.slug === slug);
}
