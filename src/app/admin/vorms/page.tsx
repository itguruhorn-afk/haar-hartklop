"use client";

import { useState, useEffect } from "react";

interface Sub {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  subject?: string;
  enquiryType?: string;
  message?: string;
  status?: string;
  createdAt: string;
  bibleStudy?: { title: string };
  interest?: string;
  phone?: string;
  city?: string;
  province?: string;
}

export default function AdminVorms() {
  const [data, setData] = useState<{
    newsletterSubscribers: Sub[];
    salvationSubmissions: Sub[];
    contactSubmissions: Sub[];
    bibleStudyRegistrations: Sub[];
  } | null>(null);
  const [activeTab, setActiveTab] = useState<string>("newsletter");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  async function updateStatus(type: string, id: string, status: string) {
    await fetch(`/api/admin/${type}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const res = await fetch("/api/admin/data");
    setData(await res.json());
  }

  async function exportCSV(type: string) {
    window.open(`/api/admin/export/${type}`, "_blank");
  }

  if (loading) return <p className="text-brand-muted">Laai...</p>;
  if (!data) return null;

  const tabs = [
    { key: "contact", label: "Kontak Boodskappe", count: data.contactSubmissions.length },
    { key: "salvation", label: "Verlossing Navrae", count: data.salvationSubmissions.length },
    { key: "bibleStudy", label: "Bybelstudie Registrasies", count: data.bibleStudyRegistrations.length },
    { key: "newsletter", label: "Nuusbrief", count: data.newsletterSubscribers.length },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl text-brand-wine font-bold mb-8">Vorms & Inskrywings</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-brand-red text-white"
                : "bg-white text-brand-ink hover:bg-brand-cream"
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Contact Submissions */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-heading text-lg text-brand-wine font-semibold">Kontak Boodskappe</h2>
            <button onClick={() => exportCSV("contact")} className="text-sm text-brand-red hover:underline">
              Voer CSV Uit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-cream/50">
                <tr>
                  <th className="text-left p-3 font-medium">Naam</th>
                  <th className="text-left p-3 font-medium">E-pos</th>
                  <th className="text-left p-3 font-medium">Onderwerp</th>
                  <th className="text-left p-3 font-medium">Tipe</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Datum</th>
                  <th className="text-left p-3 font-medium">Aksies</th>
                </tr>
              </thead>
              <tbody>
                {data.contactSubmissions.map((sub) => (
                  <tr key={sub.id} className="border-t hover:bg-brand-cream/30">
                    <td className="p-3">{sub.name}</td>
                    <td className="p-3">{sub.email}</td>
                    <td className="p-3">{sub.subject}</td>
                    <td className="p-3">{sub.enquiryType || "—"}</td>
                    <td className="p-3">
                      <select
                        value={sub.status || "NEW"}
                        onChange={(e) => updateStatus("contactSubmissions", sub.id, e.target.value)}
                        className="text-xs rounded-lg border-brand-cream py-1"
                      >
                        <option value="NEW">Nuut</option>
                        <option value="IN_PROGRESS">In Proses</option>
                        <option value="CONTACTED">Gekontak</option>
                        <option value="CLOSED">Afgehandel</option>
                      </select>
                    </td>
                    <td className="p-3 text-brand-muted">{new Date(sub.createdAt).toLocaleDateString("af-ZA")}</td>
                    <td className="p-3">
                      <button
                        onClick={() => alert(sub.message)}
                        className="text-brand-red hover:underline text-xs"
                      >
                        Lees
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Salvation Submissions */}
      {activeTab === "salvation" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-heading text-lg text-brand-wine font-semibold">Verlossing Navrae</h2>
            <button onClick={() => exportCSV("salvation")} className="text-sm text-brand-red hover:underline">
              Voer CSV Uit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-cream/50">
                <tr>
                  <th className="text-left p-3 font-medium">Naam</th>
                  <th className="text-left p-3 font-medium">E-pos</th>
                  <th className="text-left p-3 font-medium">Telefoon</th>
                  <th className="text-left p-3 font-medium">Ligging</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-left p-3 font-medium">Datum</th>
                  <th className="text-left p-3 font-medium">Aksies</th>
                </tr>
              </thead>
              <tbody>
                {data.salvationSubmissions.map((sub) => (
                  <tr key={sub.id} className="border-t hover:bg-brand-cream/30">
                    <td className="p-3">{sub.firstName} {sub.lastName}</td>
                    <td className="p-3">{sub.email}</td>
                    <td className="p-3">{sub.phone || "—"}</td>
                    <td className="p-3">{sub.city || "—"}</td>
                    <td className="p-3">
                      <select
                        value={sub.status || "NEW"}
                        onChange={(e) => updateStatus("salvationSubmissions", sub.id, e.target.value)}
                        className="text-xs rounded-lg border-brand-cream py-1"
                      >
                        <option value="NEW">Nuut</option>
                        <option value="IN_PROGRESS">In Proses</option>
                        <option value="CONTACTED">Gekontak</option>
                        <option value="CLOSED">Afgehandel</option>
                      </select>
                    </td>
                    <td className="p-3 text-brand-muted">{new Date(sub.createdAt).toLocaleDateString("af-ZA")}</td>
                    <td className="p-3">
                      <button onClick={() => alert(sub.message)} className="text-brand-red hover:underline text-xs">
                        Lees
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Bible Study Registrations */}
      {activeTab === "bibleStudy" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-heading text-lg text-brand-wine font-semibold">Bybelstudie Registrasies</h2>
            <button onClick={() => exportCSV("bibleStudy")} className="text-sm text-brand-red hover:underline">
              Voer CSV Uit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-cream/50">
                <tr>
                  <th className="text-left p-3 font-medium">Naam</th>
                  <th className="text-left p-3 font-medium">E-pos</th>
                  <th className="text-left p-3 font-medium">Studie</th>
                  <th className="text-left p-3 font-medium">Formaat</th>
                  <th className="text-left p-3 font-medium">Betaling</th>
                  <th className="text-left p-3 font-medium">Datum</th>
                </tr>
              </thead>
              <tbody>
                {data.bibleStudyRegistrations.map((sub: Sub & { preferredFormat?: string; paymentStatus?: string }) => (
                  <tr key={sub.id} className="border-t hover:bg-brand-cream/30">
                    <td className="p-3">{sub.firstName} {sub.lastName}</td>
                    <td className="p-3">{sub.email}</td>
                    <td className="p-3">{sub.bibleStudy?.title || "—"}</td>
                    <td className="p-3">{sub.preferredFormat || "—"}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        sub.paymentStatus === "PAID" ? "bg-green-100 text-green-700" :
                        sub.paymentStatus === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500"
                      }`}>
                        {sub.paymentStatus === "PAID" ? "Betaal" : sub.paymentStatus === "PENDING" ? "Hangend" : sub.paymentStatus || "—"}
                      </span>
                    </td>
                    <td className="p-3 text-brand-muted">{new Date(sub.createdAt).toLocaleDateString("af-ZA")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Newsletter Subscribers */}
      {activeTab === "newsletter" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-heading text-lg text-brand-wine font-semibold">Nuusbrief Inskrywings</h2>
            <button onClick={() => exportCSV("newsletter")} className="text-sm text-brand-red hover:underline">
              Voer CSV Uit
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-brand-cream/50">
                <tr>
                  <th className="text-left p-3 font-medium">Naam</th>
                  <th className="text-left p-3 font-medium">E-pos</th>
                  <th className="text-left p-3 font-medium">Belangstelling</th>
                  <th className="text-left p-3 font-medium">Datum</th>
                </tr>
              </thead>
              <tbody>
                {data.newsletterSubscribers.map((sub) => (
                  <tr key={sub.id} className="border-t hover:bg-brand-cream/30">
                    <td className="p-3">{sub.name}</td>
                    <td className="p-3">{sub.email}</td>
                    <td className="p-3">{sub.interest || "—"}</td>
                    <td className="p-3 text-brand-muted">{new Date(sub.createdAt).toLocaleDateString("af-ZA")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
