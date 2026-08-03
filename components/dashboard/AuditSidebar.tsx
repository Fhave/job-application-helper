'use client';

import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function AuditSidebar() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Match Audit Analysis</h2>
          <p className="text-xs text-slate-400">Target Role: Senior Full-Stack Engineer</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-mono font-bold text-emerald-600">88%</span>
          <p className="text-[10px] font-mono text-slate-400 uppercase">Match Score</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Gap Assessment</h3>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
          <FiAlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong>Missing Keywords:</strong> CI/CD Pipelines, GraphQL, Microservices Architecture.
          </p>
        </div>

        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5">
          <FiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-900 leading-relaxed">
            <strong>Strong Alignment:</strong> Next.js App Router, TypeScript, Tailwind CSS, AI SDK Integration.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Detected Skill Clusters</h3>
        <div className="flex flex-wrap gap-1.5">
          {[
            'React / Next.js',
            'TypeScript',
            'Node.js',
            'Vercel AI SDK',
            'Tailwind',
            'REST APIs',
            'PostgreSQL',
          ].map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
