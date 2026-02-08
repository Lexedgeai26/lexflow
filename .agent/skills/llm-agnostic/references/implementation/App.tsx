
import React, { useState, useEffect, useRef } from 'react';
import {
  Plus,
  FolderOpen,
  FileText,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Trash2,
  ChevronRight,
  ArrowLeft,
  Loader2,
  ExternalLink,
  Gavel,
  Upload,
  FileSearch,
  Sparkles,
  Paperclip,
  PenTool,
  Settings,
  User,
  LogOut,
  Building2,
  MapPin,
  Briefcase,
  Lock,
  Mail,
  UserPlus,
  LogIn,
  Layers,
  Info,
  Lightbulb,
  Copy,
  Check
} from 'lucide-react';
import { Case, ValidationReport, AppState, UserProfile } from './types';
import { validateDraft, generateDraft, parseLegalDocument } from './services/geminiService';
import ValidationReportView from './components/ValidationReportView';
import { LegalCopilot } from './components/LegalCopilot';

const PRACTICE_AREAS = [
  'GST', 'Income Tax', 'Criminal', 'Civil', 'Corporate', 'Real Estate', 'Intellectual Property', 'Family Law', 'Employment', 'Maritime', 'Environmental'
];

const DRAFT_TYPES = [
  'Reply to Legal Notice',
  'Written Statement / Defense',
  'Demand Letter / Notice',
  'Client Status Update',
  'Rejoinder / Replication',
  'Interlocutory Application',
  'Settlement Proposal',
  'Brief Note for Senior Counsel'
];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    // User is still local-first for auth token persistence but cases come from DB
    const savedUser = localStorage.getItem('lexreply_user');
    return {
      cases: [], // Start empty, fetch from DB
      activeCaseId: null,
      currentReport: null,
      isProcessing: false,
      user: savedUser ? JSON.parse(savedUser) : null
    };
  });

  const [isLoadingCases, setIsLoadingCases] = useState(false);
  const [view, setView] = useState<'dashboard' | 'create_case' | 'case_detail' | 'report' | 'settings' | 'login' | 'register'>(
    state.user ? 'dashboard' : 'login'
  );

  const [newCase, setNewCase] = useState<Partial<Case>>({});
  const [draftInput, setDraftInput] = useState('');
  const [draftInstruction, setDraftInstruction] = useState('');
  const [draftType, setDraftType] = useState(DRAFT_TYPES[0]);
  const [activeAction, setActiveAction] = useState<'validate' | 'draft' | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [validationFile, setValidationFile] = useState<{ data: string, mimeType: string, name: string } | null>(null);
  const [showDraftSuccess, setShowDraftSuccess] = useState(false);
  const [copying, setCopying] = useState(false);

  // Profile Form State
  const [profileForm, setProfileForm] = useState<UserProfile>(state.user || {
    name: '',
    firmName: '',
    country: '',
    state: '',
    practiceAreas: [],
    role: 'Advocate'
  });

  const createFileInputRef = useRef<HTMLInputElement>(null);
  const validationFileInputRef = useRef<HTMLInputElement>(null);

  // Fetch cases from Backend
  useEffect(() => {
    if (state.user && localStorage.getItem('lexreply_token')) {
      setIsLoadingCases(true);
      fetch('http://localhost:4000/api/cases', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('lexreply_token')}` }
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            setState(prev => ({ ...prev, cases: data }));
          }
        })
        .catch(err => console.error("Failed to load cases", err))
        .finally(() => setIsLoadingCases(false));
    }
  }, [state.user]);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem('lexreply_user', JSON.stringify(state.user));
    }
  }, [state.user]);

  // Ensure token exists if user is logged in
  useEffect(() => {
    if (state.user && !localStorage.getItem('lexreply_token')) {
      console.warn("Found user but no token. Forcing re-login.");
      setState(prev => ({ ...prev, user: null }));
      setView('login');
      alert("Session expired. Please sign in again.");
    }
  }, []);

  const activeCase = state.cases.find(c => c.id === state.activeCaseId);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, target: 'create' | 'validate') => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isSupportedByGemini = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'].includes(file.type);

    if (target === 'create') {
      if (!isSupportedByGemini) {
        alert("Please upload a PDF or Image for auto-extraction. For other formats, copy-paste the text.");
        return;
      }
      setIsParsing(true);
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = (reader.result as string).split(',')[1];
        if (target === 'create') {
          const parsedData = await parseLegalDocument(base64, file.type, state.user);
          setNewCase(prev => ({ ...prev, ...parsedData }));
        } else {
          if (!isSupportedByGemini) {
            alert("Draft audit via upload currently supports PDF/Image. Paste text for Word files.");
            return;
          }
          setValidationFile({ data: base64, mimeType: file.type, name: file.name });
        }
      } catch (err: any) {
        console.error("File processing error:", err);
        alert(`Failed to process file: ${err.message}. You can still enter details manually.`);
      } finally {
        setIsParsing(false);
        if (event.target) event.target.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateCase = async () => {
    if (!newCase.title || !newCase.clientName) return;

    try {
      const token = localStorage.getItem('lexreply_token');
      if (!token) throw new Error("No auth token");

      const res = await fetch('http://localhost:4000/api/cases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newCase)
      });

      if (!res.ok) throw new Error("Failed to create case");

      const created = await res.json();

      setState(prev => ({ ...prev, cases: [created, ...prev.cases] }));
      setNewCase({});
      setView('dashboard');

    } catch (e) {
      alert("Failed to save case to database.");
      console.error(e);
    }
  };

  const handleSyncKnowledge = async () => {
    if (state.cases.length === 0) return alert("No cases to sync.");
    const { syncCaseToRAG } = await import('./services/geminiService');
    let count = 0;
    for (const c of state.cases) {
      await syncCaseToRAG(c);
      count++;
    }
    alert(`Successfully synced ${count} cases to the AI Legal Knowledge Base.`);
  };

  const handleSaveProfile = () => {
    if (!profileForm.name || !profileForm.firmName) {
      alert("Name and Firm Name are required to personalize AI drafting.");
      return;
    }
    setState(prev => ({ ...prev, user: profileForm }));
    setView('dashboard');
  };

  const handleLogout = () => {
    if (confirm("Sign out of LexReply?")) {
      localStorage.removeItem('lexreply_user');
      setState(prev => ({ ...prev, user: null }));
      setView('login');
    }
  };

  const handleRunValidation = async () => {
    if (!activeCase || (!draftInput && !validationFile)) return;
    setState(prev => ({ ...prev, isProcessing: true }));
    try {
      const report = await validateDraft(
        activeCase,
        state.user,
        draftInput || undefined,
        validationFile ? { data: validationFile.data, mimeType: validationFile.mimeType } : undefined
      );
      setState(prev => ({ ...prev, currentReport: report, isProcessing: false }));
      setView('report');
    } catch (err: any) {
      alert("Validation failed: " + err.message);
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleRunDrafting = async () => {
    if (!activeCase) return;
    if (!draftInstruction.trim()) {
      alert("Please enter drafting instructions (e.g. Deny allegations in para 4).");
      return;
    }

    setState(prev => ({ ...prev, isProcessing: true }));
    try {
      const combinedInstructions = `DRAFT CATEGORY: ${draftType}\n\nSPECIFIC USER REQUIREMENTS:\n${draftInstruction}`;
      const draft = await generateDraft(activeCase, state.user, combinedInstructions);

      setDraftInput(draft);
      setShowDraftSuccess(true);
      setState(prev => ({ ...prev, isProcessing: false }));

      // Auto-switch to validate mode after a brief delay so user sees the success
      setTimeout(() => {
        setShowDraftSuccess(false);
        setActiveAction('validate');
      }, 2500);
    } catch (err: any) {
      alert("Drafting failed: " + err.message);
      setState(prev => ({ ...prev, isProcessing: false }));
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(draftInput);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  if (view === 'login' || view === 'register') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full animate-slideUp my-8">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg mb-4">
              <Gavel className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-slate-900">LexReply <span className="text-blue-600">AI</span></h1>
            <p className="text-slate-500 text-sm mt-1 text-center">The Intelligent Co-Pilot for Legal Professionals</p>
          </div>

          <div className="space-y-4">
            {view === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="Adv. John Doe" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input type="email" placeholder="lawyer@firm.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900" />
              </div>
            </div>

            <button
              onClick={async () => {
                const emailInput = document.querySelector<HTMLInputElement>('input[type="email"]');
                const passwordInput = document.querySelector<HTMLInputElement>('input[type="password"]');
                const nameInput = document.querySelector<HTMLInputElement>('input[placeholder="Adv. John Doe"]');

                if (!emailInput?.value) return alert("Email is required");

                try {
                  const res = await fetch('http://localhost:4000/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      email: emailInput.value,
                      password: passwordInput?.value, // Password sent (mock verification on backend)
                      name: nameInput?.value
                    })
                  });

                  if (!res.ok) throw new Error('Login failed');

                  const data = await res.json();
                  localStorage.setItem('lexreply_token', data.token); // Store JWT

                  // Merge backend user data with local profile form if needed, or just use what we have
                  const userProfile = {
                    ...profileForm,
                    email: data.user.email,
                    name: data.user.name || profileForm.name
                  };

                  setState(prev => ({ ...prev, user: userProfile }));
                  localStorage.setItem('lexreply_user', JSON.stringify(userProfile));

                  if (!state.user && view === 'register') {
                    setView('settings');
                  } else {
                    setView('dashboard');
                  }
                } catch (e) {
                  alert("Authentication failed. Please check backend is running on port 4000.");
                  console.error(e);
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {view === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
              {view === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div className="text-center text-sm text-slate-500 mt-6">
              {view === 'login' ? (
                <>New to LexReply? <button onClick={() => setView('register')} className="text-blue-600 font-bold hover:underline">Register Firm</button></>
              ) : (
                <>Already have an account? <button onClick={() => setView('login')} className="text-blue-600 font-bold hover:underline">Log In</button></>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setView('dashboard'); setState(p => ({ ...p, activeCaseId: null, currentReport: null })); }}>
            <div className="bg-blue-600 p-2 rounded-lg group-hover:rotate-6 transition-transform">
              <Gavel className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-serif font-bold tracking-tight">LexReply <span className="text-blue-600">AI</span></h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setView('settings')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all text-sm font-semibold border ${view === 'settings' ? 'bg-blue-600 border-blue-600 text-white' : 'hover:bg-slate-800 border-transparent text-slate-300'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${view === 'settings' ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
                {state.user?.name?.[0] || <User className="w-4 h-4" />}
              </div>
              <span className="hidden md:inline">{state.user?.name || 'Complete Profile'}</span>
            </button>
            <button onClick={handleLogout} className="p-2 hover:bg-red-500/20 rounded-xl transition-colors text-slate-400 hover:text-red-400" title="Logout">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
        {view === 'settings' && (
          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100 animate-slideUp">
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-800 mb-8 cursor-pointer transition-colors" onClick={() => setView('dashboard')}>
              <ArrowLeft className="w-4 h-4" /> Return to Matters
            </div>

            <div className="mb-10 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center md:justify-start gap-3">
                <Settings className="w-8 h-8 text-blue-600" /> Lawyer Configuration
              </h2>
              <p className="text-slate-500 mt-2">Personalize the AI context for drafting and validation accuracy.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><User className="w-4 h-4" /> Professional Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                    placeholder="e.g. Adv. Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Building2 className="w-4 h-4" /> Law Firm Name</label>
                  <input
                    type="text"
                    value={profileForm.firmName}
                    onChange={e => setProfileForm({ ...profileForm, firmName: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                    placeholder="Doe & Partners"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Primary Country</label>
                  <input
                    type="text"
                    value={profileForm.country}
                    onChange={e => setProfileForm({ ...profileForm, country: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                    placeholder="e.g. India"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><MapPin className="w-4 h-4" /> State / High Court Jurisdiction</label>
                  <input
                    type="text"
                    value={profileForm.state}
                    onChange={e => setProfileForm({ ...profileForm, state: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                    placeholder="e.g. Delhi / Maharashtra"
                  />
                </div>
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> Areas of Expertise (Select all that apply)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {PRACTICE_AREAS.map(area => (
                  <label key={area} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${profileForm.practiceAreas.includes(area) ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-blue-400'}`}>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={profileForm.practiceAreas.includes(area)}
                      onChange={() => {
                        const next = profileForm.practiceAreas.includes(area)
                          ? profileForm.practiceAreas.filter(a => a !== area)
                          : [...profileForm.practiceAreas, area];
                        setProfileForm({ ...profileForm, practiceAreas: next });
                      }}
                    />
                    <span className="text-sm font-bold">{area}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl transition-all text-lg flex items-center justify-center gap-3"
            >
              <ShieldCheck className="w-6 h-6 text-green-400" />
              Save Settings & Ground AI
            </button>

            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Advanced Knowledge</h3>
              <button
                onClick={handleSyncKnowledge}
                className="flex items-center gap-2 text-blue-600 font-bold bg-blue-50 px-4 py-3 rounded-xl hover:bg-blue-100 w-full justify-center"
              >
                <Sparkles className="w-4 h-4" /> Sync All Cases to Legal Copilot
              </button>
            </div>
          </div>
        )}

        {view === 'dashboard' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h2 className="text-4xl font-serif font-bold text-slate-800">Legal Matters</h2>
                <p className="text-slate-500 font-medium">Managing records for <span className="text-blue-600">{state.user?.firmName || 'the Firm'}</span></p>
              </div>
              <button
                onClick={() => setView('create_case')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Open New Case
              </button>
            </div>

            {/* NEW: USER GUIDE SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                {state.cases.length === 0 ? (
                  <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center flex flex-col items-center">
                    <div className="bg-slate-50 p-6 rounded-full mb-6">
                      <FolderOpen className="w-16 h-16 text-slate-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-700">No active matters found</h3>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">Establish a Case Context by uploading docs or pasting facts to enable AI grounding.</p>
                    <button
                      onClick={() => setView('create_case')}
                      className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-colors"
                    >
                      Create Your First Case
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {state.cases.map(c => (
                      <div
                        key={c.id}
                        onClick={() => { setState(p => ({ ...p, activeCaseId: c.id })); setView('case_detail'); }}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative flex flex-col"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <FileText className="w-8 h-8" />
                          </div>
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              if (confirm("Permanently delete this case and its context?")) {
                                try {
                                  const token = localStorage.getItem('lexreply_token');
                                  await fetch(`http://localhost:4000/api/cases/${c.id}`, {
                                    method: 'DELETE',
                                    headers: { 'Authorization': `Bearer ${token}` }
                                  });
                                  setState(prev => ({ ...prev, cases: prev.cases.filter(x => x.id !== c.id) }));
                                } catch (err) {
                                  alert("Failed to delete case.");
                                }
                              }
                            }}
                            className="text-slate-300 hover:text-red-500 p-2 rounded-full transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1">{c.title}</h4>
                        <p className="text-slate-500 text-sm mb-6 flex-1">Client: <span className="font-bold text-slate-700">{c.clientName}</span></p>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                          <span className="bg-slate-100 px-3 py-1 rounded-full">{c.caseNumber || 'No ID'}</span>
                          <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* HELP & TIPS SIDEBAR */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Professional Tips
                  </h3>
                  <div className="space-y-6">
                    <div className="group">
                      <h4 className="text-xs font-bold text-blue-600 mb-1">1. Context is King</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">AI drafting only works when you provide a "Source of Truth". Always upload the opposing party's notice first.</p>
                    </div>
                    <div className="group">
                      <h4 className="text-xs font-bold text-blue-600 mb-1">2. Auto-Fill with AI</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Don't type manually. Use the "Auto-fill" button when creating a case to let AI extract parties, dates, and amounts.</p>
                    </div>
                    <div className="group">
                      <h4 className="text-xs font-bold text-blue-600 mb-1">3. The 3-Step Audit</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">After drafting, use the "Audit Draft" button. It checks for liability admissions and factual errors automatically.</p>
                    </div>
                    <div className="group">
                      <h4 className="text-xs font-bold text-blue-600 mb-1">4. Grounding Laws</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Ensure your Profile (Settings) is complete so AI uses the correct State Laws and Firm Tone.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 text-white rounded-3xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <ShieldCheck className="w-5 h-5" />
                    <h3 className="font-bold text-sm">Security Policy</h3>
                  </div>
                  <p className="text-[10px] opacity-80 leading-relaxed">LexReply AI does not store your documents on its training servers. All context is grounded in real-time and remains within your local session vault.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'create_case' && (
          <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 animate-slideUp">
            <button onClick={() => setView('dashboard')} className="flex items-center text-slate-400 hover:text-slate-800 mb-8 gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Matters
            </button>

            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <h2 className="text-3xl font-bold text-slate-800">Case Context</h2>
              <button
                onClick={() => createFileInputRef.current?.click()}
                disabled={isParsing}
                className="flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-2xl border border-blue-100 transition-all shadow-sm"
              >
                {isParsing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {isParsing ? 'Processing...' : 'Auto-fill with AI'}
              </button>
              <input
                type="file"
                ref={createFileInputRef}
                onChange={(e) => handleFileUpload(e, 'create')}
                className="hidden"
                accept="application/pdf,image/*"
              />
            </div>

            {isParsing && (
              <div className="mb-8 bg-blue-600 text-white p-6 rounded-2xl flex items-center gap-5 animate-pulse shadow-lg shadow-blue-500/20">
                <FileSearch className="w-8 h-8" />
                <div>
                  <p className="text-lg font-bold">Reading legal documents...</p>
                  <p className="text-sm text-blue-100 opacity-80">Extracting names, claims, and key dates for your context.</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Matter Title *</label>
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-slate-900 font-medium ${newCase.title ? 'bg-blue-50/50' : ''}`}
                    placeholder="e.g. Smith vs. Global Corp - Civil Suit"
                    value={newCase.title || ''}
                    onChange={e => setNewCase(p => ({ ...p, title: e.target.value }))}
                  />
                  {newCase.title && <Sparkles className="w-4 h-4 text-blue-500 absolute right-4 top-3.5" />}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Client Name *</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                    placeholder="Party you represent"
                    value={newCase.clientName || ''}
                    onChange={e => setNewCase(p => ({ ...p, clientName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Opposing Party</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                    placeholder="Adverse party"
                    value={newCase.opposingParty || ''}
                    onChange={e => setNewCase(p => ({ ...p, opposingParty: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Jurisdiction</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                    placeholder="e.g. High Court"
                    value={newCase.jurisdiction || ''}
                    onChange={e => setNewCase(p => ({ ...p, jurisdiction: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Case ID</label>
                  <input
                    type="text"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-medium"
                    placeholder="Internal Reference #"
                    value={newCase.caseNumber || ''}
                    onChange={e => setNewCase(p => ({ ...p, caseNumber: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Fact Repository (Source of Truth)</label>
                <textarea
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 min-h-[180px] text-slate-900 font-medium leading-relaxed"
                  placeholder="Paste details from notices, emails, or let AI extract them above..."
                  value={newCase.contextText || ''}
                  onChange={e => setNewCase(p => ({ ...p, contextText: e.target.value }))}
                />
              </div>
              <button
                onClick={handleCreateCase}
                disabled={!newCase.title || !newCase.clientName || isParsing}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-5 rounded-2xl shadow-xl transition-all text-lg"
              >
                Establish Matter Context
              </button>
            </div>
          </div>
        )}

        {view === 'case_detail' && activeCase && (
          <div className="space-y-6 animate-fadeIn">
            <button onClick={() => setView('dashboard')} className="flex items-center text-slate-400 hover:text-slate-800 mb-4 gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Matters
            </button>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-3xl font-serif font-bold text-slate-800 leading-tight">{activeCase.title}</h2>
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100 uppercase tracking-tighter">Matter</span>
                </div>
                <div className="flex flex-wrap items-center gap-5 mt-2 text-slate-500 text-sm font-medium">
                  <span className="flex items-center gap-1.5 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><FileText className="w-4 h-4" /> {activeCase.caseNumber || 'UNREF'}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {activeCase.jurisdiction}</span>
                  <span className="text-blue-600 font-bold bg-blue-50/50 px-3 py-1.5 rounded-lg border border-blue-100/50 flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Client: {activeCase.clientName}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto self-end md:self-center">
                <button
                  onClick={() => setActiveAction('draft')}
                  className={`flex-1 md:flex-initial px-6 py-3 rounded-2xl font-bold border transition-all flex items-center justify-center gap-2 text-sm ${activeAction === 'draft' ? 'bg-slate-900 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400 shadow-sm'}`}
                >
                  <PenTool className="w-4 h-4" />
                  Generate Draft
                </button>
                <button
                  onClick={() => setActiveAction('validate')}
                  className={`flex-1 md:flex-initial px-6 py-3 rounded-2xl font-bold border transition-all flex items-center justify-center gap-2 text-sm ${activeAction === 'validate' ? 'bg-blue-600 text-white border-blue-600 shadow-xl' : 'bg-white text-blue-600 border-blue-200 hover:border-blue-400 shadow-sm'}`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  Audit Draft
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full min-h-[600px]">
              {/* Left Column: Context (Persistent) */}
              <div className="lg:col-span-1 bg-white border border-slate-100 rounded-3xl shadow-sm flex flex-col">
                <div className="p-6 border-b border-slate-50 bg-slate-50/50 rounded-t-3xl flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Case Facts (Truth)
                  </h3>
                  <button onClick={() => setView('create_case')} className="text-[10px] text-blue-600 font-bold hover:underline">Update Context</button>
                </div>
                <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                  <div className="prose prose-sm text-slate-700 max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed font-medium">{activeCase.contextText}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Interaction */}
              <div className="lg:col-span-2 space-y-4">
                {activeAction === 'draft' && (
                  <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm animate-slideUp relative overflow-hidden">
                    {showDraftSuccess && (
                      <div className="absolute inset-0 bg-blue-600/95 z-50 flex flex-col items-center justify-center text-white animate-fadeIn">
                        <CheckCircle className="w-16 h-16 mb-4 animate-bounce" />
                        <h4 className="text-2xl font-bold mb-2">Draft Generated!</h4>
                        <p className="opacity-90">Switching to Factual Audit mode...</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-slate-800">Legal Drafting</h3>
                      <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100 font-bold">
                        <Info className="w-3.5 h-3.5" /> High Precision Pro-Mode
                      </div>
                    </div>

                    <div className="space-y-6 mb-8">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Layers className="w-4 h-4" /> Select Category</label>
                        <select
                          value={draftType}
                          onChange={(e) => setDraftType(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 font-bold transition-all shadow-sm"
                        >
                          {DRAFT_TYPES.map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><PenTool className="w-4 h-4" /> Instructions (The more specific, the better)</label>
                        <textarea
                          className="w-full border border-slate-200 rounded-2xl p-6 min-h-[220px] outline-none focus:ring-2 focus:ring-blue-600 shadow-inner bg-slate-50/50 text-slate-900 leading-relaxed font-medium placeholder:text-slate-400"
                          placeholder="Example: Deny para 4 regarding payment delay. Mention client paid via cheque on 14th Oct (Context Fact #3). Tone: Formal."
                          value={draftInstruction}
                          onChange={e => setDraftInstruction(e.target.value)}
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleRunDrafting}
                      disabled={state.isProcessing || !draftInstruction.trim()}
                      className="flex items-center justify-center gap-3 w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-black disabled:bg-slate-300 transition-all shadow-xl text-lg group active:scale-[0.98]"
                    >
                      {state.isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />}
                      {state.isProcessing ? 'Thinking & Drafting...' : 'Generate Grounded Draft'}
                    </button>

                    <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] text-slate-500 text-center">
                      AI is grounding response in <span className="text-blue-600 font-bold">{activeCase.title}</span> truth repository. No hallucinations permitted.
                    </div>
                  </div>
                )}

                {activeAction === 'validate' && (
                  <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-sm animate-slideUp">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-800">Integrity Audit</h3>
                        <p className="text-slate-500 text-sm">Validating draft against Case Truth Context.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyToClipboard}
                          disabled={!draftInput}
                          className="text-xs font-bold text-slate-600 bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                          {copying ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          {copying ? 'Copied' : 'Copy Text'}
                        </button>
                        <button
                          onClick={() => validationFileInputRef.current?.click()}
                          className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 flex items-center gap-2 hover:bg-blue-100 transition-colors shadow-sm"
                        >
                          <Upload className="w-4 h-4" /> Import External File
                        </button>
                      </div>
                      <input type="file" ref={validationFileInputRef} onChange={(e) => handleFileUpload(e, 'validate')} className="hidden" accept="application/pdf,image/*" />
                    </div>

                    {validationFile && (
                      <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-3 text-sm text-blue-800 font-bold">
                          <Paperclip className="w-5 h-5 text-blue-600" /> {validationFile.name}
                        </div>
                        <button onClick={() => setValidationFile(null)} className="text-xs text-red-500 font-bold hover:underline">Remove Attachment</button>
                      </div>
                    )}

                    <textarea
                      className="w-full border border-slate-200 rounded-2xl p-6 min-h-[400px] outline-none focus:ring-2 focus:ring-blue-600 mb-6 font-mono text-sm leading-relaxed shadow-inner bg-slate-50/50 text-slate-900"
                      placeholder="Paste your legal reply text here for a factual and legal risk audit..."
                      value={draftInput}
                      onChange={e => setDraftInput(e.target.value)}
                    />

                    <button
                      onClick={handleRunValidation}
                      disabled={state.isProcessing || (!draftInput && !validationFile)}
                      className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-5 rounded-2xl font-bold hover:bg-blue-700 disabled:bg-slate-300 transition-all shadow-xl text-lg shadow-blue-500/20 active:scale-[0.98]"
                    >
                      {state.isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
                      {state.isProcessing ? 'Checking Consistency...' : 'Run Factual Integrity Audit'}
                    </button>
                  </div>
                )}

                {!activeAction && (
                  <div className="h-full min-h-[500px] flex flex-col items-center justify-center bg-white border border-dashed border-slate-200 rounded-3xl p-12 text-slate-400 animate-fadeIn">
                    <div className="bg-slate-50 p-10 rounded-full mb-6 text-slate-200">
                      <FileText className="w-20 h-20" />
                    </div>
                    <p className="text-xl font-bold text-slate-600 mb-3 uppercase tracking-wider">Case Context Active</p>
                    <p className="text-sm max-w-sm text-center text-slate-400 leading-relaxed font-medium">This matter is grounded in <span className="text-blue-600 font-bold">{activeCase.clientName}</span> fact vault. Use the buttons above to generate or audit drafts.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {view === 'report' && state.currentReport && (
          <div className="animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => setView('case_detail')}
                className="flex items-center text-slate-600 hover:text-slate-800 gap-3 bg-white px-6 py-3 rounded-2xl border border-slate-200 shadow-sm transition-all font-bold"
              >
                <ArrowLeft className="w-5 h-5" /> Return to Matter
              </button>
              <div className="flex gap-4">
                <button className="text-xs font-bold text-blue-600 bg-white px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-50 transition-all flex items-center gap-2"><ExternalLink className="w-4 h-4" /> Export PDF</button>
              </div>
            </div>
            <ValidationReportView report={state.currentReport} />
          </div>
        )}
      </main>

      <LegalCopilot />

      <footer className="bg-white border-t border-slate-100 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2 mb-1">
              <Gavel className="w-5 h-5 text-blue-600" />
              <h4 className="text-slate-800 font-bold text-sm tracking-tight">LexReply AI <span className="text-[10px] text-slate-300 ml-1">v1.2.4</span></h4>
            </div>
            <p className="text-slate-400 text-xs font-medium">
              Expert-level Legal Intelligence. Grounded in context provided by <span className="text-blue-600 font-bold">{state.user?.name || 'the advocate'}</span>.
            </p>
          </div>
          <div className="flex items-center gap-8 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Safety Vault</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Encrypted Sync</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Disclaimer</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
