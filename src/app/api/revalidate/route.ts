import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Leert die zwischengespeicherten Supabase-Abfragen (Tag „supabase“, siehe src/lib/supabase.ts),
// etwa nach einem Inhalts- oder Feed-Import. Aufruf: POST mit „Authorization: Bearer <REVALIDATE_SECRET>“.
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return new NextResponse(null, { status: 401 });
  }
  revalidateTag("supabase");
  return NextResponse.json({ ok: true, zeit: new Date().toISOString() });
}
