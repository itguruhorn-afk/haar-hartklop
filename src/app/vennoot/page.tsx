import { prisma } from "@/lib/prisma";

async function getPartnerData() {
  return prisma.siteSettings.findFirst();
}

export default async function PartnerPage() {
  const settings = await getPartnerData();

  return (
    <>
      <section className="relative bg-brand-olive text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/images/hero-1.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative container-custom text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Vennoot
          </h1>
          <p className="text-xl text-brand-cream max-w-2xl mx-auto">
            Saam kan ons meer doen. Word &apos;n vennoot in hierdie bediening.
          </p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold mb-6">
                Waarom Vennoot?
              </h2>
              <p className="text-brand-ink/70 leading-relaxed mb-4">
                Haar Hartklop is &apos;n bediening wat daarna streef om vroue te bemagtig
                deur Bybelstudies, susterskap en bemoediging. Deur &apos;n vennoot te word,
                help jy ons om meer vroue te bereik met die hoop van Jesus Christus.
              </p>
              <p className="text-brand-ink/70 leading-relaxed">
                Jou bydrae help ons om Bybelstudie-materiaal te ontwikkel, geleenthede aan te
                bied, en gemeenskappe van geloof te bou regoor Suid-Afrika.
              </p>
            </div>
            <div className="bg-brand-blush p-8 rounded-2xl">
              <h3 className="font-heading text-2xl text-brand-wine font-bold mb-4">
                Wat Jou Vennootskap Ondersteun:
              </h3>
              <ul className="space-y-3 text-brand-ink/70">
                {[
                  "Bybelstudie-materiaal vir vroue",
                  "Aanlyn en persoonlike geleenthede",
                  "Susterskap gemeenskapsgroepe",
                  "Uitreik en sendingprojekte",
                  "Weeklikse bemoedigingsinhoud",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-brand-red mt-1">♡</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Donation Section */}
          <div className="text-center bg-brand-cream rounded-3xl p-12">
            <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold mb-4">
              Maak &apos;n Donasie
            </h2>
            <p className="text-brand-ink/70 max-w-xl mx-auto mb-8">
              Elke bydrae, groot of klein, maak &apos;n verskil. Gebruik die skakel
              hieronder om veilig deur Tithe.ly te skenk.
            </p>
            {settings?.donationUrl ? (
              <a
                href={settings.donationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-10 py-4"
              >
                Skenk Nou
              </a>
            ) : (
              <p className="text-brand-muted">
                Skenkingskakel binnekort beskikbaar.
              </p>
            )}
          </div>

          {/* NPC / Tax Note */}
          <div className="mt-12 text-center text-sm text-brand-muted">
            <p>
              Haar Hartklop is &apos;n nie-winsgewende organisasie.
              Skenkings is tans nie belastingaftrekbaar nie ( Artikel 18A-aansoek hangende).
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
