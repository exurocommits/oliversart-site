"use client";

export function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company */}
          <div>
            <h3 className="text-gold font-serif text-lg font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-text-muted hover:text-gold transition-colors text-sm">About Oliver&apos;s Art</a></li>
              <li><a href="/about" className="text-text-muted hover:text-gold transition-colors text-sm">Our Story</a></li>
              <li><a href="/artists" className="text-text-muted hover:text-gold transition-colors text-sm">Meet the Artists</a></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-gold font-serif text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              {["Aviation", "Motorsport", "Maritime", "Wildlife"].map((cat) => (
                <li key={cat}>
                  <a href={`/${cat.toLowerCase()}`} className="text-text-muted hover:text-gold transition-colors text-sm">
                    {cat} Art
                  </a>
                </li>
              ))}
              <li><a href="/latest-releases" className="text-text-muted hover:text-gold transition-colors text-sm">Latest Releases</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gold font-serif text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="/faqs" className="text-text-muted hover:text-gold transition-colors text-sm">FAQs</a></li>
              <li><a href="/shipping-returns" className="text-text-muted hover:text-gold transition-colors text-sm">Shipping & Returns</a></li>
              <li><a href="/contact" className="text-text-muted hover:text-gold transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-gold font-serif text-lg font-bold mb-4">Connect</h3>
            <p className="text-text-muted text-sm mb-4">Never miss a new release. Join our collector community.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-surface border border-border rounded px-3 py-2 text-sm text-text placeholder:text-text-muted/50 focus:outline-none focus:border-gold transition-colors"
              />
              <button type="submit" className="bg-gold text-surface px-4 py-2 rounded text-sm font-semibold hover:bg-gold-dim transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Oliver&apos;s Art. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-text-muted hover:text-gold transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-text-muted hover:text-gold transition-colors text-sm">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
