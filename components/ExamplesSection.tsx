'use client';

import React, { useState } from 'react';
import {
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
  FiStar as Star,
} from 'react-icons/fi';

interface ResumeExample {
  id: string;
  name: string;
  role: string;
  category: string;
  previewImage?: string;
}

export default function ExamplesSection() {
  const categories = [
    'All',
    'Doctor',
    'Architect',
    'Civil Engineer',
    'Driver',
    'Teacher',
    'Accountant',
    'Retail',
    'Human Resources',
    'Administrative',
    'Student',
    'Legal',
  ];

  const [activeCategory, setActiveCategory] = useState('All');

  const resumeExamples: ResumeExample[] = [
    {
      id: '1',
      name: 'Marion Diaz',
      role: 'Legal Administrative Assistant',
      category: 'Legal',
    },
    {
      id: '2',
      name: 'Dr. Emmit Jackson',
      role: 'Doctor / Physician',
      category: 'Doctor',
    },
    {
      id: '3',
      name: 'Sarah Lin',
      role: 'Senior Architect',
      category: 'Architect',
    },
  ];

  return (
    <section className="w-full bg-[#1e2396] text-white py-12 px-6 sm:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Category Filter Bar */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white text-[#1e2396]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <button className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Main Section Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading + CTA + Rating */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Get the interview with professional resume examples
              </h2>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-md">
                Impress employers and recruiters. Choose from hundreds of professionally-designed
                resume examples. Download to Word or PDF.
              </p>
            </div>

            {/* CTA Button & Indicator */}
            <div className="flex items-center gap-4">
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition shadow-lg">
                See all resume examples
              </button>
              <div className="flex gap-1 text-white/40 font-mono text-sm">&lt;&lt;</div>
            </div>

            {/* Trustpilot Rating Widget */}
            <div className="pt-6 space-y-2 border-t border-white/10 max-w-xs">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-emerald-500 p-1 rounded-xs">
                    <Star className="w-4 h-4 fill-white text-white" />
                  </div>
                ))}
                <div className="bg-emerald-500/40 p-1 rounded-xs relative overflow-hidden">
                  <Star className="w-4 h-4 fill-white text-white" />
                </div>
              </div>
              <div className="text-xl font-bold">4.2 out of 5</div>
              <p className="text-xs text-slate-300">
                based on 55,901 reviews on{' '}
                <a href="#" className="underline font-semibold hover:text-white">
                  Trustpilot
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: Horizontal Scroll Resume Cards */}
          <div className="lg:col-span-7 flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-2">
            {/* Card 1 */}
            <div className="min-w-[280px] sm:min-w-[320px] bg-white text-slate-900 rounded-lg p-6 shadow-2xl border border-slate-100 flex flex-col justify-between aspect-[1/1.4] text-[10px] leading-snug select-none">
              <div className="space-y-3">
                <div className="flex items-center gap-3 border-b pb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120"
                      alt="Marion Diaz"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">Marion Diaz</h3>
                    <p className="text-slate-500 text-[9px]">Legal Administrative Assistant</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 uppercase text-[9px] tracking-wider">
                    Profile
                  </h4>
                  <p className="text-slate-600 text-[9px] line-clamp-3">
                    Highly motivated and dedicated Legal Administrative Assistant seeking to utilize
                    my skills for the advancement of a top legal firm.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <h4 className="font-bold text-slate-800 uppercase text-[9px] tracking-wider">
                    Employment History
                  </h4>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800">
                      Legal Administrative Assistant, Ellis & Powers Attorneys
                    </p>
                    <p className="text-slate-400 text-[8px]">Mar 2016 – Sep 2020 | New York</p>
                    <ul className="list-disc list-inside text-slate-600 space-y-0.5">
                      <li>Provided administrative support for legal counsel.</li>
                      <li>Drafted legal documents and client correspondence.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[8px] text-slate-400">
                Boston University, Paralegal Studies
              </div>
            </div>

            {/* Card 2 */}
            <div className="min-w-[280px] sm:min-w-[320px] bg-white text-slate-900 rounded-lg p-6 shadow-2xl border border-slate-100 flex flex-col justify-between aspect-[1/1.4] text-[10px] leading-snug select-none">
              <div className="space-y-3">
                <div className="flex items-center gap-3 border-b pb-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120"
                      alt="Dr. Emmit Jackson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">
                      Dr. Emmit
                      <br />
                      Jackson
                    </h3>
                    <p className="text-slate-500 text-[9px]">Doctor</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 uppercase text-[9px] tracking-wider">
                    Profile
                  </h4>
                  <p className="text-slate-600 text-[9px] line-clamp-3">
                    Passionate Physician with extensive experience in internal medicine and hospital
                    settings. Expert in diagnosing and treating complex medical conditions.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 uppercase text-[9px] tracking-wider">
                    Employment History
                  </h4>
                  <div className="bg-slate-900 text-white p-1.5 rounded font-bold text-[9px]">
                    Physician at Internal Medicine, Mount Sinai
                  </div>
                  <p className="text-slate-400 text-[8px] pt-1">05/2013 – 09/2019</p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="bg-slate-900 text-white p-1 rounded font-bold text-[8px]">
                  Doctor of Medicine, New York University
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
