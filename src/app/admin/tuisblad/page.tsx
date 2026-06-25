"use client";

import { useState, useEffect } from "react";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  primaryButtonLabel: string | null;
  primaryButtonUrl: string | null;
  secondaryButtonLabel: string | null;
  secondaryButtonUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface FounderLetter {
  id: string;
  title: string;
  body: string;
  imageUrl: string | null;
  backgroundColor: string;
  isActive: boolean;
}

interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorContext: string | null;
  imageUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

export default function AdminTuisblad() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [founderLetters, setFounderLetters] = useState<FounderLetter[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeTab, setActiveTab] = useState<"hero" | "founder" | "testimonials">("hero");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        setHeroSlides(data.heroSlides || []);
        setFounderLetters(data.founderLetters || []);
        setTestimonials(data.testimonials || []);
      })
      .finally(() => setLoading(false));
  }, []);

  async function toggleActive(type: string, id: string, current: boolean) {
    await fetch(`/api/admin/${type}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !current }),
    });
    // Refresh
    const res = await fetch("/api/admin/data");
    const data = await res.json();
    setHeroSlides(data.heroSlides || []);
    setFounderLetters(data.founderLetters || []);
    setTestimonials(data.testimonials || []);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function saveItem(type: string, item: any) {
    const method = item.id ? "PUT" : "POST";
    const url = item.id ? `/api/admin/${type}/${item.id}` : `/api/admin/${type}`;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    const res = await fetch("/api/admin/data");
    const data = await res.json();
    setHeroSlides(data.heroSlides || []);
    setFounderLetters(data.founderLetters || []);
    setTestimonials(data.testimonials || []);
  }

  if (loading) return <p className="text-brand-muted">Laai...</p>;

  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-wine font-bold mb-8">Bestuur Tuisblad</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {[
          { key: "hero", label: "Heldede Skyfies" },
          { key: "founder", label: "Stigter Brief" },
          { key: "testimonials", label: "Getuienisse" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-brand-red text-white"
                : "bg-white text-brand-ink hover:bg-brand-cream"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Slides */}
      {activeTab === "hero" && (
        <div className="space-y-4">
          <button
            onClick={() => {
              const newSlide: HeroSlide = {
                id: "",
                title: "Nuwe Skyfie",
                subtitle: "",
                imageUrl: "/images/hero-1.jpg",
                primaryButtonLabel: "",
                primaryButtonUrl: "",
                secondaryButtonLabel: "",
                secondaryButtonUrl: "",
                sortOrder: heroSlides.length,
                isActive: true,
              };
              saveItem("heroSlides", newSlide);
            }}
            className="btn-primary mb-4"
          >
            + Voeg Skyfie By
          </button>
          {heroSlides.map((slide) => (
            <div key={slide.id} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-1 space-y-3 w-full">
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={slide.title}
                  onChange={(e) => {
                    const updated = heroSlides.map((s) =>
                      s.id === slide.id ? { ...s, title: e.target.value } : s
                    );
                    setHeroSlides(updated);
                  }}
                  placeholder="Titel"
                />
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={slide.subtitle || ""}
                  onChange={(e) => {
                    const updated = heroSlides.map((s) =>
                      s.id === slide.id ? { ...s, subtitle: e.target.value } : s
                    );
                    setHeroSlides(updated);
                  }}
                  placeholder="Subtitel"
                />
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={slide.imageUrl}
                  onChange={(e) => {
                    const updated = heroSlides.map((s) =>
                      s.id === slide.id ? { ...s, imageUrl: e.target.value } : s
                    );
                    setHeroSlides(updated);
                  }}
                  placeholder="Beeld URL"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    className="w-full rounded-xl border-brand-cream text-sm"
                    value={slide.primaryButtonLabel || ""}
                    onChange={(e) => {
                      const updated = heroSlides.map((s) =>
                        s.id === slide.id ? { ...s, primaryButtonLabel: e.target.value } : s
                      );
                      setHeroSlides(updated);
                    }}
                    placeholder="Knoppie 1"
                  />
                  <input
                    className="w-full rounded-xl border-brand-cream text-sm"
                    value={slide.primaryButtonUrl || ""}
                    onChange={(e) => {
                      const updated = heroSlides.map((s) =>
                        s.id === slide.id ? { ...s, primaryButtonUrl: e.target.value } : s
                      );
                      setHeroSlides(updated);
                    }}
                    placeholder="Knoppie 1 URL"
                  />
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleActive("heroSlides", slide.id, slide.isActive)}
                  className={`px-3 py-1 rounded-full text-xs ${slide.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {slide.isActive ? "Aktief" : "Onaktief"}
                </button>
                <button
                  onClick={() => saveItem("heroSlides", slide)}
                  className="px-4 py-2 bg-brand-red text-white rounded-xl text-sm"
                >
                  Stoor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Founder Letters */}
      {activeTab === "founder" && (
        <div className="space-y-4">
          {founderLetters.map((letter) => (
            <div key={letter.id} className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
              <input
                className="w-full rounded-xl border-brand-cream text-sm"
                value={letter.title}
                onChange={(e) => {
                  const updated = founderLetters.map((l) =>
                    l.id === letter.id ? { ...l, title: e.target.value } : l
                  );
                  setFounderLetters(updated);
                }}
                placeholder="Titel"
              />
              <textarea
                className="w-full rounded-xl border-brand-cream text-sm"
                rows={5}
                value={letter.body}
                onChange={(e) => {
                  const updated = founderLetters.map((l) =>
                    l.id === letter.id ? { ...l, body: e.target.value } : l
                  );
                  setFounderLetters(updated);
                }}
                placeholder="Inhoud"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={letter.imageUrl || ""}
                  onChange={(e) => {
                    const updated = founderLetters.map((l) =>
                      l.id === letter.id ? { ...l, imageUrl: e.target.value } : l
                    );
                    setFounderLetters(updated);
                  }}
                  placeholder="Beeld URL"
                />
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  type="color"
                  value={letter.backgroundColor}
                  onChange={(e) => {
                    const updated = founderLetters.map((l) =>
                      l.id === letter.id ? { ...l, backgroundColor: e.target.value } : l
                    );
                    setFounderLetters(updated);
                  }}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive("founderLetters", letter.id, letter.isActive)}
                  className={`px-3 py-1 rounded-full text-xs ${letter.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {letter.isActive ? "Aktief" : "Onaktief"}
                </button>
                <button
                  onClick={() => saveItem("founderLetters", letter)}
                  className="px-4 py-2 bg-brand-red text-white rounded-xl text-sm"
                >
                  Stoor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Testimonials */}
      {activeTab === "testimonials" && (
        <div className="space-y-4">
          <button
            onClick={() => {
              const newTestimonial: Testimonial = {
                id: "",
                quote: "Nuwe getuienis",
                authorName: "Naam",
                authorContext: "",
                imageUrl: null,
                sortOrder: testimonials.length,
                isActive: true,
              };
              saveItem("testimonials", newTestimonial);
            }}
            className="btn-primary mb-4"
          >
            + Voeg Getuienis By
          </button>
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
              <textarea
                className="w-full rounded-xl border-brand-cream text-sm"
                rows={3}
                value={t.quote}
                onChange={(e) => {
                  const updated = testimonials.map((x) =>
                    x.id === t.id ? { ...x, quote: e.target.value } : x
                  );
                  setTestimonials(updated);
                }}
                placeholder="Aanhaling"
              />
              <div className="grid grid-cols-3 gap-2">
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={t.authorName}
                  onChange={(e) => {
                    const updated = testimonials.map((x) =>
                      x.id === t.id ? { ...x, authorName: e.target.value } : x
                    );
                    setTestimonials(updated);
                  }}
                  placeholder="Outeur"
                />
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={t.authorContext || ""}
                  onChange={(e) => {
                    const updated = testimonials.map((x) =>
                      x.id === t.id ? { ...x, authorContext: e.target.value } : x
                    );
                    setTestimonials(updated);
                  }}
                  placeholder="Kontext"
                />
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  type="number"
                  value={t.sortOrder}
                  onChange={(e) => {
                    const updated = testimonials.map((x) =>
                      x.id === t.id ? { ...x, sortOrder: parseInt(e.target.value) || 0 } : x
                    );
                    setTestimonials(updated);
                  }}
                  placeholder="Volgorde"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive("testimonials", t.id, t.isActive)}
                  className={`px-3 py-1 rounded-full text-xs ${t.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                >
                  {t.isActive ? "Aktief" : "Onaktief"}
                </button>
                <button
                  onClick={() => saveItem("testimonials", t)}
                  className="px-4 py-2 bg-brand-red text-white rounded-xl text-sm"
                >
                  Stoor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
