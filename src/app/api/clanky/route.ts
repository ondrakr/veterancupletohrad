import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const id = searchParams.get('id');

  try {
    if (id) {
      const [rows] = await db.query<any[]>(
        'SELECT id, nadpis, foto, obsah, kategorie, datum FROM clanky WHERE id = ?',
        [id]
      );
      if (!rows.length) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(rows[0]);
    }

    const sql = limit
      ? 'SELECT id, nadpis, foto FROM clanky ORDER BY id DESC LIMIT ?'
      : 'SELECT id, nadpis, foto FROM clanky ORDER BY id DESC';
    const params = limit ? [parseInt(limit, 10)] : [];
    const [rows] = await db.query<any[]>(sql, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
