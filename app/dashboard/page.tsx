'use client';

import React, { useState, useEffect, useTransition } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PipelineStepper from '@/components/dashboard/PipelineStepper';
import UploadPanel from '@/components/dashboard/UploadPanel';
import AuditSidebar from '@/components/dashboard/AuditSidebar';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import DashboardDisplay from '@/components/dashboard/DashboardDisplay';
import type { DashboardTab, PipelineStep } from '@/components/dashboard/types';
import { signOutAction } from '@/actions/auth';

export default function DashboardPage() {
  const [currentStep, setCurrentStep] = useState<PipelineStep>('input');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<DashboardTab>('resume');
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');

  const handleStartSprint = () => {
    if (!jobDescription || !file) return;

    setCurrentStep('parsing');
    setTimeout(() => {
      setCurrentStep('analyzing');
      setTimeout(() => {
        setCurrentStep('ready');
        setTimeout(() => {
          setCurrentStep('lettering');
          setTimeout(() => {
            setCurrentStep('done');
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1200);
  };

  const handleReset = () => {
    setCurrentStep('input');
    setFile(null);
    setJobDescription('');
    setActiveTab('resume');
  };

  const handleCopy = () => {
    const text = activeTab === 'resume' ? 'Full Tailored Resume Text...' : 'Full Cover Letter Text...';
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <DashboardHeader currentStep={currentStep} onReset={handleReset} onSignOut={signOutAction} />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 flex flex-col gap-6">
          <PipelineStepper currentStep={currentStep} />

          {currentStep === 'input' ? (
            <UploadPanel
              file={file}
              jobDescription={jobDescription}
              onFileChange={setFile}
              onJobDescriptionChange={setJobDescription}
              onStartSprint={handleStartSprint}
            />
          ) : (
            <AuditSidebar />
          )}
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          {currentStep !== 'input' && (
            <DashboardTabs
              activeTab={activeTab}
              currentStep={currentStep}
              copied={copied}
              onChangeTab={setActiveTab}
              onCopy={handleCopy}
            />
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm flex-1 min-h-137.5 relative overflow-hidden">
            <DashboardDisplay currentStep={currentStep} activeTab={activeTab} />
          </div>
        </div>
      </main>
    </div>
  );
}
