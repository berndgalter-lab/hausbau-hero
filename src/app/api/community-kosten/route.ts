import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { region, kosten_gesamt, rechner_slug } = body;

  if (!region || !kosten_gesamt) {
    return NextResponse.json({ error: "Region und Kosten sind Pflicht" }, { status: 400 });
  }

  const { error } = await supabase.from("community_kosten").insert({
    region,
    kosten_gesamt: Number(kosten_gesamt),
    plz: body.plz || "",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
