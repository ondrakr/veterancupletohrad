import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rok = searchParams.get('rok'); // '2026' | '2025' | '2024'

  try {
    let sql = 'SELECT id, datum, jmeno, castka FROM seznam_prispeli';
    const params: string[] = [];

    if (rok === '2026') {
      sql += ' WHERE datum > ?';
      params.push('2025-07-01');
    } else if (rok === '2025') {
      sql += ' WHERE datum >= ? AND datum < ?';
      params.push('2024-07-01', '2025-07-01');
    } else if (rok === '2024') {
      sql += ' WHERE datum < ?';
      params.push('2024-07-01');
    }
    sql += ' ORDER BY datum DESC';

    const [rows] = await db.query<any[]>(sql, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
