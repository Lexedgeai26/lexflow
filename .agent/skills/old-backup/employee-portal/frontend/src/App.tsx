import React from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import Login from '@/pages/Login';
import EmployeeList from '@/pages/EmployeeList';
import DepartmentList from '@/pages/DepartmentList';
import Dashboard from '@/pages/Dashboard';
import AuditLogs from '@/pages/AuditLogs';
import {
    Users,
    LayoutDashboard,
    Building,
    FileText,
    LogOut,
    History,
    Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Layout components
const Layout = ({ children }: { children: React.ReactNode }) => {
    const location = useLocation();
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const user = useAuthStore((state) => state.user);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
        { name: 'Employees', icon: Users, path: '/employees' },
        { name: 'Departments', icon: Building, path: '/departments' },
        { name: 'Audit Logs', icon: History, path: '/audit-logs', adminOnly: true },
    ];

    const filteredNavItems = navItems.filter(item =>
        !item.adminOnly || (user?.role === 'admin' || user?.role === 'manager')
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r flex flex-col fixed inset-y-0 shadow-sm z-20">
                <div className="p-6 border-b flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-md">
                        <Shield className="w-5 h-5" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                        Portal Core
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {filteredNavItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                location.pathname === item.path
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-muted-foreground hover:bg-gray-100 hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4", location.pathname === item.path ? "text-white" : "text-muted-foreground")} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t space-y-2">
                    <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold border border-primary/20">
                                {user?.email[0].toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-semibold truncate">{user?.email}</p>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{user?.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => clearAuth()}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold bg-white border border-red-100 text-red-600 hover:bg-red-50 transition-colors shadow-sm"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

// Protected Route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Layout>{children}</Layout>;
};

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/employees"
                element={
                    <ProtectedRoute>
                        <EmployeeList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/departments"
                element={
                    <ProtectedRoute>
                        <DepartmentList />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/audit-logs"
                element={
                    <ProtectedRoute>
                        <AuditLogs />
                    </ProtectedRoute>
                }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
