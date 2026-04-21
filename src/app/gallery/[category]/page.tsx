import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductsByCategory } from "@/lib/products";
import { getCategoryBySlug } from "@/lib/categories";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  if (!cat) notFound();

  const filtered = getProductsByCategory(category);
  const displayName = cat.name.replace(/^-/, "").trim();

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-surface-light-alt dark:from-navy-mid/30 to-transparent">
        <Container>
          <nav className="text-text-muted-light dark:text-cream-muted text-sm mb-4">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-[#1a1a2e] dark:text-cream">{displayName}</span>
          </nav>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4 text-[#1a1a2e] dark:text-cream">
            <span className="text-gold">{displayName}</span>
          </h1>
          <p className="text-text-muted-light dark:text-cream-muted text-lg max-w-2xl">
            {cat.description || `Browse our curated collection of ${displayName.toLowerCase()} art. Each piece is hand-signed and comes with a certificate of authenticity.`}
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <p className="text-text-muted-light dark:text-cream-muted text-sm">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            <select className="bg-white dark:bg-navy-light border border-border-light dark:border-navy-mid rounded-lg px-3 py-2 text-sm text-[#1a1a2e] dark:text-cream focus:outline-none focus:border-gold">
              <option>Newest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="text-center py-20">
              <p className="text-text-muted-light dark:text-cream-muted text-lg">No products found in this category.</p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
