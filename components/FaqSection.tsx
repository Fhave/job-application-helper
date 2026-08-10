'use client';

import React, { useState } from 'react';
import { FiChevronDown as ChevronDown } from 'react-icons/fi';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const faqs: FaqItem[] = [
    {
      question: 'What is the definition of a resume?',
      answer:
        'A resume is a formal document that provides an overview of your professional qualifications, including your relevant work experience, skills, education, and notable accomplishments.',
    },
    {
      question: 'What is the difference between a CV and a resume?',
      answer:
        'A resume is typically a concise 1-2 page summary of your experience tailored to a specific job, whereas a CV (Curriculum Vitae) is an in-depth document detailing your full academic and professional career.',
    },
    {
      question: 'How do I choose the right resume template?',
      answer:
        'Choose a template that aligns with your industry standards. Traditional fields like law or finance suit classic layouts, while creative or modern tech roles benefit from cleaner, visually distinct designs.',
    },
    {
      question: 'How far back should a resume go?',
      answer:
        'As a general rule, focus on the last 10 to 15 years of relevant work experience. Earlier jobs can be summarized or omitted unless directly relevant to the target role.',
    },
    {
      question: 'What does an ATS-friendly resume mean?',
      answer:
        'An ATS-friendly resume uses clean formatting, standard section headings, readable fonts, and relevant keywords so Applicant Tracking Systems can easily parse and index your information.',
    },
    {
      question: 'What resume file format can I download in?',
      answer:
        'You can download your resume in universally accepted formats including PDF and Microsoft Word (.docx).',
    },
    {
      question: 'Should I make a different resume for every job application?',
      answer:
        'Yes, tailoring your resume for each application significantly increases your chances of getting noticed by matching specific keywords and requirements from the job description.',
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-6 py-20 space-y-12">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-regular text-center text-slate-900 tracking-tight">
        Frequently Asked Questions
      </h2>

      {/* Accordion List */}
      <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-5 transition-colors">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between text-left group focus:outline-none"
              >
                <span className="text-base sm:text-lg font-normal text-slate-800 group-hover:text-sky-600 transition-colors pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-sky-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 text-slate-600 text-lg leading-relaxed pr-8">{faq.answer}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
