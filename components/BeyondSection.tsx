'use client';

import React from 'react';
import Link from 'next/link';
import {
  FiStar as Sparkles,
  FiChevronRight as ChevronRight,
  FiCheck as Check,
  FiPlus as Plus,
  FiFileText as FileText,
} from 'react-icons/fi';

export default function BeyondSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-8 sm:space-y-12">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-slate-900 tracking-tight">
        Way beyond a resume builder...
      </h2>

      {/* ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-7 bg-indigo-50/40 border border-indigo-100/60 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
          <div className="space-y-3 sm:space-y-4 max-w-md z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
              <Sparkles className="w-3.5 h-3.5" />
              AI-powered
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Step-by-step guidance
            </h3>
            <p className="text-slate-600 text-xs sm:text-lg leading-relaxed">
              No need to think much. We guide you through every step of the process. We show you
              what to add, and where to add it. It&apos;s clear and simple.
            </p>
          </div>

          <div className="mt-6 mb-8 lg:mb-0 z-10">
            <Link
              href="/app"
              className="inline-flex items-center gap-1 text-sky-600 font-bold text-lg hover:gap-2 transition-all"
            >
              <span>Create my resume</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative lg:absolute lg:right-[-10px] lg:bottom-[-10px] w-full max-w-xs sm:max-w-sm ml-auto space-y-2.5 pointer-events-none z-0 mt-4 lg:mt-0">
            {/* Step 1 */}
            <div className="bg-white rounded-xl shadow-md p-2.5 sm:p-3 border border-slate-100 flex items-center gap-3 sm:translate-x-6">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-slate-700">Step 1 • Personal Details</span>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl shadow-md p-2.5 sm:p-3 border border-slate-100 flex items-center gap-3 sm:translate-x-3">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-xs font-bold text-slate-700">
                Step 2 • Professional Summary
              </span>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-slate-100 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-dashed border-sky-500 animate-spin shrink-0" />
                <span className="text-xs font-bold text-slate-800">Step 3 • Skills</span>
                <FileText className="w-3 h-3 text-slate-400" />
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <span className="bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:py-1 rounded-md flex items-center gap-1">
                  Management Skills <Plus className="w-3 h-3 text-slate-400" />
                </span>
                <span className="bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:py-1 rounded-md flex items-center gap-1">
                  Leadership and Team
                </span>
                <span className="bg-slate-100 text-slate-700 text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 sm:py-1 rounded-md flex items-center gap-1">
                  Computer Skills <Plus className="w-3 h-3 text-slate-400" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="lg:col-span-5 bg-indigo-50/40 border border-indigo-100/60 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
          <div className="space-y-3 sm:space-y-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
              <Sparkles className="w-3.5 h-3.5" />
              AI-powered
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              AI writes for you
            </h3>
            <p className="text-slate-600 text-xs sm:text-lg leading-relaxed">
              Speak into the mic and the AI fixes mistakes. Stuck? Click to add phrases that sound
              professional.
            </p>
          </div>

          <div className="mt-6 z-10 bg-white rounded-t-xl shadow-lg border border-slate-200 p-4 space-y-2 -mb-8 sm:-mb-10">
            <div className="text-xs font-bold text-slate-800">Professional Summary</div>
            <p className="text-[10px] text-slate-400">
              Write 2-4 short sentences to interest the reader...
            </p>

            {/* Toolbar */}
            <div className="flex gap-2 text-[10px] text-slate-500 font-bold border-b border-slate-100 pb-1">
              <span>B</span>
              <span>I</span>
              <span>U</span>
              <span>S</span>
              <span>≡</span>
              <span>🔗</span>
              <span>A</span>
            </div>

            <p className="text-[11px] text-slate-700 leading-snug">
              Experienced Business Development Manager bringing forth{' '}
              <mark className="bg-sky-100 text-sky-700 px-0.5 rounded font-medium">
                significant value and a genuine passion for management.
              </mark>{' '}
              With a proven track record of driving growth...
            </p>
          </div>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Card 3 */}
        <div className="lg:col-span-5 bg-indigo-50/40 border border-indigo-100/60 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden min-h-[380px]">
          <div className="space-y-3 sm:space-y-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
              <Sparkles className="w-3.5 h-3.5" />
              AI-powered
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Instant cover letters
            </h3>
            <p className="text-slate-600 text-xs sm:text-lg leading-relaxed">
              Just paste the job description. We create a matching cover letter using your resume in
              under 2 minutes.
            </p>
          </div>

          <div className="mt-6 mx-auto w-4/5 sm:w-3/4 bg-white rounded-t-xl shadow-xl border border-slate-200 p-4 -mb-8 sm:-mb-10 space-y-2">
            <div className="text-center border-b pb-2">
              <div className="text-xs font-black text-slate-800">JORGE SANDERS</div>
              <div className="text-[8px] text-slate-400 ">Financial Analyst</div>
            </div>
            <div className="space-y-1.5">
              <div className="h-1 bg-slate-200 rounded w-full" />
              <div className="h-1 bg-slate-200 rounded w-5/6" />
              <div className="h-1 bg-slate-200 rounded w-4/5" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="lg:col-span-7 bg-sky-50/60 border border-sky-100/70 rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden min-h-[400px]">
          <div className="space-y-3 sm:space-y-4 max-w-md z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Paste the job description
            </h3>
            <p className="text-slate-600 text-xs sm:text-lg leading-relaxed">
              Simple and effective. Paste the job description details and we pre-build your resume
              to match recruiter expectations.
            </p>
          </div>

          <div className="mt-6 mb-8 lg:mb-0 z-10">
            <Link
              href="/app"
              className="inline-flex items-center gap-1 text-sky-600 font-bold text-lg hover:gap-2 transition-all"
            >
              <span>Tailor my resume</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative lg:absolute lg:right-[-10px] lg:bottom-[-10px] w-full max-w-xs sm:max-w-sm ml-auto pointer-events-none z-0 mt-4 lg:mt-0">
            <div className="bg-slate-900 rounded-xl p-3 shadow-xl mb-[-24px]">
              <div className="flex gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-400" />
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <div className="bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded ">
                Job Description Text Input
              </div>
            </div>

            <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-slate-100 space-y-2.5 relative z-10">
              <div className="text-xs font-bold text-slate-800">
                Paste the job description below:
              </div>
              <div className="bg-slate-50 border border-emerald-400 rounded-lg p-2 text-[10px] text-slate-600 leading-tight space-y-1">
                <p className="font-semibold text-slate-800">We are seeking a Senior Engineer...</p>
                <p className="text-slate-500 truncate">
                  Responsibilities: Design component architectures, iterate on code...
                </p>
                <div className="flex justify-end pt-0.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                </div>
              </div>
              <p className="text-[9px] text-slate-400">
                Copy & paste directly from LinkedIn or Indeed.
              </p>

              <div className="flex justify-end gap-2 pt-0.5">
                <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5">Cancel</span>
                <span className="text-[10px] font-bold text-white bg-sky-500 px-3 py-1 rounded-md">
                  Continue
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
