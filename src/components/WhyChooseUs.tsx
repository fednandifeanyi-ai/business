import React from 'react';
import { WHY_CHOOSE_ITEMS } from '../data/servicesData';
import { ShieldCheck, Zap, Sparkles, Target, HeartHandshake, TrendingUp, Check } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return ShieldCheck;
      case 'Zap': return Zap;
      case 'Sparkles': return Sparkles;
      case 'Target': return Target;
      case 'HeartHandshake': return HeartHandshake;
      case 'TrendingUp': return TrendingUp;
      default: return Sparkles;
    }
  };

  return (
    <section id="why-us" className="py-24 relative overflow-hidden bg-[#F4EFE6] border-y border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-[#D5C8B4] text-[#0F2C59] text-xs font-mono mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span className="font-semibold">THE SOFT TECH ADVANTAGE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1E3F] tracking-tight leading-tight mb-4 font-display">
            Why Businesses Choose{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
              Soft Tech World
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            Instead of hiring different people for your website, graphics, branding, advertising, and automation, you get multiple digital solutions orchestrated under one technology-focused roof.
          </p>
        </div>

        {/* 6 Benefit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-[#E5DDCF] hover:border-blue-400 hover:shadow-lg transition-all duration-300 group shadow-sm"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-bold">0{idx + 1}</span>
                </div>

                <h3 className="text-xl font-bold text-[#0A1E3F] mb-2 font-display group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Executive Banner Comparison */}
        <div className="rounded-2xl bg-[#0A1E3F] border border-blue-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 shrink-0">
              <Check className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white font-display">
                One Dedicated Partner. Endless Digital Capability.
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Less manual work • Faster responses • Better organization • More time to grow.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-[#0A1E3F] bg-[#FAF7F2] hover:bg-white transition-all whitespace-nowrap shadow-md"
          >
            Start Working With Us
          </a>
        </div>

      </div>
    </section>
  );
};
