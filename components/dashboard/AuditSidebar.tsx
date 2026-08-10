'use client';

import { FiAlertCircle, FiCheckCircle, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

export interface DomainRelevance {
  verdict?: 'strong' | 'partial' | 'mismatch';
  score?: number;
  explanation?: string;
}

export interface AuditSidebarProps {
  targetRole?: string;
  matchScore?: number;
  missingKeywords?: Array<string | undefined>;
  strongPoints?: Array<string | undefined>;
  skills?: Array<string | undefined>;
  domainRelevance?: DomainRelevance;
}

const VERDICT_STYLES = {
  strong: {
    icon: FiCheckCircle,
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    iconColor: 'text-emerald-600',
    scoreColor: 'text-emerald-600',
    label: 'Strong Match',
  },
  partial: {
    icon: FiAlertTriangle,
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
    iconColor: 'text-amber-600',
    scoreColor: 'text-amber-600',
    label: 'Partial Match',
  },
  mismatch: {
    icon: FiXCircle,
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
    iconColor: 'text-rose-600',
    scoreColor: 'text-rose-600',
    label: 'Weak Match',
  },
} as const;

export default function AuditSidebar({
  targetRole,
  matchScore,
  missingKeywords = [],
  strongPoints = [],
  skills = [],
  domainRelevance,
}: AuditSidebarProps) {
  const missingKeywordsList = missingKeywords.filter(
    (keyword): keyword is string => typeof keyword === 'string' && keyword.length > 0
  );
  const strongPointsList = strongPoints.filter(
    (point): point is string => typeof point === 'string' && point.length > 0
  );
  const skillsList = skills.filter(
    (skill): skill is string => typeof skill === 'string' && skill.length > 0
  );

  const verdictKey = domainRelevance?.verdict || 'partial';
  const verdictStyle = VERDICT_STYLES[verdictKey];
  const VerdictIcon = verdictStyle.icon;
  const displayScore = matchScore ?? domainRelevance?.score;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      {/* Combined Match Audit & Fit Header */}
      <div className="border-b border-slate-100 pb-5 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Match Audit Analysis</h2>
              {domainRelevance?.verdict && (
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${verdictStyle.badgeBg}`}
                >
                  <VerdictIcon className="w-3 h-3 shrink-0" />
                  {verdictStyle.label}
                </span>
              )}
            </div>
            {targetRole && (
              <p className="text-xs text-slate-500 font-medium">
                Target Role: <span className="text-slate-800 font-semibold">{targetRole}</span>
              </p>
            )}
          </div>

          {typeof displayScore === 'number' && (
            <div className="text-right shrink-0">
              <span className={`text-2xl  font-bold ${verdictStyle.scoreColor}`}>
                {displayScore}%
              </span>
              <p className="text-[10px]  text-slate-400 uppercase tracking-tight">Match Score</p>
            </div>
          )}
        </div>

        {domainRelevance?.explanation && (
          <p className="text-xs leading-relaxed text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            {domainRelevance.explanation}
          </p>
        )}
      </div>

      {/* Gap Assessment */}
      <div className="space-y-3">
        <h3 className="text-xs  font-bold text-slate-400 uppercase tracking-wider">
          Gap Assessment
        </h3>

        {missingKeywordsList.length > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5">
            <FiAlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Missing Keywords:</strong> {missingKeywordsList.join(', ')}.
            </p>
          </div>
        )}

        {strongPointsList.length > 0 && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5">
            <FiCheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-xs text-emerald-900 leading-relaxed">
              <strong>Strong Alignment:</strong> {strongPointsList.join(', ')}.
            </p>
          </div>
        )}
      </div>

      {/* Skill Clusters */}
      {skillsList.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs  font-bold text-slate-400 uppercase tracking-wider">
            Detected Skill Clusters
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((tag) => (
              <span
                key={tag}
                className="text-[11px]  font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
