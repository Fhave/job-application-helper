'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient, createAdminClient } from '@/lib/supabase/server';
import { resend } from '@/lib/resend';
import { loginSchema, signupSchema, forgotPasswordSchema, resetPasswordSchema } from '@/lib/types';
import { clearSessionExpiryCookie, setSessionExpiryCookie } from '@/lib/auth/session';
import { VerificationEmailTemplate } from '@/components/email-templates/Verification';
import { ResetPasswordEmailTemplate } from '@/components/email-templates/PasswordReset';

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
        error: 'Your email isnt verified yet. Check your inbox for the verification link.',
        code: 'email_not_confirmed' as const,
        email: parsed.data.email,
      };
    }
    return { error: error.message };
  }

  const userIsVerified =
    Boolean(data.user?.email_confirmed_at) ||
    Boolean(data.user?.confirmed_at);

  if (data.user && !userIsVerified) {
    await supabase.auth.signOut();
    await clearSessionExpiryCookie();

    return {
      error: 'Your email isnt verified yet. Check your inbox for the verification link.',
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

  const supabaseAdmin = await createAdminClient();

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: false,
    user_metadata: { full_name: name },
  });

  if (error) {
    return { error: error.message };
  }

  const emailResult = await sendVerificationEmail(email, password);
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
  return { success: true };
}

export async function resendVerificationAction(email: string, password: string) {
  return sendVerificationEmail(email, password);
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

  await supabase.auth.signOut();
  await clearSessionExpiryCookie();

  revalidatePath('/', 'layout');
  redirect('/auth?password_updated=true');
}

async function sendVerificationEmail(email: string, password: string) {
  try {
    const supabaseAdmin = await createAdminClient();
    const siteUrl = process.env.NEXT_SITE_URL;

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'signup',
      email,
      password,
      options: {
        redirectTo: `${siteUrl}/auth?verified=true`,
      },
    });

    if (error || !data.properties?.action_link) {
      return { error: 'Failed to generate verification link.' };
    }

    const actionUrl = data.properties.action_link;

    await resend.emails.send({
      from: 'JobSprint AI <onboarding@resend.dev>',
      to: [email],
      subject: 'Verify your JobSprint AI account',
      react: <VerificationEmailTemplate actionUrl={actionUrl}/>,
    });

    return { success: true };
  } catch (err) {
    console.error('Email verification error:', err);
    return { error: 'Failed to send verification email.' };
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

    const actionUrl = data.properties.action_link;

    await resend.emails.send({
      from: 'JobSprint AI <onboarding@resend.dev>',
      to: [email],
      subject: 'Reset your JobSprint AI password',
      react: <ResetPasswordEmailTemplate actionUrl={actionUrl} />,
    });

    return { success: true };
  } catch (err) {
    console.error('Password reset error:', err);
    return { error: 'Failed to send password reset email.' };
  }
}
