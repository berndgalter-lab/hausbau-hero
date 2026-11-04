#!/usr/bin/env python3
"""
awin_feed.py — gleicht die Produktfeeds unserer Awin-Partnershops mit den
Ersatzteilen in Supabase ab und schreibt pro Teil und Shop ein Angebot
(Partnerlink, Preis, Lieferbarkeit, Bild) in die Tabelle `angebote`.
Das beste Bild landet zusätzlich in `teile.bild_url`.

Shops (Awin-Publisher 930939, alle Partnerschaften aktiv):
    hagebau.de   Advertiser 11513
    Contorion    Advertiser 14578
    OTTO         Advertiser 14336 (nur der Feed „Wohnen, Spielzeug und Baumarkt“)

KAUFBERATUNGEN: Produkte aus `produkte` mit EAN bekommen ebenfalls Shop-Angebote
(Tabelle `ean_angebote`, Schlüssel EAN + Shop). Zugeordnet wird dort nur über die
EAN, weil die Feeds keine Herstellernummern für Armaturen enthalten.

ZUORDNUNG — lieber ein Treffer zu wenig als ein falsches Teil:
  1. EAN des Feed-Produkts = EAN des Teils.
  2. Herstellernummer = Originalnummer des Teils (Punkte, Leerzeichen und
     Bindestriche zählen nicht: 240.705.00.1 = 240705001) UND die Marke steht
     im Feed (brand_name oder Produktname, als eigenes Wort: "Grohe" passt
     nicht auf "Hansgrohe").
     Die Nummer zählt aus mpn/model_number/product_model. Aus dem Produktnamen
     nur, wenn diese Felder leer sind, und nur, wenn der Name auf genau ein Teil
     passt. Sonst ist es meist ein Set oder eine Armatur, in der das Teil steckt.

LIEFERBARKEIT (Regel aus Womo-Teile, Bernd 17.10.2026): Nicht vorrätige
Produkte behalten den Link, zeigen aber keinen Preis ("Lieferzeit im Shop").
Eine Ware mit Preis zu bewerben, die nicht da ist, wäre ein Lockangebot (UWG).

WEG IN DIE DATENBANK (Standard, GitHub-Workflow partner-feeds):
  Das Skript liest die Teile mit dem öffentlichen Schlüssel und schreibt das
  Ergebnis als angebote.json (--json-ausgabe). Der Workflow legt die Datei in den
  Branch feed-daten, Supabase holt sie stündlich ab (intern.angebote_aus_github,
  pg_cron). So braucht GitHub keinen Datenbank-Schlüssel.
  Lokal mit Service-Key schreibt das Skript auch direkt (ohne --trocken).

ZUGANG (Umgebungsvariablen):
    AWIN_FEED_URL              Download-URL aus Awin → Toolbox → Create-a-Feed.
                               Dieselbe wie bei Womo-Teile: Der Schlüssel darin gilt
                               fürs ganze Konto, das Skript tauscht Feed-ID und Spalten.
    AWIN_API_KEY               alternativ nur der Feed-Schlüssel
    AWIN_FEED_IDS              optional, z. B. "hagebau=12345,contorion=67890".
                               Ohne: Das Skript sucht die Feeds in der Feedliste des Kontos.
    NEXT_PUBLIC_SUPABASE_URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY   zum Lesen der Teile (öffentlich)
    SUPABASE_SERVICE_ROLE_KEY       nur für direktes Schreiben
  Lokal ersatzweise:
    ~/.config/hausbau-hero/awin.json      {"feed_url": "..."}  (sonst ~/.config/womo-teile/awin.json)
    ~/.config/hausbau-hero/supabase.json  {"url": "...", "service_role_key": "..."}
  Zugangsdaten gehören nie ins Repo.

AUFRUF:
    python3 -I scripts/import/awin_feed.py                     # laden, zuordnen, schreiben
    python3 -I scripts/import/awin_feed.py --trocken           # nur Bericht, nichts schreiben
    python3 -I scripts/import/awin_feed.py --trocken --json-ausgabe angebote.json --bericht b.csv --kandidaten k.csv
    # offline, z. B. zum Testen:
    python3 -I scripts/import/awin_feed.py --trocken --teile-json teile.json \\
        --feed-datei hagebau=hagebau.csv.gz --feed-datei contorion=contorion.csv.gz

--kandidaten schreibt Sanitär-Ersatzteile der Feeds, die wir noch nicht führen
(Hansgrohe, Grohe, Geberit, …) — die Arbeitsliste für neue Teile-Seiten.
"""

