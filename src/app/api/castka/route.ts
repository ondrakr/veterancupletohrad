import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.query<any[]>(
      'SELECT castka FROM vybrana_castka LIMIT 1'
    );
    const castka = rows[0]?.castka ?? 0;
    return NextResponse.json({ castka: Number(castka) });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
