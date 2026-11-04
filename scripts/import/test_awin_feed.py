"""Tests für awin_feed.py mit einem nachgebauten Feed. Aufruf: python3 -I scripts/import/test_awin_feed.py"""
import csv
import gzip
import json
import os
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import awin_feed as af  # noqa: E402

TEILE = [
    {"id": "t1", "slug": "grohe-kartusche-46048000", "name": "Grohe Kartusche 46 mm", "oem_nummer": "46048000",
     "ean": "4005176008283", "bild_quelle": None, "marken": {"name": "Grohe"}},
    {"id": "t2", "slug": "geberit-fuellventil-typ-380-up-240-705-00-1", "name": "Geberit Füllventil Typ 380",
     "oem_nummer": "240.705.00.1", "ean": None, "bild_quelle": None, "marken": {"name": "Geberit"}},
    {"id": "t3", "slug": "geberit-fuellventil-typ-383-up-240-705-00-5", "name": "Geberit Füllventil Typ 383",
     "oem_nummer": "240.705.00.5", "ean": None, "bild_quelle": "eigen", "marken": {"name": "Geberit"}},
    {"id": "t4", "slug": "grohe-kartusche-46374000", "name": "Grohe Kartusche 35 mm", "oem_nummer": "46374000",
     "ean": None, "bild_quelle": None, "marken": {"name": "Grohe"}},
    {"id": "t5", "slug": "grohe-mousseur-13929000", "name": "Grohe Mousseur", "oem_nummer": "13929000",
     "ean": None, "bild_quelle": None, "marken": {"name": "Grohe"}},
]

LINK = "https://www.awin1.com/pclick.php?p={}&a=930939&m=11513"
IMG = "https://images2.productserve.com/?w=200&h=200&url=ssl%3Ax{}.jpg"


def zeile(**kw):
    r = {k: "" for k in af.SPALTEN}
    r.update(kw)
    return r


FEED = [
    # EAN-Treffer, Marke egal
    zeile(product_name="Kartusche 46mm Einhand", brand_name="GROHE", ean="04005176008283", merchant_product_id="A1",
          aw_deep_link=LINK.format(1), search_price="38.90", in_stock="1", aw_image_url=IMG.format(1)),
    # Dasselbe Teil teurer und nicht vorrätig: darf das erste nicht verdrängen
    zeile(product_name="GROHE Kartusche 46048000", brand_name="Grohe", mpn="46048000", merchant_product_id="A2",
          aw_deep_link=LINK.format(2), search_price="29.90", delivery_time="out of stock", in_stock="1"),
    # Geberit-Nummer mit Punkten im mpn
    zeile(product_name="Geberit Füllventil Typ 380 3/8\"", brand_name="Geberit", mpn="240.705.00.1",
          merchant_product_id="B1", aw_deep_link=LINK.format(3), search_price="24,50",
          large_image="https://media.hagebau.de/bild/b1.jpg"),
    # Nummer nur im Namen, mpn leer; Teil hat eigenes Foto → Bild darf nicht überschrieben werden
    zeile(product_name="Geberit Füllventil Typ 383 UP 240.705.00.5", brand_name="", merchant_product_id="B2",
          aw_deep_link=LINK.format(4), search_price="31.00", in_stock="0"),
    # Falle: Hansgrohe-Produkt mit einer Grohe-Nummer → keine Zuordnung
    zeile(product_name="hansgrohe Kartusche 46374000", brand_name="hansgrohe", merchant_product_id="C1",
          aw_deep_link=LINK.format(5), search_price="40"),
    # Falle: Armatur, deren Name die Kartuschennummer enthält, mpn ist die Armatur → keine Zuordnung
    zeile(product_name="GROHE Eurosmart Waschtischarmatur inkl. Kartusche 46374000", brand_name="GROHE",
          mpn="33265002", merchant_product_id="C2", aw_deep_link=LINK.format(6), search_price="99"),
    # Falle: Set mit zwei Nummern im Namen, mpn leer → keine Zuordnung
    zeile(product_name="GROHE Set 46374000 + 13929000", brand_name="GROHE", merchant_product_id="C3",
          aw_deep_link=LINK.format(7), search_price="60"),
    # Kandidat für neue Teile-Seiten (Hansgrohe-Ersatzteil, noch nicht geführt)
    zeile(product_name="hansgrohe Thermostatkartusche 92282000", brand_name="hansgrohe", mpn="92282000",
          merchant_product_id="D1", aw_deep_link=LINK.format(8), search_price="89.00", merchant_category="Sanitär > Ersatzteile"),
    # Kein Kandidat: fremde Ware
    zeile(product_name="Bosch Akkuschrauber", brand_name="Bosch", merchant_product_id="E1",
          aw_deep_link=LINK.format(9), search_price="79"),
    # Armatur aus einer Kaufberatung (nur EAN, keine Herstellernummer im Feed), zweimal: vorrätig schlägt billiger
    zeile(product_name="Grohe Wannen-Thermostat Grohtherm 800 1/2\", Wandmontage, chrom", brand_name="Grohe",
          ean="04005176310157", merchant_product_id="F1", aw_deep_link=LINK.format(10), search_price="175.99",
          in_stock="1", aw_image_url=IMG.format(10)),
    zeile(product_name="Grohe Grohtherm 800 Wanne", brand_name="Grohe", product_GTIN="4005176310157",
          merchant_product_id="F2", aw_deep_link=LINK.format(11), search_price="160.00", in_stock="0"),
]

