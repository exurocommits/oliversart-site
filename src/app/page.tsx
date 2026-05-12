import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ParticleCanvas } from "@/components/motion/ParticleCanvas";
import { ProductGrid } from "@/components/product/ProductGrid";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { getAllProducts, getLatestProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  const products = getAllProducts();
  const categories = getAllCategories().filter((c) => c.showInNav);
  const latestProducts = getLatestProducts(8);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-alt via-bg to-surface-alt" />
        <ParticleCanvas particleCount={30} variant="dust" color="rgba(44,44,44,0.08)" />
        <div className="relative z-10 text-center px-4">
          <ScrollReveal delay={0}>
            <p className="text-gold text-sm sm:text-base uppercase tracking-[0.3em] font-semibold mb-4">
              Exciting Art. Action Art.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text leading-tight mb-6">
              Limited Edition Prints
              <br />
              <span className="text-gold">That Capture History</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-8">
              Hand-signed aviation, motorsport, maritime, and wildlife art from the world&apos;s leading artists.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={600}>
            <Button variant="outline" size="lg">
              Explore Collection
            </Button>
          </ScrollReveal>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-pulse">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-center mb-12 text-text">
              Explore Our <span className="text-gold">Collections</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 6).map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 100}>
                <a
                  href={`/${cat.slug}`}
                  className="group block bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5"
                >
                  <div className="aspect-[4/3] bg-surface-alt flex items-center justify-center">
                    <span className="text-gold/30 text-6xl">✦</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-bold text-text group-hover:text-gold transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-text-muted text-sm mt-2 line-clamp-2">{cat.description}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Latest Releases */}
      {latestProducts.length > 0 && (
        <section className="py-20 bg-surface-alt">
          <Container>
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-2">Just Arrived</p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text">
                  Latest <span className="text-gold">Releases</span>
                </h2>
              </div>
            </ScrollReveal>
            <ProductGrid products={latestProducts} />
          </Container>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20">
          <Container>
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text">
                  Featured <span className="text-gold">Pieces</span>
                </h2>
              </div>
            </ScrollReveal>
            <ProductGrid products={featuredProducts} />
          </Container>
        </section>
      )}

      {/* Trust Signals */}
      <section className="py-20 bg-surface-alt">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "✍", title: "Hand-Signed", desc: "Every print personally signed by the artist." },
              { icon: "🔢", title: "Limited Edition", desc: "Strict edition sizes guarantee exclusivity and value." },
              { icon: "📜", title: "Certificate of Authenticity", desc: "Each print comes with a numbered certificate." },
              { icon: "📦", title: "Secure Packaging", desc: "Museum-quality packaging for safe delivery worldwide." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="text-center">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-serif text-lg font-bold text-text mb-2">{item.title}</h3>
                  <p className="text-text-muted text-sm">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-lg mx-auto">
              <h2 className="font-serif text-3xl font-bold mb-4 text-text">
                Never Miss a <span className="text-gold">New Release</span>
              </h2>
              <p className="text-text-muted mb-6">
                Join our collector community for early access, exclusive offers, and artist stories.
              </p>
              <NewsletterForm />
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
