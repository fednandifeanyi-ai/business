import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, MessageCircle, Send, CheckCircle2, AlertCircle, Phone, Mail, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { Lead } from '../types';
import { ASSET_IMAGES, handleImageError } from '../constants/assets';

interface LeadFormSectionProps {
  initialService?: string;
  initialDescription?: string;
  onSubmissionSuccess: (lead: Lead, whatsappUrl: string) => void;
}

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  initialService,
  initialDescription,
  onSubmissionSuccess
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    business_name: '',
    phone: '',
    email: '',
    service: 'AI Automation',
    budget: '₦100,000 – ₦250,000',
    project_description: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
    if (initialDescription) {
      setFormData(prev => ({
        ...prev,
        project_description: prev.project_description
          ? `${prev.project_description}\n\n[Selected Reference: ${initialDescription}]`
          : `I am interested in a solution similar to: ${initialDescription}`
      }));
    }
  }, [initialService, initialDescription]);

  const serviceOptions = [
    'AI Automation',
    'Website Development',
    'Graphic Design',
    'Logo Design',
    'Branding',
    'Video Creation',
    'Business Advertising',
    'Social Media Content',
    'Custom Digital Solutions',
    'Other'
  ];

  const budgetOptions = [
    'Below ₦50,000',
    '₦50,000 – ₦100,000',
    '₦100,000 – ₦250,000',
    '₦250,000 – ₦500,000',
    '₦500,000+',
    'Not Sure Yet'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Client validation
    if (!formData.full_name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your phone / WhatsApp number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!formData.project_description.trim()) {
      setErrorMessage('Please tell us briefly about your project or requirements.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit project request.');
      }

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (cErr) {
        console.log('Confetti triggered', cErr);
      }

      setSuccessMessage(data.message || "Thank you! Your project request has been received. We'll get back to you shortly.");
      
      // Notify parent to open the customized WhatsApp quick-send modal
      onSubmissionSuccess(data.lead, data.whatsappUrl);

      // Reset form
      setFormData({
        full_name: '',
        business_name: '',
        phone: '',
        email: '',
        service: 'AI Automation',
        budget: '₦100,000 – ₦250,000',
        project_description: '',
      });

    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred. Please try again or chat with us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#FAF7F2] border-t border-[#E5DDCF] cream-dot-bg">
      {/* Background visual light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Banner Callout */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F2ECE1] border border-[#D5C8B4] text-[#0F2C59] text-xs font-mono mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span className="font-semibold">START YOUR TRANSFORMATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1E3F] tracking-tight mb-4 font-display">
            Ready to Take Your Business to the Next Level?
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            Whether you need AI automation, a professional website, company branding, graphics, video creation, or business advertising, let’s discuss your project today.
          </p>
        </div>

        {/* Grid: Contact Details & Guarantee + High Converting Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct channels & benefits */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-white border border-[#E5DDCF] shadow-xl">
              {/* Consultant DP & Status Card */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#D5C8B4] mb-6">
                <div className="relative shrink-0">
                  <img
                    src={ASSET_IMAGES.displayPicture.local}
                    alt={ASSET_IMAGES.displayPicture.alt}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-600 shadow-md"
                    onError={(e) => handleImageError(e, ASSET_IMAGES.displayPicture.cdn)}
                  />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-600"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-blue-700 font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Lead Tech Strategist</span>
                  </div>
                  <h4 className="text-base font-bold text-[#0A1E3F] font-display">
                    Soft Tech World & AI
                  </h4>
                  <span className="text-[11px] text-emerald-700 font-semibold font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Available for WhatsApp Scoping
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono text-blue-700 uppercase tracking-widest block mb-2 font-semibold">
                Direct Communication
              </span>
              <h3 className="text-2xl font-bold text-[#0A1E3F] mb-4 font-display">
                Prefer an Instant Chat?
              </h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Connect directly with our lead strategist on WhatsApp for rapid project assessment, pricing estimates, and immediate onboarding.
              </p>

              {/* Direct WhatsApp Callout Card */}
              <a
                href="https://wa.me/2349153584833?text=Hello%20Soft%20Tech%20World%20%26%20AI%20Automation%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 hover:border-emerald-500 text-emerald-900 transition-all flex items-center justify-between group shadow-sm mb-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 border border-emerald-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-700 uppercase block font-semibold">WhatsApp Line</span>
                    <span className="text-base font-bold text-emerald-950 font-mono">09153584833</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-700 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Direct Call Line */}
              <a
                href="tel:09153584833"
                className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E5DDCF] hover:border-blue-400 text-slate-800 transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-blue-700 uppercase block font-semibold">Direct Phone Line</span>
                    <span className="text-base font-bold text-[#0A1E3F] font-mono">+234 915 358 4833</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-transform" />
              </a>

            </div>

            {/* Guarantees Box */}
            <div className="p-6 rounded-2xl bg-white border border-[#E5DDCF] space-y-3.5 shadow-sm">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0A1E3F]">Guaranteed Confidentiality</h4>
                  <p className="text-xs text-slate-600">All business ideas, concepts, and customer data remain 100% private.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0A1E3F]">Rapid Response Window</h4>
                  <p className="text-xs text-slate-600">Inquiries are reviewed and answered within minutes during business hours.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#0A1E3F]">Automated Database & Sheet Sync</h4>
                  <p className="text-xs text-slate-600">Your details are safely stored and dispatched directly to our project queue.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-[#E5DDCF] p-6 sm:p-10 shadow-xl relative">
              
              <div className="mb-6 pb-4 border-b border-[#E5DDCF]">
                <span className="text-xs font-mono text-blue-700 uppercase tracking-widest block mb-1 font-semibold">
                  PROJECT INTAKE
                </span>
                <h3 className="text-2xl font-bold text-[#0A1E3F] font-display">
                  Tell Us What You Need
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Fill out the form below to receive a customized solution plan and quotation.
                </p>
              </div>

              {/* Error state */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Success state */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <strong className="block font-semibold">Success!</strong>
                    <span>{successMessage}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name & Business */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase font-mono text-[#0A1E3F] mb-1.5">
                      Full Name <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chidi Okonkwo"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#D5C8B4] text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase font-mono text-[#0A1E3F] mb-1.5">
                      Business Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Logistics"
                      value={formData.business_name}
                      onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#D5C8B4] text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase font-mono text-[#0A1E3F] mb-1.5">
                      Phone / WhatsApp <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0803 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#D5C8B4] text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase font-mono text-[#0A1E3F] mb-1.5">
                      Email Address <span className="text-blue-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#D5C8B4] text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
                    />
                  </div>
                </div>

                {/* Service & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase font-mono text-[#0A1E3F] mb-1.5">
                      Service Required <span className="text-blue-600">*</span>
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#D5C8B4] text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all cursor-pointer"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase font-mono text-[#0A1E3F] mb-1.5">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#D5C8B4] text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all cursor-pointer"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold uppercase font-mono text-[#0A1E3F] mb-1.5">
                    Tell us about your project <span className="text-blue-600">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your business goals, current bottlenecks, or the specific features you want built..."
                    value={formData.project_description}
                    onChange={(e) => setFormData({ ...formData, project_description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-[#D5C8B4] text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  id="submit-lead-btn"
                  className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-[#0F2C59] hover:bg-[#1E3A8A] shadow-xl shadow-[#0F2C59]/25 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving & Securing Lead...</span>
                    </div>
                  ) : (
                    <>
                      <span>SUBMIT PROJECT REQUEST</span>
                      <Send className="w-5 h-5 text-blue-200" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-600 pt-2">
                  🔒 Your details are saved securely in our database, synced to our Google Sheets ledger, and a direct WhatsApp conversation will be prepared for you.
                </p>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
