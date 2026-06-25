import { verifyToken, getTokenFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
  newsletterSubscribers: "newsletterSubscriber",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getModel(type: string): any {
  const modelName = models[type];
  if (!modelName) return null;
  return (prisma as any)[modelName];
}

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  const model = getModel(params.type);
  if (!model) return NextResponse.json({ error: "Ongeldige tipe" }, { status: 400 });

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = await (model as any).findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(items);
  } catch {
    return NextResponse.json({ error: "Kon nie data laai nie" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  const model = getModel(params.type);
  if (!model) return NextResponse.json({ error: "Ongeldige tipe" }, { status: 400 });

  try {
    const body = await request.json();
    delete body.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = await (model as any).create({ data: body });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Kon nie skep nie" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { type: string; id: string } }
) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  const model = getModel(params.type);
  if (!model) return NextResponse.json({ error: "Ongeldige tipe" }, { status: 400 });

  try {
    const body = await request.json();
    delete body.id;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = await (model as any).update({
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

  const model = getModel(params.type);
  if (!model) return NextResponse.json({ error: "Ongeldige tipe" }, { status: 400 });

  try {
    const body = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item = await (model as any).update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Kon nie opdateer nie" }, { status: 500 });
  }
}
