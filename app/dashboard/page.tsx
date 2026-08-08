'use client';

import React, { useState, useTransition } from 'react';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PipelineStepper from '@/components/dashboard/PipelineStepper';
import UploadPanel from '@/components/dashboard/UploadPanel';
import AuditSidebar from '@/components/dashboard/AuditSidebar';
import AuditSidebarSkeleton from '@/components/dashboard/AuditSidebarSkeleton';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import DashboardDisplay from '@/components/dashboard/DashboardDisplay';
import type { DashboardTab, PipelineStep } from '@/lib/types';
import { AuditAndCVSchema, CoverLetterSchema } from '@/lib/types';
import { signOutAction } from '@/actions/auth';
import {
  parsePDFAction
} from '@/actions/dashboard';
import { downloadServerPDF } from '@/lib/generateApplicationPdf';
import { checkLooksLikeResume, checkLooksLikeJobDescription } from '@/lib/validation';

export default function DashboardPage() {
  const [currentStep, setCurrentStep] = useState<PipelineStep>('input');
  const [activeTab, setActiveTab] = useState<DashboardTab>('resume');
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [inputError, setInputError] = useState<string | null>(null);

  const auditAndCV = useObject({
    api: '/api/audit-and-tailor',
    schema: AuditAndCVSchema,
    onFinish: ({ object, error }) => {
      if (error) {
        console.error('Audit/CV schema validation failed:', error);
        setCurrentStep('input');
        return;
      }
      if (!object) {
        console.error('Audit/CV finished with no object and no error — unexpected.');
        setCurrentStep('input');
        return;
      }
      setCurrentStep('lettering');
      coverLetter.submit({
        jobDescription,
        cvData: object.generatedCV,
        domainRelevance: object.domainRelevance,
      });
    },
    onError: (error) => {
      console.error('Audit/CV request failed:', error);
      setCurrentStep('input');
    },
  });

  const coverLetter = useObject({
    api: '/api/cover-letter',
    schema: CoverLetterSchema,
    onFinish: ({ object, error }) => {
      if (error) console.error('Cover letter schema validation failed:', error);
      if (!object) console.error('Cover letter finished with no object.');
      setCurrentStep('ready');
    },
    onError: (error) => {
      console.error('Cover letter request failed:', error);
      setCurrentStep('ready');
    },
  });

  const handleStartSprint = () => {
    if (!jobDescription || !file) return;
    setInputError(null);

    startTransition(async () => {
      setCurrentStep('parsing');
      const parseFormData = new FormData();
      parseFormData.append('resume', file);
      const parseResult = await parsePDFAction(parseFormData);

      if (parseResult?.error || !parseResult?.text) {
        console.error('PDF Parse Failed:', parseResult?.error);
        setInputError('Could not read text from that PDF — try a different file.');
        setCurrentStep('input');
        return;
      }

      const resumeCheck = checkLooksLikeResume(parseResult.text);
      const jdCheck = checkLooksLikeJobDescription(jobDescription);

      if (!resumeCheck.isLikely || !jdCheck.isLikely) {
        const problems = [
          !resumeCheck.isLikely &&
          `The uploaded file doesn't look like a resume. ${resumeCheck.reasons.join(' ')}`,
          !jdCheck.isLikely &&
          `The pasted text doesn't look like a job description. ${jdCheck.reasons.join(' ')}`,
        ].filter(Boolean);
        setInputError(problems.join(' '));
        setCurrentStep('input');
        return;
      }

      setCurrentStep('analyzing');
      auditAndCV.submit({ resumeText: parseResult.text, jobDescription });
    });
  };

  const handleReset = () => {
    setCurrentStep('input');
    setFile(null);
    setJobDescription('');
    setResumeText('');
    setActiveTab('resume');

    auditAndCV.stop();
    coverLetter.stop();
  };

const handleExport = async () => {
  if (!auditAndCV.object?.generatedCV) return;
  setIsExporting(true);

  try {
    const response = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cvData: auditAndCV.object.generatedCV,
        coverLetterData: coverLetter.object ?? null,
      }),
    });

    if (!response.ok) throw new Error(await response.text());

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'application.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Export failed:', err);
  } finally {
    setIsExporting(false);
  }
};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <DashboardHeader currentStep={currentStep} onReset={handleReset} onSignOut={signOutAction} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <PipelineStepper currentStep={currentStep} />

          {currentStep === 'input' && inputError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
              {inputError}
            </div>
          )}

          {currentStep === 'input' ? (
            <UploadPanel
              file={file}
              jobDescription={jobDescription}
              onFileChange={setFile}
              onJobDescriptionChange={setJobDescription}
              onStartSprint={handleStartSprint}
            />
          ) : auditAndCV.object?.audit ? (
            <AuditSidebar {...auditAndCV.object.audit} domainRelevance={auditAndCV.object.domainRelevance} />
          ) : (
            <AuditSidebarSkeleton />
          )}
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          {(auditAndCV.error || coverLetter.error) && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
              {auditAndCV.error?.message || coverLetter.error?.message}
            </div>
          )}

          {currentStep !== 'input' && (
            <DashboardTabs
              activeTab={activeTab}
              currentStep={currentStep}
              onChangeTab={setActiveTab}
              onExport={handleExport}
              isExporting={isExporting}
            />
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex-1 min-h-137.5 relative overflow-hidden">
            <DashboardDisplay
              currentStep={currentStep}
              activeTab={activeTab}
              cvData={auditAndCV.object?.generatedCV}
              coverLetterData={coverLetter.object}
            />
          </div>
        </div>
      </main>
    </div>
  );
}