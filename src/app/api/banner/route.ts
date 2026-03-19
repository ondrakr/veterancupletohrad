import { NextResponse } from 'next/server';
import { getBanner } from '@/lib/data';

export async function GET() {
  try {
    const banner = await getBanner();
    return NextResponse.json(banner);
  } catch (error) {
    console.error('Banner error:', error);
    return NextResponse.json(null);
  }
}
