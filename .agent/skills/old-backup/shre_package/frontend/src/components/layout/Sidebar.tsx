import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    ShieldCheck,
    ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const navItems = [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Employees', icon: Users, path: '/employees' },
        { label: 'Documents', icon: FileText, path: '/documents' },
        { label: 'Settings', icon: Settings, path: '/settings' },
    ];

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="w-64 h-screen bg-white border-r border-neutral-200 flex flex-col fixed left-0 top-0">
            <div className="p-6 flex items-center space-x-3">
                <div className="bg-primary-600 p-2 rounded-lg text-white">
                    <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-tight text-neutral-900">shre</span>
            </div>

            <nav className="flex-1 px-4 space-y-1 py-10">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                            isActive
                                ? "bg-primary-50 text-primary-700"
                                : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                        )}
                    >
                        <div className="flex items-center space-x-3">
                            <item.icon className={cn(
                                "w-5 h-5 transition-colors",
                                "group-hover:text-primary-600"
                            )} />
                            <span>{item.label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto">
                <div className="bg-neutral-50 rounded-2xl p-4 mb-4">
                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                            {user.username?.[0]?.toUpperCase() || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-neutral-900 truncate">{user.username}</p>
                            <p className="text-xs text-neutral-500 truncate">{user.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full py-2 flex items-center justify-center space-x-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
