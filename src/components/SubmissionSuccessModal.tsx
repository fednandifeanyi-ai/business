import React, { useState } from 'react';
import { CheckCircle2, MessageCircle, Copy, Check, ArrowRight, X, Sparkles } from 'lucide-react';
import { Lead } from '../types';

interface SubmissionSuccessModalProps {
  lead: Lead | null;
  whatsappUrl: string;
  onClose: () => void;
}

export const SubmissionSuccessModal: React.FC<SubmissionSuccessModalProps> = ({
  lead,
  whatsappUrl,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!lead) return null;

  const rawMessageText = 
    `Hello Soft Tech World & AI Automation!\n\n` +
    `My name is: *${lead.full_name}*\n` +
    `Business: *${lead.business_name}*\n` +
    `Service Needed: *${lead.service}*\n` +
    `Budget: *${lead.budget}*\n` +
    `Phone/WhatsApp: *${lead.phone}*\n` +
    `Email: *${lead.email}*\n\n` +
    `*Project Details:* \n${lead.project_description}\n\n` +
    `Looking forward to discussing and getting started!`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(rawMessageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="rounded-3xl bg-white border border-[#D5C8B4] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-center text-emerald-600 shrink-0 shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-700 font-bold block">
              REQUEST SAVED & LOGGED
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A1E3F] font-display">
              Thank You, {lead.full_name.split(' ')[0]}!
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
          Your project inquiry for <strong className="text-blue-800">{lead.service}</strong> has been received and synced. Click below to send your customized WhatsApp message directly to our official desk on <span className="font-mono text-[#0A1E3F] font-semibold">09153584833</span> for immediate priority response.
        </p>

        {/* Pre-formatted WhatsApp Message Preview Box */}
        <div className="rounded-2xl bg-[#FAF7F2] border border-[#E5DDCF] p-4 mb-6">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E5DDCF] text-[11px] font-mono text-slate-500">
            <span>Customized WhatsApp Message Preview</span>
            <button
              onClick={handleCopyMessage}
              className="flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          <p className="text-xs text-slate-800 font-mono whitespace-pre-line leading-relaxed max-h-36 overflow-y-auto">
            {rawMessageText}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-600/25 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-white" />
            <span>Send on WhatsApp Now (09153584833)</span>
            <ArrowRight className="w-5 h-5" />
          </a>

          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-[#FAF7F2] border border-[#E5DDCF] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
          >
            Close & Stay on Website
          </button>
        </div>

      </div>
    </div>
  );
};
