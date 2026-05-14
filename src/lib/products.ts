import type { Product } from "@/types/product";
import scrapedData from "@/data/scraped-products.json";

interface ScrapedProduct {
  title: string;
  slug: string;
  artist: string;
  category: string;
  subcategory: string | null;
  price: number | null;
  maxPrice?: number;
  originalPrice?: number | null;
  description: string;
  editionInfo: string;
  editionSize?: number;
  url: string;
  inStock: boolean;
  images?: string[];
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

// Generate a realistic remaining count based on edition size
function generateRemaining(editionSize?: number, inStock?: boolean): number {
  if (!inStock) return 0;
  if (!editionSize) return Math.floor(Math.random() * 20) + 5;
  // Older/larger editions have fewer remaining
  const ratio = 0.05 + Math.random() * 0.25;
  const remaining = Math.max(1, Math.floor(editionSize * ratio));
  return remaining;
}

export function getAllProducts(): Product[] {
  return scraped.map((sp, index) => {
    const id = makeId(sp.slug);
    const isFeatured = index < 12;
    const isNew = index < 6;
    const hasImages = sp.images && sp.images.length > 0;
    const price = sp.price != null ? sp.price * 100 : 0; // store as pence
    const salePrice = sp.originalPrice && sp.price && sp.originalPrice > sp.price
      ? price
      : undefined;
    const displayPrice = sp.originalPrice && sp.price && sp.originalPrice > sp.price
      ? sp.originalPrice * 100
      : price;

    return {
      id,
      slug: sp.slug,
      title: sp.title,
      artistId: mapArtistId(sp.artist),
      categoryId: mapCategory(sp.category),
      price: displayPrice,
      salePrice,
      currency: "GBP",
      editionType: "limited" as const,
      editionSize: sp.editionSize,
      editionRemaining: generateRemaining(sp.editionSize, sp.inStock),
      isSigned: true,
      isNumbered: true,
      images: hasImages
        ? sp.images!.map((url, i) => ({
            id: `${id}-img-${i + 1}`,
            url,
            alt: `${sp.title} by ${sp.artist}`,
            width: 800,
            height: 600,
            isPrimary: i === 0,
            sortOrder: i + 1,
          }))
        : [{
            id: `${id}-img-1`,
            url: "https://i0.wp.com/oliversart.com/wp-content/uploads/2019/12/0061_D-DAY_NORMANDY_LANDINGS.jpg?fit=500%2C329&ssl=1",
            alt: sp.title,
            width: 800,
            height: 600,
            isPrimary: true,
            sortOrder: 1,
          }],
      primaryImageId: `${id}-img-1`,
      description: sp.description || `${sp.title} by ${sp.artist}. A fine art limited edition print from Oliver's Art.`,
      shortDescription: sp.description
        ? sp.description.length > 120
          ? sp.description.slice(0, 120) + "…"
          : sp.description
        : `${sp.title} — limited edition art by ${sp.artist}.`,
      specifications: sp.editionInfo ? { editionInfo: sp.editionInfo } : undefined,
      status: "active" as const,
      inStock: sp.inStock,
      stockLevel: sp.inStock ? generateRemaining(sp.editionSize, sp.inStock) : 0,
      isFeatured,
      isNew,
      metaTitle: `${sp.title} by ${sp.artist} — Oliver's Art`,
      metaDescription: sp.description
        ? sp.description.slice(0, 160)
        : `Buy ${sp.title} by ${sp.artist}. Hand-signed limited edition print from Oliver's Art.`,
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

export function getProductsByArtistId(artistId: string): Product[] {
  return getAllProducts().filter((p) => p.artistId === artistId);
}
