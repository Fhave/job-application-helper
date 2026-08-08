'use client';

import React from 'react';
import { FiChevronRight as ChevronRight, FiPlay as Play } from 'react-icons/fi';

export default function AdviceSection() {
  const videoCards = [
    {
      id: '1',
      category: 'Video • Career',
      title: 'Best way to ask for that promotion | Interview Masterclass',
    },
    {
      id: '2',
      category: 'Video • Resume Help',
      title: 'Learn how to write a high school resume (with examples)!',
    },
    {
      id: '3',
      category: 'Video',
      title: 'How to write a top engineering resume (+ example)',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 space-y-8">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Need some expert advice?
        </h2>
        <a
          href="#"
          className="inline-flex items-center gap-1 text-sky-500 font-bold text-sm hover:gap-2 transition-all"
        >
          Read the blog <ChevronRight className="w-4 h-4" />
        </a>
      </div>

      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <div className="bg-[#f2e7eb] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[320px] group cursor-pointer border border-pink-100/50 hover:shadow-lg transition-all">
          <div className="space-y-3 z-10 max-w-sm">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#8d7cdd] text-white">
              FIELD TESTED
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              How to write a resume: Expert guide & examples (2025)
            </h3>
          </div>

          <div className="absolute right-6 bottom-4 w-44 h-44 pointer-events-none flex items-center justify-center">
            <div className="absolute inset-0 bg-[#e7d8c9]/60 rounded-full blur-xl transform scale-90" />

            <div className="relative bg-white border border-slate-200 rounded-lg p-3 shadow-md w-28 h-36 flex flex-col justify-between rotate-[-6deg]">
              <div className="flex gap-2 items-center border-b border-slate-100 pb-2">
                <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center text-[8px] text-slate-400 font-bold">
                  👤
                </div>
                <div className="space-y-1 flex-1">
                  <div className="h-1 bg-slate-300 rounded w-full" />
                  <div className="h-1 bg-slate-200 rounded w-2/3" />
                </div>
              </div>
              <div className="space-y-1.5 py-2">
                <div className="h-1 bg-slate-200 rounded w-full" />
                <div className="h-1 bg-slate-200 rounded w-5/6" />
                <div className="h-1 bg-slate-200 rounded w-4/5" />
                <div className="h-1 bg-slate-100 rounded w-full" />
              </div>
              <div className="h-1 bg-emerald-300 rounded w-1/2" />
            </div>

            {/* Accent Circle */}
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-yellow-300/80" />
          </div>

          {/* Bottom Navigation Circle Button */}
          <div className="self-end z-10 mt-auto">
            <div className="w-10 h-10 rounded-full bg-white text-sky-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#fcebe6] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden min-h-[320px] group cursor-pointer border border-orange-100/50 hover:shadow-lg transition-all">
          <div className="space-y-3 z-10 max-w-sm">
            <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#ff6b4a] text-white">
              HR APPROVED
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              How to write a cover letter: expert guide & examples (2025)
            </h3>
          </div>

          <div className="absolute right-8 bottom-2 w-48 h-44 pointer-events-none flex items-center justify-center">
            <div className="relative w-36 h-28 bg-[#d95338] rounded-xl shadow-lg border-t-4 border-[#b8432b] flex flex-col items-center pt-2">
              <div className="absolute -top-4 w-12 h-4 border-2 border-slate-700 rounded-t-md" />

              <div className="w-full flex justify-between px-6 absolute top-0 bottom-0 pointer-events-none">
                <div className="w-2 bg-slate-800/80 h-full flex items-center justify-center">
                  <div className="w-3 h-3 border border-yellow-400 bg-slate-800 rounded-xs" />
                </div>
                <div className="w-2 bg-slate-800/80 h-full flex items-center justify-center">
                  <div className="w-3 h-3 border border-yellow-400 bg-slate-800 rounded-xs" />
                </div>
              </div>
              <div className="absolute -top-3 w-24 h-8 bg-white rounded-t shadow-xs border border-slate-200 -z-10" />
            </div>
          </div>

          {/* Bottom Navigation Circle Button */}
          <div className="self-end z-10 mt-auto">
            <div className="w-10 h-10 rounded-full bg-white text-sky-500 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {videoCards.map((card) => (
          <div
            key={card.id}
            className="bg-slate-100/70 hover:bg-slate-100 border border-slate-200/60 rounded-3xl p-8 flex flex-col justify-between min-h-[200px] transition-all group cursor-pointer"
          >
            {/* Play Badge + Category */}
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-red-500 stroke-none ml-0.5" />
              </div>
              <p className="text-xs font-semibold text-slate-400 tracking-wide">{card.category}</p>
            </div>

            {/* Video Title */}
            <h4 className="text-lg font-bold text-slate-900 leading-snug pt-4">{card.title}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
