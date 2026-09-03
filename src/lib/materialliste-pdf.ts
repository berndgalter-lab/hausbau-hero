import { formatPreis } from "./rechner-logic";

export interface PdfZeile {
  name: string;
  menge: number;
  einheit: string;
  preis_ca: number;
}

export interface PdfDaten {
  rechnerName: string;
  slug: string;
  angaben: { label: string; wert: string }[];
  material: PdfZeile[];
  werkzeuge: PdfZeile[];
  zusatzposten?: { label: string; betrag: number }[];
}

/**
 * Erzeugt die Materialliste als PDF.
 * Wird bewusst dynamisch importiert — jsPDF sind ~190 kB, die sonst auf jeder
 * Rechnerseite mitgeladen würden, obwohl die wenigsten Besucher ein PDF erzeugen.
 */
export async function erzeugeMateriallistePdf(daten: PdfDaten): Promise<void> {
  const { default: jsPDF } = await import("jspdf");
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(daten.rechnerName, 14, 20);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(120, 120, 120);
  doc.text("hausbau-hero.de — Kostenlose Materialrechner", 14, 28);
  doc.text(`Erstellt am ${new Date().toLocaleDateString("de-DE")}`, 14, 34);

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Deine Angaben:", 14, 48);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  let y = 56;
  for (const a of daten.angaben) {
    doc.text(`${a.label}: ${a.wert}`, 14, y);
    y += 7;
  }

  y += 8;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Materialliste:", 14, y);
  y += 10;

  doc.setFontSize(9);
  doc.text("Material", 14, y);
  doc.text("Menge", 120, y, { align: "right" });
  doc.text("ca. Preis", pageWidth - 14, y, { align: "right" });
  y += 2;
  doc.setDrawColor(200, 200, 200);
  doc.line(14, y, pageWidth - 14, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  let gesamt = 0;
  for (const m of daten.material) {
    const preis = m.menge * m.preis_ca;
    gesamt += preis;
    doc.text(m.name, 14, y, { maxWidth: 100 });
    doc.text(`${Math.round(m.menge)} ${m.einheit}`, 120, y, { align: "right" });
    doc.text(formatPreis(preis), pageWidth - 14, y, { align: "right" });
    y += 7;
    if (y > 270) { doc.addPage(); y = 20; }
  }

  for (const p of daten.zusatzposten ?? []) {
    gesamt += p.betrag;
    doc.text(p.label, 14, y);
    doc.text(formatPreis(p.betrag), pageWidth - 14, y, { align: "right" });
    y += 7;
    if (y > 270) { doc.addPage(); y = 20; }
  }

  y += 2;
  doc.line(14, y, pageWidth - 14, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Gesamt (Material)", 14, y);
  doc.text(formatPreis(gesamt), pageWidth - 14, y, { align: "right" });

  if (daten.werkzeuge.length > 0) {
    y += 14;
    doc.setFontSize(12);
    doc.text("Werkzeug-Checkliste:", 14, y);
    y += 10;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    for (const w of daten.werkzeuge) {
      doc.text(`[ ]  ${w.name} (ab ${formatPreis(w.preis_ca)})`, 14, y);
      y += 7;
      if (y > 270) { doc.addPage(); y = 20; }
    }
  }

  y += 14;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("Alle Preise sind ca.-Angaben (Stand 2026). Tatsächliche Preise können abweichen.", 14, y);
  y += 5;
  doc.text("Erstellt mit hausbau-hero.de — Kostenlose Materialrechner für Bauherren", 14, y);

  doc.save(`${daten.slug}-materialliste.pdf`);
}
