'use client';

import { FiCheckCircle } from 'react-icons/fi';
import type { PipelineStep } from '@/lib/types';

type PipelineStepperProps = {
  currentStep: PipelineStep;
};

const stepClasses = (active: boolean) =>
  active ? 'bg-sky-500 text-white' : 'bg-emerald-500 text-white';

export default function PipelineStepper({ currentStep }: PipelineStepperProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
      <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-4">
        Pipeline Status
      </h2>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${currentStep === 'input' ? 'bg-sky-500 text-white' : 'bg-emerald-500 text-white'
              }`}
          >
            {currentStep === 'input' ? '1' : <FiCheckCircle className="w-4 h-4" />}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-800">Upload Resume & Job Description</p>
            <p className="text-[11px] text-slate-400">Input documents for evaluation</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${['parsing', 'analyzing'].includes(currentStep)
                ? 'bg-sky-500 text-white animate-pulse'
                : ['ready', 'lettering', 'ready'].includes(currentStep)
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}
          >
            {['ready', 'lettering', 'ready'].includes(currentStep) ? (
              <FiCheckCircle className="w-4 h-4" />
            ) : (
              '2'
            )}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-800">Audit & Tailor Resume</p>
            <p className="text-[11px] text-slate-400">Identify gap analysis & rewrite bullets</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${currentStep === 'lettering'
                ? 'bg-sky-500 text-white animate-pulse'
                : currentStep === 'ready'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-100 text-slate-400'
              }`}
          >
            {currentStep === 'ready' ? <FiCheckCircle className="w-4 h-4" /> : '3'}
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-slate-800">Generate Cover Letter</p>
            <p className="text-[11px] text-slate-400">Draft targeted application letter</p>
          </div>
        </div>
      </div>
    </div>
  );
}
