"use client";

import { useState, useEffect } from "react";

interface BibleStudy {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string | null;
  price: number;
  capacity: number | null;
  registrationStatus: string;
  format: string;
  zoomUrlPrivate: string | null;
  digitalDownloadPrivateUrl: string | null;
  hardcopyAvailable: boolean;
  courierNotes: string | null;
  startsAt: string | null;
  isActive: boolean;
}

export default function AdminBybelstudies() {
  const [studies, setStudies] = useState<BibleStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => setStudies(data.bibleStudies || []))
      .finally(() => setLoading(false));
  }, []);

  async function save(study: BibleStudy) {
    const method = study.id ? "PUT" : "POST";
    const url = study.id ? `/api/admin/bibleStudies/${study.id}` : "/api/admin/bibleStudies";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(study),
    });
    const res = await fetch("/api/admin/data");
    const data = await res.json();
    setStudies(data.bibleStudies || []);
  }

  function updateField(id: string, field: string, value: unknown) {
    setStudies((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  if (loading) return <p className="text-brand-muted">Laai...</p>;

  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-wine font-bold mb-8">Bestuur Bybelstudies</h1>

      <div className="space-y-6">
        {studies.map((study) => (
          <div key={study.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs text-brand-muted mb-1">Titel</label>
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={study.title}
                  onChange={(e) => updateField(study.id, "title", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Slug</label>
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={study.slug}
                  onChange={(e) => updateField(study.id, "slug", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Prys (R)</label>
                <input
                  type="number"
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={study.price}
                  onChange={(e) => updateField(study.id, "price", parseFloat(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Kapasiteit</label>
                <input
                  type="number"
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={study.capacity || ""}
                  onChange={(e) => updateField(study.id, "capacity", parseInt(e.target.value) || null)}
                />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Status</label>
                <select
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={study.registrationStatus}
                  onChange={(e) => updateField(study.id, "registrationStatus", e.target.value)}
                >
                  <option value="DRAFT">Konsep</option>
                  <option value="OPEN">Oop</option>
                  <option value="CLOSED">Gesluit</option>
                  <option value="FULL">Vol</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Formaat</label>
                <select
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={study.format}
                  onChange={(e) => updateField(study.id, "format", e.target.value)}
                >
                  <option value="DIGITAL">Digitaal</option>
                  <option value="HARDCOPY">Hardekopie</option>
                  <option value="BOTH">Beide</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-brand-muted mb-1">Beskrywing</label>
              <textarea
                className="w-full rounded-xl border-brand-cream text-sm"
                rows={3}
                value={study.description}
                onChange={(e) => updateField(study.id, "description", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs text-brand-muted mb-1">Zoom Skakel (privaat)</label>
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={study.zoomUrlPrivate || ""}
                  onChange={(e) => updateField(study.id, "zoomUrlPrivate", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Omslagbeeld URL</label>
                <input
                  className="w-full rounded-xl border-brand-cream text-sm"
                  value={study.coverImageUrl || ""}
                  onChange={(e) => updateField(study.id, "coverImageUrl", e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={study.hardcopyAvailable}
                  onChange={(e) => updateField(study.id, "hardcopyAvailable", e.target.checked)}
                  className="rounded border-brand-cream text-brand-red"
                />
                Hardekopie beskikbaar
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={study.isActive}
                  onChange={(e) => updateField(study.id, "isActive", e.target.checked)}
                  className="rounded border-brand-cream text-brand-red"
                />
                Aktief
              </label>
              <button onClick={() => save(study)} className="btn-primary ml-auto">
                Stoor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
