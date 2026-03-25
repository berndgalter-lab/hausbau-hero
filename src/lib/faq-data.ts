export interface FAQ {
  q: string;
  a: string;
}

const FAQ_DATA: Record<string, FAQ[]> = {
  nebenkosten: [
    { q: "Wie hoch sind die Kaufnebenkosten beim Hauskauf?", a: "Die Kaufnebenkosten liegen je nach Bundesland zwischen 9 % und 15 % des Kaufpreises. Sie setzen sich zusammen aus Grunderwerbsteuer (3,5–6,5 %), Notar (ca. 1,5 %), Grundbuch (ca. 0,5 %) und ggf. Makler (3–7 %)." },
    { q: "In welchem Bundesland ist die Grunderwerbsteuer am niedrigsten?", a: "Bayern hat mit 3,5 % die niedrigste Grunderwerbsteuer in Deutschland. Am höchsten ist sie in Brandenburg, NRW, Saarland und Schleswig-Holstein mit jeweils 6,5 %." },
    { q: "Kann man Kaufnebenkosten finanzieren?", a: "Die meisten Banken erwarten, dass Kaufnebenkosten aus Eigenkapital bezahlt werden. Eine Vollfinanzierung inkl. Nebenkosten ist möglich, aber mit deutlich höheren Zinsen verbunden." },
    { q: "Wer zahlt die Notarkosten beim Hauskauf?", a: "Die Notarkosten trägt in der Regel der Käufer. Die Kosten richten sich nach dem Gerichts- und Notarkostengesetz und betragen ca. 1,5 % des Kaufpreises." },
  ],
  eigenleistung: [
    { q: "Wie viel kann ich durch Eigenleistung sparen?", a: "Realistisch lassen sich durch Eigenleistung 10.000–30.000 € bei einem Neubau sparen. Die größten Einsparungen gibt es bei Malerarbeiten, Bodenbelägen, Trockenbau und Gartenarbeit." },
    { q: "Welche Eigenleistungen erkennt die Bank an?", a: "Banken erkennen typischerweise 10–15 % der Bausumme als Eigenleistung an und bewerten die Arbeitsstunde mit 15–30 €. Nur nachweisbare handwerkliche Tätigkeiten werden akzeptiert." },
    { q: "Was sollte man NICHT selber machen?", a: "Elektroinstallationen, Gas- und Wasseranschlüsse sowie tragende Konstruktionen sollten immer vom Fachbetrieb ausgeführt werden — aus Sicherheits- und Versicherungsgründen." },
  ],
  foerdermittel: [
    { q: "Welche KfW-Förderung gibt es für Neubau?", a: "Für klimafreundliche Neubauten bietet die KfW zinsgünstige Kredite bis 150.000 € (Programm 297/298). Voraussetzung ist mindestens Effizienzhaus 40." },
    { q: "Kann ich KfW und BAFA kombinieren?", a: "KfW und BAFA können für verschiedene Maßnahmen kombiniert werden, aber nicht für dieselbe Maßnahme. Alternativ steht der Steuerbonus nach § 35c EStG zur Verfügung." },
    { q: "Muss ich den Förderantrag vor Baubeginn stellen?", a: "Ja — bei KfW und BAFA muss der Antrag zwingend VOR Beginn der Maßnahme gestellt werden. Vorzeitiger Baubeginn führt zum Verlust der Förderung." },
  ],
  handwerkerkosten: [
    { q: "Was kostet ein Handwerker pro Stunde?", a: "Handwerker-Stundensätze liegen 2026 zwischen 40 und 80 € netto. Maler und Trockenbauer am unteren Ende, Elektriker und Installateure am oberen." },
    { q: "Wie finde ich günstige Handwerker?", a: "Hole mindestens 3 Angebote ein, vergleiche Festpreise statt Stundensätze, und frage nach Referenzen. Portale wie MyHammer oder Check24 können helfen." },
    { q: "Festpreis oder Stundenlohn — was ist besser?", a: "Festpreis gibt dir Kostensicherheit und ist bei klar definierten Projekten besser. Stundenlohn kann bei kleineren, unklaren Arbeiten sinnvoll sein — birgt aber das Risiko steigender Kosten." },
  ],
  "gewerk-reihenfolge": [
    { q: "In welcher Reihenfolge werden Handwerker bestellt?", a: "Typische Reihenfolge: Rohbau → Dach → Fenster → Elektro/Sanitär Rohinstallation → Estrich → Trockenbau → Fliesen → Maler → Boden → Elektro/Sanitär Fertigmontage." },
    { q: "Wie lange dauert ein Hausbau?", a: "Ein Neubau dauert typischerweise 8–14 Monate vom Rohbau bis zum Einzug. Die Bauzeit hängt von Größe, Bauweise und Wetter ab." },
  ],
  baugenehmigung: [
    { q: "Brauche ich für ein Gartenhaus eine Baugenehmigung?", a: "Das hängt vom Bundesland ab. In den meisten Ländern sind Gartenhäuser bis 10–30 m³ genehmigungsfrei. Prüfe die Regeln für dein Bundesland mit unserem Check." },
    { q: "Was kostet eine Baugenehmigung?", a: "Die Gebühren für eine Baugenehmigung liegen typischerweise bei 0,5–1 % der Bausumme. Für ein Einfamilienhaus sind das ca. 1.000–3.000 €." },
  ],
  wandfarbe: [
    { q: "Wie viel Wandfarbe brauche ich pro m²?", a: "Rechne mit ca. 150–200 ml pro m² und Anstrich. Für 2 Anstriche brauchst du also ca. 300–400 ml pro m²." },
    { q: "Was kostet es einen Raum zu streichen?", a: "Material kostet ca. 1–3 € pro m². Mit Handwerker rechne 8–15 € pro m² inkl. Material und Abkleben." },
  ],
  fliesen: [
    { q: "Wie viele Fliesen brauche ich?", a: "Miss die Fläche in m² und rechne 10–15 % Verschnitt dazu. Bei diagonaler Verlegung oder großen Fliesen kalkuliere 15 %." },
    { q: "Was kostet Fliesen verlegen pro m²?", a: "Material 20–90 €/m², Handwerker 30–60 €/m². Gesamt: 50–150 €/m² je nach Fliesen-Qualität." },
  ],
  trockenbau: [
    { q: "Was kostet eine Rigipswand pro m²?", a: "Material für eine einfache Trennwand kostet 15–25 €/m². Mit Handwerker rechne mit 50–85 €/m² je nach Region und Komplexität." },
    { q: "Kann man Trockenbau selber machen?", a: "Ja — Trockenbau ist eine der einfachsten Eigenleistungen. Du brauchst nur Akkuschrauber, Cutter und Wasserwaage. Spachteln erfordert etwas Übung." },
  ],
  laminat: [
    { q: "Wie viel Verschnitt beim Laminat einplanen?", a: "Bei gerader Verlegung 5–10 %, bei diagonaler Verlegung 15 %. Der Rechner berücksichtigt den Verschnitt automatisch." },
    { q: "Was kostet Laminat verlegen pro m²?", a: "Material 8–40 €/m², Handwerker 10–25 €/m². Gesamt: 20–65 €/m² je nach Laminat-Qualität." },
  ],
  estrich: [
    { q: "Wie lange muss Estrich trocknen?", a: "Zementestrich: Faustregel 1 Tag/mm bis 40 mm, darüber 2 Tage/mm. Bei 50 mm also ca. 60 Tage. Fließestrich trocknet ca. 30 % schneller." },
    { q: "Welcher Estrich bei Fußbodenheizung?", a: "Calciumsulfat-Fließestrich — dünn, gute Wärmeleitung, fließt um die Heizrohre. Zementestrich funktioniert auch, ist aber dicker." },
  ],
  daemmung: [
    { q: "Welchen U-Wert muss mein Dach haben?", a: "Das GEG fordert für Dachsanierungen einen U-Wert von maximal 0,24 W/(m²K). Für KfW-Förderung sind oft bessere Werte nötig." },
    { q: "Was kostet Dachdämmung pro m²?", a: "Zwischensparren: 40–80 €/m² mit Handwerker. Aufsparren: 150–250 €/m². Einblasdämmung: 20–50 €/m²." },
  ],
  tapeten: [
    { q: "Wie viele Tapetenrollen brauche ich?", a: "Eine Standard-Rolle (0,53 × 10,05 m) reicht für ca. 5 m². Miss Raumumfang × Raumhöhe und teile durch 5." },
  ],
  beton: [
    { q: "Wie viel Beton brauche ich für ein Fundament?", a: "Berechne Länge × Breite × Höhe in Metern = Kubikmeter Beton. Für 1 × 1 × 0,3 m brauchst du 0,3 m³ = ca. 720 kg Fertigbeton." },
  ],
  putz: [
    { q: "Wie viel Putz brauche ich pro m²?", a: "Kalk-Zement-Putz innen: ca. 15 kg/m² bei 10 mm Dicke. Außen: ca. 25 kg/m² bei 15 mm." },
  ],
  terrasse: [
    { q: "Was kostet eine Terrasse pro m²?", a: "Holzterrasse: 80–150 €/m². WPC: 100–200 €/m². Naturstein: 150–300 €/m². Jeweils inkl. Unterkonstruktion, ohne Handwerker." },
  ],
  elektro: [
    { q: "Wie viele Steckdosen braucht ein Raum?", a: "DIN 18015-2 empfiehlt: Wohnzimmer 5+, Küche 6+, Schlafzimmer 3+, Bad 2+." },
  ],
  sanitaer: [
    { q: "Was kostet eine Bad-Sanierung?", a: "Eine komplette Bad-Sanierung kostet 8.000–25.000 € je nach Größe und Ausstattung. Größte Posten: Fliesen (30 %), Sanitärobjekte (25 %), Handwerker (35 %)." },
  ],
  stromverbrauch: [
    { q: "Wie viel Watt brauche ich auf der Baustelle?", a: "Für typische Baustellen-Geräte (Flex, Bohrmaschine, Rührwerk) reichen 3.000–5.000 Watt. Der Rechner addiert deinen Bedarf automatisch." },
  ],
};

export function getFaqBySlug(slug: string): FAQ[] {
  return FAQ_DATA[slug] ?? [];
}
