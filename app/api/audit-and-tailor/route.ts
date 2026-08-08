import { streamObject } from 'ai';
import { google } from '@ai-sdk/google';
import { AuditAndCVSchema } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { resumeText, jobDescription } = await req.json();

  if (!resumeText?.trim() || !jobDescription?.trim()) {
    return new Response('Both resume content and job description are required.', { status: 400 });
  }

  if (resumeText.trim().length < 50) {
    return new Response('The resume text looks too short to analyze — check that the PDF parsed correctly.', {
      status: 400,
    });
  }

  const result = streamObject({
    model: google('gemini-3.5-flash-lite'),
    schema: AuditAndCVSchema,
    system: `You are an expert career consultant and ATS optimizer.

      FIRST, assess whether the candidate's background is genuinely relevant to the
      target job description — a different seniority level or adjacent specialty within
      the same field still counts as relevant; a fundamentally different field does not.
      Report this honestly in domainRelevance, even if the match is weak.

      THEN, analyze all provided work history and education background. Do NOT drop or
      omit past jobs or degrees. Tailor each listed position and education entry to
      highlight genuinely relevant accomplishments and technologies.

      CRITICAL: Never invent, exaggerate, or imply a skill, technology, or responsibility
      the candidate's resume does not already support. If the resume is a weak or poor
      match for the role, say so plainly in domainRelevance rather than stretching the
      rewrite to manufacture a fit that isn't there. Rephrasing and reordering existing,
      true experience is always fine; adding anything new is not.`,
    prompt: `
      JOB DESCRIPTION:
      ${jobDescription}

      CANDIDATE RESUME TEXT:
      ${resumeText}
    `,
  });

  return result.toTextStreamResponse();
}