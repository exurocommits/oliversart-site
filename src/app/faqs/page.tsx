"use client";

import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { useState } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQGroup {
  title: string;
  icon: string;
  items: FAQItem[];
}

const faqData: FAQGroup[] = [
  {
    title: "Ordering",
    icon: "🛒",
    items: [
      {
        question: "How do I place an order?",
        answer: "Browse our collection, add items to your cart, and proceed to checkout. We accept all major credit and debit cards, PayPal, and bank transfer. If you'd prefer to order by phone or email, contact us at orders@oliversart.com.",
      },
      {
        question: "Can I order by phone or email?",
        answer: "Absolutely. We're happy to take orders via email at orders@oliversart.com. Please include the print title, any framing preferences, and your delivery address. We'll confirm availability and send you a payment link.",
      },
      {
        question: "Do you offer gift wrapping or gift vouchers?",
        answer: "We offer gift vouchers in any denomination — perfect for collectors. Contact us directly to arrange. While we don't offer traditional gift wrapping, all prints are shipped in premium protective packaging suitable for gifting.",
      },
      {
        question: "Can I reserve a print before purchasing?",
        answer: "Yes, we can hold a print for up to 7 days while you decide. Contact us to reserve. After 7 days the hold is released. This is especially useful for limited editions with low remaining stock.",
      },
    ],
  },
  {
    title: "Prints & Editions",
    icon: "🖼️",
    items: [
      {
        question: "What is a limited edition print?",
        answer: "A limited edition print is produced in a strictly limited quantity — for example, an edition of 250 means only 250 copies will ever be produced. Each print is individually numbered (e.g. 47/250) and hand-signed by the artist. Once the edition sells out, no more will be printed.",
      },
      {
        question: "Are all prints hand-signed?",
        answer: "Yes, all limited edition prints sold by Oliver's Art are hand-signed by the artist unless clearly stated otherwise. Many prints also include remarques or additional signatures from pilots, drivers, or other notable figures.",
      },
      {
        question: "What does 'artist proof' mean?",
        answer: "Artist proofs (AP) are a small number of prints set aside for the artist's personal use, typically 10% of the edition size. They are numbered separately (e.g. AP 5/25) and are often more sought after by collectors due to their rarity.",
      },
      {
        question: "Do prints come with a certificate of authenticity?",
        answer: "Yes, every limited edition print comes with a certificate of authenticity (COA) confirming the edition number, artist signature, and print details. This is your guarantee of genuineness.",
      },
      {
        question: "What printing methods are used?",
        answer: "Our prints are produced using museum-grade giclée printing with 12-colour archival inks on acid-free fine art paper. This ensures exceptional colour accuracy, detail reproduction, and longevity — typically 100+ years without fading when properly displayed.",
      },
    ],
  },
  {
    title: "Shipping & Delivery",
    icon: "📦",
    items: [
      {
        question: "How are prints packaged for shipping?",
        answer: "Unmounted prints are shipped rolled in heavy-duty acid-free tissue inside rigid mailing tubes. Mounted or framed prints are shipped flat in custom-made reinforced packaging with corner protectors and bubble wrap. All packaging is museum-quality standard.",
      },
      {
        question: "How long does delivery take?",
        answer: "UK orders are typically delivered within 3–5 working days. European orders take 5–10 working days, and international orders 7–14 working days. Framed items may take an additional 3–5 days for preparation.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Yes, we ship worldwide. We have collectors across Europe, North America, Australia, and beyond. All international shipments are fully tracked and insured. Import duties and taxes may apply depending on your country.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    icon: "↩️",
    items: [
      {
        question: "What is your returns policy?",
        answer: "We offer a 14-day returns policy. If you're not completely satisfied with your purchase, you may return it within 14 days of delivery for a full refund, provided the item is in its original condition and packaging. Please contact us first to arrange the return.",
      },
      {
        question: "What if my print arrives damaged?",
        answer: "In the rare event your print arrives damaged, contact us immediately (within 48 hours) with photographs of the damage and packaging. We'll arrange a replacement or full refund at no additional cost. All shipments are fully insured.",
      },
      {
        question: "Can I exchange a print for a different one?",
        answer: "Yes, exchanges are possible within the 14-day returns window. Contact us to arrange. If there's a price difference, we'll either refund the balance or send a payment request for the additional amount.",
      },
    ],
  },
  {
    title: "Commissions & Custom Orders",
    icon: "🎨",
    items: [
      {
        question: "Can I commission a custom piece?",
        answer: "We can put you in touch with artists who accept commissions. Subject matter, size, and pricing vary by artist. Contact us with your requirements and we'll facilitate an introduction. Commissioned pieces typically take 8–16 weeks.",
      },
      {
        question: "Do you offer framing services?",
        answer: "We can recommend professional framers experienced in handling limited edition prints. Proper framing with acid-free mounts and UV-protective glass is essential for preserving your investment. Contact us for recommendations.",
      },
    ],
  },
];

function AccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-semibold text-text group-hover:text-gold transition-colors pr-4">
          {item.question}
        </span>
        <span
          className={`text-gold flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-text-muted text-sm leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQsPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <nav className="text-text-muted text-sm mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-text">FAQs</span>
            </nav>
            <p className="text-gold text-sm uppercase tracking-[0.2em] font-semibold mb-2">Help Centre</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text mb-4">
              Frequently Asked <span className="text-gold">Questions</span>
            </h1>
            <p className="text-text-muted text-lg max-w-2xl">
              Everything you need to know about ordering, shipping, and collecting limited edition prints.
            </p>
          </ScrollReveal>
        </Container>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {faqData.map((group, gi) => (
              <ScrollReveal key={group.title} delay={gi * 100}>
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{group.icon}</span>
                    <h2 className="font-serif text-2xl font-bold text-text">
                      {group.title}
                    </h2>
                  </div>
                  <div className="bg-surface border border-border rounded-xl px-6">
                    {group.items.map((item, ii) => {
                      const key = `${gi}-${ii}`;
                      return (
                        <AccordionItem
                          key={key}
                          item={item}
                          isOpen={openItems.has(key)}
                          onToggle={() => toggle(key)}
                        />
                      );
                    })}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Still have questions CTA */}
      <section className="py-16 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-serif text-2xl font-bold text-text mb-3">
                Still have questions?
              </h2>
              <p className="text-text-muted mb-6 max-w-md mx-auto">
                We&apos;re always happy to help. Get in touch and we&apos;ll respond as soon as possible.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-semibold px-8 py-3.5 text-base bg-gold text-surface hover:bg-gold-dim transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.97]"
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </section>
    </>
  );
}
