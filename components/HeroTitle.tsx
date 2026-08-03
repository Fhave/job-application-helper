'use client';

import React, { useState, useEffect } from 'react';

export default function HeroTitle() {
  const phrases = [
    'hired faster',
    'more interviews',
    'a higher salary',
    'dream job offers',
    'past ATS filters',
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetPhrase = phrases[phraseIndex];
    let typingSpeed = isDeleting ? 40 : 80; // Speed up when deleting

    if (!isDeleting && currentText === targetPhrase) {
      // Pause at full word before starting to delete
      typingSpeed = 2000;
    } else if (isDeleting && currentText === '') {
      // Finished deleting, move to next phrase
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      typingSpeed = 500;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(targetPhrase.substring(0, currentText.length + 1));
        if (currentText === targetPhrase) {
          setIsDeleting(true);
        }
      } else {
        setCurrentText(targetPhrase.substring(0, currentText.length - 1));
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, phrases]);

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
      This resume builder gets you{' '}
      <span className="text-sky-500 inline-block min-w-[200px]">
        {currentText}
        <span className="animate-pulse text-sky-500 font-normal">|</span>
      </span>
    </h1>
  );
}
