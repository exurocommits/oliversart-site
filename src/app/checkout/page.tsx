import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CheckoutPage() {
  return (
    <>
      <section className="py-8 border-b border-navy-mid">
        <Container>
          <nav className="text-cream-muted text-sm mb-2">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/cart" className="hover:text-gold transition-colors">Cart</Link>
            <span className="mx-2">/</span>
            <span className="text-cream">Checkout</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold">Checkout</h1>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="max-w-xl mx-auto">
            {/* Progress */}
            <div className="flex items-center justify-between mb-12">
              {["Shipping", "Delivery", "Payment", "Review"].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    i === 0 ? "bg-gold text-navy-deep" : "bg-navy-mid text-cream-muted"
                  }`}>
                    {i + 1}
                  </div>
                  <span className={`text-sm hidden sm:block ${i === 0 ? "text-cream" : "text-cream-muted"}`}>{step}</span>
                  {i < 3 && <div className="w-8 sm:w-16 h-px bg-navy-mid mx-2" />}
                </div>
              ))}
            </div>

            {/* Shipping form placeholder */}
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-cream">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="First Name" placeholder="John" />
                <Input label="Last Name" placeholder="Doe" />
              </div>
              <Input label="Email" type="email" placeholder="john@example.com" />
              <Input label="Address Line 1" placeholder="123 Main Street" />
              <Input label="Address Line 2" placeholder="Apt 4B (optional)" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Input label="City" placeholder="London" />
                <Input label="Postcode" placeholder="SW1A 1AA" />
                <div className="col-span-2 sm:col-span-1">
                  <Input label="Country" placeholder="United Kingdom" />
                </div>
              </div>
              <Button variant="primary" size="lg" fullWidth>Continue to Delivery</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
