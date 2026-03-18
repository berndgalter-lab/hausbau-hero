import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description:
    "Datenschutzerklärung von hausbau-hero.de — Informationen zur Datenverarbeitung, Cookies und Ihren Rechten.",
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Datenschutzerklärung</h1>

      {/* 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">
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
          mitteilen (z.B. per E-Mail oder über das
          Community-Kosten-Formular). Andere Daten werden automatisch beim
          Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor
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
        <h2 className="text-xl font-bold mb-3">2. Hosting</h2>

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
            className="text-amber-600 hover:text-amber-700 break-all"
          >
            https://vercel.com/legal/privacy-policy
          </a>
        </p>
      </section>

      {/* 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">
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
            className="text-amber-600 hover:text-amber-700"
          >
            info@hausbau-hero.de
          </a>
        </p>
      </section>

      {/* 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">4. Ihre Rechte</h2>
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
            className="text-amber-600 hover:text-amber-700"
          >
            info@hausbau-hero.de
          </a>
        </p>
        <p className="text-stone-700">
          Sie haben zudem das Recht, sich bei einer
          Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
          personenbezogenen Daten zu beschweren.
        </p>
      </section>

      {/* 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">
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
        <p className="text-stone-700">
          Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6
          Abs. 1 lit. f DSGVO.
        </p>
      </section>

      {/* 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">6. Datenbank</h2>

        <h3 className="text-lg font-semibold mt-5 mb-2">Supabase</h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Wir nutzen Supabase als Datenbank-Dienst für
          Materialberechnungen und Community-Daten. Anbieter ist Supabase
          Inc. Die Server befinden sich in Frankfurt (EU).
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">
          Community-Kosten-Formular
        </h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Wenn Sie freiwillig am Community-Kosten-Formular teilnehmen
          (&ldquo;Was hat es bei dir gekostet?&rdquo;), speichern wir die
          von Ihnen eingegebene Region, Kosten und optional einen
          Kommentar. Es wird kein Account benötigt. Rechtsgrundlage ist
          Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">
          E-Mail-Capture (Materialliste als PDF)
        </h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Wenn Sie Ihre E-Mail-Adresse eingeben um eine Materialliste als
          PDF zu erhalten, speichern wir Ihre E-Mail-Adresse. Sie können
          jederzeit die Löschung verlangen. Rechtsgrundlage ist Ihre
          Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
        </p>
        <p className="text-stone-700">
          Weitere Informationen:{" "}
          <a
            href="https://supabase.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700 break-all"
          >
            https://supabase.com/privacy
          </a>
        </p>
      </section>

      {/* 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">7. Affiliate-Marketing</h2>

        <h3 className="text-lg font-semibold mt-5 mb-2">Affiliate-Links</h3>
        <p className="text-stone-700 leading-relaxed mb-3">
          Bei Klick auf einen Affiliate-Link werden Sie an einen externen
          Shop (z.B. Amazon.de) weitergeleitet. Dabei wird ein Cookie des
          jeweiligen Shops gesetzt, der den Kauf Ihrer Sitzung zuordnet.
          Rechtsgrundlage ist unser berechtigtes Interesse an der
          Auswertung unserer Affiliate-Einnahmen (Art. 6 Abs. 1 lit. f
          DSGVO).
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
          Amazon setzt Cookies ein, um die Herkunft der Bestellungen
          nachvollziehen zu können. Dadurch kann Amazon erkennen, dass Sie
          den Partnerlink auf unserer Website geklickt haben.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Die Speicherung von Amazon-Cookies erfolgt auf Grundlage von
          Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes
          Interesse, da nur durch die Cookies die Höhe unserer
          Affiliate-Vergütung feststellbar ist.
        </p>
        <p className="text-stone-700">
          Weitere Informationen:{" "}
          <a
            href="https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700 break-all"
          >
            https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010
          </a>
        </p>
      </section>

      {/* 8 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">8. Cookies</h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Unsere Website selbst verwendet keine Tracking-Cookies. Es
          werden keine Analysetools wie Google Analytics eingesetzt.
        </p>
        <p className="text-stone-700">
          Cookies von Drittanbietern (z.B. Amazon) werden ausschließlich
          beim Klick auf Affiliate-Links gesetzt. Durch den Klick auf
          einen Affiliate-Link erklären Sie sich mit dem Setzen dieser
          Cookies einverstanden.
        </p>
      </section>

      {/* 9 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">9. Schriftarten</h2>
        <p className="text-stone-700">
          Diese Website nutzt ausschließlich system-eigene Schriftarten
          bzw. über den eigenen Server ausgelieferte Schriften. Es findet
          keine Verbindung zu Google-Servern oder anderen Drittanbietern
          für Schriftarten statt.
        </p>
      </section>

      {/* 10 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">10. Aktualität</h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Diese Datenschutzerklärung ist aktuell gültig und hat den Stand:
          März 2026.
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
