import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export async function POST(request: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file || !file.size) {
      return NextResponse.json({ error: 'Soubor je povinný' }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'Soubor je příliš velký (max 5 MB)' }, { status: 400 });
    }
    const mime = file.type || '';
    if (!ALLOWED_TYPES.includes(mime)) {
      return NextResponse.json({ error: 'Povolené formáty: JPG, PNG, WebP, GIF' }, { status: 400 });
    }

    const ext = mime === 'image/jpeg' ? '.jpg' : mime === 'image/png' ? '.png' : mime === 'image/webp' ? '.webp' : '.gif';
    const name = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}${ext}`;
    const dir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, name);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);

    // Ukladame kompatibilni cestu jako puvodni PHP web: ../uploads/<soubor>
    const dbPath = `../uploads/${name}`;
    return NextResponse.json({ path: dbPath });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Chyba při nahrávání' }, { status: 500 });
  }
}
