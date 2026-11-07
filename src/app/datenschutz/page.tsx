import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von hausbau-hero.de — Informationen zur Datenverarbeitung, Cookies und Ihren Rechten.",
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold mb-8">Datenschutzerklärung</h1>

      {/* 1 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">
          1. Datenschutz auf einen Blick
        </h2>

        <h3 className="text-lg font-semibold mt-5 mb-2">
          Allgemeine Hinweise
        </h3>
        <p className="text-stone-700 leading-relaxed">
          Die folgenden Hinweise geben einen einfachen Überblick darüber,
          was mit Ihren personenbezogenen Daten passiert, wenn Sie diese
          Website besuchen. Personenbezogene Daten sind alle Daten, mit
          denen Sie persönlich identifiziert werden können.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">
          Datenerfassung auf dieser Website
        </h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong>
          <br />
          Die Datenverarbeitung auf dieser Website erfolgt durch den
          Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum
          dieser Website entnehmen.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          <strong>Wie erfassen wir Ihre Daten?</strong>
          <br />
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
          mitteilen (z.B. per E-Mail-Kontakt). Andere Daten werden
          automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
          allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
          Uhrzeit des Seitenaufrufs).
        </p>
        <p className="text-stone-700 leading-relaxed">
          <strong>Wofür nutzen wir Ihre Daten?</strong>
          <br />
          Ein Teil der Daten wird erhoben, um eine fehlerfreie
          Bereitstellung der Website zu gewährleisten. Andere Daten können
          zur Analyse Ihres Nutzerverhaltens verwendet werden.
        </p>
      </section>

      {/* 2 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">2. Hosting</h2>

        <h3 className="text-lg font-semibold mt-5 mb-2">Vercel</h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Wir hosten unsere Website bei Vercel. Anbieter ist die Vercel
          Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Wenn Sie unsere Website besuchen, werden Ihre personenbezogenen
          Daten auf den Servern von Vercel verarbeitet. Hierbei können auch
          personenbezogene Daten an den Mutterkonzern von Vercel in den USA
          übermittelt werden.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1
          lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer
          möglichst zuverlässigen Darstellung unserer Website.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Vercel verfügt über eine Zertifizierung nach dem EU-US Data
          Privacy Framework (DPF).
        </p>
        <p className="text-stone-700">
          Weitere Informationen:{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 break-all"
          >
            https://vercel.com/legal/privacy-policy
          </a>
        </p>
      </section>

      {/* 3 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">
          3. Verantwortliche Stelle
        </h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          BG Online Media UG (haftungsbeschränkt)
          <br />
          Grünwiesenstraße 33
          <br />
          74321 Bietigheim-Bissingen
          <br />
          Deutschland
        </p>
        <p className="text-stone-700 leading-relaxed">
          Telefon: +49 176 22372958
          <br />
          E-Mail:{" "}
          <a
            href="mailto:info@hausbau-hero.de"
            className="text-accent-600 hover:text-accent-700"
          >
            info@hausbau-hero.de
          </a>
        </p>
      </section>

      {/* 4 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">4. Ihre Rechte</h2>
        <p className="text-stone-700 mb-3">
          Sie haben jederzeit das Recht:
        </p>
        <ul className="list-disc list-inside text-stone-700 space-y-1 mb-3">
          <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit zu verlangen (Art. 20 DSGVO)</li>
          <li>Der Verarbeitung zu widersprechen (Art. 21 DSGVO)</li>
        </ul>
        <p className="text-stone-700 mb-3">
          Zur Ausübung Ihrer Rechte wenden Sie sich an:{" "}
          <a
            href="mailto:info@hausbau-hero.de"
            className="text-accent-600 hover:text-accent-700"
          >
            info@hausbau-hero.de
          </a>
        </p>
        <p className="text-stone-700 mb-3">
          Sie haben zudem das Recht, sich bei einer
          Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
          personenbezogenen Daten zu beschweren (Art. 77 DSGVO). Für uns
          zuständig ist der Landesbeauftragte für den Datenschutz und die
          Informationsfreiheit Baden-Württemberg.
        </p>
        <div className="rounded-xl bg-stone-100 p-4 text-stone-700">
          <p className="font-semibold mb-2">Widerspruchsrecht nach Art. 21 DSGVO</p>
          <p className="leading-relaxed">
            Soweit wir Daten auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse) verarbeiten, können Sie dieser
            Verarbeitung aus Gründen, die sich aus Ihrer besonderen Situation
            ergeben, jederzeit widersprechen. Wir verarbeiten die Daten dann
            nicht mehr, es sei denn, wir können zwingende schutzwürdige Gründe
            nachweisen, die Ihre Interessen überwiegen, oder die Verarbeitung
            dient der Geltendmachung, Ausübung oder Verteidigung von
            Rechtsansprüchen.
          </p>
        </div>
      </section>

      {/* 5 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">
          5. Datenerfassung auf dieser Website
        </h2>

        <h3 className="text-lg font-semibold mt-5 mb-2">
          Server-Log-Dateien
        </h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Der Provider der Seiten erhebt und speichert automatisch
          Informationen in sogenannten Server-Log-Dateien, die Ihr Browser
          automatisch an uns übermittelt:
        </p>
        <ul className="list-disc list-inside text-stone-700 space-y-1 mb-3">
          <li>Browsertyp und Browserversion</li>
          <li>Verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>IP-Adresse</li>
        </ul>
        <p className="text-stone-700 leading-relaxed mb-3">
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird
          nicht vorgenommen.
        </p>
        <p className="text-stone-700 mb-3">
          Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6
          Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse ist der sichere
          und fehlerfreie Betrieb der Website. Die Logs werden von Vercel nur
          kurzzeitig vorgehalten und danach automatisch gelöscht.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Kontakt per E-Mail</h3>
        <p className="text-stone-700 leading-relaxed">
          Wenn Sie uns per E-Mail schreiben, verarbeiten wir Ihre Angaben, um
          Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
          DSGVO, soweit es um einen Vertrag oder vorvertragliche Fragen geht,
          sonst Art. 6 Abs. 1 lit. f DSGVO (Interesse an der Beantwortung von
          Anfragen). Wir löschen die Nachricht, wenn die Anfrage erledigt ist,
          sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
        </p>
      </section>

      {/* 5a */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">5a. Webanalyse — Vercel Web Analytics</h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Wir nutzen Vercel Web Analytics von Vercel Inc. (440 N Barranca Ave
          #4133, Covina, CA 91723, USA). Erfasst werden Seitenaufrufe, Referrer,
          Gerätetyp, Browser, Betriebssystem und das ungefähre Land. Das Skript
          wird über unsere eigene Domain geladen.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Vercel Web Analytics setzt <strong>keine Cookies</strong> und speichert nichts in
          Ihrem Browser. Um Besuche zu zählen, bildet Vercel aus den Daten der
          Anfrage (unter anderem IP-Adresse und Browserkennung) einen Hashwert, der
          nach 24 Stunden verworfen wird. Eine Wiedererkennung über mehrere Tage
          findet nicht statt, die IP-Adresse wird nicht gespeichert.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Die Datenverarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an der Analyse der Websitenutzung zur Verbesserung
          unseres Angebots).
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Vercel verfügt über eine Zertifizierung nach dem EU-US Data Privacy Framework.
        </p>
        <p className="text-stone-700">
          Weitere Informationen:{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 break-all"
          >
            vercel.com/docs/analytics/privacy-policy
          </a>
        </p>
      </section>

      {/* 6 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">6. Datenbank</h2>

        <h3 className="text-lg font-semibold mt-5 mb-2">Supabase</h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Wir nutzen Supabase als Datenbank für die Inhalte der Website
          (Ratgeber, Ersatzteile, Materialrechner) und für die Klickzählung
          (Abschnitt 7). Anbieter ist Supabase Inc.; die Datenbank liegt in Frankfurt am Main (EU).
          Die Inhalte werden auf unserem Server abgerufen, Ihr Browser baut
          keine Verbindung zu Supabase auf. Personenbezogene Daten von
          Besuchern speichern wir dort nicht.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Die Berechnungsergebnisse der Materialrechner werden nicht serverseitig
          gespeichert. Alle Eingaben werden ausschließlich im Browser des Nutzers
          verarbeitet.
        </p>
        <p className="text-stone-700">
          Weitere Informationen:{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 break-all"
          >
            supabase.com/privacy
          </a>
        </p>
      </section>

      {/* 7 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">7. Affiliate-Marketing</h2>

        <h3 className="text-lg font-semibold mt-5 mb-2">Affiliate-Links</h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Bei Klick auf einen Affiliate-Link werden Sie an einen externen
          Shop (z.B. Amazon.de, hagebau.de, Contorion, Otto, Megabad oder eBay) weitergeleitet. Der Link
          enthält eine Kennung unserer Website und die Stelle, an der er
          stand (z.B. Seitenart und Seitenname), damit der Shop bzw. das
          Partnernetzwerk einen Kauf unserer Website zuordnen kann. Cookies
          setzt erst der Shop bzw. das Netzwerk auf seiner eigenen Domain und
          in eigener Verantwortung; unsere Website speichert beim Klick nichts
          in Ihrem Browser. Rechtsgrundlage für die Kennung im Link ist unser
          berechtigtes Interesse an der Abrechnung unserer Provision (Art. 6
          Abs. 1 lit. f DSGVO).
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Zusätzlich zählen wir Klicks auf Affiliate-Links selbst. Dabei
          speichern wir nur die Seite, auf der geklickt wurde, das Ziel
          (z.B. amazon.de, ebay.de oder awin1.com und den Shop), die Position des Links und den Zeitpunkt –
          keine IP-Adresse, keine Cookies und keine anderen
          personenbezogenen Daten. Rechtsgrundlage ist unser berechtigtes
          Interesse an der Verbesserung unserer Inhalte (Art. 6 Abs. 1
          lit. f DSGVO). Quellenangaben verlinken wir ohne Partnerkennung.
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">
          Amazon-Partnerprogramm
        </h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Diese Website nimmt am Amazon EU-Partnerprogramm teil. Auf
          unseren Seiten werden Links zur Seite von Amazon.de eingebunden,
          an denen wir über Werbekostenerstattung Geld verdienen können.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Amazon setzt nach dem Klick auf seiner Website Cookies ein, um die
          Herkunft der Bestellungen nachvollziehen zu können. Dadurch kann
          Amazon erkennen, dass Sie den Partnerlink auf unserer Website
          geklickt haben. Dafür ist Amazon selbst verantwortlich; Ihre
          Cookie-Einstellungen legen Sie bei Amazon fest.
        </p>
        <p className="text-stone-700">
          Weitere Informationen:{" "}
          <a
            href="https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 break-all"
          >
            https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010
          </a>
        </p>
      </section>

      {/* 7a */}
      <section className="mb-8">
        <h3 className="text-lg font-semibold mt-5 mb-2">Awin-Partnerprogramm</h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Links zu weiteren Shops (z.B. hagebau.de, Contorion, Otto, Megabad) laufen über das
          Partnernetzwerk Awin (Awin AG, Landsberger Allee 104 BC, 10249
          Berlin). Klicken Sie auf einen solchen Link, setzt Awin
          Tracking-Cookies und nutzt nach eigenen Angaben auch Journey Tags und
          Device Fingerprinting, um einen Kauf unserer Website zuzuordnen. Awin
          erfährt dabei nicht, wer Sie sind. Rechtsgrundlage ist Art. 6 Abs. 1
          lit. f DSGVO; unser berechtigtes Interesse ist die Abrechnung der
          Provision.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Datenschutzerklärung von Awin:{" "}
          <a
            href="https://www.awin.com/de/rechtliches/privacy-policy-DACH"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 break-all"
          >
            https://www.awin.com/de/rechtliches/privacy-policy-DACH
          </a>
          . Dem Awin-Tracking können Sie hier widersprechen:{" "}
          <a
            href="https://www.awin.com/de/rechtliches/optout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 break-all"
          >
            https://www.awin.com/de/rechtliches/optout
          </a>
          .
        </p>
        <h3 className="text-lg font-semibold mt-5 mb-2">eBay Partner Network</h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Links zu eBay.de laufen über das eBay Partner Network. Der Link enthält eine Kennung
          unserer Website; eBay setzt beim Klick Cookies und nutzt Tracking-Code, um einen Kauf
          unserer Website zuzuordnen.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse ist die
          Abrechnung der Provision.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Datenschutzhinweise des eBay Partner Network:{" "}
          <a
            href="https://partnernetwork.ebay.com/page/network-agreement#privacy-notice"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-600 hover:text-accent-700 break-all"
          >
            https://partnernetwork.ebay.com/page/network-agreement#privacy-notice
          </a>
        </p>
        <h3 className="text-lg font-semibold mt-5 mb-2">Produktbilder</h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Produktbilder aus den Datenfeeds der Partnershops werden über unseren
          eigenen Server (Vercel) ausgeliefert. Ihr Browser lädt sie also nicht
          direkt vom Shop, dabei werden keine Daten an den Shop übertragen.
        </p>
      </section>

      {/* 8 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">8. Cookies</h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Unsere Website selbst setzt keine Cookies und speichert nichts in
          Ihrem Browser (auch nicht im Local Storage). Es
          werden keine cookie-basierten Analysetools wie Google Analytics eingesetzt.
          Wir nutzen Vercel Web Analytics, einen cookielosen Analysedienst (siehe Abschnitt 5a).
        </p>
        <p className="text-stone-700">
          Cookies von Drittanbietern (z.B. Amazon, Awin, eBay) entstehen erst,
          wenn Sie einem Partnerlink folgen, und zwar auf der Website des
          jeweiligen Anbieters, nicht auf unserer. Ob und welche Cookies dort
          gesetzt werden, regelt der Anbieter in seiner eigenen
          Datenschutzerklärung und Cookie-Abfrage.
        </p>
      </section>

      {/* 9 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">9. Schriftarten</h2>
        <p className="text-stone-700">
          Diese Website nutzt ausschließlich system-eigene Schriftarten
          bzw. über den eigenen Server ausgelieferte Schriften. Es findet
          keine Verbindung zu Google-Servern oder anderen Drittanbietern
          für Schriftarten statt.
        </p>
      </section>

      {/* 10 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold leading-tight mb-3">10. Aktualität</h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand:
          November 2026.
        </p>
        <p className="text-stone-700">
          Durch die Weiterentwicklung unserer Website oder aufgrund
          geänderter gesetzlicher Vorgaben kann es notwendig werden, diese
          Datenschutzerklärung zu ändern.
        </p>
      </section>
    </div>
  );
}
