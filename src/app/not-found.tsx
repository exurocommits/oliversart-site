import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <Container>
        <div className="text-center">
          <p className="text-gold font-serif text-8xl sm:text-9xl font-bold animate-float mb-4">404</p>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-text mb-4">Page Not Found</h1>
          <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
            The artwork you&apos;re looking for has gone missing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary" size="lg">Return to Home</Button>
            </Link>
            <Link href="/gallery/aviation">
              <Button variant="outline" size="lg">Browse Collections</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
