import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping & Returns — Oliver's Art",
  description:
    "UK and international shipping information, delivery times, packaging details, and our 14-day returns policy for limited edition art prints.",
};

const shippingZones = [
  { zone: "UK Mainland", price: "Free", time: "3–5 working days" },
  { zone: "UK Highlands & Islands", price: "£9.95", time: "5–7 working days" },
  { zone: "Republic of Ireland", price: "£14.95", time: "5–7 working days" },
  { zone: "Western Europe", price: "£19.95", time: "5–10 working days" },
  { zone: "Eastern Europe", price: "£24.95", time: "7–12 working days" },
  { zone: "USA & Canada", price: "£29.95", time: "7–14 working days" },
  { zone: "Australia & New Zealand", price: "£34.95", time: "10–18 working days" },
  { zone: "Rest of World", price: "£39.95", time: "10–21 working days" },
];

export default function ShippingReturnsPage() {
  return (
    <>
      <section className="py-20 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <nav className="text-text-muted text-sm mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-text">Shipping & Returns</span>
            </nav>
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-2">Delivery Info</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text mb-4">
              Shipping & <span className="text-gold">Returns</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              We take the utmost care in packaging and shipping your artwork. Every print is insured and tracked from our door to yours.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Packaging */}
            <ScrollReveal>
              <div>
                <h2 className="font-serif text-2xl font-bold text-text mb-6">
                  📦 Museum-Quality Packaging
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="font-serif font-bold text-text mb-2">Unmounted Prints</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Rolled in acid-free tissue paper and placed inside a heavy-duty rigid mailing tube. Multiple prints in the same order are separated with additional tissue layers to prevent surface damage.
                    </p>
                  </div>
                  <div className="bg-surface border border-border rounded-xl p-6">
                    <h3 className="font-serif font-bold text-text mb-2">Mounted & Framed Prints</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      Shipped flat in custom-made reinforced packaging with corner protectors, acid-free interleaving, and bubble wrap. Framed items use UV-protective glass and secure backing.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Shipping Zones Table */}
            <ScrollReveal>
              <div>
                <h2 className="font-serif text-2xl font-bold text-text mb-6">
                  🌍 Shipping Zones & Times
                </h2>
                <div className="bg-surface border border-border rounded-xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left px-6 py-4 text-sm font-semibold text-text">Destination</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-text">Shipping Cost</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-text">Estimated Delivery</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shippingZones.map((row, i) => (
                          <tr
                            key={row.zone}
                            className={
                              i < shippingZones.length - 1
                                ? "border-b border-border"
                                : ""
                            }
                          >
                            <td className="px-6 py-3.5 text-sm text-text">{row.zone}</td>
                            <td className="px-6 py-3.5 text-sm font-semibold text-gold">{row.price}</td>
                            <td className="px-6 py-3.5 text-sm text-text-muted">{row.time}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <p className="text-text-muted text-xs mt-3">
                  * Framed items may require an additional 3–5 working days for preparation. Import duties and local taxes may apply for international orders and are the responsibility of the buyer.
                </p>
              </div>
            </ScrollReveal>

            {/* Key Points */}
            <ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: "✅", label: "Fully Insured", desc: "Every shipment is covered against loss or damage in transit." },
                  { icon: "📍", label: "Fully Tracked", desc: "Track your order from dispatch to delivery with real-time updates." },
                  { icon: "🤝", label: "Signature Required", desc: "All deliveries require a signature to ensure safe receipt." },
                ].map((point) => (
                  <div key={point.label} className="text-center p-6 bg-surface border border-border rounded-xl">
                    <span className="text-3xl block mb-3">{point.icon}</span>
                    <h3 className="font-serif font-bold text-text mb-1">{point.label}</h3>
                    <p className="text-text-muted text-sm">{point.desc}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Returns Policy */}
            <ScrollReveal>
              <div>
                <h2 className="font-serif text-2xl font-bold text-text mb-6">
                  ↩️ Returns & Exchanges
                </h2>
                <div className="bg-surface border border-border rounded-xl p-8 space-y-6">
                  <div>
                    <h3 className="font-semibold text-text mb-2">14-Day Returns Policy</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      If you&apos;re not completely satisfied with your purchase, return it within 14 days of delivery for a full refund. Items must be in their original condition and packaging. Please contact us before returning so we can provide the correct return address and instructions.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-2">Damage Claims</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      If your print arrives damaged, contact us within <strong className="text-text">48 hours</strong> with photographs of both the damage and the packaging. We&apos;ll arrange a replacement or full refund at no extra cost. Do not dispose of the damaged item or packaging until the claim is resolved.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text mb-2">Exchanges</h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      You may exchange a print for a different one within the 14-day returns window. If there&apos;s a price difference, we&apos;ll either refund the balance or request additional payment. Contact us to arrange an exchange.
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-text-muted text-xs">
                      Return shipping costs are the responsibility of the buyer unless the item is damaged or faulty. We recommend using an insured, tracked service. Refunds are processed within 5 working days of receiving the returned item.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal>
              <div className="text-center pt-4">
                <p className="text-text-muted mb-4">
                  Have a question about shipping? Check our <Link href="/faqs" className="text-gold hover:text-gold-dim transition-colors">FAQs</Link> or <Link href="/contact" className="text-gold hover:text-gold-dim transition-colors">get in touch</Link>.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
