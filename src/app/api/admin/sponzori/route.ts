import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import { processSponsorLogo } from '@/lib/logoResize';

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await db.query<any[]>(
      'SELECT id, typ, nazev, odkaz, poradi FROM sponzori ORDER BY poradi ASC, id ASC'
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const typ = (formData.get('typ') as string) || 'sponzor';
    const nazev = (formData.get('nazev') as string)?.trim();
    const odkaz = (formData.get('odkaz') as string)?.trim() || null;
    const logoFile = formData.get('logo') as File | null;

    if (!nazev) {
      return NextResponse.json({ error: 'Název je povinný' }, { status: 400 });
    }
    if (!logoFile || !logoFile.size) {
      return NextResponse.json({ error: 'Logo je povinné' }, { status: 400 });
    }

    const inputBuffer = Buffer.from(await logoFile.arrayBuffer());
    const inputMimeType = logoFile.type || 'image/png';
    const { buffer, mimeType } = await processSponsorLogo(inputBuffer, inputMimeType);
    const typVal = typ === 'partner' ? 'partner' : 'sponzor';

    const [result] = await db.query<any>(
      'INSERT INTO sponzori (typ, nazev, odkaz, logo, mime_type, poradi) VALUES (?, ?, ?, ?, ?, 0)',
      [typVal, nazev, odkaz, buffer, mimeType]
    );
    return NextResponse.json({ id: result.insertId, success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg.includes('Unsupported') || msg.includes('Input')) {
      return NextResponse.json({ error: 'Neplatný formát obrázku. Použijte JPG, PNG nebo WebP.' }, { status: 400 });
    }
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
