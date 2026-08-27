'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en');

  // Read current translated language cookie on mount
  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z]{2,3})/i);
      if (match && match[1]) {
        setSelectedLang(match[1].toLowerCase());
      }
    } catch (e) {
      console.error('Error reading language cookie:', e);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLang(langCode);

    try {
      // 1. Set cookie for all domain variants
      const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `googtrans=/en/${langCode}; expires=${expires}; path=/;`;
      
      const hostname = window.location.hostname;
      if (hostname && !hostname.includes('localhost') && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
        const parts = hostname.split('.');
        if (parts.length > 1) {
          const rootDomain = parts.slice(-2).join('.');
          document.cookie = `googtrans=/en/${langCode}; expires=${expires}; path=/; domain=.${rootDomain};`;
        }
        document.cookie = `googtrans=/en/${langCode}; expires=${expires}; path=/; domain=.${hostname};`;
      }

      // 2. Trigger Google Translate native combo if present
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
      if (combo) {
        combo.value = langCode;
        combo.dispatchEvent(new Event('change'));
      }

      // 3. Reload page to ensure complete App Router translation
      setTimeout(() => {
        window.location.reload();
      }, 150);
    } catch (err) {
      console.error('Language switch error:', err);
      window.location.reload();
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Breeds', href: '/breeds' },
    { name: 'Premium', href: '/premium' },
    { name: 'Payment', href: '/payment' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-40 border-b border-slate-200/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative overflow-hidden rounded-full border-2 border-green-600/30 shadow-sm p-0.5 group-hover:scale-105 transition transform">
            <img 
              src="/2.jpeg" 
              alt="BakriWala Logo" 
              className="h-10 w-10 object-contain rounded-full bg-slate-100" 
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              BakriWala<span className="text-green-700">Official</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase hidden sm:block">
              India's Premier Goat Farming Platform
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 font-semibold text-sm">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3.5 py-2 rounded-lg transition-all duration-200 ${
                  active
                    ? 'text-green-800 bg-green-50 font-bold border border-green-200/80 shadow-xs'
                    : 'text-slate-700 hover:text-green-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-slate-300 shadow-xs hover:border-green-600 focus-within:border-green-600 transition">
            <span className="text-sm">🌐</span>
            <select
              value={selectedLang}
              onChange={(e) => handleLanguageChange(e.target.value)}
              aria-label="Select Language"
              className="bg-transparent text-xs font-bold text-slate-800 outline-none cursor-pointer pr-1"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="bn">বাংলা (Bengali)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="ur">اردو (Urdu)</option>
            </select>
          </div>

          <Link
            href="/login"
            className="text-xs sm:text-sm font-bold text-slate-700 hover:text-green-800 transition px-2 py-1.5 hidden md:block"
          >
            Log In
          </Link>

          <Link
            href="/register"
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-green-700 hover:bg-green-800 text-white text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:shadow-md transition transform active:scale-95"
          >
            Register
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-5 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-bold transition flex items-center justify-between ${
                    active
                      ? 'bg-green-700 text-white shadow-sm'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span>➔</span>}
                </Link>
              );
            })}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3 mt-2">
              {/* Mobile Language Selector */}
              <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
                <span className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  🌐 Language:
                </span>
                <select
                  value={selectedLang}
                  onChange={(e) => {
                    handleLanguageChange(e.target.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-white border border-slate-300 rounded-md text-xs font-bold text-slate-800 py-1.5 px-2 outline-none"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="gu">ગુજરાતી (Gujarati)</option>
                  <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                  <option value="ur">اردو (Urdu)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-sm transition"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg text-sm shadow-sm transition"
                >
                  Register Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
