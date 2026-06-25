"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DashboardData {
  heroSlides: unknown[];
  bibleStudies: unknown[];
  events: unknown[];
  products: unknown[];
  newsletterSubscribers: unknown[];
  bibleStudyRegistrations: unknown[];
  salvationSubmissions: unknown[];
  contactSubmissions: unknown[];
}

function isDataValid(data: unknown): data is DashboardData {
  if (!data || typeof data !== "object") return false;
  const d = data as Record<string, unknown>;
  return Array.isArray(d.heroSlides) && Array.isArray(d.bibleStudies) &&
    Array.isArray(d.events) && Array.isArray(d.products);
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
          setData(null);
        } else if (isDataValid(json)) {
          setData(json);
        } else {
          setError("Ongeldige data ontvang");
        }
      })
      .catch((err) => setError(err.message || "Kon nie data laai nie"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        <p className="text-brand-muted">Laai data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl inline-block">
          <p className="font-semibold mb-2">Fout</p>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary mt-4">
            Probeer Weer
          </button>
        </div>
      </div>
    );
  }

  const stats = data
    ? [
        { label: "Tuisblad Skyfies", value: data.heroSlides.length, href: "/admin/tuisblad", color: "bg-brand-red" },
        { label: "Bybelstudies", value: data.bibleStudies.length, href: "/admin/bybelstudies", color: "bg-brand-wine" },
        { label: "Gebeurtenisse", value: data.events.length, href: "/admin/gebeurtenisse", color: "bg-brand-olive" },
        { label: "Winkel Produkte", value: data.products.length, href: "/admin/winkel", color: "bg-brand-rose" },
        { label: "Nuusbrief Inskrywings", value: data.newsletterSubscribers.length, href: "/admin/vorms", color: "bg-blue-500" },
        { label: "Bybelstudie Registrasies", value: data.bibleStudyRegistrations.length, href: "/admin/vorms", color: "bg-purple-500" },
        { label: "Verlossing Navrae", value: data.salvationSubmissions.length, href: "/admin/vorms", color: "bg-amber-500" },
        { label: "Kontak Boodskappe", value: data.contactSubmissions.length, href: "/admin/vorms", color: "bg-teal-500" },
      ]
    : [];

  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-wine font-bold mb-8">Admin Oorsig</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white text-lg mb-4`}>
              {stat.value}
            </div>
            <p className="text-sm text-brand-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-8 bg-white rounded-2xl shadow-sm">
        <h2 className="font-heading text-xl text-brand-wine font-bold mb-4">
          Vinnige Skakels
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Wysig Tuisblad", href: "/admin/tuisblad" },
            { label: "Bestuur Bybelstudies", href: "/admin/bybelstudies" },
            { label: "Voeg Gebeurtenis By", href: "/admin/gebeurtenisse" },
            { label: "Bestuur Winkel", href: "/admin/winkel" },
            { label: "Kyk Vorms", href: "/admin/vorms" },
            { label: "Werf Instellings", href: "/admin/instellings" },
            { label: "Publieke Werf", href: "/" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-3 text-sm text-brand-ink bg-brand-cream rounded-xl hover:bg-brand-rose hover:text-white transition-colors text-center"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
