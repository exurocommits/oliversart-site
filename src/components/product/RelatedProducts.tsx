import Link from "next/link";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  products: Product[];
  title?: string;
}

export function RelatedProducts({ products, title = "You May Also Like" }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 border-t border-navy-mid">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-cream">{title}</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-gold/20 to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product, i) => (
          <div key={product.id} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
