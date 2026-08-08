'use client';

export default function AuditSidebarSkeleton() {
  return (
    <div
      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 animate-pulse"
      aria-busy="true"
      aria-label="Analyzing resume against job description"
    >
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="space-y-2">
          <div className="h-3.5 w-32 bg-slate-200 rounded" />
          <div className="h-2.5 w-24 bg-slate-100 rounded" />
        </div>
        <div className="space-y-2 text-right">
          <div className="h-6 w-12 bg-slate-200 rounded ml-auto" />
          <div className="h-2 w-16 bg-slate-100 rounded ml-auto" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-2.5 w-28 bg-slate-100 rounded" />
        <div className="h-14 w-full bg-amber-50/60 border border-amber-100 rounded-xl" />
        <div className="h-14 w-full bg-emerald-50/60 border border-emerald-100 rounded-xl" />
      </div>

      <div className="space-y-2">
        <div className="h-2.5 w-40 bg-slate-100 rounded" />
        <div className="flex flex-wrap gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 w-16 bg-slate-100 rounded-md border border-slate-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
