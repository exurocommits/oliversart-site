import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { getAllArtists } from "@/lib/artists";
import { getProductsByArtistId } from "@/lib/products";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Artists — Oliver's Art",
  description:
    "Meet the world-renowned artists behind our collection of limited edition aviation, motorsport, maritime, and contemporary art prints.",
};

export default function ArtistsPage() {
  const artists = getAllArtists();
  const featured = artists.filter((a) => a.isFeatured);
  const others = artists.filter((a) => !a.isFeatured);

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <nav className="text-text-muted text-sm mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-text">Artists</span>
            </nav>
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-2">The Talent</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text mb-4">
              Our <span className="text-gold">Artists</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              World-renowned artists capturing aviation, motorsport, maritime, and contemporary subjects in extraordinary limited edition prints.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Featured Artists */}
      <section className="py-16">
        <Container>
          <ScrollReveal>
            <h2 className="font-serif text-2xl font-bold text-text mb-8">
              Featured Artists
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((artist, i) => {
              const works = getProductsByArtistId(artist.id);
              return (
                <ScrollReveal key={artist.id} delay={i * 100}>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="group block bg-surface border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 hover:border-gold/30"
                  >
                    <div className="aspect-[16/9] bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                      <span className="text-6xl text-gold/40 font-serif font-bold">
                        {artist.name.charAt(0)}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-serif text-xl font-bold text-text group-hover:text-gold transition-colors">
                          {artist.name}
                        </h3>
                        <span className="text-xs font-semibold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                      <p className="text-text-muted text-sm leading-relaxed mb-4">
                        {artist.bio}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-text-muted uppercase tracking-wide">
                          {artist.shortBio?.split(" ").slice(-1)[0] || artist.shortBio}
                        </span>
                        <span className="text-gold text-sm font-semibold group-hover:translate-x-1 transition-transform">
                          View Works ({works.length}) →
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* All Artists */}
      <section className="py-16 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <h2 className="font-serif text-2xl font-bold text-text mb-8">
              All Artists
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {others.map((artist, i) => {
              const works = getProductsByArtistId(artist.id);
              return (
                <ScrollReveal key={artist.id} delay={i * 50}>
                  <Link
                    href={`/artists/${artist.slug}`}
                    className="group block p-5 bg-surface border border-border rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-gold/5 hover:border-gold/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg text-gold font-serif font-bold">
                          {artist.name.charAt(0)}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-serif font-bold text-text group-hover:text-gold transition-colors truncate">
                          {artist.name}
                        </h3>
                        <p className="text-text-muted text-xs">
                          {works.length} {works.length === 1 ? "work" : "works"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
