import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { Bot, Globe, Palette, Sparkles, Video, Megaphone, Share2, Cpu, ArrowRight, CheckCircle2, Zap } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot': return Bot;
      case 'Globe': return Globe;
      case 'Palette': return Palette;
      case 'Sparkles': return Sparkles;
      case 'Video': return Video;
      case 'Megaphone': return Megaphone;
      case 'Share2': return Share2;
      case 'Cpu': return Cpu;
      default: return Cpu;
    }
  };

  const featuredCards = [
    {
      title: 'AI AUTOMATION',
      punchline: 'Stop doing manually what technology can do automatically.',
      desc: 'Connect your landing pages, customer intake, and WhatsApp notifications into an automated lead generation machine that runs 24/7.',
      serviceTag: 'AI Automation',
      gradient: 'from-[#0A1E3F] to-[#0F2C59]',
      borderGrad: 'border-blue-500/40',
      icon: Bot,
      iconColor: 'text-blue-300',
      badge: 'High Impact Automation'
    },
    {
      title: 'CREATIVE DESIGN & BRANDING',
      punchline: 'Make your business look as professional as the service you provide.',
      desc: 'First impressions determine credibility. We design distinctive company logos, brand identities, flyers, and marketing graphics that build trust.',
      serviceTag: 'Graphic Design',
      gradient: 'from-[#0A1E3F] to-[#123164]',
      borderGrad: 'border-blue-500/40',
      icon: Palette,
      iconColor: 'text-sky-300',
      badge: 'Visual Authority'
    },
    {
      title: 'BUSINESS ADVERTISING',
      punchline: 'Turn attention into customers with powerful digital advertising.',
      desc: 'Having a great product is not enough if nobody knows about it. We create high-converting promotional campaigns, video reels, and targeted ads.',
      serviceTag: 'Business Advertising',
      gradient: 'from-[#0A1E3F] to-[#0D2447]',
      borderGrad: 'border-blue-500/40',
      icon: Megaphone,
      iconColor: 'text-blue-200',
      badge: 'Customer Acquisition'
    }
  ];

  return (
    <section id="services" className="py-24 relative cream-grid-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F2ECE1] border border-[#D5C8B4] text-[#0F2C59] text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5 text-blue-700" />
            <span className="font-semibold">FULL-STACK DIGITAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1E3F] tracking-tight mb-4 font-display">
            What We Do
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            From smart AI automation and bespoke web platforms to distinctive visual branding and high-yield advertising campaigns.
          </p>
        </div>

        {/* 3 Large Featured Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {featuredCards.map((card, idx) => {
            const CardIcon = card.icon;
            return (
              <div
                key={idx}
                className={`rounded-3xl bg-gradient-to-b ${card.gradient} border ${card.borderGrad} p-8 flex flex-col justify-between relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group text-white`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-[#081833] text-blue-200 border border-blue-400/30">
                      {card.badge}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#081833] border border-blue-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <CardIcon className={`w-6 h-6 ${card.iconColor}`} />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 font-display">
                    {card.title}
                  </h3>

                  <p className="text-sm font-semibold text-blue-300 mb-4 leading-snug">
                    {card.punchline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-blue-900/60 relative z-10">
                  <button
                    onClick={() => onSelectService(card.serviceTag)}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-[#0A1E3F] bg-[#FAF7F2] hover:bg-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Get Started with {card.title.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-blue-800" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete 8 Services Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5DDCF]">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0A1E3F] font-display">
                All Core Services & Offerings
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Select any service below to automatically configure your project request form.
              </p>
            </div>
            <span className="hidden sm:block text-xs font-mono text-blue-800 bg-[#F2ECE1] px-3 py-1.5 rounded-lg border border-[#D5C8B4] font-semibold">
              8 Specializations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_DATA.map((service) => {
              const IconComp = getIcon(service.icon);
              return (
                <div
                  key={service.id}
                  className="cream-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div>
                    {/* Header */}
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h4 className="text-lg font-bold text-[#0A1E3F] mb-2 group-hover:text-blue-700 transition-colors font-display">
                      {service.name}
                    </h4>

                    <p className="text-xs text-slate-600 mb-4 leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>

                    {/* Bullet Points */}
                    <ul className="space-y-1.5 mb-6">
                      {service.items.slice(0, 4).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action */}
                  <div className="pt-4 border-t border-[#E5DDCF]">
                    <button
                      onClick={() => onSelectService(service.name)}
                      className="w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-blue-800 hover:text-white bg-blue-50 hover:bg-blue-600 border border-blue-200 hover:border-blue-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Request Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
