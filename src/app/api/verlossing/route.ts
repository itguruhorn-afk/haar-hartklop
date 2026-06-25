import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  message: z.string().optional(),
  preferredContactMethod: z.string().optional(),
  newsletterOptIn: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await prisma.salvationSubmission.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        city: data.city,
        province: data.province,
        message: data.message,
        preferredContactMethod: data.preferredContactMethod,
        newsletterOptIn: data.newsletterOptIn === "on",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Ongeldige data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Kon nie vorm indien nie" }, { status: 500 });
  }
}
