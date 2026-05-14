import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import { parsePositiveIntId } from '@/lib/parse-id';
import { decodeArticlePhotoInput, mapArticleRow } from '@/lib/article-photo';

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
      'SELECT id, nadpis, foto, foto_blob, foto_mime_type, obsah, kategorie, datum FROM clanky WHERE id = ?',
      [idNum]
    );
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(mapArticleRow(rows[0]));
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
    const body = await request.json();
    const { nadpis, obsah, foto, kategorie } = body;
    if (!nadpis?.trim()) {
      return NextResponse.json({ error: 'Nadpis je povinný' }, { status: 400 });
    }
    const decoded = decodeArticlePhotoInput(foto);
    await db.query(
      'UPDATE clanky SET nadpis = ?, obsah = ?, foto = ?, foto_blob = ?, foto_mime_type = ?, kategorie = ? WHERE id = ?',
      [
        nadpis.trim(),
        obsah?.trim() || null,
        decoded.blob ? null : foto?.trim() || null,
        decoded.blob,
        decoded.mimeType,
        kategorie?.trim() || null,
        idNum,
      ]
    );
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
    await db.query('DELETE FROM clanky WHERE id = ?', [idNum]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
