import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const CONFIG_FILE = path.join(DATA_DIR, 'config.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface LeadRecord {
  id: string;
  full_name: string;
  business_name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  project_description: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Converted' | 'Closed';
  notes?: string;
  created_at: string;
  updated_at: string;
  synced_to_sheet?: boolean;
}

interface AppConfig {
  googleSheetWebhookUrl: string;
  adminPin: string;
  whatsappNumber: string;
  companyName: string;
}

const DEFAULT_CONFIG: AppConfig = {
  googleSheetWebhookUrl: 'https://script.google.com/macros/s/AKfycbyTfmsQsJvmvfH4TZ1Hjoc61gI0xqeTNqObi5dXF-49J7oo4nXgnNweXngXyFVF_kOz/exec',
  adminPin: '8483', // Easy quick PIN matching the last 4 digits of WhatsApp 09153584833
  whatsappNumber: '2349153584833',
  companyName: 'Soft Tech World & AI Automation',
};

function getConfig(): AppConfig {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = fs.readFileSync(CONFIG_FILE, 'utf-8');
      return { ...DEFAULT_CONFIG, ...JSON.parse(data) };
    }
  } catch (err) {
    console.error('Error reading config:', err);
  }
  return DEFAULT_CONFIG;
}

function saveConfig(config: AppConfig) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  } catch (err) {
    console.error('Error saving config:', err);
  }
}

// Initial starter leads for realistic demonstration
const INITIAL_LEADS: LeadRecord[] = [
  {
    id: 'lead-17398012001',
    full_name: 'Chidi Okonkwo',
    business_name: 'Apex Logistics & Freight',
    phone: '+2348032194852',
    email: 'chidi@apexlogistics.ng',
    service: 'AI Automation',
    budget: '₦250,000 – ₦500,000',
    project_description: 'We need automated WhatsApp lead capture and instant delivery tracking responses for our e-commerce clients.',
    status: 'New',
    notes: 'Urgent setup needed before next month.',
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    synced_to_sheet: true,
  },
  {
    id: 'lead-17398012002',
    full_name: 'Amina Bello',
    business_name: 'Zaria Luxe Fashion Hub',
    phone: '+2349021157834',
    email: 'amina@zarialuxe.com',
    service: 'Website Development',
    budget: '₦100,000 – ₦250,000',
    project_description: 'High converting landing page + catalog for our new clothing line launching in 2 weeks.',
    status: 'Contacted',
    notes: 'Spoke on WhatsApp. Sending design wireframe tomorrow.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    synced_to_sheet: true,
  },
  {
    id: 'lead-17398012003',
    full_name: 'Tunde Adeleke',
    business_name: 'Prime Dental Clinics',
    phone: '+2348145592011',
    email: 'tunde@primedental.ng',
    service: 'Business Advertising',
    budget: '₦250,000 – ₦500,000',
    project_description: 'Meta and Google Ads campaigns to generate patient bookings across Lagos and Abuja branches.',
    status: 'In Progress',
    notes: 'Ad creatives in review with Dr. Tunde.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    synced_to_sheet: true,
  },
  {
    id: 'lead-17398012004',
    full_name: 'Blessing Udoh',
    business_name: 'Oasis Real Estate & Homes',
    phone: '+2347089943210',
    email: 'blessing@oasisproperties.ng',
    service: 'Video Creation',
    budget: '₦500,000+',
    project_description: 'Cinematic 4K promo video and Instagram reels for our luxury estate launch in Lekki Phase 1.',
    status: 'Converted',
    notes: 'Contract signed! 50% deposit received.',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    synced_to_sheet: true,
  }
];

function getLeads(): LeadRecord[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      return JSON.parse(content);
    } else {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2));
      return INITIAL_LEADS;
    }
  } catch (err) {
    console.error('Error reading leads:', err);
    return INITIAL_LEADS;
  }
}

function saveLeads(leads: LeadRecord[]) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (err) {
    console.error('Error saving leads:', err);
  }
}

// Optional forwarding helper to user's Google Sheet Webhook / Apps Script
async function forwardToGoogleSheet(lead: LeadRecord, webhookUrl: string) {
  if (!webhookUrl || !webhookUrl.startsWith('http')) return false;
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: lead.id,
        timestamp: lead.created_at,
        full_name: lead.full_name,
        business_name: lead.business_name,
        phone: lead.phone,
        email: lead.email,
        service: lead.service,
        budget: lead.budget,
        project_description: lead.project_description,
        status: lead.status
      })
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to forward to Google Sheets webhook:', err);
    return false;
  }
}

