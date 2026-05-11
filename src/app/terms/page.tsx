import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — Oliver's Art",
  description:
    "Terms and conditions for Oliver's Art. Governing the use of our website and the purchase of limited edition art prints.",
};

export default function TermsPage() {
  return (
    <>
      <section className="py-20 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <nav className="text-text-muted text-sm mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-text">Terms & Conditions</span>
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text mb-4">
              Terms & <span className="text-gold">Conditions</span>
            </h1>
            <p className="text-text-muted text-sm">Last updated: April 2026</p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {[
              {
                title: "1. Introduction",
                content: `These terms and conditions ("Terms") govern your use of the Oliver's Art website (oliversart.com) and your purchase of products from us. By accessing our website or placing an order, you agree to be bound by these Terms. If you do not agree, please do not use our website.`,
              },
              {
                title: "2. Definitions",
                content: `• "We", "us", "our" refers to Oliver's Art\n• "You", "your" refers to the customer or website visitor\n• "Products" refers to limited edition prints and related items sold on our website\n• "Website" refers to oliversart.com`,
              },
              {
                title: "3. Orders & Acceptance",
                content: `All orders placed through our website are subject to acceptance. We reserve the right to refuse or cancel any order for any reason, including but not limited to product unavailability, pricing errors, or suspected fraudulent activity.\n\nAn order confirmation email does not constitute acceptance of your order. Acceptance occurs when the products are dispatched to you. We will notify you if we are unable to fulfil your order.\n\nIn the case of limited edition prints, availability is subject to remaining stock. We operate on a first-come, first-served basis and cannot guarantee availability until an order is confirmed.`,
              },
              {
                title: "4. Pricing",
                content: `All prices are displayed in British Pounds Sterling (GBP) and include VAT where applicable. We reserve the right to change prices at any time without prior notice. However, once you have placed an order, the price charged will be the price displayed at the time of ordering.\n\nPrices do not include shipping costs, which are calculated at checkout based on your delivery location. Import duties and local taxes for international orders are the responsibility of the buyer.`,
              },
              {
                title: "5. Payment",
                content: `Payment is due at the time of order. We accept major credit and debit cards (Visa, Mastercard, American Express), PayPal, and bank transfer. Payment is processed securely through our payment providers. We do not store your full card details on our servers.`,
              },
              {
                title: "6. Product Description & Accuracy",
                content: `We make every effort to ensure product descriptions, images, and specifications are accurate. However, colours may vary slightly due to screen calibration and printing processes. Edition numbers shown are indicative — you will receive the next available number in the edition unless otherwise agreed.\n\nIf a product you receive is materially different from its description, you are entitled to return it under our returns policy.`,
              },
              {
                title: "7. Intellectual Property",
                content: `All content on this website, including but not limited to artwork images, text, graphics, logos, and design elements, is the intellectual property of Oliver's Art or the respective artists and is protected by UK and international copyright laws.\n\nYou may not reproduce, distribute, modify, or use any content from this website without our express written permission. The purchase of a print does not transfer any intellectual property rights — you are purchasing a physical product, not the rights to the image.`,
              },
              {
                title: "8. Limited Edition Prints",
                content: `Limited edition prints are produced in strictly limited quantities as stated. Once an edition is sold out, no further prints will be produced in that edition. Each print is individually numbered and hand-signed by the artist.\n\nArtist proofs, remarque prints, and special editions are separate from the main edition and are produced in the quantities stated. The edition size and type are clearly indicated on each product page.`,
              },
              {
                title: "9. Shipping & Delivery",
                content: `We aim to dispatch orders within 3–5 working days for UK deliveries. International delivery times vary by destination. Full shipping information is available on our Shipping & Returns page.\n\nDelivery times are estimates and not guaranteed. We are not liable for delays caused by carriers, customs, or circumstances beyond our control. Risk of loss transfers to you upon delivery.`,
              },
              {
                title: "10. Returns & Refunds",
                content: `We offer a 14-day returns policy in accordance with the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013. You may return undamaged items within 14 days of delivery for a full refund.\n\nItems must be returned in their original condition and packaging. Return shipping costs are the responsibility of the buyer unless the item is damaged or faulty. Refunds are processed within 5 working days of receiving the returned item.\n\nFor full details, please see our Shipping & Returns page.`,
              },
              {
                title: "11. Limitation of Liability",
                content: `Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded by law.\n\nTo the maximum extent permitted by law, our total liability for any claim arising from these Terms or your use of our website shall not exceed the amount you paid for the relevant product.\n\nWe are not liable for any indirect, incidental, or consequential losses arising from your use of our website or products.`,
              },
              {
                title: "12. Website Use",
                content: `You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others. You must not:\n\n• Use the website in any way that breaches applicable laws or regulations\n• Attempt to gain unauthorised access to our systems\n• Use automated tools to scrape or extract data from the website\n• Introduce viruses or other malicious code\n• Impersonate any person or entity`,
              },
              {
                title: "13. Changes to Terms",
                content: `We may update these Terms from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the website after changes are posted constitutes acceptance of the revised Terms.`,
              },
              {
                title: "14. Governing Law",
                content: `These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts of England and Wales.`,
              },
              {
                title: "15. Contact",
                content: `If you have any questions about these Terms, please contact us:\n\n• **Email**: orders@oliversart.com\n• **Website**: oliversart.com/contact`,
              },
            ].map((section, i) => (
              <ScrollReveal key={i} delay={i * 50}>
                <div className="mb-10">
                  <h2 className="font-serif text-xl font-bold text-text mb-4">
                    {section.title}
                  </h2>
                  <div className="text-text-muted text-sm leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
