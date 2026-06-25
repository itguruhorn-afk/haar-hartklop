"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Slide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  primaryButtonLabel: string | null;
  primaryButtonUrl: string | null;
  secondaryButtonLabel: string | null;
  secondaryButtonUrl: string | null;
}

export function HeroCarousel({ slides }: { slides: Slide[] }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next, slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <section className="relative h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${s.imageUrl})` }}
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/70 via-brand-ink/20 to-brand-ink/30" />

      {/* Content */}
      <div className="relative h-full container-custom flex flex-col items-center justify-center text-center text-white">
        <h1
          key={`title-${current}`}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-[fadeInUp_0.6s_ease-out]"
        >
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p
            key={`sub-${current}`}
            className="text-lg md:text-xl max-w-2xl mb-8 text-brand-cream animate-[fadeInUp_0.6s_ease-out_0.1s_both]"
          >
            {slide.subtitle}
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          {slide.primaryButtonLabel && slide.primaryButtonUrl && (
            <Link
              href={slide.primaryButtonUrl}
              className="btn-primary text-lg px-8 py-4"
            >
              {slide.primaryButtonLabel}
            </Link>
          )}
          {slide.secondaryButtonLabel && slide.secondaryButtonUrl && (
            <Link
              href={slide.secondaryButtonUrl}
              className="btn-outline-light text-lg px-8 py-4"
            >
              {slide.secondaryButtonLabel}
            </Link>
          )}
        </div>
      </div>

      {/* Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => goTo((current - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            aria-label="Vorige"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goTo((current + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            aria-label="Volgende"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-white w-8" : "bg-white/50"
              }`}
              aria-label={`Gaan na skyfie ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
