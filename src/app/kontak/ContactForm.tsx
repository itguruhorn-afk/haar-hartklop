"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    try {
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Kon nie boodskap stuur nie");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Iets het verkeerd geloop");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center p-8 bg-brand-blush rounded-2xl">
        <span className="text-4xl mb-4 block">💌</span>
        <h3 className="font-heading text-xl text-brand-wine font-bold mb-2">
          Boodskap Gestuur!
        </h3>
        <p className="text-brand-ink/70">
          Dankie dat jy ons gekontak het. Ons sal binnekort terugkom na jou.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">{error}</div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-brand-ink mb-1">
          Naam *
        </label>
        <input type="text" id="name" name="name" required
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-ink mb-1">
          E-pos *
        </label>
        <input type="email" id="email" name="email" required
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
      </div>

      <div>
        <label htmlFor="enquiryType" className="block text-sm font-medium text-brand-ink mb-1">
          Tipe Navraag
        </label>
        <select id="enquiryType" name="enquiryType"
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red">
          <option value="">— Kies —</option>
          <option value="GENERAL">Algemene Navraag</option>
          <option value="SPEAKING">Spreekgeleentheid</option>
          <option value="BIBLE_STUDY">Bybelstudie Ondersteuning</option>
          <option value="OTHER">Ander</option>
        </select>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-brand-ink mb-1">
          Onderwerp *
        </label>
        <input type="text" id="subject" name="subject" required
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-ink mb-1">
          Boodskap *
        </label>
        <textarea id="message" name="message" rows={5} required
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3">
        {loading ? "Stuur..." : "Stuur Boodskap"}
      </button>
    </form>
  );
}
