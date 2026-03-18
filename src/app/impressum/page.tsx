import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von hausbau-hero.de — BG Online Media UG, Bietigheim-Bissingen.",
};

export default function ImpressumPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Impressum</h1>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Angaben gemäß § 5 DDG</h2>
        <p className="text-stone-700 leading-relaxed">
          BG Online Media UG (haftungsbeschränkt)
          <br />
          Grünwiesenstraße 33
          <br />
          74321 Bietigheim-Bissingen
          <br />
          Deutschland
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Handelsregister</h3>
        <p className="text-stone-700 leading-relaxed">
          Registergericht: Amtsgericht Stuttgart
          <br />
          Registernummer: HRB 774462
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Vertreten durch</h3>
        <p className="text-stone-700">Geschäftsführer: Bernd Galter</p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Kontakt</h3>
        <p className="text-stone-700 leading-relaxed">
          Telefon: +49 176 22372958
          <br />
          E-Mail:{" "}
          <a href="mailto:info@hausbau-hero.de" className="text-amber-600 hover:text-amber-700">
            info@hausbau-hero.de
          </a>
        </p>

        <h3 className="text-lg font-semibold mt-5 mb-2">Umsatzsteuer-ID</h3>
        <p className="text-stone-700">
          Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:
          DE331972080
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">
          Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
        </h2>
        <p className="text-stone-700 leading-relaxed">
          Bernd Galter
          <br />
          Grünwiesenstraße 33
          <br />
          74321 Bietigheim-Bissingen
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">EU-Streitschlichtung</h2>
        <p className="text-stone-700 leading-relaxed">
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700 break-all"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
        </p>
        <p className="text-stone-700 mt-2">
          Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">
          Verbraucherstreitbeilegung / Universalschlichtungsstelle
        </h2>
        <p className="text-stone-700">
          Wir sind nicht bereit oder verpflichtet, an
          Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">
          Haftungsausschluss / Disclaimer
        </h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Die auf hausbau-hero.de bereitgestellten Informationen dienen
          ausschließlich zu Informationszwecken. Die Materialberechnungen
          basieren auf öffentlich verfügbaren Herstellerangaben und
          branchenüblichen Erfahrungswerten.
        </p>
        <p className="text-stone-700 leading-relaxed mb-3">
          Wir bemühen uns um Richtigkeit und Aktualität der Angaben,
          übernehmen jedoch keine Gewähr für Vollständigkeit, Richtigkeit
          oder Aktualität der bereitgestellten Berechnungen. Eine Haftung
          für Schäden, die durch die Nutzung der auf dieser Website
          enthaltenen Informationen entstehen, wird ausgeschlossen, soweit
          dies gesetzlich zulässig ist.
        </p>
        <p className="text-stone-700">
          Bauarbeiten erfordern Fachkenntnisse und erfolgen auf eigene
          Gefahr. Im Zweifel empfehlen wir die Beauftragung eines
          qualifizierten Handwerksbetriebs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">
          Hinweis zu Affiliate-Links
        </h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Diese Website enthält sogenannte Affiliate-Links zu Amazon und
          weiteren Partnershops. Wenn Sie auf einen solchen Link klicken und
          über diesen Link einkaufen, erhalten wir vom jeweiligen Shop eine
          Provision. Für Sie verändert sich der Preis nicht.
        </p>
        <p className="text-stone-700">
          Die Einnahmen aus Partnerprogrammen haben keinen Einfluss auf
          unsere redaktionellen Inhalte oder die Darstellung von
          Materialberechnungen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Haftung für Inhalte</h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene
          Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
          verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter
          jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
          Informationen zu überwachen oder nach Umständen zu forschen, die
          auf eine rechtswidrige Tätigkeit hinweisen.
        </p>
        <p className="text-stone-700">
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
          Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
          Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
          diese Inhalte umgehend entfernen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Haftung für Links</h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Unser Angebot enthält Links zu externen Websites Dritter, auf
          deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
          diese fremden Inhalte auch keine Gewähr übernehmen. Für die
          Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
          oder Betreiber der Seiten verantwortlich.
        </p>
        <p className="text-stone-700">
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
          mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
          zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
          inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Urheberrecht</h2>
        <p className="text-stone-700 leading-relaxed mb-3">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
          diesen Seiten unterliegen dem deutschen Urheberrecht. Die
          Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
          schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        </p>
        <p className="text-stone-700">
          Downloads und Kopien dieser Seite sind nur für den privaten, nicht
          kommerziellen Gebrauch gestattet.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Markenrechte</h2>
        <p className="text-stone-700">
          Alle auf dieser Website genannten Markennamen,
          Produktbezeichnungen und Logos sind Eigentum der jeweiligen
          Hersteller und dienen ausschließlich der Beschreibung und
          Zuordnung der Materialien. hausbau-hero.de ist ein unabhängiges
          Informationsportal und steht in keiner geschäftlichen Verbindung
          zu den genannten Herstellern.
        </p>
      </section>
    </div>
  );
}
