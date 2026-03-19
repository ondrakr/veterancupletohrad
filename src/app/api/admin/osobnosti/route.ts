import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const [rows] = await db.query<any[]>(
      'SELECT id, jmeno, sport, img, img_thumbnail, popis, rok, roky, tym, zverejnit, osobnost FROM osobnosti ORDER BY id DESC'
    );
    const [ortRows] = await db.query<any[]>(
      'SELECT osobnost_id, rok, tym FROM osobnost_rok_tym'
    );
    const ortByOsobnost = (ortRows as { osobnost_id: number; rok: number; tym: string }[]).reduce(
      (acc, r) => {
        if (!acc[r.osobnost_id]) acc[r.osobnost_id] = [];
        acc[r.osobnost_id].push({ rok: r.rok, tym: r.tym });
        return acc;
      },
      {} as Record<number, { rok: number; tym: string }[]>
    );
    const result = rows.map((o) => ({
      ...o,
      roky_tymy: (ortByOsobnost[o.id] || []).sort((a, b) => a.rok - b.rok),
    }));
    return NextResponse.json(result);
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
    const { jmeno, sport, popis, roky_tymy, img, img_thumbnail, zverejnit, osobnost } = body;
    if (!jmeno?.trim()) {
      return NextResponse.json({ error: 'Jméno je povinné' }, { status: 400 });
    }
    const zverejnitVal = zverejnit === 'n' ? 'n' : 'a';
    const osobnostVal = osobnost === 'a' ? 'a' : 'n';
    const [result] = await db.query<any>(
      'INSERT INTO osobnosti (jmeno, sport, popis, rok, roky, tym, img, img_thumbnail, zverejnit, osobnost) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [jmeno.trim(), sport?.trim() || null, popis?.trim() || null, 25, '25', 'c', img?.trim() || null, img_thumbnail?.trim() || img?.trim() || null, zverejnitVal, osobnostVal]
    );
    const osobnostId = result.insertId;
    const pairs = Array.isArray(roky_tymy)
      ? roky_tymy
          .filter((r: { rok: number; tym: string }) => r?.rok >= 23 && r?.rok <= 26 && r?.tym)
          .map((r: { rok: number; tym: string }) => [osobnostId, r.rok, r.tym])
      : [[osobnostId, 25, 'c']];
    if (pairs.length) {
      const placeholders = pairs.map(() => '(?, ?, ?)').join(', ');
      const flat = pairs.flat();
      await db.query(
        `INSERT INTO osobnost_rok_tym (osobnost_id, rok, tym) VALUES ${placeholders}`,
        flat
      );
    }
    return NextResponse.json({ id: osobnostId, success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
