'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { extractText, getDocumentProxy } from 'unpdf';
// import { generateObject } from 'ai';
// import { google } from '@ai-sdk/google';
// import type { CVData } from '@/components/dashboard/DashboardDisplay';
// import type { DomainRelevance } from '@/lib/types'

export async function uploadResumeAction(formData: FormData) {
  const file = formData.get('resume') as File;

  const supabaseAdmin = await createAdminClient();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filePath = `resumes/${Date.now()}-${file.name}`;

  const { data, error } = await supabaseAdmin.storage.from('job-sprint').upload(filePath, buffer, {
    contentType: file.type,
    upsert: true,
  });

  if (error || !data?.path) {
    return { error: error?.message || 'Upload failed.' };
  }

  const { data: fileData } = supabaseAdmin.storage.from('job-sprint').getPublicUrl(data.path);

  return { url: fileData.publicUrl };
}

export async function parsePDFAction(formData: FormData) {
  const file = formData.get('resume') as File;

  if (!file) {
    return { error: 'No file provided.' };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));
    const { text, totalPages } = await extractText(pdf, { mergePages: true });

    return { text, totalPages };
  } catch (error) {
    console.error('PDF Parsing Error:', error);
    return {
      error: error instanceof Error ? error.message : 'Failed to parse PDF file.',
    };
  }
}

// export async function analyzeInputsandGenerateCV(formData: FormData) {
//   try {
//     const jobDescription = formData.get('jobDescription') as string;
//     const resumeText = formData.get('resumeText') as string | null;

//     if (!resumeText?.trim() || !jobDescription?.trim()) {
//       return {
//         success: false,
//         error: 'Both resume content and job description are required for analysis.',
//       };
//     }

//     const { object } = await generateObject({
//       model: google('gemini-3.5-flash-lite'),
//       schema: AuditAndCVSchema,
//       system: `You are an expert career consultant and ATS optimizer.

//         FIRST, assess whether the candidate's background is genuinely relevant to the
//         target job description — a different seniority level or adjacent specialty within
//         the same field still counts as relevant; a fundamentally different field does not.
//         Report this honestly in the domainRelevance field, even if the match is weak.

//         THEN, analyze all provided work history and education background. Do NOT drop or
//         omit past jobs or degrees. Tailor each listed position and education entry to
//         highlight genuinely relevant accomplishments and technologies.

//         CRITICAL: Never invent, exaggerate, or imply a skill, technology, or responsibility
//         the candidate's resume does not already support. If the resume is a weak or poor
//         match for the role, say so plainly in domainRelevance rather than stretching the
//         rewrite to manufacture a fit that isn't there. Rephrasing and reordering existing,
//         true experience is always fine; adding anything new is not.`,
//       prompt: `
//         JOB DESCRIPTION:
//         ${jobDescription}

//         CANDIDATE RESUME TEXT:
//         ${resumeText}
//       `,
//     });

//     return {
//       success: true,
//       data: object,
//     };
//   } catch (err) {
//     console.error('Analysis failed:', err);
//     return {
//       success: false,
//       error: err instanceof Error ? err.message : 'Failed to analyze resume and generate CV.',
//     };
//   }
// }

// export async function generateCoverLetterAction(
//   jobDescription: string,
//   cvData: CVData,
//   domainRelevance?: DomainRelevance
// ) {
//   try {
//     if (!jobDescription || jobDescription.trim().length < 20) {
//       return {
//         success: false,
//         error: 'Please provide a valid, detailed job description.',
//       };
//     }

//     if (!cvData) {
//       return {
//         success: false,
//         error: 'CV data is required to generate a cover letter.',
//       };
//     }

//     if (domainRelevance?.verdict === 'mismatch') {
//       return {
//         success: false,
//         error: `This resume doesn't appear to be a strong match for this role (${domainRelevance.explanation}). Generating a cover letter isn't recommended for this pairing.`,
//       };
//     }

//     const formattedExperience =
//       cvData.experience && cvData.experience.length > 0
//         ? cvData.experience
//             .map((exp) => {
//               const bullets = Array.isArray(exp.bulletPoints)
//                 ? exp.bulletPoints.map((b) => `  - ${b}`).join('\n')
//                 : '';
//               return `Role: ${exp.role}\nCompany: ${exp.company} (${exp.period})\nHighlights:\n${bullets}`;
//             })
//             .join('\n\n')
//         : 'No explicit experience provided.';

//     const formattedEducation =
//       cvData.education && cvData.education.length > 0
//         ? cvData.education
//             .map((edu) => `- ${edu.degree} | ${edu.institution} (${edu.year})`)
//             .join('\n')
//         : 'No explicit education provided.';

//     const skillsList = Array.isArray(cvData.skills) ? cvData.skills.join(', ') : 'N/A';
//     const location = cvData.contactInfo?.location || '';
//     const email = cvData.contactInfo?.email || '';

//     const promptText = `
//       TARGET JOB DESCRIPTION:
//       ${jobDescription}

//       CANDIDATE PROFILE:
//       Name: ${cvData.fullName || 'Candidate'}
//       Email: ${email}
//       Location: ${location}
//       Summary: ${cvData.summary || 'N/A'}
//       Skills: ${skillsList}

//       WORK EXPERIENCE:
//       ${formattedExperience}

//       EDUCATION:
//       ${formattedEducation}
//           `.trim();

//     const { object } = await generateObject({
//       model: google('gemini-3.5-flash-lite'),
//       schema: CoverLetterSchema,
//       system: `You are an elite career consultant and executive resume writer.
//         Write an authentic, persuasive, and job-targeted cover letter that directly
//         connects the candidate's background to the employer's requirements.
//         - Match exact experience from the candidate's background to the job responsibilities.
//         - Avoid hyperbole, clichés, and vague statements.
//         - Keep the tone professional, objective, and confident.
//         - Never claim, imply, or invent a skill, technology, or responsibility not
//           already present in the candidate's background — if the connection is
//           genuinely weak, write around it honestly rather than manufacturing it.
//         ${domainRelevance?.verdict === 'partial' ? `\n        Note: this candidate is only a partial match for this role (${domainRelevance.explanation}). Lean on genuinely transferable experience rather than overstating direct relevance.` : ''}`,
//       prompt: promptText,
//     });

//     return {
//       success: true,
//       data: object,
//     };
//   } catch (err) {
//     const errorMessage = err instanceof Error ? err.message : 'Failed to generate cover letter.';
//     console.error('Cover Letter Generation Error:', err);
//     return { success: false, error: errorMessage };
//   }
// }
