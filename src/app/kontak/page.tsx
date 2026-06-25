import { prisma } from "@/lib/prisma";
import { ContactForm } from "./ContactForm";

async function getSettings() {
  return prisma.siteSettings.findFirst();
}

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <>
      <section className="relative bg-brand-rose text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/images/hero-3.jpg')] bg-cover bg-center opacity-25" />
        <div className="relative container-custom text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4">
            Kontak Ons
          </h1>
          <p className="text-xl text-brand-blush max-w-2xl mx-auto">
            Ons hoor graag van jou. Stuur vir ons &apos;n boodskap.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="font-heading text-3xl text-brand-wine font-bold mb-6">
                Kom in Kontak
              </h2>
              <p className="text-brand-ink/70 mb-8 leading-relaxed">
                Of jy nou wil gesels oor Bybelstudie, &apos;n spreekgeleentheid wil bespreek,
                of net wil hallo sê — ons is hier vir jou.
              </p>

              <div className="space-y-6">
                {settings?.contactEmail && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-blush flex items-center justify-center text-brand-red flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-brand-ink">E-pos</p>
                      <a href={`mailto:${settings.contactEmail}`} className="text-brand-red hover:underline">
                        {settings.contactEmail}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-blush flex items-center justify-center text-brand-red flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-brand-ink">Sosiale Media</p>
                    <div className="flex gap-4 mt-2">
                      {settings?.facebookUrl && (
                        <a href={settings.facebookUrl} target="_blank" rel="noopener noreferrer"
                          className="text-brand-muted hover:text-brand-red transition-colors">
                          Facebook
                        </a>
                      )}
                      {settings?.instagramUrl && (
                        <a href={settings.instagramUrl} target="_blank" rel="noopener noreferrer"
                          className="text-brand-muted hover:text-brand-red transition-colors">
                          Instagram
                        </a>
                      )}
                      {settings?.youtubeUrl && (
                        <a href={settings.youtubeUrl} target="_blank" rel="noopener noreferrer"
                          className="text-brand-muted hover:text-brand-red transition-colors">
                          YouTube
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="font-heading text-3xl text-brand-wine font-bold mb-6">
                Stuur &apos;n Boodskap
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