import argparse
import csv
import datetime as dt
import gzip
import io
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from fnmatch import fnmatch

HIER = os.path.dirname(os.path.abspath(__file__))
WURZEL = os.path.dirname(os.path.dirname(HIER))
CACHE = os.path.join(WURZEL, ".cache", "awin")
BILD_HOSTS = json.load(open(os.path.join(WURZEL, "src", "lib", "bild-hosts.json"), encoding="utf-8"))["hosts"]

# feed_name: Hat ein Shop mehrere Feeds, wird der genommen, dessen Name das enthält.
SHOPS = [
    {"slug": "hagebau", "name": "hagebau.de", "advertiser_id": 11513},
    {"slug": "contorion", "name": "Contorion", "advertiser_id": 14578},
    {"slug": "otto", "name": "OTTO", "advertiser_id": 14336, "feed_name": "Baumarkt"},
]

SPALTEN = [
    "aw_deep_link", "product_name", "aw_product_id", "merchant_product_id",
    "merchant_image_url", "large_image", "aw_image_url", "merchant_category",
    "search_price", "delivery_cost", "currency", "brand_name",
    "ean", "product_GTIN", "mpn", "model_number", "product_model",
    "in_stock", "stock_status", "delivery_time", "is_for_sale", "last_updated",
]

# Für --kandidaten: Marken und Begriffe, an denen man Sanitär-Ersatzteile erkennt.
KANDIDAT_MARKEN = ["hansgrohe", "grohe", "geberit", "ideal standard", "hansa", "kludi",
                   "blanco", "franke", "axor", "keuco", "schell", "viega", "tece"]
KANDIDAT_BEGRIFFE = re.compile(
    r"ersatzteil|kartusche|thermostat|thermoelement|strahlregler|mousseur|perlator|"
    r"dichtung|o-ring|füllventil|fuellventil|spülventil|spuelventil|heberglocke|"
    r"brauseschlauch|schlauch|oberteil|umstell|griff|hebel|rosette|ventil|"
    r"rückfluss|rueckfluss|ablaufgarnitur|stopfen|exzenter",
    re.IGNORECASE,
)
csv.field_size_limit(10_000_000)


# ---------- Normalisieren ----------

def norm_nr(s):
    return re.sub(r"[^A-Z0-9]", "", (s or "").upper())


def norm_ean(s):
    d = re.sub(r"\D", "", s or "").lstrip("0")
    return d if 8 <= len(d) <= 14 else ""


TEILARTEN_ORDNER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "data", "teilarten")
NEUKAUF_ORDNER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "..", "data", "neukauf")


def teilart_eans(ordner=TEILARTEN_ORDNER):
    """EANs der Produkte auf den Teileart-Seiten (data/teilarten/*.json, nicht in der Datenbank)."""
    eans = set()
    for name in sorted(os.listdir(ordner)) if os.path.isdir(ordner) else []:
        if name.endswith(".json"):
            with open(os.path.join(ordner, name), encoding="utf-8") as f:
                eans |= {e for e in (norm_ean(p.get("ean")) for p in json.load(f).get("produkte", [])) if e}
    return eans


def neukauf_eans(ordner=NEUKAUF_ORDNER):
    """EANs der Neugeräte je Serie (data/neukauf/<marke>.json: Serie → Modelle), für den Neukauf-Kasten."""
    eans = set()
    for name in sorted(os.listdir(ordner)) if os.path.isdir(ordner) else []:
        if name.endswith(".json"):
            with open(os.path.join(ordner, name), encoding="utf-8") as f:
                for modelle in json.load(f).values():
                    eans |= {e for e in (norm_ean(m.get("ean")) for m in modelle) if e}
    return eans


