"use client";

import { useState } from "react";

export function SalvationForm() {
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
      const res = await fetch("/api/verlossing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Kon nie vorm indien nie");
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
      <div className="text-center p-10 bg-white rounded-2xl shadow-sm">
        <span className="text-5xl mb-4 block">✝️</span>
        <h3 className="font-heading text-2xl text-brand-wine font-bold mb-2">
          Dankie dat jy uitgereik het!
        </h3>
        <p className="text-brand-ink/70">
          Iemand van ons span sal binnekort met jou in verbinding tree. Ons is so bly
          om saam met jou te stap op hierdie reis.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-brand-ink mb-1">
            Naam *
          </label>
          <input type="text" id="firstName" name="firstName" required
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-brand-ink mb-1">
            Van *
          </label>
          <input type="text" id="lastName" name="lastName" required
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-ink mb-1">
          E-pos *
        </label>
        <input type="email" id="email" name="email" required
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-ink mb-1">
            Telefoon
          </label>
          <input type="tel" id="phone" name="phone"
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
        </div>
        <div>
          <label htmlFor="preferredContactMethod" className="block text-sm font-medium text-brand-ink mb-1">
            Voorkeur Kontakmetode
          </label>
          <select id="preferredContactMethod" name="preferredContactMethod"
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red">
            <option value="">— Kies —</option>
            <option value="EMAIL">E-pos</option>
            <option value="PHONE">Telefoon</option>
            <option value="WHATSAPP">WhatsApp</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-brand-ink mb-1">
            Stad
          </label>
          <input type="text" id="city" name="city"
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
        </div>
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-brand-ink mb-1">
            Provinsie
          </label>
          <input type="text" id="province" name="province"
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red" />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-brand-ink mb-1">
          Boodskap / Vertel ons meer
        </label>
        <textarea id="message" name="message" rows={4}
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
          placeholder="Deel gerus jou storie of hoe ons jou kan ondersteun..." />
      </div>

      <div className="flex items-start gap-3">
        <input type="checkbox" id="newsletterOptIn" name="newsletterOptIn"
          className="mt-1 rounded border-brand-cream text-brand-red focus:ring-brand-red" />
        <label htmlFor="newsletterOptIn" className="text-sm text-brand-ink/70">
          Ek wil graag die Haar Hartklop nuusbrief ontvang vir weeklikse bemoediging.
        </label>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg">
        {loading ? "Stuur..." : "Stuur Boodskap"}
      </button>
    </form>
  );
}
