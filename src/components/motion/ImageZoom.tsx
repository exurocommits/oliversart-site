"use client";

import { useState, useRef, useCallback } from "react";

interface ImageZoomProps {
  src: string;
  alt: string;
  zoomLevel?: number;
  className?: string;
}

export function ImageZoom({ src, alt, zoomLevel = 1.5, className = "" }: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setPosition({ x, y });
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-zoom-in ${className}`}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300"
        style={
          isZoomed
            ? { transform: `scale(${zoomLevel})`, transformOrigin: `${position.x}% ${position.y}%` }
            : undefined
        }
      />
    </div>
  );
}
