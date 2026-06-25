import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  bibleStudyId: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  preferredFormat: z.string().optional(),
  notes: z.string().optional(),
  consent: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await prisma.bibleStudyRegistration.create({
      data: {
        bibleStudyId: data.bibleStudyId,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        province: data.province,
        preferredFormat: data.preferredFormat,
        notes: data.notes,
        consent: data.consent === "on",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Ongeldige data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Kon nie registreer nie" }, { status: 500 });
  }
}
