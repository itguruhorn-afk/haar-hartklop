import { SalvationForm } from "./SalvationForm";

export default function SalvationPage() {
  return (
    <>
      <section className="relative bg-brand-wine text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/images/hero-1.jpg')] bg-cover bg-center opacity-20" />
        <div className="relative container-custom text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Verlossing
          </h1>
          <p className="text-xl text-brand-cream max-w-2xl mx-auto">
            Die mooiste besluit wat jy ooit kan maak.
          </p>
        </div>
      </section>

      {/* Explanation */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold text-center mb-8">
            Wat is Verlossing?
          </h2>
          <div className="prose prose-lg mx-auto text-brand-ink/80 space-y-6">
            <p>
              Verlossing is God se geskenk aan jou — nie iets wat jy kan verdien nie, maar iets
              wat Jesus reeds vir jou verdien het aan die kruis. Dit gaan oor &apos;n verhouding
              met die God wat jou oneindig liefhet.
            </p>
            <p>
              Die Bybel sê in <strong>Romeine 10:9</strong>: &ldquo;As jy met jou mond bely dat
              Jesus die Here is, en met jou hart glo dat God Hom uit die dood opgewek het, sal
              jy gered word.&rdquo;
            </p>
            <div className="bg-brand-blush p-8 rounded-2xl my-8">
              <h3 className="font-heading text-2xl text-brand-wine font-bold mb-4">
                Jy kan vandag hierdie gebed bid:
              </h3>
              <p className="text-brand-ink leading-relaxed italic">
                &ldquo;Here Jesus, ek kom vandag na U toe. Ek erken dat ek &apos;n sondaar is en
                dat ek U genade nodig het. Ek glo dat U vir my sondes gesterf het en uit die
                dood opgestaan het. Ek gee my lewe vandag aan U oor. Wees my Here en my
                Verlosser. Lei my lewe van vandag af. Amen.&rdquo;
              </p>
            </div>
            <p>
              As jy hierdie gebed gebid het, het jy die belangrikste besluit van jou lewe
              gemaak! Ons wil graag saam met jou stap op hierdie nuwe reis.
            </p>
          </div>
        </div>
      </section>

      {/* Follow-Up Form */}
      <section className="section-padding bg-brand-blush">
        <div className="container-custom max-w-2xl">
          <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold text-center mb-4">
            Ons Wil Jou Ondersteun
          </h2>
          <p className="text-center text-brand-muted mb-10">
            As jy &apos;n besluit vir Jesus gemaak het, of meer wil weet, voltooi die vorm
            hieronder. Iemand van ons span sal jou kontak.
          </p>
          <SalvationForm />
        </div>
      </section>
    </>
  );
}
