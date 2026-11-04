#!/usr/bin/env python3
"""Prüfregel für die Inhalte in data/ (docs/SEITENAUFBAU.md, Abschnitt 6).

Ratgeber (data/artikel): Verstöße sind Fehler, der Lauf endet mit Code 1. Ältere Beiträge mit
"altbestand": true in der Meta-Datei haben noch keine Quellen und keinen Methoden-Hinweis; das wird
dort nur gemeldet. Titel, Abzeichen, Suchlinks und Empfehlungs-Abschnitte gelten für alle.
Ersatzteile (data/ersatzteile): Notiz-Sprache ist mit --streng ein Fehler (so läuft der Workflow),
ohne nur ein Hinweis. Was nur aus einer Suchergebnis-Vorschau stammt, heißt im Text
„(nicht im Original geprüft)“.

Aufruf: python3 scripts/pruefe-inhalte.py [--streng]
"""
import json
import re
import sys
from pathlib import Path

DATA = Path(__file__).resolve().parent.parent / "data"

# Gleiche Liste wie NOTIZ_SPRACHE in src/lib/ersatzteile.ts
NOTIZ = re.compile(
    r"recherchiert|nicht gefunden|haben wir nicht gefunden|belegt keine|keine .{0,30}quelle|Suchauszug|Marketingaussage",
    re.I,
)
TITEL_VERBOTEN = [
    (re.compile(r"\b(19|20)\d\d\b"), "Jahreszahl"),
    (re.compile(r"\b\d+\s+(Modelle|Produkte|Armaturen)\b", re.I), "Anzahl der Modelle"),
    (re.compile(r"\b(Test|Testsieger)\b", re.I), "„Test“ ohne eigenen Test"),
]
ABZEICHEN = ("ist_testsieger", "ist_preistipp")
# Gleiche Liste wie FRAGE_KATEGORIEN in src/lib/ersatzteile.ts
FRAGE_KATEGORIEN = ("nummer", "kompatibilitaet", "reparatur", "verfuegbarkeit", "bezug", "pflege")
ABZEICHEN_TEXT = re.compile(r"Testsieger|Preis-Tipp|Unsere Empfehlung", re.I)

# Produkt-Ratgeber unter /ratgeber/<produkt>: Slugs aus src/lib/produkt-ratgeber.ts
PRODUKT_RATGEBER = set(
    re.findall(r'\bslug:\s*"([^"]+)"', (DATA.parent / "src/lib/produkt-ratgeber.ts").read_text())
)
# Listen, die Modelle der Reihe nach empfehlen. Im Produkt-Ratgeber übernimmt das die Auswahlhilfe.
LISTEN_ABSCHNITT = re.compile(
    r"<h2[^>]*>\s*(Die besten|Welches Modell für wen|Die Modelle im Einzelnen|Unsere Favoriten)[^<]*</h2>", re.I
)

fehler: list[str] = []
hinweise: list[str] = []


def pruefe_artikel() -> None:
    ordner = DATA / "artikel"
    for slug in json.loads((ordner / "index.json").read_text()):
        meta = json.loads((ordner / f"{slug}.meta.json").read_text())
        for feld in ("titel", "seo_title"):
            for muster, was in TITEL_VERBOTEN:
                if muster.search(meta.get(feld) or ""):
                    fehler.append(f"{slug}.meta.json: {was} in {feld}: {meta[feld]!r}")

        produkte_datei = ordner / f"{slug}.produkte.json"
        if produkte_datei.exists():
            for p in json.loads(produkte_datei.read_text()):
                name = p.get("name", "?")
                for k in ABZEICHEN:
                    if k in p:
                        fehler.append(f"{slug}.produkte.json: {name}: Feld {k} (Abzeichen gibt es nicht mehr)")
                if ABZEICHEN_TEXT.search(p.get("einsatzbereich") or ""):
                    fehler.append(f"{slug}.produkte.json: {name}: Abzeichen in einsatzbereich: {p['einsatzbereich']!r}")

        html = (ordner / f"{slug}.html").read_text()
        if re.search(r"amazon\.de/s[?/]", html):
            fehler.append(f"{slug}.html: Amazon-Suchlink (nur Produktlinks mit ASIN)")
        if re.search(r"<h2[^>]*>\s*Unsere (Material-)?Empfehlungen?\s*</h2>", html, re.I):
            fehler.append(f"{slug}.html: Abschnitt „Unsere Empfehlungen“")
        aufbau = hinweise if meta.get("altbestand") else fehler
        hinweis = re.search(r"<p>\s*<em>\s*Hinweis:(.*?)</em>\s*</p>", html, re.S | re.I)
        if not hinweis:
            aufbau.append(f"{slug}.html: Methoden-Hinweis „<p><em>Hinweis: … (Stand: …)</em></p>“ fehlt")
        elif not re.search(r"Stand:\s*[^)]+\)", hinweis.group(1)):
            aufbau.append(f"{slug}.html: „(Stand: …)“ im Methoden-Hinweis fehlt")
        # Gleiche Überschriften wie in src/lib/artikel-aufbau.ts
        if not re.search(r"<h2[^>]*>\s*(Das Wichtigste vorab|Kurz gesagt|Die wichtigsten [^<]{0,40} auf einen Blick)\s*</h2>", html, re.I):
            aufbau.append(f"{slug}.html: Abschnitt „Das Wichtigste vorab“ (oder „Kurz gesagt“) fehlt")
        quellen = re.search(r"<h2[^>]*>\s*Quellen\s*</h2>(.*?)(?=<h2|\Z)", html, re.S | re.I)
        if not quellen or "<li" not in quellen.group(1):
            aufbau.append(f"{slug}.html: Abschnitt „Quellen“ mit Liste fehlt")
        if slug in PRODUKT_RATGEBER:
            pruefe_produkt_ratgeber(slug, html)
        if re.search(r"\bButtons?\b", html):
            fehler.append(f"{slug}.html: verweist auf „Buttons“, die es nicht mehr gibt")


