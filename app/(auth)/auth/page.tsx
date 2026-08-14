import { Suspense } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import Loader from '@/components/Loader';

export default function AuthPage() {
  return (
    <Suspense fallback={<Loader label="Loading..." />}>
      <AuthForm />
    </Suspense>
  );
}