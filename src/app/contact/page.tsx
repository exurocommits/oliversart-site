"use client";

import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      <section className="py-20 bg-gradient-to-b from-navy-mid/30 to-navy-deep">
        <Container>
          <ScrollReveal>
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-2">Get in Touch</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4">
              We&apos;d Love to <span className="text-gold">Hear From You</span>
            </h1>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <ScrollReveal>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="Name" placeholder="Your name" />
                  <Input label="Email" type="email" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-cream mb-1.5">Subject</label>
                  <select className="w-full bg-navy-light border border-navy-mid rounded-lg px-4 py-2.5 text-cream text-sm focus:outline-none focus:border-gold transition-colors">
                    <option>General Inquiry</option>
                    <option>Order Inquiry</option>
                    <option>Custom Commission</option>
                    <option>Artist Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-cream mb-1.5">Message</label>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-navy-light border border-navy-mid rounded-lg px-4 py-2.5 text-cream text-sm placeholder:text-cream-muted/50 focus:outline-none focus:border-gold transition-colors resize-none"
                  />
                </div>
                <Button variant="primary" size="lg">Send Message</Button>
              </form>
            </ScrollReveal>

            {/* Contact info */}
            <ScrollReveal delay={200}>
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-xl font-bold text-cream mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <p className="text-cream-muted">📧 <a href="mailto:orders@oliversart.com" className="text-gold hover:text-gold-dim transition-colors">orders@oliversart.com</a></p>
                    <p className="text-cream-muted">📞 Coming soon</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-cream mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link href="/faqs" className="text-cream-muted hover:text-gold transition-colors">FAQs</Link></li>
                    <li><Link href="/shipping-returns" className="text-cream-muted hover:text-gold transition-colors">Shipping & Returns</Link></li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </>
  );
}
