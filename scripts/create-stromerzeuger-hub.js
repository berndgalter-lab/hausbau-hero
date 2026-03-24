const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const siloId = "f699503b-594f-441a-bc04-fc162c1e90eb";

const content = `<h2>Welchen Stromerzeuger brauchst du?</h2>

<ul>
<li><strong>Baustelle ohne Stromanschluss</strong> \u2014 Ein Benzin- oder Diesel-Generator liefert zuverl\u00e4ssig Strom f\u00fcr Kreiss\u00e4ge, Bohrmaschine und Kompressor. F\u00fcr die meisten Baustellen reichen 2.000\u20135.000 Watt.</li>
<li><strong>Empfindliche Elektronik</strong> \u2014 Laptops, Messinstrumente oder Ladeger\u00e4te brauchen sauberen Strom. Ein <strong>Inverter-Generator</strong> liefert eine stabile Sinuswelle und sch\u00fctzt deine Ger\u00e4te.</li>
<li><strong>Notstrom f\u00fcr Zuhause</strong> \u2014 Bei Stromausfall willst du K\u00fchlschrank, Heizung und Licht versorgen. Dual-Fuel-Ger\u00e4te (Benzin + Gas) oder Diesel-Generatoren bieten die l\u00e4ngste Laufzeit.</li>
<li><strong>Camping & Outdoor</strong> \u2014 Kleine Inverter-Generatoren (1.000\u20132.000 W) sind leicht, leise und reichen f\u00fcr Licht, Handy und K\u00fchlbox.</li>
</ul>

<p>\u2192 <a href="/rechner/stromverbrauch">Berechne welche Leistung du brauchst \u2192</a></p>

<h2>Benzin vs. Diesel vs. Inverter vs. Gas</h2>

<table>
<thead>
<tr><th></th><th>Benzin</th><th>Diesel</th><th>Inverter</th><th>Gas / Dual-Fuel</th></tr>
</thead>
<tbody>
<tr><td><strong>Preis</strong></td><td>300\u20131.500 \u20ac</td><td>800\u20133.000 \u20ac</td><td>400\u20132.000 \u20ac</td><td>500\u20132.500 \u20ac</td></tr>
<tr><td><strong>Lautst\u00e4rke</strong></td><td>65\u201380 dB (laut)</td><td>75\u201390 dB (sehr laut)</td><td>50\u201360 dB (leise)</td><td>60\u201375 dB (mittel)</td></tr>
<tr><td><strong>Laufzeit pro Tank</strong></td><td>6\u201310 Stunden</td><td>10\u201320 Stunden</td><td>4\u20138 Stunden</td><td>8\u201312 Stunden</td></tr>
<tr><td><strong>Bester Einsatz</strong></td><td>Baustelle, Garten</td><td>Dauerbetrieb, Profi</td><td>Camping, Elektronik</td><td>Notstrom, Haus</td></tr>
<tr><td><strong>Wartung</strong></td><td>Mittel</td><td>H\u00f6her</td><td>Gering</td><td>Mittel</td></tr>
<tr><td><strong>Gewicht</strong></td><td>20\u201380 kg</td><td>50\u2013150 kg</td><td>10\u201330 kg</td><td>30\u201380 kg</td></tr>
</tbody>
</table>

<p><strong>Kurzfassung:</strong> F\u00fcr die meisten Baustellen ist ein <strong>Benzin-Generator</strong> das beste Preis-Leistungs-Verh\u00e4ltnis. F\u00fcr empfindliche Ger\u00e4te nimm einen <strong>Inverter</strong>. F\u00fcr Dauerbetrieb oder Profi-Einsatz lohnt sich ein <strong>Diesel</strong>.</p>

<h2>Die wichtigsten Marken</h2>

<p><strong>Honda</strong> \u2014 Der Mercedes unter den Stromerzeugern. Extrem zuverl\u00e4ssig, leise und langlebig. Nachteil: deutlich teurer als die Konkurrenz (ab 800 \u20ac f\u00fcr kleine Modelle).</p>

<p><strong>Einhell</strong> \u2014 Solides Preis-Leistungs-Verh\u00e4ltnis f\u00fcr Heimwerker. Gute Grundausstattung, ordentliche Verarbeitung, moderate Preise (ab 300 \u20ac).</p>

<p><strong>Scheppach</strong> \u2014 Die Budget-Option f\u00fcr gelegentlichen Einsatz. G\u00fcnstig in der Anschaffung, aber nicht f\u00fcr Dauerbetrieb gebaut.</p>

<p><strong>DENQBAR</strong> \u2014 Spezialist f\u00fcr Inverter-Generatoren. Sehr gutes Preis-Leistungs-Verh\u00e4ltnis bei sauberer Stromqualit\u00e4t. Beliebt bei Campern und f\u00fcr empfindliche Elektronik.</p>

<p><strong>Pramac</strong> \u2014 Profi-Marke f\u00fcr Baustellen und Industrie. Robuste Diesel-Generatoren mit hoher Leistung. Preislich im oberen Segment (ab 1.500 \u20ac).</p>

<h2>Worauf beim Kauf achten?</h2>

<ul>
<li><strong>Leistung (Watt):</strong> Addiere den Verbrauch aller Ger\u00e4te, die gleichzeitig laufen sollen. Plane 20\u201330 % Reserve ein f\u00fcr Anlaufstr\u00f6me von Motoren. Unser <a href="/rechner/stromverbrauch">Stromerzeuger-Rechner</a> hilft dir dabei.</li>
<li><strong>Lautst\u00e4rke (dB):</strong> Ab 70 dB wird es unangenehm. In Wohngebieten gelten oft Grenzwerte \u2014 pr\u00fcfe die lokalen Vorschriften. Inverter sind mit 50\u201360 dB am leisesten.</li>
<li><strong>Tankgr\u00f6\u00dfe und Laufzeit:</strong> Ein gr\u00f6\u00dferer Tank bedeutet l\u00e4ngere Laufzeit ohne Nachtanken. Bei Dauereinsatz auf der Baustelle mindestens 10 Liter Tank w\u00e4hlen.</li>
<li><strong>Steckdosen-Typen:</strong> Pr\u00fcfe ob du Schuko-Steckdosen (230V, 16A), CEE-Steckdosen (400V, Drehstrom) oder 12V-Ausg\u00e4nge brauchst. Profi-Modelle bieten oft alle drei.</li>
<li><strong>IP-Schutzklasse:</strong> F\u00fcr den Au\u00dfeneinsatz mindestens IP23 (Schutz gegen Regen). Auf Baustellen mit viel Staub IP44 empfehlenswert.</li>
<li><strong>Startmechanismus:</strong> Seilzugstart ist Standard. E-Start (Elektrostarter) ist komfortabler, kostet aber 50\u2013100 \u20ac mehr. Bei schweren Diesel-Modellen ist E-Start fast Pflicht.</li>
</ul>

<h2>Unsere Empfehlungen</h2>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Einhell+TC-PG+35+Stromerzeuger&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Einhell TC-PG 35/E5</a> (ca. 350\u2013450 \u20ac) \u2014 3.500 Watt Benzin-Generator mit E-Start. Solide Leistung f\u00fcr Baustelle und Garten. Zwei Schuko-Steckdosen, 15-Liter-Tank f\u00fcr rund 10 Stunden Laufzeit.</p>

<p><strong>Inverter-Tipp:</strong> <a href="https://www.amazon.de/s?k=DENQBAR+DQ-2100+Inverter&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">DENQBAR DQ-2100</a> (ca. 500\u2013650 \u20ac) \u2014 2.100 Watt Inverter-Generator mit reiner Sinuswelle. Nur 59 dB leise, 4,2 Liter Tank. Perfekt f\u00fcr Camping, empfindliche Elektronik und den Garten.</p>

<p><strong>Profi-Tipp:</strong> <a href="https://www.amazon.de/s?k=Honda+EU22i+Stromerzeuger&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Honda EU22i</a> (ca. 1.800\u20132.200 \u20ac) \u2014 2.200 Watt Inverter der Referenzklasse. Extrem leise (nur 53 dB), zuverl\u00e4ssiger Honda-Motor, \u00f6ko-Drosselmodus f\u00fcr l\u00e4ngere Laufzeit. Die Investition lohnt sich f\u00fcr Profi-Einsatz.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Wie viel Watt brauche ich auf der Baustelle?</h3>
<p>F\u00fcr typische Heimwerker-Baustellen reichen 2.000\u20133.000 Watt (Bohrmaschine + Flex + Licht). Wenn du eine Kreiss\u00e4ge (ca. 2.000 W Anlaufstrom) oder einen Kompressor betreibst, solltest du mindestens 3.500\u20135.000 Watt einplanen. Nutze unseren <a href="/rechner/stromverbrauch">Stromerzeuger-Rechner</a> f\u00fcr eine genaue Berechnung.</p>

<h3>Darf ich einen Stromerzeuger im Wohngebiet nutzen?</h3>
<p>Grunds\u00e4tzlich ja, aber es gelten Ruhezeiten (in den meisten Gemeinden 13\u201315 Uhr und 22\u20137 Uhr). Au\u00dferdem muss der L\u00e4rmpegel die Grenzwerte der 32. BImSchV einhalten. Ein leiser Inverter-Generator (unter 60 dB) ist hier die bessere Wahl als ein lauter Baustellengenerator.</p>

<h3>Benzin oder Diesel \u2014 was ist g\u00fcnstiger im Betrieb?</h3>
<p>Diesel ist pro Liter etwa 10\u201315 % effizienter und der Kraftstoff etwas g\u00fcnstiger. Bei gelegentlichem Einsatz (unter 100 Stunden/Jahr) lohnt sich der h\u00f6here Anschaffungspreis eines Diesel-Generators aber nicht. <strong>Faustregel:</strong> Unter 500 Betriebsstunden/Jahr \u2192 Benzin. Dar\u00fcber \u2192 Diesel.</p>`;

