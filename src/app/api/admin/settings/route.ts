import { verifyToken, getTokenFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  try {
    const settings = await prisma.siteSettings.findFirst();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Kon nie instellings laai nie" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  try {
    const body = await request.json();
    const existing = await prisma.siteSettings.findFirst();

    let settings;
    if (existing) {
      settings = await prisma.siteSettings.update({
        where: { id: existing.id },
        data: body,
      });
    } else {
      settings = await prisma.siteSettings.create({ data: body });
    }

    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Kon nie instellings stoor nie" }, { status: 500 });
  }
}
