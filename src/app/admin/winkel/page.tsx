"use client";

import { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  salePrice: number | null;
  mainImageUrl: string | null;
  status: string;
  inventoryCount: number | null;
  externalCheckoutUrl: string | null;
}

export default function AdminWinkel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/data")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .finally(() => setLoading(false));
  }, []);

  async function save(product: Product) {
    const method = product.id ? "PUT" : "POST";
    const url = product.id ? `/api/admin/products/${product.id}` : "/api/admin/products";
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const res = await fetch("/api/admin/data");
    const data = await res.json();
    setProducts(data.products || []);
  }

  function updateField(id: string, field: string, value: unknown) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  if (loading) return <p className="text-brand-muted">Laai...</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl text-brand-wine font-bold">Bestuur Winkel</h1>
        <button
          onClick={() => {
            const newProduct: Product = {
              id: "",
              title: "Nuwe Produk",
              slug: "nuwe-produk",
              category: "BYBELSTUDIE",
              description: "",
              price: 0,
              salePrice: null,
              mainImageUrl: null,
              status: "DRAFT",
              inventoryCount: null,
              externalCheckoutUrl: null,
            };
            save(newProduct);
          }}
          className="btn-primary"
        >
          + Nuwe Produk
        </button>
      </div>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs text-brand-muted mb-1">Titel</label>
                <input className="w-full rounded-xl border-brand-cream text-sm"
                  value={product.title} onChange={(e) => updateField(product.id, "title", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Slug</label>
                <input className="w-full rounded-xl border-brand-cream text-sm"
                  value={product.slug} onChange={(e) => updateField(product.id, "slug", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Kategorie</label>
                <select className="w-full rounded-xl border-brand-cream text-sm"
                  value={product.category} onChange={(e) => updateField(product.id, "category", e.target.value)}>
                  <option value="BYBELSTUDIE">Bybelstudie</option>
                  <option value="RR_VERSAMELING">R&R Versameling</option>
                  <option value="KONFERENSIE">Konferensie</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Prys (R)</label>
                <input type="number" className="w-full rounded-xl border-brand-cream text-sm"
                  value={product.price} onChange={(e) => updateField(product.id, "price", parseFloat(e.target.value))} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Afslag Prys (R)</label>
                <input type="number" className="w-full rounded-xl border-brand-cream text-sm"
                  value={product.salePrice || ""} onChange={(e) => updateField(product.id, "salePrice", e.target.value ? parseFloat(e.target.value) : null)} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Status</label>
                <select className="w-full rounded-xl border-brand-cream text-sm"
                  value={product.status} onChange={(e) => updateField(product.id, "status", e.target.value)}>
                  <option value="DRAFT">Konsep</option>
                  <option value="ACTIVE">Aktief</option>
                  <option value="SOLD_OUT">Uitverkoop</option>
                  <option value="COMING_SOON">Kom Binnekort</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-brand-muted mb-1">Beskrywing</label>
              <textarea className="w-full rounded-xl border-brand-cream text-sm" rows={3}
                value={product.description} onChange={(e) => updateField(product.id, "description", e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs text-brand-muted mb-1">Beeld URL</label>
                <input className="w-full rounded-xl border-brand-cream text-sm"
                  value={product.mainImageUrl || ""} onChange={(e) => updateField(product.id, "mainImageUrl", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs text-brand-muted mb-1">Eksterne Betaalskakel</label>
                <input className="w-full rounded-xl border-brand-cream text-sm"
                  value={product.externalCheckoutUrl || ""} onChange={(e) => updateField(product.id, "externalCheckoutUrl", e.target.value)} />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => save(product)} className="btn-primary">Stoor</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
