import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { slug: string };
}

async function getProduct(slug: string) {
  return prisma.product.findUnique({ where: { slug } });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const statusLabels: Record<string, string> = {
    ACTIVE: "Beskikbaar",
    SOLD_OUT: "Uitverkoop",
    COMING_SOON: "Kom Binnekort",
  };

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          <Link
            href="/winkel"
            className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-red mb-8 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terug na Winkel
          </Link>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-square bg-brand-cream rounded-2xl overflow-hidden">
              {product.mainImageUrl ? (
                <img
                  src={product.mainImageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-heading text-6xl text-brand-rose">
                  {product.title.charAt(0)}
                </div>
              )}
            </div>

            {/* Details */}
            <div>
              <p className="text-sm text-brand-red uppercase tracking-wide font-semibold mb-2">
                {product.category === "BYBELSTUDIE"
                  ? "Bybelstudie Inhoud"
                  : product.category === "RR_VERSAMELING"
                  ? "R&R Versameling"
                  : "Konferensie Goedere"}
              </p>
              <h1 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold mb-4">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl text-brand-red font-bold">
                  R{product.price.toFixed(0)}
                </span>
                {product.salePrice && (
                  <span className="text-brand-muted line-through text-lg">
                    R{product.salePrice.toFixed(0)}
                  </span>
                )}
              </div>

              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 ${
                  product.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : product.status === "SOLD_OUT"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {statusLabels[product.status] || product.status}
              </span>

              <div className="prose text-brand-ink/70 mb-8 leading-relaxed whitespace-pre-line">
                {product.description}
              </div>

              {product.status === "ACTIVE" && (
                <div className="space-y-3">
                  {product.externalCheckoutUrl ? (
                    <a
                      href={product.externalCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full py-4 text-lg text-center"
                    >
                      Koop Nou
                    </a>
                  ) : (
                    <button disabled className="btn-primary w-full py-4 text-lg opacity-50 cursor-not-allowed">
                      Binnekort Beskikbaar
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
