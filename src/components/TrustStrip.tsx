import React from 'react';
import { Bot, Palette, Megaphone, Globe, Video, ArrowUpRight } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    { title: 'AI Automation', desc: 'Workflows & Bots', icon: Bot, href: '#services' },
    { title: 'Professional Design', desc: 'Logos & Branding', icon: Palette, href: '#services' },
    { title: 'Digital Advertising', desc: 'Targeted Campaigns', icon: Megaphone, href: '#services' },
    { title: 'Business Websites', desc: 'High-Converting Web', icon: Globe, href: '#services' },
    { title: 'Video Creation', desc: 'Promos & 4K Reels', icon: Video, href: '#services' },
  ];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E5DDCF] shadow-lg shadow-blue-950/5 p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.href}
                className="group p-3 rounded-xl bg-[#FAF7F2] hover:bg-blue-50/80 border border-[#E5DDCF] hover:border-blue-400 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100/70 border border-blue-200 flex items-center justify-center text-blue-700 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0A1E3F] group-hover:text-blue-700 transition-colors truncate">
                      {item.title}
                    </h4>
                    <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-all shrink-0" />
                  </div>
                  <p className="text-[11px] text-slate-600 truncate">{item.desc}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
