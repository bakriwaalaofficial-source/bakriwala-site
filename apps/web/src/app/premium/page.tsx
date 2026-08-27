'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialBar from '@/components/SocialBar';
import Chatbot from '@/components/Chatbot';
import PageHeader from '@/components/PageHeader';
import RazorpayModal, { PlanDetails } from '@/components/RazorpayModal';

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);

  const tiers: PlanDetails[] = [
    {
      name: 'Farmer Starter',
      badge: 'Beginners (1–20 Goats)',
      priceNum: 1499,
      priceStr: '₹1,499',
      period: '/ 1 Month',
      features: [
        'Initial Farm & Goat Management Assessment',
        'Personalized 30-Day Action Plan',
        'Complete Goat Farming Video Masterclasses',
        'Vaccination & Deworming Schedule',
        'Feeding & Nutrition Guidance',
        'Breeding Management Guidance',
        'Housing & Sanitation Guidance',
        'Disease Prevention Guidance',
        'WhatsApp Consultancy Support',
        '1 Scheduled Phone Consultation',
        'Basic Farm Record Format'
      ]
    },
    {
      name: 'Farm Growth',
      badge: 'Most Popular Choice ⭐ (10–50 Goats)',
      priceNum: 3999,
      priceStr: '₹3,999',
      period: '/ 3 Months',
      features: [
        'Everything in Starter, PLUS:',
        'Personalized 90-Day Farm Development Plan',
        'Monthly Farm Performance Review',
        'Customized Feeding Strategy',
        'Local-Ingredient Feed Cost Optimization',
        'Breeding & Kid Management Plan',
        'Farm Record & KPI Monitoring',
        'Mortality & Disease-Risk Review',
        'Farm Profitability Assessment',
        'Goat Buying & Selling Guidance',
        '2 Scheduled Consultation Calls',
        'Priority WhatsApp Support'
      ]
    },
    {
      name: 'Professional Farm',
      badge: 'Commercial Scale (30–100 Goats)',
      priceNum: 7999,
      priceStr: '₹7,999',
      period: '/ 6 Months',
      features: [
        'Everything in Growth, PLUS:',
        '6-Month Farm Development Roadmap',
        'Detailed Farm Profitability Analysis',
        'Custom Feed Formulation',
        'Shed Layout / Blueprint Review',
        'Breeding & Replacement Strategy',
        'Kid Growth & Survival Monitoring',
        'Farm SOP Guidance & Cost Reduction',
        'Commercial Goat Marketing Strategy',
        'Farm Expansion Planning',
        'DPR / Project Report Guidance',
        '4 Scheduled Consultation Calls',
        'Certificate of Consultancy Completion'
      ]
    },
    {
      name: 'Enterprise Farm',
      badge: 'Mega Farm & Investors (50+ Goats)',
      priceNum: 14999,
      priceStr: '₹14,999',
      period: '/ 1 Year',
      features: [
        'Everything in Professional, PLUS:',
        'Complete 12-Month Farm Growth Plan',
        'Quarterly Business Reviews & Audits',
        'Annual Profitability & Performance Analysis',
        'Complete Breeding Program Design',
        'Custom Feed & Nutrition Strategy',
        'Farm SOP Development Suite',
        'Procurement & Herd Expansion Strategy',
        'Goat Marketing & Sales Strategy',
        'NLM / NABARD Project Guidance',
        'Priority Farm Audit Slot',
        '8 Scheduled Consultant Calls',
        'Dedicated Senior Consultant Assigned',
        'Annual Performance Report & Year-2 Roadmap'
      ]
    }
  ];

  const ctaLabels: Record<string, string> = {
    'Farmer Starter': 'Start Your Consultancy — ₹1,499',
    'Farm Growth': 'Join Growth Program — ₹3,999',
    'Professional Farm': 'Build Commercial Farm — ₹7,999',
    'Enterprise Farm': 'Apply for Enterprise — ₹14,999'
  };

  const addOnServices = [
    {
      title: 'NABARD / NLM Bankable DPR Project Report',
      price: 'Starting ₹2,500',
      desc: 'CA-verified financial projection and subsidy claim file customized for 50+2, 100+4, or mega goat units.',
      tag: 'Bank Ready'
    },
    {
      title: 'On-Site Farm Audit & Shed Inspection',
      price: 'Custom Quotation',
      desc: 'Senior livestock expert visits your farm for layout optimization, bio-security check, and herd health inspection.',
      tag: 'Physical Visit'
    },
    {
      title: 'NLM / NABARD 50% Subsidy Application Guidance',
      price: 'Project Based',
      desc: 'Step-by-step documentation, portal application filing, and compliance assistance for national livestock schemes.',
      tag: 'Subsidy Support'
    },
    {
      title: 'District-Specific Feed & TMR Ration Formulation',
      price: '₹1,999 / Recipe',
      desc: 'Custom feed formulation balancing locally available agricultural grains (maize, mustard cake, rice bran) to minimize costs.',
      tag: 'Feed Cost Saver'
    },
    {
      title: 'Pedigree Breeding Stock Procurement Support',
      price: 'Assisted Service',
      desc: 'Direct connection and quality verification with inspected foundation farms for Barbari, Sirohi, and Beetal stock.',
      tag: 'Pure Genetics'
    }
  ];

  const comparisonRows = [
    { feature: 'Target Herd Size', starter: '1 – 20 Goats', growth: '10 – 50 Goats', pro: '30 – 100 Goats', ent: '50+ Goats / Mega' },
    { feature: 'Consultancy Duration', starter: '1 Month', growth: '3 Months', pro: '6 Months', ent: '1 Year (12 Mos)' },
    { feature: 'Initial Farm Assessment', starter: '✓', growth: '✓', pro: '✓', proFull: true, ent: '✓' },
    { feature: 'Custom Action Plan', starter: '30-Day Plan', growth: '90-Day Plan', pro: '6-Month Roadmap', ent: '12-Month Roadmap' },
    { feature: 'Video Masterclasses', starter: '✓ Full Library', growth: '✓ Full Library', pro: '✓ Full Library', ent: '✓ Full Library' },
    { feature: 'Feed & Nutrition Optimization', starter: 'Standard Guidance', growth: 'Custom Strategy', pro: 'Custom Formulation', ent: 'Complete Strategy' },
    { feature: 'Breeding & Kid Care Plan', starter: 'Standard Schedule', growth: '✓ Prolificacy Plan', pro: '✓ Replacement Plan', ent: '✓ Complete Program Design' },
    { feature: 'Disease & Vaccine Schedules', starter: '✓ National Chart', growth: '✓ Risk Review', pro: '✓ Risk Review', ent: '✓ Full Bio-Security' },
    { feature: 'Consultancy Support Channel', starter: 'WhatsApp Support', growth: 'Priority WhatsApp', pro: 'Priority WhatsApp', ent: 'Dedicated Senior Consultant' },
    { feature: 'Scheduled Phone/Video Calls', starter: '1 Call', growth: '2 Calls', pro: '4 Calls', ent: '8 Calls' },
    { feature: 'Periodic Farm Reviews', starter: '—', growth: 'Monthly Review', pro: 'Monthly Review', ent: 'Quarterly & Annual Review' },
    { feature: 'Shed Layout / Blueprint Review', starter: '—', growth: '—', pro: '✓ Layout Review', ent: '✓ Priority Audit Slot' },
    { feature: 'Farm SOPs & Cost Reduction', starter: '—', growth: '—', pro: '✓ SOP Guidance', ent: '✓ Full SOP Suite' },
    { feature: 'Goat Marketing & Sales Strategy', starter: 'Basic Guidance', growth: '✓ Buying/Selling', pro: '✓ Commercial Strategy', ent: '✓ Strategy + Buyer Access' },
    { feature: 'DPR & Bank Loan Guidance', starter: '—', growth: '—', pro: '✓ DPR Guidance', ent: '✓ Full Project Guidance' },
    { feature: 'Dedicated Consultant Assigned', starter: '—', growth: '—', pro: '—', ent: '✓ Senior Consultant' },
    { feature: 'Certificate of Completion', starter: '—', growth: '—', pro: '✓ Verified Certificate', ent: '✓ Verified Certificate' },
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 relative flex flex-col justify-between">
      <Navbar />
      <SocialBar />
      <Chatbot />

      <main className="flex-1">
        <PageHeader
          badge="🐐 GOAT FARM CONSULTANCY PROGRAM"
          title="Practical Guidance From Setup to Profitability"
          subtitle="Structured consultancy packages designed by livestock experts and experienced farm owners to optimize feeding, minimize kid mortality, and maximize commercial returns."
          breadcrumb="Consultancy & Membership"
        />

        {/* 1. Customer Progression Journey Strip */}
        <section className="bg-slate-900 border-b border-slate-800 py-10 px-6 text-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-extrabold uppercase text-green-400 tracking-wider">
                Clear Progression Roadmap
              </span>
              <h3 className="text-xl sm:text-2xl font-black mt-1">
                A Program Built for Every Stage of Your Goat Farm
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl relative">
                <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase mb-2">
                  <span>🌱 Stage 1</span>
                  <span>•</span>
                  <span>Starter</span>
                </div>
                <h4 className="text-base font-black text-white">“Help me start correctly.”</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Ideal for beginners setting up housing, first breed selection, and 30-day survival protocols.
                </p>
              </div>

              <div className="bg-slate-800/80 border-2 border-yellow-500/80 p-5 rounded-2xl relative shadow-lg">
                <span className="absolute -top-3 right-4 bg-yellow-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full uppercase">
                  Most Popular ⭐
                </span>
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-xs uppercase mb-2">
                  <span>🚀 Stage 2</span>
                  <span>•</span>
                  <span>Growth</span>
                </div>
                <h4 className="text-base font-black text-white">“Help me improve my farm.”</h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Focus on feed cost reduction, fast kid growth, and monthly KPI reviews for 10–50 goat units.
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl relative">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase mb-2">
                  <span>💼 Stage 3</span>
                  <span>•</span>
                  <span>Professional</span>
                </div>
                <h4 className="text-base font-black text-white">“Help me make it profitable.”</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Custom feed formulation, shed blueprints, farm SOPs, and DPR guidance for 30–100 goats.
                </p>
              </div>

              <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl relative">
                <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase mb-2">
                  <span>👑 Stage 4</span>
                  <span>•</span>
                  <span>Enterprise</span>
                </div>
                <h4 className="text-base font-black text-white">“Help me scale a business.”</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Year-round dedicated consultancy, NLM project filing, audit priority, and sales strategy for 50+ goats.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. 4-Package Pricing Grid */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
              Transparent Consultancy Tiers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
              Choose Your Consultancy Package
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              No hidden fees. Every package delivers actionable, scientific advice from qualified livestock specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tiers.map((tier, idx) => {
              const isPopular = tier.name === 'Farm Growth';
              const isEnterprise = tier.name === 'Enterprise Farm';

              return (
                <div
                  key={tier.name}
                  className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                    isPopular
                      ? 'bg-slate-950 text-white shadow-2xl border-2 border-yellow-400 ring-4 ring-yellow-400/20 transform lg:-translate-y-2'
                      : isEnterprise
                      ? 'bg-gradient-to-b from-slate-900 to-slate-950 text-white shadow-xl border border-purple-500/40'
                      : 'bg-white text-slate-900 border border-slate-200 shadow-md hover:shadow-xl'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-950 font-black text-[11px] px-4 py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                      ⭐ Most Popular Choice
                    </div>
                  )}

                  <div>
                    {/* Badge */}
                    <div className="mb-3">
                      <span
                        className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full inline-block ${
                          isPopular
                            ? 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30'
                            : isEnterprise
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {tier.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-black mb-1">{tier.name}</h3>

                    <div className="mb-6 pb-6 border-b border-slate-200/20">
                      <span className="text-3xl sm:text-4xl font-black">{tier.priceStr}</span>
                      <span
                        className={`text-xs font-bold ml-1.5 ${
                          isPopular || isEnterprise ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {tier.period}
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-8">
                      <p
                        className={`text-[11px] font-black uppercase tracking-wider ${
                          isPopular
                            ? 'text-yellow-400'
                            : isEnterprise
                            ? 'text-purple-400'
                            : 'text-green-700'
                        }`}
                      >
                        Included In Package:
                      </p>
                      {tier.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-medium leading-snug">
                          <span
                            className={`font-bold text-sm ${
                              isPopular
                                ? 'text-yellow-400'
                                : isEnterprise
                                ? 'text-purple-400'
                                : 'text-green-600'
                            }`}
                          >
                            ✓
                          </span>
                          <span className={isPopular || isEnterprise ? 'text-slate-200' : 'text-slate-700'}>
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 mt-auto pt-4">
                    <Link
                      href="/payment"
                      className={`w-full py-3.5 rounded-xl font-black text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-1.5 ${
                        isPopular
                          ? 'bg-yellow-400 hover:bg-yellow-300 text-slate-950'
                          : isEnterprise
                          ? 'bg-purple-600 hover:bg-purple-500 text-white'
                          : 'bg-green-700 hover:bg-green-800 text-white'
                      }`}
                    >
                      <span>{ctaLabels[tier.name] || 'Proceed to Payment'}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => setSelectedPlan(tier)}
                      className={`w-full py-2 rounded-lg font-bold text-[11px] transition border flex items-center justify-center gap-1 ${
                        isPopular || isEnterprise
                          ? 'border-slate-700 text-slate-300 hover:bg-slate-800'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>⚡ Quick Razorpay Modal</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. Comprehensive Feature Comparison Table */}
        <section className="py-16 bg-white border-y border-slate-200 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
                Detailed Breakdown
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                Consultancy Features Comparison Table
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Compare deliverables across packages to pick the perfect fit for your herd.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-slate-900 text-white text-xs uppercase font-bold">
                  <tr>
                    <th className="py-4 px-4 sm:px-6">Feature / Deliverable</th>
                    <th className="py-4 px-3 text-center">🌱 Starter<br/><span className="text-slate-400 font-normal">₹1,499</span></th>
                    <th className="py-4 px-3 text-center bg-yellow-500/20 text-yellow-300 border-x border-yellow-500/30">🚀 Growth ⭐<br/><span className="text-yellow-200 font-normal">₹3,999</span></th>
                    <th className="py-4 px-3 text-center">💼 Pro<br/><span className="text-slate-400 font-normal">₹7,999</span></th>
                    <th className="py-4 px-3 text-center">👑 Enterprise<br/><span className="text-slate-400 font-normal">₹14,999</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-slate-50/60' : 'bg-white'}>
                      <td className="py-3 px-4 sm:px-6 font-bold text-slate-900">{row.feature}</td>
                      <td className="py-3 px-3 text-center">{row.starter}</td>
                      <td className="py-3 px-3 text-center font-bold text-slate-900 bg-yellow-50/50 border-x border-yellow-200">{row.growth}</td>
                      <td className="py-3 px-3 text-center">{row.pro}</td>
                      <td className="py-3 px-3 text-center font-semibold text-purple-900">{row.ent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 4. Specialized Paid Add-on Services */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              High-Ticket Specialized Add-Ons
            </span>
            <h3 className="text-3xl font-black text-slate-900 mt-2">
              Individual Specialized Paid Services
            </h3>
            <p className="text-slate-600 text-sm mt-1">
              Need specific project deliverables? Access our standalone services without requiring annual lock-ins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOnServices.map((srv, idx) => (
              <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                      {srv.tag}
                    </span>
                    <span className="text-sm font-black text-green-700">{srv.price}</span>
                  </div>
                  <h4 className="text-base font-black text-slate-900 mb-2">{srv.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
                </div>

                <div className="pt-5 mt-5 border-t border-slate-100">
                  <a
                    href={`https://wa.me/+916392004098?text=Hello%20BakriWala,%20I%20am%20interested%20in%20the%20add-on%20service:%20${encodeURIComponent(srv.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 hover:text-green-800"
                  >
                    <span>Inquire Details on WhatsApp</span>
                    <span>➔</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. The Framework: Who It Is For, How It Works, What Is Not Included */}
        <section className="py-20 bg-slate-900 text-white px-6">
          <div className="max-w-7xl mx-auto space-y-16">
            
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase text-yellow-400 tracking-wider">
                Full Transparency
              </span>
              <h3 className="text-3xl font-black mt-2">
                Program Boundaries & Delivery Framework
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Setting realistic, crystal-clear expectations so every enrolled farmer receives authentic value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1: Who It Is For */}
              <div className="bg-slate-800/90 border border-slate-700 p-7 rounded-3xl space-y-4">
                <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  🎯
                </div>
                <h4 className="text-lg font-black text-white">Who It Is For</h4>
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>New farmers planning low-cost stall-fed or semi-intensive shed setups.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>Existing farm owners wanting to cut feed costs by 40% using local grains.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>Entrepreneurs preparing bankable project reports for NABARD / Bank loans.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>Commercial breeders scaling beyond 50+ does with disciplined SOPs.</span>
                  </li>
                </ul>
              </div>

              {/* Card 2: How It Works */}
              <div className="bg-slate-800/90 border border-slate-700 p-7 rounded-3xl space-y-4">
                <div className="w-12 h-12 bg-yellow-500/20 text-yellow-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  ⚙️
                </div>
                <h4 className="text-lg font-black text-white">How It Works</h4>
                <ol className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-yellow-400 text-slate-950 font-black text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <span><strong>Enroll:</strong> Select package & complete payment via Razorpay or QR.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-yellow-400 text-slate-950 font-black text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <span><strong>Audit:</strong> Fill initial questionnaire on herd size, location, and crops.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-yellow-400 text-slate-950 font-black text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <span><strong>Roadmap:</strong> Receive tailored action plan, schedules & video library.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-yellow-400 text-slate-950 font-black text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                    <span><strong>Handholding:</strong> Ongoing WhatsApp advisory & scheduled calls.</span>
                  </li>
                </ol>
              </div>

              {/* Card 3: What Is NOT Included */}
              <div className="bg-slate-800/90 border border-red-500/30 p-7 rounded-3xl space-y-4">
                <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-2xl flex items-center justify-center text-2xl font-bold">
                  🛡️
                </div>
                <h4 className="text-lg font-black text-red-300">What Is NOT Included</h4>
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span><strong>On-ground surgical operations:</strong> Emergency surgeries must be handled by registered local veterinary clinics.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span><strong>Guaranteed loan / subsidy sanctions:</strong> Approvals are solely at the discretion of financing banks and government authorities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-400 font-bold">✕</span>
                    <span><strong>Free livestock supply:</strong> We guide procurement; animal purchase prices are paid directly to sellers.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Official Disclaimer Box */}
            <div className="p-6 bg-slate-950/80 rounded-2xl border border-slate-800 text-slate-400 text-xs leading-relaxed text-center max-w-4xl mx-auto">
              <strong className="text-slate-200">Official Advisory Disclaimer:</strong> AI assistance and farm consultancy are designed for general livestock management, nutrition optimization, and business economics. They do not replace emergency veterinary diagnosis or on-ground surgical treatment by registered veterinary practitioners.
            </div>

          </div>
        </section>

        {/* 6. FAQs Section */}
        <section className="py-16 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h3>
          </div>
          <div className="space-y-4">
            {[
              {
                q: 'How do the scheduled phone/video consultations work?',
                a: 'Upon enrollment, you receive a direct booking calendar link. You can pick your preferred date and time slot for a 1-on-1 private call with our livestock consultant.'
              },
              {
                q: 'Can I pay using UPI QR Code instead of Razorpay?',
                a: 'Yes! We support direct zero-fee UPI transfers via Google Pay, PhonePe, Paytm, and MobiKwik. Visit our Payment page to scan the QR code and submit your UTR number for instant activation.'
              },
              {
                q: 'Can I upgrade my package later as my herd grows?',
                a: 'Absolutely. Many farmers start with Starter (₹1,499) and seamlessly upgrade to Farm Growth (₹3,999) or Professional (₹7,999) by paying the prorated difference.'
              }
            ].map((faq, i) => (
              <div key={i} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <h4 className="text-sm font-bold text-slate-900">{faq.q}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />

      {/* Razorpay Checkout Modal */}
      {selectedPlan && (
        <RazorpayModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
        />
      )}
    </div>
  );
}
