import React from 'react';
import Image from 'next/image';
import HeroTitle from './HeroTitle';
import HeroImg from '@/assets/heroImg.png';

export default function HeroSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 pt-4">
      <div className="bg-slate-50/60 border border-slate-100 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <HeroTitle />

            <p className="text-slate-600 text-lg font-normal">
              Only 2% of resumes win. Yours will be one of them.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-7 py-3.5 rounded-lg transition shadow-md shadow-sky-100 cursor-pointer">
                Create my resume
              </button>
              <button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold px-7 py-3.5 rounded-lg transition cursor-pointer">
                Upload my resume
              </button>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <Image
              src={HeroImg}
              alt="Resume Builder Preview"
              priority
              className="w-full h-auto max-w-lg lg:max-w-none object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
