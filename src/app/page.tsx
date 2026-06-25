import { prisma } from "@/lib/prisma";
import { HeroCarousel } from "@/components/HeroCarousel";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { CTABanner } from "@/components/CTABanner";
import Link from "next/link";

async function getHomeData() {
  const [heroSlides, founderLetter, testimonials, products, settings] = await Promise.all([
    prisma.heroSlide.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.founderLetter.findFirst({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.testimonial.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" }, take: 6 }),
    prisma.product.findMany({ where: { status: "ACTIVE" }, take: 4, orderBy: { createdAt: "desc" } }),
    prisma.siteSettings.findFirst(),
  ]);
  return { heroSlides, founderLetter, testimonials, products, settings };
}

export default async function HomePage() {
  const { heroSlides, founderLetter, testimonials, products, settings } = await getHomeData();

  return (
    <>
      {/* Hero */}
      <HeroCarousel slides={heroSlides} />

      {/* CTA Banner */}
      <CTABanner />

      {/* Founder Section */}
      {founderLetter && (
        <section
          className="section-padding"
          style={{ backgroundColor: founderLetter.backgroundColor || "#FFF8F4" }}
        >
          <div className="container-custom">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
                  {founderLetter.imageUrl ? (
                    <img
                      src={founderLetter.imageUrl}
                      alt={founderLetter.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-cream flex items-center justify-center">
                      <span className="font-heading text-brand-muted">Haar Hartklop</span>
                    </div>
                  )}
                </div>
                {/* Decorative rounded element behind */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-rose/20 rounded-full -z-10" />
              </div>
              <div>
                <p className="text-brand-red font-semibold tracking-wide uppercase text-sm mb-2">
                  {founderLetter.title}
                </p>
                <div className="font-heading text-brand-ink text-lg leading-relaxed space-y-4 whitespace-pre-line">
                  {founderLetter.body}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission / Vision */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold mb-6">
            Ons Visie &amp; Missie
          </h2>
          <p className="text-brand-ink text-lg leading-relaxed">
            By <strong className="text-brand-red">Haar Hartklop</strong> glo ons God het jou hierheen gebring vir &apos;n tyd soos hierdie.
            Ons is daartoe verbind om jou te help om jou Godgegewe doel te ontdek, te wandel in die
            vryheid van wie jy reeds in Jesus is, en met vrymoedigheid in te stap in die planne
            wat Hy vir jou lewe het.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-brand-blush">
          <div className="container-custom">
            <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold text-center mb-12">
              Getuienisse
            </h2>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* Shop Preview */}
      {products.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold">
                Winkel Voorskou
              </h2>
              <Link href="/winkel" className="btn-secondary mt-4 md:mt-0">
                Besoek Winkel
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/winkel/${product.slug}`} className="card group">
                  <div className="aspect-square bg-brand-cream overflow-hidden">
                    {product.mainImageUrl ? (
                      <img
                        src={product.mainImageUrl}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-brand-muted font-heading">
                        {product.title}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-brand-muted uppercase tracking-wide">
                      {product.category === "BYBELSTUDIE"
                        ? "Bybelstudie"
                        : product.category === "RR_VERSAMELING"
                        ? "R&R Versameling"
                        : "Konferensie"}
                    </p>
                    <h3 className="font-heading text-lg text-brand-ink font-semibold mt-1">
                      {product.title}
                    </h3>
                    <p className="text-brand-red font-bold mt-2">
                      R{product.price.toFixed(0)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Weekly Encouragement / YouTube */}
      {settings?.youtubeUrl && (
        <section className="section-padding bg-brand-cream">
          <div className="container-custom text-center">
            <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold mb-4">
              Weeklikse Bemoediging
            </h2>
            <p className="text-brand-ink/70 max-w-xl mx-auto mb-8">
              Luister na ons weeklikse potgooi vir bemoediging, Bybelstudie-insigte en
              gesprekke wat jou geloofsreis verryk.
            </p>
            <a
              href={settings.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Kyk op YouTube
            </a>
          </div>
        </section>
      )}
    </>
  );
}
