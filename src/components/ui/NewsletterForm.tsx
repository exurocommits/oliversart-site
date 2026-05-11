"use client";

import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 bg-surface border border-border rounded-lg px-4 py-3 text-text placeholder:text-text-muted/50 focus:outline-none focus:border-gold transition-colors"
      />
      <Button variant="primary" size="md">Subscribe</Button>
    </form>
  );
}
