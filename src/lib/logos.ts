import fs from 'fs';
import path from 'path';

const IMG_EXT = ['.png', '.jpg', '.jpeg', '.jfif', '.webp', '.gif', '.svg'];

/** Vrátí seznam log z dané složky v public (např. sponzori-2025, partneri-2025, sponzori) */
export function getLogosFromFolder(folderName: string): { src: string; alt: string }[] {
  try {
    const dir = path.join(process.cwd(), 'public', folderName);
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);
    return files
      .filter((f) => IMG_EXT.includes(path.extname(f).toLowerCase()))
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
