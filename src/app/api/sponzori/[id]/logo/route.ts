import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const [rows] = await db.query<any[]>(
      'SELECT logo, mime_type FROM sponzori WHERE id = ?',
      [id]
    );
    if (!rows.length || !rows[0].logo) {
      return new NextResponse('Not found', { status: 404 });
    }
    const buffer = rows[0].logo;
    const mime = rows[0].mime_type || 'image/png';
    return new NextResponse(Buffer.from(buffer), {
      headers: {
        'Content-Type': mime,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('DB error:', error);
    return new NextResponse('Error', { status: 500 });
  }
}
