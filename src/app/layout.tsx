import type { Metadata } from "next";
import "./globals.css";
import { prisma } from "@/lib/prisma";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Haar Hartklop — Bybelstudies, Susterskap, Bemoediging",
    template: "%s | Haar Hartklop",
  },
  description:
    "'n Tuiste vir vroue om te groei in geloof, vriendskap en doel. Bybelstudies, susterskap, bemoediging en meer.",
};

async function getSettings() {
  try {
    return await prisma.siteSettings.findFirst();
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <html lang="af">
      <body className="min-h-screen flex flex-col">
        <Nav settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