GRUPPE = re.compile(r"[A-Z0-9]+(?:[ .\-/][A-Z0-9]+)*")


def nummern_im_text(text):
    """Alle Nummern-Kandidaten in einem Produktnamen, Trennzeichen entfernt.

    "Füllventil 240.705.00.1" → 240705001, "Kartusche 46 048 000" → 46048000.
    Benachbarte Gruppen werden auch einzeln und paarweise genommen, damit
    "Typ 383 240.705.00.5" nicht nur 383240705005 ergibt.
    """
    out = set()
    for m in GRUPPE.finditer((text or "").upper()):
        stuecke = re.split(r"[ .\-/]", m.group(0))
        for i in range(len(stuecke)):
            for j in range(i + 1, min(len(stuecke), i + 6) + 1):
                k = "".join(stuecke[i:j])
                if 6 <= len(k) <= 20 and any(c.isdigit() for c in k):
                    out.add(k)
    return out


def marke_im_text(marke, text):
    m = re.escape(marke.lower())
    return re.search(rf"(?<![a-zäöüß]){m}(?![a-zäöüß])", (text or "").lower()) is not None


def preis(s):
    try:
        w = float((s or "").replace(",", ".").strip())
    except ValueError:
        return None
    return round(w, 2) if 0 < w < 100000 else None


def versand(s):
    try:
        w = float((s or "").replace(",", ".").strip())
    except ValueError:
        return None
    return round(w, 2) if 0 <= w < 1000 else None


def vorraetig(r):
    """True / False / None (unbekannt). in_stock allein taugt nicht: Fritz Berger setzt es immer auf 1."""
    text = " ".join((r.get(k) or "") for k in ("stock_status", "delivery_time")).lower()
    if re.search(r"out of stock|nicht lieferbar|nicht verfügbar|nicht vorrätig|ausverkauft|vergriffen", text):
        return False
    if (r.get("is_for_sale") or "").strip() == "0":
        return False
    s = (r.get("in_stock") or "").strip().lower()
    if s in ("0", "false", "no", "nein", "n"):
        return False
    if s in ("1", "true", "yes", "ja", "y"):
        return True
    return None


def host_erlaubt(url):
    try:
        u = urllib.parse.urlparse(url)
    except ValueError:
        return False
    if u.scheme != "https" or not u.hostname:
        return False
    h = u.hostname.lower()
    for muster in BILD_HOSTS:
        if muster.startswith("**."):
            if h.endswith(muster[2:]):
                return True
        elif fnmatch(h, muster):
            return True
    return False


def bild(r):
    """Großes Händlerbild, wenn sein Host freigegeben ist, sonst Awins eigener Bildserver."""
    for k in ("large_image", "merchant_image_url", "aw_image_url"):
        url = (r.get(k) or "").strip()
        if url.startswith("http://") and k == "aw_image_url":
            url = "https://" + url[len("http://"):]
        if url and host_erlaubt(url):
            return url
    return None


# ---------- Zugang ----------

def lies_json(pfad):
    pfad = os.path.expanduser(pfad)
    return json.load(open(pfad, encoding="utf-8")) if os.path.isfile(pfad) else {}


def awin_zugang():
    url = os.environ.get("AWIN_FEED_URL") or lies_json("~/.config/hausbau-hero/awin.json").get("feed_url") \
        or lies_json("~/.config/womo-teile/awin.json").get("feed_url")
    key = os.environ.get("AWIN_API_KEY")
    if not key and url:
        m = re.search(r"/apikey/([^/]+)/", url)
        key = m.group(1) if m else None
    if not key:
        sys.exit("Kein Awin-Zugang: AWIN_FEED_URL oder AWIN_API_KEY setzen (siehe Kopf dieser Datei).")
    return url, key


def supabase_zugang():
    """(url, schluessel, darf_schreiben). Ohne Service-Key wird nur gelesen."""
    c = lies_json("~/.config/hausbau-hero/supabase.json")
    url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or c.get("url")
    dienst = os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or c.get("service_role_key")
    lesen = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") or c.get("anon_key")
    if not url or not (dienst or lesen):
        sys.exit("Kein Supabase-Zugang: NEXT_PUBLIC_SUPABASE_URL und einen Schlüssel setzen (siehe Kopf dieser Datei).")
    return url.rstrip("/"), dienst or lesen, bool(dienst)


