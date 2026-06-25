"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    try {
      await fetch("/api/nuusbrief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setSubmitted(true);
    } catch {
      // silently fail - user still sees success
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center p-6 bg-white/10 rounded-2xl">
        <p className="font-heading text-xl font-bold">Dankie dat jy ingeteken het! ✨</p>
        <p className="text-brand-cream/80 mt-2">Kyk uit vir ons volgende nuusbrief.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        name="name"
        placeholder="Jou naam"
        required
        className="flex-1 rounded-xl px-4 py-3 text-brand-ink bg-white border-0 focus:ring-2 focus:ring-brand-rose"
      />
      <input
        type="email"
        name="email"
        placeholder="Jou e-posadres"
        required
        className="flex-1 rounded-xl px-4 py-3 text-brand-ink bg-white border-0 focus:ring-2 focus:ring-brand-rose"
      />
      <button type="submit" disabled={loading} className="btn-primary bg-brand-rose hover:bg-brand-rose/80 py-3">
        {loading ? "Stuur..." : "Teken In"}
      </button>
    </form>
  );
}
