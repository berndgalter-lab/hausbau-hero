"use client";

import Image from "next/image";
import { useState } from "react";

// Produktbild aus dem Partner-Feed. Läuft über die Bildoptimierung von Next.js:
// Der Browser lädt das Bild von hausbau-hero.de, nicht vom Shop. So geht keine
// IP-Adresse an Dritte, und ein nicht mehr vorhandenes Bild blendet sich aus.
// Erlaubte Hosts: src/lib/bild-hosts.json.
export default function TeilBild({
  url,
  alt,
  shop,
  groesse = 160,
}: {
  url: string | null;
  alt: string;
  shop?: string | null;
  groesse?: number;
}) {
  const [kaputt, setKaputt] = useState(false);
  if (!url || kaputt) return null;
  const klein = groesse < 100;
  return (
    <figure className="shrink-0" style={{ width: groesse }}>
      <div
        className="relative bg-white border border-stone-200 rounded-lg overflow-hidden"
        style={{ width: groesse, height: groesse }}
      >
        <Image
          src={url}
          alt={alt}
          fill
          sizes={`${groesse}px`}
          className="object-contain p-1"
          onError={() => setKaputt(true)}
        />
      </div>
      {!klein && shop && <figcaption className="text-[11px] text-stone-400 mt-1">Bild: {shop}</figcaption>}
    </figure>
  );
}
