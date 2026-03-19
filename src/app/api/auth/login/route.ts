import { NextResponse } from 'next/server';
import db from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { config } from '@/lib/config';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Uživatelské jméno a heslo jsou povinné' },
        { status: 400 }
      );
    }

    const [rows] = await db.query<any[]>(
      'SELECT id, username, password FROM users_veteran WHERE username = ?',
      [username]
    );

    if (!rows.length) {
      return NextResponse.json(
        { error: 'Neplatné přihlašovací údaje' },
        { status: 401 }
      );
    }

    const user = rows[0];
    const secret = config.auth.jwtSecret;

    // Podpora MD5 (starý PHP) i bcrypt (nový)
    const isMd5 = /^[a-f0-9]{32}$/i.test(user.password);
    let valid = false;
    if (isMd5) {
      const crypto = await import('crypto');
      const hash = crypto.createHash('md5').update(password).digest('hex');
      valid = hash === user.password;
    } else {
      valid = await bcrypt.compare(password, user.password);
    }

    if (!valid) {
      return NextResponse.json(
        { error: 'Neplatné přihlašovací údaje' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      secret,
      { expiresIn: '7d' }
    );

    const cookieStore = await cookies();
    cookieStore.set('auth', token, {
      httpOnly: true,
      secure: config.auth.isProduction,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dní
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Chyba přihlášení' },
      { status: 500 }
    );
  }
}
