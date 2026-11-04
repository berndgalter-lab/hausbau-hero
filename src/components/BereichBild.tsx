// Strichzeichnung je Bereich, wie die Illustrationen bei womo-teile: eine Linienstärke, eine Farbe,
// kein Foto. Fotos zeigen nur die Ratgeber und Teile, dort stammen sie aus den Partner-Feeds.

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

export default function BereichBild({ slug, className = "h-16 w-16" }: { slug: string; className?: string }) {
  const inhalt = ZEICHNUNG[slug];
  if (!inhalt) return null;
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
