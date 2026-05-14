import db from './db';
import { mapArticleRow } from './article-photo';

export async function getCastka() {
  const [rows] = await db.query<any[]>('SELECT castka FROM vybrana_castka LIMIT 1');
  return Number(rows[0]?.castka ?? 0);
}

export async function getBanner(): Promise<{ popis: string; odkaz: string } | null> {
  try {
    const [rows] = await db.query<any[]>(
      'SELECT popis, odkaz, zobrazit FROM banner_oznameni WHERE id = 1'
    );
    const r = rows[0];
    if (!r?.popis?.trim() || r?.zobrazit === 0) return null;
    return {
      popis: r.popis.trim(),
      odkaz: r.odkaz?.trim() || '',
    };
  } catch {
    return null;
  }
}

export async function getClanky(
  limitOrOptions?: number | { limit?: number; offset?: number }
) {
  let limit: number | undefined;
  let offset: number | undefined;
  if (typeof limitOrOptions === 'number') {
    limit = limitOrOptions;
  } else if (limitOrOptions) {
    limit = limitOrOptions.limit;
    offset = limitOrOptions.offset;
  }
  const sql =
    'SELECT id, nadpis, foto, foto_blob, foto_mime_type, obsah, datum FROM clanky ORDER BY datum DESC, id DESC' +
    (limit != null
      ? offset != null
        ? ' LIMIT ? OFFSET ?'
        : ' LIMIT ?'
      : '');
  const params: number[] = [];
  if (limit != null) params.push(limit);
  if (offset != null) params.push(offset);
  const [rows] = await db.query<any[]>(sql, params);
  return rows.map(mapArticleRow);
}

export async function getClankyCount() {
  const [rows] = await db.query<any[]>('SELECT COUNT(*) as count FROM clanky');
  return Number(rows[0]?.count ?? 0);
}

export async function getClanek(id: number) {
  if (!Number.isFinite(id) || id < 1 || !Number.isInteger(id)) {
    return null;
  }
  const [rows] = await db.query<any[]>(
    'SELECT id, nadpis, foto, foto_blob, foto_mime_type, obsah FROM clanky WHERE id = ?',
    [id]
  );
  return rows[0] ? mapArticleRow(rows[0]) : null;
}

export async function getOsobnosti(filters?: { rok?: number; tym?: string }) {
  let sql = `
    SELECT o.id, o.jmeno, o.sport, o.img_thumbnail, o.popis, ort.rok, ort.tym
    FROM osobnosti o
    INNER JOIN osobnost_rok_tym ort ON ort.osobnost_id = o.id
    WHERE o.zverejnit = "a"
  `;
  const params: (number | string)[] = [];
  if (filters?.rok) {
    sql += ' AND ort.rok = ?';
    params.push(filters.rok);
  }
  if (filters?.tym) {
    sql += ' AND ort.tym = ?';
    params.push(filters.tym);
  }
  sql += ' ORDER BY o.id DESC, ort.rok ASC';
  const [rows] = await db.query<any[]>(sql, params);
  return rows;
}

/** Týmy pro daný ročník (z tabulky rok_tymy) */
export async function getRokTymy(rok?: number) {
  let sql = 'SELECT id, rok, tym_kod, nazev, poradi FROM rok_tymy';
  const params: number[] = [];
  if (rok != null) {
    sql += ' WHERE rok = ?';
    params.push(rok);
  }
  sql += ' ORDER BY rok DESC, poradi ASC, tym_kod ASC';
  const [rows] = await db.query<any[]>(sql, params);
  return rows;
}

export async function getOsobnost(id: number) {
  const [rows] = await db.query<any[]>(
    'SELECT id, jmeno, sport, img, popis FROM osobnosti WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

export async function getSponzori(typ?: 'sponzor' | 'partner') {
  try {
    let sql = 'SELECT id, typ, nazev, odkaz FROM sponzori';
    const params: string[] = [];
    if (typ) {
      sql += ' WHERE typ = ?';
      params.push(typ);
    }
    sql += ' ORDER BY poradi ASC, id ASC';
    const [rows] = await db.query<any[]>(sql, params);
    return rows;
  } catch (err) {
    console.error('getSponzori error:', err);
    return [];
  }
}

/** Vrátí součet vybrané částky pro daný ročník (z seznam_prispeli podle data). Pro 2026 použij getCastka(). */
export async function getCastkaForYear(year: number): Promise<number> {
  if (year === 2026) return getCastka();
  const ranges: Record<number, [string, string]> = {
    2025: ['2024-07-01', '2025-07-01'],
    2024: ['2023-07-01', '2024-07-01'],
    2023: ['2022-07-01', '2023-07-01'],
    2019: ['2018-07-01', '2019-07-01'],
    2018: ['2017-07-01', '2018-07-01'],
  };
  const [start, end] = ranges[year] ?? [null, null];
  if (!start || !end) return 0;
  const [rows] = await db.query<any[]>(
    'SELECT COALESCE(SUM(castka), 0) as total FROM seznam_prispeli WHERE datum >= ? AND datum < ?',
    [start, end]
  );
  return Number(rows[0]?.total ?? 0);
}

export async function getPrispevky(rok?: '2026' | '2025' | '2024') {
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
  return rows;
}
