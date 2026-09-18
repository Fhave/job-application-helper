'use client';

import { useEffect, useState } from 'react';

const PHRASES = [
  'hired faster',
  'more interviews',
  'a higher salary',
  'dream job offers',
  'past ATS filters',
];

export default function HeroTitle() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetPhrase = PHRASES[phraseIndex];

    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && currentText === targetPhrase) {
      speed = 2000;
    } else if (isDeleting && currentText === '') {
      speed = 500;
    }

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText === targetPhrase) {
          setIsDeleting(true);
        } else {
          setCurrentText(targetPhrase.substring(0, currentText.length + 1));
        }
      } else {
        if (currentText === '') {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
        } else {
          setCurrentText(targetPhrase.substring(0, currentText.length - 1));
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  return (
    <h1 className="text-4xl sm:text-5xl lg:text-7xl text-center lg:text-left font-normal text-slate-900 tracking-tight leading-[1.12]">
      <span className="block lg:inline">This resume builder gets you </span>
      <span className="block lg:inline-block text-sky-500 align-bottom min-h-[1.12em]">
        <span>{currentText || '\u00A0'}</span>
        <span className="w-0.75 h-[0.85em] bg-sky-500 animate-pulse ml-0.5 rounded-full inline-block align-middle" />
      </span>
    </h1>
  );
}
