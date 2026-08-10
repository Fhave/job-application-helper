'use client';

import React from 'react';
import Image from 'next/image';
import { FiTarget as Target, FiFileText as FileText } from 'react-icons/fi';
import { FaApple } from 'react-icons/fa';

export default function ToolsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
      {/* Section Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <h2 className="text-6xl sm:text-4xl font-regular text-slate-900 tracking-tight">
          Everything tailored to your target job
        </h2>
        <p className="text-slate-600 text-base sm:text-lg">
          Paste the job description, and our AI crafts customized applications aligned with what
          recruiters are looking for.
        </p>
      </div>

      {/* Feature Cards Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-emerald-50/70 border border-emerald-100 rounded-3xl p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xs">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-regular text-slate-900 tracking-tight">
              Job-Tailored Resumes
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Match key skills, adjust experience bullet points, and highlight relevant achievements
              specifically tailored to pass ATS filters and impress hiring managers.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-md border border-emerald-100/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-regular text-slate-700">Target Role Match</span>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                98% Match
              </span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-emerald-200 rounded-full w-3/4"></div>
              <div className="h-2 bg-slate-100 rounded-full w-full"></div>
              <div className="h-2 bg-slate-100 rounded-full w-5/6"></div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xs">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-regular text-slate-900 tracking-tight">
              Matching Cover Letters
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              Instantly generate targeted cover letters that connect your background directly to the
              company's mission and job requirements.
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-md border border-indigo-100/80 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-regular shrink-0">
                AI
              </div>
              <div className="text-xs font-medium text-slate-600 italic">
                "Dear Hiring Team, my experience with React and Node aligns directly with your
                senior developer opening..."
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-sky-50/80 border border-sky-100/70 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="flex items-center -space-x-3 shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
              alt="Coach 1"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="Coach 2"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120"
              alt="Coach 3"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl font-regular text-slate-900 tracking-tight">
              Ready to tailor your application?
            </h3>
            <p className="text-slate-600 text-lg font-medium">
              Create a targeted resume and cover letter in under 5 minutes.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-sky-500 hover:bg-sky-600 text-white font-regular text-lg px-6 py-3 rounded-md transition shadow-sm whitespace-nowrap cursor-pointer">
          Get Started Free
        </button>
      </div>
    </section>
  );
}
