import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { config } from './config';

export async function getAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth')?.value;
  if (!token) return null;

  try {
    const secret = config.auth.jwtSecret;
    const decoded = jwt.verify(token, secret) as { userId: number; username: string };
    return decoded;
  } catch {
    return null;
  }
}
