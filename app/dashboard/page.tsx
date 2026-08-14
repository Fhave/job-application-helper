import { redirect } from 'next/navigation';
import DashboardPageClient from '@/components/dashboard/DashboardPageClient';
import { requireUser } from '@/lib/auth/requireUser';

export default async function DashboardPage() {
  const user = await requireUser();

  if (!user) {
    redirect('/auth');
  }

  return <DashboardPageClient />;
}
