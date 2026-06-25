import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  interest: z.string().optional(),
  consent: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = schema.parse(body);

    await prisma.newsletterSubscriber.create({
      data: {
        name: data.name,
        email: data.email,
        interest: data.interest,
        consent: data.consent === "on",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Ongeldige data" }, { status: 400 });
    }
    return NextResponse.json({ error: "Kon nie inteken nie" }, { status: 500 });
  }
}
