import { normalizeUploadedAssetPath } from '@/lib/img';

/** Odstraní &nbsp; z HTML/textu */
export function cleanNbsp(text: string): string {
  return text.replace(/&nbsp;/g, ' ');
}

/**
 * Úpravy obsahu článku pro zobrazení: normalizace src u obrázků, lazy loading.
 * (Quill někdy uloží relativní cesty bez úvodního /.)
 */
export function enhanceArticleHtml(html: string): string {
  const base = cleanNbsp(html);
  return base.replace(/<img\b([^>]*)>/gi, (_full, attrs: string) => {
    const a = attrs.trim();
    const withSrc = a.replace(/\bsrc\s*=\s*(["'])([^"']*)\1/gi, (_, q: string, src: string) => {
      const n = normalizeArticleImageSrc(String(src));
      return `src=${q}${n}${q}`;
    });
    const extra =
      /\bloading\s*=/.test(a) ? '' : ' loading="lazy" decoding="async"';
    return `<img ${withSrc}${extra}>`;
  });
}

/** Stejná logika jako u úvodní fotky – pro vložení z editoru (Quill) a src v obsahu. */
export function normalizeArticleImageSrc(src: string): string {
  const t = src.trim();
  if (!t) return '';
  return normalizeUploadedAssetPath(t);
}
