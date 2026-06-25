import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "E-pos en wagwoord word benodig" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Ongeldige e-pos of wagwoord" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json({ error: "Ongeldige e-pos of wagwoord" }, { status: 401 });
    }

    const token = await createToken({ userId: user.id, role: user.role });

    const response = NextResponse.json({ success: true, user: { name: user.name, role: user.role } });
    response.cookies.set("hh-auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Kon nie aanmeld nie" }, { status: 500 });
  }
}
