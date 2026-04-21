import { Container } from "@/components/ui/Container";
import { Price } from "@/components/product/Price";
import { ScarcityIndicator } from "@/components/product/ScarcityIndicator";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getProductBySlug } from "@/lib/products";
import { getAllArtists } from "@/lib/artists";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const artists = getAllArtists();
  const artist = artists.find((a) => a.id === product.artistId);
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-4 border-b border-border-light dark:border-navy-mid">
        <Container>
          <nav className="text-text-muted-light dark:text-cream-muted text-sm">
            <a href="/" className="hover:text-gold transition-colors">Home</a>
            <span className="mx-2">/</span>
            <span className="text-[#1a1a2e] dark:text-cream">{product.title}</span>
          </nav>
        </Container>
      </section>

      {/* Product Detail */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Images (3/5) */}
            <div className="lg:col-span-3">
              <div className="aspect-[4/3] bg-surface-light-alt dark:bg-navy-light rounded-xl overflow-hidden">
                <img
                  src={primaryImage?.url || "/images/placeholder.jpg"}
                  alt={primaryImage?.alt || product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {product.images.map((img) => (
                    <div key={img.id} className="w-20 h-20 bg-surface-light-alt dark:bg-navy-light rounded-lg overflow-hidden border-2 border-transparent hover:border-gold transition-colors cursor-pointer">
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info (2/5) */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-3">
                {product.isNew && <Badge variant="new" />}
                {product.isSigned && <Badge variant="limited" />}
                {!product.inStock && <Badge variant="sold-out" />}
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1a1a2e] dark:text-cream mb-2">
                {product.title}
              </h1>

              {artist && (
                <a href={`/artists/${artist.slug}`} className="text-gold hover:text-gold-dim transition-colors">
                  by {artist.name}
                </a>
              )}

              <div className="mt-4">
                <Price price={product.price} salePrice={product.salePrice} size="lg" />
              </div>

              {product.editionType === "limited" && product.editionSize && product.editionRemaining !== undefined && (
                <div className="mt-4">
                  <ScarcityIndicator remaining={product.editionRemaining} total={product.editionSize} />
                </div>
              )}

              <div className="mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Add to Collection" : "Sold Out"}
                </Button>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#1a1a2e] dark:text-cream">Description</h3>
                <p className="text-text-muted-light dark:text-cream-muted leading-relaxed">{product.description}</p>
              </div>

              {product.specifications && (
                <div className="mt-8">
                  <h3 className="font-serif text-lg font-bold text-[#1a1a2e] dark:text-cream mb-4">Specifications</h3>
                  <div className="bg-surface-light-alt dark:bg-navy-light rounded-lg overflow-hidden">
                    {Object.entries(product.specifications).map(([key, value]) =>
                      value ? (
                        <div key={key} className="flex justify-between px-4 py-2 border-b border-border-light dark:border-navy-mid last:border-0">
                          <span className="text-text-muted-light dark:text-cream-muted text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-[#1a1a2e] dark:text-cream text-sm">{value}</span>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
