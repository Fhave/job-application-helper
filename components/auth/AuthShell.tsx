'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Logo from '@/components/Logo';

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative w-full">
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-xs group"
        >
          <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-sm relative mt-12 sm:mt-0">
        <div className="text-center space-y-2 mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <Logo className="w-9 h-9 group-hover:scale-105 transition-transform" />
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-sans font-extrabold tracking-tight text-slate-900">
                JobSprint
              </span>
              <span className="text-xs font-mono font-bold bg-sky-100 text-sky-700 px-2 py-0.5 rounded-md uppercase tracking-wide">
                AI
              </span>
            </div>
          </Link>

          <h1 className="text-xl font-bold font-sans text-slate-900 pt-3">{title}</h1>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">{subtitle}</p>
        </div>

        {children}
      </div>
    </div>
  );
}