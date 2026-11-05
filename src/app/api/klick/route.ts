import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { seitentypVonPfad } from "@/lib/seitentyp";

// Nimmt Klicks auf Affiliate-Links entgegen (navigator.sendBeacon aus KlickZaehler).
// Alles wird streng geprüft: Nur bekannte Werte und saubere Pfade landen in der Tabelle.

const PLATZIERUNGEN = new Set(["box", "text", "rechner", "teil", "uebersicht", "angebot", "vergleich", "neukauf", "quelle"]);
const ZIEL_HOSTS = new Set(["www.amazon.de", "amazon.de", "www.awin1.com", "awin1.com", "www.ebay.de", "ebay.de"]);
const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit/i;

function sauberPfad(roh: unknown): string | null {
  if (typeof roh !== "string") return null;
  const pfad = roh.split("?")[0].split("#")[0].toLowerCase();
  return pfad.length <= 200 && /^\/[a-z0-9/_-]*$/.test(pfad) ? pfad : null;
}

function zielHost(roh: unknown): string | null {
  if (typeof roh !== "string") return null;
  try {
    const host = new URL(roh).hostname.toLowerCase();
    return ZIEL_HOSTS.has(host) ? host : null;
  } catch {
    return null;
  }
}

function sauberKennung(roh: unknown): string | null {
  if (typeof roh !== "string") return null;
  const k = roh.trim().slice(0, 80);
  return /^[A-Za-z0-9 ._/-]+$/.test(k) ? k : null;
}

function sauberShop(roh: unknown): string | null {
  return typeof roh === "string" && /^[a-z0-9-]{2,30}$/.test(roh) ? roh : null;
}

export async function POST(req: NextRequest) {
  if (BOT.test(req.headers.get("user-agent") ?? "")) return new NextResponse(null, { status: 204 });

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(await req.text());
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const pfad = sauberPfad(body.pfad);
  const host = zielHost(body.ziel);
  if (!pfad || !host) return new NextResponse(null, { status: 400 });

  const platzierung = typeof body.platzierung === "string" && PLATZIERUNGEN.has(body.platzierung) ? body.platzierung : "sonstige";

  const { error } = await supabase.from("affiliate_klicks").insert({
    pfad,
    // Aus dem Pfad berechnet, nicht vom Browser übernommen
    seitentyp: seitentypVonPfad(pfad),
    ziel_host: host,
    platzierung,
    kennung: sauberKennung(body.kennung),
    shop: host.includes("amazon") ? "amazon" : host.includes("ebay") ? "ebay" : sauberShop(body.shop),
  });
  if (error) console.error("[klick] Speichern fehlgeschlagen:", error.message);

  return new NextResponse(null, { status: 204 });
}
