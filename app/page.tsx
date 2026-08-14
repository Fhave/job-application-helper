import React from 'react';
import Navbar from '@/components/landing-page/Navbar';
import HeroSection from '@/components/landing-page/HeroSection';
import StatsSection from '@/components/landing-page/StatsSection';
import ToolsSection from '@/components/landing-page/ToolsSection';
import TemplatesSection from '@/components/landing-page/TemplatesSection';
import BeyondSection from '@/components/landing-page/BeyondSection';
import ExamplesSection from '@/components/landing-page/ExamplesSection';
import TestimonialsSection from '@/components/landing-page/TestimonialsSection';
import AdviceSection from '@/components/landing-page/AdviceSection';
import FaqSection from '@/components/landing-page/FaqSection';
import CtaBannerSection from '@/components/landing-page/CtaBannerSection';
import Footer from '@/components/landing-page/Footer';

export default function Home() {
  return (
    <main className="w-full bg-white text-slate-900 font-sans antialiased min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ToolsSection />
      {/* <TemplatesSection /> */}
      <BeyondSection />
      {/* <ExamplesSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <AdviceSection /> */}
      <FaqSection />
      <CtaBannerSection />
      <Footer />
    </main>
  );
}
