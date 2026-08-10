'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiChevronDown as ChevronDown, FiMenu as Menu, FiX as X } from 'react-icons/fi';
import Logo from '@/components/Logo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  const navItems = [
    {
      label: 'Resume Templates',
      dropdown: ['Professional', 'Creative', 'Modern', 'Simple'],
    },
    {
      label: 'Resume Examples',
      dropdown: ['Software Engineer', 'Product Manager', 'Data Analyst', 'Marketing Specialist'],
    },
    {
      label: 'Cover Letter',
      dropdown: ['Cover Letter Builder', 'Cover Letter Examples', 'Cover Letter Templates'],
    },
    { label: 'FAQ', href: '/#' },
    {
      label: 'Resources',
      dropdown: ['Career Blog', 'Interview Prep', 'Salary Calculator'],
    },
  ];

  return (
    <nav className="max-w-8xl mx-auto px-6 h-20 flex items-center justify-between relative">
      <Link href="/#" className="flex items-center gap-2 group">
        <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
        <span className="text-2xl font-black tracking-tight text-slate-900">
          Job <span className="text-sky-500">Sprint AI</span>
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-7">
        {/* Nav Links */}
        <div className="flex items-center gap-7 text-lg font-regular text-black">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center gap-1 hover:text-sky-600 transition py-2"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Desktop Dropdown Submenu */}
                  <div className="absolute top-full left-0 hidden group-hover:block w-48 bg-white border border-slate-200 rounded-xl shadow-lg py-2 z-50">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem}
                        href="/#"
                        className="block px-4 py-2 text-md font-semibold text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link href="/#" className="hover:text-sky-600 transition py-2">
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Vertical Separator Line */}
        <div className="h-5 w-[1px] bg-slate-200 shrink-0" aria-hidden="true" />

        {/* Auth Buttons */}
        <div className="flex items-center gap-5">
          <Link href="/auth" className="text-lg font-semibold text-sky-500 hover:text-sky-600">
            Sign in
          </Link>
          <Link
            href="/auth"
            className="bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold px-5 py-2.5 rounded-sm shadow-xs transition inline-flex items-center"
          >
            Create my resume
          </Link>
        </div>
      </div>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 text-slate-700 hover:text-sky-600 focus:outline-none"
        aria-label="Toggle Navigation Menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-xl py-6 px-6 flex flex-col gap-4 md:hidden z-50">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-slate-100 pb-3">
              {item.dropdown ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className="flex items-center justify-between w-full text-lg font-semibold text-slate-700 py-1"
                  >
                    <span>{item.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Mobile Dropdown */}
                  {activeDropdown === item.label && (
                    <div className="pl-4 mt-2 flex flex-col gap-2 border-l-2 border-sky-100">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem}
                          href="/#"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-medium text-slate-600 hover:text-sky-600 py-1"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/#"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-lg font-semibold text-slate-700 py-1"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-lg font-semibold text-sky-500 py-2.5 rounded-sm border border-sky-100 hover:bg-sky-50 transition"
            >
              Sign in
            </Link>
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center bg-sky-500 hover:bg-sky-600 text-white text-lg font-bold py-3 rounded-sm shadow-xs transition"
            >
              Create my resume
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}