// ---------------- API ROUTES ----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Submit Lead
app.post('/api/leads', async (req, res) => {
  try {
    const { full_name, business_name, phone, email, service, budget, project_description } = req.body;

    // Validation
    if (!full_name || full_name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide your valid full name.' });
    }
    if (!phone || phone.trim().length < 7) {
      return res.status(400).json({ error: 'Please provide a valid phone or WhatsApp number.' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (!service) {
      return res.status(400).json({ error: 'Please select a required service.' });
    }
    if (!project_description || project_description.trim().length < 5) {
      return res.status(400).json({ error: 'Please briefly describe your project or requirements.' });
    }

    const leads = getLeads();
    const config = getConfig();

    const newLead: LeadRecord = {
      id: `lead-${Date.now()}`,
      full_name: full_name.trim(),
      business_name: (business_name || 'N/A').trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      service: service.trim(),
      budget: (budget || 'Not Sure Yet').trim(),
      project_description: project_description.trim(),
      status: 'New',
      notes: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      synced_to_sheet: false,
    };

    // Forward to Google sheet if webhook exists
    if (config.googleSheetWebhookUrl) {
      const synced = await forwardToGoogleSheet(newLead, config.googleSheetWebhookUrl);
      newLead.synced_to_sheet = synced;
    }

    leads.unshift(newLead);
    saveLeads(leads);

    // Format WhatsApp message URL for client convenience
    const rawWaNumber = config.whatsappNumber || '2349153584833';
    const waText = encodeURIComponent(
      `Hello Soft Tech World & AI Automation!\n\n` +
      `My name is: *${newLead.full_name}*\n` +
      `Business: *${newLead.business_name}*\n` +
      `Service Needed: *${newLead.service}*\n` +
      `Budget: *${newLead.budget}*\n` +
      `Phone/WhatsApp: *${newLead.phone}*\n` +
      `Email: *${newLead.email}*\n\n` +
      `*Project Details:* \n${newLead.project_description}\n\n` +
      `Looking forward to discussing and getting started!`
    );
    const whatsappUrl = `https://wa.me/${rawWaNumber}?text=${waText}`;

    return res.status(201).json({
      success: true,
      message: "Thank you! Your project request has been received. We'll get back to you shortly.",
      lead: newLead,
      whatsappUrl,
    });
  } catch (err: any) {
    console.error('Error submitting lead:', err);
    return res.status(500).json({ error: 'Internal server error while saving your request. Please try again.' });
  }
});

// Get Leads (Admin)
app.get('/api/leads', (req, res) => {
  const { search, service, status, sort } = req.query;
  let leads = getLeads();

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    leads = leads.filter(
      l =>
        l.full_name.toLowerCase().includes(q) ||
        l.business_name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.project_description.toLowerCase().includes(q)
    );
  }

  if (service && typeof service === 'string' && service !== 'all') {
    leads = leads.filter(l => l.service.toLowerCase() === service.toLowerCase());
  }

  if (status && typeof status === 'string' && status !== 'all') {
    leads = leads.filter(l => l.status.toLowerCase() === status.toLowerCase());
  }

  if (sort === 'oldest') {
    leads.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  } else {
    leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  res.json({ success: true, count: leads.length, leads });
});

// Get Lead Statistics
app.get('/api/leads/stats', (req, res) => {
  const leads = getLeads();
  const total = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contacted = leads.filter(l => l.status === 'Contacted').length;
  const inProgress = leads.filter(l => l.status === 'In Progress').length;
  const converted = leads.filter(l => l.status === 'Converted').length;
  const closed = leads.filter(l => l.status === 'Closed').length;

  const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

  res.json({
    total,
    newLeads,
    contacted,
    inProgress,
    converted,
    closed,
    conversionRate
  });
});

// Update Lead Status or Notes
app.patch('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Lead not found.' });
  }

  if (status) {
    leads[index].status = status;
  }
  if (typeof notes === 'string') {
    leads[index].notes = notes;
  }
  leads[index].updated_at = new Date().toISOString();

  saveLeads(leads);
  res.json({ success: true, lead: leads[index] });
});

// Delete Lead
app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  let leads = getLeads();
  const initialLength = leads.length;
  leads = leads.filter(l => l.id !== id);

  if (leads.length === initialLength) {
    return res.status(404).json({ error: 'Lead not found.' });
  }

  saveLeads(leads);
  res.json({ success: true, message: 'Lead removed successfully.' });
});

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const { pin } = req.body;
  const config = getConfig();

  // Allow either configured PIN, default pin 8483, or admin123
  if (pin === config.adminPin || pin === '8483' || pin === 'admin123') {
    res.json({
      success: true,
      token: `auth_${Date.now()}_st_admin`,
      message: 'Welcome, Soft Tech Admin'
    });
  } else {
    res.status(401).json({ error: 'Invalid Admin PIN or password. Try PIN: 8483 or admin123' });
  }
});

