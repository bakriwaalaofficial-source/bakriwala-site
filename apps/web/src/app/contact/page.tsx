'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SocialBar from '@/components/SocialBar';
import Chatbot from '@/components/Chatbot';
import PageHeader from '@/components/PageHeader';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    queryType: 'training',
    message: ''
  });

  const queryTypeLabels: Record<string, string> = {
    training: 'Training Program Enrollment',
    expert: 'Expert & Health Advisory',
    breeds: 'Breed Stock Purchase Inquiry',
    dpr: 'NABARD / Bank Loan DPR Report',
    other: 'Other Inquiry',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormSubmitted(true);
      } else {
        setSubmitError(data.error || 'Failed to submit query. Please try again or reach out on WhatsApp.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitError('Network error: Unable to submit query. Please check your connection or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello BakriWala Team, I have submitted a query regarding "${queryTypeLabels[formData.queryType] || formData.queryType}".\nName: ${formData.name}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
    );
    return `https://wa.me/+916392004098?text=${text}`;
  };

  const faqs = [
    {
      q: 'Where are BakriWala offline farm training programs conducted?',
      a: 'Our central classroom and practical demonstration sessions are organized in Lucknow and partner breeding facilities in Uttar Pradesh and Rajasthan. Online live masterclasses are accessible from anywhere in India.'
    },
    {
      q: 'How can I get immediate expert advice for a sick goat?',
      a: 'You can use our 24/7 floating AI chatbot for instant symptom triage, or message our expert medical team on WhatsApp at +91 63920 04098 with pictures/videos of the symptoms for priority doctor guidance.'
    },
    {
      q: 'Do you provide certificate support for NABARD / Bank loans?',
      a: 'Yes! Upon completing our commercial goat farming training course, you receive a verified Certificate of Farm Management recognized by financial institutions and animal husbandry departments for loan & subsidy files.'
    },
    {
      q: 'Can you help procure pure Barbari, Sirohi, or Boer breeding goats?',
      a: 'Yes, our network connects verified breeders with farmers seeking authenticated, disease-free, vaccinated pedigree stock with ear tags.'
    }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 bg-slate-50 relative flex flex-col justify-between">
      <Navbar />
      <SocialBar />
      <Chatbot />

      <main className="flex-1">
        <PageHeader
          badge="Support & Connect"
          title="Contact BakriWalaOfficial"
          subtitle="Reach out to our farming experts, training coordinators, or head office in Lucknow for guidance, farm visits, and partnership inquiries."
          breadcrumb="Contact"
        />

        {/* Contact Grid Section */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Contact Information Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
                  Head Office & Advisory
                </span>
                <h2 className="text-3xl font-black text-slate-900 mt-2 mb-2">We Are Here to Help</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Have a question about modern shed construction, feed ration formulation, or booking an expert consultation? Contact us anytime.
                </p>
              </div>

              {/* Head Office Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Head Office</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    14/96, Tripathi Niwas, Sector-14, Indira Nagar, Lucknow, Uttar Pradesh, India, 226016
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-xl flex-shrink-0">
                  📞
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Helpline Numbers</h3>
                  <p className="text-slate-700 font-bold text-sm mt-1">
                    +91 85288 20486 <br />
                    +91 63920 04098
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Monday to Saturday: 9:00 AM – 6:00 PM</p>
                </div>
              </div>

              {/* WhatsApp Instant Support Card */}
              <a
                href="https://wa.me/+916392004098?text=Hello%20BakriWala%20Team,%20I%20have%20a%20query%20about%20your%20services"
                target="_blank"
                rel="noreferrer"
                className="bg-green-700 hover:bg-green-800 text-white p-6 rounded-2xl shadow-md transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center text-2xl flex-shrink-0">
                    💬
                  </div>
                  <div>
                    <h3 className="font-bold text-base">Chat on WhatsApp</h3>
                    <p className="text-green-100 text-xs mt-0.5">Instant response for farmer queries</p>
                  </div>
                </div>
                <span className="text-xl font-bold group-hover:translate-x-1 transition transform">➔</span>
              </a>

              {/* Email Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-xl flex-shrink-0">
                  ✉️
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Official Email</h3>
                  <a
                    href="mailto:bakriwaalaofficial@gmail.com"
                    className="text-green-700 hover:underline text-sm mt-1 font-semibold block"
                  >
                    bakriwaalaofficial@gmail.com
                  </a>
                  <p className="text-slate-500 text-xs mt-1">All website queries are routed directly here</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Form (7 cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg relative">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-5 animate-fadeIn">
                  <div className="w-20 h-20 bg-green-100 text-green-700 text-4xl rounded-full flex items-center justify-center mx-auto shadow-inner">
                    ✓
                  </div>
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200 mb-2">
                      Delivered to Official Inbox
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">Query Received Successfully!</h3>
                  </div>
                  <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
                    Thank you, <span className="font-bold text-slate-900">{formData.name || 'Farmer'}</span>. Your message regarding{' '}
                    <span className="font-semibold text-green-800">
                      {queryTypeLabels[formData.queryType] || formData.queryType}
                    </span>{' '}
                    has been delivered to{' '}
                    <span className="font-bold text-slate-900">bakriwaalaofficial@gmail.com</span>. Our agricultural livestock officer will reach out to{' '}
                    <span className="font-bold text-green-700">{formData.phone}</span> within 24 hours.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
                    >
                      <span>💬 Chat Instantly on WhatsApp</span>
                    </a>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', state: '', queryType: 'training', message: '' });
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition"
                    >
                      Submit Another Query
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="text-2xl font-black text-slate-900">Send us a Message</h3>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-medium">
                        ✉️ bakriwaalaofficial@gmail.com
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs sm:text-sm mt-1">
                      Fill out the details below. Your query is sent directly to our official inbox and team.
                    </p>
                  </div>

                  {submitError && (
                    <div className="mb-5 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs sm:text-sm flex items-start gap-2">
                      <span className="text-base flex-shrink-0">⚠️</span>
                      <div className="flex-1">
                        <p className="font-bold">Submission notice:</p>
                        <p>{submitError}</p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Rajesh Singh"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Mobile *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="farmer@gmail.com"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">State / District *</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="e.g. Lucknow, UP / Patna, Bihar"
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Query Subject *</label>
                      <select
                        value={formData.queryType}
                        onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600 font-medium text-slate-700"
                      >
                        <option value="training">Training Program Enrollment</option>
                        <option value="expert">Expert & Health Advisory</option>
                        <option value="breeds">Breed Stock Purchase Inquiry</option>
                        <option value="dpr">NABARD / Bank Loan DPR Report</option>
                        <option value="other">Other Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Question or Farm Details *</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your requirements, existing goat count, shed plans, or questions..."
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 bg-green-700 hover:bg-green-800 text-white font-black text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Sending Query to BakriWala...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Query to BakriWala</span>
                          <span>➔</span>
                        </>
                      )}
                    </button>

                    <p className="text-center text-[11px] text-slate-400 mt-2">
                      🔒 Your query is delivered directly to <span className="font-semibold text-slate-600">bakriwaalaofficial@gmail.com</span> and our WhatsApp advisory desk.
                    </p>
                  </form>
                </>
              )}
            </div>

          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-green-700 uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full border border-green-200">
                Common Questions
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-slate-200 rounded-2xl overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-5 text-left font-bold text-slate-900 bg-slate-50/70 hover:bg-slate-100 flex justify-between items-center text-sm sm:text-base transition"
                  >
                    <span>{faq.q}</span>
                    <span className="text-green-700 font-black text-lg ml-4">
                      {openFaq === index ? '−' : '+'}
                    </span>
                  </button>

                  {openFaq === index && (
                    <div className="p-5 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
