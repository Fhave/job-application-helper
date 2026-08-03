import React from 'react';

interface JobSprintLogoProps {
  className?: string;
  iconClassName?: string;
}

export default function JobSprintLogo({
  className = 'w-9 h-9',
  iconClassName = 'w-5 h-5',
}: JobSprintLogoProps) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-md shadow-sky-500/20 ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`text-white ${iconClassName}`}
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </div>
  );
}
