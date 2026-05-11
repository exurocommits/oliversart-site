import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getArtistBySlug, getAllArtists } from "@/lib/artists";
import { getProductsByArtistId } from "@/lib/products";
import Link from "next/link";

interface ArtistPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArtists().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArtistPageProps): Promise<Metadata> {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) return { title: "Artist Not Found — Oliver's Art" };
  return {
    title: `${artist.name} — Oliver's Art`,
    description: artist.bio,
  };
}

export default async function ArtistDetailPage({ params }: ArtistPageProps) {
  const { slug } = await params;
  const artist = getArtistBySlug(slug);
  if (!artist) notFound();

  const products = getProductsByArtistId(artist.id);

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-4 border-b border-border">
        <Container>
          <nav className="text-text-muted text-sm">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/artists" className="hover:text-gold transition-colors">Artists</Link>
            <span className="mx-2">/</span>
            <span className="text-text">{artist.name}</span>
          </nav>
        </Container>
      </section>

      {/* Artist Header */}
      <section className="py-16 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center flex-shrink-0 border-2 border-gold/20">
                <span className="text-5xl text-gold font-serif font-bold">
                  {artist.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text">
                    {artist.name}
                  </h1>
                  {artist.isFeatured && (
                    <span className="text-xs font-semibold text-gold bg-gold/10 px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-text-muted text-lg leading-relaxed max-w-2xl mb-4">
                  {artist.bio}
                </p>
                <p className="text-gold font-semibold">
                  {products.length} {products.length === 1 ? "work" : "works"} available
                </p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Works */}
      <section className="py-16">
        <Container>
          <ScrollReveal>
            <h2 className="font-serif text-2xl font-bold text-text mb-8">
              Works by {artist.name}
            </h2>
          </ScrollReveal>
          {products.length > 0 ? (
            <ScrollReveal>
              <ProductGrid products={products} columns={3} />
            </ScrollReveal>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-muted mb-6">
                No prints currently available from this artist.
              </p>
              <Link
                href="/artists"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold px-6 py-3 text-sm bg-gold text-surface hover:bg-gold-dim transition-all duration-200"
              >
                ← Back to All Artists
              </Link>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
