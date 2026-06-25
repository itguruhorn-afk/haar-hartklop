import { verifyToken, getTokenFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  try {
    const [
      heroSlides,
      founderLetters,
      testimonials,
      bibleStudies,
      bibleStudyRegistrations,
      events,
      products,
      newsletterSubscribers,
      salvationSubmissions,
      contactSubmissions,
      users,
    ] = await Promise.all([
      prisma.heroSlide.findMany(),
      prisma.founderLetter.findMany(),
      prisma.testimonial.findMany(),
      prisma.bibleStudy.findMany(),
      prisma.bibleStudyRegistration.findMany(),
      prisma.event.findMany({ include: { images: true } }),
      prisma.product.findMany(),
      prisma.newsletterSubscriber.findMany(),
      prisma.salvationSubmission.findMany(),
      prisma.contactSubmission.findMany(),
      prisma.user.findMany({ select: { id: true, name: true, email: true, role: true, createdAt: true } }),
    ]);

    return NextResponse.json({
      heroSlides,
      founderLetters,
      testimonials,
      bibleStudies,
      bibleStudyRegistrations,
      events,
      products,
      newsletterSubscribers,
      salvationSubmissions,
      contactSubmissions,
      users,
    });
  } catch {
    return NextResponse.json({ error: "Kon nie data laai nie" }, { status: 500 });
  }
}
