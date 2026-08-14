'use client';

import { IconType } from 'react-icons';

export default function FormField({
  icon: Icon,
  label,
  error,
  ...props
}: {
  icon: IconType;
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-regular text-slate-700">{label}</label>
      <div className="relative">
        <Icon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          {...props}
          className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:outline-none transition-colors ${
            error ? 'border-red-300 focus:border-red-400' : 'border-slate-200 focus:border-sky-500'
          }`}
        />
      </div>
      {error && <p className="text-[11px] text-red-600 font-regular pl-1">{error}</p>}
    </div>
  );
}
