'use client';

import { FiAlertCircle } from 'react-icons/fi';

export default function ErrorBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs rounded-2xl flex items-start gap-2.5">
      <FiAlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
      <span className="leading-relaxed font-medium">{children}</span>
    </div>
  );
p}