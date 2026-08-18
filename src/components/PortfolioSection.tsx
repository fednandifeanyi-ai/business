import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/servicesData';
import { PortfolioItem } from '../types';
import { Sparkles, Eye, ArrowRight, Tag, Layers, CheckCircle2 } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectProject: (serviceName: string, projectTitle: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPreview, setSelectedPreview] = useState<PortfolioItem | null>(null);

  const categories = [
    'All',
    'AI Automation',
    'Websites',
    'Graphic Design',
    'Branding',
    'Video Advertising',
    'Business Advertising'
  ];

  const filteredItems = activeCategory === 'All'
    ? PORTFOLIO_DATA
    : PORTFOLIO_DATA.filter(item => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 relative bg-[#FAF7F2] border-t border-[#E5DDCF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F2ECE1] border border-[#D5C8B4] text-[#0F2C59] text-xs font-mono mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span className="font-semibold">PORTFOLIO & PROOF OF CRAFT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A1E3F] tracking-tight mb-4 font-display">
            Featured Projects & Concepts
          </h2>
          <p className="text-base sm:text-lg text-slate-700">
            Explore our curated showcase of sample projects and concept designs across automation, web development, brand identity, and marketing.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === category
                  ? 'bg-[#0F2C59] text-white shadow-md shadow-[#0F2C59]/20'
                  : 'bg-white text-slate-700 hover:text-blue-800 hover:bg-blue-50 border border-[#E5DDCF]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-[#E5DDCF] hover:border-blue-400 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-sm"
            >
              {/* Visual Header Banner */}
              {item.image ? (
                <div className="h-56 relative overflow-hidden bg-[#0A1E3F] border-b border-[#E5DDCF] group/img">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/90 via-[#0A1E3F]/30 to-transparent flex flex-col justify-between p-4">
                    <div className="flex items-center justify-between z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-600 text-white shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        {item.badge}
                      </span>

                      <button
                        onClick={() => setSelectedPreview(item)}
                        className="p-2 rounded-lg bg-black/60 hover:bg-white hover:text-[#0A1E3F] text-white transition-all cursor-pointer shadow-md"
                        title="View Details & Enlarge"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-blue-200 block">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-white leading-snug font-display line-clamp-1">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={`h-48 bg-gradient-to-br ${item.gradient} p-6 relative flex flex-col justify-between overflow-hidden border-b border-blue-900/40 text-white`}>
                  
                  {/* Badge (Sample Project / Concept Design) */}
                  <div className="flex items-center justify-between z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#081833]/90 border border-blue-400/40 text-blue-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                      {item.badge}
                    </span>

                    <button
                      onClick={() => setSelectedPreview(item)}
                      className="p-2 rounded-lg bg-[#081833]/80 hover:bg-white hover:text-[#0A1E3F] text-blue-200 border border-blue-700/60 transition-all cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Ambient Category Watermark */}
                  <div className="z-10">
                    <span className="text-xs font-mono uppercase tracking-widest text-blue-200/80 block mb-1">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-snug font-display line-clamp-2">
                      {item.title}
                    </h3>
                  </div>

                  {/* Subtle tech background shapes */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                </div>
              )}

              {/* Body details */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {item.metrics && (
                    <div className="p-2.5 rounded-lg bg-[#F2ECE1] border border-[#D5C8B4] text-xs font-mono text-[#0A1E3F] mb-4 flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                      <span>{item.metrics}</span>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="pt-4 border-t border-[#E5DDCF]">
                  <button
                    onClick={() => onSelectProject(item.category, item.title)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0F2C59] hover:bg-[#1E3A8A] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Request Similar Solution</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Portfolio Note */}
        <div className="p-4 rounded-xl bg-white border border-[#E5DDCF] text-center shadow-sm">
          <p className="text-xs text-slate-600">
            * All concept designs and sample projects represent technical capability benchmarks produced by Soft Tech World & AI Automation. Real client deployments are confidential unless released with authorization.
          </p>
        </div>

      </div>

      {/* Detail Preview Modal */}
      {selectedPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="rounded-3xl bg-[#FAF7F2] border border-[#D5C8B4] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5DDCF] mb-4">
              <span className="text-xs font-mono text-blue-800 uppercase tracking-wider font-bold">
                {selectedPreview.category} • {selectedPreview.badge}
              </span>
              <button
                onClick={() => setSelectedPreview(null)}
                className="text-slate-500 hover:text-slate-900 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {selectedPreview.image && (
              <div className="mb-4 rounded-2xl overflow-hidden bg-slate-950 border border-[#D5C8B4] shadow-md max-h-72">
                <img
                  src={selectedPreview.image}
                  alt={selectedPreview.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain max-h-72 mx-auto"
                />
              </div>
            )}

            <h3 className="text-xl font-bold text-[#0A1E3F] mb-3 font-display">
              {selectedPreview.title}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed mb-6">
              {selectedPreview.summary}
            </p>

            {selectedPreview.metrics && (
              <div className="p-3.5 rounded-xl bg-white border border-[#D5C8B4] text-xs font-mono text-[#0A1E3F] mb-6 shadow-sm">
                <strong>Benchmark Performance:</strong> {selectedPreview.metrics}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const item = selectedPreview;
                  setSelectedPreview(null);
                  onSelectProject(item.category, item.title);
                }}
                className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0F2C59] hover:bg-[#1E3A8A] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Request This Build</span>
                <ArrowRight className="w-4 h-4 text-blue-300" />
              </button>
              <button
                onClick={() => setSelectedPreview(null)}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-[#E5DDCF] hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
