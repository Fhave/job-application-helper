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
    let typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && currentText === targetPhrase) {
      typingSpeed = 2000;
    } else if (isDeleting && currentText === '') {
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
    <h1 className="text-2xl sm:text-5xl lg:text-7xl text-center md:text-left font-normal text-slate-900 tracking-tight leading-[1.12]">
      This resume builder gets you{' '}
      <span className="text-sky-500 inline-inline-block align-bottom min-h-[1.12em]">
        <span>{currentText || '\u00A0'}</span>
        <span className="w-[3px] h-[0.85em] bg-sky-500 animate-pulse ml-0.5 rounded-full inline-block align-middle" />
      </span>
    </h1>
  );
}