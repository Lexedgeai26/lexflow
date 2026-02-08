import React, { useState } from 'react';
import {
    Users,
    DollarSign,
    ShoppingCart,
    TrendingUp,
    FileText,
    Plus,
    Search,
    Bell,
    Settings,
    LogOut,
    ChevronRight,
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ElementType;
    trend: { value: number; isPositive: boolean };
    color: 'blue' | 'green' | 'amber' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, color }) => {
    const colorClasses = {
        blue: 'text-blue-600 bg-blue-50',
        green: 'text-green-600 bg-green-50',
        amber: 'text-amber-600 bg-amber-50',
        red: 'text-red-600 bg-red-50',
    };

    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">
                        {title}
                    </div>
                    <div className="text-3xl font-bold text-slate-900">{value}</div>
                </div>
                <div className={`p-3 rounded-2xl ${colorClasses[color]}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <span
                    className={`font-bold ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                >
                    {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
                <span className="text-slate-500">vs last month</span>
            </div>
        </div>
    );
};

export const Dashboard: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const stats = [
        {
            title: 'Total Users',
            value: '1,250',
            icon: Users,
            trend: { value: 12.5, isPositive: true },
            color: 'blue' as const,
        },
        {
            title: 'Revenue',
            value: '$45,678',
            icon: DollarSign,
            trend: { value: 8.3, isPositive: true },
            color: 'green' as const,
        },
        {
            title: 'Orders',
            value: '342',
            icon: ShoppingCart,
            trend: { value: 2.1, isPositive: false },
            color: 'amber' as const,
        },
        {
            title: 'Conversion',
            value: '3.2%',
            icon: TrendingUp,
            trend: { value: 0.5, isPositive: true },
            color: 'red' as const,
        },
    ];

    const recentItems = [
        { id: 1, title: 'New Order #1234', time: '2 minutes ago', status: 'pending' },
        { id: 2, title: 'Payment Received', time: '15 minutes ago', status: 'success' },
        { id: 3, title: 'User Registration', time: '1 hour ago', status: 'info' },
        { id: 4, title: 'Support Ticket', time: '3 hours ago', status: 'warning' },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50 border-b border-white/5">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded-lg">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold tracking-tight">
                            Dashboard <span className="text-blue-600">Pro</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
                            <Settings className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                                JD
                            </div>
                            <span className="hidden md:inline">John Doe</span>
                        </div>
                        <button className="p-2 hover:bg-red-500/20 rounded-xl transition-colors text-slate-400 hover:text-red-400">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8">
                <div className="space-y-8 animate-fadeIn">
                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                        <div>
                            <h2 className="text-4xl font-serif font-bold text-slate-800">Overview</h2>
                            <p className="text-slate-500 font-medium">Welcome back, John!</p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95">
                            <Plus className="w-5 h-5" />
                            New Item
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <StatCard key={index} {...stat} />
                        ))}
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Activity */}
                        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-slate-800">Recent Activity</h3>
                                <button className="text-blue-600 font-bold text-sm hover:underline">
                                    View All
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'success'
                                                        ? 'bg-green-100 text-green-600'
                                                        : item.status === 'warning'
                                                            ? 'bg-amber-100 text-amber-600'
                                                            : item.status === 'info'
                                                                ? 'bg-blue-100 text-blue-600'
                                                                : 'bg-slate-200 text-slate-600'
                                                    }`}
                                            >
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{item.title}</div>
                                                <div className="text-sm text-slate-500">{item.time}</div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-6">
                            {/* Search */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">
                                    Quick Search
                                </h3>
                                <div className="relative">
                                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg">
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-90">
                                    This Month
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm opacity-90">New Users</span>
                                        <span className="font-bold text-lg">+156</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm opacity-90">Revenue</span>
                                        <span className="font-bold text-lg">$12,450</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm opacity-90">Orders</span>
                                        <span className="font-bold text-lg">89</span>
                                    </div>
                                </div>
                            </div>

                            {/* Help Card */}
                            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">
                                    Need Help?
                                </h3>
                                <p className="text-sm text-slate-500 mb-4">
                                    Check our documentation for guides and tutorials.
                                </p>
                                <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all">
                                    View Docs
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
