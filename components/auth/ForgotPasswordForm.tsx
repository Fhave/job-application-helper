'use client';

import { useState, useTransition } from 'react';
import { FiMail, FiArrowRight } from 'react-icons/fi';
import AuthBody from './AuthBody';
import FormField from './FormField';
import ErrorBanner from './ErrorBanner';
import { requestPasswordResetAction } from '@/actions/auth';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const data = new FormData();
    data.append('email', email);

    startTransition(async () => {
      const result = await requestPasswordResetAction(data);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setSent(true);
    });
  };

  if (sent) {
    return (
      <AuthBody title="Check your email" subtitle="Reset link on its way">
        <p className="text-xs text-slate-600 text-center leading-relaxed">
          If an account exists for <strong>{email}</strong>, a password reset link is on its way.
        </p>
      </AuthBody>
    );
  }

  return (
    <AuthBody title="Forgot your password?" subtitle="We'll email you a link to reset it">
      {error && <ErrorBanner>{error}</ErrorBanner>}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <FormField
          icon={FiMail}
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="candidate@example.com"
        />
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 group"
        >
          <span>{isPending ? 'Sending...' : 'Send reset link'}</span>
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>
    </AuthBody>
  );
}
