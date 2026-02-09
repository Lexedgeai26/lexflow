
import React from 'react';
import {
  FolderOpen,
  LayoutDashboard,
  ShieldAlert,
  Settings,
  FileText,
  HelpCircle,
  Menu,
  X,
  Plus,
  User as UserIcon,
  Scale,
  ShieldCheck,
  FileLock
} from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  user: User | null;
  onTabChange: (tab: string) => void;
  onNewProject: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, user, onTabChange, onNewProject }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'All Projects', icon: FolderOpen },
    { id: 'risk', label: 'Risk Center', icon: ShieldAlert },
    { id: 'templates', label: 'Playbooks', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'terms', label: 'Terms & Conditions', icon: ShieldCheck },
    { id: 'license', label: 'License Agreement', icon: FileLock },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out flex flex-col border-r border-slate-800`}>
        <div className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            {isSidebarOpen ? (
              <div className="flex flex-col gap-2">
                <img src="logo.png" className="w-32 h-auto rounded-lg shadow-sm" alt="LexEdge Logo" />
                <span className="text-xl font-bold text-white tracking-tight">LexEdge Flow</span>
              </div>
            ) : (
              <img src="logo.png" className="w-10 h-auto rounded-lg shadow-sm mx-auto" alt="LexEdge Logo" />
            )}
          </div>
        </div>

        <nav className="flex-1 mt-4 px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'hover:bg-slate-800 hover:text-white'
                }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'text-slate-400'} />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 space-y-4 border-t border-slate-800 shrink-0">
          <button
            onClick={onNewProject}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 p-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 border border-blue-500/50 ${!isSidebarOpen && 'px-0'}`}
          >
            <Plus size={18} />
            {isSidebarOpen && <span className="font-medium">New Matter</span>}
          </button>

          <div className={`pt-3 border-t border-slate-800/60 ${!isSidebarOpen && 'pt-0 border-t-0 flex flex-col items-center'}`}>
            <p className={`text-[11px] text-slate-300 font-bold tracking-tight ${!isSidebarOpen ? 'text-[9px]' : ''}`}>© 2026 LexEdge Flow</p>
            {isSidebarOpen && (
              <p className="text-[10px] text-slate-500 mt-1.5 leading-tight italic font-medium">
                Provided "as is" without warranty.
              </p>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500">
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h1 className="text-lg font-semibold text-slate-800 capitalize">{activeTab.replace('-', ' ')}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">{user?.lawyerName || 'Guest User'}</p>
                <p className="text-xs text-slate-500 mt-1">{user?.areaOfPractice || 'Legal Professional'}</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
                <UserIcon size={20} />
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
