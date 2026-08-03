'use client';

import { FiFileText } from 'react-icons/fi';
import type { DashboardTab, PipelineStep } from './types';

const resumeContent = (
  <div className="space-y-6 font-sans">
    <div className="border-b border-slate-200 pb-4">
      <h1 className="text-xl font-bold text-slate-900 font-display">John Doe</h1>
      <p className="text-xs text-slate-500 font-mono mt-1">
        john.doe@example.com • github.com/johndoe • Lagos, NG
      </p>
    </div>

    <div className="space-y-2">
      <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
        Professional Summary
      </h2>
      <div className="bg-slate-50 border-l-4 border-sky-500 p-3 rounded-r-xl space-y-1">
        <span className="text-[10px] font-mono font-bold text-sky-700 uppercase bg-sky-100 px-1.5 py-0.5 rounded">
          Tailored Match
        </span>
        <p className="text-xs text-slate-800 leading-relaxed font-sans">
          Full-Stack Software Engineer with 4+ years of experience building scalable Next.js applications
          and AI-native workflows. Specialized in TypeScript, React, and micro-frontend architectures
          with proven expertise driving user engagement.
        </p>
      </div>
    </div>

    <div className="space-y-4">
      <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
        Work Experience
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
          <h3 className="text-xs font-bold text-slate-900">Senior Frontend Engineer — TechCorp</h3>
          <span className="text-[11px] font-mono text-slate-400">2023 — Present</span>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 bg-red-50/50 border-l-2 border-red-300 rounded-r-lg space-y-1">
            <span className="text-[10px] font-mono text-red-600 uppercase font-semibold">Original Bullet</span>
            <p className="text-xs text-slate-500 line-through">
              Built React components and updated existing code for the application dashboard.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/60 border-l-4 border-emerald-500 rounded-r-lg space-y-1">
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase bg-emerald-100 px-1.5 py-0.5 rounded">
              AI Rewrite (Metric-Oriented)
            </span>
            <p className="text-xs text-slate-900 font-medium leading-relaxed">
              Architected 15+ modular React and Next.js App Router components, reducing page render
              latency by 32% across high-traffic dashboard views.
            </p>
          </div>

          <div className="p-3 bg-emerald-50/60 border-l-4 border-emerald-500 rounded-r-lg space-y-1 mt-2">
            <span className="text-[10px] font-mono font-bold text-emerald-700 uppercase bg-emerald-100 px-1.5 py-0.5 rounded">
              Keyword Integrated: Vercel AI SDK
            </span>
            <p className="text-xs text-slate-900 font-medium leading-relaxed">
              Integrated LLM streaming capabilities via the Vercel AI SDK, enabling real-time prompt
              responses and lowering bounce rates by 18%.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const coverLetterContent = (
  <div className="space-y-4 font-sans text-xs text-slate-800 leading-relaxed">
    <div className="border-b border-slate-100 pb-3 font-mono text-[11px] text-slate-500">
      <p>Date: August 3, 2026</p>
      <p>Re: Senior Full-Stack Engineer Application</p>
    </div>

    <p>Dear Hiring Manager,</p>

    <p>
      I am writing to express my strong interest in the Senior Full-Stack Engineer position. With
      extensive experience building high-performance web applications using Next.js, React, and
      TypeScript, I am eager to contribute to your team's upcoming engineering initiatives.
    </p>

    <p>
      In my recent work, I spearheaded the deployment of AI-native streaming pipelines utilizing the
      Vercel AI SDK and structured component systems. By prioritizing clean architecture and
      metric-driven development, I helped optimize load speeds by 32% while shipping reliable
      client-side state engines.
    </p>

    <p>
      Your job description highlights a requirement for engineers proficient in scalable frontends and
      modern full-stack workflows. My technical background aligns directly with these requirements,
      and I am excited about the opportunity to bring immediate value to your codebase.
    </p>

    <p>Thank you for your time and consideration.</p>

    <p className="pt-2">
      Sincerely,
      <br />
      <strong>john doe</strong>
    </p>
  </div>
);

const idleState = (
  <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-100 rounded-xl">
    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mb-4">
      <FiFileText className="w-6 h-6" />
    </div>
    <h3 className="text-base font-bold text-slate-800 mb-1">Ready to Accelerate Your Application</h3>
    <p className="text-xs text-slate-400 max-w-sm">
      Upload your master resume and targeted job posting on the left to generate real-time bullet
      rewrites and a tailored cover letter.
    </p>
  </div>
);

const loadingState = (step: PipelineStep) => (
  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
    <div className="w-12 h-12 rounded-full border-4 border-sky-100 border-t-sky-500 animate-spin" />
    <div>
      <h3 className="text-sm font-bold text-slate-900">
        {step === 'parsing' && 'Extracting Resume & Parsing Keywords...'}
        {step === 'analyzing' && 'Auditing Skill Gaps & Rewriting Bullet Points...'}
        {step === 'lettering' && 'Crafting Matching Cover Letter...'}
      </h3>
      <p className="text-xs font-mono text-slate-400 mt-1">AI Pipeline Processing Stream</p>
    </div>
  </div>
);

type DashboardDisplayProps = {
  currentStep: PipelineStep;
  activeTab: DashboardTab;
};

export default function DashboardDisplay({ currentStep, activeTab }: DashboardDisplayProps) {
  if (currentStep === 'input') {
    return idleState;
  }

  if (['parsing', 'analyzing', 'lettering'].includes(currentStep)) {
    return loadingState(currentStep);
  }

  if (activeTab === 'resume') {
    return resumeContent;
  }

  return coverLetterContent;
}
