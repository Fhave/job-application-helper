import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import ToolsSection from '@/components/ToolsSection';
import TemplatesSection from '@/components/TemplatesSection';
import BeyondSection from '@/components/BeyondSection';
import ExamplesSection from '@/components/ExamplesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AdviceSection from '@/components/AdviceSection';
import FaqSection from '@/components/FaqSection';
import CtaBannerSection from '@/components/CtaBannerSection';
import Footer from '@/components/Footer';

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
