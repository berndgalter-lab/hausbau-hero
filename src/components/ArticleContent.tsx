import { bereiteArtikelHtmlVor } from "@/lib/affiliate";

// Fließtext der Artikel: Lesebreite, Serifen-Überschriften, Links unterstrichen in Petrol.
// Tabellen ohne Gitter, nur Haarlinien zwischen den Zeilen.
export default function ArticleContent({ html, gross = false }: { html: string; gross?: boolean }) {
  return (
    <article
      className={`prose prose-stone max-w-none ${gross ? "prose-lg" : "sm:prose-lg"}
        prose-headings:font-serif prose-headings:font-semibold prose-headings:text-stone-900 prose-headings:tracking-tight
        prose-h2:text-[1.75rem] prose-h2:leading-tight prose-h2:mt-14 prose-h2:mb-4 prose-h2:scroll-mt-24
        prose-h3:font-sans prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-2
        prose-p:text-stone-700 prose-p:leading-[1.75]
        prose-a:font-medium prose-a:text-accent-700 prose-a:underline prose-a:decoration-accent-300 prose-a:underline-offset-[3px] hover:prose-a:decoration-accent-600
        prose-strong:text-stone-900 prose-strong:font-semibold
        prose-li:text-stone-700 prose-li:my-1.5 prose-ul:my-5 marker:text-accent-600
        prose-table:text-[0.938rem] prose-thead:border-stone-300 prose-th:text-stone-900 prose-th:font-semibold prose-th:py-2.5
        prose-td:py-2.5 prose-tr:border-stone-200
        prose-blockquote:border-l-accent-600 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-stone-700
        prose-img:rounded-xl prose-img:max-w-full`}
      dangerouslySetInnerHTML={{ __html: bereiteArtikelHtmlVor(html) }}
    />
  );
}
