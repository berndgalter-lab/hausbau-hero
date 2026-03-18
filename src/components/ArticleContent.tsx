"use client";

import { useEffect, useRef } from "react";

export default function ArticleContent({ html }: { html: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.querySelectorAll<HTMLAnchorElement>('a[href^="http"]').forEach((link) => {
      link.setAttribute("rel", "nofollow noopener noreferrer");
      link.setAttribute("target", "_blank");
    });
  }, [html]);

  return (
    <article
      ref={ref}
      className="prose prose-stone prose-lg max-w-none
        prose-headings:text-stone-900 prose-headings:font-bold
        prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
        prose-p:text-stone-700 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-stone-900
        prose-ul:my-4 prose-li:text-stone-700
        prose-table:border-collapse prose-th:bg-stone-100 prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-stone-200
        prose-img:rounded-lg prose-img:max-w-full"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
