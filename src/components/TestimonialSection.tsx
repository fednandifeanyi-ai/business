import React from 'react';
import { Quote, MessageSquare, Star, PlusCircle } from 'lucide-react';

interface TestimonialSectionProps {
  onStartProject: () => void;
}

export const TestimonialSection: React.FC<TestimonialSectionProps> = ({ onStartProject }) => {
  const placeholderCards = [
    {
      slot: 'Client Review Slot #01',
      industry: 'E-commerce & Retail Client',
      serviceUsed: 'AI Automation & WhatsApp System',
      text: '“Your verified client testimonial and success story will be featured here once your project is delivered and reviewed.”',
      status: 'Ready for Verified Client Feedback',
    },
    {
      slot: 'Client Review Slot #02',
      industry: 'Corporate & Logistics Enterprise',
      serviceUsed: 'Website Development & Branding',
      text: '“Client quote highlighting design quality, turnaround speed, and business conversion improvements will appear here.”',
      status: 'Ready for Verified Client Feedback',
    },
    {
      slot: 'Client Review Slot #03',
      industry: 'Real Estate & Product Launch',
      serviceUsed: 'Video Advertising & Meta Ads Funnel',
      text: '“Testimonial showcasing return on ad spend, lead volume generated, and customer acquisition metrics will be displayed here.”',
      status: 'Ready for Verified Client Feedback',
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden bg-[#FAF7F2] border-t border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F2ECE1] border border-[#D5C8B4] text-[#0F2C59] text-xs font-mono mb-4 shadow-sm">
            <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
            <span className="font-semibold">CLIENT EXPERIENCES & FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1E3F] tracking-tight mb-3 font-display">
            Built on Real Results & Transparency
          </h2>
          <p className="text-sm sm:text-base text-slate-700">
            We prioritize genuine client satisfaction. As new projects complete, real business testimonials are published directly here.
          </p>
        </div>

        {/* 3 Transparent Testimonial Placeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {placeholderCards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E5DDCF] hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-blue-900 bg-[#F2ECE1] px-2.5 py-0.5 rounded border border-[#D5C8B4] font-semibold">
                    {card.slot}
                  </span>
                </div>

                <Quote className="w-8 h-8 text-blue-200 mb-3" />

                <p className="text-sm text-slate-700 italic mb-6 leading-relaxed">
                  {card.text}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5DDCF]">
                <div className="text-xs font-bold text-[#0A1E3F]">{card.industry}</div>
                <div className="text-[11px] text-blue-700 font-mono font-medium">{card.serviceUsed}</div>
                <div className="mt-2 text-[10px] text-slate-600 flex items-center gap-1">
                  <PlusCircle className="w-3 h-3 text-blue-600" />
                  <span>{card.status}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA to become the next success story */}
        <div className="rounded-2xl bg-white border border-[#E5DDCF] p-6 text-center max-w-2xl mx-auto shadow-sm">
          <p className="text-sm text-slate-700 mb-3">
            Want your business featured as our next breakout client success story?
          </p>
          <button
            onClick={onStartProject}
            className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#0F2C59] hover:bg-[#1E3A8A] transition-all cursor-pointer shadow-md"
          >
            Launch Your Project With Us
          </button>
        </div>

      </div>
    </section>
  );
};
