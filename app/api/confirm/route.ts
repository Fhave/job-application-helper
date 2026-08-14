import { createClient } from '@/lib/supabase/server';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin, hash } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/auth';
  const tokenHash = hash.startsWith('#') ? hash.slice(1) : hash;
  const params = new URLSearchParams(tokenHash);
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');

  if (code || (accessToken && refreshToken)) {
    const supabase = await createClient();

    const { error } = code
      ? await supabase.auth.exchangeCodeForSession(code)
      : await supabase.auth.setSession({ access_token: accessToken!, refresh_token: refreshToken! });

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth?error=invalid_link`);
}
