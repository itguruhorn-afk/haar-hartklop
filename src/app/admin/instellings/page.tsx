"use client";

import { useState, useEffect } from "react";

interface Settings {
  id?: string;
  brandName: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  accentColor: string;
  headingFont: string;
  bodyFont: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  donationUrl: string;
  contactEmail: string;
}

export default function AdminInstellings() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => {
        // Site settings come as single item
        fetch("/api/admin/settings")
          .then((r) => r.json())
          .then(setSettings);
      })
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    if (!settings) return;
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return <p className="text-brand-muted">Laai...</p>;
  if (!settings) return <p className="text-brand-muted">Geen instellings nie</p>;

  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-wine font-bold mb-8">Werf Instellings</h1>

      <div className="bg-white rounded-2xl p-8 shadow-sm max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-brand-ink mb-1">Handelsnaam</label>
          <input className="w-full rounded-xl border-brand-cream"
            value={settings.brandName} onChange={(e) => setSettings({ ...settings, brandName: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-ink mb-1">Leuse</label>
          <input className="w-full rounded-xl border-brand-cream"
            value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-ink mb-1">Logo URL</label>
          <input className="w-full rounded-xl border-brand-cream"
            value={settings.logoUrl || ""} onChange={(e) => setSettings({ ...settings, logoUrl: e.target.value })} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-ink mb-1">Primêre Kleur</label>
            <div className="flex gap-2">
              <input type="color" className="w-12 h-10 rounded border-brand-cream"
                value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} />
              <input className="flex-1 rounded-xl border-brand-cream"
                value={settings.primaryColor} onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-ink mb-1">Aksentkleur</label>
            <div className="flex gap-2">
              <input type="color" className="w-12 h-10 rounded border-brand-cream"
                value={settings.accentColor} onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })} />
              <input className="flex-1 rounded-xl border-brand-cream"
                value={settings.accentColor} onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })} />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-ink mb-1">E-pos</label>
          <input className="w-full rounded-xl border-brand-cream" type="email"
            value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-ink mb-1">Facebook URL</label>
          <input className="w-full rounded-xl border-brand-cream"
            value={settings.facebookUrl} onChange={(e) => setSettings({ ...settings, facebookUrl: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-ink mb-1">Instagram URL</label>
          <input className="w-full rounded-xl border-brand-cream"
            value={settings.instagramUrl} onChange={(e) => setSettings({ ...settings, instagramUrl: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-ink mb-1">YouTube URL</label>
          <input className="w-full rounded-xl border-brand-cream"
            value={settings.youtubeUrl} onChange={(e) => setSettings({ ...settings, youtubeUrl: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-brand-ink mb-1">Skenkings URL</label>
          <input className="w-full rounded-xl border-brand-cream"
            value={settings.donationUrl} onChange={(e) => setSettings({ ...settings, donationUrl: e.target.value })} />
        </div>

        <button onClick={save} className="btn-primary w-full py-3">
          {saved ? "✓ Gestoor!" : "Stoor Instellings"}
        </button>
      </div>
    </div>
  );
}