async function run() {
  console.log("=== SCHRITT 1: Hub-Artikel erstellen ===");
  const res1 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: siloId,
      slug: "stromerzeuger-vergleich",
      titel: "Stromerzeuger kaufen \u2014 Benzin, Diesel, Inverter im Vergleich (2026)",
      seo_title: "Stromerzeuger kaufen \u2014 Benzin, Diesel, Inverter Vergleich (2026)",
      seo_description:
        "Benzin, Diesel oder Inverter? Alle Stromerzeuger-Typen im Vergleich mit Preisen, Lautst\u00e4rke, Laufzeit und konkreten Empfehlungen f\u00fcr Baustelle, Camping und Notstrom.",
      typ: "artikel",
      content_md: content,
      status: "aktiv",
      sortierung: 0,
    }),
  });
  const d1 = await res1.json();
  if (res1.ok && d1.length > 0) {
    console.log("OK: Artikel erstellt, id:", d1[0].id);
  } else {
    console.log("FAIL:", res1.status, JSON.stringify(d1));
  }

  console.log("\n=== SCHRITT 2: 3 alte Artikel auf Redirect setzen ===");
  const oldSlugs = [
    "stromerzeuger-benzin",
    "stromerzeuger-diesel",
    "pramac-stromerzeuger",
  ];

  let ok = 0;
  for (const slug of oldSlugs) {
    const res = await fetch(BASE + "/rest/v1/seiten?slug=eq." + slug, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        status: "redirect",
        redirect_to: "/stromerzeuger/stromerzeuger-vergleich",
      }),
    });
    const data = await res.json();
    if (res.ok && data.length > 0) {
      console.log("OK:", slug, "-> redirect");
      ok++;
    } else {
      console.log("FAIL:", slug, res.status, JSON.stringify(data));
    }
  }
  console.log("\n" + ok + "/3 Redirects gesetzt");
}

run();
