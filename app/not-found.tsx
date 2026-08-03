import Link from 'next/link';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';
import Logo from '@/components/Logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans relative">
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
          <span className="text-xl font-display font-extrabold tracking-tight text-slate-900">
            JobSprint <span className="text-sky-500">AI</span>
          </span>
        </Link>
      </div>

      <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm text-center relative mt-16 sm:mt-0">
        <div className="relative inline-block mb-4">
          <span className="text-7xl sm:text-8xl font-black font-mono text-slate-100 select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-mono font-bold bg-sky-100 text-sky-700 px-3 py-1 rounded-xl uppercase tracking-wider">
              Page Not Found
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 mb-3">
          Looks like this route sprinted away
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto mb-8">
          The page you are looking for doesn't exist, was moved, or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-xs group"
          >
            <FiHome className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>

          <Link
            href="/#"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs py-3 px-6 rounded-xl transition-all"
          >
            <FiSearch className="w-4 h-4 text-slate-400" />
            <span>Browse Templates</span>
          </Link>
        </div>
      </div>

      <p className="mt-8 text-xs text-slate-400">
        Need help? Check our{' '}
        <Link href="/#" className="text-sky-600 hover:underline font-semibold">
          FAQ
        </Link>{' '}
        or back to safety.
      </p>
    </div>
  );
}
