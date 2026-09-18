import React from 'react';
import {
  FiCheckCircle as CheckCircle,
  FiCpu as Cpu,
  FiFileText as FileText,
  FiTarget as Target,
} from 'react-icons/fi';
import AnimatedCounter from './AnimatedCounter';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Target className="w-6 h-6 text-slate-800" />,
    title: 'Job Description Matching',
    description:
      "Paste any job posting, and we'll tailor your resume to match its key requirements.",
  },
  {
    icon: <FileText className="w-6 h-6 text-slate-800" />,
    title: 'Tailored Cover Letters',
    description: 'Instantly generate compelling cover letters customized to the role and company.',
  },
  {
    icon: <Cpu className="w-6 h-6 text-slate-800" />,
    title: 'ATS Keyword Alignment',
    description:
      'Automatically extract and incorporate critical keywords to beat applicant filters.',
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-slate-800" />,
    title: 'Role-Specific Bullet Points',
    description:
      'Transform your experience into high-impact bullet points relevant to the position.',
  },
];

export default function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 sm:space-y-12">
      <div className="flex flex-col items-center justify-center gap-1 sm:gap-3 text-center">
        <div className="flex items-center gap-1 font-bold text-3xl sm:text-4xl text-sky-500">
          <AnimatedCounter />
        </div>

        <span className="text-xl sm:text-2xl font-regular text-slate-800">
          resumes created today
        </span>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-slate-50/70 border border-slate-100/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-sm transition"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 flex items-center justify-center">{feature.icon}</div>
              <h3 className="text-xl sm:text-2xl font-regular text-slate-900 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
