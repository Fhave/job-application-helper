'use client';

import React from 'react';
import Link from 'next/link';
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
} from 'react-icons/fa6';
import Logo from '@/components/Logo';

const RESUME_LINKS = [
  { title: 'AI Resume Builder', href: '/resume-builder' },
  { title: 'ATS Scorer', href: '/ats-scorer' },
  { title: 'Resume Examples', href: '/resume-examples' },
  { title: 'Resume Templates', href: '/resume-templates' },
];

const COVER_LETTER_LINKS = [
  { title: 'Cover Letter Examples', href: '/cover-letter-examples' },
  { title: 'Cover Letter Templates', href: '/cover-letter-templates' },
];

const JOB_SEEKER_LINKS = [{ title: 'Job Search', href: '/jobs' }];

const RESOURCE_LINKS = [
  { title: 'Blog', href: '/blog' },
  { title: 'Resume Help', href: '/help' },
  { title: 'Job Interview', href: '/interview-prep' },
  { title: 'Career', href: '/career-advice' },
  { title: 'Writing A Resume', href: '/writing-a-resume' },
  { title: 'Writing A Cover Letter', href: '/writing-a-cover-letter' },
];

const COMPANY_LINKS = [
  { title: 'About Us', href: '/about' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Updates', href: '/updates' },
  { title: 'Sponsorship Program', href: '/sponsorship' },
  { title: 'Media Kit', href: '/media-kit' },
  { title: 'Affiliates', href: '/affiliates' },
];

const SUPPORT_LINKS = [
  { title: 'FAQ', href: '/faq' },
  { title: 'Contact Us', href: '/contact' },
  { title: 'Terms Of Service', href: '/terms' },
  { title: 'Privacy', href: '/privacy' },
  { title: 'Right Of Withdrawal', href: '/withdrawal' },
  { title: 'Do Not Sell, Do Not Share', href: '/do-not-sell' },
];

const SOCIAL_LINKS = [
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaFacebookF, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok' },
  { icon: FaPinterestP, href: 'https://pinterest.com', label: 'Pinterest' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f141d] text-slate-300 pt-16 pb-12 font-sans border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 */}
          <div className="lg:col-span-1 space-y-2">
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
              <span className="text-xl font-bold text-white tracking-tight">Job Sprint AI</span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resume</h4>
              <ul className="space-y-2.5 text-sm font-semibold text-slate-200">
                {RESUME_LINKS.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="hover:text-sky-400 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Cover Letter
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold text-slate-200">
                {COVER_LETTER_LINKS.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="hover:text-sky-400 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Job Seekers
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold text-slate-200">
                {JOB_SEEKER_LINKS.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="hover:text-sky-400 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Resources
              </h4>
              <ul className="space-y-2.5 text-sm font-semibold text-slate-200">
                {RESOURCE_LINKS.map((link) => (
                  <li key={link.title}>
                    <Link href={link.href} className="hover:text-sky-400 transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Our Company
            </h4>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-200">
              {COMPANY_LINKS.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="hover:text-sky-400 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5 */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-sm font-semibold text-slate-200">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="hover:text-sky-400 transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy-choices"
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                >
                  Your Privacy Choices
                  <span className="inline-flex items-center bg-blue-600 text-white text-[9px] px-1 py-0.2 rounded-full font-bold">
                    ✓×
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-slate-800/80 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Social Media Links */}
          <div className="space-y-2 text-center lg:text-left">
            <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Join Us On Social Media
            </h5>
            <div className="flex items-center gap-2.5 pt-1">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                >
                  <item.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright Text */}
          <div className="text-xs text-slate-500">Copyright 2026 - JobSprint AI</div>
        </div>
      </div>
    </footer>
  );
}
