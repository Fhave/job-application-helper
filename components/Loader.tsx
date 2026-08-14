import React from 'react';

export default function Loader({ label = 'Loading JobSprint AI...' }: { label?: string }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-3 bg-slate-50/50">
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-sky-100 animate-pulse" />

        <div className="absolute w-10 h-10 rounded-full border-2 border-sky-500 border-t-transparent animate-spin" />
      </div>

      <p className="text-xs font-medium text-slate-500 tracking-wide animate-pulse">
        {label}
      </p>
    </div>
  );
}