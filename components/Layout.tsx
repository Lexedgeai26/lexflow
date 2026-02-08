
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
  Plus
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNewProject: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onNewProject }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'All Projects', icon: FolderOpen },
    { id: 'risk', label: 'Risk Center', icon: ShieldAlert },
    { id: 'templates', label: 'Playbooks', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-slate-300 transition-all duration-300 ease-in-out flex flex-col border-r border-slate-800`}>
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
              <span className="text-xl font-bold text-white tracking-tight">LexEdge Flow</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold mx-auto">L</div>
          )}
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

        <div className="p-4 space-y-2 border-t border-slate-800">
          <button
            onClick={onNewProject}
            className={`w-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 p-3 rounded-xl transition-colors border border-slate-700`}
          >
            <Plus size={18} />
            {isSidebarOpen && <span className="font-medium">New Matter</span>}
          </button>
          <button className={`w-full flex items-center gap-3 p-3 text-slate-400 hover:text-white transition-colors`}>
            <HelpCircle size={20} />
            {isSidebarOpen && <span className="font-medium">Support</span>}
          </button>
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
            <div className="flex -space-x-2 overflow-hidden">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/32/32?random=1" alt="User 1" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/32/32?random=2" alt="User 2" />
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">Sarah Jenkins</p>
                <p className="text-xs text-slate-500 mt-1">Senior Legal Counsel</p>
              </div>
              <img className="h-9 w-9 rounded-full bg-slate-200 border border-slate-200" src="https://picsum.photos/40/40?random=3" alt="Profile" />
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
