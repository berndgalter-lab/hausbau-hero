import { AFFILIATE_REL } from "@/lib/affiliate";
import {
  SICHERHEIT_LABEL,
  hostVon,
  teilKauflink,
  type Sicherheit,
  type Teil,
  type Widerspruch,
} from "@/lib/ersatzteile";

export function Brotkrumen({ teile }: { teile: { name: string; href?: string }[] }) {
  return (
    <nav className="text-sm text-stone-500 mb-4" aria-label="Brotkrumen">
      {teile.map((t, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2">›</span>}
          {t.href ? (
            <a href={t.href} className="hover:text-stone-700">{t.name}</a>
          ) : (
            <span className="text-stone-900">{t.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function brotkrumenLd(teile: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: teile.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `https://hausbau-hero.de${t.href}`,
    })),
  };
}

export function JsonLd({ daten }: { daten: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }} />;
}

export function SicherheitBadge({ sicherheit }: { sicherheit: Sicherheit }) {
  const s = SICHERHEIT_LABEL[sicherheit];
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${s.klasse}`} title={s.erklaerung}>
      {s.text}
    </span>
  );
}

export function KaufButton({ teil, markeName, klein = false }: { teil: Teil; markeName: string; klein?: boolean }) {
  const link = teilKauflink(teil, markeName);
  if (!link) return null;
  return (
    <a
      href={link}
      target="_blank"
      rel={AFFILIATE_REL}
      data-platzierung="teil"
      data-kennung={teil.oem_nummer ?? teil.slug}
      className={
        klein
          ? "inline-block bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-amber-700 whitespace-nowrap"
          : "inline-block bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-700"
      }
    >
      {teil.amazon_asin || teil.affiliate_url ? "Bei Amazon ansehen →" : "Bei Amazon suchen →"}
    </a>
  );
}

export function Quellen({ urls, titel = "Quellen" }: { urls: (string | null | undefined)[]; titel?: string }) {
  const liste = Array.from(new Set(urls.filter((u): u is string => !!u)));
  if (liste.length === 0) return null;
  return (
    <section className="mt-10 text-sm text-stone-600">
      <h2 className="text-base font-semibold text-stone-800 mb-2">{titel}</h2>
      <ul className="list-disc pl-5 space-y-1">
        {liste.map((u) => (
          <li key={u}>
            <a href={u} target="_blank" rel="nofollow noopener noreferrer" className="text-amber-700 hover:underline break-all">
              {hostVon(u)}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-stone-500">
        Zuordnungen werden aus Herstellerunterlagen und Händlerangaben zusammengetragen, nicht selbst getestet. Prüfe
        vor dem Kauf die Nummer auf dem alten Teil.
      </p>
    </section>
  );
}

export function Widersprueche({ liste }: { liste: Widerspruch[] }) {
  if (liste.length === 0) return null;
  return (
    <section className="mt-10 p-5 bg-amber-50 border border-amber-200 rounded-xl">
      <h2 className="text-lg font-bold mb-1">Achtung: widersprüchliche Angaben</h2>
      <p className="text-sm text-stone-600 mb-4">
        Hier nennen Hersteller oder Händler unterschiedliche Zuordnungen. Wir zeigen beide, statt eine zu raten.
      </p>
      <ul className="space-y-4 text-sm">
        {liste.map((w) => (
          <li key={w.id}>
            <div className="font-semibold text-stone-800">{w.thema}</div>
            <div className="mt-1">
              A: {w.aussage_a}
              {w.quelle_a && (
                <a href={w.quelle_a} target="_blank" rel="nofollow noopener noreferrer" className="ml-1 text-amber-700 hover:underline">
                  ({hostVon(w.quelle_a)})
                </a>
              )}
            </div>
            <div>
              B: {w.aussage_b}
              {w.quelle_b && (
                <a href={w.quelle_b} target="_blank" rel="nofollow noopener noreferrer" className="ml-1 text-amber-700 hover:underline">
                  ({hostVon(w.quelle_b)})
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function NummerPruefen() {
  return (
    <div className="p-4 bg-stone-100 border border-stone-200 rounded-lg text-sm text-stone-700">
      <strong>Vor dem Bestellen:</strong> Baue das alte Teil aus und vergleiche Nummer, Durchmesser bzw. Gewinde.
      Viele Nachbauten sehen gleich aus, passen aber nicht.
    </div>
  );
}
