"use client";

import { useState, useEffect } from "react";

interface Event {
  id: string;
  title: string;
  slug: string;
  type: string;
  description: string;
  startsAt: string | null;
  endsAt: string | null;
  location: string | null;
  heroImageUrl: string | null;
  videoEmbedUrl: string | null;
  registrationUrl: string | null;
  capacity: number | null;
  status: string;
}

export default function AdminGebeurtenisse() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => setEvents(data.events || []))
      .finally(() => setLoading(false));
  }, []);

  async function save(event: Event) {
    const method = event.id ? "PUT" : "POST";
    const url = event.id ? `/api/admin/events/${event.id}` : "/api/admin/events";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    const res = await fetch("/api/admin/data");
    const data = await res.json();
    setEvents(data.events || []);
  }

  function updateField(id: string, field: string, value: unknown) {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  }

  if (loading) return <p className="text-brand-muted">Laai...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl text-brand-wine font-bold">Bestuur Gebeurtenisse</h1>
        <button
          onClick={() => {
            const newEvent: Event = {
              id: "",
              title: "Nuwe Gebeurtenis",
              slug: "nuwe-gebeurtenis",
              type: "MEET_GREET",
              description: "",
              startsAt: null,
              endsAt: null,
              location: null,
              heroImageUrl: null,
              videoEmbedUrl: null,
              registrationUrl: null,
              capacity: null,
              status: "DRAFT",
            };
            save(newEvent);
          }}
          className="btn-primary"
        >
          + Nuwe Gebeurtenis
        </button>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-brand-muted mb-1">Titel</label>
                <input className="w-full rounded-xl border-brand-cream text-sm"
                  value={event.title} onChange={(e) => updateField(event.id, "title", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Slug</label>
                <input className="w-full rounded-xl border-brand-cream text-sm"
                  value={event.slug} onChange={(e) => updateField(event.id, "slug", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Tipe</label>
                <select className="w-full rounded-xl border-brand-cream text-sm"
                  value={event.type} onChange={(e) => updateField(event.id, "type", e.target.value)}>
                  <option value="MEET_GREET">Ontmoet en Groet</option>
                  <option value="CAMP">Kamp</option>
                  <option value="CONFERENCE">Konferensie</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Begin Datum</label>
                <input type="datetime-local" className="w-full rounded-xl border-brand-cream text-sm"
                  value={event.startsAt ? event.startsAt.slice(0, 16) : ""}
                  onChange={(e) => updateField(event.id, "startsAt", e.target.value ? new Date(e.target.value).toISOString() : null)} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Eindig Datum</label>
                <input type="datetime-local" className="w-full rounded-xl border-brand-cream text-sm"
                  value={event.endsAt ? event.endsAt.slice(0, 16) : ""}
                  onChange={(e) => updateField(event.id, "endsAt", e.target.value ? new Date(e.target.value).toISOString() : null)} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Status</label>
                <select className="w-full rounded-xl border-brand-cream text-sm"
                  value={event.status} onChange={(e) => updateField(event.id, "status", e.target.value)}>
                  <option value="DRAFT">Konsep</option>
                  <option value="PUBLISHED">Gepubliseer</option>
                  <option value="SOLD_OUT">Uitverkoop</option>
                  <option value="PAST">Verby</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-brand-muted mb-1">Ligging</label>
                <input className="w-full rounded-xl border-brand-cream text-sm"
                  value={event.location || ""} onChange={(e) => updateField(event.id, "location", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Registrasie URL</label>
                <input className="w-full rounded-xl border-brand-cream text-sm"
                  value={event.registrationUrl || ""} onChange={(e) => updateField(event.id, "registrationUrl", e.target.value)} />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs text-brand-muted mb-1">Beskrywing</label>
              <textarea className="w-full rounded-xl border-brand-cream text-sm" rows={3}
                value={event.description} onChange={(e) => updateField(event.id, "description", e.target.value)} />
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => save(event)} className="btn-primary">Stoor</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
