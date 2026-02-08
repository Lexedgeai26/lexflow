import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    Users,
    FileText,
    UserCheck,
    Activity,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import api from '../services/api';
import MainLayout from '../components/layout/MainLayout';

const Dashboard: React.FC = () => {
    const { data: employees } = useQuery({
        queryKey: ['employees'],
        queryFn: () => api.get('/employees').then(res => res.data)
    });

    const { data: documents } = useQuery({
        queryKey: ['documents'],
        queryFn: () => api.get('/documents').then(res => res.data)
    });

    const stats = [
        { label: 'Total Employees', value: employees?.count || 0, icon: Users, trend: '+12%', color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Active Documents', value: documents?.count || 0, icon: FileText, trend: '+3%', color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Retention Rate', value: '98%', icon: UserCheck, trend: '+2%', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Daily Activity', value: '154', icon: Activity, trend: '-5%', color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <MainLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
                    <p className="text-neutral-500 mt-1">Overview of your enterprise employee ecosystem</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl transition-transform group-hover:scale-110`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center space-x-1 text-sm font-medium ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                                    <span>{stat.trend}</span>
                                    {stat.trend.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                </div>
                            </div>
                            <p className="text-neutral-500 text-sm font-medium">{stat.label}</p>
                            <h2 className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</h2>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                            <h3 className="font-bold text-lg">Recent Employees</h3>
                            <button className="text-primary-600 text-sm font-semibold hover:underline">View all</button>
                        </div>
                        <div className="p-0">
                            <table className="w-full text-left">
                                <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider font-semibold">
                                    <tr>
                                        <th className="px-6 py-4">Employee</th>
                                        <th className="px-6 py-4">Department</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100">
                                    {employees?.employees?.slice(0, 5).map((emp: any) => (
                                        <tr key={emp.id} className="hover:bg-neutral-50/50 transition-colors cursor-pointer group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                                                        {emp.firstName[0]}{emp.lastName[0]}
                                                    </div>
                                                    <span className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors">
                                                        {emp.firstName} {emp.lastName}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-600">{emp.department}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 uppercase">
                                                    {emp.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                    {(!employees?.employees || employees.employees.length === 0) && (
                                        <tr>
                                            <td colSpan={3} className="px-6 py-10 text-center text-neutral-400">
                                                No recent activity found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-primary-950 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">Platform Security</h3>
                            <p className="text-primary-300 text-sm mb-6 leading-relaxed">
                                All documents are encrypted with AES-256 and stored securely in AWS S3 with restricted access controls.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Secure Document Versioning',
                                    'Role-Based Data Masking',
                                    'End-to-End Encryption',
                                    'Audit Logging Active'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center space-x-3 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="mt-8 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold transition-colors border border-white/10">
                                View Security Audit
                            </button>
                        </div>
                        {/* Abstract background elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600 blur-[80px] opacity-20" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400 blur-[100px] opacity-10" />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Dashboard;
