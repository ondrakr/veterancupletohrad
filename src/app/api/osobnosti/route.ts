import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const rok = searchParams.get('rok');
  const tym = searchParams.get('tym');

  try {
    if (id) {
      const [rows] = await db.query<any[]>(
        'SELECT id, jmeno, sport, img, popis, rok, tym FROM osobnosti WHERE id = ?',
        [id]
      );
      if (!rows.length) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(rows[0]);
    }

    let sql = `
      SELECT o.id, o.jmeno, o.sport, o.img_thumbnail, o.popis, ort.rok, ort.tym
      FROM osobnosti o
      INNER JOIN osobnost_rok_tym ort ON ort.osobnost_id = o.id
      WHERE o.zverejnit = "a"
    `;
    const params: (string | number)[] = [];

    if (rok) {
      sql += ' AND ort.rok = ?';
      params.push(parseInt(rok, 10));
    }
    if (tym) {
      sql += ' AND ort.tym = ?';
      params.push(tym);
    }
    sql += ' ORDER BY o.id DESC, ort.rok ASC';

    const [rows] = await db.query<any[]>(sql, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