def holen(url, ziel=None, timeout=600):
    req = urllib.request.Request(url, headers={"User-Agent": "hausbau-hero-feed/1.0"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        if ziel is None:
            return resp.read()
        with open(ziel, "wb") as fh:
            while True:
                block = resp.read(1 << 20)
                if not block:
                    break
                fh.write(block)
    return None


# ---------- Awin ----------

def feed_ids(key, feste):
    """Feed-ID je Shop: aus AWIN_FEED_IDS oder aus der Feedliste des Kontos."""
    ids = dict(feste)
    fehlen = [s for s in SHOPS if s["slug"] not in ids]
    if not fehlen:
        return ids
    roh = holen(f"https://productdata.awin.com/datafeed/list/apikey/{key}", timeout=120).decode("utf-8", "ignore")
    zeilen = list(csv.DictReader(io.StringIO(roh)))

    def feld(z, *namen):
        for k, v in z.items():
            kk = re.sub(r"[^a-z]", "", (k or "").lower())
            if kk in namen:
                return (v or "").strip()
        return ""

    for s in fehlen:
        passend = [z for z in zeilen if feld(z, "advertiserid") == str(s["advertiser_id"])]
        aktiv = [z for z in passend if re.search(r"active|joined|aktiv", feld(z, "membershipstatus"), re.I)] or passend
        deutsch = [z for z in aktiv if feld(z, "language").lower().startswith("de")] or aktiv
        if s.get("feed_name"):
            deutsch = [z for z in deutsch if s["feed_name"].lower() in feld(z, "feedname").lower()]
        if not deutsch:
            print(f"  {s['name']}: kein Feed in der Feedliste (Partnerschaft aktiv? Feed freigeschaltet?)")
            continue
        def menge(z):
            try:
                return int(re.sub(r"\D", "", feld(z, "noofproducts")) or 0)
            except ValueError:
                return 0
        beste = max(deutsch, key=menge)
        ids[s["slug"]] = feld(beste, "feedid")
        print(f"  {s['name']}: Feed {ids[s['slug']]} „{feld(beste, 'feedname')}“, {menge(beste)} Produkte")
    return ids


def download_url(basis, key, fid):
    spalten = ",".join(SPALTEN)
    if basis and re.search(r"/fid/[\d,]+/", basis):
        url = re.sub(r"/fid/[\d,]+/", f"/fid/{fid}/", basis)
        return re.sub(r"/columns/[^/]+/", f"/columns/{spalten}/", url)
    return (f"https://productdata.awin.com/datafeed/download/apikey/{key}/language/de/fid/{fid}/"
            f"columns/{spalten}/format/csv/delimiter/%2C/compression/gzip/adultcontent/1/")


def zeilen(pfad):
    with open(pfad, "rb") as fh:
        gz = fh.read(2) == b"\x1f\x8b"
    roh = gzip.open(pfad, "rb") if gz else open(pfad, "rb")
    with io.TextIOWrapper(roh, encoding="utf-8", errors="ignore", newline="") as fh:
        yield from csv.DictReader(fh)


# ---------- Supabase ----------

class Supabase:
    def __init__(self, url, key, darf_schreiben):
        self.url, self.key, self.darf_schreiben = url, key, darf_schreiben

    def _anfrage(self, methode, pfad, daten=None, prefer=None):
        kopf = {"apikey": self.key, "Content-Type": "application/json"}
        if not self.key.startswith("sb_"):  # alte JWT-Schlüssel zusätzlich als Bearer, neue sb_-Schlüssel nur als apikey
            kopf["Authorization"] = f"Bearer {self.key}"
        if prefer:
            kopf["Prefer"] = prefer
        body = json.dumps(daten).encode() if daten is not None else None
        req = urllib.request.Request(f"{self.url}/rest/v1/{pfad}", data=body, method=methode, headers=kopf)
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                text = resp.read().decode() or "null"
        except urllib.error.HTTPError as e:
            sys.exit(f"Supabase {methode} {pfad.split('?')[0]}: HTTP {e.code} {e.read().decode()[:300]}")
        return json.loads(text)

    def teile(self):
        return self._anfrage("GET", "teile?select=id,slug,name,oem_nummer,ean,bild_quelle,bild_shop,marken(name)&aktiv=eq.true")

    def produkt_eans(self):
        """EANs der Kaufberatungs-Produkte (normalisiert)."""
        zeilen = self._anfrage("GET", "produkte?select=ean&ean=not.is.null")
        return {e for e in (norm_ean(z.get("ean")) for z in zeilen) if e}

    def ean_angebote_upsert(self, liste):
        for i in range(0, len(liste), 200):
            self._anfrage("POST", "ean_angebote?on_conflict=ean,shop", liste[i:i + 200],
                          prefer="resolution=merge-duplicates,return=minimal")

    def ean_angebote_abschalten(self, shop, vor):
        q = urllib.parse.urlencode({"shop": f"eq.{shop}", "stand": f"lt.{vor}", "aktiv": "eq.true"})
        self._anfrage("PATCH", f"ean_angebote?{q}", {"aktiv": False}, prefer="return=minimal")

    def angebote_upsert(self, liste):
        for i in range(0, len(liste), 200):
            self._anfrage("POST", "angebote?on_conflict=teil_id,shop", liste[i:i + 200],
                          prefer="resolution=merge-duplicates,return=minimal")

    def angebote_abschalten(self, shop, vor):
        q = urllib.parse.urlencode({"shop": f"eq.{shop}", "stand": f"lt.{vor}", "aktiv": "eq.true"})
        self._anfrage("PATCH", f"angebote?{q}", {"aktiv": False}, prefer="return=minimal")

    def teil_bild(self, teil_id, daten):
        self._anfrage("PATCH", f"teile?id=eq.{teil_id}", daten, prefer="return=minimal")


# ---------- Zuordnung ----------

class Index:
    def __init__(self, teile):
        self.teile = {t["id"]: t for t in teile}
        self.nach_ean, self.nach_nr = {}, {}
        for t in teile:
            t["_marke"] = ((t.get("marken") or {}).get("name") or "").strip()
            e = norm_ean(t.get("ean"))
            if e:
                self.nach_ean.setdefault(e, set()).add(t["id"])
            n = norm_nr(t.get("oem_nummer"))
            if len(n) >= 6:
                self.nach_nr.setdefault(n, set()).add(t["id"])

    def treffer(self, r):
        """[(teil_id, art)] für eine Feedzeile."""
        out = {}
        for k in ("ean", "product_GTIN"):
            for tid in self.nach_ean.get(norm_ean(r.get(k)), ()):
                out[tid] = "ean"

        text = f"{r.get('brand_name') or ''} {r.get('product_name') or ''}"
        felder = {norm_nr(r.get(k)) for k in ("mpn", "model_number", "product_model")} - {""}
        if felder:
            kandidaten = felder
            nur_name = False
        else:
            kandidaten = nummern_im_text(r.get("product_name"))
            nur_name = True
        nr_treffer = set()
        for n in kandidaten:
            for tid in self.nach_nr.get(n, ()):
                if tid not in out and marke_im_text(self.teile[tid]["_marke"], text):
                    nr_treffer.add(tid)
        if nur_name and len(nr_treffer) > 1:
            nr_treffer = set()  # mehrere Teile im Namen: Set oder Armatur, kein Einzelteil
        for tid in nr_treffer:
            out[tid] = "nummer"
        return list(out.items())


def angebot(shop, r, teil_id, art, stand):
    a = angebot_felder(shop, r, stand)
    if a:
        a.update({"teil_id": teil_id, "treffer": art})
    return a


def ean_angebot(shop, r, ean, stand):
    """Angebot für ein Kaufberatungs-Produkt (Tabelle ean_angebote)."""
    a = angebot_felder(shop, r, stand)
    if a:
        a["ean"] = ean
    return a


def angebot_felder(shop, r, stand):
    url = (r.get("aw_deep_link") or "").strip()
    if not url.startswith("https://www.awin1.com/"):
        return None
    pid = (r.get("merchant_product_id") or r.get("aw_product_id") or "").strip()[:80]
    if not pid:
        return None
    return {
        "shop": shop["slug"],
        "shop_name": shop["name"],
        "netzwerk": "awin",
        "advertiser_id": shop["advertiser_id"],
        "produkt_id": pid,
        "produkt_name": re.sub(r"\s+", " ", r.get("product_name") or "").strip()[:300],
        "url": url,
        "preis": preis(r.get("search_price")),
        "versand": versand(r.get("delivery_cost")),
        "vorraetig": vorraetig(r),
        "lieferzeit": (r.get("delivery_time") or "").strip()[:80] or None,
        "bild_url": bild(r),
        "stand": stand,
        "aktiv": True,
    }


def besser(a, b):
    """Ist Angebot a besser als b (gleiches Teil bzw. gleiche EAN, gleicher Shop)?"""
    def rang(x):
        lager = {True: 0, None: 1, False: 2}[x["vorraetig"]]
        return (0 if x.get("treffer", "ean") == "ean" else 1, lager, x["preis"] if x["preis"] is not None else 1e9)
    return rang(a) < rang(b)


def ist_kandidat(r):
    text = f"{r.get('brand_name') or ''} {r.get('product_name') or ''}"
    if not any(marke_im_text(m, text) for m in KANDIDAT_MARKEN):
        return False
    return bool(KANDIDAT_BEGRIFFE.search(f"{r.get('product_name') or ''} {r.get('merchant_category') or ''}"))


def verarbeite(shop, pfad, index, stand, kandidaten, produkt_eans=frozenset(), ean_beste=None):
    """Bestes Angebot je Teil. Mit produkt_eans landet zusätzlich das beste Angebot je
    Kaufberatungs-EAN in ean_beste."""
    beste, gelesen, hosts = {}, 0, {}
    for r in zeilen(pfad):
        gelesen += 1
        if ean_beste is not None and produkt_eans:
            for e in {norm_ean(r.get("ean")), norm_ean(r.get("product_GTIN"))} & produkt_eans:
                a = ean_angebot(shop, r, e, stand)
                if a and (e not in ean_beste or besser(a, ean_beste[e])):
                    ean_beste[e] = a
        tr = index.treffer(r)
        for tid, art in tr:
            a = angebot(shop, r, tid, art, stand)
            if a and (tid not in beste or besser(a, beste[tid])):
                beste[tid] = a
        if kandidaten is not None and not tr and ist_kandidat(r):
            kandidaten.append({
                "shop": shop["slug"],
                "marke": (r.get("brand_name") or "").strip(),
                "nummer": (r.get("mpn") or r.get("model_number") or "").strip(),
                "ean": (r.get("ean") or r.get("product_GTIN") or "").strip(),
                "name": (r.get("product_name") or "").strip(),
                "kategorie": (r.get("merchant_category") or "").strip(),
                "preis": r.get("search_price", ""),
                "vorraetig": vorraetig(r),
                "bild": bild(r) or "",
                "link": (r.get("aw_deep_link") or "").strip(),
            })
        for k in ("large_image", "merchant_image_url"):
            h = urllib.parse.urlparse((r.get(k) or "").strip()).hostname
            if h:
                hosts[h] = hosts.get(h, 0) + 1
    return beste, gelesen, hosts


# ---------- Ablauf ----------

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--trocken", action="store_true", help="nichts nach Supabase schreiben")
    ap.add_argument("--bericht", help="CSV mit allen Zuordnungen")
    ap.add_argument("--kandidaten", help="CSV mit Sanitär-Ersatzteilen aus den Feeds, die wir noch nicht führen")
    ap.add_argument("--json-ausgabe", help="Ergebnis als JSON für intern.importiere_angebote (Supabase)")
    ap.add_argument("--feed-datei", action="append", default=[], metavar="SHOP=PFAD", help="lokaler Feed statt Download")
    ap.add_argument("--teile-json", help="Teile aus Datei statt aus Supabase (offline)")
    ap.add_argument("--produkte-json", help="Kaufberatungs-Produkte [{\"ean\": …}] aus Datei statt aus Supabase (offline)")
    ap.add_argument("--teilarten-ordner", help="Ordner mit Teileart-Dateien (Standard: data/teilarten; offline nur, wenn angegeben)")
    ap.add_argument("--cached", action="store_true", help="letzten Download aus .cache/awin nutzen")
    args = ap.parse_args()

    stand = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()
    db = None
    if args.teile_json:
        teile = json.load(open(args.teile_json, encoding="utf-8"))
    else:
        db = Supabase(*supabase_zugang())
        teile = db.teile()
    index = Index(teile)
    print(f"Teile: {len(teile)} ({len(index.nach_ean)} mit EAN, {len(index.nach_nr)} mit Nummer)")
    if args.produkte_json:
        produkt_eans = {e for e in (norm_ean(p.get("ean")) for p in json.load(open(args.produkte_json, encoding="utf-8"))) if e}
    else:
        produkt_eans = db.produkt_eans() if db else set()
    # Offline (--produkte-json) nur mit ausdrücklich angegebenem Ordner, damit Tests nicht von den echten Seiten abhängen.
    if args.teilarten_ordner or not args.produkte_json:
        produkt_eans |= teilart_eans(args.teilarten_ordner or TEILARTEN_ORDNER)
        produkt_eans |= neukauf_eans()
    print(f"Kaufberatungs-, Teileart- und Neukauf-Produkte mit EAN: {len(produkt_eans)}")

    dateien = dict(x.split("=", 1) for x in args.feed_datei)
    if not dateien and args.cached:
        dateien = {s["slug"]: os.path.join(CACHE, f"{s['slug']}.csv.gz") for s in SHOPS
                   if os.path.isfile(os.path.join(CACHE, f"{s['slug']}.csv.gz"))}
    if not dateien:
        basis, key = awin_zugang()
        feste = dict(x.split("=", 1) for x in (os.environ.get("AWIN_FEED_IDS") or "").replace(" ", "").split(",") if "=" in x)
        print("Feeds:")
        ids = feed_ids(key, feste)
        os.makedirs(CACHE, exist_ok=True)
        for s in SHOPS:
            if s["slug"] not in ids:
                continue
            ziel = os.path.join(CACHE, f"{s['slug']}.csv.gz")
            try:
                holen(download_url(basis, key, ids[s["slug"]]), ziel)
            except (urllib.error.URLError, TimeoutError) as e:
                print(f"  {s['name']}: Download fehlgeschlagen ({e}). Angebote dieses Shops bleiben unverändert.")
                continue
            print(f"  {s['name']}: {os.path.getsize(ziel) / 1e6:.1f} MB geladen")
            dateien[s["slug"]] = ziel

    alle, ean_alle, kandidaten, fertig = [], [], ([] if args.kandidaten else None), []
    for s in SHOPS:
        if s["slug"] not in dateien:
            continue
        ean_beste = {}
        beste, gelesen, hosts = verarbeite(s, dateien[s["slug"]], index, stand, kandidaten, produkt_eans, ean_beste)
        if gelesen == 0:
            print(f"{s['name']}: Feed leer, wird übersprungen.")
            continue
        fertig.append(s["slug"])
        alle.extend(beste.values())
        ean_alle.extend(ean_beste.values())
        ean = sum(1 for a in beste.values() if a["treffer"] == "ean")
        print(f"\n{s['name']}: {gelesen} Produkte gelesen, {len(beste)} Teile zugeordnet ({ean} über EAN, "
              f"{len(beste) - ean} über Nummer), {sum(1 for a in beste.values() if a['bild_url'])} mit Bild")
        print(f"  Kaufberatungs-Produkte: {len(ean_beste)} von {len(produkt_eans)} EANs gefunden, "
              f"{sum(1 for a in ean_beste.values() if a['bild_url'])} mit Bild")
        fremd = [f"{h} ({n})" for h, n in sorted(hosts.items(), key=lambda x: -x[1])[:5] if not host_erlaubt(f"https://{h}/")]
        if fremd:
            print(f"  Bild-Hosts ohne Freigabe (Bild kommt dann über productserve): {', '.join(fremd)}")

    # Bestes Bild je Teil: EAN-Treffer und vorrätig zuerst, dann Reihenfolge der Shops.
    bilder = {}
    for a in sorted(alle, key=lambda x: (x["treffer"] != "ean", x["vorraetig"] is not True)):
        if a["bild_url"] and a["teil_id"] not in bilder:
            bilder[a["teil_id"]] = a

    if args.bericht:
        with open(args.bericht, "w", encoding="utf-8", newline="") as fh:
            w = csv.writer(fh)
            w.writerow(["teil", "originalnummer", "shop", "treffer", "preis", "vorraetig", "bild", "produkt", "link"])
            for a in sorted(alle, key=lambda x: (index.teile[x["teil_id"]]["slug"], x["shop"])):
                t = index.teile[a["teil_id"]]
                w.writerow([t["slug"], t.get("oem_nummer") or "", a["shop"], a["treffer"], a["preis"] or "",
                            a["vorraetig"], a["bild_url"] or "", a["produkt_name"], a["url"]])
        print(f"\nBericht: {args.bericht}")
    if kandidaten is not None:
        with open(args.kandidaten, "w", encoding="utf-8", newline="") as fh:
            felder = ["shop", "marke", "nummer", "ean", "name", "kategorie", "preis", "vorraetig", "bild", "link"]
            w = csv.DictWriter(fh, fieldnames=felder)
            w.writeheader()
            w.writerows(sorted(kandidaten, key=lambda k: (k["marke"].lower(), k["nummer"], k["shop"])))
        print(f"Kandidaten (noch nicht geführte Sanitär-Teile): {len(kandidaten)} → {args.kandidaten}")

    ohne = [t["slug"] for t in teile if t["id"] not in {a["teil_id"] for a in alle} and t.get("oem_nummer")]
    print(f"\nTeile mit Nummer ohne Shop-Angebot: {len(ohne)}")

    if args.json_ausgabe and fertig:
        with open(args.json_ausgabe, "w", encoding="utf-8") as fh:
            json.dump({
                "stand": stand,
                "shops_fertig": fertig,
                "angebote": alle,
                "bilder": [{"teil_id": tid, "bild_url": a["bild_url"], "bild_shop": a["shop"]} for tid, a in bilder.items()],
                "ean_angebote": ean_alle,
            }, fh, ensure_ascii=False, indent=1)
        print(f"\nJSON für Supabase: {args.json_ausgabe} ({len(alle)} Angebote, {len(bilder)} Bilder, "
              f"{len(ean_alle)} Angebote für Kaufberatungen)")

    if not fertig:
        print("\nKein Feed verarbeitet: nichts geschrieben.")
        sys.exit(1)
    if args.trocken or db is None or not db.darf_schreiben:
        print("\nNichts direkt in die Datenbank geschrieben (Trockenlauf oder kein Service-Key).")
        return

    db.angebote_upsert(alle)
    db.ean_angebote_upsert(ean_alle)
    for slug in fertig:
        db.angebote_abschalten(slug, stand)  # was in diesem Lauf nicht mehr vorkam
        db.ean_angebote_abschalten(slug, stand)
    gesetzt = geloescht = 0
    for t in teile:
        if t.get("bild_quelle") not in (None, "awin"):
            continue  # eigene Fotos (und später Amazon) nie überschreiben
        a = bilder.get(t["id"])
        if a:
            db.teil_bild(t["id"], {"bild_url": a["bild_url"], "bild_quelle": "awin", "bild_shop": a["shop"], "bild_stand": stand})
            gesetzt += 1
        elif t.get("bild_quelle") == "awin" and t.get("bild_shop") in fertig:
            db.teil_bild(t["id"], {"bild_url": None, "bild_quelle": None, "bild_shop": None, "bild_stand": None})
            geloescht += 1
    print(f"\nGeschrieben: {len(alle)} Angebote, {gesetzt} Bilder gesetzt, {geloescht} Bilder entfernt.")


if __name__ == "__main__":
    main()
