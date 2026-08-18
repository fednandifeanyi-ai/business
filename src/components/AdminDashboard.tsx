import React, { useState, useEffect } from 'react';
import {
  Shield, Key, Users, CheckCircle, Clock, TrendingUp, Search, Filter,
  Download, RefreshCw, Phone, MessageCircle, Trash2, Edit3, X, FileSpreadsheet,
  Copy, Check, Send, AlertCircle, ExternalLink, Settings, Eye
} from 'lucide-react';
import { Lead, LeadStats, LeadStatus } from '../types';
import { ASSET_IMAGES, handleImageError } from '../constants/assets';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!sessionStorage.getItem('softtech_admin_token');
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'leads' | 'sheets' | 'settings'>('leads');

  // Leads state
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<LeadStats>({
    total: 0,
    newLeads: 0,
    contacted: 0,
    inProgress: 0,
    converted: 0,
    closed: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Google Sheets state
  const [sheetWebhookUrl, setSheetWebhookUrl] = useState('');
  const [sheetScriptCode, setSheetScriptCode] = useState('');
  const [sheetSaving, setSheetSaving] = useState(false);
  const [sheetTestStatus, setSheetTestStatus] = useState<string | null>(null);
  const [copiedScript, setCopiedScript] = useState(false);
  const [syncingAll, setSyncingAll] = useState(false);

  // Settings state
  const [newPin, setNewPin] = useState('');
  const [settingsStatus, setSettingsStatus] = useState('');

  // Fetch leads and stats
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [leadsRes, statsRes, configRes, scriptRes] = await Promise.all([
        fetch(`/api/leads?search=${encodeURIComponent(searchTerm)}&service=${filterService}&status=${filterStatus}`),
        fetch('/api/leads/stats'),
        fetch('/api/config'),
        fetch('/api/google-sheet-script'),
      ]);

      if (leadsRes.ok) {
        const leadsData = await leadsRes.json();
        setLeads(leadsData.leads || []);
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (configRes.ok) {
        const configData = await configRes.json();
        setSheetWebhookUrl(configData.googleSheetWebhookUrl || '');
      }
      if (scriptRes.ok) {
        const scriptText = await scriptRes.text();
        setSheetScriptCode(scriptText);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchDashboardData();
    }
  }, [isOpen, isAuthenticated, searchTerm, filterService, filterStatus]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }
      sessionStorage.setItem('softtech_admin_token', data.token);
      setIsAuthenticated(true);
      setPinInput('');
    } catch (err: any) {
      setAuthError(err.message || 'Invalid PIN');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('softtech_admin_token');
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (id: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchDashboardData();
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleSaveNotes = async (id: string, notes: string) => {
    try {
      await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      fetchDashboardData();
    } catch (err) {
      console.error('Error saving notes:', err);
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selectedLead && selectedLead.id === id) setSelectedLead(null);
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Error deleting lead:', err);
    }
  };

  const handleSaveSheetWebhook = async () => {
    setSheetSaving(true);
    setSheetTestStatus(null);
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ googleSheetWebhookUrl: sheetWebhookUrl }),
      });
      if (res.ok) {
        setSheetTestStatus('Google Sheet Webhook URL saved successfully!');
      } else {
        setSheetTestStatus('Failed to save webhook URL.');
      }
    } catch (err) {
      setSheetTestStatus('Error saving webhook URL.');
    } finally {
      setSheetSaving(false);
    }
  };

  const handleSyncAllLeads = async () => {
    if (!sheetWebhookUrl) {
      alert('Please save your Google Sheet Webhook URL first.');
      return;
    }
    setSyncingAll(true);
    try {
      const res = await fetch('/api/sync-all-to-sheet', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        fetchDashboardData();
      } else {
        alert(data.error || 'Failed to sync');
      }
    } catch (err) {
      alert('Error syncing to sheet');
    } finally {
      setSyncingAll(false);
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(sheetScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 3000);
  };

  const handleSaveNewPin = async () => {
    if (!newPin || newPin.length < 4) {
      setSettingsStatus('PIN must be at least 4 characters');
      return;
    }
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPin: newPin }),
      });
      if (res.ok) {
        setSettingsStatus('Admin PIN updated successfully!');
        setNewPin('');
      }
    } catch (err) {
      setSettingsStatus('Failed to update PIN');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-2 sm:p-4 animate-fade-in">
      <div className="rounded-3xl bg-[#080d1e] border border-cyan-500/30 w-full max-w-6xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Modal Top Header */}
        <div className="p-4 sm:p-6 bg-[#0a1127] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-[1.5px] shadow-md shadow-cyan-500/20 overflow-hidden shrink-0">
              <img
                src={ASSET_IMAGES.logo.local}
                alt={ASSET_IMAGES.logo.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[9px]"
                onError={(e) => handleImageError(e, ASSET_IMAGES.logo.cdn)}
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-display flex items-center gap-2">
                Soft Tech Lead & System Admin
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  SECURE PORTAL
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Lead capture CRM, Google Sheets synchronization, and business performance metrics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Auth Barrier if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6">
              <Key className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-bold text-white mb-2 font-display">
              Admin Authentication
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
              Enter your Administrator PIN or password to access captured client leads and Google Sheet configurations.
            </p>

            {authError && (
              <div className="w-full mb-4 p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input
                type="password"
                placeholder="Enter Admin PIN (Default: 8483)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-center font-mono text-base tracking-widest focus:border-cyan-400 focus:outline-none"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 transition-all"
              >
                Access Admin Dashboard
              </button>

              <button
                type="button"
                onClick={() => setPinInput('8483')}
                className="text-[11px] font-mono text-cyan-400 hover:underline pt-2 block mx-auto"
              >
                Quick Demo: Auto-Fill Default PIN (8483)
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard Content */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            
            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>Leads CRM ({leads.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('sheets')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'sheets'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Google Sheet Sync & Script</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={fetchDashboardData}
                  title="Refresh Data"
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                </button>

                <a
                  href="/api/export-csv"
                  download
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-cyan-300 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </a>
              </div>
            </div>

            {/* TAB 1: LEADS CRM */}
            {activeTab === 'leads' && (
              <div className="space-y-6">
                
                {/* 6 Key Stats Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 block">Total Leads</span>
                    <span className="text-xl font-bold text-white font-mono">{stats.total}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/30">
                    <span className="text-[11px] font-mono text-cyan-400 block">New Inquiries</span>
                    <span className="text-xl font-bold text-cyan-300 font-mono">{stats.newLeads}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30">
                    <span className="text-[11px] font-mono text-blue-400 block">Contacted</span>
                    <span className="text-xl font-bold text-blue-300 font-mono">{stats.contacted}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30">
                    <span className="text-[11px] font-mono text-amber-400 block">In Progress</span>
                    <span className="text-xl font-bold text-amber-300 font-mono">{stats.inProgress}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                    <span className="text-[11px] font-mono text-emerald-400 block">Converted</span>
                    <span className="text-xl font-bold text-emerald-300 font-mono">{stats.converted}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30">
                    <span className="text-[11px] font-mono text-purple-400 block">Conversion Rate</span>
                    <span className="text-xl font-bold text-purple-300 font-mono">{stats.conversionRate}%</span>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search leads by name, phone, email, business or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <select
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="all">All Services</option>
                    <option value="AI Automation">AI Automation</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Branding">Branding</option>
                    <option value="Video Creation">Video Creation</option>
                    <option value="Business Advertising">Business Advertising</option>
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {/* Leads Table */}
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#0b1329] border-b border-slate-800 text-slate-400 font-mono">
                          <th className="p-3.5">Client & Business</th>
                          <th className="p-3.5">Contact Details</th>
                          <th className="p-3.5">Service & Budget</th>
                          <th className="p-3.5">Status</th>
                          <th className="p-3.5">Date</th>
                          <th className="p-3.5 text-right">Quick Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {leads.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-500">
                              No leads found matching your search filter.
                            </td>
                          </tr>
                        ) : (
                          leads.map((lead) => {
                            const formattedWaNumber = lead.phone.replace(/[^0-9]/g, '');
                            const waDirectMsg = encodeURIComponent(
                              `Hello ${lead.full_name}, this is Soft Tech World & AI Automation regarding your project request for ${lead.service}.`
                            );
                            const waLink = `https://wa.me/${formattedWaNumber}?text=${waDirectMsg}`;

                            return (
                              <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                                <td className="p-3.5">
                                  <div className="font-bold text-white">{lead.full_name}</div>
                                  <div className="text-[11px] text-slate-400">{lead.business_name}</div>
                                </td>

                                <td className="p-3.5">
                                  <div className="font-mono text-cyan-300">{lead.phone}</div>
                                  <div className="text-[11px] text-slate-400">{lead.email}</div>
                                </td>

                                <td className="p-3.5">
                                  <div className="font-semibold text-white">{lead.service}</div>
                                  <div className="text-[11px] text-slate-400">{lead.budget}</div>
                                </td>

                                <td className="p-3.5">
                                  <select
                                    value={lead.status}
                                    onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold focus:outline-none ${
                                      lead.status === 'New'
                                        ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/40'
                                        : lead.status === 'Contacted'
                                        ? 'bg-blue-950 text-blue-400 border border-blue-500/40'
                                        : lead.status === 'In Progress'
                                        ? 'bg-amber-950 text-amber-400 border border-amber-500/40'
                                        : lead.status === 'Converted'
                                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                                    }`}
                                  >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Converted">Converted</option>
                                    <option value="Closed">Closed</option>
                                  </select>
                                </td>

                                <td className="p-3.5 font-mono text-[11px] text-slate-400">
                                  {new Date(lead.created_at).toLocaleDateString()}
                                </td>

                                <td className="p-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {/* View details */}
                                    <button
                                      onClick={() => setSelectedLead(lead)}
                                      title="View Lead Details"
                                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>

                                    {/* Direct WhatsApp Client */}
                                    <a
                                      href={waLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      title="Message Lead on WhatsApp"
                                      className="p-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900 text-emerald-400 border border-emerald-500/30"
                                    >
                                      <MessageCircle className="w-3.5 h-3.5" />
                                    </a>

                                    {/* Direct Phone Call */}
                                    <a
                                      href={`tel:${lead.phone}`}
                                      title="Call Lead"
                                      className="p-1.5 rounded-lg bg-blue-950/60 hover:bg-blue-900 text-blue-400 border border-blue-500/30"
                                    >
                                      <Phone className="w-3.5 h-3.5" />
                                    </a>

                                    {/* Delete */}
                                    <button
                                      onClick={() => handleDeleteLead(lead.id)}
                                      title="Delete Lead"
                                      className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 border border-rose-500/30"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: GOOGLE SHEETS SYNC & GOOGLE APPS SCRIPT */}
            {activeTab === 'sheets' && (
              <div className="space-y-6">
                
                {/* Overview Card */}
                <div className="p-6 rounded-2xl bg-[#0b1329] border border-cyan-500/30 shadow-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
                    <h4 className="text-lg font-bold text-white font-display">
                      Google Sheets Real-Time Automated Synchronization
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    Every lead submitted through your Soft Tech World landing page can be automatically and instantly appended to your personal Google Sheet ledger. Follow the instructions below and paste your Webhook URL.
                  </p>

                  {/* Webhook URL Input Form */}
                  <div className="space-y-3 mb-6">
                    <label className="block text-xs font-semibold font-mono text-cyan-300 uppercase">
                      Your Google Apps Script Web App URL:
                    </label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                        value={sheetWebhookUrl}
                        onChange={(e) => setSheetWebhookUrl(e.target.value)}
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-mono focus:border-cyan-400 focus:outline-none"
                      />
                      <button
                        onClick={handleSaveSheetWebhook}
                        disabled={sheetSaving}
                        className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {sheetSaving ? 'Saving...' : 'Save Webhook URL'}
                      </button>
                    </div>

                    {sheetTestStatus && (
                      <p className="text-xs font-mono text-emerald-400">{sheetTestStatus}</p>
                    )}
                  </div>

                  {/* Sync all button */}
                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                    <button
                      onClick={handleSyncAllLeads}
                      disabled={syncingAll || !sheetWebhookUrl}
                      className="px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-emerald-700 hover:bg-emerald-600 disabled:opacity-40 transition-all flex items-center gap-2"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${syncingAll ? 'animate-spin' : ''}`} />
                      <span>{syncingAll ? 'Syncing...' : 'Push All Existing Leads to Google Sheet'}</span>
                    </button>
                  </div>
                </div>

                {/* Google Apps Script Code with 1-Click Copy */}
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                    <div>
                      <h5 className="text-sm font-bold text-white font-mono">
                        Google Apps Script Code (Code.gs)
                      </h5>
                      <span className="text-xs text-slate-400">
                        Paste this code into your Google Sheet&apos;s Apps Script editor.
                      </span>
                    </div>

                    <button
                      onClick={handleCopyScript}
                      className="px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors"
                    >
                      {copiedScript ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedScript ? 'Script Copied!' : 'Copy Script Code'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-[#050813] text-cyan-200/90 text-xs font-mono overflow-x-auto max-h-72 border border-slate-800/80 leading-relaxed">
                    {sheetScriptCode || '// Loading Google Apps Script template...'}
                  </pre>
                </div>

                {/* 10-Step Setup Guide */}
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <h5 className="text-sm font-bold text-white mb-4 font-display">
                    How to Set Up in 2 Minutes:
                  </h5>
                  <ol className="space-y-2 text-xs text-slate-300 list-decimal list-inside leading-relaxed">
                    <li>Open <a href="https://sheets.new" target="_blank" rel="noreferrer" className="text-cyan-400 underline inline-flex items-center gap-0.5">sheets.new <ExternalLink className="w-3 h-3 inline" /></a> to create a new Google Sheet (e.g. named <em>&quot;Soft Tech Leads&quot;</em>).</li>
                    <li>In the top menu, click <strong>Extensions</strong> → <strong>Apps Script</strong>.</li>
                    <li>Delete any code in the editor, click the <strong>Copy Script Code</strong> button above, and paste it.</li>
                    <li>Click <strong>Save (Disk icon)</strong>.</li>
                    <li>Click the blue <strong>Deploy</strong> button (top right) → select <strong>New deployment</strong>.</li>
                    <li>Click the gear icon next to &quot;Select type&quot; → choose <strong>Web app</strong>.</li>
                    <li>Set <em>Execute as:</em> <strong>Me</strong>.</li>
                    <li>Set <em>Who has access:</em> <strong>Anyone</strong> (this allows the landing page backend to post leads).</li>
                    <li>Click <strong>Deploy</strong>, grant permissions, and copy the <strong>Web App URL</strong>.</li>
                    <li>Paste the copied URL into the box above and click <strong>Save Webhook URL</strong>!</li>
                  </ol>
                </div>

              </div>
            )}

            {/* TAB 3: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="max-w-xl space-y-6">
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800">
                  <h4 className="text-base font-bold text-white mb-2 font-display">
                    Change Admin PIN
                  </h4>
                  <p className="text-xs text-slate-400 mb-4">
                    Update your secure PIN for logging into this lead management dashboard.
                  </p>

                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Enter new 4+ digit PIN"
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono"
                    />

                    <button
                      onClick={handleSaveNewPin}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-cyan-400 hover:bg-cyan-300"
                    >
                      Update PIN
                    </button>

                    {settingsStatus && (
                      <p className="text-xs font-mono text-cyan-300">{settingsStatus}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Selected Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="rounded-3xl bg-[#090f23] border border-cyan-500/40 p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-400">
                Lead ID: {selectedLead.id}
              </span>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-white mb-1 font-display">
              {selectedLead.full_name}
            </h3>
            <p className="text-xs text-slate-400 mb-4">{selectedLead.business_name}</p>

            <div className="space-y-3 text-xs mb-6">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Phone/WhatsApp:</span>
                <span className="text-cyan-300 font-mono font-semibold">{selectedLead.phone}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-white font-mono">{selectedLead.email}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Service:</span>
                <span className="text-cyan-300 font-semibold">{selectedLead.service}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Budget:</span>
                <span className="text-emerald-400 font-semibold">{selectedLead.budget}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block mb-1">Project Description:</span>
                <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {selectedLead.project_description}
                </p>
              </div>

              {/* Internal notes */}
              <div>
                <span className="text-slate-400 block mb-1 font-mono">Internal Admin Notes:</span>
                <textarea
                  defaultValue={selectedLead.notes || ''}
                  onBlur={(e) => handleSaveNotes(selectedLead.id, e.target.value)}
                  placeholder="Type notes (auto-saves on click outside)..."
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 resize-none h-20"
                ></textarea>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-emerald-400 hover:bg-emerald-300 text-center flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Client</span>
              </a>

              <a
                href={`tel:${selectedLead.phone}`}
                className="py-2.5 px-4 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 flex items-center justify-center gap-1.5"
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
