import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ArtistNotFound() {
  return (
    <section className="min-h-[50vh] flex items-center justify-center">
      <Container>
        <div className="text-center">
          <p className="text-gold font-serif text-6xl font-bold mb-4">🎨</p>
          <h1 className="font-serif text-3xl font-bold text-text mb-4">
            Artist Not Found
          </h1>
          <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
            We couldn&apos;t find the artist you&apos;re looking for.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/artists">
              <Button variant="primary" size="lg">View All Artists</Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">Return Home</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
