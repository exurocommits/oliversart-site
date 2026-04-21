"use client";

import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  return (
    <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 bg-white dark:bg-navy-light border border-border-light dark:border-navy-mid rounded-lg px-4 py-3 text-[#1a1a2e] dark:text-cream placeholder:text-text-muted-light/50 dark:placeholder:text-cream-muted/50 focus:outline-none focus:border-gold transition-colors"
      />
      <Button variant="primary" size="md">Subscribe</Button>
    </form>
  );
}
