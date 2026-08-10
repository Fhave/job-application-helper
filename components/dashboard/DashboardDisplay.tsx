'use client';

import { FiFileText } from 'react-icons/fi';
import type { DeepPartial } from 'ai';
import type { DashboardTab, PipelineStep, CoverLetterData } from '@/lib/types';

export interface CVData {
  fullName: string;
  contactInfo: {
    email: string;
    phone: string | null;
    location: string | null;
    linkedin: string | null;
    portfolio: string | null;
  };
  summary: string;
  skills: string[];
  experience: {
    role: string;
    company: string;
    location: string | null;
    period: string;
    bulletPoints: string[];
    originalBullets?: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    location: string | null;
    year: string;
    details: string | null;
  }[];
  projects?:
    | {
        title: string;
        technologies: string[];
        description: string;
        link: string | null;
      }[]
    | null;
}

function ResumeDisplay({ data }: { data?: DeepPartial<CVData> | null }) {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 text-xs">
        <p className="font-semibold text-slate-700">Generating tailored resume…</p>
        <p className="mt-2">Resume content will appear here as the stream arrives.</p>
      </div>
    );
  }

  const fullName = data.fullName ?? 'Tailored Resume';
  const contactInfo = {
    email: data.contactInfo?.email ?? '',
    phone: data.contactInfo?.phone ?? null,
    location: data.contactInfo?.location ?? null,
    linkedin: data.contactInfo?.linkedin ?? null,
    portfolio: data.contactInfo?.portfolio ?? null,
  };
  const summary = data.summary ?? '';
  const skills = Array.isArray(data.skills)
    ? data.skills.filter((skill): skill is string => typeof skill === 'string')
    : [];
  const experience = Array.isArray(data.experience)
    ? data.experience.filter((item): item is NonNullable<typeof item> => item != null)
    : [];
  const education = Array.isArray(data.education)
    ? data.education.filter((item): item is NonNullable<typeof item> => item != null)
    : [];
  const projects = Array.isArray(data.projects)
    ? data.projects.filter((item): item is NonNullable<typeof item> => item != null)
    : [];

  const contactItems = [
    contactInfo.email,
    contactInfo.phone,
    contactInfo.location,
    contactInfo.linkedin,
    contactInfo.portfolio,
  ].filter(Boolean);

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-xl font-bold text-slate-900 font-display">{fullName}</h1>
        {contactItems.length > 0 && (
          <p className="text-xs text-slate-500  mt-1">{contactItems.join(' • ')}</p>
        )}
      </div>

      {summary && (
        <div className="space-y-2">
          <h2 className="text-xs  font-bold uppercase tracking-wider text-slate-400">
            Professional Summary
          </h2>
          <div className="bg-slate-50 border-l-4 border-sky-500 p-3 rounded-r-xl space-y-1">
            <p className="text-xs text-slate-800 leading-relaxed font-sans">{summary}</p>
          </div>
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs  font-bold uppercase tracking-wider text-slate-400">
            Technical & Professional Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="text-[11px]  font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xs  font-bold uppercase tracking-wider text-slate-400">
            Work Experience
          </h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">
                    {exp.role} — {exp.company}
                    {exp.location ? ` (${exp.location})` : ''}
                  </h3>
                  <span className="text-[11px]  text-slate-400">{exp.period}</span>
                </div>

                <div className="space-y-2">
                  {exp.originalBullets && exp.originalBullets.length > 0 && (
                    <div className="p-3 bg-red-50/50 border-l-2 border-red-300 rounded-r-lg space-y-1">
                      <span className="text-[10px]  text-red-600 uppercase font-semibold">
                        Original Bullet
                      </span>
                      <p className="text-xs text-slate-500 line-through">
                        {exp.originalBullets[0]}
                      </p>
                    </div>
                  )}

                  {Array.isArray(exp.bulletPoints) &&
                    exp.bulletPoints.map((bullet, bIdx) => (
                      <div
                        key={bIdx}
                        className="p-3 bg-emerald-50/60 border-l-4 border-emerald-500 rounded-r-lg space-y-1"
                      >
                        <p className="text-xs text-slate-900 font-medium leading-relaxed">
                          {bullet}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {education && education.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs  font-bold uppercase tracking-wider text-slate-400">Education</h2>
          <div className="space-y-2">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-start"
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                  <p className="text-xs text-slate-500">
                    {edu.institution}
                    {edu.location ? `, ${edu.location}` : ''}
                  </p>
                  {edu.details && <p className="text-[11px] text-slate-600 mt-1">{edu.details}</p>}
                </div>
                <span className="text-[11px]  text-slate-400 shrink-0">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs  font-bold uppercase tracking-wider text-slate-400">
            Featured Projects
          </h2>
          <div className="space-y-2">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5"
              >
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xs font-bold text-slate-900">{proj.title}</h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px]  text-sky-600 hover:underline"
                    >
                      View Project
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{proj.description}</p>
                {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px]  bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CoverLetterDisplay({ data }: { data?: DeepPartial<CoverLetterData> | null }) {
  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400 text-xs">
        <p className="font-semibold text-slate-700">Generating cover letter…</p>
        <p className="mt-2">Cover letter content will appear here as the stream arrives.</p>
      </div>
    );
  }

  const recipient = data.recipient ?? {
    hiringManagerName: null,
    companyName: null,
    roleTitle: '',
  };
  const salutation = data.salutation ?? 'Dear Hiring Manager,';
  const paragraphs = data.paragraphs ?? {
    opening: '',
    bodyParagraph1: '',
    bodyParagraph2: '',
    closing: '',
  };
  const signOff = data.signOff ?? '';
  const candidateName = data.candidateName ?? '';

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="space-y-4 font-sans text-xs text-slate-800 leading-relaxed max-w-2xl">
      <div className="border-b border-slate-100 pb-3  text-[11px] text-slate-500 space-y-1">
        <p>Date: {today}</p>
        <p>
          Re: {recipient.roleTitle}
          {recipient.companyName ? ` at ${recipient.companyName}` : ''}
        </p>
      </div>

      <p className="font-semibold text-slate-900">{salutation}</p>

      <p>{paragraphs.opening}</p>
      <p>{paragraphs.bodyParagraph1}</p>
      <p>{paragraphs.bodyParagraph2}</p>
      <p>{paragraphs.closing}</p>

      <div className="pt-4 space-y-1">
        <p>{signOff}</p>
        <p className="font-bold text-slate-900">{candidateName}</p>
      </div>
    </div>
  );
}

const idleState = (
  <div className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-100 rounded-xl">
    <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-500 flex items-center justify-center mb-4">
      <FiFileText className="w-6 h-6" />
    </div>
    <h3 className="text-base font-bold text-slate-800 mb-1">
      Ready to Accelerate Your Application
    </h3>
    <p className="text-xs text-slate-400 max-w-sm">
      Upload your master resume and targeted job posting on the left to generate real-time bullet
      rewrites and a tailored cover letter.
    </p>
  </div>
);

const loadingState = (step: PipelineStep) => (
  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
    <div className="w-12 h-12 rounded-full border-4 border-sky-100 border-t-sky-500 animate-spin" />
    <div>
      <h3 className="text-lg font-bold text-slate-900">
        {step === 'parsing' && 'Extracting Resume & Parsing Keywords...'}
        {step === 'analyzing' && 'Auditing Skill Gaps & Rewriting Bullet Points...'}
        {step === 'lettering' && 'Crafting Matching Cover Letter...'}
      </h3>
      <p className="text-xs  text-slate-400 mt-1">AI Pipeline Processing Stream</p>
    </div>
  </div>
);

type DashboardDisplayProps = {
  currentStep: PipelineStep;
  activeTab: DashboardTab;
  cvData?: DeepPartial<CVData> | null;
  coverLetterData?: DeepPartial<CoverLetterData> | null;
};

export default function DashboardDisplay({
  currentStep,
  activeTab,
  cvData,
  coverLetterData,
}: DashboardDisplayProps) {
  if (currentStep === 'input') {
    return idleState;
  }

  if (currentStep === 'parsing') {
    return loadingState(currentStep);
  }

  if (activeTab === 'resume') {
    return cvData ? (
      <div className="h-full">
        <ResumeDisplay data={cvData} />
      </div>
    ) : (
      loadingState(currentStep)
    );
  }

  return coverLetterData ? (
    <div className="h-full">
      <CoverLetterDisplay data={coverLetterData} />
    </div>
  ) : (
    loadingState(currentStep)
  );
}
