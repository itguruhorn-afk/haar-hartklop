import { verifyToken, getTokenFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const exporters: Record<string, { model: string; fields: string[]; headers: string[] }> = {
  contact: {
    model: "contactSubmission",
    fields: ["name", "email", "subject", "message", "enquiryType", "status", "createdAt"],
    headers: ["Naam", "E-pos", "Onderwerp", "Boodskap", "Tipe", "Status", "Datum"],
  },
  salvation: {
    model: "salvationSubmission",
    fields: ["firstName", "lastName", "email", "phone", "city", "province", "message", "status", "createdAt"],
    headers: ["Naam", "Van", "E-pos", "Telefoon", "Stad", "Provinsie", "Boodskap", "Status", "Datum"],
  },
  bibleStudy: {
    model: "bibleStudyRegistration",
    fields: ["firstName", "lastName", "email", "phone", "preferredFormat", "paymentStatus", "createdAt"],
    headers: ["Naam", "Van", "E-pos", "Telefoon", "Formaat", "Betaling", "Datum"],
  },
  newsletter: {
    model: "newsletterSubscriber",
    fields: ["name", "email", "interest", "createdAt"],
    headers: ["Naam", "E-pos", "Belangstelling", "Datum"],
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } }
) {
  const token = getTokenFromRequest(request);
  if (!token) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });
  const payload = await verifyToken(token);
  if (!payload) return NextResponse.json({ error: "Nie gemagtig nie" }, { status: 401 });

  const config = exporters[params.type];
  if (!config) return NextResponse.json({ error: "Ongeldige tipe" }, { status: 400 });

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const model = (prisma as any)[config.model];
    const items = await model.findMany({ orderBy: { createdAt: "desc" } });

    // Build CSV
    const csvRows = [config.headers.join(",")];
    for (const item of items) {
      const row = config.fields.map((f) => {
        const val = item[f];
        if (val === null || val === undefined) return "";
        const str = String(val).replace(/"/g, '""');
        return `"${str}"`;
      });
      csvRows.push(row.join(","));
    }

    const csv = csvRows.join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${params.type}-export.csv"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Kon nie uitvoer nie" }, { status: 500 });
  }
}
