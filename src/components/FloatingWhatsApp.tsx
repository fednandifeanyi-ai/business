import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, ShieldCheck } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = '2349153584833';

  const quickPrompts = [
    'I want to discuss an AI Automation & WhatsApp system.',
    'I need a high-converting Website or Landing page.',
    'I need a professional Logo & Brand Identity.',
    'I want to run Video Adverts & Marketing campaigns.'
  ];

  const handleOpenWhatsApp = (customText?: string) => {
    const message = customText || 'Hello Soft Tech World & AI Automation, I would like to discuss a project with you.';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Quick Chat Popup Card */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 rounded-3xl bg-white border border-[#D5C8B4] shadow-2xl p-5 relative animate-fade-in text-slate-800">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDCF]">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/display-picture.jpg"
                  alt="Soft Tech World Lead Consultant"
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-600"></span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0A1E3F] font-display">
                  Soft Tech WhatsApp Desk
                </h4>
                <span className="text-[10px] font-mono text-emerald-700 font-semibold block">
                  Lead Consultant • Online
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-4 leading-relaxed">
            Welcome to <strong className="text-[#0A1E3F]">Soft Tech World & AI Automation</strong>! Select a quick inquiry topic below to start a direct WhatsApp chat on <span className="font-mono text-emerald-700 font-semibold">09153584833</span>:
          </p>

          {/* Quick Prompts */}
          <div className="space-y-2 mb-4">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleOpenWhatsApp(prompt)}
                className="w-full p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-blue-50 border border-[#E5DDCF] hover:border-blue-300 text-left text-xs text-slate-800 hover:text-blue-900 transition-all flex items-center justify-between group cursor-pointer"
              >
                <span className="line-clamp-1 font-medium">{prompt}</span>
                <Send className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
              </button>
            ))}
          </div>

          {/* General Chat Button */}
          <button
            onClick={() => handleOpenWhatsApp()}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-white" />
            <span>Open Custom WhatsApp Chat</span>
          </button>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Official Line: 09153584833</span>
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="floating-whatsapp-btn"
        className="group relative flex items-center gap-2.5 pl-1.5 pr-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm shadow-2xl shadow-emerald-600/40 hover:shadow-emerald-500/60 transition-all duration-300 cursor-pointer border border-emerald-300/40"
      >
        <div className="relative">
          <img
            src="/display-picture.jpg"
            alt="Soft Tech DP"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-full object-cover border-2 border-white"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white"></span>
        </div>
        <MessageCircle className="w-4 h-4 text-emerald-100 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline-block font-sans font-semibold tracking-wide text-xs">
          Chat on WhatsApp
        </span>
      </button>

    </div>
  );
};
