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
    wrapper: 'bg-emerald-50 border-emerald-200',
    iconColor: 'text-emerald-600',
    textColor: 'text-emerald-900',
    label: 'Strong match',
  },
  partial: {
    icon: FiAlertTriangle,
    wrapper: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    textColor: 'text-amber-900',
    label: 'Partial match',
  },
  mismatch: {
    icon: FiXCircle,
    wrapper: 'bg-rose-50 border-rose-200',
    iconColor: 'text-rose-600',
    textColor: 'text-rose-900',
    label: 'Weak match',
  },
} as const;

function FitBanner({ domainRelevance }: { domainRelevance?: DomainRelevance }) {
  if (!domainRelevance?.verdict) return null;

  const style = VERDICT_STYLES[domainRelevance.verdict];
  const Icon = style.icon;

  return (
    <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${style.wrapper}`}>
      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${style.iconColor}`} />
      <div className="space-y-0.5">
        <p className={`text-xs font-bold ${style.textColor}`}>
          {style.label}
          {typeof domainRelevance.score === 'number' && (
            <span className="font-mono font-normal opacity-70"> · {domainRelevance.score}%</span>
          )}
        </p>
        {domainRelevance.explanation && (
          <p className={`text-xs leading-relaxed ${style.textColor} opacity-90`}>
            {domainRelevance.explanation}
          </p>
        )}
      </div>
    </div>
  );
}

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

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      <FitBanner domainRelevance={domainRelevance} />

      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Match Audit Analysis</h2>
          <p className="text-xs text-slate-400">Target Role: {targetRole}</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-mono font-bold text-emerald-600">{matchScore}%</span>
          <p className="text-[10px] font-mono text-slate-400 uppercase">Match Score</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
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

      {skillsList.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Detected Skill Clusters
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {skillsList.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200"
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
