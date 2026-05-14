import { Buffer } from 'node:buffer';
import { normalizeFotoPath } from '@/lib/img';

const DATA_URL_RE = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([A-Za-z0-9+/=]+)$/;

export function decodeArticlePhotoInput(
  value: unknown
): { blob: Buffer | null; mimeType: string | null } {
  if (typeof value !== 'string' || !value.trim()) {
    return { blob: null, mimeType: null };
  }
  const raw = value.trim();
  const m = raw.match(DATA_URL_RE);
  if (!m) return { blob: null, mimeType: null };
  return { blob: Buffer.from(m[2], 'base64'), mimeType: m[1].toLowerCase() };
}

export function getArticlePhotoSrc(row: {
  foto?: unknown;
  foto_blob?: unknown;
  foto_mime_type?: unknown;
}): string | null {
  const blobRaw = row.foto_blob;
  if (blobRaw != null) {
    const blob = Buffer.isBuffer(blobRaw) ? blobRaw : Buffer.from(blobRaw as ArrayBuffer);
    if (blob.length > 0) {
      const mime =
        typeof row.foto_mime_type === 'string' && row.foto_mime_type.trim()
          ? row.foto_mime_type.trim()
          : 'image/jpeg';
      return `data:${mime};base64,${blob.toString('base64')}`;
    }
  }

  if (typeof row.foto === 'string' && row.foto.trim()) {
    return normalizeFotoPath(row.foto);
  }
  return null;
}

export function mapArticleRow(row: any): any {
  const src = getArticlePhotoSrc(row);
  const { foto_blob: _blob, foto_mime_type: _mime, ...rest } = row;
  return {
    ...rest,
    foto: src,
  };
}
