import { verifyToken, getTokenFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Dynamic route for [type]/[id] operations
export async function PUT(
  request: NextRequest,
  { params }: { params: { type: string; id: string } }
) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  const models: Record<string, string> = {
    heroSlides: "heroSlide",
    founderLetters: "founderLetter",
    testimonials: "testimonial",
    bibleStudies: "bibleStudy",
    events: "event",
    products: "product",
    contactSubmissions: "contactSubmission",
    salvationSubmissions: "salvationSubmission",
    bibleStudyRegistrations: "bibleStudyRegistration",
  };

  const modelName = models[params.type];
  if (!modelName) return NextResponse.json({ error: "Ongeldige tipe" }, { status: 400 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = (prisma as any)[modelName];

  try {
    const body = await request.json();
    delete body.id;
    const item = await model.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Kon nie opdateer nie" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { type: string; id: string } }
) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  const models: Record<string, string> = {
    heroSlides: "heroSlide",
    founderLetters: "founderLetter",
    testimonials: "testimonial",
    bibleStudies: "bibleStudy",
    events: "event",
    products: "product",
    contactSubmissions: "contactSubmission",
    salvationSubmissions: "salvationSubmission",
    bibleStudyRegistrations: "bibleStudyRegistration",
  };

  const modelName = models[params.type];
  if (!modelName) return NextResponse.json({ error: "Ongeldige tipe" }, { status: 400 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const model = (prisma as any)[modelName];

  try {
    const body = await request.json();
    const item = await model.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Kon nie opdateer nie" }, { status: 500 });
  }
}
