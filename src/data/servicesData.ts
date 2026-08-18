import { ServiceDetail, PortfolioItem } from '../types';

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'ai-automation',
    name: 'AI Automation',
    category: 'AI & Automation',
    shortDesc: 'AI-powered workflows, automated responses, lead capture, customer support and business process automation.',
    highlight: 'Work smarter. Save time. Reduce repetitive tasks.',
    icon: 'Bot',
    items: [
      'AI customer support & chatbots',
      'Automated WhatsApp lead capture & responses',
      'Automated customer follow-up sequences',
      'Business workflow & CRM automation',
      'AI-powered digital assistants',
      'Automated data collection & sync'
    ]
  },
  {
    id: 'website-development',
    name: 'Website & Landing Page Development',
    category: 'Marketing & Web',
    shortDesc: 'Professional business websites, landing pages, sales pages and conversion-focused digital platforms.',
    highlight: 'A digital home that converts visitors into paying customers.',
    icon: 'Globe',
    items: [
      'High-converting business landing pages',
      'Corporate & service portfolio websites',
      'E-commerce & product sales pages',
      'Lead capture & registration funnels',
      'Mobile-optimized responsive architecture',
      'Speed & SEO search ranking optimization'
    ]
  },
  {
    id: 'graphic-design',
    name: 'Graphic Design',
    category: 'Design & Branding',
    shortDesc: 'Business flyers, business cards, social media graphics, promotional designs and brand materials.',
    highlight: 'Credible, memorable, and ready for business from first glance.',
    icon: 'Palette',
    items: [
      'High-impact promotional & event flyers',
      'Luxury business cards & stationery',
      'Social media graphics & carousel posts',
      'Product packaging & showcase graphics',
      'Billboards, banners & event backdrops',
      'Certificates & corporate brochures'
    ]
  },
  {
    id: 'branding',
    name: 'Company Logo & Branding',
    category: 'Design & Branding',
    shortDesc: 'Professional visual identities that help businesses become recognizable and memorable.',
    highlight: 'More than a symbol—an identity customers trust and remember.',
    icon: 'Sparkles',
    items: [
      'Custom vector company logo design',
      'Comprehensive brand style guides',
      'Color palette & typography systems',
      'Brand identity mockups & collateral',
      'Rebranding & visual modernization',
      'Print-ready high-resolution vector assets'
    ]
  },
  {
    id: 'video-creation',
    name: 'Video Advertising & Content',
    category: 'Marketing & Web',
    shortDesc: 'Business promotional videos, product videos, social media videos, reels and advertising videos.',
    highlight: 'Engaging visual content people understand, share, and remember.',
    icon: 'Video',
    items: [
      'Commercial promotional video ads',
      'Short-form reels & TikTok marketing videos',
      'Product demonstration & feature videos',
      'AI-enhanced video avatars & motion graphics',
      'Corporate intro videos & testimonials',
      'High-retention social media video ads'
    ]
  },
  {
    id: 'business-advertising',
    name: 'Business Advertising',
    category: 'Marketing & Web',
    shortDesc: 'Creative advertising campaigns designed to promote products, services and businesses with purpose.',
    highlight: 'Don\'t just post. Advertise to attract real paying clients.',
    icon: 'Megaphone',
    items: [
      'Paid social media ad campaigns (Meta/IG/TikTok)',
      'High-converting ad copywriting & creative angles',
      'New product launch campaigns',
      'Seasonal sales & discount promotions',
      'Targeted lead generation funnels',
      'Ad campaign performance tracking'
    ]
  },
  {
    id: 'social-media-content',
    name: 'Social Media Content & Growth',
    category: 'Marketing & Web',
    shortDesc: 'Professional graphics, videos and marketing content tailored for Facebook, Instagram, TikTok & WhatsApp.',
    highlight: 'Show up consistently and professionally where your customers spend time.',
    icon: 'Share2',
    items: [
      'Monthly social media content calendars',
      'Engaging captions & conversion marketing copy',
      'Platform-specific visual assets',
      'Community engagement strategies',
      'Brand storytelling campaigns',
      'WhatsApp status marketing assets'
    ]
  },
  {
    id: 'digital-solutions',
    name: 'Custom Digital Solutions',
    category: 'AI & Automation',
    shortDesc: 'Custom technology solutions designed around individual business operations and workflows.',
    highlight: 'Tailored systems connecting your forms, data, and communication.',
    icon: 'Cpu',
    items: [
      'Google Sheets & database sync pipelines',
      'Automated invoice & receipt generation',
      'Customer intake & booking workflows',
      'Custom API & webhook integrations',
      'Centralized client management dashboards',
      'Cloud deployment & security management'
    ]
  }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: 'port-official-flyer',
    title: 'Soft Tech World & AI Automation Official Brand Graphic',
    category: 'Graphic Design',
    badge: 'Official Creative',
    summary: 'Flagship brand promotional creative and service overview flyer showcasing our integrated technology, creative design, AI automation, and digital advertising capabilities.',
    metrics: 'Official Brand Asset • High-Resolution',
    tags: ['Brand Flyer', 'Graphic Design', 'AI Automation', 'Digital Ads'],
    gradient: 'from-[#0A1E3F] via-[#0F2C59] to-blue-900',
    image: './hero-flyer.jpg'
  },
  {
    id: 'port-1',
    title: 'Automated WhatsApp Customer Intake & Lead Router',
    category: 'AI Automation',
    badge: 'Concept Design',
    summary: '24/7 intelligent automated customer service and instant quotation bot connected directly to Google Sheets CRM.',
    metrics: '94% Faster Response • 3x Lead Capture',
    tags: ['AI Bot', 'WhatsApp API', 'Google Sheets', 'Webhook'],
    gradient: 'from-cyan-500/20 via-blue-600/10 to-indigo-900/30'
  },
  {
    id: 'port-2',
    title: 'High-Converting Tech Agency Landing Page',
    category: 'Websites',
    badge: 'Sample Project',
    summary: 'Ultra-fast responsive web portal with interactive scope estimator, lead tracking, and dark-futuristic UI.',
    metrics: '99.2% Lighthouse Score • 4.8% Opt-in Rate',
    tags: ['React', 'Tailwind CSS', 'Vite', 'Express'],
    gradient: 'from-blue-600/20 via-cyan-500/10 to-slate-900/40'
  },
  {
    id: 'port-3',
    title: 'Aura Logistics Brand Identity & Visual Assets',
    category: 'Branding',
    badge: 'Sample Project',
    summary: 'Full corporate identity system including minimal geometric monogram logo, stationery, fleet wrap, and digital guidelines.',
    metrics: 'Complete Brand Book • Vector System',
    tags: ['Brand Identity', 'Vector Logo', 'Typography', 'Stationery'],
    gradient: 'from-indigo-500/20 via-sky-500/10 to-slate-900/40'
  },
  {
    id: 'port-4',
    title: 'Product Launch 4K Promotional Motion Reel',
    category: 'Video Advertising',
    badge: 'Sample Project',
    summary: 'High-energy 30-second commercial video designed for Instagram Reels & TikTok with dynamic typographic punchlines.',
    metrics: '120k+ Organic Views • High Retention',
    tags: ['Motion Reel', '4K Ad', 'Visual FX', 'Sound Design'],
    gradient: 'from-purple-500/20 via-blue-500/10 to-slate-900/40'
  },
  {
    id: 'port-5',
    title: 'Omnichannel Digital Advertising Funnel',
    category: 'Business Advertising',
    badge: 'Concept Design',
    summary: 'Direct response Facebook & Instagram ad creatives paired with customized WhatsApp inquiry routes for local services.',
    metrics: '380+ Qualified Leads Generated',
    tags: ['Meta Ads', 'Direct Response', 'WhatsApp Funnel'],
    gradient: 'from-emerald-500/20 via-cyan-500/10 to-slate-900/40'
  },
  {
    id: 'port-6',
    title: 'Corporate Executive Branding & Promo Collateral',
    category: 'Graphic Design',
    badge: 'Sample Project',
    summary: 'Suite of marketing flyers, roll-up banners, and digital flyers crafted for international real estate summit.',
    metrics: 'High Print Fidelity • Digital Format',
    tags: ['Flyers', 'Rollup Banner', 'Print Collateral', 'Social Pack'],
    gradient: 'from-cyan-400/20 via-indigo-600/10 to-slate-900/40'
  }
];

