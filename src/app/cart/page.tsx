import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Price } from "@/components/product/Price";
import Link from "next/link";

export default function CartPage() {
  return (
    <>
      <section className="py-8 border-b border-border">
        <Container>
          <nav className="text-text-muted text-sm mb-2">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-text">Your Collection</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text">Your Collection</h1>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          {/* Empty state */}
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🎨</div>
            <h2 className="font-serif text-2xl font-bold text-text mb-2">Your collection is empty</h2>
            <p className="text-text-muted mb-8">Discover hand-signed limited edition prints and start building your collection.</p>
            <Link href="/">
              <Button variant="primary" size="lg">Start Exploring</Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
