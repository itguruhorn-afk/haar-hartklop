import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

async function getEvents() {
  const events = await prisma.event.findMany({
    include: { images: { orderBy: { sortOrder: "asc" } } },
    orderBy: { startsAt: "asc" },
  });

  const upcoming = events.filter((e) => e.status === "PUBLISHED");
  const past = events.filter((e) => e.status === "PAST");
  const drafts = events.filter((e) => e.status === "DRAFT");

  return { upcoming, past, drafts };
}

const eventTypeLabels: Record<string, string> = {
  MEET_GREET: "Ontmoet en Groet",
  CAMP: "Kamp",
  CONFERENCE: "Konferensie",
};

const statusLabels: Record<string, string> = {
  DRAFT: "Beplanning",
  PUBLISHED: "Komende",
  SOLD_OUT: "Uitverkoop",
  PAST: "Verby",
};

export default async function EventsPage() {
  const { upcoming, past, drafts } = await getEvents();
  const allEvents = [...upcoming, ...drafts, ...past];

  return (
    <>
      <section className="relative bg-brand-olive text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/images/hero-3.jpg')] bg-cover bg-center opacity-25" />
        <div className="relative container-custom text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Gebeurtenisse
          </h1>
          <p className="text-xl text-brand-cream max-w-2xl mx-auto">
            Kom kuier saam, bou gemeenskap en groei in geloof.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          {allEvents.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-6xl mb-6 block">📅</span>
              <h2 className="font-heading text-3xl text-brand-wine font-bold mb-4">
                Nog geen gebeurtenisse tans nie
              </h2>
              <p className="text-brand-muted max-w-md mx-auto">
                Ons is besig om opwindende gebeurtenisse te beplan. Teken in op ons nuusbrief
                om eerste te hoor van nuwe gebeurtenisse.
              </p>
              <Link href="/virtuele-bybelstudie#nuusbrief" className="btn-primary mt-8">
                Teken in op Nuusbrief
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allEvents.map((event) => (
                <div key={event.id} className="card">
                  <div className="aspect-video bg-brand-cream overflow-hidden relative">
                    {event.heroImageUrl ? (
                      <img
                        src={event.heroImageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-heading text-4xl text-brand-rose">
                        {event.title.charAt(0)}
                      </div>
                    )}
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                        event.status === "PUBLISHED"
                          ? "bg-green-500 text-white"
                          : event.status === "PAST"
                          ? "bg-gray-500 text-white"
                          : event.status === "SOLD_OUT"
                          ? "bg-red-500 text-white"
                          : "bg-yellow-500 text-white"
                      }`}
                    >
                      {statusLabels[event.status] || event.status}
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-brand-red uppercase tracking-wide font-semibold mb-1">
                      {eventTypeLabels[event.type] || event.type}
                    </p>
                    <h3 className="font-heading text-xl text-brand-wine font-bold mb-3">
                      {event.title}
                    </h3>
                    <p className="text-brand-ink/70 text-sm mb-4 leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                    {(event.startsAt || event.location) && (
                      <div className="space-y-2 mb-4 text-sm text-brand-muted">
                        {event.startsAt && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(event.startsAt)}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {event.location}
                          </div>
                        )}
                      </div>
                    )}
                    {event.registrationUrl && event.status === "PUBLISHED" && (
                      <a
                        href={event.registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary w-full text-center"
                      >
                        Registreer Nou
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section (placeholder for future events) */}
      <section className="section-padding bg-brand-blush">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-brand-wine font-bold mb-4">
            Galery
          </h2>
          <p className="text-brand-muted max-w-xl mx-auto mb-8">
            Kyk terug na vorige gebeurtenisse en hoogtepunte. Ons sal binnekort foto&apos;s
            en video&apos;s van ons byeenkomste deel.
          </p>
          {settingsHack && (
            <div className="aspect-video max-w-2xl mx-auto rounded-2xl overflow-hidden bg-brand-cream">
              <div className="w-full h-full flex items-center justify-center text-brand-muted">
                <div className="text-center">
                  <span className="text-5xl block mb-3">📸</span>
                  <p>Fotogalery kom binnekort</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Quick hack — settings reference for YouTube embed check
const settingsHack = true;
