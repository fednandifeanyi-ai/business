import React, { useState } from 'react';
import { Sparkles, MessageCircle, ArrowRight, Bot, Cpu, Zap, Activity, CheckCircle2, ShieldCheck, Maximize2, Eye, X } from 'lucide-react';
import { ASSET_IMAGES, handleImageError } from '../constants/assets';

interface HeroProps {
  onStartProject: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  const [viewMode, setViewMode] = useState<'flyer' | 'workflow'>('flyer');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] pt-32 pb-20 flex items-center justify-center overflow-hidden cream-grid-bg"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-400/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2ECE1] border border-[#D5C8B4] text-[#0F2C59] text-xs font-mono mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
              <span className="font-bold uppercase tracking-wider">Next-Gen Digital Solutions & AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0A1E3F] leading-[1.12] mb-6 font-display">
              Smart Technology.{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
                Creative Design.
              </span>{' '}
              Powerful Advertising.{' '}
              <span className="text-slate-600">Business Growth.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-700 font-normal leading-relaxed mb-4 max-w-2xl">
              We help businesses <strong className="text-blue-700 font-bold">build, automate, promote, and grow</strong> using modern technology, creative design, AI, and digital advertising.
            </p>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8 max-w-2xl">
              From <strong className="text-slate-900">AI automation and websites</strong> to <strong className="text-slate-900">professional graphics, company branding, video adverts, and digital marketing</strong>, Soft Tech World & AI Automation provides the digital firepower businesses need to stand out, attract clients, and succeed in today&apos;s economy.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={onStartProject}
                id="hero-start-project-btn"
                className="px-8 py-4 rounded-xl font-bold text-base text-white bg-[#0F2C59] hover:bg-[#1E3A8A] shadow-xl shadow-[#0F2C59]/20 hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-300" />
              </button>

              <a
                href="https://wa.me/2349153584833?text=Hello%20Soft%20Tech%20World%20%26%20AI%20Automation%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-btn"
                className="px-5 py-3 rounded-xl font-semibold text-base text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-lg shadow-emerald-600/20 group"
              >
                <div className="relative shrink-0">
                  <img
                    src="/display-picture.jpg"
                    alt="Lead Consultant DP"
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-300 border border-emerald-800"></span>
                </div>
                <span>Chat on WhatsApp</span>
                <MessageCircle className="w-4 h-4 text-emerald-200 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Mini Trust Checklist */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-[#E5DDCF] w-full">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>24/7 Automated Intake</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Fast Professional Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-medium col-span-2 sm:col-span-1">
                <Zap className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Verified WhatsApp Route</span>
              </div>
            </div>

          </div>

          {/* Right Column: Executive Hero Visual (Flyer & Workflow) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Halo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 rounded-3xl blur-xl opacity-20 transition duration-1000"></div>

              {/* Main Container Card */}
              <div className="relative rounded-3xl bg-white border border-[#D5C8B4] p-4 sm:p-5 shadow-2xl overflow-hidden">
                
                {/* Mode Selector Tabs */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDCF]">
                  <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F2] rounded-xl border border-[#E5DDCF]">
                    <button
                      onClick={() => setViewMode('flyer')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                        viewMode === 'flyer'
                          ? 'bg-[#0F2C59] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Home Picture</span>
                    </button>
                    <button
                      onClick={() => setViewMode('workflow')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                        viewMode === 'workflow'
                          ? 'bg-[#0F2C59] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Live AI System</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {viewMode === 'flyer' && (
                      <button
                        onClick={() => setIsLightboxOpen(true)}
                        title="Expand High-Resolution Image"
                        className="p-1.5 rounded-lg bg-[#FAF7F2] hover:bg-blue-50 border border-[#E5DDCF] hover:border-blue-300 text-slate-700 hover:text-blue-700 transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
                      >
                        <Maximize2 className="w-3.5 h-3.5 text-blue-600" />
                        <span className="hidden sm:inline">Enlarge</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* View 1: Official Brand Picture / Home Visual */}
                {viewMode === 'flyer' ? (
                  <div className="relative group rounded-2xl overflow-hidden bg-[#0A1E3F] border border-[#E5DDCF] shadow-lg">
                    <img
                      src={ASSET_IMAGES.homePicture.local}
                      alt={ASSET_IMAGES.homePicture.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[460px] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] cursor-pointer"
                      onClick={() => setIsLightboxOpen(true)}
                      onError={(e) => handleImageError(e, ASSET_IMAGES.homePicture.cdn)}
                    />
                    
                    {/* Hover Overlay with Action Button */}
                    <div 
                      onClick={() => setIsLightboxOpen(true)}
                      className="absolute inset-0 bg-[#0A1E3F]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
                    >
                      <div className="px-4 py-2 rounded-xl bg-white/95 text-[#0A1E3F] text-xs font-bold font-mono flex items-center gap-2 shadow-xl">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span>Click to View Full Size</span>
                      </div>
                    </div>

                    {/* Bottom strip overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0A1E3F]/95 via-[#0A1E3F]/70 to-transparent p-3 pt-6 flex items-center justify-between text-white text-xs">
                      <span className="font-mono text-[11px] text-blue-200">Soft Tech World & AI Automation</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/90 text-[10px] font-bold uppercase tracking-wider">
                        Verified
                      </span>
                    </div>
                  </div>
                ) : (
                  /* View 2: High-Tech Interactive Automation Workflow */
                  <div className="rounded-2xl bg-[#0A1E3F] border border-blue-500/30 p-5 shadow-inner overflow-hidden text-white">
                    
                    {/* Header bar of tech widget */}
                    <div className="flex items-center justify-between pb-3 border-b border-blue-900/60 mb-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                        <span className="text-[11px] font-mono text-blue-200/70 ml-1">system.workflow.active</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-mono text-blue-300 bg-blue-950/90 px-2 py-0.5 rounded border border-blue-500/30">
                        <Activity className="w-3 h-3 text-blue-400 animate-pulse" />
                        <span>LIVE SYNC</span>
                      </div>
                    </div>

                    {/* Workflow Architecture Schematic */}
                    <div className="space-y-2.5 relative">
                      
                      {/* Step 1 Node */}
                      <div className="p-3 rounded-xl bg-[#0F2A56] border border-blue-800/60 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-[10px] text-blue-200/70 font-mono">Stage 01 • Discovery</p>
                            <h4 className="text-xs font-bold text-white">Targeted Ads & Video Reels</h4>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/40">+320% Reach</span>
                      </div>

                      <div className="flex justify-center -my-1">
                        <div className="w-0.5 h-3 bg-gradient-to-b from-blue-400 to-sky-400"></div>
                      </div>

                      {/* Step 2 Node */}
                      <div className="p-3 rounded-xl bg-[#133266] border border-blue-400/40 flex items-center justify-between shadow-md">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-400/20 border border-blue-300/50 flex items-center justify-center text-blue-200">
                            <Bot className="w-3.5 h-3.5 animate-bounce" />
                          </div>
                          <div>
                            <p className="text-[10px] text-blue-200 font-mono font-semibold">Stage 02 • Automation</p>
                            <h4 className="text-xs font-bold text-white">Instant Lead Capture & Sync</h4>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono text-blue-200 bg-blue-900/80 px-1.5 py-0.5 rounded border border-blue-400/40">Sheets & CRM</span>
                      </div>

                      <div className="flex justify-center -my-1">
                        <div className="w-0.5 h-3 bg-gradient-to-b from-blue-400 to-emerald-400"></div>
                      </div>

                      {/* Step 3 Node */}
                      <div className="p-3 rounded-xl bg-[#0F2A56] border border-blue-800/60 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                            <MessageCircle className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="text-[10px] text-blue-200/70 font-mono">Stage 03 • Engagement</p>
                            <h4 className="text-xs font-bold text-white">Customized WhatsApp Connect</h4>
                          </div>
                        </div>
                        <span className="text-[9px] font-mono text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded border border-emerald-500/40">09153584833</span>
                      </div>

                    </div>

                    {/* Bottom Telemetry Card */}
                    <div className="mt-4 pt-3 border-t border-blue-900/60 grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 rounded-xl bg-[#081833] border border-blue-900/80">
                        <span className="block text-base font-bold text-blue-300 font-display">100%</span>
                        <span className="text-[10px] text-blue-200/70">Digital Synergy</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#081833] border border-blue-900/80">
                        <span className="block text-base font-bold text-emerald-300 font-display">&lt; 10s</span>
                        <span className="text-[10px] text-blue-200/70">Lead Hand-off</span>
                      </div>
                    </div>

                  </div>
                )}

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Full Size Image Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[90vh] bg-white rounded-3xl p-3 sm:p-4 shadow-2xl border border-[#D5C8B4] overflow-hidden flex flex-col items-center"
          >
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-h-[82vh] overflow-auto flex items-center justify-center rounded-2xl bg-slate-100 p-2">
              <img
                src={ASSET_IMAGES.homePicture.local}
                alt={ASSET_IMAGES.homePicture.alt}
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto object-contain rounded-xl shadow-lg"
                onError={(e) => handleImageError(e, ASSET_IMAGES.homePicture.cdn)}
              />
            </div>

            <div className="w-full pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-slate-600">
              <span>Soft Tech World & AI Automation • Home Showcase Picture</span>
              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  onStartProject();
                }}
                className="px-4 py-1.5 rounded-lg bg-[#0F2C59] text-white font-bold hover:bg-[#1E3A8A] transition-colors cursor-pointer"
              >
                Start Your Project With Us
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
