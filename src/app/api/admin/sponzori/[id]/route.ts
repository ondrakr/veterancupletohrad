import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import { processSponsorLogo } from '@/lib/logoResize';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const [rows] = await db.query<any[]>(
      'SELECT id, typ, nazev, odkaz, poradi FROM sponzori WHERE id = ?',
      [id]
    );
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const formData = await request.formData();
    const typ = (formData.get('typ') as string) || 'sponzor';
    const nazev = (formData.get('nazev') as string)?.trim();
    const odkaz = (formData.get('odkaz') as string)?.trim() || null;
    const logoFile = formData.get('logo') as File | null;

    if (!nazev) {
      return NextResponse.json({ error: 'Název je povinný' }, { status: 400 });
    }

    const typVal = typ === 'partner' ? 'partner' : 'sponzor';

    if (logoFile && logoFile.size > 0) {
      const inputBuffer = Buffer.from(await logoFile.arrayBuffer());
      const inputMimeType = logoFile.type || 'image/png';
      const { buffer, mimeType } = await processSponsorLogo(inputBuffer, inputMimeType);
      await db.query(
        'UPDATE sponzori SET typ = ?, nazev = ?, odkaz = ?, logo = ?, mime_type = ? WHERE id = ?',
        [typVal, nazev, odkaz, buffer, mimeType, id]
      );
    } else {
      await db.query(
        'UPDATE sponzori SET typ = ?, nazev = ?, odkaz = ? WHERE id = ?',
        [typVal, nazev, odkaz, id]
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    const msg = error instanceof Error ? error.message : '';
    if (msg.includes('Unsupported') || msg.includes('Input')) {
      return NextResponse.json({ error: 'Neplatný formát obrázku. Použijte JPG, PNG nebo WebP.' }, { status: 400 });
    }
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    await db.query('DELETE FROM sponzori WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