// Get Config
app.get('/api/config', (req, res) => {
  const config = getConfig();
  res.json({
    googleSheetWebhookUrl: config.googleSheetWebhookUrl,
    whatsappNumber: config.whatsappNumber,
    companyName: config.companyName,
    adminPinConfigured: !!config.adminPin
  });
});

// Update Config
app.post('/api/config', (req, res) => {
  const { googleSheetWebhookUrl, adminPin, whatsappNumber } = req.body;
  const config = getConfig();

  if (typeof googleSheetWebhookUrl === 'string') {
    config.googleSheetWebhookUrl = googleSheetWebhookUrl.trim();
  }
  if (typeof adminPin === 'string' && adminPin.trim().length >= 4) {
    config.adminPin = adminPin.trim();
  }
  if (typeof whatsappNumber === 'string' && whatsappNumber.trim()) {
    config.whatsappNumber = whatsappNumber.replace(/[^0-9]/g, '');
  }

  saveConfig(config);
  res.json({ success: true, message: 'Settings saved successfully.', config });
});

// Export Leads as CSV
app.get('/api/export-csv', (req, res) => {
  const leads = getLeads();
  const headers = ['ID', 'Date & Time', 'Full Name', 'Business Name', 'Phone', 'Email', 'Service', 'Budget', 'Status', 'Project Description', 'Notes'];
  
  const escapeCsv = (val: any) => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = leads.map(l => [
    escapeCsv(l.id),
    escapeCsv(new Date(l.created_at).toLocaleString()),
    escapeCsv(l.full_name),
    escapeCsv(l.business_name),
    escapeCsv(l.phone),
    escapeCsv(l.email),
    escapeCsv(l.service),
    escapeCsv(l.budget),
    escapeCsv(l.status),
    escapeCsv(l.project_description),
    escapeCsv(l.notes || '')
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="SoftTech_Leads_${new Date().toISOString().slice(0, 10)}.csv"`);
  res.send(csvContent);
});

// Sync all existing unsynced leads to Google Sheet
app.post('/api/sync-all-to-sheet', async (req, res) => {
  const config = getConfig();
  if (!config.googleSheetWebhookUrl) {
    return res.status(400).json({ error: 'Please configure your Google Sheet Webhook URL in Settings first.' });
  }

  const leads = getLeads();
  let syncedCount = 0;

  for (const lead of leads) {
    const success = await forwardToGoogleSheet(lead, config.googleSheetWebhookUrl);
    if (success) {
      lead.synced_to_sheet = true;
      syncedCount++;
    }
  }

  saveLeads(leads);
  res.json({ success: true, message: `Successfully synced ${syncedCount} leads to your Google Sheet.` });
});

// Google Apps Script template for user
app.get('/api/google-sheet-script', (req, res) => {
  const script = `/**
 * Google Apps Script for SOFT TECH WORLD & AI AUTOMATION Lead Capture
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet (e.g. "Soft Tech Leads 2026")
 * 2. Click Extensions > Apps Script
 * 3. Delete any code in Code.gs and PASTE ALL the code below.
 * 4. Click 'Deploy' (top right) > 'New deployment'
 * 5. Select type: 'Web app'
 * 6. Set Description: "Soft Tech Lead Webhook"
 * 7. Set 'Execute as': 'Me'
 * 8. Set 'Who has access': 'Anyone' (IMPORTANT: Must be Anyone so the webhook can post leads)
 * 9. Click Deploy, Authorize access, and COPY the Web App URL (starts with https://script.google.com/macros/s/...)
 * 10. Paste that Web App URL into the Soft Tech Admin Portal -> Google Sheet Sync tab!
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Create header row if empty sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submission Date",
        "Lead ID",
        "Full Name",
        "Business Name",
        "Phone / WhatsApp",
        "Email Address",
        "Service Required",
        "Budget Range",
        "Status",
        "Project Description"
      ]);
      
      // Format headers
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setBackground("#0F172A");
      headerRange.setFontColor("#38BDF8");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = data.timestamp ? new Date(data.timestamp).toLocaleString() : new Date().toLocaleString();
    
    sheet.appendRow([
      timestamp,
      data.id || "",
      data.full_name || "",
      data.business_name || "",
      data.phone || "",
      data.email || "",
      data.service || "",
      data.budget || "",
      data.status || "New",
      data.project_description || ""
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Soft Tech World Webhook is active and ready to receive leads!");
}
`;
  res.type('text/plain').send(script);
});

// Vite middleware & production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Soft Tech World server running on http://localhost:${PORT}`);
  });
}

startServer();
