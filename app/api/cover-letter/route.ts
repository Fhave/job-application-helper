import { streamObject } from 'ai';
import { google } from '@ai-sdk/google';
import { CoverLetterSchema } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { jobDescription, cvData, domainRelevance } = await req.json();

  if (!jobDescription || jobDescription.trim().length < 20) {
    return new Response('Please provide a valid, detailed job description.', { status: 400 });
  }
  if (!cvData) {
    return new Response('CV data is required to generate a cover letter.', { status: 400 });
  }
  if (domainRelevance?.verdict === 'mismatch') {
    return new Response(
      `This resume doesn't appear to be a strong match for this role (${domainRelevance.explanation}). Generating a cover letter isn't recommended for this pairing.`,
      { status: 422 }
    );
  }

  const formattedExperience =
    cvData.experience?.length > 0
      ? cvData.experience
          .map((exp: { role?: string; company?: string; period?: string; bulletPoints?: string[] }) => {
            const bullets = Array.isArray(exp.bulletPoints)
              ? exp.bulletPoints.map((b: string) => `  - ${b}`).join('\n')
              : '';
            return `Role: ${exp.role}\nCompany: ${exp.company} (${exp.period})\nHighlights:\n${bullets}`;
          })
          .join('\n\n')
      : 'No explicit experience provided.';

  const formattedEducation =
    cvData.education?.length > 0
      ? cvData.education
          .map(
            (edu: { degree?: string; institution?: string; year?: string | number }) =>
              `- ${edu.degree ?? 'N/A'} | ${edu.institution ?? 'N/A'} (${edu.year ?? 'N/A'})`
          )
          .join('\n')
      : 'No explicit education provided.';

  const skillsList = Array.isArray(cvData.skills) ? cvData.skills.join(', ') : 'N/A';

  const promptText = `
    TARGET JOB DESCRIPTION:
    ${jobDescription}

    CANDIDATE PROFILE:
    Name: ${cvData.fullName || 'Candidate'}
    Email: ${cvData.contactInfo?.email || ''}
    Location: ${cvData.contactInfo?.location || ''}
    Summary: ${cvData.summary || 'N/A'}
    Skills: ${skillsList}

    WORK EXPERIENCE:
    ${formattedExperience}

    EDUCATION:
    ${formattedEducation}
  `.trim();

  const result = streamObject({
    model: google('gemini-3.5-flash-lite'),
    schema: CoverLetterSchema,
    system: `You are an elite career consultant and executive resume writer.
      Write an authentic, persuasive, and job-targeted cover letter that directly
      connects the candidate's background to the employer's requirements.
      - Match exact experience from the candidate's background to the job responsibilities.
      - Avoid hyperbole, clichés, and vague statements.
      - Keep the tone professional, objective, and confident.
      - Never claim, imply, or invent a skill, technology, or responsibility not
        already present in the candidate's background.
      ${domainRelevance?.verdict === 'partial' ? `\n      Note: this candidate is only a partial match for this role (${domainRelevance.explanation}). Lean on genuinely transferable experience rather than overstating direct relevance.` : ''}`,
    prompt: promptText,
  });

  return result.toTextStreamResponse();
}