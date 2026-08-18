import React from 'react';
import { PROCESS_STEPS } from '../data/servicesData';
import { FileText, Compass, Cpu, Rocket, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartProject: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartProject }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return FileText;
      case 'Compass': return Compass;
      case 'Cpu': return Cpu;
      case 'Rocket': return Rocket;
      default: return Rocket;
    }
  };

  return (
    <section id="process" className="py-24 relative overflow-hidden cream-dot-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F2ECE1] border border-[#D5C8B4] text-[#0F2C59] text-xs font-mono mb-4 shadow-sm">
            <Rocket className="w-3.5 h-3.5 text-blue-700" />
            <span className="font-semibold">EXECUTION FRAMEWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1E3F] tracking-tight mb-4 font-display">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            A seamless, transparent 4-stage pipeline designed to take your idea from initial concept to high-performing digital reality.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative mb-16">
          {PROCESS_STEPS.map((step, idx) => {
            const Icon = getIcon(step.icon);
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white border border-[#E5DDCF] hover:border-blue-400 hover:shadow-lg p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 group shadow-sm"
              >
                {/* Step indicator tag */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-black font-mono text-blue-600 group-hover:text-blue-700">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-bold text-[#0A1E3F] mb-2 font-display group-hover:text-blue-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Timeline connector visual (visible on desktop) */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <div className="w-6 h-6 rounded-full bg-white border border-[#D5C8B4] shadow-sm flex items-center justify-center text-blue-700 text-xs font-bold">
                      →
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

        {/* Callout action */}
        <div className="text-center">
          <button
            onClick={onStartProject}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white bg-[#0F2C59] hover:bg-[#1E3A8A] shadow-xl shadow-[#0F2C59]/20 transition-all cursor-pointer"
          >
            <span>Ready to Begin Step 01? Submit Your Details</span>
            <ArrowRight className="w-4 h-4 text-blue-300" />
          </button>
        </div>

      </div>
    </section>
  );
};
