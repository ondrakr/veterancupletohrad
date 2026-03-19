import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rok = searchParams.get('rok');

  try {
    let sql = 'SELECT id, rok, tym_kod, nazev, poradi FROM rok_tymy';
    const params: number[] = [];
    if (rok) {
      sql += ' WHERE rok = ?';
      params.push(parseInt(rok, 10));
    }
    sql += ' ORDER BY rok DESC, poradi ASC, tym_kod ASC';

    const [rows] = await db.query<any[]>(sql, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
