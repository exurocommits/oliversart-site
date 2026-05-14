import Link from "next/link";
import type { Product } from "@/types/product";
import { Price } from "./Price";
import { Badge } from "@/components/ui/Badge";
import { getAllArtists } from "@/lib/artists";

interface ProductCardProps {
  product: Product;
}

// Build a lookup map for artist names (computed once at module level)
let _artistMap: Map<string, string> | null = null;

function getArtistName(artistId: string): string {
  if (!_artistMap) {
    _artistMap = new Map<string, string>();
    for (const artist of getAllArtists()) {
      _artistMap.set(artist.id, artist.name);
    }
  }
  return _artistMap.get(artistId) ?? "Unknown Artist";
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const artistName = getArtistName(product.artistId);

  return (
    <div className="group bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold/10 hover:border-gold/40 hover:-translate-y-1">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-surface-alt">
        <img
          src={primaryImage?.url || "https://i0.wp.com/oliversart.com/wp-content/uploads/2019/12/0061_D-DAY_NORMANDY_LANDINGS.jpg?fit=500%2C329&ssl=1"}
          alt={primaryImage?.alt || product.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && <Badge variant="new" />}
          {product.salePrice && <Badge variant="sale" />}
          {!product.inStock && <Badge variant="sold-out" />}
          {product.inStock && product.editionRemaining && product.editionRemaining <= 5 && (
            <Badge variant="low-stock" count={product.editionRemaining} />
          )}
        </div>
        {product.isSigned && (
          <div className="absolute top-3 right-3 bg-surface/90 backdrop-blur-sm text-gold text-xs px-2.5 py-1 rounded-full font-medium border border-gold/20">
            ✓ Signed
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif font-bold text-text group-hover:text-gold transition-colors line-clamp-1 text-base">
            {product.title}
          </h3>
        </Link>
        <p className="text-text-muted text-sm mt-1">{artistName}</p>
        <div className="mt-3">
          <Price price={product.price} salePrice={product.salePrice} size="sm" />
        </div>
        {product.editionType === "limited" && product.editionSize && product.editionRemaining !== undefined && (
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1 bg-surface-alt rounded-full overflow-hidden">
              <div
                className="h-full bg-gold/40 rounded-full transition-all"
                style={{ width: `${Math.max(5, Math.min(100, ((product.editionSize - product.editionRemaining) / product.editionSize) * 100))}%` }}
              />
            </div>
            <p className="text-text-muted text-xs whitespace-nowrap">
              {product.editionRemaining === 0 ? "Sold out" : `${product.editionRemaining} of ${product.editionSize}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
