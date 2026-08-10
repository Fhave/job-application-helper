'use client';

import { useState } from 'react';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function PasswordField({
  label,
  forgotPasswordLink,
  error,
  ...props
}: {
  label: string;
  forgotPasswordLink?: boolean;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        {forgotPasswordLink && (
          <a
            href="/auth/forgot-password"
            className="text-[11px] font-semibold text-sky-600 hover:underline"
          >
            Forgot password?
          </a>
        )}
      </div>
      <div className="relative">
        <FiLock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          {...props}
          type={show ? 'text' : 'password'}
          className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-10 text-xs text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
            error ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-sky-500'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
        >
          {show ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
        </button>
      </div>
      {error && <p className="text-[11px] text-red-600 font-medium pl-1">{error}</p>}
    </div>
  );
}
