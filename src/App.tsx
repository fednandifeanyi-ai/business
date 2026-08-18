import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustStrip } from './components/TrustStrip';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialSection } from './components/TestimonialSection';
import { LeadFormSection } from './components/LeadFormSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SubmissionSuccessModal } from './components/SubmissionSuccessModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Lead } from './types';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedServiceForForm, setSelectedServiceForForm] = useState<string>('AI Automation');
  const [selectedDescriptionForForm, setSelectedDescriptionForForm] = useState<string>('');
  
  // Submission success modal state
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [submittedWhatsappUrl, setSubmittedWhatsappUrl] = useState<string>('');

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForForm(serviceName);
    scrollToContact();
  };

  const handleSelectProject = (category: string, projectTitle: string) => {
    setSelectedServiceForForm(category);
    setSelectedDescriptionForForm(projectTitle);
    scrollToContact();
  };

  const handleSubmissionSuccess = (lead: Lead, whatsappUrl: string) => {
    setSubmittedLead(lead);
    setSubmittedWhatsappUrl(whatsappUrl);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 selection:bg-blue-600 selection:text-white">
      
      {/* Sticky Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onGetStarted={scrollToContact}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero onStartProject={scrollToContact} />

        {/* 2. Trust Strip */}
        <TrustStrip />

        {/* 3. About Section */}
        <AboutSection onStartProject={scrollToContact} />

        {/* 4. Services Section & Featured Cards */}
        <ServicesSection onSelectService={handleSelectService} />

        {/* 5. Why Choose Us */}
        <WhyChooseUs />

        {/* 6. Execution Process / How It Works */}
        <HowItWorks onStartProject={scrollToContact} />

        {/* 7. Portfolio Showcase */}
        <PortfolioSection onSelectProject={handleSelectProject} />

        {/* 8. Verified Testimonials & Client Trust */}
        <TestimonialSection onStartProject={scrollToContact} />

        {/* 9. High Converting Lead Generation Form */}
        <LeadFormSection
          initialService={selectedServiceForForm}
          initialDescription={selectedDescriptionForForm}
          onSubmissionSuccess={handleSubmissionSuccess}
        />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Global Floating WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Form Submission Success Modal with WhatsApp Action */}
      <SubmissionSuccessModal
        lead={submittedLead}
        whatsappUrl={submittedWhatsappUrl}
        onClose={() => setSubmittedLead(null)}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

    </div>
  );
}
