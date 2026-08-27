'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialBar from '@/components/SocialBar';
import Chatbot from '@/components/Chatbot';
import PageHeader from '@/components/PageHeader';

export default function AboutPage() {
  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 relative flex flex-col justify-between">
      <Navbar />
      <SocialBar />
      <Chatbot />

      <main className="flex-1">
        <PageHeader
          badge="Our Mission & Story"
          title="About BakriWalaOfficial"
          subtitle="Transforming traditional livestock rearing into a scientific, profitable, and technologically advanced commercial livelihood for every Indian farmer."
          breadcrumb="About"
        />

        {/* Section 1: Who We Are & Story */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Image Collage */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/4.jpeg"
                  alt="BakriWala Educational Workshop"
                  className="w-full h-[460px] object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-green-700 text-white p-6 rounded-2xl shadow-xl max-w-xs border-2 border-white">
                <div className="text-3xl font-black mb-1">10,000+</div>
                <p className="text-xs font-semibold text-green-100 leading-snug">
                  Farmers educated across Uttar Pradesh, Bihar, Rajasthan, Maharashtra & beyond.
                </p>
              </div>
            </div>

            {/* Right Text */}
            <div className="space-y-6">
              <span className="text-green-700 font-extrabold text-sm uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
                Pioneering Goat Tech & Training
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Empowering India's Goat Farmers with Science & Technology
              </h2>
              <p className="text-slate-700 leading-relaxed text-base font-normal">
                BakriWalaOfficial was born from a fundamental observation: while goat farming is often hailed as the “poor man’s cow” and a key rural livelihood, farmers suffered immense financial losses due to high kid mortality, unscientific housing, improper feeding, and lack of immediate expert assistance.
              </p>
              <p className="text-slate-700 leading-relaxed text-base font-normal">
                We set out to change this by combining grassroots on-ground farm workshops, comprehensive multimedia masterclasses, and state-of-the-art AI expert diagnostics to make commercial goat farming transparent, low-cost, and extraordinarily profitable.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-2xl font-black text-green-700">95%+</div>
                  <div className="text-xs font-bold text-slate-600 mt-1">Kid Survival Rate with our protocols</div>
                </div>
                <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                  <div className="text-2xl font-black text-green-700">40%</div>
                  <div className="text-xs font-bold text-slate-600 mt-1">Average Feed Cost Reduction</div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Section 2: Core Mission & Vision */}
        <section className="py-20 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Our Guiding North Star</h2>
              <p className="text-slate-600 text-base font-medium">Building a sustainable, high-income livestock ecosystem through innovation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission */}
              <div className="p-8 sm:p-10 rounded-3xl bg-green-50/60 border border-green-200 shadow-sm relative overflow-hidden">
                <div className="w-14 h-14 bg-green-700 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md">
                  🎯
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h3>
                <p className="text-slate-700 leading-relaxed font-normal text-base">
                  To democratize access to world-class livestock expertise, low-cost nutrient formulations, and breed genetics for every goat farmer in India, turning traditional goat rearing into a scalable, wealth-generating enterprise.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-slate-700 font-medium">
                  <li className="flex items-center gap-2">✓ Zero preventable disease mortality</li>
                  <li className="flex items-center gap-2">✓ Scientific feeding with locally available fodder</li>
                  <li className="flex items-center gap-2">✓ Direct access to market linkages & fair prices</li>
                </ul>
              </div>

              {/* Vision */}
              <div className="p-8 sm:p-10 rounded-3xl bg-amber-50/60 border border-amber-200 shadow-sm relative overflow-hidden">
                <div className="w-14 h-14 bg-amber-600 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md">
                  👁️
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h3>
                <p className="text-slate-700 leading-relaxed font-normal text-base">
                  To establish India's most comprehensive digital livestock ecosystem, impacting over 1 million farmers by 2030 through AI-driven telemedicine, verified breed pedigree banks, and government subsidy facilitation.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-slate-700 font-medium">
                  <li className="flex items-center gap-2">✓ Digitized health cards for every goat</li>
                  <li className="flex items-center gap-2">✓ Instant multilingual AI expert triage</li>
                  <li className="flex items-center gap-2">✓ Standardized, high-yield breeding centers</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The 4 Pillars of BakriWala */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-green-700 font-extrabold text-sm uppercase tracking-wider">How We Drive Results</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2 mb-4">The 4 Pillars of Our Platform</h2>
            <p className="text-slate-600 text-base">An end-to-end framework tailored specifically to the climate and market dynamics of Indian goat farming.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">1. Research Education</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Step-by-step masterclasses covering shed ventilation, deworming calendars, silage making, and intensive stall-fed farming.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">2. AI Telemedicine</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instant disease symptom analysis and first-aid recommendations powered by GoatCare AI, accessible in Hindi, Bengali, Telugu and English.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-4">🧬</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">3. Genetic Purity</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Guidance on procuring authentic Barbari, Sirohi, Jamunapari, and Boer breeding stock to ensure fast weight gain and twinning rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">4. Business & Subsidies</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Project reports and assistance for NABARD subsidies, state animal husbandry loans, and premium direct-to-buyer sales networks.
              </p>
            </div>

          </div>
        </section>

        {/* Section 4: Call to Action Banner */}
        <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Ready to Upgrade Your Goat Farm?</h2>
            <p className="text-slate-300 text-base max-w-2xl mx-auto mb-8">
              Explore our structured training programs or consult with our expert advisors today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/programs"
                className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition"
              >
                Browse Programs
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition"
              >
                Contact Lucknow HQ
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
