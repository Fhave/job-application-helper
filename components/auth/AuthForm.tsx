'use client';

import React, { useState, useTransition } from 'react';
import { FiMail, FiUser, FiArrowRight } from 'react-icons/fi';
import AuthBody from './AuthBody';
import FormField from './FormField';
import PasswordField from './PasswordField';
import ErrorBanner from './ErrorBanner';
import { loginAction, signupAction, resendVerificationAction } from '@/actions/auth';
import { loginSchema, signupSchema } from '@/lib/types';

type ViewMode = 'signin' | 'signup' | 'check-email';

export default function AuthForm() {
  const [mode, setMode] = useState<ViewMode>('signin');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [checkEmailAddress, setCheckEmailAddress] = useState('');
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setUnverifiedEmail(null);
    setFieldErrors({});

    const schema = mode === 'signup' ? signupSchema : loginSchema;
    const clientCheck = schema.safeParse(
      mode === 'signup'
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password }
    );

    if (!clientCheck.success) {
      setFieldErrors(clientCheck.error.flatten().fieldErrors as Record<string, string[]>);
      return;
    }

    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (mode === 'signup') data.append('name', formData.name);

    startTransition(async () => {
      try {
        const result = await action(data);

        if (result?.error) {
          setErrorMessage(result.error);
          if ('fieldErrors' in result && result.fieldErrors) {
            setFieldErrors(result.fieldErrors as Record<string, string[]>);
          }
          if ('code' in result && result.code === 'email_not_confirmed') {
            setUnverifiedEmail(result.email || formData.email);
          }
          return;
        }

        if (result && 'checkEmail' in result && result.checkEmail) {
          setCheckEmailAddress(result.email);
          setMode('check-email');
        }
      } catch (err) {
        setErrorMessage('An unexpected server error occurred. Please try again.');
      }
    });
    const action = mode === 'signup' ? signupAction : loginAction;

    startTransition(async () => {
      const result = await action(data);

      if (result?.error) {
        setErrorMessage(result.error);
        if ('fieldErrors' in result && result.fieldErrors) {
          setFieldErrors(result.fieldErrors as Record<string, string[]>);
        }
        if ('code' in result && result.code === 'email_not_confirmed') {
          setUnverifiedEmail(result.email);
        }
        return;
      }

      if ('checkEmail' in result && result.checkEmail) {
        setCheckEmailAddress(result.email);
        setMode('check-email');
      }
    });
  };

  const handleResend = () => {
    if (!unverifiedEmail) return;
    setResendStatus('sending');
    startTransition(async () => {
      const result = await resendVerificationAction(unverifiedEmail);
      setResendStatus(result?.error ? 'idle' : 'sent');
    });
  };

  const handleToggleMode = (nextMode: 'signin' | 'signup') => {
    setMode(nextMode);
    setErrorMessage(null);
    setUnverifiedEmail(null);
    setFieldErrors({});
    setFormData({ name: '', email: '', password: '' });
  };

  if (mode === 'check-email') {
    return (
      <AuthBody title="Check your email" subtitle="Almost there">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mx-auto">
            <FiMail className="w-6 h-6" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            We sent a verification link to <strong>{checkEmailAddress}</strong>. Click it to
            activate your account, then come back here to sign in.
          </p>
          <button
            type="button"
            onClick={() => handleToggleMode('signin')}
            className="text-xs font-semibold text-sky-600 hover:underline"
          >
            Back to sign in
          </button>
        </div>
      </AuthBody>
    );
  }

  const isSignUp = mode === 'signup';

  return (
    <AuthBody
      title={isSignUp ? 'Accelerate your career search' : 'Welcome back'}
      subtitle={
        isSignUp
          ? 'Tailor resumes and apply to roles 10x faster with AI'
          : 'Sign in to access your saved job applications and pipelines'
      }
    >
      {errorMessage && (
        <ErrorBanner>
          {errorMessage}
          {unverifiedEmail && (
            <button
              type="button"
              onClick={handleResend}
              disabled={resendStatus !== 'idle'}
              className="block mt-1.5 font-semibold underline disabled:no-underline disabled:opacity-60"
            >
              {resendStatus === 'sent'
                ? 'Verification email resent \u2713'
                : resendStatus === 'sending'
                  ? 'Sending\u2026'
                  : 'Resend verification email'}
            </button>
          )}
        </ErrorBanner>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {isSignUp && (
          <FormField
            icon={FiUser}
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            error={fieldErrors.name?.[0]}
          />
        )}

        <FormField
          icon={FiMail}
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="candidate@example.com"
          error={fieldErrors.email?.[0]}
        />

        <PasswordField
          label="Password"
          forgotPasswordLink={!isSignUp}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="************"
          error={fieldErrors.password?.[0]}
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 group mt-2 shadow-xs"
        >
          <span>
            {isPending ? 'Authenticating...' : isSignUp ? 'Start Free Sprint' : 'Sign In'}
          </span>
          <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-slate-500">
        {isSignUp ? (
          <p>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => handleToggleMode('signin')}
              className="text-sky-600 font-semibold hover:underline"
            >
              Log in
            </button>
          </p>
        ) : (
          <p>
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => handleToggleMode('signup')}
              className="text-sky-600 font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        )}
      </div>
    </AuthBody>
  );
}
