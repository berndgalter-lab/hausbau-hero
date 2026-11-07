import { headers } from "next/headers";
import { supabase } from "@/lib/supabase";

// Trägt eine Suche in die Tabelle suchanfragen ein (Migration 20261109_suchanfragen.sql): Begriff und Zahl der
// Treffer, nichts zur Person. Nicht eingetragen werden Crawler und Links, die selbst eine Suche öffnen
// (Bereichsseiten mit ?von=bereich, Beispiele auf der Startseite mit ?von=beispiel).

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|preview|facebookexternalhit/i;
// Wie die Prüfregel der Tabelle; was nicht passt, wird nicht eingetragen
const ERLAUBT = /^[0-9A-Za-zÄÖÜäöüßéèáà .,/+()½¼¾″"'-]{2,60}$/;

export async function sucheProtokollieren(begriff: string, treffer: number, von: string | undefined): Promise<void> {
  if (von) return;
  if (BOT.test(headers().get("user-agent") ?? "")) return;
  const b = begriff.trim().replace(/\s+/g, " ");
  if (!ERLAUBT.test(b)) return;
  const { error } = await supabase.from("suchanfragen").insert({ begriff: b, treffer: Math.min(treffer, 30) });
  if (error) console.error("[Suchprotokoll]", error.message);
}
