import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getProducts() {
  return prisma.product.findMany({
    where: { status: { not: "DRAFT" } },
    orderBy: { createdAt: "desc" },
  });
}

const categoryLabels: Record<string, string> = {
  BYBELSTUDIE: "Bybelstudie Inhoud",
  RR_VERSAMELING: "R&R Versameling",
  KONFERENSIE: "Konferensie Goedere",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Beskikbaar",
  SOLD_OUT: "Uitverkoop",
  COMING_SOON: "Kom Binnekort",
};

export default async function ShopPage() {
  const products = await getProducts();

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <>
      <section className="relative bg-brand-rose text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/images/hero-2.jpg')] bg-cover bg-center opacity-25" />
        <div className="relative container-custom text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Winkel
          </h1>
          <p className="text-xl text-brand-blush max-w-2xl mx-auto">
            Bybelstudie-hulpbronne, geloofs-geïnspireerde stukke en meer.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-6xl mb-6 block">🛍️</span>
              <h2 className="font-heading text-3xl text-brand-wine font-bold mb-4">
                Produkte kom binnekort
              </h2>
              <p className="text-brand-muted max-w-md mx-auto">
                Ons is besig om ons winkel te vul met pragtige hulpbronne.
                Teken in op ons nuusbrief om ingelig te bly.
              </p>
            </div>
          ) : (
            <>
              {/* Category filter */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href={`#${cat}`}
                    className="px-5 py-2 rounded-full bg-brand-cream text-brand-ink text-sm font-medium hover:bg-brand-rose hover:text-white transition-colors"
                  >
                    {categoryLabels[cat] || cat}
                  </a>
                ))}
              </div>

              {/* Products by Category */}
              {categories.map((cat) => {
                const catProducts = products.filter((p) => p.category === cat);
                return (
                  <div key={cat} id={cat} className="mb-16">
                    <h2 className="font-heading text-2xl text-brand-wine font-bold mb-8">
                      {categoryLabels[cat] || cat}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {catProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/winkel/${product.slug}`}
                          className="card group"
                        >
                          <div className="aspect-square bg-brand-cream overflow-hidden relative">
                            {product.mainImageUrl ? (
                              <img
                                src={product.mainImageUrl}
                                alt={product.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center font-heading text-4xl text-brand-rose">
                                {product.title.charAt(0)}
                              </div>
                            )}
                            {product.status !== "ACTIVE" && (
                              <span
                                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                                  product.status === "SOLD_OUT"
                                    ? "bg-red-500 text-white"
                                    : "bg-yellow-500 text-white"
                                }`}
                              >
                                {statusLabels[product.status] || product.status}
                              </span>
                            )}
                          </div>
                          <div className="p-4">
                            <h3 className="font-heading text-lg text-brand-ink font-semibold mb-1">
                              {product.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-brand-red font-bold">
                                R{product.price.toFixed(0)}
                              </span>
                              {product.salePrice && (
                                <span className="text-brand-muted line-through text-sm">
                                  R{product.salePrice.toFixed(0)}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </section>
    </>
  );
}
