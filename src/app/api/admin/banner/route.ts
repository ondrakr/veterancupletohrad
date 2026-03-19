import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    let r: { popis?: string; odkaz?: string; zobrazit?: number } | undefined;
    try {
      const [rows] = await db.query<any[]>(
        'SELECT popis, odkaz, COALESCE(zobrazit, 1) as zobrazit FROM banner_oznameni WHERE id = 1'
      );
      r = rows[0];
    } catch {
      try {
        const [rows] = await db.query<any[]>(
          'SELECT popis, odkaz FROM banner_oznameni WHERE id = 1'
        );
        r = rows[0];
        if (r) r.zobrazit = 1;
      } catch {
        r = undefined;
      }
    }
    return NextResponse.json({
      popis: r?.popis ?? '',
      odkaz: r?.odkaz ?? '',
      zobrazit: r?.zobrazit !== 0,
    });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const popis = (body.popis as string)?.trim() || null;
    const odkaz = (body.odkaz as string)?.trim() || null;
    const zobrazit = body.zobrazit === false ? 0 : 1;

    try {
      await db.query(
        'UPDATE banner_oznameni SET popis = ?, odkaz = ?, zobrazit = ? WHERE id = 1',
        [popis, odkaz, zobrazit]
      );
    } catch (colError: unknown) {
      const msg = String(colError instanceof Error ? colError.message : colError);
      if (msg.includes("doesn't exist") || msg.includes('Table')) {
        await db.query(`
          CREATE TABLE IF NOT EXISTS banner_oznameni (
            id INT AUTO_INCREMENT PRIMARY KEY,
            popis VARCHAR(500) DEFAULT NULL,
            odkaz VARCHAR(500) DEFAULT NULL,
            zobrazit TINYINT(1) NOT NULL DEFAULT 1
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci
        `);
        await db.query(
          'INSERT INTO banner_oznameni (id, popis, odkaz, zobrazit) VALUES (1, ?, ?, ?) ON DUPLICATE KEY UPDATE popis = VALUES(popis), odkaz = VALUES(odkaz), zobrazit = VALUES(zobrazit)',
          [popis, odkaz, zobrazit]
        );
      } else if (msg.includes('Unknown column') || msg.includes('zobrazit')) {
        await db.query(
          'ALTER TABLE banner_oznameni ADD COLUMN zobrazit TINYINT(1) NOT NULL DEFAULT 1'
        );
        await db.query(
          'UPDATE banner_oznameni SET popis = ?, odkaz = ?, zobrazit = ? WHERE id = 1',
          [popis, odkaz, zobrazit]
        );
      } else {
        throw colError;
      }
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
