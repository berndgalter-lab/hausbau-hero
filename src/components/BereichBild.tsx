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
  wasserfilter: (
    <>
      <path d="M8 26h22M66 26h22" />
      <path d="M30 18h36v16H30z" />
      <path d="M36 34v30a12 12 0 0 0 24 0V34" />
      <path d="M42 44v18M48 44v18M54 44v18" strokeDasharray="2 4" />
      <path d="M48 76v10M42 86h12" />
    </>
  ),
  dachfenster: (
    <>
      <path d="M8 74L48 18l40 56" />
      <path d="M34 40l24-4 10 18-24 4z" />
      <path d="M46 38l5 18" />
      <path d="M40 60h24" strokeDasharray="3 4" />
      <path d="M8 82h80" />
    </>
  ),
  rollladen: (
    <>
      <rect x="16" y="12" width="64" height="14" rx="2" />
      <path d="M20 26v52h56V26" />
      <path d="M20 34h56M20 42h56M20 50h56M20 58h56" />
      <path d="M20 66h56" strokeDasharray="3 4" />
      <path d="M84 30v40" />
      <rect x="80" y="70" width="8" height="12" rx="2" />
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
  "unterputz-duscharmatur": (
    <>
      <rect x="18" y="12" width="60" height="72" rx="2" strokeDasharray="4 4" />
      <rect x="30" y="40" width="36" height="36" rx="4" />
      <circle cx="48" cy="58" r="9" />
      <path d="M48 49v-4" />
      <path d="M48 12v16" />
      <path d="M36 28h24" />
      <path d="M40 32v4M48 32v4M56 32v4" />
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
  rueckspuelfilter: (
    <>
      <path d="M8 22h22M66 22h22" />
      <path d="M30 14h36v16H30z" />
      <path d="M36 30v28a12 12 0 0 0 24 0V30" />
      <path d="M42 40v16M48 40v16M54 40v16" strokeDasharray="2 4" />
      <path d="M48 70v8" />
      <path d="M40 82h16M44 78h8" />
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
  "rollladen-elektrisch-nachruesten": (
    <>
      <rect x="10" y="10" width="58" height="14" rx="2" />
      <path d="M14 24v50h50V24" />
      <path d="M14 36h50M14 48h50M14 60h50" />
      <path d="M68 17h12v29" />
      <rect x="74" y="46" width="12" height="22" rx="2" />
      <path d="M81 51l-3 6h4l-3 6" />
      <path d="M80 68v10" />
      <path d="M76 78h8v6h-8z" />
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

// Je Teileart (/ersatzteile/<teilart>) eine eigene Zeichnung für die Kacheln auf /ersatzteile.
const TEILART_ZEICHNUNG: Record<string, React.ReactNode> = {
  eckventil: (
    <>
      <path d="M14 14v68" />
      <path d="M14 50h16" />
      <circle cx="38" cy="50" r="8" />
      <path d="M38 42V30M28 26h20" />
      <path d="M46 50h10a6 6 0 0 1 6 6v26" />
    </>
  ),
  fuellventil: (
    <>
      <path d="M40 84V32" />
      <path d="M32 84h16" />
      <rect x="32" y="18" width="16" height="14" rx="3" />
      <path d="M48 24h22" />
      <path d="M70 24v18" />
      <rect x="62" y="42" width="16" height="22" rx="5" />
    </>
  ),
  spuelkasten: (
    <>
      <rect x="18" y="14" width="60" height="48" rx="4" />
      <rect x="38" y="24" width="20" height="12" rx="2" />
      <path d="M48 24v12" />
      <path d="M26 50h44" strokeDasharray="2 4" />
      <path d="M48 62v18M40 80h16" />
    </>
  ),
  "wc-sitz-befestigung": (
    <>
      <ellipse cx="48" cy="58" rx="26" ry="24" />
      <ellipse cx="48" cy="60" rx="14" ry="13" />
      <rect x="26" y="14" width="44" height="12" rx="4" />
      <circle cx="34" cy="20" r="2" />
      <circle cx="62" cy="20" r="2" />
    </>
  ),
  perlator: (
    <>
      <rect x="30" y="18" width="36" height="34" rx="5" />
      <path d="M30 30h36" />
      <path d="M38 40h20M38 45h20" />
      <path d="M40 60v8M48 60v16M56 60v8" strokeDasharray="2 4" />
    </>
  ),
  kartusche: (
    <>
      <path d="M44 34V18h8v16" />
      <path d="M40 18h16" />
      <rect x="28" y="34" width="40" height="38" rx="5" />
      <path d="M28 46h40" />
      <path d="M36 72v10M48 72v10M60 72v10" />
    </>
  ),
  siphon: (
    <>
      <path d="M22 14h16" />
      <path d="M30 14v38a18 18 0 0 0 36 0V40h18" />
      <path d="M84 34v12" />
    </>
  ),
  ablaufgarnitur: (
    <>
      <path d="M10 28h76" />
      <path d="M36 28v6h24v-6" />
      <path d="M42 34v44M54 34v44" />
      <path d="M54 54h16V24" />
      <circle cx="70" cy="20" r="4" />
    </>
  ),
  thermostatkartusche: (
    <>
      <path d="M44 20v-6h8v6" />
      <rect x="36" y="20" width="24" height="62" rx="5" />
      <path d="M36 34h24M36 68h24" />
      <path d="M42 46h12M42 52h12M42 58h12" />
    </>
  ),
  brauseschlauch: (
    <>
      <path d="M14 84c14 0 18-12 18-24s8-20 22-20 18-8 18-18" />
      <path d="M62 22l10-10 12 12-10 10z" />
      <path d="M10 80h8v8h-8z" />
    </>
  ),
  duschablauf: (
    <>
      <rect x="18" y="18" width="60" height="60" rx="4" />
      <path d="M30 34h36M30 48h36M30 62h36" />
    </>
  ),
  "ab-und-ueberlaufgarnitur": (
    <>
      <path d="M10 34h76v10a22 22 0 0 1-22 22H32a22 22 0 0 1-22-22z" />
      <circle cx="74" cy="46" r="5" />
      <path d="M74 51v27H36v-12" />
    </>
  ),
  "dachfenster-rollo": (
    <>
      <path d="M18 20l60-8v64l-60 8z" />
      <path d="M18 20l60-8v34l-60 8z" />
      <path d="M18 31l60-8M18 42l60-8" />
    </>
  ),
  "dachfenster-hitzeschutz": (
    <>
      <path d="M18 20l60-8v64l-60 8z" />
      <path d="M26 30l44-6M26 42l44-6M26 54l44-6M26 66l44-6" strokeDasharray="2 4" />
      <circle cx="80" cy="10" r="4" />
    </>
  ),
  "dachfenster-dichtung": (
    <>
      <path d="M18 20l60-8v64l-60 8z" />
      <path d="M26 27l44-6v50l-44 6z" strokeDasharray="3 4" />
    </>
  ),
  "dachfenster-akku": (
    <>
      <rect x="16" y="30" width="56" height="36" rx="5" />
      <path d="M72 42h8v12h-8" />
      <path d="M30 48h12M36 42v12M54 48h10" />
    </>
  ),
  filtereinsatz: (
    <>
      <path d="M40 18h16v8" />
      <rect x="30" y="26" width="36" height="54" rx="5" />
      <path d="M38 34v38M46 34v38M54 34v38" />
    </>
  ),
  regeneriersalz: (
    <>
      <path d="M22 34l8-16h36l8 16v40a6 6 0 0 1-6 6H28a6 6 0 0 1-6-6z" />
      <path d="M22 34h52" />
      <circle cx="40" cy="56" r="7" />
      <circle cx="58" cy="60" r="5" />
    </>
  ),
  gurtwickler: (
    <>
      <rect x="30" y="14" width="36" height="58" rx="5" />
      <circle cx="48" cy="34" r="9" />
      <path d="M44 72v14M52 72v14" />
    </>
  ),
  rollladengurt: (
    <>
      <circle cx="36" cy="36" r="18" />
      <circle cx="36" cy="36" r="6" />
      <path d="M54 36v48" />
      <path d="M62 36v48" />
      <path d="M54 84h8" />
    </>
  ),
  rollladenmotor: (
    <>
      <rect x="10" y="38" width="62" height="20" rx="5" />
      <path d="M72 44h12v8H72" />
      <path d="M36 42l-4 6h6l-4 6" />
      <path d="M84 48h4" />
    </>
  ),
  "rollladen-handsender": (
    <>
      <rect x="32" y="12" width="32" height="72" rx="7" />
      <path d="M42 32l6-6 6 6M42 54l6 6 6-6" />
      <rect x="43" y="39" width="10" height="8" rx="2" />
    </>
  ),
  "rollladen-welle": (
    <>
      <path d="M22 40h56v16H22" />
      <path d="M22 40l-6 3v10l6 3" />
      <path d="M78 40l6 3v10l-6 3" />
      <path d="M40 40v16M58 40v16" strokeDasharray="2 3" />
    </>
  ),
  "rollladen-lamellen": (
    <>
      <path d="M14 22h68v12H14zM14 40h68v12H14zM14 58h68v12H14z" />
      <path d="M22 76h52" strokeDasharray="2 4" />
    </>
  ),
  // Keine Teileart, aber häufiger Teiltyp ohne Foto (O-Ringe, Flachdichtungen)
  dichtung: (
    <>
      <circle cx="48" cy="48" r="30" />
      <circle cx="48" cy="48" r="18" />
      <path d="M30 70l-6 6M66 70l6 6" strokeDasharray="2 4" />
    </>
  ),
  "druckminderer-einsatz": (
    <>
      <rect x="32" y="14" width="32" height="16" rx="3" />
      <path d="M40 30l16 6-16 6 16 6-16 6 16 6" />
      <rect x="34" y="66" width="28" height="14" rx="3" />
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

/** Zeichnung der Teileart, sonst die ihres Bereichs. */
export function TeilartBild({ slug, bereich, className = "h-12 w-12" }: { slug: string; bereich?: string; className?: string }) {
  const inhalt = TEILART_ZEICHNUNG[slug] ?? RATGEBER_ZEICHNUNG[slug] ?? (bereich && ZEICHNUNG[bereich]);
  return inhalt ? <Zeichnung inhalt={inhalt} className={className} /> : null;
}
