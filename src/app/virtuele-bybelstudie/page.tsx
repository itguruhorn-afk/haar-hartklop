import { prisma } from "@/lib/prisma";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { BibleStudyForm } from "./BibleStudyForm";
import { NewsletterForm } from "./NewsletterForm";

async function getBibleStudyData() {
  const [studies, testimonials] = await Promise.all([
    prisma.bibleStudy.findMany({ where: { isActive: true }, orderBy: { createdAt: "asc" } }),
    prisma.testimonial.findMany({
      where: { isActive: true, sourceType: "BIBLE_STUDY" },
      orderBy: { sortOrder: "asc" },
      take: 6,
    }),
  ]);
  return { studies, testimonials };
}

export default async function VirtualBibleStudyPage() {
  const { studies, testimonials } = await getBibleStudyData();

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-wine text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/images/hero-2.jpg')] bg-cover bg-center opacity-30" />
        <div className="relative container-custom text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Virtuele Bybelstudie
          </h1>
          <p className="text-xl text-brand-cream max-w-2xl mx-auto">
            Groei in geloof, bou susterskap, en ontdek God se Woord — van waar jy ookal is.
          </p>
        </div>
      </section>

      {/* What You Get */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold text-center mb-12">
            Wat Jy Ontvang
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Weeklikse Studie",
                desc: "Diepgaande Bybelstudie-materiaal wat jou deur elke boek lei met refleksievrae en toepassings.",
                icon: "📖",
              },
              {
                title: "Susterskap Gemeenskap",
                desc: "Word deel van 'n gemeenskap van vroue wat saam groei, bid en mekaar bemoedig.",
                icon: "🤝",
              },
              {
                title: "Regstreekse Zoom Sessies",
                desc: "Neem deel aan regstreekse besprekings en onderrig deur Zoom vir 'n persoonlike ervaring.",
                icon: "💻",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-8 rounded-2xl bg-brand-blush">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-heading text-xl text-brand-wine font-semibold mb-3">
                  {item.title}
                </h3>
                <p className="text-brand-ink/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Bible Studies */}
      <section className="section-padding bg-brand-blush">
        <div className="container-custom">
          <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold text-center mb-4">
            Beskikbare Bybelstudies
          </h2>
          <p className="text-center text-brand-muted mb-12 max-w-xl mx-auto">
            Kies uit ons verskeidenheid studies. Plek is beperk — registreer vroegtydig om jou plek te verseker.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {studies.map((study) => (
              <div key={study.id} className="card">
                <div className="aspect-[4/3] bg-brand-cream overflow-hidden">
                  {study.coverImageUrl ? (
                    <img
                      src={study.coverImageUrl}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-heading text-4xl text-brand-rose">
                      {study.title.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-2xl text-brand-wine font-bold mb-2">
                    {study.title}
                  </h3>
                  <p className="text-brand-ink/70 mb-4 leading-relaxed">{study.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-red font-bold text-xl">R{study.price.toFixed(0)}</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        study.registrationStatus === "OPEN"
                          ? "bg-green-100 text-green-700"
                          : study.registrationStatus === "FULL"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {study.registrationStatus === "OPEN"
                        ? "Oop"
                        : study.registrationStatus === "FULL"
                        ? "Vol"
                        : "Gesluit"}
                    </span>
                  </div>
                  {study.hardcopyAvailable && (
                    <p className="text-xs text-brand-muted mt-3">
                      Hardekopie beskikbaar per koerier
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="section-padding bg-white" id="registreer">
        <div className="container-custom max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold text-center mb-4">
            Registreer vir Bybelstudie
          </h2>
          <p className="text-center text-brand-muted mb-10">
            Voltooi die vorm hieronder om te registreer. Ons sal jou kontak met besonderhede.
          </p>
          <BibleStudyForm studies={studies} />
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-brand-cream">
          <div className="container-custom">
            <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold text-center mb-12">
              Wat Vroue Sê
            </h2>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="section-padding bg-brand-wine text-white" id="nuusbrief">
        <div className="container-custom max-w-xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Sluit aan by die Nuusbrief
          </h2>
          <p className="text-brand-blush/80 mb-8">
            Ontvang weeklikse bemoediging, gebedsversoeke en opdaterings oor nuwe studies.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
