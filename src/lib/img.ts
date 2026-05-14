/** Náhodné fotky pro fallback místo loga (novinky, osobnosti) */
const FALLBACK_PHOTOS = [
  '/hero/hero.jpg',
  '/img/janicka-uvodni.webp',
  '/img/janicka_foto.png',
  '/img/klub-uvodni.webp',
  '/img/klub_inhalace.jpg',
  '/img/neratov-uvodni.webp',
  '/img/neratov_fotka.jpg',
  '/img/o-nas-foto1.jpg',
  '/img/o-nas-foto2.jpg',
  '/img/vasik-veteran.jpg',
  '/img/vasik_foto.jpg',
  '/img/viktorka-uvodni.webp',
  '/img/janicka-veteran.png',
  '/img/neratov-veteran.png',
  '/img/rozhovor_stanova.png',
  '/uploads/67040c84186f0.png',
  '/uploads/67040c97daff2.png',
  '/uploads/67040d04ba853.jpg',
  '/uploads/67040d8273bf7.jpg',
  '/uploads/67040d9b4bc67.jpg',
  '/uploads/67040e378c46d.jpg',
  '/uploads/67040e56de7cb.avif',
  '/uploads/67040eda3a5b6.png',
  '/uploads/670411d1d7730.png',
];

export function getRandomFallbackPhoto(): string {
  return FALLBACK_PHOTOS[Math.floor(Math.random() * FALLBACK_PHOTOS.length)];
}

/**
 * Jednotná cesta k souboru pod /public (uploads, migrace z PHP: ../uploads/…).
 * Absolutní URL a protokol-relative (//…) nechá beze změny.
 */
export function normalizeUploadedAssetPath(path: string): string {
  let p = path.trim().replace(/\\/g, '/');
  if (!p) return p;
  if (/^data:image\//i.test(p)) return p;
  if (/^https?:\/\//i.test(p)) return p;
  if (p.startsWith('//')) return p;
  while (p.startsWith('../')) p = p.slice(3);
  if (!p.startsWith('/')) p = `/${p}`;
  return p;
}

/** Normalizuje cestu k úvodní fotce z DB (PHP migrace: ../uploads -> /uploads) */
export function normalizeFotoPath(foto: string | null | undefined): string {
  const raw = typeof foto === 'string' ? foto.trim() : '';
  if (!raw) return getRandomFallbackPhoto();
  return normalizeUploadedAssetPath(raw);
}
