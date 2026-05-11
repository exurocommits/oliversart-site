import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Oliver's Art",
  description:
    "Oliver's Art privacy policy. How we collect, use, and protect your personal data in compliance with UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <>
      <section className="py-20 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <nav className="text-text-muted text-sm mb-4">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-text">Privacy Policy</span>
            </nav>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-text mb-4">
              Privacy <span className="text-gold">Policy</span>
            </h1>
            <p className="text-text-muted text-sm">Last updated: April 2026</p>
          </ScrollReveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto prose-sm">
            {[
              {
                title: "1. Who We Are",
                content: `Oliver's Art ("we", "us", "our") operates the website oliversart.com. We are committed to protecting your personal data and your right to privacy. This policy explains how we collect, use, and safeguard your information when you visit our website or purchase from us.`,
              },
              {
                title: "2. Information We Collect",
                content: `We may collect the following personal information:\n\n• **Identity Data**: your name, title, date of birth\n• **Contact Data**: your email address, billing address, delivery address, phone number\n• **Transaction Data**: details of products you have purchased from us\n• **Technical Data**: your IP address, browser type and version, time zone setting, browser plug-in types, operating system and platform\n• **Usage Data**: information about how you use our website, including page visit times, referral sources, and navigation paths\n• **Marketing Data**: your preferences in receiving marketing from us and your communication preferences`,
              },
              {
                title: "3. How We Use Your Information",
                content: `We use your personal data to:\n\n• Process and fulfil your orders, including payment processing and delivery\n• Manage your account and provide customer support\n• Personalise your experience on our website\n• Send you order confirmations, shipping updates, and customer service messages\n• Inform you about new releases, special offers, and events (where you have opted in)\n• Comply with legal obligations\n• Prevent fraud and protect our business`,
              },
              {
                title: "4. Legal Basis for Processing",
                content: `We process your personal data under the following legal bases:\n\n• **Contractual necessity**: to fulfil our obligations when you place an order\n• **Legitimate interests**: to improve our services, prevent fraud, and market our products (where appropriate)\n• **Consent**: where you have explicitly opted in to receive marketing communications\n• **Legal obligation**: to comply with applicable laws and regulations`,
              },
              {
                title: "5. Cookies",
                content: `Our website uses cookies to distinguish you from other users. We use the following types:\n\n• **Essential cookies**: required for the website to function (shopping cart, session management)\n• **Analytics cookies**: help us understand how visitors interact with our website (Google Analytics)\n• **Functional cookies**: remember your preferences (theme, recently viewed items)\n\nYou can manage your cookie preferences at any time through your browser settings. Disabling certain cookies may affect website functionality.`,
              },
              {
                title: "6. Third Parties",
                content: `We may share your data with trusted third parties who process data on our behalf:\n\n• **Payment processors** (e.g. Stripe, PayPal) for secure payment handling\n• **Shipping carriers** (e.g. Royal Mail, DHL) for order delivery\n• **Analytics providers** (e.g. Google Analytics) for website usage analysis\n• **Email service providers** for order confirmations and newsletters\n\nWe do not sell, rent, or trade your personal data to third parties for their own marketing purposes.`,
              },
              {
                title: "7. International Transfers",
                content: `Your data may be transferred to countries outside the UK and European Economic Area (EEA). Where this occurs, we ensure appropriate safeguards are in place, such as standard contractual clauses approved by the UK government, to protect your data in accordance with UK GDPR.`,
              },
              {
                title: "8. Data Retention",
                content: `We retain your personal data only for as long as necessary to fulfil the purposes for which it was collected, including satisfying legal, accounting, or reporting requirements. Transaction data is typically retained for 7 years for tax and accounting purposes. Marketing consent records are retained until you withdraw consent.`,
              },
              {
                title: "9. Your Rights",
                content: `Under UK GDPR, you have the following rights:\n\n• **Right to access**: request a copy of the personal data we hold about you\n• **Right to rectification**: request correction of inaccurate or incomplete data\n• **Right to erasure**: request deletion of your personal data ("right to be forgotten")\n• **Right to restrict processing**: request we limit how we use your data\n• **Right to data portability**: request your data in a machine-readable format\n• **Right to object**: object to our processing of your personal data\n• **Right to withdraw consent**: withdraw consent at any time where processing is based on consent\n\nTo exercise any of these rights, contact us at orders@oliversart.com.`,
              },
              {
                title: "10. Data Security",
                content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. This includes SSL encryption, secure payment processing, and access controls. However, no method of internet transmission or electronic storage is 100% secure.`,
              },
              {
                title: "11. Children's Privacy",
                content: `Our website and services are not directed to individuals under the age of 16. We do not knowingly collect personal data from children. If you are a parent or guardian and believe your child has provided us with personal data, please contact us.`,
              },
              {
                title: "12. Changes to This Policy",
                content: `We may update this privacy policy from time to time. The updated version will be indicated by a revised "Last updated" date. We encourage you to review this policy periodically.`,
              },
              {
                title: "13. Contact Us",
                content: `If you have any questions about this privacy policy or our data practices, please contact us:\n\n• **Email**: orders@oliversart.com\n• **Website**: oliversart.com/contact\n\nIf you are not satisfied with our response, you have the right to lodge a complaint with the Information Commissioner's Office (ICO) at ico.org.uk.`,
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
