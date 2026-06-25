"use client";

import { useState } from "react";

interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorContext: string | null;
  imageUrl: string | null;
}

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  if (testimonials.length === 0) return null;

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <div className="relative max-w-3xl mx-auto text-center">
      <div className="px-8 md:px-16">
        {/* Quote icon */}
        <svg className="w-12 h-12 mx-auto mb-6 text-brand-rose/40" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </svg>
        <blockquote className="font-heading text-xl md:text-2xl text-brand-ink italic leading-relaxed mb-6">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          {t.imageUrl && (
            <img src={t.imageUrl} alt={t.authorName} className="w-12 h-12 rounded-full object-cover" />
          )}
          <div className="text-left">
            <p className="font-semibold text-brand-wine">{t.authorName}</p>
            {t.authorContext && (
              <p className="text-sm text-brand-muted">{t.authorContext}</p>
            )}
          </div>
        </div>
      </div>

      {/* Arrows */}
      {testimonials.length > 1 && (
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-brand-rose/30 flex items-center justify-center text-brand-rose hover:bg-brand-rose/10 transition-colors"
            aria-label="Vorige getuienis"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-brand-rose/30 flex items-center justify-center text-brand-rose hover:bg-brand-rose/10 transition-colors"
            aria-label="Volgende getuienis"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
