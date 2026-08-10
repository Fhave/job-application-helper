'use client';

import React, { useState } from 'react';
import { FiChevronLeft as ChevronLeft, FiChevronRight as ChevronRight } from 'react-icons/fi';

interface TemplateItem {
  id: string;
  name: string;
  category: string;
  usageCount?: string;
  previewUrl: string;
}

export default function TemplatesSection() {
  const templates: TemplateItem[] = [
    {
      id: 'entry-level',
      name: 'Avery Carter',
      category: 'Entry Level',
      previewUrl:
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'classic',
      name: 'Logan Mitchell',
      category: 'Classic',
      previewUrl:
        'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'traditional',
      name: 'Tiffany Giroux',
      category: 'Traditional',
      usageCount: '2,600,000+ users chose this template',
      previewUrl:
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'professional',
      name: 'Sophia Watson',
      category: 'Professional',
      previewUrl:
        'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 'prime-ats',
      name: 'Herman Walton',
      category: 'Prime ATS',
      previewUrl:
        'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80&w=600',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(2);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? templates.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === templates.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-slate-50/50 py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tested resume templates
          </h2>
          <p className="text-slate-500 font-medium text-base sm:text-lg">
            Use the templates recruiters like. Download to Word or PDF.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center min-h-[580px]">
          {/* Left Navigation Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 z-30 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-105"
            aria-label="Previous template"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Cards */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 w-full max-w-6xl px-8">
            {templates.map((template, index) => {
              const isCenter = index === activeIndex;

              return (
                <div
                  key={template.id}
                  className={`flex flex-col items-center transition-all duration-300 ${
                    isCenter
                      ? 'scale-105 z-20 w-[280px] sm:w-[320px]'
                      : 'hidden md:flex opacity-70 hover:opacity-100 w-[180px] sm:w-[220px] scale-95'
                  }`}
                >
                  <div className="text-center mb-3 h-12 flex flex-col justify-end">
                    <h3
                      className={`font-semibold ${
                        isCenter ? 'text-slate-900 text-lg font-bold' : 'text-slate-700 text-lg'
                      }`}
                    >
                      {template.category}
                    </h3>
                    {template.usageCount && isCenter && (
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {template.usageCount}
                      </p>
                    )}
                  </div>

                  {/* Resume Document Preview Box */}
                  <div className="relative group w-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden aspect-[1/1.41]">
                    {/* Placeholder Resume Layout Mockup */}
                    <div className="w-full h-full p-4 flex flex-col justify-between bg-white select-none">
                      <div className="space-y-2">
                        {/* Mock Header */}
                        <div className="text-center space-y-1 pb-2 border-b border-slate-100">
                          <div className="h-3 bg-slate-800 rounded w-1/2 mx-auto"></div>
                          <div className="h-1.5 bg-slate-400 rounded w-1/3 mx-auto"></div>
                        </div>

                        {/* Mock Sections */}
                        <div className="space-y-1.5 pt-2">
                          <div className="h-2 bg-slate-300 rounded w-1/4"></div>
                          <div className="h-1 bg-slate-200 rounded w-full"></div>
                          <div className="h-1 bg-slate-200 rounded w-5/6"></div>
                          <div className="h-1 bg-slate-200 rounded w-4/5"></div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                          <div className="h-2 bg-slate-300 rounded w-1/3"></div>
                          <div className="h-1.5 bg-slate-400 rounded w-1/2"></div>
                          <div className="h-1 bg-slate-200 rounded w-full"></div>
                          <div className="h-1 bg-slate-200 rounded w-11/12"></div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                          <div className="h-2 bg-slate-300 rounded w-1/4"></div>
                          <div className="h-1 bg-slate-200 rounded w-full"></div>
                          <div className="h-1 bg-slate-200 rounded w-3/4"></div>
                        </div>
                      </div>

                      {/* Mock Footer */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="h-1 bg-slate-200 rounded w-1/2 mx-auto"></div>
                      </div>
                    </div>

                    {/* Overlay Action Button on Active/Hover */}
                    <div
                      className={`absolute inset-0 bg-slate-900/10 flex items-center justify-center transition-opacity duration-200 ${
                        isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-lg px-6 py-3 rounded-lg shadow-lg transition-all transform hover:scale-105 active:scale-95">
                        Use this template
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 z-30 bg-sky-500 hover:bg-sky-600 text-white rounded-full p-3 shadow-lg transition-transform hover:scale-105"
            aria-label="Next template"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
