"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SLIDES = [
  {
    url: "https://i0.wp.com/oliversart.com/wp-content/uploads/2021/08/Ace-Over-Normandy-by-Anthony-Saunders.jpg?fit=900%2C598&ssl=1",
    alt: "Ace Over Normandy by Anthony Saunders",
    kenBurnsClass: "kb-pan-right",
  },
  {
    url: "https://i0.wp.com/oliversart.com/wp-content/uploads/2022/01/Attack-on-the-Arizona-by-Keith-Burns.jpg?fit=900%2C592&ssl=1",
    alt: "Attack on the Arizona by Keith Burns",
    kenBurnsClass: "kb-pan-left",
  },
  {
    url: "https://i0.wp.com/oliversart.com/wp-content/uploads/2023/08/Flying-Tigers-by-James-Dietz.jpg?fit=900%2C407&ssl=1",
    alt: "Flying Tigers by James Dietz",
    kenBurnsClass: "kb-zoom-in",
  },
  {
    url: "https://i0.wp.com/oliversart.com/wp-content/uploads/2023/10/Color-Guard-by-James-Dietz-Limited-Edition.jpg?fit=900%2C465&ssl=1",
    alt: "Color Guard by James Dietz",
    kenBurnsClass: "kb-pan-up",
  },
  {
    url: "https://i0.wp.com/oliversart.com/wp-content/uploads/2023/06/Blue-Horizon-by-Keith-Burns.jpg?fit=835%2C481&ssl=1",
    alt: "Blue Horizon by Keith Burns",
    kenBurnsClass: "kb-zoom-out",
  },
];

const SLIDE_DURATION = 5500;
const FADE_DURATION = 1800;
const TOTAL_CYCLE = SLIDE_DURATION + FADE_DURATION;

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax
  useEffect(() => {
    let ticking = false;
    const handle = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Advance slideshow
  const advance = useCallback(() => {
    setIsTransitioning(true);
    setPrev(current);
    setCurrent((current + 1) % SLIDES.length);
  }, [current]);

  // Auto-advance timer
  useEffect(() => {
    const id = setTimeout(advance, SLIDE_DURATION);
    return () => clearTimeout(id);
  }, [advance]);

  // Clear transition state after fade completes
  useEffect(() => {
    if (!isTransitioning) return;
    if (animTimerRef.current) clearTimeout(animTimerRef.current);
    animTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setPrev(null);
    }, FADE_DURATION);
    return () => {
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, [isTransitioning]);

  const parallaxOffset = scrollY * 0.35;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Parallax wrapper */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        {/* Previous slide — crossfading out */}
        {prev !== null && (
          <div className="hero-slide hero-slide--exiting absolute inset-0">
            <img
              src={SLIDES[prev].url}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 w-full h-full object-cover ${SLIDES[prev].kenBurnsClass}`}
            />
          </div>
        )}

        {/* Current slide — crossfading in or fully visible */}
        <div
          className={`absolute inset-0 ${
            isTransitioning ? "hero-slide hero-slide--entering" : ""
          }`}
        >
          <img
            src={SLIDES[current].url}
            alt={SLIDES[current].alt}
            className={`absolute inset-0 w-full h-full object-cover ${SLIDES[current].kenBurnsClass}`}
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-up">
          <p className="text-gold text-sm sm:text-base uppercase tracking-[0.3em] font-semibold mb-6">
            Exciting Art. Action Art.
          </p>
        </div>
        <div
          style={{ opacity: 0, animation: "fade-up 0.8s ease 0.3s forwards" }}
        >
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
            Limited Edition Prints
            <br />
            <span className="text-gold">That Capture History</span>
          </h1>
        </div>
        <div
          style={{ opacity: 0, animation: "fade-up 0.8s ease 0.6s forwards" }}
        >
          <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Hand-signed aviation, motorsport, and maritime art from the
            world&apos;s leading artists. Each print a window into a moment that
            changed everything.
          </p>
        </div>
        <div
          style={{ opacity: 0, animation: "fade-up 0.8s ease 0.9s forwards" }}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/gallery/aviation"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-gold text-white font-semibold rounded-lg hover:bg-gold-dim transition-all duration-200 text-base"
            >
              Explore Collection
            </a>
            <a
              href="/latest-releases"
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 text-base"
            >
              Latest Releases
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div
          className="flex flex-col items-center gap-2"
          style={{ opacity: 0, animation: "fade-in 0.4s ease 1.4s forwards" }}
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em] font-medium">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent animate-scroll-pulse" />
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-8 z-10 flex gap-1.5">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className="h-0.5 rounded-full transition-all duration-500"
            style={{
              width: i === current ? "24px" : "8px",
              backgroundColor:
                i === current
                  ? "var(--color-gold)"
                  : "rgba(255,255,255,0.3)",
            }}
          />
        ))}
      </div>
    </section>
  );
}
