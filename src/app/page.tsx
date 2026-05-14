import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProductGrid } from "@/components/product/ProductGrid";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { getAllProducts, getLatestProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import { getAllArtists } from "@/lib/artists";
import Link from "next/link";

// Category representative images from scraped data
const categoryImages: Record<string, string> = {
  aviation: "/images/cat-aviation.jpg",
  motorsport: "/images/cat-motorsport.jpg",
  maritime: "/images/cat-maritime.jpg",
  "contemporary-art": "/images/cat-contemporary.jpg",
  "latest-releases": "/images/hero-mosquito-thunder.jpg",
};

const heroImage = "/images/hero-mosquito-thunder.jpg";

export default function HomePage() {
  const products = getAllProducts();
  const categories = getAllCategories().filter((c) => c.showInNav);
  const latestProducts = getLatestProducts(8);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const artists = getAllArtists();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        {/* Background image */}
        <img
          src={heroImage}
          alt="Mosquito Thunder by Anthony Saunders — Limited Edition Aviation Art"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <ScrollReveal delay={0}>
            <p className="text-gold text-sm sm:text-base uppercase tracking-[0.3em] font-semibold mb-6">
              Exciting Art. Action Art.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Limited Edition Prints
              <br />
              <span className="text-gold">That Capture History</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={400}>
            <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
              Hand-signed aviation, motorsport, and maritime art from the world&apos;s leading artists. Each print a window into a moment that changed everything.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/gallery/aviation"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold-dim transition-all duration-200 text-base"
              >
                Explore Collection
              </a>
              <a
                href="/latest-releases"
                className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 text-base"
              >
                Latest Releases
              </a>
            </div>
          </ScrollReveal>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-scroll-pulse">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Artist Marquee */}
      <div className="bg-text py-3 overflow-hidden">
        <div className="animate-marquee flex whitespace-nowrap">
          {[...artists.filter(a => a.isFeatured).map(a => a.name), ...artists.filter(a => a.isFeatured).map(a => a.name)].map((name, i) => (
            <span key={i} className="text-gold/60 text-sm uppercase tracking-[0.2em] font-medium mx-8">
              {name} <span className="text-gold/30 mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section className="py-24 bg-bg">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-3">Curated For You</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-text">
                Explore Our <span className="text-gold">Collections</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.slice(0, 5).map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 100}>
                <Link
                  href={`/gallery/${cat.slug}`}
                  className="group block relative rounded-xl overflow-hidden aspect-[4/3] transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10"
                >
                  {/* Background image */}
                  <img
                    src={categoryImages[cat.slug] || categoryImages["aviation"]}
                    alt={cat.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 transition-all duration-500" />
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-sm mt-2 line-clamp-2 max-w-md">{cat.description}</p>
                    <span className="inline-flex items-center mt-3 text-gold text-sm font-medium group-hover:translate-x-1 transition-transform">
                      Browse collection
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Latest Releases */}
      {latestProducts.length > 0 && (
        <section className="py-24 bg-surface-alt">
          <Container>
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-2">Just Arrived</p>
                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text">
                    Latest <span className="text-gold">Releases</span>
                  </h2>
                </div>
                <a href="/latest-releases" className="hidden sm:inline-flex items-center text-gold text-sm font-medium hover:text-gold-dim transition-colors">
                  View all
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
            <ProductGrid products={latestProducts} />
          </Container>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-24 bg-bg">
          <Container>
            <ScrollReveal>
              <div className="text-center mb-12">
                <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-3">Hand-Picked</p>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text">
                  Featured <span className="text-gold">Pieces</span>
                </h2>
              </div>
            </ScrollReveal>
            <ProductGrid products={featuredProducts} />
          </Container>
        </section>
      )}

      {/* As Seen In / Social Proof */}
      <section className="py-12 border-y border-border bg-surface">
        <Container>
          <p className="text-center text-text-muted text-xs uppercase tracking-[0.2em] font-semibold mb-8">Trusted by collectors worldwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-40">
            {["RAF Museum", "Imperial War Museum", "Goodwood", "Silverstone", "Brooklands"].map((name) => (
              <span key={name} className="font-serif text-lg sm:text-xl font-bold text-text">{name}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust Signals */}
      <section className="py-24 bg-surface-alt">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                ),
                title: "Hand-Signed",
                desc: "Every print personally signed by the artist.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                ),
                title: "Limited Edition",
                desc: "Strict edition sizes guarantee exclusivity and value.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: "Certificate of Authenticity",
                desc: "Each print comes with a numbered certificate.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                ),
                title: "Secure Packaging",
                desc: "Museum-quality packaging for safe delivery worldwide.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 100}>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 mb-4 group-hover:bg-gold/20 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-text mb-2">{item.title}</h3>
                  <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-bg">
        <Container>
          <ScrollReveal>
            <div className="text-center max-w-lg mx-auto">
              <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-3">Stay Informed</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4 text-text">
                Never Miss a <span className="text-gold">New Release</span>
              </h2>
              <p className="text-text-muted mb-8">
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
