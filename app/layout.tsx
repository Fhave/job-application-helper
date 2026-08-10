import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/app/globals.css';

const ttCommons = localFont({
  src: [
    {
      path: './fonts/tt-commons/TT Commons Thin.otf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/tt-commons/TT Commons Thin Italic.otf',
      weight: '100',
      style: 'italic',
    },
    {
      path: './fonts/tt-commons/TT Commons ExtraLight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/tt-commons/TT Commons ExtraLight Italic.otf',
      weight: '200',
      style: 'italic',
    },
    {
      path: './fonts/tt-commons/TT Commons Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/tt-commons/TT Commons Light Italic.otf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/tt-commons/TT Commons Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/tt-commons/TT Commons Italic.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/tt-commons/TT Commons Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/tt-commons/TT Commons Medium Italic.otf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/tt-commons/TT Commons DemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/tt-commons/TT Commons DemiBold Italic.otf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/tt-commons/TT Commons Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/tt-commons/TT Commons Bold Italic.otf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/tt-commons/TT Commons ExtraBold.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/tt-commons/TT Commons ExtraBold Italic.otf',
      weight: '800',
      style: 'italic',
    },
    {
      path: './fonts/tt-commons/TT Commons Black.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/tt-commons/TT Commons Black Italic.otf',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-tt-commons',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JobSprint AI',
  description: 'AI-powered job application pipeline and resume tailorer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ttCommons.variable}>
      <body className="font-sans bg-slate-50 text-slate-900 antialiased min-h-screen">{children}</body>
    </html>
  );
}
