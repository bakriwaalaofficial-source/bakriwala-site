'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <img 
                src="/2.jpeg" 
                alt="BakriWala Logo" 
                className="h-11 w-11 object-contain rounded-full bg-slate-800 p-0.5 border border-green-500/40" 
              />
              <span className="text-2xl font-black text-white tracking-tight">
                BakriWala<span className="text-green-500">Official</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              India's premier digital ecosystem for goat farmers and livestock entrepreneurs. Empowering farmers with scientific training, expert advisory, high-yield breed selection, and profitable business models.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a 
                href="https://wa.me/+916392004098" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white rounded-lg text-xs font-bold border border-[#25D366]/40 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>WhatsApp</span>
              </a>
              <a 
                href="https://youtube.com/@bakriwaalaofficial?si=CsdB5NQzltSHNG3X" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF0000]/20 text-[#FF0000] hover:bg-[#FF0000] hover:text-white rounded-lg text-xs font-bold border border-[#FF0000]/40 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>YouTube</span>
              </a>
              <a 
                href="https://www.instagram.com/bakriwalaofficial?igsh=ZDltZ2Fzbmo4bmE3&utm_source=qr" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E1306C]/20 text-[#E1306C] hover:bg-[#E1306C] hover:text-white rounded-lg text-xs font-bold border border-[#E1306C]/40 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
              </a>
              <a 
                href="https://www.facebook.com/bakriwalaofficial" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1877F2]/20 text-[#1877F2] hover:bg-[#1877F2] hover:text-white rounded-lg text-xs font-bold border border-[#1877F2]/40 transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-green-400 transition">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-400 transition">About Us</Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-green-400 transition">Programs & Masterclasses</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-green-400 transition">Farm & Event Gallery</Link>
              </li>
              <li>
                <Link href="/breeds" className="hover:text-green-400 transition">Goat Breeds Hub</Link>
              </li>
              <li>
                <Link href="/premium" className="hover:text-green-400 transition">VIP Membership</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400 transition">Contact & Support</Link>
              </li>
            </ul>
          </div>

          {/* Core Programs */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">Programs</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/programs#scientific" className="hover:text-green-400 transition">Scientific Farm Setup</Link>
              </li>
              <li>
                <Link href="/programs#nutrition" className="hover:text-green-400 transition">Low-Cost Feed Formulation</Link>
              </li>
              <li>
                <Link href="/programs#diseases" className="hover:text-green-400 transition">Disease Prevention & Vaccines</Link>
              </li>
              <li>
                <Link href="/programs#kidcare" className="hover:text-green-400 transition">Kid Care & Zero Mortality</Link>
              </li>
              <li>
                <Link href="/programs#subsidies" className="hover:text-green-400 transition">Govt Loans & NABARD Schemes</Link>
              </li>
              <li>
                <Link href="/premium" className="hover:text-green-400 transition">1-on-1 Expert Mentorship</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">HQ Lucknow</h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <p className="flex items-start gap-2">
                <span className="text-green-400">📍</span>
                <span>14/96, Tripathi Niwas, Sector-14, Indira Nagar, Lucknow, UP 226016</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">📞</span>
                <span>+91 85288 20486 / +91 63920 04098</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">✉️</span>
                <span>bakriwaalaofficial@gmail.com</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">⏰</span>
                <span>Mon - Sat: 9:00 AM – 6:00 PM</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BakriWalaOfficial. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-slate-400 transition">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-400 transition">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-400 transition">Farmer Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
