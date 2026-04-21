"use client";

import { useState, useCallback } from "react";
import type { ProductImage } from "@/types/product";
import { Lightbox } from "@/components/ui/Lightbox";

interface ImageGalleryProps {
  images: ProductImage[];
  productTitle: string;
}

export function ImageGallery({ images, productTitle }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);
  const [isZooming, setIsZooming] = useState(false);

  const sorted = [...images].sort((a, b) => {
    if (a.isPrimary) return -1;
    if (b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  const current = sorted[selectedIndex];

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      setZoomPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    },
    []
  );

  const lightboxImages = sorted.map((img) => ({ id: img.id, url: img.url, alt: img.alt || productTitle }));

  return (
    <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
      {/* Main image */}
      <div
        className="relative aspect-[4/3] bg-navy-light rounded-xl overflow-hidden cursor-zoom-in group"
        onClick={() => setLightboxOpen(true)}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => { setIsZooming(false); setZoomPos(null); }}
        onMouseMove={handleMouseMove}
      >
        {current ? (
          <img
            src={current.url}
            alt={current.alt || productTitle}
            className={`w-full h-full object-cover transition-transform duration-200 ${
              isZooming && zoomPos ? "scale-150" : ""
            }`}
            style={
              isZooming && zoomPos
                ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                : undefined
            }
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy-mid to-navy-deep flex items-center justify-center">
            <span className="font-serif text-cream-muted text-lg">{productTitle}</span>
          </div>
        )}

        {/* Zoom hint */}
        <div className="absolute bottom-3 right-3 bg-navy-deep/70 backdrop-blur-sm text-cream-muted text-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          Click to expand
        </div>
      </div>

      {/* Thumbnails */}
      {sorted.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {sorted.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelectedIndex(i)}
              className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                i === selectedIndex
                  ? "border-gold ring-1 ring-gold/30"
                  : "border-transparent hover:border-navy-mid"
              }`}
            >
              <img
                src={img.url}
                alt={img.alt || `${productTitle} view ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setSelectedIndex}
      />
    </div>
  );
}
