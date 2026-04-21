import Link from "next/link";
import type { Product } from "@/types/product";
import { Price } from "./Price";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const artistName = product.title.includes(" by ")
    ? product.title.split(" by ").slice(1).join(" by ")
    : "Unknown Artist";

  return (
    <div className="group bg-white dark:bg-navy-light border border-border-light dark:border-navy-mid rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 hover:border-gold/30 hover:-translate-y-1">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[#f3f0ec] dark:bg-navy-mid">
        <img
          src={primaryImage?.url || "/images/placeholder.jpg"}
          alt={primaryImage?.alt || product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
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
          <div className="absolute top-3 right-3 bg-white/80 dark:bg-navy-deep/80 backdrop-blur-sm text-gold text-xs px-2 py-1 rounded-full">
            ✍ Signed
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif font-bold text-[#1a1a2e] dark:text-cream group-hover:text-gold transition-colors line-clamp-1">
            {product.title}
          </h3>
        </Link>
        <p className="text-text-muted-light dark:text-cream-muted text-sm mt-1">{artistName}</p>
        <div className="mt-3">
          <Price price={product.price} salePrice={product.salePrice} size="sm" />
        </div>
        {product.editionType === "limited" && product.editionSize && product.editionRemaining !== undefined && (
          <p className="text-text-muted-light dark:text-cream-muted text-xs mt-2">
            Edition of {product.editionSize} — {product.editionRemaining} remaining
          </p>
        )}
      </div>
    </div>
  );
}
