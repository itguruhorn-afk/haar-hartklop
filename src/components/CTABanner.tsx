import Link from "next/link";

export function CTABanner() {
  return (
    <section className="bg-brand-red text-white">
      <div className="container-custom py-12 text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
          Sluit aan by die Susterskap
        </h2>
        <p className="text-brand-blush/90 text-lg max-w-2xl mx-auto mb-8">
          Ontvang weeklikse bemoediging, Bybelstudie-nuus en gemeenskapsopdaterings
          direk in jou inkassie.
        </p>
        <Link href="/virtuele-bybelstudie" className="btn-outline-light text-lg px-10 py-4">
          Skryf Vandag In
        </Link>
      </div>
    </section>
  );
}
