import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | JobSprint AI',
  description: 'Sign in or create an account to access your job application pipeline.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
      <main className="min-h-screen">{children}</main>
    </div>
  );
}
