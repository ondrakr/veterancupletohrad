import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const body = await request.json();
    const { rok, tym_kod, nazev, poradi } = body;
    if (rok == null || !tym_kod?.trim() || !nazev?.trim()) {
      return NextResponse.json({ error: 'Rok, kód týmu a název jsou povinné' }, { status: 400 });
    }
    const poradiVal = poradi != null ? Number(poradi) : 0;
    await db.query(
      'UPDATE rok_tymy SET rok = ?, tym_kod = ?, nazev = ?, poradi = ? WHERE id = ?',
      [Number(rok), tym_kod.trim(), nazev.trim(), poradiVal, id]
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
  try {
    await db.query('DELETE FROM rok_tymy WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
