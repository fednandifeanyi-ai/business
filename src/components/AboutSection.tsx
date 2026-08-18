import React from 'react';
import { Bot, Layers, Sparkles, TrendingUp, CheckCircle, ArrowRight, Shield } from 'lucide-react';

interface AboutSectionProps {
  onStartProject: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onStartProject }) => {
  const pillars = [
    {
      title: 'Smart Technology',
      desc: 'High-speed web architecture, CRM databases, and integrated cloud tools.',
      icon: Layers,
      color: 'bg-blue-100/80 border-blue-200 text-blue-700',
    },
    {
      title: 'Creative Design',
      desc: 'Distinctive brand identities, logos, brochures, and visual promotional assets.',
      icon: Sparkles,
      color: 'bg-sky-100/80 border-sky-200 text-sky-700',
    },
    {
      title: 'AI Automation',
      desc: 'Automated WhatsApp responses, lead intake forms, and zero-effort follow-ups.',
      icon: Bot,
      color: 'bg-indigo-100/80 border-indigo-200 text-indigo-700',
    },
    {
      title: 'Digital Advertising',
      desc: 'Direct-response ads, video reels, and conversion funnels that drive revenue.',
      icon: TrendingUp,
      color: 'bg-blue-100/80 border-blue-300 text-blue-800',
    }
  ];

  const whoWeHelp = [
    'Entrepreneurs & Founders',
    'Startups & Scaleups',
    'Small & Medium Businesses',
    'E-commerce & Retail Brands',
    'Real Estate & Developers',
    'Restaurants & Hospitality',
    'Service Providers & Consultants',
    'Medical & Dental Clinics',
    'Churches & Organizations',
    'Product-Based Enterprises'
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden cream-dot-bg">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F2ECE1] border border-[#D5C8B4] text-[#0F2C59] text-xs font-mono mb-4">
            <Shield className="w-3.5 h-3.5 text-blue-700" />
            <span className="font-semibold">WHO WE ARE & OUR MISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1E3F] tracking-tight leading-tight mb-6 font-display">
            Technology That Helps Your Business{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
              Move Forward
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
            <strong className="text-[#0A1E3F]">Soft Tech World & AI Automation</strong> combines technology, creativity, and digital marketing to help businesses establish a stronger online presence, automate repetitive processes, and attract more paying customers.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We don’t simply create digital products. We create practical, revenue-generating solutions designed to help businesses <strong className="text-blue-700">look better, work smarter, and grow faster.</strong>
          </p>
        </div>

        {/* Feature Grid: Technology + Creativity + AI + Advertising */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="cream-card p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${pillar.color} border flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 font-display">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlighted Executive Banner: Your Business Deserves More Than Just a Logo */}
        <div className="rounded-3xl bg-[#0A1E3F] border border-blue-500/30 p-8 sm:p-12 relative overflow-hidden shadow-2xl text-white">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-mono text-blue-300 uppercase tracking-widest block mb-2 font-semibold">
                Strategic Foundation
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 font-display">
                Your Business Deserves More Than Just a Logo
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Having a great business is only part of the journey. You also need a professional brand identity, attractive designs, effective advertising, a strong online presence, and smart systems that help you manage your business efficiently.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                That’s where <strong className="text-white">Soft Tech World & AI Automation</strong> comes in. We combine <strong className="text-blue-300">technology + creativity + AI + advertising</strong> to help businesses move from simply existing online to <strong className="text-white">looking professional, commanding authority, and generating consistent opportunities.</strong>
              </p>
              
              {/* Who We Help Tag Cloud */}
              <div>
                <span className="text-xs font-mono text-blue-200/80 uppercase tracking-wider block mb-3 font-semibold">
                  Industries & Clients We Support:
                </span>
                <div className="flex flex-wrap gap-2">
                  {whoWeHelp.map((item, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#0F2A56] border border-blue-700/60 text-blue-100 hover:border-blue-400 hover:text-white transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="p-6 rounded-2xl bg-[#081833] border border-blue-700/50 text-center w-full max-w-sm shadow-xl flex flex-col items-center">
                <div className="relative mb-3">
                  <img
                    src="/display-picture.jpg"
                    alt="Soft Tech World Lead Consultant"
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-400 shadow-lg"
                  />
                  <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#081833]"></span>
                </div>
                <span className="text-xs font-mono text-blue-300 block mb-1">Direct Strategy & Leadership</span>
                <div className="text-lg font-extrabold text-white mb-2 font-display tracking-tight">
                  TECH + DESIGN + AI + ADS
                </div>
                <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                  Directly consult with our lead technologist to engineer your full digital presence from concept to revenue.
                </p>
                <button
                  onClick={onStartProject}
                  className="w-full py-3 rounded-xl font-bold text-sm text-[#0A1E3F] bg-[#F2ECE1] hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Build With Us Today</span>
                  <ArrowRight className="w-4 h-4 text-blue-800" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
