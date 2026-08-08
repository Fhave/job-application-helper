'use client';

import { FiUploadCloud, FiFileText, FiArrowRight } from 'react-icons/fi';

type UploadPanelProps = {
  file: File | null;
  jobDescription: string;
  onFileChange: (file: File | null) => void;
  onJobDescriptionChange: (value: string) => void;
  onStartSprint: () => void;
};

export default function UploadPanel({
  file,
  jobDescription,
  onFileChange,
  onJobDescriptionChange,
  onStartSprint,
}: UploadPanelProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 flex-1">
      <h2 className="text-sm font-bold text-slate-900">1. Upload Resume</h2>

      <div className="border-2 border-dashed border-slate-200 hover:border-sky-400 rounded-xl p-6 text-center transition-colors cursor-pointer bg-slate-50 relative">
        <input
          type="file"
          accept=".pdf"
          onChange={(event) => onFileChange(event.target.files?.[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <FiUploadCloud className="w-8 h-8 text-sky-500 mx-auto mb-2" />
        {file ? (
          <div className="text-xs font-semibold text-slate-800 flex items-center justify-center gap-1.5">
            <FiFileText className="w-4 h-4 text-sky-600" />
            <span>{file.name}</span>
            <span className="text-slate-400">({(file.size / 1024).toFixed(0)} KB)</span>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold text-slate-700">
              Click to upload or drag & drop PDF
            </p>
            <p className="text-[11px] text-slate-400 mt-1">Maximum file size: 5MB</p>
          </>
        )}
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-bold text-slate-900">2. Target Job Description</h2>
        <textarea
          value={jobDescription}
          onChange={(event) => onJobDescriptionChange(event.target.value)}
          rows={6}
          placeholder="Paste the full job posting, key qualifications, and requirements here..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors resize-none font-sans"
        />
      </div>

      <button
        type="button"
        onClick={onStartSprint}
        disabled={!file || !jobDescription}
        className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
      >
        <span>Start AI Sprint</span>
        <FiArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
