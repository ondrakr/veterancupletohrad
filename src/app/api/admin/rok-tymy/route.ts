import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await db.query<any[]>(
      'SELECT id, rok, tym_kod, nazev, poradi FROM rok_tymy ORDER BY rok DESC, poradi ASC, tym_kod ASC'
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
    const body = await request.json();
    const { rok, tym_kod, nazev, poradi } = body;
    if (rok == null || !tym_kod?.trim() || !nazev?.trim()) {
      return NextResponse.json({ error: 'Rok, kód týmu a název jsou povinné' }, { status: 400 });
    }
    const poradiVal = poradi != null ? Number(poradi) : 0;
    await db.query(
      'INSERT INTO rok_tymy (rok, tym_kod, nazev, poradi) VALUES (?, ?, ?, ?)',
      [Number(rok), tym_kod.trim(), nazev.trim(), poradiVal]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