PRODUKT_EANS = {"4005176310157", "4011097678832"}


def schreibe_feed(pfad, zeilen):
    with gzip.open(pfad, "wt", encoding="utf-8", newline="") as fh:
        w = csv.DictWriter(fh, fieldnames=af.SPALTEN)
        w.writeheader()
        w.writerows(zeilen)


class FeedTest(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.mkdtemp()
        self.pfad = os.path.join(self.tmp, "hagebau.csv.gz")
        schreibe_feed(self.pfad, FEED)
        self.index = af.Index([dict(t) for t in TEILE])
        self.kand = []
        self.ean_beste = {}
        self.beste, self.gelesen, _ = af.verarbeite(af.SHOPS[0], self.pfad, self.index, "2026-11-03T04:00:00+00:00",
                                                    self.kand, PRODUKT_EANS, self.ean_beste)

    def test_kaufberatung_ean(self):
        self.assertEqual(set(self.ean_beste), {"4005176310157"})  # die zweite EAN steht in keinem Feed
        a = self.ean_beste["4005176310157"]
        self.assertEqual((a["produkt_id"], a["preis"], a["vorraetig"], a["ean"]), ("F1", 175.99, True, "4005176310157"))
        self.assertNotIn("teil_id", a)

    def test_gelesen(self):
        self.assertEqual(self.gelesen, len(FEED))

    def test_otto_feedauswahl(self):
        otto = next(s for s in af.SHOPS if s["slug"] == "otto")
        self.assertEqual(otto["advertiser_id"], 14336)
        liste = ("Advertiser ID,Feed ID,Feed Name,Language,Membership Status,No of products\n"
                 "14336,1,Kategorien: Mode und Beauty,German,active,344799\n"
                 "14336,2,\"Wohnen, Spielzeug und Baumarkt\",German,active,321530\n")
        alt = af.holen
        af.holen = lambda *a, **k: liste.encode()
        try:
            ids = af.feed_ids("KEY", {"hagebau": "9", "contorion": "8"})
        finally:
            af.holen = alt
        self.assertEqual(ids["otto"], "2")  # nicht der größere Mode-Feed

    def test_ean_schlaegt_nummer(self):
        a = self.beste["t1"]
        self.assertEqual((a["treffer"], a["produkt_id"], a["preis"], a["vorraetig"]), ("ean", "A1", 38.9, True))
        self.assertTrue(a["bild_url"].startswith("https://images2.productserve.com/"))

    def test_geberit_nummer_mit_punkten(self):
        a = self.beste["t2"]
        self.assertEqual((a["treffer"], a["preis"]), ("nummer", 24.5))
        self.assertEqual(a["bild_url"], "https://media.hagebau.de/bild/b1.jpg")

    def test_nummer_im_namen(self):
        a = self.beste["t3"]
        self.assertEqual((a["treffer"], a["vorraetig"]), ("nummer", False))

    def test_fallen(self):
        self.assertNotIn("t4", self.beste)  # Hansgrohe, Armatur, Set
        self.assertNotIn("t5", self.beste)  # Set

    def test_kandidaten(self):
        namen = [k["name"] for k in self.kand]
        self.assertIn("hansgrohe Thermostatkartusche 92282000", namen)
        self.assertNotIn("Bosch Akkuschrauber", namen)

    def test_helfer(self):
        self.assertIn("240705001", af.nummern_im_text("Füllventil 240.705.00.1"))
        self.assertIn("46048000", af.nummern_im_text("Kartusche 46 048 000"))
        # Villeroy & Boch: "9220 55 61" (Katalog) = "92205561" (Contorion), Farbcode R1 statt 61 ist ein anderer Artikel
        self.assertEqual(af.norm_nr("9220 55 61"), af.norm_nr("9220-55-61"))
        self.assertEqual(af.norm_nr("9220 55 61"), "92205561")
        self.assertNotEqual(af.norm_nr("9220 55 61"), af.norm_nr("922055R1"))
        self.assertIn("92205561", af.nummern_im_text("V&B Scharnier 9220 55 61"))
        self.assertTrue(af.marke_im_text("Grohe", "GROHE Eurosmart"))
        self.assertFalse(af.marke_im_text("Grohe", "hansgrohe Talis"))
        self.assertFalse(af.host_erlaubt("http://media.hagebau.de/x.jpg"))
        self.assertFalse(af.host_erlaubt("https://hagebau.de.boese.example/x.jpg"))
        self.assertEqual(af.norm_ean("04005176008283"), "4005176008283")
        self.assertIsNone(af.vorraetig({"in_stock": ""}))

    def test_download_url(self):
        basis = ("https://productdata.awin.com/datafeed/download/apikey/KEY/language/de/fid/92432/"
                 "columns/aw_deep_link,product_name/format/csv/delimiter/%2C/compression/gzip/")
        url = af.download_url(basis, "KEY", "123")
        self.assertIn("/fid/123/", url)
        self.assertIn("/columns/" + ",".join(af.SPALTEN) + "/", url)
        self.assertIn("/fid/77/", af.download_url(None, "KEY", "77"))


class AusgabeTest(unittest.TestCase):
    def test_json_fuer_supabase(self):
        tmp = tempfile.mkdtemp()
        feed, teile, produkte, aus = (os.path.join(tmp, n) for n in ("hagebau.csv.gz", "teile.json", "produkte.json", "angebote.json"))
        schreibe_feed(feed, FEED)
        json.dump(TEILE, open(teile, "w"))
        json.dump([{"ean": e} for e in PRODUKT_EANS] + [{"ean": None}], open(produkte, "w"))
        skript = os.path.join(os.path.dirname(os.path.abspath(__file__)), "awin_feed.py")
        r = subprocess.run([sys.executable, "-I", skript, "--trocken", "--teile-json", teile, "--produkte-json", produkte,
                            "--feed-datei", f"hagebau={feed}", "--json-ausgabe", aus], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        d = json.load(open(aus))
        self.assertEqual(d["shops_fertig"], ["hagebau"])
        self.assertEqual(sorted(a["teil_id"] for a in d["angebote"]), ["t1", "t2", "t3"])
        # t3 hat ein eigenes Foto, bekommt aber trotzdem einen Bildvorschlag; die Datenbank überschreibt "eigen" nicht.
        self.assertEqual({b["teil_id"] for b in d["bilder"]}, {"t1", "t2"})
        self.assertTrue(all(a["url"].startswith("https://www.awin1.com/") for a in d["angebote"]))
        self.assertEqual([(a["ean"], a["shop"]) for a in d["ean_angebote"]], [("4005176310157", "hagebau")])


if __name__ == "__main__":
    unittest.main(verbosity=2)
