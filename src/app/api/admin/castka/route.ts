import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import db from '@/lib/db';

export async function PUT(request: Request) {
  const auth = await getAuth();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { castka } = await request.json();
    await db.query('UPDATE vybrana_castka SET castka = ? WHERE id = 1', [
      Number(castka) || 0,
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
