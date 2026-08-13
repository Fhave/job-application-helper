'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { resend } from '@/lib/resend';
import { loginSchema, signupSchema, forgotPasswordSchema, resetPasswordSchema } from '@/lib/types';
import { clearSessionExpiryCookie, setSessionExpiryCookie } from '@/lib/auth/session';

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      error: Object.values(fieldErrors)[0]?.[0] ?? 'Check the fields below.',
      fieldErrors,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    if (error.message.toLowerCase().includes('email not confirmed')) {
      return {
        error: 'Your email isn’t verified yet. Check your inbox for the verification link.',
        code: 'email_not_confirmed' as const,
        email: parsed.data.email,
      };
    }
    return { error: error.message };
  }

  if (data.user && !data.user.email_confirmed_at) {
    await supabase.auth.signOut();
    await clearSessionExpiryCookie();

    return {
      error: 'Your email isn’t verified yet. Check your inbox for the verification link.',
      code: 'email_not_confirmed' as const,
      email: parsed.data.email,
    };
  }

  await setSessionExpiryCookie();

  revalidatePath('/', 'layout');
  redirect('/dashboard');
}

export async function signupAction(formData: FormData) {
  const parsed = signupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      error: Object.values(fieldErrors)[0]?.[0] ?? 'Check the fields below.',
      fieldErrors,
    };
  }

  const { name, email, password } = parsed.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } },
  });

  if (error) {
    return { error: error.message };
  }

  const emailResult = await sendVerificationEmail(email);
  if (emailResult.error) {
    return { error: emailResult.error };
  }

  return { success: true, checkEmail: true, email };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  await clearSessionExpiryCookie();
  revalidatePath('/', 'layout');
  redirect('/auth');
}

export async function resendVerificationAction(email: string) {
  return sendVerificationEmail(email);
}

export async function requestPasswordResetAction(formData: FormData) {
  const parsed = forgotPasswordSchema.safeParse({ email: formData.get('email') });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      error: Object.values(fieldErrors)[0]?.[0] ?? 'Enter a valid email address.',
      fieldErrors,
    };
  }

  const result = await sendPasswordResetEmail(parsed.data.email);
  if (result.error) {
    return { error: result.error };
  }

  return { success: true };
}

export async function updatePasswordAction(formData: FormData) {
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      error: Object.values(fieldErrors)[0]?.[0] ?? 'Check the fields below.',
      fieldErrors,
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/auth');
}

async function sendVerificationEmail(email: string) {
  try {
    const supabaseAdmin = await createAdminClient();

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
    });

    if (error || !data.properties?.action_link) {
      return { error: 'Failed to generate verification link.' };
    }

    await resend.emails.send({
      from: 'JobSprint AI <onboarding@resend.dev>',
      to: [email],
      subject: 'Verify your JobSprint AI account',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Confirm your email</h2>
          <p>Click below to verify your account and sign in to JobSprint AI:</p>
          <a href="${data.properties.action_link}" style="background: #0284c7; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; display: inline-block;">
            Verify my email
          </a>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error('Email verification error:', err);
    return { error: 'Failed to send verification email. Please check server configuration.' };
  }
}

async function sendPasswordResetEmail(email: string) {
  try {
    const supabaseAdmin = await createAdminClient();
    const siteUrl = process.env.NEXT_SITE_URL;

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: {
        redirectTo: `${siteUrl}/auth/reset-password`,
      },
    });

    if (error || !data.properties?.action_link) {
      return { error: 'Failed to generate reset link.' };
    }

    await resend.emails.send({
      from: 'JobSprint AI <onboarding@resend.dev>',
      to: [email],
      subject: 'Reset your JobSprint AI password',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Reset your password</h2>
          <p>Click below to choose a new password. This link expires soon, so use it right away.</p>
          <a href="${data.properties.action_link}" style="background: #0284c7; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; display: inline-block;">
            Reset my password
          </a>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error('Password reset error:', err);
    return { error: 'Failed to send password reset email.' };
  }
}
