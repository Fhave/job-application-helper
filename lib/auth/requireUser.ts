import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { clearSessionExpiryCookie, isSessionExpired, SESSION_TIMEOUT_COOKIE } from '@/lib/auth/session';

function isVerifiedUser(user: {
  email_confirmed_at?: string | null;
  confirmed_at?: string | null;
}) {
  const confirmedAt = user.email_confirmed_at ?? user.confirmed_at;
  return Boolean(confirmedAt);
}

export async function requireUser() {
  const supabase = await createClient();
  const cookieStore = await cookies();
  const expiresAt = cookieStore.get(SESSION_TIMEOUT_COOKIE)?.value;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) return null;

  if (!isVerifiedUser(user)) {
    await supabase.auth.signOut();
    await clearSessionExpiryCookie();
    return null;
  }

  if (isSessionExpired(expiresAt)) {
    await supabase.auth.signOut();
    await clearSessionExpiryCookie();
    return null;
  }

  return user;
}
