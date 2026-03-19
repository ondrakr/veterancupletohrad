import sharp from 'sharp';

/**
 * Cílové rozměry pro loga sponzorů a partnerů.
 * Výška plátna v adminu: 135px. Šířka podle poměru stran.
 * Pro retina 2x: max 560×270 px. Zachováváme poměr stran.
 */
const MAX_WIDTH = 560;
const MAX_HEIGHT = 270;

export type LogoProcessResult = {
  buffer: Buffer;
  mimeType: string;
};

/**
 * Zpracuje nahrané logo – zmenší na cílové rozměry a převede na PNG.
 * Zachovává průhlednost, zachovává poměr stran.
 */
export async function processSponsorLogo(
  inputBuffer: Buffer,
  _inputMimeType: string
): Promise<LogoProcessResult> {
  const image = sharp(inputBuffer);

  const { width, height } = await image.metadata();
  if (!width || !height) {
    throw new Error('Nelze načíst rozměry obrázku');
  }

  const resized = await image
    .resize(MAX_WIDTH, MAX_HEIGHT, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .png({ compressionLevel: 6 })
    .toBuffer();

  return { buffer: resized, mimeType: 'image/png' };
}
