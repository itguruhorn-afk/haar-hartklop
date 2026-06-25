import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("hartklop2024!", 12);
  await prisma.user.upsert({
    where: { email: "admin@haarhartklop.co.za" },
    update: {},
    create: {
      name: "Haar Hartklop Admin",
      email: "admin@haarhartklop.co.za",
      password: hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created");

  // Site Settings
  await prisma.siteSettings.create({
    data: {
      brandName: "Haar Hartklop",
      tagline: "Bybelstudies, susterskap, bemoediging en meer.",
      primaryColor: "#8F1717",
      accentColor: "#58223B",
      headingFont: "Playfair Display",
      bodyFont: "Montserrat",
      youtubeUrl: "https://www.youtube.com/@myhartklopso_podcast/videos",
      facebookUrl: "https://www.facebook.com/myhartklopsopodcast",
      instagramUrl: "https://www.instagram.com/reel/DZmbhn2o5eq/?igsh=azgxbWp6emlrN3c=",
      donationUrl: "https://give.tithe.ly/?formId=5c6e19cf-541c-4510-9315-d2e5e45d5a9d",
      contactEmail: "info@haarhartklop.co.za",
    },
  });
  console.log("✅ Site settings created");

  // Hero Slides
  await prisma.heroSlide.createMany({
    data: [
      {
        title: "Haar Hartklop",
        subtitle: "'n Tuiste vir vroue om te groei in geloof, vriendskap en doel.",
        imageUrl: "/images/hero-1.jpg",
        primaryButtonLabel: "Sluit aan by die Susterskap",
        primaryButtonUrl: "/virtuele-bybelstudie",
        sortOrder: 0,
        isActive: true,
      },
      {
        title: "Gewortel in die Woord",
        subtitle: "Pragtige hulpbronne vir vroue wat met Jesus wandel.",
        imageUrl: "/images/hero-2.jpg",
        primaryButtonLabel: "Verken Bybelstudies",
        primaryButtonUrl: "/virtuele-bybelstudie",
        sortOrder: 1,
        isActive: true,
      },
      {
        title: "Sluit aan by die Susterskap",
        subtitle: "Ontvang bemoediging, Bybelstudie-nuus en gemeenskapsopdaterings.",
        imageUrl: "/images/hero-3.jpg",
        primaryButtonLabel: "Teken in op Nuusbrief",
        primaryButtonUrl: "/virtuele-bybelstudie",
        sortOrder: 2,
        isActive: true,
      },
    ],
  });
  console.log("✅ Hero slides created");

  // Founder Letter
  await prisma.founderLetter.create({
    data: {
      title: "'n Woord van die stigter",
      body: "Welkom by Haar Hartklop. Hierdie ruimte word gebou vir vroue wat smag na eerlike gemeenskap, praktiese dissipelskap en weeklikse bemoediging wat aanhou terugwys na Jesus.\n\nOns glo dat God jou hierheen gebring het vir 'n tyd soos hierdie. Ons is daartoe verbind om jou te help om jou Godgegewe doel te ontdek, te wandel in die vryheid van wie jy reeds in Jesus is, en met vrymoedigheid in te stap in die planne wat Hy vir jou lewe het.",
      imageUrl: "/images/founder.jpg",
      backgroundColor: "#FFF8F4",
      sortOrder: 0,
      isActive: true,
    },
  });
  console.log("✅ Founder letter created");

  // Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        quote: "Absoluut ongelooflik. Van die boodskap wat gedeel is tot die gemeenskap en vriendskappe wat gemaak is — dit was 'n baie spesiale ervaring.",
        authorName: "Mariette",
        authorContext: "Bybelstudie Deelnemer",
        sourceType: "BIBLE_STUDY",
        sortOrder: 0,
        isActive: true,
      },
      {
        quote: "Die Here het hierdie studie gebruik om my te herinner dat Hy naby, doelgerig en goed is.",
        authorName: "Lize",
        authorContext: "Rut Studie",
        sourceType: "BIBLE_STUDY",
        sortOrder: 1,
        isActive: true,
      },
      {
        quote: "Pragtige inhoud, praktiese waarheid en 'n veilige ruimte om te groei.",
        authorName: "Annelize",
        authorContext: "Susterskap Lid",
        sourceType: "BIBLE_STUDY",
        sortOrder: 2,
        isActive: true,
      },
    ],
  });
  console.log("✅ Testimonials created");

  // Bible Studies
  await prisma.bibleStudy.createMany({
    data: [
      {
        title: "Rut",
        slug: "rut",
        description: "'n Begeleide studie oor verlossing, getrouheid en moed. Ontdek hoe God se hand jou lewe vorm selfs in moeilike seisoene.",
        coverImageUrl: "/images/study-ruth.jpg",
        price: 280.0,
        capacity: 30,
        registrationStatus: "OPEN",
        format: "DIGITAL",
        hardcopyAvailable: true,
        courierNotes: "Hardekopie beskikbaar per koerier teen addisionele koste.",
        isActive: true,
      },
      {
        title: "Ester",
        slug: "ester",
        description: "'n Studie vir vroue wat leer om met doel te staan. Vir so 'n tyd soos hierdie.",
        coverImageUrl: "/images/study-esther.jpg",
        price: 280.0,
        capacity: 30,
        registrationStatus: "OPEN",
        format: "DIGITAL",
        hardcopyAvailable: true,
        courierNotes: "Hardekopie beskikbaar per koerier teen addisionele koste.",
        isActive: true,
      },
      {
        title: "Jakobus",
        slug: "jakobus",
        description: "Praktiese geloof vir daaglikse gehoorsaamheid en volharding. Leer om jou geloof in aksie te sit.",
        coverImageUrl: "/images/study-james.jpg",
        price: 280.0,
        capacity: 30,
        registrationStatus: "OPEN",
        format: "DIGITAL",
        hardcopyAvailable: false,
        isActive: true,
      },
    ],
  });
  console.log("✅ Bible studies created");

  // Events
  await prisma.event.createMany({
    data: [
      {
        title: "Ontmoet en Groet",
        slug: "ontmoet-en-groet",
        type: "MEET_GREET",
        description: "'n Hartlike byeenkoms om mekaar te ontmoet, stories te deel en gemeenskap te bou. Kom kuier saam en word deel van die susterskap.",
        status: "DRAFT",
      },
      {
        title: "Bybelstudie Kamp",
        slug: "bybelstudie-kamp",
        type: "CAMP",
        description: "'n Toekomstige naweek van aanbidding, onderrig en susterskap. Word deel van 'n dieper geestelike ervaring.",
        status: "DRAFT",
      },
      {
        title: "Haar Hartklop Konferensie",
        slug: "haar-hartklop-konferensie",
        type: "CONFERENCE",
        description: "'n Groter Haar Hartklop-geleentheid met sprekers, aanbidding en hulpbronne vir vroue van geloof.",
        status: "DRAFT",
      },
    ],
  });
  console.log("✅ Events created");

  // Products
  await prisma.product.createMany({
    data: [
      {
        title: "Rut Bybelstudie Materiaal",
        slug: "rut-bybelstudie-materiaal",
        category: "BYBELSTUDIE",
        description: "Gedrukte studiehulpbronne en digitale gemeenskapsondersteuning. Sluit in: studiegids, refleksievrae en toegang tot aanlyn besprekings.",
        price: 280.0,
        mainImageUrl: "/images/product-ruth.jpg",
        images: [],
        status: "ACTIVE",
      },
      {
        title: "Ester Bybelstudie Materiaal",
        slug: "ester-bybelstudie-materiaal",
        category: "BYBELSTUDIE",
        description: "Gedrukte studiehulpbronne en digitale gemeenskapsondersteuning. Ontdek jou Godgegewe doel vir so 'n tyd soos hierdie.",
        price: 280.0,
        mainImageUrl: "/images/product-esther.jpg",
        images: [],
        status: "ACTIVE",
      },
      {
        title: "R&R Halssnoer",
        slug: "rr-halssnoer",
        category: "RR_VERSAMELING",
        description: "Geloofs-geïnspireerde stukke en vennootprodukte. Pragtige halssnoer met betekenis.",
        price: 350.0,
        mainImageUrl: "/images/product-necklace.jpg",
        images: [],
        externalCheckoutUrl: "https://rrcollectionza.com/product/the-lev-necklace/",
        status: "ACTIVE",
      },
    ],
  });
  console.log("✅ Products created");

  console.log("\n🎉 Seeding complete!");
  console.log("📧 Admin login: admin@haarhartklop.co.za / hartklop2024!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
