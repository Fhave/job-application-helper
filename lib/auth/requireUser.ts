import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { clearSessionExpiryCookie, isSessionExpired, SESSION_TIMEOUT_COOKIE } from '@/lib/auth/session';

export async function requireUser() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const expiresAt = cookieStore.get(SESSION_TIMEOUT_COOKIE)?.value;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  if (isSessionExpired(expiresAt)) {
    await supabase.auth.signOut();
    await clearSessionExpiryCookie();
    return null;
  }

  return user;
}
