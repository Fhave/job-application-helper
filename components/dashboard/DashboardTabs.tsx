'use client';

import { FiCopy, FiCheck, FiDownload } from 'react-icons/fi';
import type { DashboardTab, PipelineStep } from '@/lib/types';

type DashboardTabsProps = {
  activeTab: DashboardTab;
  currentStep: PipelineStep;
  onChangeTab: (tab: DashboardTab) => void;
};

export default function DashboardTabs({
  activeTab,
  currentStep,
  onChangeTab,
}: DashboardTabsProps) {
  return (
    <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-1.5 shadow-xs">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChangeTab('resume')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'resume'
              ? 'bg-sky-50 text-sky-700 border border-sky-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Tailored Resume Markup
        </button>
        <button
          type="button"
          onClick={() => onChangeTab('cover-letter')}
          disabled={currentStep === 'parsing'}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'cover-letter'
              ? 'bg-sky-50 text-sky-700 border border-sky-200'
              : 'text-slate-600 hover:text-slate-900 disabled:opacity-40'
          }`}
        >
          Generated Cover Letter
        </button>
      </div>

      <div className="flex items-center gap-2 pr-2">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition"
        >
          <FiDownload className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
}
