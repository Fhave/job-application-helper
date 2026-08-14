import { cookies } from 'next/headers';
import { SESSION_TIMEOUT_COOKIE, SESSION_TIMEOUT_MS } from '@/lib/auth/session-config';

export { SESSION_TIMEOUT_COOKIE, SESSION_TIMEOUT_MS };

export function isSessionExpired(expiresAt?: string | null) {
  if (!expiresAt) return false;

  const expiryTime = Number(expiresAt);
  return Number.isFinite(expiryTime) && Date.now() >= expiryTime;
}

export async function setSessionExpiryCookie() {
  const cookieStore = await cookies();
  const expiryTimestamp = Date.now() + SESSION_TIMEOUT_MS;

  cookieStore.set(SESSION_TIMEOUT_COOKIE, String(expiryTimestamp), {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(SESSION_TIMEOUT_MS / 1000),
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function clearSessionExpiryCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_TIMEOUT_COOKIE);
}
