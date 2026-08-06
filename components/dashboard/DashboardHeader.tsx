'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { FiRotateCw } from 'react-icons/fi';
import type { PipelineStep } from './types';

type DashboardHeaderProps = {
  currentStep: PipelineStep;
  onReset: () => void;
  onSignOut: () => void;
};

export default function DashboardHeader({ currentStep, onReset, onSignOut }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8" />
          <span className="text-lg font-display font-extrabold tracking-tight text-slate-900">
            JobSprint <span className="text-sky-500">AI</span>
          </span>
        </Link>
        <span className="hidden sm:inline-block text-xs font-mono bg-sky-50 text-sky-700 px-2.5 py-1 rounded-md border border-sky-100 font-semibold">
          Sprint Workspace
        </span>
      </div>

      <div className="flex items-center gap-3">
        {currentStep !== 'input' && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          >
            <FiRotateCw className="w-3.5 h-3.5" />
            <span>New Sprint</span>
          </button>
        )}

        <button
          onClick={onSignOut}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition"
        >
          Exit Workspace
        </button>
      </div>
    </header>
  );
}
