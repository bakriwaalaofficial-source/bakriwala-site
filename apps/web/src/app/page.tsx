'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialBar from '@/components/SocialBar';
import Chatbot from '@/components/Chatbot';

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 relative flex flex-col justify-between scroll-smooth">
      <Navbar />
      <SocialBar />
      <Chatbot />

      <main className="flex-1">
        {/* ======================================================= */}
        {/* 1. HERO SECTION                                         */}
        {/* ======================================================= */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Hero Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-100/90 text-green-900 font-bold text-xs sm:text-sm rounded-full border border-green-300/80 shadow-xs">
              <span>🇮🇳</span>
              <span>India's Most Trusted Goat Farming Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.15] tracking-tight">
              Learn Better. <br />
              Farm Smarter. <br />
              <span className="text-green-700 underline decoration-green-500/30">Earn More.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl font-normal mx-auto lg:mx-0">
              Empowering farmers and livestock entrepreneurs with scientific, research-backed training, AI expert diagnostics, genetic breed selection, and profitable stall-fed farm models.
            </p>

            <div className="pt-3 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                href="/programs"
                className="px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 text-sm sm:text-base flex items-center gap-2"
              >
                <span>Explore Training Programs</span>
                <span>➔</span>
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-300 shadow-sm transition text-sm sm:text-base"
              >
                About Our Mission
              </Link>
            </div>

            {/* Micro Badges */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <span className="text-green-600 font-bold">✓</span>
                <span>Zero Kid Mortality Protocols</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-green-600 font-bold">✓</span>
                <span>24/7 Multilingual AI Triage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-green-600 font-bold">✓</span>
                <span>NABARD Subsidy Guidance</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image */}
          <div className="flex-1 flex justify-center items-center w-full">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white/80 backdrop-blur-md group">
              <img
                src="/1.jpeg"
                alt="Modern Goat Farming Unit"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-full shadow-lg border border-slate-200 text-center whitespace-nowrap">
                <span className="text-xs sm:text-sm font-black text-slate-900">
                  🐐 Intensive Stall-Fed System
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 2. LIVE METRICS & ACHIEVEMENTS                          */}
        {/* ======================================================= */}
        <section className="py-12 bg-white border-y border-slate-200 shadow-xs">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="p-4 flex flex-col justify-center items-center">
                <h3 className="text-3xl sm:text-4xl font-black text-green-700">10,000+</h3>
                <p className="text-xs sm:text-sm text-slate-800 font-bold mt-1">Farmers Trained</p>
              </div>
              <div className="p-4 flex flex-col justify-center items-center">
                <h3 className="text-3xl sm:text-4xl font-black text-green-700">25+</h3>
                <p className="text-xs sm:text-sm text-slate-800 font-bold mt-1">Livestock Experts</p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug max-w-[210px]">
                  (Professors from renowned universities, Ph.D. Scholars)
                </p>
              </div>
              <div className="p-4 flex flex-col justify-center items-center">
                <h3 className="text-3xl sm:text-4xl font-black text-green-700">100+</h3>
                <p className="text-xs sm:text-sm text-slate-800 font-bold mt-1">Videos (Best Practices)</p>
              </div>
              <div className="p-4 flex flex-col justify-center items-center">
                <h3 className="text-3xl sm:text-4xl font-black text-green-700">24/7</h3>
                <p className="text-xs sm:text-sm text-slate-800 font-bold mt-1">AI-Based Goat Disease Diagnosis</p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 3. ABOUT US PREVIEW                                     */}
        {/* ======================================================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white relative h-[420px]">
              <img
                src="/4.jpeg"
                alt="BakriWala Educational Program"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            <div className="space-y-6">
              <span className="text-green-700 font-extrabold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
                About Our Movement
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                Pioneering Modern Goat Farming Education Across India
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                BakriWalaOfficial is a leading digital platform dedicated to transforming goat farming through practical, affordable and science-based knowledge. We cover the complete goat farming journey—from breeding, feeding, housing and disease prevention to farm economics, entrepreneurship and end-to-end goat marketing.
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base font-normal">
                From low-cost elevated slatted sheds, economical feed formulations and scientific vaccination calendars to NABARD/government/bankable project reports, market linkages, pricing and buyer-seller connections, we equip farmers with end-to-end knowledge and practical tools to build sustainable, scalable, and profitable goat enterprises.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition shadow-sm"
                >
                  <span>Read Our Full Story & Mission</span>
                  <span>➔</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 4. FEATURED TRAINING PROGRAMS PREVIEW                   */}
        {/* ======================================================= */}
        <section className="py-20 bg-slate-100/70 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-green-700 font-extrabold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  Featured Masterclasses
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                  Popular Training Programs
                </h2>
              </div>
              <Link
                href="/programs"
                className="text-green-800 font-bold text-sm hover:underline flex items-center gap-1"
              >
                <span>View All 6 Programs</span>
                <span>➔</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Commercial Stall-Fed Farm Setup',
                  img: '/5 (1).jpeg',
                  dur: '4 Weeks',
                  desc: 'Blueprint for elevated sheds, zero-grazing management, and high-density stall farming.',
                  link: '/programs#scientific-farming'
                },
                {
                  title: 'Disease Management & Vaccines',
                  img: '/5 (6).jpeg',
                  dur: '3 Weeks',
                  desc: 'PPR, ET, Goat Pox diagnosis, 12-month vaccination calendars, and emergency first-aid.',
                  link: '/programs#disease-vaccination'
                },
                {
                  title: 'Low-Cost Feed & Silage Making',
                  img: '/5 (8).jpeg',
                  dur: '2 Weeks',
                  desc: 'Cut feeding cost by 40% with local TMR formulas, green fodder, and silage bags.',
                  link: '/programs#feed-formulation'
                }
              ].map((prog, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={prog.img}
                        alt={prog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                        {prog.dur}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-green-700 transition mb-2">
                        {prog.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {prog.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      href={prog.link}
                      className="block w-full text-center py-2.5 bg-slate-100 group-hover:bg-green-700 group-hover:text-white text-slate-800 font-bold text-xs rounded-lg transition"
                    >
                      View Syllabus & Enroll
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 5. GOAT BREEDS KNOWLEDGE SPOTLIGHT                      */}
        {/* ======================================================= */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-green-700 font-extrabold text-xs uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
                Genetics & Selection
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
                Top Commercial Goat Breeds
              </h2>
            </div>
            <Link
              href="/breeds"
              className="text-green-800 font-bold text-sm hover:underline flex items-center gap-1"
            >
              <span>Explore Breeds Hub (8+ Breeds)</span>
              <span>➔</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Barbari Goat', desc: 'Best for stall-fed zero grazing and frequent twin births.', img: '/5 (1).jpeg' },
              { name: 'Sirohi Goat', desc: 'Hardiest breed for arid climates and heavy meat gain.', img: '/5 (4).jpeg' },
              { name: 'Jamunapari Goat', desc: 'Majestic dairy king with highest milk yield and stature.', img: '/5 (12).jpeg' },
              { name: 'Black Bengal', desc: 'Top tenderness meat and highest multiple kidding rates.', img: '/5 (5).jpeg' }
            ].map((breed, i) => (
              <Link
                key={i}
                href="/breeds"
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition p-4 flex flex-col group"
              >
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3 bg-slate-100">
                  <img
                    src={breed.img}
                    alt={breed.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-green-700 transition">
                  {breed.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {breed.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* ======================================================= */}
        {/* 6. DYNAMIC PHOTO GALLERY PREVIEW                        */}
        {/* ======================================================= */}
        <section className="py-20 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-yellow-400 font-extrabold text-xs uppercase tracking-wider bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
                  ✨ Interactive Visual Tour
                </span>
                <h2 className="text-3xl sm:text-4xl font-black mt-2">
                  Farm & Workshop Live Gallery
                </h2>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-md transition transform hover:scale-105"
              >
                <span>Open Full Interactive Gallery (16 Photos)</span>
                <span>➔</span>
              </Link>
            </div>
          </div>

          {/* Animated Marquee Strip */}
          <div className="flex overflow-hidden py-4">
            <div className="animate-marquee flex items-center gap-6">
              {[
                { src: '/1.jpeg', title: 'Stall-Fed System', cat: 'Farm Unit' },
                { src: '/4.jpeg', title: 'Expert Class', cat: 'Practical' },
                { src: '/5 (1).jpeg', title: 'Barbari Seed Stock', cat: 'Breed' },
                { src: '/5 (2).jpeg', title: 'Farm Visit & Audit', cat: 'Tour' },
                { src: '/5 (3).jpeg', title: 'TMR Feeding Aisles', cat: 'Facility' },
                { src: '/5 (4).jpeg', title: 'Pedigree Sire Buck', cat: 'Breed' },
                { src: '/5 (6).jpeg', title: 'Vaccine Injection Class', cat: 'Health' },
                { src: '/5 (8).jpeg', title: 'Silage Preparation', cat: 'Nutrition' },
                { src: '/5 (10).jpeg', title: 'Graduation Batch', cat: 'Event' },
                { src: '/5 (12).jpeg', title: 'Jamunapari King', cat: 'Breed' },
                { src: '/1.jpeg', title: 'Stall-Fed System', cat: 'Farm Unit' },
                { src: '/4.jpeg', title: 'Expert Class', cat: 'Practical' },
                { src: '/5 (1).jpeg', title: 'Barbari Seed Stock', cat: 'Breed' },
                { src: '/5 (2).jpeg', title: 'Farm Visit & Audit', cat: 'Tour' },
                { src: '/5 (3).jpeg', title: 'TMR Feeding Aisles', cat: 'Facility' },
                { src: '/5 (4).jpeg', title: 'Pedigree Sire Buck', cat: 'Breed' }
              ].map((item, i) => (
                <Link
                  key={i}
                  href="/gallery"
                  className="relative w-64 sm:w-80 h-44 sm:h-52 rounded-2xl overflow-hidden border border-slate-700 bg-slate-800 flex-shrink-0 group shadow-lg transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-115 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <span className="text-[10px] font-extrabold uppercase text-yellow-400 bg-yellow-400/20 px-2 py-0.5 rounded w-max border border-yellow-400/30">
                      {item.cat}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-1 group-hover:text-yellow-300 transition">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ======================================================= */}
        {/* 7. VIP MEMBERSHIP CTA                                   */}
        {/* ======================================================= */}
        <section className="py-20 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="text-4xl block mb-2">👑</span>
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Unlock BakriWala VIP Mentorship
            </h2>
            <p className="text-base sm:text-lg font-medium text-slate-900 max-w-2xl mx-auto mb-8">
              Get personalized 1-on-1 shed design reviews, custom low-cost TMR feed formulations for your district, and bank-ready NABARD project reports.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/premium"
                className="px-8 py-4 bg-slate-950 hover:bg-slate-900 text-white font-black rounded-xl shadow-xl transition transform hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Explore VIP Membership Plans
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/90 hover:bg-white text-slate-950 font-bold rounded-xl shadow-sm transition text-sm sm:text-base"
              >
                Contact Advisors
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
