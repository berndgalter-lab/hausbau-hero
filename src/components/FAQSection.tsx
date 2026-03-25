"use client";

interface FAQ {
  q: string;
  a: string;
}

export default function FAQSection({ faqs, rechnerName }: { faqs: FAQ[]; rechnerName: string }) {
  if (!faqs || faqs.length === 0) return null;

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="mt-8 mb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <h2 className="text-lg font-bold mb-4">Häufige Fragen zum {rechnerName}</h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="group bg-white border border-stone-200 rounded-lg">
            <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-medium text-stone-800 hover:text-amber-700">
              {f.q}
              <span className="ml-2 text-stone-400 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <p className="px-4 pb-4 text-sm text-stone-600 leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
