'use client';

import { useState, useEffect, useTransition } from 'react';
import { FiArrowRight, FiLoader } from 'react-icons/fi';
import { createClient } from '@/lib/supabase/client';
import AuthBody from './AuthBody';
import PasswordField from './PasswordField';
import ErrorBanner from './ErrorBanner';
import { updatePasswordAction } from '@/actions/auth';

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isVerifyingSession, setIsVerifyingSession] = useState(true);
  const [isPending, startTransition] = useTransition();

  const supabase = createClient();

  useEffect(() => {
    const initializeRecoverySession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session) {
          setIsVerifyingSession(false);
          return;
        }
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
          const params = new URLSearchParams(hash.replace('#', '?'));
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');

          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (!sessionError) {
              setIsVerifyingSession(false);
              return;
            }
          }
        }

        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'PASSWORD_RECOVERY' || session) {
            setIsVerifyingSession(false);
          }
        });

        const timeout = setTimeout(() => {
          setIsVerifyingSession((prev) => {
            if (prev) {
              setError('Recovery session expired or invalid. Please request a new reset link.');
            }
            return false;
          });
        }, 3000);

        return () => {
          authListener.subscription.unsubscribe();
          clearTimeout(timeout);
        };
      } catch (err) {
        setError('Failed to establish recovery session. Please request a new link.');
        setIsVerifyingSession(false);
      }
    };

    initializeRecoverySession();
  }, [supabase]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    if (!password || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }

    if (password !== confirmPassword) {
      setFieldErrors({ confirmPassword: ['Passwords do not match.'] });
      return;
    }

    const data = new FormData();
    data.append('password', password);
    data.append('confirmPassword', confirmPassword);

    startTransition(async () => {
      const result = await updatePasswordAction(data);
      if (result?.error) {
        setError(result.error);
        if ('fieldErrors' in result && result.fieldErrors) {
          setFieldErrors(result.fieldErrors as Record<string, string[]>);
        }
      }
    });
  };

  if (isVerifyingSession) {
    return (
      <AuthBody title="Verifying reset link" subtitle="Establishing secure session...">
        <div className="flex flex-col items-center justify-center py-8 space-y-3">
          <FiLoader className="w-6 h-6 text-sky-500 animate-spin" />
          <p className="text-xs text-slate-500">Please wait while we verify your recovery link.</p>
        </div>
      </AuthBody>
    );
  }

  return (
    <AuthBody title="Set a new password" subtitle="Choose something you haven't used before">
      {error && <ErrorBanner>{error}</ErrorBanner>}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <PasswordField
          label="New Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="************"
          error={fieldErrors.password?.[0]}
        />
        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="************"
          error={fieldErrors.confirmPassword?.[0]}
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 group mt-2 shadow-xs"
        >
          <span>{isPending ? 'Updating...' : 'Update password'}</span>
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>
    </AuthBody>
  );
}
