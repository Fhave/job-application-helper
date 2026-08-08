import type { InputLikelinessResult } from '@/lib/types';

const RESUME_SIGNALS: RegExp[] = [
  /\b(experience|employment history|work history)\b/i,
  /\b(education|degree|university|college|b\.?sc|m\.?sc|bachelor|master)\b/i,
  /\b(skills|proficienc(y|ies)|competenc(y|ies))\b/i,
  /\b(summary|objective|profile)\b/i,
  /\b(certification|certified|licen[cs]e)\b/i,
  /[\w.+-]+@[\w-]+\.[\w.-]+/, // an email address
  /\b(19|20)\d{2}\s*[-–—to]+\s*((19|20)\d{2}|present|current)\b/i,
];

const JD_SIGNALS: RegExp[] = [
  /\b(responsibilities|duties)\b/i,
  /\b(requirements|qualifications)\b/i,
  /\b(we are looking for|we're looking for|join our team|about the role|about us)\b/i,
  /\b(position|role|job title)\b/i,
  /\b(salary|compensation|benefits)\b/i,
  /\b(apply now|how to apply|application)\b/i,
  /\byears? of experience\b/i,
];

function score(text: string, signals: RegExp[]): number {
  return signals.filter((re) => re.test(text)).length;
}

export function checkLooksLikeResume(text: string): InputLikelinessResult {
  const s = score(text, RESUME_SIGNALS);
  const reasons: string[] = [];
  if (text.trim().length < 100) reasons.push('The text is very short for a resume.');
  if (s === 0)
    reasons.push("It doesn't contain typical resume sections — experience, education, or skills.");

  return {
    isLikely: s >= 2 && text.trim().length >= 100,
    confidence: s >= 3 ? 'high' : s >= 1 ? 'medium' : 'low',
    reasons,
  };
}

export function checkLooksLikeJobDescription(text: string): InputLikelinessResult {
  const s = score(text, JD_SIGNALS);
  const reasons: string[] = [];
  if (text.trim().length < 100) reasons.push('The text is very short for a job description.');
  if (s === 0)
    reasons.push(
      "It doesn't contain typical job-posting language — responsibilities, requirements, or qualifications."
    );

  return {
    isLikely: s >= 1 && text.trim().length >= 100,
    confidence: s >= 2 ? 'high' : s >= 1 ? 'medium' : 'low',
    reasons,
  };
}
