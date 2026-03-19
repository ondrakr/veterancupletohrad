import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const typ = searchParams.get('typ'); // 'sponzor' | 'partner'

  try {
    let sql = 'SELECT id, typ, nazev, odkaz FROM sponzori';
    const params: string[] = [];
    if (typ) {
      sql += ' WHERE typ = ?';
      params.push(typ);
    }
    sql += ' ORDER BY poradi ASC, id ASC';

    const [rows] = await db.query<any[]>(sql, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
