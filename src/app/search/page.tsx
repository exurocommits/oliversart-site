import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Input } from "@/components/ui/Input";
import { getAllProducts } from "@/lib/products";
import Link from "next/link";

export default function SearchPage() {
  const products = getAllProducts();

  return (
    <>
      <section className="py-8 border-b border-border-light dark:border-navy-mid">
        <Container>
          <nav className="text-text-muted-light dark:text-cream-muted text-sm mb-4">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1a1a2e] dark:text-cream">Search</span>
          </nav>
          <div className="max-w-2xl">
            <Input
              type="search"
              placeholder="Search by title, artist, or subject..."
              className="text-lg"
            />
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <p className="text-text-muted-light dark:text-cream-muted text-sm">{products.length} results</p>
            <select className="bg-white dark:bg-navy-light border border-border-light dark:border-navy-mid rounded-lg px-3 py-2 text-sm text-[#1a1a2e] dark:text-cream focus:outline-none focus:border-gold">
              <option>Relevance</option>
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <ProductGrid products={products} />
        </Container>
      </section>
    </>
  );
}
