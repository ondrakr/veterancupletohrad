import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import { parsePositiveIntId } from '@/lib/parse-id';

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const MAX_SIZE = 8 * 1024 * 1024; // 8 MB

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const idNum = parsePositiveIntId(id);
  if (idNum == null) {
    return NextResponse.json({ error: 'Neplatné id' }, { status: 400 });
  }
  try {
    const [rows] = await db.query<any[]>(
      'SELECT id, CAST(typ AS CHAR) AS typ, nazev, odkaz, poradi FROM sponzori WHERE id = ?',
      [idNum]
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
  const idNum = parsePositiveIntId(id);
  if (idNum == null) {
    return NextResponse.json({ error: 'Neplatné id' }, { status: 400 });
  }
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
      if (logoFile.size > MAX_SIZE) {
        return NextResponse.json({ error: 'Logo je příliš velké (max 8 MB)' }, { status: 400 });
      }
      const mimeType = String(logoFile.type || '').toLowerCase();
      if (!ALLOWED_TYPES.includes(mimeType)) {
        return NextResponse.json({ error: 'Neplatný formát obrázku. Použijte JPG, PNG nebo WebP.' }, { status: 400 });
      }
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      await db.query(
        'UPDATE sponzori SET typ = ?, nazev = ?, odkaz = ?, logo = ?, mime_type = ? WHERE id = ?',
        [typVal, nazev, odkaz, buffer, mimeType, idNum]
      );
    } else {
      await db.query(
        'UPDATE sponzori SET typ = ?, nazev = ?, odkaz = ? WHERE id = ?',
        [typVal, nazev, odkaz, idNum]
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
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
  const idNum = parsePositiveIntId(id);
  if (idNum == null) {
    return NextResponse.json({ error: 'Neplatné id' }, { status: 400 });
  }
  try {
    await db.query('DELETE FROM sponzori WHERE id = ?', [idNum]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
