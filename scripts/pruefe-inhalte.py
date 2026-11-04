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
        pruefe_groessen(datei, d, ziel)


# Gleiche Listen wie in src/lib/groessen.ts
GROESSEN_PRODUKTTYP = "dachfenster"
GROESSEN_ARTEN = ("rollo", "plissee", "hitzeschutz", "insektenschutz", "rollladen")


def pruefe_groessen(datei: str, d: dict, ziel: list[str]) -> None:
    """Größenseiten (docs/SEITENAUFBAU.md, 5a) und Tabellen der Marken-Seite: Pflichtfelder, Lesersprache, Verweise.

    Jedes Teil braucht eine Kaufmöglichkeit (EAN für den Feed-Abgleich oder geprüfte ASIN). Ob eine Größenseite
    indexiert wird, entscheidet die Seite anhand der Shop-Angebote in der Datenbank; hier wird nur gemeldet, wenn
    nicht einmal drei Zubehörarten ein Teil mit EAN oder ASIN haben.
    """
    teile = {t["slug"]: t for t in d.get("teile", [])}
    for t in teile.values():
        if t.get("amazon_asin") and not re.fullmatch(r"[A-Z0-9]{10}", t["amazon_asin"]):
            fehler.append(f"{datei}: Teil {t['slug']}: ungültige ASIN {t['amazon_asin']}")
        if t.get("ean") and not re.fullmatch(r"\d{8}|\d{12,14}", t["ean"]):
            fehler.append(f"{datei}: Teil {t['slug']}: ungültige EAN {t['ean']}")
    for tab in d["marke"].get("tabellen", []):
        for k in ("id", "titel", "spalten", "zeilen"):
            if not tab.get(k):
                fehler.append(f"{datei}: Tabelle {tab.get('id', '?')}: Feld „{k}“ fehlt")
        for z in tab.get("zeilen", []):
            if len(z) != len(tab.get("spalten", [])):
                fehler.append(f"{datei}: Tabelle {tab.get('id')}: Zeile {z[:1]} hat {len(z)} statt {len(tab['spalten'])} Spalten")
        for text in [tab.get("titel", ""), tab.get("hinweis", "")] + [c for z in tab.get("zeilen", []) for c in z]:
            m = NOTIZ.search(text or "")
            if m:
                ziel.append(f"{datei}: Tabelle {tab.get('id')}: Notiz-Sprache („{m.group(0)}“)")
    for s in d.get("serien", []):
        g = s.get("groesse")
        if s.get("produkttyp") != GROESSEN_PRODUKTTYP:
            if g:
                fehler.append(f"{datei}: Serie {s['slug']}: Feld groesse nur bei produkttyp {GROESSEN_PRODUKTTYP}")
            continue
        wer = f"{datei}: Größe {s['slug']}"
        if not g:
            fehler.append(f"{wer}: Feld groesse fehlt")
            continue
        for k in ("code", "breite_cm", "hoehe_cm", "fenstertypen", "alte_codes", "zubehoer"):
            if g.get(k) in (None, "", []):
                fehler.append(f"{wer}: groesse.{k} fehlt")
        if g.get("code", "").lower() != s["slug"]:
            fehler.append(f"{wer}: Slug muss der Code in Kleinbuchstaben sein ({g.get('code')})")
        if s.get("kennnummern", [None])[0] != g.get("code"):
            fehler.append(f"{wer}: kennnummern[0] muss der Code sein (Link aus der Code-Tabelle)")
        for a in g.get("alte_codes", []):
            if a.get("code") not in s.get("kennnummern", []):
                fehler.append(f"{wer}: alter Code {a.get('code')} fehlt in kennnummern (Suche)")
        texte_ = [g.get("vor_1991", ""), g.get("hinweis", "")]
        texte_ += [a.get("hinweis", "") for a in g.get("alte_codes", [])]
        texte_ += [z.get("hinweis", "") for z in g.get("zubehoer", [])]
        texte_ += [n.get("hinweis", "") for n in g.get("nachbauten", [])]
        for t in texte_:
            m = NOTIZ.search(t or "")
            if m:
                ziel.append(f"{wer}: Notiz-Sprache („{m.group(0)}“)")
        for z in g.get("zubehoer", []):
            if z.get("art") not in GROESSEN_ARTEN:
                fehler.append(f"{wer}: unbekannte Zubehörart {z.get('art')}")
        for n in g.get("nachbauten", []):
            if not re.fullmatch(r"[A-Z0-9]{10}", n.get("amazon_asin") or "") and not n.get("ean"):
                fehler.append(f"{wer}: Nachbau {n.get('name')} ohne ASIN oder EAN")
            if "Nachbau" not in (n.get("hinweis") or ""):
                fehler.append(f"{wer}: Nachbau {n.get('name')} ohne Hinweis „Nachbau“")
        pruefe_fragen(f"{wer}", {"marke": {"fragen": g.get("fragen", [])}, "teile": d.get("teile", []), "probleme": d.get("probleme", [])})
        arten = {
            teile[z["teil_slug"]]["teiltyp"]
            for z in d.get("zuordnungen", [])
            if z["serie_slug"] == s["slug"] and z["teil_slug"] in teile
            and teile[z["teil_slug"]]["teiltyp"] in GROESSEN_ARTEN
            and (teile[z["teil_slug"]].get("ean") or teile[z["teil_slug"]].get("amazon_asin"))
        }
        if len(arten) < 3:
            hinweise.append(f"{wer}: nur {len(arten)} Zubehörarten mit EAN oder ASIN, die Seite bleibt noindex")


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


