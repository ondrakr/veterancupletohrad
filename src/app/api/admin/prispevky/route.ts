import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';

export async function POST(request: Request) {
  const auth = await getAuth();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { datum, jmeno, castka } = await request.json();
    if (!datum || !jmeno || castka == null) {
      return NextResponse.json(
        { error: 'Datum, jméno a částka jsou povinné' },
        { status: 400 }
      );
    }
    await db.query(
      'INSERT INTO seznam_prispeli (datum, jmeno, castka) VALUES (?, ?, ?)',
      [datum, jmeno, Number(castka) || 0]
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
