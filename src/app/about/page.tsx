import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-navy-mid/30 to-navy-deep">
        <Container>
          <ScrollReveal>
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-2">Our Story</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              Family-Run, <span className="text-gold">Passion-Driven</span>
            </h1>
            <p className="text-cream-muted text-lg max-w-2xl">
              For over two decades, Oliver&apos;s Art has been the trusted home for collectors of limited edition aviation, motorsport, maritime, and wildlife art.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: "💎", title: "Quality", desc: "Every print is produced using museum-grade materials and 12-colour giclée printing for exceptional colour accuracy and longevity." },
              { icon: "✅", title: "Authenticity", desc: "All limited edition prints are hand-signed, individually numbered, and accompanied by a certificate of authenticity." },
              { icon: "🔥", title: "Passion", desc: "We share our collectors' passion for these subjects. Every piece tells a story worth preserving and celebrating." },
            ].map((value, i) => (
              <ScrollReveal key={value.title} delay={i * 150}>
                <div className="text-center p-8 bg-navy-light border border-navy-mid rounded-xl">
                  <span className="text-4xl mb-4 block">{value.icon}</span>
                  <h3 className="font-serif text-xl font-bold text-cream mb-3">{value.title}</h3>
                  <p className="text-cream-muted text-sm leading-relaxed">{value.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-navy-light/50">
        <Container>
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold mb-4">
                Meet the <span className="text-gold">Artists</span>
              </h2>
              <p className="text-cream-muted mb-8 max-w-lg mx-auto">
                Discover the talented artists behind our collection.
              </p>
              <Link href="/artists">
                <Button variant="outline" size="lg">View All Artists</Button>
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