def pruefe_teilarten_und_probleme() -> None:
    """data/teilarten und data/probleme (docs/SEITENAUFBAU.md 4b, 4c): Pflichtfelder, Fragen, Verweise, Registrierung."""
    root = DATA.parent
    marken = {}
    for datei in json.loads((DATA / "ersatzteile" / "index.json").read_text()):
        d = json.loads((DATA / "ersatzteile" / datei).read_text())
        marken[d["marke"]["slug"]] = d
    alle_teile = {t["slug"] for d in marken.values() for t in d.get("teile", [])}
    marken_probleme = {p["slug"] for d in marken.values() for p in d.get("probleme", [])}
    bereiche = set(re.findall(r'^    slug: "([a-z0-9-]+)"', (root / "src/lib/bereiche.ts").read_text(), re.M))
    teilarten = {f.stem for f in (DATA / "teilarten").glob("*.json")}
    probleme = {f.stem for f in (DATA / "probleme").glob("*.json")}

    for art, ordner, pflicht, registry in [
        ("teilart", "teilarten", ("slug", "name", "mehrzahl", "genus", "titel", "seo_title", "seo_description", "kurz", "bereiche", "teiltypen", "erkennen", "fragen", "quellen"), "src/lib/teilarten.ts"),
        ("problem", "probleme", ("slug", "titel", "seo_title", "seo_description", "symptom", "bereich", "ursachen", "pruefen", "marken_probleme", "fragen", "quellen"), "src/lib/probleme-allgemein.ts"),
    ]:
        reg = (root / registry).read_text()
        for f in sorted((DATA / ordner).glob("*.json")):
            name = f"{ordner}/{f.name}"
            d = json.loads(f.read_text())
            for k in pflicht:
                if k not in d or d[k] in ("", None):
                    fehler.append(f"{name}: Feld „{k}“ fehlt")
            if d.get("slug") != f.stem:
                fehler.append(f"{name}: slug „{d.get('slug')}“ passt nicht zum Dateinamen")
            if f"{ordner}/{f.stem}.json" not in reg:
                fehler.append(f"{name}: nicht in {registry} eingetragen")
            if not d.get("quellen"):
                fehler.append(f"{name}: keine Quellen")
            for k in ("titel", "seo_title"):
                for muster, was in TITEL_VERBOTEN:
                    if isinstance(d.get(k), str) and muster.search(d[k]):
                        fehler.append(f"{name}: {was} in {k}")
            texte_ = [d.get("kurz", ""), d.get("symptom", ""), d.get("fachbetrieb_ab", "")]
            texte_ += [e.get("text", "") for e in d.get("erkennen", [])]
            texte_ += [u.get("erklaerung", "") for u in d.get("ursachen", [])]
            texte_ += list(d.get("pruefen", []))
            for t in texte_:
                m = NOTIZ.search(t or "")
                if m:
                    fehler.append(f"{name}: Notiz-Sprache („{m.group(0)}“)")
            if art == "teilart":
                if d.get("genus") not in ("m", "f", "n"):
                    fehler.append(f"{name}: genus muss m, f oder n sein")
                if d.get("slug") in marken:
                    fehler.append(f"{name}: slug ist auch eine Marke, /ersatzteile/{d['slug']} wäre doppelt belegt")
                for b in d.get("bereiche", []):
                    if b not in bereiche:
                        fehler.append(f"{name}: unbekannter Bereich {b}")
                for p in d.get("probleme", []):
                    if p not in probleme and p not in marken_probleme:
                        fehler.append(f"{name}: unbekanntes Problem {p}")
                for pr in d.get("produkte", []):
                    if pr.get("amazon_asin") and not re.fullmatch(r"[A-Z0-9]{10}", pr["amazon_asin"]):
                        fehler.append(f"{name}: ungültige ASIN {pr['amazon_asin']}")
            else:
                if d.get("bereich") not in bereiche:
                    fehler.append(f"{name}: unbekannter Bereich {d.get('bereich')}")
                for p in d.get("marken_probleme", []):
                    if p not in marken_probleme:
                        fehler.append(f"{name}: unbekanntes Marken-Problem {p}")
                for u in d.get("ursachen", []):
                    if u.get("teilart") and u["teilart"] not in teilarten:
                        fehler.append(f"{name}: Ursache verweist auf unbekannte Teileart {u['teilart']}")
                    if u.get("haeufigkeit") not in (None, "häufig", "gelegentlich", "selten"):
                        fehler.append(f"{name}: Häufigkeit „{u.get('haeufigkeit')}“ unbekannt")
            pruefe_fragen(name, {"marke": {"fragen": d.get("fragen", [])}, "teile": [{"slug": s} for s in alle_teile],
                                 "probleme": [{"slug": s} for s in marken_probleme | probleme]})


def main() -> int:
    streng = "--streng" in sys.argv
    pruefe_artikel()
    pruefe_ersatzteile(streng)
    pruefe_teilarten_und_probleme()
    for h in hinweise:
        print(f"HINWEIS  {h}")
    for f in fehler:
        print(f"FEHLER   {f}")
    print(f"\n{len(fehler)} Fehler, {len(hinweise)} Hinweise")
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
