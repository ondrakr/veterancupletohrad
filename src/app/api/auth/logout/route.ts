import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete('auth');
  const h = await headers();
  const host = h.get('host') || 'localhost:3000';
  const proto = h.get('x-forwarded-proto') || 'http';
  const base = `${proto}://${host}`;
  return NextResponse.redirect(new URL('/admin/login', base));
}
