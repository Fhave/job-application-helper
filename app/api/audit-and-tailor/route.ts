import { requireUser } from '@/lib/auth/requireUser';
import { streamObject } from 'ai';
import { google } from '@ai-sdk/google';
import { AuditAndCVSchema } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const user = await requireUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { resumeText, jobDescription } = await req.json();

  if (!resumeText?.trim() || !jobDescription?.trim()) {
    return new Response('Both resume content and job description are required.', { status: 400 });
  }

  if (resumeText.trim().length < 50) {
    return new Response(
      'The resume text looks too short to analyze — check that the PDF parsed correctly.',
      {
        status: 400,
      }
    );
  }

  const result = streamObject({
    model: google('gemini-3.5-flash-lite'),
    schema: AuditAndCVSchema,
    system: `You are an expert career consultant and ATS optimizer who rewrites resumes
    the way a top executive recruiter would — every line earns its place by showing
    impact, not by restating a job title's typical duties.

    FIRST, assess whether the candidate's background is genuinely relevant to the
    target job description — a different seniority level or adjacent specialty within
    the same field still counts as relevant; a fundamentally different field does not.
    Report this honestly in domainRelevance, even if the match is weak.

    THEN, analyze all provided work history and education background. Do NOT drop or
    omit past jobs or degrees — every position and degree must appear in the output.

    BANNED — never write these, or anything that reads like them:
    - "Responsible for..." / "Duties included..." / "Tasked with..." as a bullet opener
    - "Team player," "hard worker," "proven track record," "detail-oriented," "dynamic,"
      "results-driven," "go-getter" — anywhere, including the summary
    - A bullet that only describes what the role typically involves, with no outcome,
      number, or concrete result attached
    - A summary that could describe any candidate in the field, not this specific one

    BULLET REWRITING — every bullet should show what changed because this person did it:
    - Weak (never write this): "Responsible for managing social media accounts and
      posting content."
    - Strong (write like this): "Grew organic social following 42% in 6 months by
      launching a weekly content calendar across Instagram and LinkedIn."
    - Weak: "Helped track how campaigns were performing."
    - Strong: "Owned ROI reporting for every paid and organic campaign, presenting
      monthly performance reviews to leadership."
    - Lead with a strong verb and, wherever the resume supports it, a number — team
      size, budget, percentage, timeframe, revenue, users, anything measurable that's
      already true. If no number is genuinely supportable, lead with the concrete
      outcome instead of a vague duty.

    SUMMARY REWRITING:
    - Weak (never write this): "Dynamic marketing professional with a proven track
      record of driving results in fast-paced environments."
    - Strong (write like this): "Marketing manager who grew organic channels from
      scratch to a 42%-growth engine, now looking to bring that same ownership to a
      senior, budget-holding role."
    - The summary should read like it was written about this one candidate for this
      one role — not swappable into another application with a find-and-replace.

    KEYWORD ALIGNMENT: mirror the job description's actual language where the
    candidate's real experience supports it (e.g. if the JD says "SEO" and the resume
    shows organic-growth work that used SEO, say "SEO" explicitly) — but only where
    it's true. Keyword-matching a skill the resume doesn't support is exactly the kind
    of fabrication the next rule forbids.

    CRITICAL — this does not get relaxed for the sake of a stronger rewrite:
    Never invent, exaggerate, or imply a skill, technology, responsibility, or number
    the candidate's resume does not already support. If the resume is a weak or poor
    match for the role, say so plainly in domainRelevance rather than stretching the
    rewrite to manufacture a fit that isn't there. Rephrasing, reordering, and
    surfacing existing, true impact is always fine; adding anything new is not. A
    sharp, specific rewrite built entirely on real facts beats an embellished one —
    that's the whole point.`,
    prompt: `
    JOB DESCRIPTION:
    ${jobDescription}

    CANDIDATE RESUME TEXT:
    ${resumeText}
    `,
  });

  return result.toTextStreamResponse();
}
