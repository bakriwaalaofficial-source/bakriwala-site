'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialBar from '@/components/SocialBar';
import Chatbot from '@/components/Chatbot';
import RazorpayModal, { PlanDetails } from '@/components/RazorpayModal';

export default function PremiumContentPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<PlanDetails | null>(null);
  const [activeTab, setActiveTab] = useState<'dpr' | 'feed-calc' | 'masterclasses' | 'doctor' | 'seed-stock'>('dpr');

  // Feed Calculator State
  const [maizePrice, setMaizePrice] = useState(22); // Rs/kg
  const [mustardCakePrice, setMustardCakePrice] = useState(28); // Rs/kg
  const [riceBranPrice, setRiceBranPrice] = useState(14); // Rs/kg
  const [molassesPrice, setMolassesPrice] = useState(12); // Rs/kg
  const [mineralMixPrice, setMineralMixPrice] = useState(120); // Rs/kg
  const [goatCount, setGoatCount] = useState(20);

  // Check login on load
  useEffect(() => {
    try {
      const auth = localStorage.getItem('bakriwala_auth');
      if (auth) {
        const parsed = JSON.parse(auth);
        setIsLoggedIn(true);
        setUserEmail(parsed.email || 'farmer@bakriwala.com');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;

    const userData = { email: loginEmail, loggedInAt: new Date().toISOString(), tier: 'VIP Commercial' };
    localStorage.setItem('bakriwala_auth', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserEmail(loginEmail);
  };

  const handleQuickDemoLogin = () => {
    const demoUser = { email: 'vip.member@goatcare.ai', loggedInAt: new Date().toISOString(), tier: 'VIP Commercial Pro' };
    localStorage.setItem('bakriwala_auth', JSON.stringify(demoUser));
    setIsLoggedIn(true);
    setUserEmail(demoUser.email);
  };

  const handleLogout = () => {
    localStorage.removeItem('bakriwala_auth');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  // Calculator computations: 100kg batch recipe (Maize 40kg, Mustard Cake 25kg, Rice Bran 25kg, Molasses 8kg, Mineral 2kg)
  const batchCost =
    40 * maizePrice +
    25 * mustardCakePrice +
    25 * riceBranPrice +
    8 * molassesPrice +
    2 * mineralMixPrice;
  const costPerKg = (batchCost / 100).toFixed(2);
  const dailyFeedCostPerGoat = ((Number(costPerKg) * 0.45) + 2.5).toFixed(2); // 450g concentrate + roughage
  const monthlyHerdFeedCost = (Number(dailyFeedCostPerGoat) * goatCount * 30).toLocaleString();

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 relative flex flex-col justify-between">
      <Navbar />
      <SocialBar />
      <Chatbot />

      <main className="flex-1">
        {/* ======================================================= */}
        {/* HEADER BANNER                                           */}
        {/* ======================================================= */}
        <div className="relative pt-32 pb-14 md:pt-36 md:pb-16 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-green-950 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-yellow-400/20 text-yellow-300 text-xs font-black rounded-full border border-yellow-400/30 mb-3">
                <span>👑 VIP MEMBER PORTAL</span>
                <span>•</span>
                <span>Exclusive Content</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Premium Farm Management Hub
              </h1>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl font-normal">
                Download bankable NABARD project reports, calculate low-cost TMR formulas, and schedule 1-on-1 consultations with livestock experts.
              </p>
            </div>

            {/* Auth Badge or Action */}
            {isLoggedIn ? (
              <div className="bg-slate-900/90 border border-slate-700 p-4 rounded-2xl flex items-center gap-4 shadow-xl">
                <div className="w-11 h-11 rounded-full bg-yellow-400 text-slate-950 font-black flex items-center justify-center text-lg">
                  👑
                </div>
                <div>
                  <div className="text-xs font-bold text-yellow-400 uppercase">Active VIP Member</div>
                  <div className="text-sm font-bold text-white max-w-[180px] truncate">{userEmail}</div>
                  <button
                    onClick={handleLogout}
                    className="text-[11px] text-slate-400 hover:text-red-400 font-semibold underline mt-0.5 transition"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleQuickDemoLogin}
                  className="px-4 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition transform hover:scale-105"
                >
                  🚀 Instant VIP Demo Login
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================= */}
        {/* CONDITIONAL CONTENT: LOCKED VS UNLOCKED                 */}
        {/* ======================================================= */}
        {!isLoggedIn ? (
          /* ======================================================= */
          /* 1. LOCKED GATEWAY SCREEN                                */
          /* ======================================================= */
          <section className="py-16 px-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left: What's Inside Locked Area */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-block p-3 bg-yellow-100 rounded-2xl text-2xl text-yellow-700">
                  🔒
                </div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight">
                  VIP Membership Login Required
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  This portal contains proprietary expert research, low-cost ration calculators, CAD shed blueprints, and bank-ready DPR project reports for commercial goat farmers.
                </p>

                {/* Feature Previews (Locked) */}
                <div className="space-y-3 pt-2">
                  {[
                    { title: 'NABARD 50+2 DPR Project Report', desc: 'Full CA-verified financial projection and subsidy claim file (.pdf / .docx)' },
                    { title: 'Interactive TMR Feed Formulation Tool', desc: 'Calculates cheapest 150-200g daily weight gain concentrate for your district' },
                    { title: '1-on-1 Expert Consultation', desc: 'Book direct 15-min emergency video calls with goat specialists' },
                    { title: 'Certified Breeding Stock Directory', desc: 'Direct contacts of inspected, disease-free Barbari & Sirohi farms' }
                  ].map((feat, idx) => (
                    <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs flex items-start gap-3">
                      <span className="text-base text-yellow-600 font-bold mt-0.5">🔒</span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{feat.title}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Login Box */}
              <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2">
                    🔑
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Member Sign In</h3>
                  <p className="text-slate-500 text-xs mt-1">Enter your registered farmer account credentials</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address / Phone</label>
                    <input
                      type="text"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="farmer@example.com"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-black rounded-xl text-sm transition shadow-md"
                  >
                    Sign In to VIP Portal ➔
                  </button>
                </form>

                {/* Quick 1-Click Demo Sign in & Razorpay Purchase */}
                <div className="mt-6 pt-6 border-t border-slate-100 text-center space-y-3">
                  <button
                    onClick={() =>
                      setSelectedPlan({
                        name: 'Farmer Starter',
                        priceNum: 1499,
                        priceStr: '₹1,499',
                        period: '/ 1 Month',
                        features: ['30-Day Action Plan', 'Video Masterclasses', 'WhatsApp Support'],
                      })
                    }
                    type="button"
                    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-slate-950 font-black rounded-xl text-xs sm:text-sm transition shadow-md flex items-center justify-center gap-2"
                  >
                    <span>💳 Unlock Access with Razorpay (₹1,499)</span>
                  </button>

                  <Link
                    href="/payment"
                    className="block w-full py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl text-xs transition text-center shadow-xs"
                  >
                    <span>📱 Pay via Direct UPI QR Code / All Plans ➔</span>
                  </Link>

                  <p className="text-[11px] text-slate-400 font-semibold">Testing or Exploring?</p>
                  <button
                    onClick={handleQuickDemoLogin}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-yellow-400 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <span>⚡ 1-Click Instant Demo Login</span>
                  </button>

                  <div className="pt-2 text-xs text-slate-500">
                    Want to see all membership plans?{' '}
                    <Link href="/premium" className="text-green-700 font-bold hover:underline">
                      View Pricing Tiers
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </section>
        ) : (
          /* ======================================================= */
          /* 2. UNLOCKED VIP MEMBER HUB                              */
          /* ======================================================= */
          <section className="py-12 px-6 max-w-7xl mx-auto animate-fadeIn">
            
            {/* VIP Tab Navigation Bar */}
            <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-2 mb-10">
              {[
                { id: 'dpr', label: '📁 Downloadable DPR & CAD', icon: '📁' },
                { id: 'feed-calc', label: '🌾 Low-Cost Feed Calculator', icon: '🌾' },
                { id: 'masterclasses', label: '🎓 Clinical Masterclasses', icon: '🎓' },
                { id: 'doctor', label: '🩺 Book Expert Doctor Call', icon: '🩺' },
                { id: 'seed-stock', label: '📜 Verified Breeder Hub', icon: '📜' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-2 shadow-xs ${
                    activeTab === tab.id
                      ? 'bg-green-700 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* TAB 1: DOWNLOADABLE DPR & BLUEPRINTS */}
            {activeTab === 'dpr' && (
              <div className="space-y-8 animate-fadeIn">
                <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    📁 Bankable Detailed Project Reports (DPR) & Architectural Drawings
                  </h3>
                  <p className="text-slate-600 text-sm mb-6">
                    All reports are formatted per NABARD guidelines with 5-year cash flow projections, debt service coverage ratio (DSCR), and mortality risk buffers.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        title: 'NABARD 50+2 Commercial Unit DPR',
                        fileType: 'PDF & Word (.docx)',
                        size: '4.8 MB',
                        desc: 'Complete project cost breakdown for 50 does + 2 bucks unit. Includes feed cost, vaccination schedule, and subsidy form.'
                      },
                      {
                        title: '100+4 Mega Farm Financial Model',
                        fileType: 'Excel Model (.xlsx)',
                        size: '2.4 MB',
                        desc: 'Customizable cash flow, IRR, and payback period spreadsheet ready to enter your local land and grain prices.'
                      },
                      {
                        title: 'Slatted Wooden Shed CAD Blueprint',
                        fileType: 'Architectural PDF',
                        size: '8.1 MB',
                        desc: 'Detailed engineering drawings for elevated wooden slats, zero-smell dung trenches, and predator-proof fencing.'
                      },
                      {
                        title: '12-Month National Vaccine Calendar',
                        fileType: 'High-Res Printable Poster',
                        size: '3.2 MB',
                        desc: 'Color-coded wall chart showing exact months for PPR, ET, Goat Pox, FMD, and dewormer rotation.'
                      },
                      {
                        title: 'TMR Silage Making Standard Protocol',
                        fileType: 'SOP Guide (.pdf)',
                        size: '1.9 MB',
                        desc: 'Standard Operating Procedure (SOP) for bag silage compaction, moisture testing, and fungal prevention.'
                      },
                      {
                        title: 'Commercial Farm Daily Log Sheets',
                        fileType: 'Printable Template (.pdf)',
                        size: '1.2 MB',
                        desc: 'Daily feed consumption, milk yield, kid birth weight, and medical treatment record sheets.'
                      }
                    ].map((doc, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-xs text-green-700 font-bold">
                            <span>{doc.fileType}</span>
                            <span className="text-slate-400">{doc.size}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-base">{doc.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
                        </div>

                        <button
                          onClick={() => alert(`Downloading "${doc.title}" (VIP Member License Verified).`)}
                          className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-green-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 shadow-xs"
                        >
                          <span>⬇️ Download Asset</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: INTERACTIVE FEED CALCULATOR */}
            {activeTab === 'feed-calc' && (
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm animate-fadeIn space-y-8">
                <div>
                  <span className="text-xs font-black text-green-700 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
                    🔬 Research-Based Formulation
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
                    🌾 Smart TMR Feed Formulation & Cost Calculator
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Enter the current raw grain prices in your local Mandi/district to compute the daily concentrate cost per goat and optimal nutritional balance.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left: Input Parameters (7 cols) */}
                  <div className="lg:col-span-7 space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
                      1. Enter Local Ingredient Costs (₹ / kg)
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          🌽 Crushed Maize / Corn (₹/kg)
                        </label>
                        <input
                          type="number"
                          value={maizePrice}
                          onChange={(e) => setMaizePrice(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          🌻 Mustard / Soya Cake (₹/kg)
                        </label>
                        <input
                          type="number"
                          value={mustardCakePrice}
                          onChange={(e) => setMustardCakePrice(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          🌾 De-oiled Rice Bran / Choker (₹/kg)
                        </label>
                        <input
                          type="number"
                          value={riceBranPrice}
                          onChange={(e) => setRiceBranPrice(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          🍯 Liquid Molasses / Sheera (₹/kg)
                        </label>
                        <input
                          type="number"
                          value={molassesPrice}
                          onChange={(e) => setMolassesPrice(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          🧪 Chelated Mineral Mixture (₹/kg)
                        </label>
                        <input
                          type="number"
                          value={mineralMixPrice}
                          onChange={(e) => setMineralMixPrice(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          🐐 Total Number of Goats on Farm
                        </label>
                        <input
                          type="number"
                          value={goatCount}
                          onChange={(e) => setGoatCount(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm font-bold"
                        />
                      </div>
                    </div>

                    {/* Standard Mixing Ratio */}
                    <div className="pt-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800">Standard 100kg Formulation Ratio: </span>
                      Maize (40kg) + Mustard Cake (25kg) + Rice Bran (25kg) + Molasses (8kg) + Mineral Mix (2kg).
                    </div>
                  </div>

                  {/* Right: Calculated Metrics (5 cols) */}
                  <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-green-950 text-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
                    <h4 className="font-bold text-yellow-400 text-xs uppercase tracking-wider">
                      📊 Computed Feed Economics
                    </h4>

                    <div className="space-y-4">
                      <div>
                        <div className="text-xs text-slate-300">Formulated Concentrate Cost:</div>
                        <div className="text-3xl font-black text-white">₹{costPerKg} <span className="text-xs font-normal text-slate-400">/ kg</span></div>
                      </div>

                      <div>
                        <div className="text-xs text-slate-300">Daily Total Feed Cost per Goat (Concentrate + Roughage):</div>
                        <div className="text-3xl font-black text-green-400">₹{dailyFeedCostPerGoat} <span className="text-xs font-normal text-slate-400">/ goat / day</span></div>
                        <p className="text-[11px] text-slate-400 mt-0.5">(Commercial pellet feed costs ₹15-18/day — Save up to 55%!)</p>
                      </div>

                      <div className="pt-4 border-t border-slate-800">
                        <div className="text-xs text-slate-300">Estimated Monthly Feed Bill for {goatCount} Goats:</div>
                        <div className="text-3xl font-black text-yellow-400">₹{monthlyHerdFeedCost} <span className="text-xs font-normal text-slate-400">/ month</span></div>
                      </div>

                      <div className="p-3 bg-white/10 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between">
                          <span>Crude Protein (CP):</span>
                          <span className="font-bold text-green-300">16.8% (Optimal for Growth)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Digestible Nutrients (TDN):</span>
                          <span className="font-bold text-green-300">71.5%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* TAB 3: VIDEO MASTERCLASSES */}
            {activeTab === 'masterclasses' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm animate-fadeIn space-y-6">
                <h3 className="text-2xl font-black text-slate-900">
                  🎓 12-Month Expert Masterclass Video Series
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Lesson 1: Zero-Smell Shed Engineering', dur: '45 Mins', img: '/1.jpeg', level: 'Beginner' },
                    { title: 'Lesson 2: Neonatal Kid Warming Box Setup', dur: '38 Mins', img: '/5 (5).jpeg', level: 'Critical' },
                    { title: 'Lesson 3: Vaccine Injection Angle Demonstration', dur: '52 Mins', img: '/5 (6).jpeg', level: 'Practical' },
                    { title: 'Lesson 4: TMR Silage Inoculant Preparation', dur: '41 Mins', img: '/5 (8).jpeg', level: 'Nutrition' },
                    { title: 'Lesson 5: Breeding Buck Soundness & Heat Detection', dur: '49 Mins', img: '/5 (4).jpeg', level: 'Breeding' },
                    { title: 'Lesson 6: Managing Diarrhea & Pneumonia Outbreaks', dur: '56 Mins', img: '/4.jpeg', level: 'Emergency' }
                  ].map((lesson, i) => (
                    <div key={i} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 group shadow-xs">
                      <div className="relative h-44 bg-slate-900">
                        <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 transition transform">
                            ▶
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {lesson.dur}
                        </span>
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-extrabold uppercase text-green-700 bg-green-100 px-2 py-0.5 rounded">
                          {lesson.level}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-2">{lesson.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: BOOK EXPERT DOCTOR CALL */}
            {activeTab === 'doctor' && (
              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm animate-fadeIn max-w-4xl mx-auto space-y-6">
                <div className="text-center max-w-xl mx-auto">
                  <div className="w-14 h-14 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-3">
                    🩺
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    Schedule 1-on-1 Doctor Video Call
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Direct video consultation with a senior goat expert to review herd symptoms, prescription dosages, or farm shed layout.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Date</label>
                      <input type="date" className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                      <select className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm">
                        <option>10:00 AM - 11:00 AM (Morning Slot)</option>
                        <option>02:00 PM - 03:00 PM (Afternoon Slot)</option>
                        <option>05:00 PM - 06:00 PM (Evening Slot)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Topic / Goat Symptoms</label>
                    <textarea rows={3} placeholder="Describe the health issue, shed construction questions, or feed formula review needed..." className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm"></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                      onClick={() => alert('Consultation appointment booked! You will receive meeting link and doctor contact on WhatsApp.')}
                      className="flex-1 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl text-sm shadow-md transition"
                    >
                      Confirm Doctor Appointment
                    </button>
                    <a
                      href="https://wa.me/+916392004098?text=Hello%20Doctor,%20I%20am%20a%20VIP%20Member%20and%20need%20urgent%20consultation"
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 py-3 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold rounded-xl text-sm shadow-md transition text-center flex items-center justify-center gap-2"
                    >
                      <span>💬 Direct Emergency WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: VERIFIED BREEDER HUB */}
            {activeTab === 'seed-stock' && (
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm animate-fadeIn space-y-6">
                <h3 className="text-2xl font-black text-slate-900">
                  📜 Verified Genetic Seed Stock Directory
                </h3>
                <p className="text-slate-600 text-sm">
                  Certified breeding farms with ear-tagged, vaccinated pedigree bucks and does.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'Barbari Seed Farm UP', location: 'Agra-Mathura Belt, Uttar Pradesh', breeds: 'Pure Barbari (White & Brown Spotted)', contact: '+91 63920 04098' },
                    { name: 'Sirohi Desert Breeding Stud', location: 'Ajmer / Nagaur, Rajasthan', breeds: 'Heavy Meat Sirohi Bucks & Does', contact: '+91 85288 20486' },
                    { name: 'Jamunapari Pedigree Center', location: 'Etawah, Uttar Pradesh', breeds: 'Roman Nose Giant Jamunapari', contact: '+91 63920 04098' },
                    { name: 'Boer Cross Genetic Hub', location: 'Pune / Nashik, Maharashtra', breeds: 'South African Boer F1/F2 Crosses', contact: '+91 85288 20486' }
                  ].map((hub, idx) => (
                    <div key={idx} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <span className="text-[10px] font-extrabold text-green-700 bg-green-100 px-2.5 py-0.5 rounded">
                        ✓ Inspected & Vaccinated
                      </span>
                      <h4 className="text-lg font-bold text-slate-900">{hub.name}</h4>
                      <p className="text-xs text-slate-600">📍 {hub.location}</p>
                      <p className="text-xs font-semibold text-slate-800">🧬 Available: {hub.breeds}</p>
                      <div className="pt-2">
                        <a
                          href={`https://wa.me/+916392004098?text=Hello,%20I%20am%20inquiring%20about%20seed%20stock%20at%20${encodeURIComponent(hub.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block text-xs font-bold text-green-700 bg-white border border-green-300 px-4 py-2 rounded-lg hover:bg-green-50 transition"
                        >
                          Contact Breeder on WhatsApp ➔
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </section>
        )}

        {/* Razorpay Checkout Modal */}
        <RazorpayModal
          plan={selectedPlan}
          onClose={() => setSelectedPlan(null)}
          onSuccess={(auth) => {
            setIsLoggedIn(true);
            setUserEmail(auth.email);
          }}
        />

      </main>

      <Footer />
    </div>
  );
}