def pruefe_produkt_ratgeber(slug: str, html: str) -> None:
    liste = LISTEN_ABSCHNITT.search(html)
    if liste:
        fehler.append(f"{slug}.html: Abschnitt {liste.group(0)!r}, im Produkt-Ratgeber macht das die Auswahlhilfe")
    fragen = re.search(r"<h2[^>]*>\s*Häufige Fragen\s*</h2>(.*?)(?=<h2|\Z)", html, re.S | re.I)
    if not fragen:
        fehler.append(f"{slug}.html: Abschnitt „Häufige Fragen“ fehlt")
        return
    for frage in re.findall(r"<h3[^>]*>(.*?)</h3>", fragen.group(1), re.S):
        if not frage.strip().endswith("?"):
            fehler.append(f"{slug}.html: Frage ohne Fragezeichen: {frage.strip()!r}")


def texte(eintrag: dict, felder: tuple[str, ...]):
    for f in felder:
        wert = eintrag.get(f)
        if isinstance(wert, str) and wert:
            yield f, wert


def pruefe_ersatzteile(streng: bool) -> None:
    ordner = DATA / "ersatzteile"
    ziel = fehler if streng else hinweise
    for datei in json.loads((ordner / "index.json").read_text()):
        d = json.loads((ordner / datei).read_text())
        bereiche = [
            ("marke", [d["marke"]], ("beschreibung", "nummer_hinweis", "ersatzteil_garantie")),
            ("serien", d.get("serien", []), ("erkennungsmerkmale", "beschreibung")),
            ("teile", d.get("teile", []), ("beschreibung",)),
            ("zuordnungen", d.get("zuordnungen", []), ("hinweis",)),
            ("probleme", d.get("probleme", []), ("symptom", "fachbetrieb_ab")),
            ("widersprueche", d.get("widersprueche", []), ("thema", "aussage_a", "aussage_b")),
            ("fragen", d["marke"].get("fragen", []), ("frage", "antwort")),
        ]
        for bereich, liste, felder in bereiche:
            for e in liste:
                for f, wert in texte(e, felder):
                    m = NOTIZ.search(wert)
                    if m:
                        wer = e.get("slug") or e.get("thema") or e.get("serie_slug") or bereich
                        ziel.append(f"{datei}: {bereich} {wer}: Notiz-Sprache in {f} („{m.group(0)}“)")
        pruefe_fragen(datei, d)


def pruefe_fragen(datei: str, d: dict) -> None:
    """Häufige Fragen: jede mit Antwort, Kategorie und Quelle; Verweise auf Teile und Probleme der Datei."""
    teile = {t["slug"] for t in d.get("teile", [])}
    probleme = {p["slug"] for p in d.get("probleme", [])}
    gesehen = set()
    for f in d["marke"].get("fragen", []):
        frage = f.get("frage", "")
        if not frage.endswith("?"):
            fehler.append(f"{datei}: Frage ohne Fragezeichen: {frage[:60]}")
        if frage.lower() in gesehen:
            fehler.append(f"{datei}: Frage doppelt: {frage[:60]}")
        gesehen.add(frage.lower())
        if not f.get("antwort"):
            fehler.append(f"{datei}: Frage ohne Antwort: {frage[:60]}")
        if f.get("kategorie") not in FRAGE_KATEGORIEN:
            fehler.append(f"{datei}: Frage mit unbekannter Kategorie „{f.get('kategorie')}“: {frage[:60]}")
        if not f.get("quellen"):
            fehler.append(f"{datei}: Frage ohne Quelle: {frage[:60]}")
        for t in f.get("teile", []):
            if t not in teile:
                fehler.append(f"{datei}: Frage verweist auf unbekanntes Teil {t}")
        if f.get("problem") and f["problem"] not in probleme:
            fehler.append(f"{datei}: Frage verweist auf unbekanntes Problem {f['problem']}")


def main() -> int:
    streng = "--streng" in sys.argv
    pruefe_artikel()
    pruefe_ersatzteile(streng)
    for h in hinweise:
        print(f"HINWEIS  {h}")
    for f in fehler:
        print(f"FEHLER   {f}")
    print(f"\n{len(fehler)} Fehler, {len(hinweise)} Hinweise")
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
