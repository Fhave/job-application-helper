import { z } from 'zod';

export type PipelineStep = 'input' | 'parsing' | 'analyzing' | 'ready' | 'lettering' | 'done';
export type DashboardTab = 'resume' | 'cover-letter';

export const InputLikelinessResultSchema = z.object({
  isLikely: z.boolean(),
  confidence: z.enum(['high', 'medium', 'low']),
  reasons: z.array(z.string()),
});
export type InputLikelinessResult = z.infer<typeof InputLikelinessResultSchema>;

export const AuditAndCVSchema = z.object({
  domainRelevance: z.object({
    verdict: z.enum(['strong', 'partial', 'mismatch']),
    score: z.number().min(0).max(100),
    explanation: z.string(),
  }),
  audit: z.object({
    targetRole: z.string(),
    matchScore: z.number().min(0).max(100),
    missingKeywords: z.array(z.string()),
    strongPoints: z.array(z.string()),
    skills: z.array(z.string()),
  }),
  generatedCV: z.object({
    fullName: z.string(),
    contactInfo: z.object({
      email: z.string(),
      phone: z.string().nullable(),
      location: z.string().nullable(),
      linkedin: z.string().nullable(),
      portfolio: z.string().nullable(),
    }),
    summary: z.string(),
    skills: z.array(z.string()),
    experience: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        location: z.string().nullable(),
        period: z.string(),
        bulletPoints: z.array(z.string()),
      })
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        location: z.string().nullable(),
        year: z.string(),
        details: z.string().nullable(),
      })
    ),
    projects: z
      .array(
        z.object({
          title: z.string(),
          technologies: z.array(z.string()),
          description: z.string(),
          link: z.string().nullable(),
        })
      )
      .nullable(),
  }),
});
export type AuditAndCVResponse = z.infer<typeof AuditAndCVSchema>;

export const CoverLetterSchema = z.object({
  recipient: z.object({
    hiringManagerName: z.string().nullable(),
    companyName: z.string().nullable(),
    roleTitle: z.string(),
  }),
  salutation: z.string(),
  paragraphs: z.object({
    opening: z.string(),
    bodyParagraph1: z.string(),
    bodyParagraph2: z.string(),
    closing: z.string(),
  }),
  signOff: z.string(),
  candidateName: z.string(),
});
export type CoverLetterData = z.infer<typeof CoverLetterSchema>;


export interface DomainRelevance {
  verdict: 'strong' | 'partial' | 'mismatch';
  score: number;
  explanation: string;
}