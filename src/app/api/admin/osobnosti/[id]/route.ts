import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  try {
    const [rows] = await db.query<any[]>(
      'SELECT id, jmeno, sport, img, img_thumbnail, popis, rok, roky, tym, zverejnit, osobnost FROM osobnosti WHERE id = ?',
      [id]
    );
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const [ortRows] = await db.query<any[]>(
      'SELECT rok, tym FROM osobnost_rok_tym WHERE osobnost_id = ? ORDER BY rok',
      [id]
    );
    return NextResponse.json({
      ...rows[0],
      roky_tymy: (ortRows || []).map((r) => ({ rok: r.rok, tym: r.tym })),
    });
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
  try {
    const body = await request.json();
    const { jmeno, sport, popis, roky_tymy, img, img_thumbnail, zverejnit, osobnost } = body;
    if (!jmeno?.trim()) {
      return NextResponse.json({ error: 'Jméno je povinné' }, { status: 400 });
    }
    const zverejnitVal = zverejnit === 'n' ? 'n' : 'a';
    const osobnostVal = osobnost === 'a' ? 'a' : 'n';
    await db.query(
      'UPDATE osobnosti SET jmeno = ?, sport = ?, popis = ?, img = ?, img_thumbnail = ?, zverejnit = ?, osobnost = ? WHERE id = ?',
      [jmeno.trim(), sport?.trim() || null, popis?.trim() || null, img?.trim() || null, img_thumbnail?.trim() || img?.trim() || null, zverejnitVal, osobnostVal, id]
    );
    await db.query('DELETE FROM osobnost_rok_tym WHERE osobnost_id = ?', [id]);
    const pairs = Array.isArray(roky_tymy)
      ? roky_tymy
          .filter((r: { rok: number; tym: string }) => r?.rok >= 23 && r?.rok <= 26 && r?.tym)
          .map((r: { rok: number; tym: string }) => [id, r.rok, r.tym])
      : [[id, 25, 'c']];
    if (pairs.length) {
      const placeholders = pairs.map(() => '(?, ?, ?)').join(', ');
      const flat = pairs.flat();
      await db.query(
        `INSERT INTO osobnost_rok_tym (osobnost_id, rok, tym) VALUES ${placeholders}`,
        flat
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
  try {
    await db.query('DELETE FROM osobnosti WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
