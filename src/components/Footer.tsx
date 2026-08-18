import React from 'react';
import { Bot, MessageCircle, Phone, Mail, ArrowUp, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0A1E3F] border-t border-[#1E3A8A] text-slate-300 text-sm relative overflow-hidden">
      
      {/* Top Tagline Strip */}
      <div className="border-b border-[#1E3A8A] bg-[#07152B] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-2 text-blue-200 font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>BUILD SMARTER. CREATE BETTER. AUTOMATE MORE. GROW FASTER.</span>
          </div>
          
          <a
            href="https://wa.me/2349153584833?text=Hello%20Soft%20Tech%20World%20%26%20AI%20Automation%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700/80 border border-emerald-500/60 text-emerald-100 text-xs font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Direct WhatsApp: 09153584833</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#081833] border border-blue-500/40 p-1 shadow-md overflow-hidden flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Soft Tech World Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="w-full h-full bg-[#0A1E3F] rounded-[10px] hidden items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-300" />
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white block leading-none mb-1">
                  SOFT TECH WORLD
                </span>
                <span className="text-[10px] font-mono tracking-widest text-blue-300 uppercase leading-none">
                  & AI Automation
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Smart Technology. Creative Design. Powerful Advertising. Business Growth.
              We combine AI automation, bespoke web development, and digital marketing to build modern, high-growth businesses.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenAdmin}
                className="text-xs font-mono text-slate-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#home" className="hover:text-blue-300 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-blue-300 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-blue-300 transition-colors">Services</a></li>
              <li><a href="#why-us" className="hover:text-blue-300 transition-colors">Why Us</a></li>
              <li><a href="#process" className="hover:text-blue-300 transition-colors">Process</a></li>
              <li><a href="#portfolio" className="hover:text-blue-300 transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="hover:text-blue-300 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-blue-300 transition-colors">AI Automation Workflows</a></li>
              <li><a href="#services" className="hover:text-blue-300 transition-colors">Website & Funnel Development</a></li>
              <li><a href="#services" className="hover:text-blue-300 transition-colors">Graphic Design & Flyers</a></li>
              <li><a href="#services" className="hover:text-blue-300 transition-colors">Company Logo & Branding</a></li>
              <li><a href="#services" className="hover:text-blue-300 transition-colors">Video Advertising & 4K Reels</a></li>
              <li><a href="#services" className="hover:text-blue-300 transition-colors">Business Advertising Campaigns</a></li>
              <li><a href="#services" className="hover:text-blue-300 transition-colors">Custom Digital Solutions</a></li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
              Official Contact
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="https://wa.me/2349153584833"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 font-mono"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: 09153584833</span>
              </a>
              <a
                href="tel:09153584833"
                className="flex items-center gap-2 text-slate-200 hover:text-white font-mono"
              >
                <Phone className="w-4 h-4 text-blue-400" />
                <span>Phone: +234 915 358 4833</span>
              </a>
              <div className="flex items-center gap-2 text-slate-300 font-mono">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>support@softtechworld.tech</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-block w-full py-2.5 px-4 rounded-xl text-center font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-md"
              >
                Start Your Project
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-12 mt-12 border-t border-[#1E3A8A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Soft Tech World & AI Automation. All Rights Reserved.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-blue-300 transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
