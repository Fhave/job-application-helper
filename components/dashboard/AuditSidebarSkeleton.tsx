'use client';

export default function AuditSidebarSkeleton() {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6 animate-pulse">
      {/* Combined Header Skeleton */}
      <div className="border-b border-slate-100 pb-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <div className="h-4 w-32 bg-slate-200 rounded-md" />
              <div className="h-4 w-20 bg-slate-200 rounded-full" />
            </div>
            <div className="h-3 w-40 bg-slate-150 bg-slate-200 rounded-md" />
          </div>

          <div className="text-right space-y-1">
            <div className="h-7 w-12 bg-slate-200 rounded-md ml-auto" />
            <div className="h-2.5 w-16 bg-slate-200 rounded-md" />
          </div>
        </div>

        <div className="h-12 w-full bg-slate-100 rounded-xl" />
      </div>

      {/* Gap Assessment Skeleton */}
      <div className="space-y-3">
        <div className="h-3 w-28 bg-slate-200 rounded-md" />
        <div className="h-14 w-full bg-amber-50/60 border border-amber-100 rounded-xl" />
        <div className="h-14 w-full bg-emerald-50/60 border border-emerald-100 rounded-xl" />
      </div>

      {/* Skills Skeleton */}
      <div className="space-y-2">
        <div className="h-3 w-36 bg-slate-200 rounded-md" />
        <div className="flex flex-wrap gap-1.5">
          <div className="h-6 w-16 bg-slate-100 rounded-md" />
          <div className="h-6 w-20 bg-slate-100 rounded-md" />
          <div className="h-6 w-14 bg-slate-100 rounded-md" />
          <div className="h-6 w-24 bg-slate-100 rounded-md" />
        </div>
      </div>
    </div>
  );
}
