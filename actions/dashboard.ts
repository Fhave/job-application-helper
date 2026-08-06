'use server';

import { createAdminClient } from '@/lib/supabase/server';
import { extractText, getDocumentProxy } from 'unpdf';

export async function uploadResumeAction(formData: FormData) {
  const file = formData.get('resume') as File;

  const supabaseAdmin = await createAdminClient();
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const filePath = `resumes/${Date.now()}-${file.name}`;

  const { data, error } = await supabaseAdmin.storage
    .from('job-sprint')
    .upload(filePath, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error || !data?.path) {
    return { error: error?.message || 'Upload failed.' };
  }

  const { data: fileData } = supabaseAdmin.storage
    .from('job-sprint')
    .getPublicUrl(data.path);

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