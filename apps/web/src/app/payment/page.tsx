'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialBar from '@/components/SocialBar';
import Chatbot from '@/components/Chatbot';
import PageHeader from '@/components/PageHeader';
import RazorpayModal, { PlanDetails } from '@/components/RazorpayModal';

export default function PaymentPage() {
  const plans: PlanDetails[] = [
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
        'Basic Farm Record Format',
      ],
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
        'Priority WhatsApp Support',
      ],
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
        'Certificate of Consultancy Completion',
      ],
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
        'Annual Performance Report & Year-2 Roadmap',
      ],
    },
  ];

  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(1); // Farm Growth by default (Most Popular)
  const [razorpayPlan, setRazorpayPlan] = useState<PlanDetails | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // QR Confirmation Form state
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [utrNumber, setUtrNumber] = useState('');
  const [isSubmittingUtr, setIsSubmittingUtr] = useState(false);
  const [utrSuccess, setUtrSuccess] = useState(false);

  const currentPlan = plans[selectedPlanIndex];

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('6392004098@mbk');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('6392004098');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleUtrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerName || !farmerPhone || !utrNumber) return;

    setIsSubmittingUtr(true);
    setTimeout(() => {
      setIsSubmittingUtr(false);
      setUtrSuccess(true);
    }, 900);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 relative flex flex-col justify-between">
      <Navbar />
      <SocialBar />
      <Chatbot />

      <main className="flex-1">
        <PageHeader
          badge="Official Secure Payment Portal"
          title="Complete Your Consultancy Enrollment"
          subtitle="Select your preferred package, checkout instantly via Razorpay, or scan the official UPI QR Code for zero-fee direct activation."
          breadcrumb="Payment"
        />

        {/* Security & Guarantee Header Strip */}
        <section className="bg-slate-900 border-b border-slate-800 py-3.5 px-6 text-slate-300 text-xs font-semibold">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-green-400">
              <span>🔒</span>
              <span>256-Bit SSL Encrypted & Verified Transaction</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1 text-slate-300">
                <span className="text-yellow-400">⚡</span> Instant Activation
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <span className="text-green-400">✓</span> Official BakriWala Official Account
              </span>
            </div>
          </div>
        </section>

        {/* Plan Selector Tabs (4 Tiers) */}
        <section className="pt-10 pb-6 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold uppercase text-green-700 bg-green-100 px-3 py-1 rounded-full border border-green-200">
              🐐 GOAT FARM CONSULTANCY PACKAGES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Select Your Consultancy Package
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto mb-10">
            {plans.map((p, idx) => (
              <button
                key={p.name}
                type="button"
                onClick={() => {
                  setSelectedPlanIndex(idx);
                  setUtrSuccess(false);
                }}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 relative ${
                  selectedPlanIndex === idx
                    ? 'bg-slate-900 text-white border-yellow-400 shadow-xl ring-2 ring-yellow-400/40'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {idx === 1 && (
                  <span className="absolute -top-2.5 right-3 bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-xs">
                    Popular ⭐
                  </span>
                )}
                <div className="text-[11px] font-bold opacity-75">{p.badge}</div>
                <div className="text-sm sm:text-base font-black mt-0.5">{p.name}</div>
                <div className="text-base sm:text-lg font-black text-green-500 mt-1">
                  {p.priceStr}{' '}
                  <span className="text-[11px] font-normal text-slate-400">{p.period}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main 2-Column Payment Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
            
            {/* LEFT COLUMN: Featured Plan Card */}
            <div className="lg:col-span-6">
              <div className="bg-[#0b1220] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-yellow-400/80 relative overflow-hidden flex flex-col justify-between">
                
                {/* Top Badge */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-sm">
                    <span>👑</span>
                    <span>{currentPlan.badge?.toUpperCase() || 'MOST POPULAR CHOICE'}</span>
                  </div>
                </div>

                {/* Plan Title & Pricing */}
                <div className="mb-6 border-b border-slate-800 pb-6">
                  <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    {currentPlan.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl sm:text-5xl font-black text-white">
                      {currentPlan.priceStr}
                    </span>
                    <span className="text-sm font-semibold text-slate-400">
                      {currentPlan.period}
                    </span>
                  </div>
                </div>

                {/* Inclusions List */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-yellow-400">
                    INCLUDED IN PACKAGE:
                  </h4>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                    {currentPlan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-snug">
                        <span className="text-yellow-400 font-bold text-base leading-none">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Primary Razorpay Action Button */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => setRazorpayPlan(currentPlan)}
                    className="w-full py-4 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-slate-950 font-black text-base rounded-2xl shadow-xl transition transform hover:-translate-y-0.5 active:scale-98 flex items-center justify-center gap-2"
                  >
                    <span>Pay with Razorpay ({currentPlan.priceStr})</span>
                    <span>➔</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-400 font-medium">
                    Supports Cards, UPI, NetBanking, Paytm & EMI via Razorpay Gateway
                  </p>
                </div>

              </div>
            </div>

            {/* RIGHT COLUMN: Direct UPI QR Code & Verification */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* QR Code Container Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 text-center">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full mb-3">
                  <span>📱</span>
                  <span>Direct UPI Transfer (Zero Gateway Fees)</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Scan QR Code to Pay
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Pay directly from GPay, PhonePe, Paytm, BHIM, or MobiKwik
                </p>

                {/* The QR Image */}
                <div className="my-6 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200/80 inline-block shadow-inner">
                  <img
                    src="/upi-qr.png"
                    alt="BakriWala UPI QR Code"
                    className="w-56 sm:w-64 h-auto mx-auto rounded-xl shadow-xs"
                  />
                  <div className="mt-3 text-xs font-bold text-slate-600">
                    Amount: <span className="text-green-700 font-black text-sm">{currentPlan.priceStr}</span>
                  </div>
                </div>

                {/* 1-Click Copy Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  
                  {/* UPI ID Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">UPI ID</span>
                    <span className="text-xs font-black text-slate-800 font-mono my-1">6392004098@mbk</span>
                    <button
                      onClick={handleCopyUpi}
                      className="text-[11px] font-bold text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md transition"
                    >
                      {copiedUpi ? '✓ Copied!' : 'Copy UPI ID'}
                    </button>
                  </div>

                  {/* Phone / Mobile */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">MobiKwik / Phone</span>
                    <span className="text-xs font-black text-slate-800 font-mono my-1">+91 63920 04098</span>
                    <button
                      onClick={handleCopyPhone}
                      className="text-[11px] font-bold text-green-700 hover:text-green-800 bg-green-50 hover:bg-green-100 px-3 py-1 rounded-md transition"
                    >
                      {copiedPhone ? '✓ Copied!' : 'Copy Number'}
                    </button>
                  </div>

                </div>

                {/* Direct WhatsApp Confirmation Button */}
                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={`https://wa.me/+916392004098?text=Hello%20BakriWala%20Official,%20I%20have%20completed%20the%20UPI%20payment%20for%20${encodeURIComponent(currentPlan.name)}%20(${encodeURIComponent(currentPlan.priceStr)}).%20Please%20find%20my%20payment%20details%20attached.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>Send Screenshot on WhatsApp</span>
                  </a>
                </div>

              </div>

              {/* UTR Verification Box */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-800">
                <h4 className="text-base font-bold flex items-center gap-2">
                  <span>📝</span>
                  <span>Confirm QR Payment with UTR</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1 mb-4">
                  Paid via QR? Enter your 12-digit transaction UTR number below for automatic verification.
                </p>

                {utrSuccess ? (
                  <div className="bg-green-500/20 border border-green-500/50 text-green-300 p-4 rounded-xl text-center space-y-2">
                    <div className="text-2xl">🎉</div>
                    <div className="font-bold text-sm">Payment Details Received!</div>
                    <p className="text-xs text-green-200">
                      Thank you, {farmerName}. Your UTR #{utrNumber} for {currentPlan.name} is recorded. Our consultancy team is activating your dashboard.
                    </p>
                    <Link
                      href="/premium-content"
                      className="inline-block mt-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-lg transition"
                    >
                      Go to VIP Member Portal
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleUtrSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        placeholder="e.g. Ramesh Yadav"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">WhatsApp Mobile Number</label>
                      <input
                        type="tel"
                        required
                        value={farmerPhone}
                        onChange={(e) => setFarmerPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">12-Digit UPI Ref / UTR ID</label>
                      <input
                        type="text"
                        required
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="e.g. 423871982341"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingUtr}
                      className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 mt-2"
                    >
                      {isSubmittingUtr ? 'Verifying...' : 'Submit UTR for Instant Activation'}
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* FAQs and Support Footnote */}
        <section className="py-12 bg-white border-t border-slate-200 mt-12 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Need Assistance with Your Payment?</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl mx-auto">
              Our consultancy support team is available daily. If you have any questions or require custom corporate onboarding, connect with us.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <a
                href="https://wa.me/+916392004098"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-green-50 text-green-800 font-bold text-xs rounded-xl border border-green-200 hover:bg-green-100 transition"
              >
                💬 WhatsApp: +91 63920 04098
              </a>
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 hover:bg-slate-200 transition"
              >
                Contact Helpdesk
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Razorpay Modal */}
      {razorpayPlan && (
        <RazorpayModal
          plan={razorpayPlan}
          onClose={() => setRazorpayPlan(null)}
        />
      )}
    </div>
  );
}
