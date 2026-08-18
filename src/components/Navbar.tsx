import React, { useState, useEffect } from 'react';
import { Bot, Menu, X, ArrowRight, MessageCircle, Shield, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onGetStarted: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onGetStarted }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E5DDCF] shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            id="brand-logo-link"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#0A1E3F] border border-blue-500/40 p-1 shadow-md shadow-blue-900/15 group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Soft Tech World & AI Automation Logo"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  // Fallback to bot icon if image fails
                  const target = e.currentTarget;
                  target.style.display = 'none';
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }}
              />
              <div className="w-full h-full bg-[#0A1E3F] rounded-[10px] hidden items-center justify-center">
                <Bot className="w-5 h-5 text-blue-300 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-[#0A1E3F] flex items-center gap-1.5 leading-none mb-1">
                SOFT TECH WORLD
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest text-blue-700 uppercase font-mono leading-none">
                & AI Automation
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Admin Portal Quick Access */}
            <button
              onClick={onOpenAdmin}
              id="admin-portal-header-btn"
              title="Admin Lead Management Portal"
              className="px-3 py-2 text-xs font-mono font-medium text-slate-700 hover:text-blue-700 bg-white/80 hover:bg-white rounded-xl border border-[#E5DDCF] hover:border-blue-400 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Shield className="w-3.5 h-3.5 text-blue-600" />
              <span>Admin Portal</span>
            </button>

            {/* Direct WhatsApp Action with DP */}
            <a
              href="https://wa.me/2349153584833?text=Hello%20Soft%20Tech%20World%20%26%20AI%20Automation%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              className="flex items-center gap-2 p-1 pr-3 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 hover:border-emerald-500 transition-all shadow-sm group"
              title="Chat on WhatsApp with Lead Strategist (09153584833)"
            >
              <div className="relative">
                <img
                  src="/display-picture.jpg"
                  alt="Soft Tech DP"
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white"></span>
              </div>
              <span className="text-xs font-semibold font-mono hidden xl:inline">09153584833</span>
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
            </a>

            {/* Primary CTA */}
            <button
              onClick={onGetStarted}
              id="header-get-started-btn"
              className="relative group px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-[#0F2C59] hover:bg-[#1E3A8A] shadow-md shadow-[#0F2C59]/20 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-xs text-slate-700 hover:text-blue-700 rounded-xl bg-white border border-[#E5DDCF]"
              title="Admin Portal"
            >
              <Shield className="w-4 h-4 text-blue-600" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="p-2.5 rounded-xl bg-white border border-[#E5DDCF] text-slate-800 hover:text-blue-700"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2]/98 backdrop-blur-xl border-b border-[#E5DDCF] px-5 pt-4 pb-6 mt-2 transition-all shadow-xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-slate-800 hover:text-blue-700 py-2 px-3 rounded-xl hover:bg-white transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 border-t border-[#E5DDCF] flex flex-col gap-3">
              <a
                href="https://wa.me/2349153584833?text=Hello%20Soft%20Tech%20World%20%26%20AI%20Automation%2C%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-semibold text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>WhatsApp: 09153584833</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGetStarted();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#0F2C59] hover:bg-[#1E3A8A] text-white font-bold text-center flex items-center justify-center gap-2 shadow-md shadow-[#0F2C59]/20"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E5DDCF] text-slate-700 text-sm font-mono text-center flex items-center justify-center gap-2 font-medium"
              >
                <Shield className="w-4 h-4 text-blue-600" />
                <span>Admin Lead Portal (PIN: 8483)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
