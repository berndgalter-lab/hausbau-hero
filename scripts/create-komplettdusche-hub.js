const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const badSiloId = "5561d744-af3e-4f24-b89e-965a082ae690";

const content = `<h2>Was ist eine Komplettdusche?</h2>

<p>Eine Komplettdusche ist eine fertige Duschkabine, die als Komplett-Set geliefert wird: Duschwanne, Seitenw\u00e4nde, T\u00fcr, Armatur und Brause \u2014 alles in einem Paket. Viele Modelle bieten zus\u00e4tzliche Extras wie Dampffunktion, Massaged\u00fcsen, LED-Beleuchtung oder sogar ein eingebautes Radio.</p>

<p>Du kennst sie vielleicht unter anderen Namen: <strong>Duschtempel</strong>, <strong>Fertigdusche</strong> oder <strong>Duschkomplettkabine</strong> \u2014 gemeint ist dasselbe Produkt.</p>

<p>Der gr\u00f6\u00dfte Vorteil: Du brauchst keinen Fliesenleger. Die Kabine wird einfach an Wasser- und Abflussanschluss angeschlossen und steht. Ideal f\u00fcr schnelle Badrenovierungen mit kleinem Budget.</p>

<h2>Vor- und Nachteile</h2>

<h3>Vorteile</h3>
<ul>
<li><strong>Schnelle Montage:</strong> In 2\u20134 Stunden aufgebaut, kein Fliesenleger oder Maurer n\u00f6tig.</li>
<li><strong>G\u00fcnstiger als Komplett-Sanierung:</strong> Ab 300 \u20ac statt 3.000\u20138.000 \u20ac f\u00fcr eine geflieste Dusche mit Handwerker.</li>
<li><strong>R\u00fcckbaubar:</strong> In Mietwohnungen l\u00e4sst sich die Kabine wieder entfernen, ohne Spuren zu hinterlassen.</li>
<li><strong>Extras inklusive:</strong> Dampf, Massage, Regendusche \u2014 bei einer gemauerten Dusche kosten diese Extras deutlich mehr.</li>
</ul>

<h3>Nachteile</h3>
<ul>
<li><strong>Optik:</strong> Kunststoff wirkt g\u00fcnstiger als Fliesen und Echtglas. In einem hochwertigen Bad f\u00e4llt das auf.</li>
<li><strong>Reinigung:</strong> Die vielen Ecken, D\u00fcsen und Fugen sind schwerer sauber zu halten als eine schlichte Glasdusche.</li>
<li><strong>Begrenzte Ma\u00dfe:</strong> Standardgr\u00f6\u00dfen (80\u00d780, 90\u00d790, 100\u00d7100 cm). Ma\u00dfanfertigungen gibt es praktisch nicht.</li>
<li><strong>Ersatzteile:</strong> Bei No-Name-Marken sind Ersatzd\u00fcsen, Dichtungen oder Pumpen nach 3\u20135 Jahren oft nicht mehr erh\u00e4ltlich.</li>
<li><strong>Lebensdauer:</strong> Rechne mit 5\u201310 Jahren. Eine geflieste Dusche h\u00e4lt 20\u201330 Jahre.</li>
</ul>

<h2>Was kostet eine Komplettdusche?</h2>

<table>
<thead>
<tr><th>Kategorie</th><th>Preis</th><th>Was bekommt man</th></tr>
</thead>
<tbody>
<tr><td>Budget</td><td>300\u2013600 \u20ac</td><td>Basis-Kabine mit Regendusche, ohne Dampf. Kunststoffwanne.</td></tr>
<tr><td>Mittelklasse</td><td>600\u20131.500 \u20ac</td><td>Dampffunktion, Massaged\u00fcsen, Sitzbank, LED-Beleuchtung.</td></tr>
<tr><td>Premium</td><td>1.500\u20133.000 \u20ac</td><td>Whirlpool-Funktion, Radio, Touchpanel, hochwertige Materialien.</td></tr>
</tbody>
</table>

<p><strong>Zum Vergleich:</strong> Eine klassische Dusche sanieren (Fliesen + Armatur + Glaswand + Handwerker) kostet <strong>3.000\u20138.000 \u20ac</strong>. Eine Komplettdusche ist also deutlich g\u00fcnstiger \u2014 aber eben auch weniger langlebig.</p>

<p>\u2192 <a href="/rechner/handwerkerkosten">Was kostet ein Installateur in deiner Region? \u2192</a></p>

<h2>F\u00fcr wen lohnt sich eine Komplettdusche?</h2>

<h3>Ja, sinnvoll bei:</h3>
<ul>
<li><strong>Mietwohnung:</strong> Du kannst die Kabine beim Auszug wieder mitnehmen oder entfernen.</li>
<li><strong>Keller- oder G\u00e4stebad:</strong> Hier brauchst du keine Premium-Optik, sondern eine funktionale L\u00f6sung.</li>
<li><strong>Budget unter 1.000 \u20ac:</strong> Wenn eine echte Badsanierung finanziell nicht drin ist.</li>
<li><strong>Schnelle L\u00f6sung:</strong> Bad muss in 1\u20132 Tagen nutzbar sein (z.B. nach Wasserschaden).</li>
</ul>

<h3>Eher nicht bei:</h3>
<ul>
<li><strong>Hauptbad:</strong> Hier lohnt sich die Investition in eine geflieste Dusche \u2014 sie h\u00e4lt l\u00e4nger und wertet die Immobilie auf.</li>
<li><strong>Langfristige L\u00f6sung:</strong> Wenn du 15+ Jahre in der Wohnung bleibst, ist die Sanierung wirtschaftlicher.</li>
<li><strong>Design-Anspruch:</strong> Komplettduschen sehen immer nach Komplettdusche aus \u2014 eine individuelle L\u00f6sung wirkt hochwertiger.</li>
</ul>

<h2>Montage: Selber machen oder Handwerker?</h2>

<p>Die meisten Komplettduschen sind f\u00fcr die Selbstmontage konzipiert. Du brauchst:</p>
<ul>
<li>Wasser-Eckventile (Kalt + Warm) in der N\u00e4he</li>
<li>Einen Abfluss (DN 90 oder DN 50 mit Adapter)</li>
<li>Stromanschluss f\u00fcr Dampf/LED (bei Modellen mit Elektronik)</li>
<li>Grundwerkzeug: Schraubendreher, Rohrzange, Silikon, Wasserwaage</li>
</ul>

<p><strong>Zeitaufwand:</strong> 2\u20134 Stunden zu zweit. Alleine machbar, aber beim Einsetzen der Glasw\u00e4nde ist eine zweite Person hilfreich.</p>

<p>Falls du Hilfe brauchst:</p>
<ul>
<li><a href="/rechner/sanitaer">Berechne deinen Sanit\u00e4r-Bedarf \u2192</a></li>
<li><a href="/rechner/handwerkerkosten">Was kostet ein Installateur? \u2192</a></li>
</ul>

<h2>Unsere Empfehlungen</h2>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Komplettdusche+90x90&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Komplettdusche 90\u00d790 cm</a> (ca. 350\u2013500 \u20ac) \u2014 Einfache Fertigdusche mit Regendusche und Handbrause. Solide Basis f\u00fcr G\u00e4stebad oder Keller. Ohne Dampf, daf\u00fcr pflegeleichter.</p>

<p><strong>Mittelklasse-Tipp:</strong> <a href="https://www.amazon.de/s?k=Duschtempel+Dampfdusche+90x90&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Duschtempel mit Dampffunktion</a> (ca. 700\u20131.000 \u20ac) \u2014 Kabine mit Dampfgenerator, Massaged\u00fcsen und Sitzbank. Das Spa-Gef\u00fchl f\u00fcr Zuhause, ohne das Bad komplett umzubauen.</p>

<p><strong>Upgrade-Tipp:</strong> <a href="https://www.amazon.de/s?k=Acquavapore+Duschtempel&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">AcquaVapore Duschtempel</a> (ca. 800\u20131.200 \u20ac) \u2014 Beliebte Marke mit guter Ersatzteil-Verf\u00fcgbarkeit. Verschiedene Gr\u00f6\u00dfen, Dampf, LED und Whirlpool-Funktion. Eine der wenigen Marken, bei denen du auch nach Jahren noch Ersatzteile bekommst.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Wie lange h\u00e4lt eine Komplettdusche?</h3>
<p>Rechne mit <strong>5\u201310 Jahren</strong> bei t\u00e4glicher Nutzung. Die Kabine selbst h\u00e4lt oft l\u00e4nger, aber D\u00fcsen, Pumpen und Dichtungen verschlei\u00dfen. Bei Marken-Modellen (z.B. AcquaVapore) bekommst du Ersatzteile, bei No-Name-Produkten oft nicht.</p>

<h3>Kann ich eine Komplettdusche selber einbauen?</h3>
<p>Ja, die meisten Modelle sind f\u00fcr Selbstmontage konzipiert. Du brauchst Wasser-Eckventile, einen Abfluss und bei Dampf-Modellen einen Stromanschluss. Zeitaufwand: 2\u20134 Stunden zu zweit. Wichtig: Silikonieren sorgf\u00e4ltig machen, sonst droht Schimmel.</p>

<h3>Duschtempel vs. gemauerte Dusche \u2014 was ist besser?</h3>
<p>Das kommt auf dein Budget und deine Situation an. <strong>Komplettdusche:</strong> g\u00fcnstiger (300\u20131.500 \u20ac), schnelle Montage, k\u00fcrzere Lebensdauer. <strong>Gemauerte Dusche:</strong> teurer (3.000\u20138.000 \u20ac), braucht Handwerker, h\u00e4lt daf\u00fcr 20\u201330 Jahre und wertet die Immobilie auf. F\u00fcr Mietwohnungen und G\u00e4steb\u00e4der ist die Komplettdusche die bessere Wahl. F\u00fcrs Hauptbad lohnt sich die Investition in eine geflieste L\u00f6sung.</p>`;

async function run() {
  console.log("=== SCHRITT 1: Hub-Artikel erstellen ===");
  const res1 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: badSiloId,
      slug: "komplettdusche-ratgeber",
      titel:
        "Komplettdusche & Duschtempel \u2014 lohnt sich das? Kosten & Tipps (2026)",
      seo_title:
        "Komplettdusche & Duschtempel \u2014 lohnt sich das? Kosten & Tipps (2026)",
      seo_description:
        "Komplettdusche oder geflieste Dusche? Alle Vor- und Nachteile, Kosten (300\u20133.000 \u20ac), Montage-Tipps und konkrete Kaufempfehlungen.",
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

  console.log("\n=== SCHRITT 2: 2 alte Artikel auf Redirect setzen ===");
  const oldSlugs = ["duschtempel", "komplettdusche"];

  let ok = 0;
  for (const slug of oldSlugs) {
    const res = await fetch(BASE + "/rest/v1/seiten?slug=eq." + slug, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        status: "redirect",
        redirect_to: "/bad/komplettdusche-ratgeber",
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
  console.log("\n" + ok + "/2 Redirects gesetzt");
}

run();
