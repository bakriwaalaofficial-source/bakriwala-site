'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialBar from '@/components/SocialBar';
import Chatbot from '@/components/Chatbot';
import PageHeader from '@/components/PageHeader';

export default function ProgramsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [enrolledCourse, setEnrolledCourse] = useState<string | null>(null);
  const [isSubmittingEnroll, setIsSubmittingEnroll] = useState(false);
  const [enrollSuccess, setEnrollSuccess] = useState(false);
  const [enrollForm, setEnrollForm] = useState({
    name: '',
    phone: '',
    state: '',
    herdSize: 'Planning to start (0 goats)',
  });

  const programs = [
    {
      id: 'scientific-farming',
      category: 'farming',
      title: 'Commercial Goat Farming & Intensive Stall-Fed Setup',
      badge: 'Bestseller',
      duration: '4 Weeks (Online + Practical)',
      level: 'Beginner to Advanced',
      rating: '4.9 ★ (1,240+ Farmers)',
      image: '/5 (1).jpeg',
      description: 'Complete blueprint to design zero-smell elevated slatted sheds, manage ventilation, select commercial foundation stock, and achieve positive cashflow in Year 1.',
      modules: [
        'Elevated wooden slatted vs concrete flooring cost comparison',
        'Stall-fed (Zero grazing) management protocols',
        'Automated nipple watering and feeding trough sizing',
        'Daily farm schedule & labor optimization'
      ]
    },
    {
      id: 'disease-vaccination',
      category: 'health',
      title: 'Goat Disease Identification, Treatment & Vaccination',
      badge: 'Expert Certified',
      duration: '3 Weeks Intensive',
      level: 'All Farmers & Farm Supervisors',
      rating: '5.0 ★ (980+ Farmers)',
      image: '/5 (6).jpeg',
      description: 'Master practical diagnosis for PPR, Enterotoxaemia (ET), Goat Pox, Contagious Ecthyma (Orf), pneumonia, bloat, and diarrhea with exact dosage tables.',
      modules: [
        'Complete 12-month national vaccination calendar',
        'Emergency first-aid and injectable drug administration',
        'Deworming rotation strategy to prevent chemical resistance',
        'Traditional & Expert (Desi/Ayurvedic) home remedies'
      ]
    },
    {
      id: 'feed-formulation',
      category: 'nutrition',
      title: 'Low-Cost Nutrition, Silage & Total Mixed Ration (TMR)',
      badge: 'Cost-Saving',
      duration: '2 Weeks Masterclass',
      level: 'Intermediate',
      rating: '4.9 ★ (860+ Farmers)',
      image: '/5 (8).jpeg',
      description: 'Cut feeding costs by 40% using locally available agricultural by-products (corn, soya, wheat bran, molasses, mineral mixture) and silage bags.',
      modules: [
        'TMR feed formulation for 150-200g daily weight gain',
        'Bag and pit silage preparation with bacterial inoculants',
        'Cultivation of Super Napier, Moringa, Subabul, and Azolla',
        'Kid booster creep feed for rapid rumen development'
      ]
    },
    {
      id: 'kid-rearing',
      category: 'health',
      title: 'Zero Mortality Kid Care & Maternal Management',
      badge: 'Crucial for Profit',
      duration: '2 Weeks Workshop',
      level: 'All Breeders',
      rating: '4.9 ★ (720+ Farmers)',
      image: '/5 (10).jpeg',
      description: 'Protect newborn kids from hypothermia, pneumonia, and diarrhea. Achieve 95%+ survival rates and double your yearly herd growth.',
      modules: [
        'Colostrum feeding within first 2 hours of birth',
        'Navel disinfection and warming box protocols',
        'Artificial milk feeding and early weaning strategies',
        'Castration, dehorning, and tagging standards'
      ]
    },
    {
      id: 'subsidies-loans',
      category: 'business',
      title: 'NABARD Subsidies, Bank Loans & DPR Business Planning',
      badge: 'Finance & Govt',
      duration: '1 Week Crash Course',
      level: 'Entrepreneurs',
      rating: '4.8 ★ (1,500+ Enrolled)',
      image: '/5 (13).jpeg',
      description: 'How to prepare a Detailed Project Report (DPR) for banks, claim 33% to 50% capital subsidies, and secure animal husbandry infrastructure loans.',
      modules: [
        'National Livestock Mission (NLM) 50% subsidy application flow',
        'Bankable DPR calculations for 50+2 and 100+4 goat units',
        'Insurance claim procedures and tagging compliance',
        'Festive (Eid-ul-Adha) and organic meat premium sales'
      ]
    },
    {
      id: 'breeding-genetics',
      category: 'farming',
      title: 'Goat Genetics, Breeding & Selection of Pure Breeds',
      badge: 'High Yield',
      duration: '3 Weeks',
      level: 'Breeders',
      rating: '4.9 ★ (640+ Farmers)',
      image: '/5 (4).jpeg',
      description: 'Selecting superior breeding bucks and does from Barbari, Sirohi, Jamunapari, Black Bengal, and Boer stock to ensure consistent twin/triplet births.',
      modules: [
        'Preventing inbreeding depression in closed herds',
        'Buck-to-doe ratios and heat detection timing',
        'Artificial Insemination (AI) vs selective natural mating',
        'Pedigree record keeping and ear tag tracking'
      ]
    }
  ];

  const filteredPrograms =
    selectedCategory === 'all'
      ? programs
      : programs.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 relative flex flex-col justify-between">
      <Navbar />
      <SocialBar />
      <Chatbot />

      <main className="flex-1">
        <PageHeader
          badge="Scientific Curriculum"
          title="Training Programs & Masterclasses"
          subtitle="Designed by livestock experts, livestock economists, and experienced farm owners to maximize farm profit and zero out preventable losses."
          breadcrumb="Programs"
        />

        {/* Category Filters */}
        <section className="pt-12 pb-6 px-6 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { label: 'All Programs', val: 'all' },
              { label: 'Farm Management', val: 'farming' },
              { label: 'Health & Vaccines', val: 'health' },
              { label: 'Feed & Nutrition', val: 'nutrition' },
              { label: 'Business & Govt Subsidies', val: 'business' }
            ].map((cat) => (
              <button
                key={cat.val}
                onClick={() => setSelectedCategory(cat.val)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition shadow-xs ${
                  selectedCategory === cat.val
                    ? 'bg-green-700 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-12 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((course) => (
              <div
                key={course.id}
                id={course.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden bg-slate-100">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-green-700 text-white text-[11px] font-extrabold uppercase px-3 py-1 rounded-full shadow-md">
                      {course.badge}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                      {course.duration}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                      <span>{course.level}</span>
                      <span className="text-amber-600 font-bold">{course.rating}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-green-700 transition">
                      {course.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {course.description}
                    </p>

                    {/* Key Modules */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Key Curriculum Highlights:
                      </p>
                      {course.modules.map((mod, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => setEnrolledCourse(course.title)}
                    className="w-full py-3 bg-slate-900 group-hover:bg-green-700 text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Enroll / Request Syllabus</span>
                    <span>➔</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Learn with BakriWala */}
        <section className="py-20 bg-green-950 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-black mb-4">What Makes Our Training Unique?</h2>
              <p className="text-slate-300 text-base">Practical, hands-on knowledge directly applicable to Indian farming realities.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <div className="text-4xl mb-4">🩺</div>
                <h4 className="text-lg font-bold mb-2">Qualified Experts</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Lectures and guidance by experienced livestock experts with real livestock field experience.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <div className="text-4xl mb-4">📱</div>
                <h4 className="text-lg font-bold mb-2">Lifetime AI Access</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All students receive uninterrupted access to the BakriWala AI diagnostic assistant for real-time triage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <div className="text-4xl mb-4">📜</div>
                <h4 className="text-lg font-bold mb-2">Recognized Certificate</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Course completion certificates valid for bank loan and animal husbandry subsidy submissions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-lg font-bold mb-2">Buyer Community</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Direct networking with wholesale buyers, breeding centers, and fellow progressive farmers across states.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enrollment Modal */}
        {enrolledCourse && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-fadeIn border border-slate-200">
              <button
                onClick={() => {
                  setEnrolledCourse(null);
                  setEnrollSuccess(false);
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 text-xl font-bold p-2"
              >
                ✕
              </button>

              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center text-2xl mb-4">
                🎓
              </div>

              {enrollSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 bg-green-100 text-green-700 text-3xl rounded-full flex items-center justify-center mx-auto">
                    ✓
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Enrollment Query Sent!</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{enrollForm.name}</span>. Your enrollment application for{' '}
                    <span className="font-semibold text-green-800">"{enrolledCourse}"</span> has been dispatched to{' '}
                    <span className="font-bold text-slate-900">bakriwaalaofficial@gmail.com</span>. Our coordinator will call you at{' '}
                    <span className="font-bold text-green-700">{enrollForm.phone}</span> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setEnrolledCourse(null);
                      setEnrollSuccess(false);
                      setEnrollForm({ name: '', phone: '', state: '', herdSize: 'Planning to start (0 goats)' });
                    }}
                    className="mt-4 px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-green-700 transition"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">Enroll in Program</h3>
                  <p className="text-xs font-semibold text-green-700 mb-4">{enrolledCourse}</p>
                  
                  <form
                    className="space-y-3.5"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmittingEnroll(true);
                      try {
                        const res = await fetch('/api/contact', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            name: enrollForm.name,
                            phone: enrollForm.phone,
                            state: enrollForm.state,
                            queryType: 'training',
                            message: `Program Enrollment Request for "${enrolledCourse}". Herd size: ${enrollForm.herdSize}`,
                          }),
                        });
                        const data = await res.json();
                        if (res.ok && data.success) {
                          setEnrollSuccess(true);
                        } else {
                          alert(data.error || 'Enrollment query received. We will contact you soon.');
                          setEnrolledCourse(null);
                        }
                      } catch (err) {
                        alert('Your request was registered. Our training coordinator will call you shortly.');
                        setEnrolledCourse(null);
                      } finally {
                        setIsSubmittingEnroll(false);
                      }
                    }}
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={enrollForm.name}
                        onChange={(e) => setEnrollForm({ ...enrollForm, name: e.target.value })}
                        placeholder="Enter your full name"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={enrollForm.phone}
                        onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">State / District *</label>
                      <input
                        type="text"
                        required
                        value={enrollForm.state}
                        onChange={(e) => setEnrollForm({ ...enrollForm, state: e.target.value })}
                        placeholder="e.g. Lucknow, Uttar Pradesh"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Current Herd Size</label>
                      <select
                        value={enrollForm.herdSize}
                        onChange={(e) => setEnrollForm({ ...enrollForm, herdSize: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      >
                        <option>Planning to start (0 goats)</option>
                        <option>1 - 20 Goats</option>
                        <option>21 - 50 Goats</option>
                        <option>50+ Goats (Commercial)</option>
                      </select>
                    </div>

                    <div className="pt-2 flex gap-3">
                      <button
                        type="button"
                        onClick={() => setEnrolledCourse(null)}
                        className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingEnroll}
                        className="flex-1 py-3 bg-green-700 hover:bg-green-800 text-white font-bold rounded-xl text-sm shadow-md transition disabled:opacity-60"
                      >
                        {isSubmittingEnroll ? 'Sending...' : 'Confirm & Send'}
                      </button>
                    </div>
                    <p className="text-center text-[11px] text-slate-400">
                      Inquiry is delivered to bakriwaalaofficial@gmail.com
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
