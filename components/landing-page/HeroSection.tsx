import React from 'react';
import Image from 'next/image';
import HeroTitle from './HeroTitle';
import HeroImg from '@/assets/heroImg.png';

export default function HeroSection() {
  return (
    <div className="max-w-8xl mx-auto px-8 sm:px-6 pb-12 pt-4">
      <div className="bg-slate-50/70 border border-slate-100 rounded-[32px] p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-24 relative z-10">
          <div className="lg:col-span-5 space-y-6">
            <HeroTitle />

            <p className="text-black text-base sm:text-lg font-normal max-w-md leading-relaxed">
              Only 2% of resumes win. Yours will be one of them.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold text-lg px-7 py-3.5 rounded-sm transition shadow-xs cursor-pointer">
                Create my resume
              </button>
              <button className="bg-sky-50/80 hover:bg-sky-100/80 text-sky-700 font-semibold text-lg px-7 py-3.5 rounded-sm border border-sky-100/80 transition cursor-pointer">
                Upload my resume
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-7 flex justify-center items-center">
            <Image
              src={HeroImg}
              alt="Resume Builder Preview"
              priority
              className="w-full h-auto max-w-2xl object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}