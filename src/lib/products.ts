import type { Product } from "@/types/product";
import scrapedData from "@/data/scraped-products.json";

interface ScrapedProduct {
  title: string;
  slug: string;
  artist: string;
  category: string;
  subcategory: string | null;
  price: number;
  maxPrice?: number;
  description: string;
  editionInfo: string;
  editionSize?: number;
  url: string;
  inStock: boolean;
}

const scraped = (scrapedData.products ?? []) as ScrapedProduct[];

function makeId(slug: string): string {
  return `scraped-${slug}`;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function mapCategory(cat: string): string {
  const map: Record<string, string> = {
    aviation: "cat-aviation",
    motorsport: "cat-motorsport",
    maritime: "cat-maritime",
  };
  return map[cat.toLowerCase()] ?? "cat-aviation";
}

function mapArtistId(artist: string): string {
  return `artist-${slugify(artist)}`;
}

export function getAllProducts(): Product[] {
  return scraped.map((sp, index) => {
    const id = makeId(sp.slug);
    const isFeatured = index < 12;
    const isNew = index < 6;

    return {
      id,
      slug: sp.slug,
      title: sp.title,
      artistId: mapArtistId(sp.artist),
      categoryId: mapCategory(sp.category),
      price: sp.price * 100, // store as pence
      salePrice: undefined, // maxPrice is a higher tier, not a discount
      currency: "GBP",
      editionType: "limited" as const,
      editionSize: sp.editionSize,
      isSigned: true,
      isNumbered: true,
      images: [
        {
          id: `${id}-img-1`,
          url: "/images/placeholder.jpg",
          alt: sp.title,
          width: 800,
          height: 600,
          isPrimary: true,
          sortOrder: 1,
        },
      ],
      primaryImageId: `${id}-img-1`,
      description: sp.description || sp.title,
      shortDescription: sp.description
        ? sp.description.length > 120
          ? sp.description.slice(0, 120) + "…"
          : sp.description
        : sp.title,
      status: "active" as const,
      inStock: sp.inStock,
      isFeatured,
      isNew,
      createdAt: new Date("2026-04-10"),
      updatedAt: new Date("2026-04-10"),
    };
  });
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  const catId = `cat-${categorySlug}`;
  return getAllProducts().filter((p) => p.categoryId === catId);
}

export function getLatestProducts(limit = 8): Product[] {
  return getAllProducts().slice(0, limit);
}
