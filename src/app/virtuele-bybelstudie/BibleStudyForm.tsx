"use client";

import { useState } from "react";

interface Study {
  id: string;
  title: string;
}

export function BibleStudyForm({ studies }: { studies: Study[] }) {
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
      const res = await fetch("/api/registrasies/bybelstudie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Kon nie registreer nie");
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
      <div className="text-center p-10 bg-brand-blush rounded-2xl">
        <span className="text-5xl mb-4 block">🙏</span>
        <h3 className="font-heading text-2xl text-brand-wine font-bold mb-2">
          Dankie vir jou Registrasie!
        </h3>
        <p className="text-brand-ink/70">
          Ons het jou registrasie ontvang en sal binnekort kontak maak met verdere besonderhede.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm">{error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-brand-ink mb-1">
            Naam *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-brand-ink mb-1">
            Van *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-brand-ink mb-1">
            E-pos *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-brand-ink mb-1">
            Telefoon
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-brand-ink mb-1">
            Stad
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
          />
        </div>
        <div>
          <label htmlFor="province" className="block text-sm font-medium text-brand-ink mb-1">
            Provinsie
          </label>
          <input
            type="text"
            id="province"
            name="province"
            className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
          />
        </div>
      </div>

      <div>
        <label htmlFor="bibleStudyId" className="block text-sm font-medium text-brand-ink mb-1">
          Kies Studie *
        </label>
        <select
          id="bibleStudyId"
          name="bibleStudyId"
          required
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
        >
          <option value="">— Kies 'n studie —</option>
          {studies.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="preferredFormat" className="block text-sm font-medium text-brand-ink mb-1">
          Verkose Formaat *
        </label>
        <select
          id="preferredFormat"
          name="preferredFormat"
          required
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
        >
          <option value="">— Kies formaat —</option>
          <option value="DIGITAL">Digitaal</option>
          <option value="HARDCOPY">Hardekopie</option>
          <option value="BOTH">Beide</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-brand-ink mb-1">
          Bykomende Notas
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          className="w-full rounded-xl border-brand-cream focus:border-brand-red focus:ring-brand-red"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          className="mt-1 rounded border-brand-cream text-brand-red focus:ring-brand-red"
        />
        <label htmlFor="consent" className="text-sm text-brand-ink/70">
          Ek stem in dat Haar Hartklop my kontak oor hierdie Bybelstudie en verwante
          gemeenskapsopdaterings. *
        </label>
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-lg">
        {loading ? "Stuur..." : "Registreer Nou"}
      </button>
    </form>
  );
}
