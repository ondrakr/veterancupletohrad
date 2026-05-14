import fs from 'fs';
import path from 'path';

const IMG_EXT = ['.png', '.jpg', '.jpeg', '.jfif', '.webp', '.gif', '.svg'];

/** Vrátí seznam log z dané složky v public (např. sponzori-2025, partneri-2025, sponzori) */
export function getLogosFromFolder(folderName: string): { src: string; alt: string }[] {
  try {
    const dir = path.join(process.cwd(), 'public', folderName);
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);
    const seen = new Set<string>();
    return files
      .filter((raw) => {
        const f = raw.trim();
        const base = path.basename(f);
        // macOS metadata soubory (napr. ._logo.png) a skryte soubory ignorujeme
        if (f.startsWith('.')) return false;
        if (base.startsWith('._')) return false;
        if (f.includes('/._') || f.includes('\\._')) return false;
        if (!IMG_EXT.includes(path.extname(f).toLowerCase())) return false;

        // deduplikace: pokud by se k normalnimu souboru dostal i metadata protějsek
        const dedupeKey = base.replace(/^._/, '').toLowerCase();
        if (seen.has(dedupeKey)) return false;
        seen.add(dedupeKey);
        return true;
      })
      .sort((a, b) => a.localeCompare(b, 'cs'))
      .map((file) => {
        const name = path.basename(file, path.extname(file));
        return {
          src: `/${folderName}/${file}`,
          alt: name.replace(/-/g, ' '),
        };
      });
  } catch {
    return [];
  }
}
