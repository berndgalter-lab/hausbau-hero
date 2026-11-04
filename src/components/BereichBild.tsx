// Strichzeichnung je Bereich und je Ratgeber, wie die Illustrationen bei womo-teile: eine Linienstärke,
// eine Farbe, kein Foto. Fotos aus den Partner-Feeds stehen nur direkt beim Angebot des Shops, nie als
// Teaser vor eigenen Seiten (Bildrechte laut Advertiser-Bedingungen bei Awin).
import { bereichFuerRatgeber } from "@/lib/bereiche";

const ZEICHNUNG: Record<string, React.ReactNode> = {
  waschtisch: (
    <>
      <path d="M14 62h68l-6 14H20z" />
      <path d="M44 62V36a8 8 0 0 1 8-8h10a6 6 0 0 1 6 6v4" />
      <path d="M68 38h-4" />
      <path d="M44 44h-10" />
      <path d="M66 44v6" strokeDasharray="2 4" />
      <path d="M48 76v10M44 86h8" />
    </>
  ),
  "dusche-badewanne": (
    <>
      <path d="M12 58h72v8a12 12 0 0 1-12 12H24a12 12 0 0 1-12-12z" />
      <path d="M24 78l-4 8M72 78l4 8" />
      <path d="M22 58V20a8 8 0 0 1 16 0v4" />
      <path d="M30 26h16l-3 6H33z" />
      <path d="M34 36v4M38 38v6M42 36v4" strokeDasharray="2 3" />
      <circle cx="66" cy="44" r="6" />
      <path d="M66 38v-4" />
    </>
  ),
  "wc-spuelkasten": (
    <>
      <rect x="20" y="12" width="56" height="30" rx="3" />
      <rect x="38" y="20" width="20" height="12" rx="2" />
      <path d="M48 20v12" />
      <path d="M24 50h48a4 4 0 0 1 0 8H24a4 4 0 0 1 0-8z" />
      <path d="M28 58c2 14 10 20 20 20h6l2 8H38" />
      <path d="M68 58c0 10-4 16-10 19" />
    </>
  ),
  kueche: (
    <>
      <path d="M10 56h76" />
      <path d="M22 56v14a6 6 0 0 0 6 6h40a6 6 0 0 0 6-6V56" />
      <circle cx="48" cy="70" r="3" />
      <path d="M40 56V30a14 14 0 0 1 28 0v6" />
      <path d="M64 36h8l-2 5h-4z" />
      <path d="M40 42h-8v4" />
      <path d="M48 76v10M40 86h16" />
    </>
  ),
  wasseranschluss: (
    <>
      <path d="M14 14v68" />
      <path d="M14 60h18" />
      <circle cx="40" cy="60" r="8" />
      <path d="M40 52V40M32 36h16" />
      <path d="M48 60h8a6 6 0 0 0 6-6V20" />
      <path d="M56 14h12" />
      <path d="M62 14v6" />
    </>
  ),
  hebeanlage: (
    <>
      <path d="M8 34h80" strokeDasharray="4 4" />
      <rect x="22" y="50" width="40" height="30" rx="4" />
      <path d="M30 50v-6h24v6" />
      <path d="M62 62h12V18H86" />
      <path d="M6 66h16" />
      <path d="M32 64l6 6 8-12" />
    </>
  ),
};

// Waschtischarmatur mit Hebel, Grundform für die Armaturen-Ratgeber.
const ARMATUR = (
  <>
    <path d="M30 82h36" />
    <path d="M38 82V46a12 12 0 0 1 12-12h20a6 6 0 0 1 6 6v6" />
    <path d="M72 46h8" />
    <path d="M50 34V22h18" />
    <path d="M76 54v6M76 66v6" strokeDasharray="2 4" />
  </>
);

