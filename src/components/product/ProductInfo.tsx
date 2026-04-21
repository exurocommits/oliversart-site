"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { Price } from "./Price";
import { ScarcityIndicator } from "./ScarcityIndicator";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProductInfoProps {
  product: Product;
  artistName: string;
  artistSlug: string;
  categoryName: string;
  categorySlug: string;
}

export function ProductInfo({ product, artistName, artistSlug, categoryName, categorySlug }: ProductInfoProps) {
  const [expanded, setExpanded] = useState(false);
  const isLongDescription = product.description.length > 400;
  const displayedDescription = isLongDescription && !expanded
    ? product.description.slice(0, 400) + "..."
    : product.description;

  return (
    <div className="space-y-6">
      {/* Badges */}
      <div className="flex flex-wrap gap-2 animate-fade-up" style={{ animationDelay: "200ms" }}>
        {product.isNew && <Badge variant="new" />}
        {product.salePrice && <Badge variant="sale" />}
        {!product.inStock && <Badge variant="sold-out" />}
        {product.isSigned && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide bg-navy-mid text-gold border border-gold/30">
            ✍ Signed
          </span>
        )}
      </div>

      {/* Title */}
      <div className="animate-fade-up" style={{ animationDelay: "250ms" }}>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cream leading-tight">
          {product.title}
        </h1>
        <a
          href={`/gallery/${categorySlug}?artist=${encodeURIComponent(artistName)}`}
          className="text-gold hover:text-gold-dim transition-colors mt-1.5 inline-block"
        >
          by {artistName}
        </a>
      </div>

      {/* Price */}
      <div className="animate-fade-up" style={{ animationDelay: "300ms" }}>
        <Price price={product.price} salePrice={product.salePrice} size="lg" />
      </div>

      {/* Scarcity */}
      {product.editionType === "limited" && product.editionSize && product.editionRemaining !== undefined && (
        <div className="animate-fade-up" style={{ animationDelay: "350ms" }}>
          <ScarcityIndicator remaining={product.editionRemaining} total={product.editionSize} />
        </div>
      )}

      {/* Edition info */}
      <div className="animate-fade-up flex flex-wrap gap-3 text-sm text-cream-muted" style={{ animationDelay: "400ms" }}>
        <span className="inline-flex items-center gap-1.5">
          <svg className="w-4 h-4 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {product.editionType === "limited" ? `Edition of ${product.editionSize}` : "Open Edition"}
        </span>
        {product.isNumbered && (
          <span className="inline-flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
            Individually Numbered
          </span>
        )}
      </div>

      {/* Add to cart + wishlist */}
      <div className="animate-fade-up flex gap-3" style={{ animationDelay: "450ms" }}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!product.inStock}
          className="flex-1"
        >
          {product.inStock ? "Add to Collection" : "Sold Out"}
        </Button>
        <Button variant="outline" size="lg" className="shrink-0 w-12 !p-0 flex items-center justify-center" aria-label="Add to wishlist">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </Button>
      </div>

      {/* Trust signals */}
      <div className="animate-fade-up border-t border-navy-mid pt-5 grid grid-cols-3 gap-3" style={{ animationDelay: "500ms" }}>
        <TrustItem icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
        } label="Free UK Shipping" />
        <TrustItem icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        } label="Certificate of Authenticity" />
        <TrustItem icon={
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        } label="Secure Payment" />
      </div>

      {/* Description */}
      <div className="animate-fade-up border-t border-navy-mid pt-5" style={{ animationDelay: "550ms" }}>
        <h3 className="font-serif text-lg font-bold text-cream mb-3">Description</h3>
        <p className="text-cream-muted leading-relaxed whitespace-pre-line">{displayedDescription}</p>
        {isLongDescription && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-gold hover:text-gold-dim text-sm mt-2 transition-colors"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      {/* Specifications */}
      {product.specifications && (
        <div className="animate-fade-up border-t border-navy-mid pt-5" style={{ animationDelay: "600ms" }}>
          <h3 className="font-serif text-lg font-bold text-cream mb-3">Specifications</h3>
          <div className="bg-navy-light rounded-lg overflow-hidden divide-y divide-navy-mid">
            {Object.entries(product.specifications).map(([key, value]) =>
              value ? (
                <div key={key} className="flex justify-between px-4 py-2.5">
                  <span className="text-cream-muted text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span className="text-cream text-sm text-right">{String(value)}</span>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="text-gold/70">{icon}</div>
      <span className="text-[11px] text-cream-muted leading-tight">{label}</span>
    </div>
  );
}
