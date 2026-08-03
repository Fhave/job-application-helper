'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiSmile as Smile, FiCheck as Check } from 'react-icons/fi';
import { FaGoogle, FaAmazon, FaAirbnb } from 'react-icons/fa6';

export default function CtaBannerSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden">
        {/* Left Column*/}
        <div className="space-y-6 max-w-xl z-10 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-slate-900 tracking-tight leading-tight">
            Join over{' '}
            <span className="inline-flex items-baseline font-mono text-sky-600 tracking-wider">
              41,000,000
            </span>{' '}
            job seekers
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-medium font-sans">
            Start now and accelerate your job search with AI-tailored resumes.
          </p>

          <div className="pt-2">
            <Link
              href="/app"
              className="inline-flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl transition shadow-md shadow-sky-500/20 active:scale-[0.98]"
            >
              Create my resume
            </Link>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative flex items-center justify-center z-10 w-full max-w-md lg:max-w-lg">
          <div className="relative w-64 sm:w-72 h-80 rounded-3xl overflow-hidden shadow-sm bg-gradient-to-b from-sky-200 to-sky-300 shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
              alt="Happy job seeker using JobSprint AI"
              fill
              sizes="(max-width: 640px) 256px, 288px"
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="absolute top-2 right-28 sm:right-32 w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shadow-xs">
            <Smile className="w-6 h-6 stroke-[2]" />
          </div>

          <div className="absolute bottom-4 left-6 sm:left-10 text-sky-500 space-y-0.5">
            <Check className="w-5 h-5 stroke-[3]" />
            <Check className="w-5 h-5 stroke-[3] -mt-3 ml-2" />
          </div>

          <div className="ml-6 sm:ml-10 space-y-4 flex flex-col items-center relative">
            <svg
              className="absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-40 text-sky-200 pointer-events-none hidden sm:block"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 40 160"
            >
              <path d="M 0 80 Q 20 80, 40 20" />
              <path d="M 0 80 L 40 80" />
              <path d="M 0 80 Q 20 80, 40 140" />
            </svg>

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center p-3 hover:scale-105 transition-transform">
              <FaAmazon className="w-7 h-7 text-slate-800" />
            </div>

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center p-3 hover:scale-105 transition-transform">
              <FaGoogle className="w-6 h-6 text-red-500" />
            </div>

            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-xs border border-slate-200 flex items-center justify-center p-3 hover:scale-105 transition-transform">
              <FaAirbnb className="w-7 h-7 text-rose-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
