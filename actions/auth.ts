'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { resend } from '@/lib/resend';

export async function loginAction(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/');
  redirect('/dashboard');
}

export async function signupAction(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  await sendMagicLinkAction(email);

  revalidatePath('/');
  redirect('/dashboard');
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  revalidatePath('/');
  redirect('/auth');
}

export async function sendMagicLinkAction(email: string) {
  try {
    const supabaseAdmin = await createAdminClient();

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    if (error || !data.properties?.action_link) {
      return { error: 'Failed to generate authentication link.' };
    }

    await resend.emails.send({
      from: 'JobSprint AI <onboarding@resend.dev>',
      to: 'omosiyobo@gmail.com',
      // to: [email],
      subject: 'Your JobSprint AI Magic Link',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Log in to JobSprint AI</h2>
          <p>Click the link below to access your workspace:</p>
          <a href="${data.properties.action_link}" style="background: #0284c7; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; display: inline-block;">
            Sign In to JobSprint AI
          </a>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    return { error: err.message || 'Failed to send email.' };
  }
}