export const WHY_CHOOSE_ITEMS = [
  {
    title: 'Professional',
    desc: 'Every project is handled with precision, meticulous craft, and uncompromising quality from draft to deployment.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Innovative',
    desc: 'We integrate modern artificial intelligence, workflow automation, and cutting-edge web stacks to build smarter systems.',
    icon: 'Zap'
  },
  {
    title: 'Creative',
    desc: 'Our designs and digital experiences are custom-engineered to command attention and make your business unmistakably distinct.',
    icon: 'Sparkles'
  },
  {
    title: 'Business-Focused',
    desc: 'We do not build technology for technology\'s sake. Every line of code, ad, and design is laser-focused on real business outcomes.',
    icon: 'Target'
  },
  {
    title: 'Customer-Centered',
    desc: 'We listen deeply to your specific goals, constraints, and audience before engineering your bespoke digital solution.',
    icon: 'HeartHandshake'
  },
  {
    title: 'Growth-Oriented',
    desc: 'Our fundamental goal is positioning your enterprise for accelerated visibility, higher conversions, and automated scaling.',
    icon: 'TrendingUp'
  }
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Tell Us What You Need',
    desc: 'Submit your project details or service requirements through our fast online form or direct WhatsApp consultation.',
    icon: 'FileText'
  },
  {
    number: '02',
    title: 'We Create a Strategy',
    desc: 'We review your goals, analyze your target market, and formulate the exact synergy of tech, design, AI, and advertising.',
    icon: 'Compass'
  },
  {
    number: '03',
    title: 'We Build & Create',
    desc: 'Our engineering and creative team crafts your website, logo, automation workflow, promotional video, or marketing campaign.',
    icon: 'Cpu'
  },
  {
    number: '04',
    title: 'You Launch & Grow',
    desc: 'Deploy your solution seamlessly into the market, capture automated leads, and watch your business expand with modern systems.',
    icon: 'Rocket'
  }
];