const RATGEBER_ZEICHNUNG: Record<string, React.ReactNode> = {
  "waschtischarmatur-ratgeber": ARMATUR,
  "waschtischarmatur-mit-brause": (
    <>
      <path d="M40 82h32" />
      <path d="M48 82V46a12 12 0 0 1 12-12h14a6 6 0 0 1 6 6v6" />
      <path d="M60 34V22h14" />
      <rect x="14" y="30" width="12" height="26" rx="6" />
      <path d="M20 56c0 16 10 26 28 26" />
      <path d="M20 22v4M14 24l2 3M26 24l-2 3" />
    </>
  ),
  "niederdruckarmatur-untertischspeicher": (
    <>
      <path d="M10 34h76" />
      <path d="M40 34V18a6 6 0 0 1 6-6h12a4 4 0 0 1 4 4v4" />
      <path d="M44 34v16M54 34v16" />
      <rect x="30" y="50" width="36" height="34" rx="4" />
      <path d="M40 64h16M40 72h10" />
    </>
  ),
  "badewannenarmatur-ratgeber": (
    <>
      <path d="M14 20h68" />
      <path d="M30 20v8M66 20v8" />
      <rect x="20" y="28" width="56" height="14" rx="7" />
      <circle cx="26" cy="35" r="3" />
      <path d="M48 42v10h-10" />
      <path d="M76 36c10 2 12 16 4 28s-22 14-30 20" />
      <path d="M42 80l10 8" />
    </>
  ),
  "badewannenarmatur-unterputz": (
    <>
      <rect x="18" y="12" width="60" height="72" rx="2" strokeDasharray="4 4" />
      <rect x="30" y="22" width="36" height="36" rx="4" />
      <circle cx="48" cy="40" r="9" />
      <path d="M48 31v-4" />
      <path d="M38 70h18v6h-6" />
    </>
  ),
  duschthermostat: (
    <>
      <path d="M14 30h68" />
      <path d="M28 30v10M68 30v10" />
      <rect x="14" y="40" width="68" height="16" rx="8" />
      <circle cx="22" cy="48" r="10" />
      <circle cx="74" cy="48" r="10" />
      <path d="M38 48h20" strokeDasharray="2 4" />
      <path d="M48 56v14" />
      <path d="M42 70h12" />
    </>
  ),
  duschsystem: (
    <>
      <path d="M28 86V24a10 10 0 0 1 10-10h18" />
      <path d="M52 14h30l-3 6H55z" />
      <path d="M60 26v6M68 28v8M76 26v6" strokeDasharray="2 4" />
      <rect x="16" y="58" width="24" height="10" rx="5" />
    </>
  ),
  "komplettdusche-ratgeber": (
    <>
      <path d="M12 78h72v6H12z" />
      <path d="M16 78V12h64v66" />
      <path d="M48 12v66" />
      <path d="M44 40v12" />
      <path d="M24 22h12l-2 4h-8z" />
      <path d="M28 30v4M32 32v4" strokeDasharray="2 3" />
    </>
  ),
  "geberit-sigma-drueckerplatte": (
    <>
      <rect x="22" y="16" width="52" height="64" rx="4" />
      <rect x="30" y="28" width="14" height="40" rx="3" />
      <rect x="48" y="28" width="18" height="40" rx="3" />
    </>
  ),
  "tece-vs-geberit": (
    <>
      <rect x="8" y="22" width="36" height="52" rx="4" />
      <rect x="15" y="32" width="10" height="32" rx="2" />
      <rect x="28" y="32" width="10" height="32" rx="2" />
      <rect x="52" y="22" width="36" height="52" rx="4" />
      <circle cx="70" cy="40" r="8" />
      <circle cx="70" cy="60" r="5" />
    </>
  ),
  "vorwandelement-wc": (
    <>
      <path d="M26 86V12h44v74" />
      <path d="M26 44h44M26 66h44" />
      <path d="M18 86h16M62 86h16" />
      <rect x="34" y="18" width="28" height="20" rx="2" />
      <circle cx="48" cy="56" r="5" />
      <path d="M40 76h16" />
    </>
  ),
  "vorwandelement-wc-hoehe": (
    <>
      <path d="M18 86V12h40v74" />
      <path d="M18 44h40M18 66h40" />
      <path d="M12 86h16M48 86h16" />
      <rect x="25" y="18" width="26" height="20" rx="2" />
      <path d="M80 14v72M74 20l6-6 6 6M74 80l6 6 6-6" />
    </>
  ),
  druckminderer: (
    <>
      <path d="M8 62h22M66 62h22" />
      <path d="M30 52h36v20H30z" />
      <path d="M38 52V36h20v16" />
      <path d="M48 36v-8M42 28h12" />
      <circle cx="78" cy="34" r="9" />
      <path d="M78 34l4-4" />
      <path d="M78 43v19" />
    </>
  ),
  kleinhebeanlage: (
    <>
      <path d="M10 52h36c0 14-8 22-18 22h-4l2 10H14" />
      <path d="M40 60c-2 8-6 12-10 14" />
      <rect x="54" y="54" width="32" height="28" rx="4" />
      <path d="M46 64h8" />
      <path d="M74 54V14h12" />
      <path d="M62 66l5 5 7-10" />
    </>
  ),
  "hebeanlage-kosten": (
    <>
      <rect x="14" y="52" width="40" height="30" rx="4" />
      <path d="M22 52v-6h24v6" />
      <path d="M44 46V22" />
      <circle cx="68" cy="34" r="16" />
      <path d="M74 26a9 9 0 1 0 0 16" />
      <path d="M60 32h10M60 37h10" />
    </>
  ),
};

function Zeichnung({ inhalt, className }: { inhalt: React.ReactNode; className: string }) {
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {inhalt}
    </svg>
  );
}

export default function BereichBild({ slug, className = "h-16 w-16" }: { slug: string; className?: string }) {
  const inhalt = ZEICHNUNG[slug];
  return inhalt ? <Zeichnung inhalt={inhalt} className={className} /> : null;
}

/** Zeichnung zum Ratgeber, sonst die seines Bereichs, sonst die Armatur. */
export function RatgeberBild({ slug, className = "h-10 w-10" }: { slug: string; className?: string }) {
  const bereich = bereichFuerRatgeber(slug);
  const inhalt = RATGEBER_ZEICHNUNG[slug] ?? (bereich && ZEICHNUNG[bereich.slug]) ?? ARMATUR;
  return <Zeichnung inhalt={inhalt} className={className} />;
}
