'use client';

import React, { useState } from 'react';
import {
  FiChevronLeft as ChevronLeft,
  FiChevronRight as ChevronRight,
  FiStar as Star,
} from 'react-icons/fi';

interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  author: string;
  timeAgo: string;
}

export default function TestimonialsSection() {
  const reviews: Review[] = [
    {
      id: '1',
      rating: 5,
      title: 'Extremely useful',
      comment:
        'Extremely useful, and highlighted skill sets I knew I had, but would forget to mention.',
      author: 'Fred Garcia',
      timeAgo: 'about 1 hour ago',
    },
    {
      id: '2',
      rating: 5,
      title: 'Definitely a good invest...',
      comment:
        'Definitely a good investment - I struggled to find work before one of my team leads in the past recommended Resume.i...',
      author: 'KML',
      timeAgo: 'about 14 hours ago',
    },
    {
      id: '3',
      rating: 5,
      title: 'The resume auto tailori...',
      comment:
        'The resume auto tailoring feature actually got me an interview and after a month, I got the job. Been unemploye...',
      author: 'Flawless Exp',
      timeAgo: '5 days ago',
    },
    {
      id: '4',
      rating: 5,
      title: 'Super fast and intuitive',
      comment:
        'Created a polished resume and tailored cover letter in under 10 minutes. Couldn’t ask for a smoother experience.',
      author: 'Sarah M.',
      timeAgo: '1 week ago',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  // Calculate progress indicator width percentage based on carousel position
  const progressPercent = ((currentIndex + 1) / reviews.length) * 100;

  return (
    <section className="w-full bg-slate-50/70 py-20 px-6 sm:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-slate-900 tracking-tight">
          92% of customers recommend us
        </h2>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Overall Rating Summary */}
          <div className="lg:col-span-3 space-y-3 flex flex-col items-center lg:items-start text-center lg:text-left pt-2">
            <div className="text-2xl font-bold text-slate-900">4.2 out of 5</div>

            {/* Star Icons */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-emerald-500 p-1 rounded-xs">
                  <Star className="w-4 h-4 fill-white text-white" />
                </div>
              ))}
              <div className="bg-emerald-500/30 p-1 rounded-xs relative overflow-hidden">
                <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              </div>
            </div>

            {/* Trustpilot Brand */}
            <div className="flex items-center gap-1.5 pt-1 text-slate-900 font-bold text-lg">
              <span className="text-emerald-500">★</span> Trustpilot
            </div>
            <p className="text-xs text-slate-400">based on 55,901 reviews</p>
          </div>

          {/* Right Column: Cards & Controls */}
          <div className="lg:col-span-9 space-y-8">
            {/* Reviews Cards Container */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <div
                  key={review.id}
                  className="bg-transparent space-y-3 p-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    {/* Card 5-star row */}
                    <div className="flex items-center gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <div key={i} className="bg-emerald-500 p-0.5 rounded-xs">
                          <Star className="w-3.5 h-3.5 fill-white text-white" />
                        </div>
                      ))}
                    </div>

                    {/* Review Title */}
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {review.title}
                    </h3>

                    {/* Review Body */}
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-4">
                      {review.comment}
                    </p>
                  </div>

                  {/* Author & Timestamp */}
                  <div className="text-[11px] text-slate-400 pt-2">
                    <span className="font-semibold text-slate-500">{review.author}</span> •{' '}
                    {review.timeAgo}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls & Progress Bar Bar */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Bar Track */}
              <div className="flex-1 bg-slate-200 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-sky-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progressPercent, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
