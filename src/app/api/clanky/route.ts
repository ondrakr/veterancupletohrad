import { NextResponse } from 'next/server';
import db from '@/lib/db';
import { parsePositiveIntId } from '@/lib/parse-id';
import { mapArticleRow } from '@/lib/article-photo';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const id = searchParams.get('id');

  try {
    if (id != null && id !== '') {
      const idNum = parsePositiveIntId(id);
      if (idNum == null) {
        return NextResponse.json({ error: 'Neplatné id' }, { status: 400 });
      }
      const [rows] = await db.query<any[]>(
        'SELECT id, nadpis, foto, foto_blob, foto_mime_type, obsah, kategorie, datum FROM clanky WHERE id = ?',
        [idNum]
      );
      if (!rows.length) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(mapArticleRow(rows[0]));
    }

    const sql = limit
      ? 'SELECT id, nadpis, foto, foto_blob, foto_mime_type FROM clanky ORDER BY id DESC LIMIT ?'
      : 'SELECT id, nadpis, foto, foto_blob, foto_mime_type FROM clanky ORDER BY id DESC';
    let params: number[] = [];
    if (limit != null && limit !== '') {
      const lim = parsePositiveIntId(limit);
      if (lim == null || lim > 500) {
        return NextResponse.json({ error: 'Neplatný limit' }, { status: 400 });
      }
      params = [lim];
    }
    const [rows] = await db.query<any[]>(sql, params);
    return NextResponse.json(rows.map(mapArticleRow));
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
