export type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';

export interface Lead {
  id: string;
  full_name: string;
  business_name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  project_description: string;
  status: LeadStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
  synced_to_sheet?: boolean;
}

export interface LeadStats {
  total: number;
  newLeads: number;
  contacted: number;
  inProgress: number;
  converted: number;
  closed: number;
  conversionRate: number;
}

export interface ServiceDetail {
  id: string;
  name: string;
  category: 'AI & Automation' | 'Design & Branding' | 'Marketing & Web';
  shortDesc: string;
  highlight: string;
  items: string[];
  icon: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'AI Automation' | 'Websites' | 'Graphic Design' | 'Branding' | 'Video Advertising' | 'Business Advertising';
  badge: 'Sample Project' | 'Concept Design' | 'Official Creative';
  summary: string;
  metrics?: string;
  tags: string[];
  gradient: string;
  image?: string;
}

export interface ConfigSettings {
  googleSheetWebhookUrl: string;
  adminPin: string;
  whatsappNumber: string;
  companyName: string;
}
