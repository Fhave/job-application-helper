import { requireUser } from '@/lib/auth/requireUser';
import { streamObject } from 'ai';
import { google } from '@ai-sdk/google';
import { CoverLetterSchema } from '@/lib/types';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const user = await requireUser();

  if (!user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { jobDescription, cvData, domainRelevance } = await req.json();

  if (!jobDescription || jobDescription.trim().length < 20) {
    return new Response('Please provide a valid, detailed job description.', { status: 400 });
  }
  if (!cvData) {
    return new Response('CV data is required to generate a cover letter.', { status: 400 });
  }
  if (domainRelevance?.verdict === 'mismatch') {
    return new Response(
      `This resume doesn't appear to be a strong match for this role. Generating a cover letter isn't recommended for this pairing.`,
      { status: 422 }
    );
  }

  const formattedExperience =
    cvData.experience?.length > 0
      ? cvData.experience
          .map(
            (exp: {
              role?: string;
              company?: string;
              period?: string;
              bulletPoints?: string[];
            }) => {
              const bullets = Array.isArray(exp.bulletPoints)
                ? exp.bulletPoints.map((b: string) => `  - ${b}`).join('\n')
                : '';
              return `Role: ${exp.role}\nCompany: ${exp.company} (${exp.period})\nHighlights:\n${bullets}`;
            }
          )
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
    system: `You are an elite career consultant and executive cover letter writer, the kind
      hiring managers actually remember. You write letters candidates would pay good money
      for — sharp, specific, and impossible to mistake for a template.

      BANNED — never use these, or anything that reads like them:
      - "Dear Hiring Manager," as a filler salutation when the company name is known
      - "I am writing to express my interest in..." / "I am excited to apply for..."
      - "team player," "hard worker," "proven track record," "passionate about," "detail-oriented"
      - "I look forward to hearing from you" as a standalone, generic closing line
      - Any sentence that could be copy-pasted into a letter for a different company
        without changing a single word

      SALUTATION:
      - If a hiring manager's name is identifiable, use it: "Dear [Name],"
      - If not, address the company or team directly, never the generic title:
        "Dear ${'${'}companyName${'}'} Hiring Team," — not "Dear Hiring Manager,"

      OPENING PARAGRAPH — this is a hook, not an introduction:
      - Lead with a specific, quantified accomplishment or a sharp, concrete observation
        about the company/role — never a statement of intent to apply.
      - Weak (never write this): "I am writing to apply for the Senior Marketing Manager
        role at Northwind Outdoor. I believe my skills make me a strong candidate."
      - Strong (write like this): "In six months, I took Northwind Outdoor's organic social
        channels from an afterthought to a 42% growth engine — the exact kind of ownership
        this Senior Marketing Manager role is asking for."
      - The hook must be built from the candidate's REAL accomplishments and REAL details
        from the job description — never invented, never generic enough to swap companies.

      BODY PARAGRAPHS:
      - Every claim ties to a specific accomplishment, metric, or responsibility already
        in the candidate's background — reference the job description's actual language
        back at it, don't just restate the resume.
      - Show reasoning, not adjectives: instead of "I am a strategic thinker," show the
        strategic decision and its result.

      CLOSING:
      - End with a confident, specific call to action tied to what the company is trying
        to solve — not a passive "I look forward to hearing from you."
      - Example direction: naming what you'd want to discuss first in an interview, or
        what you'd tackle in the first 90 days — something that shows you've actually
        thought about their problem, not just your own candidacy.

      ABSOLUTE CONSTRAINT — this does not get relaxed for the sake of a better hook:
      Never claim, imply, or invent a skill, technology, responsibility, or accomplishment
      not already present in the candidate's background. A sharp, specific letter built
      entirely on real facts beats a generic one every time — that's the whole point.
      Being memorable and being truthful are not in tension here; do both.

      ${domainRelevance?.verdict === 'partial' ? `\n  Note: this candidate is only a partial match for this role (${domainRelevance.explanation}). Lean on genuinely transferable experience rather than overstating direct relevance — the hook can still be sharp without pretending the fit is stronger than it is.` : ''}`,
    prompt: promptText,
  });

  return result.toTextStreamResponse();
}
