'use client';

import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  targetNumber?: number; // e.g. 41000000
  duration?: number; // duration in ms (default 2000ms)
}

export default function AnimatedCounter({
  targetNumber = 161205,
  duration = 5000,
}: AnimatedCounterProps) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);

      // Ease-out quad function for smooth slowing down at the end
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);

      const nextValue = Math.floor(easeOutProgress * targetNumber);
      setCurrentValue(nextValue);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [targetNumber, duration]);

  // Format number with commas (e.g. 41000000 -> "41,000,000")
  const formattedString = currentValue.toLocaleString('en-US');

  return (
    <div className="inline-flex items-center gap-1  font-bold text-sky-600">
      {formattedString.split('').map((char, index) => {
        if (char === ',') {
          return (
            <span key={`comma-${index}`} className="text-sky-500 -mx-0.5">
              ,
            </span>
          );
        }

        return (
          <span
            key={`digit-${index}`}
            className="bg-sky-50 px-2 py-1 rounded-md border border-sky-100/60 shadow-xs inline-block text-center min-w-[2rem]"
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}
