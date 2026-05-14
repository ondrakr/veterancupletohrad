import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';
import { decodeArticlePhotoInput, mapArticleRow } from '@/lib/article-photo';

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await db.query<any[]>(
      'SELECT id, nadpis, foto, foto_blob, foto_mime_type, obsah, kategorie, datum FROM clanky ORDER BY datum DESC, id DESC'
    );
    return NextResponse.json(rows.map(mapArticleRow));
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { nadpis, obsah, foto, kategorie } = body;
    if (!nadpis?.trim()) {
      return NextResponse.json({ error: 'Nadpis je povinný' }, { status: 400 });
    }
    const decoded = decodeArticlePhotoInput(foto);
    const [result] = await db.query<any>(
      'INSERT INTO clanky (nadpis, obsah, foto, foto_blob, foto_mime_type, kategorie) VALUES (?, ?, ?, ?, ?, ?)',
      [
        nadpis.trim(),
        obsah?.trim() || null,
        decoded.blob ? null : foto?.trim() || null,
        decoded.blob,
        decoded.mimeType,
        kategorie?.trim() || null,
      ]
    );
    return NextResponse.json({ id: result.insertId, success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
