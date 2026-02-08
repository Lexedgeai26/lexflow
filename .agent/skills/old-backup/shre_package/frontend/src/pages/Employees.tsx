import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    Plus,
    Search,
    Mail,
    Phone,
    Building2,
    Briefcase,
    ExternalLink,
    Edit,
    Trash2,
    Users
} from 'lucide-react';
import api from '../services/api';
import MainLayout from '../components/layout/MainLayout';
import { Department, EmploymentStatus, type Employee } from '../types';
import { format } from 'date-fns';
import { cn } from '../utils/cn';
import AddEmployeeModal from '../components/common/AddEmployeeModal';

const Employees: React.FC = () => {
    const queryClient = useQueryClient();
    const [searchTerm, setSearchTerm] = useState('');
    const [deptFilter, setDeptFilter] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['employees', searchTerm, deptFilter, statusFilter],
        queryFn: () => {
            let url = '/employees?';
            if (searchTerm) url += `search=${searchTerm}&`;
            if (deptFilter) url += `department=${deptFilter}&`;
            if (statusFilter) url += `status=${statusFilter}&`;
            return api.get(url).then(res => res.data);
        }
    });

    const createEmployee = useMutation({
        mutationFn: (data: any) => api.post('/employees', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            setIsModalOpen(false);
        }
    });

    const deleteEmployee = useMutation({
        mutationFn: (id: string) => api.delete(`/employees/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        }
    });

    const employees = data?.employees || [];

    return (
        <MainLayout>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-neutral-900">Employees</h1>
                        <p className="text-neutral-500 mt-1">Manage your team members and their profiles</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center space-x-2 px-5 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-primary-100 group"
                    >
                        <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                        <span>Add New Employee</span>
                    </button>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email or ID..."
                            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-hidden transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <select
                            className="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium outline-hidden focus:ring-2 focus:ring-primary-500"
                            value={deptFilter}
                            onChange={(e) => setDeptFilter(e.target.value)}
                        >
                            <option value="">All Departments</option>
                            {Object.values(Department).map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>

                        <select
                            className="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm font-medium outline-hidden focus:ring-2 focus:ring-primary-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="">All Statuses</option>
                            {Object.values(EmploymentStatus).map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Employee</th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Organization</th>
                                    <th className="px-6 py-4">Hire Date</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={6} className="px-6 py-8 h-16 bg-neutral-50/20" />
                                        </tr>
                                    ))
                                ) : employees.map((emp: Employee) => (
                                    <tr key={emp.id} className="hover:bg-neutral-50/50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold">
                                                    {emp.firstName[0]}{emp.lastName[0]}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                                        {emp.firstName} {emp.lastName}
                                                    </p>
                                                    <p className="text-xs text-neutral-400">ID: {emp.employeeId}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs text-neutral-500 space-x-2">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    <span>{emp.email}</span>
                                                </div>
                                                {emp.phone && (
                                                    <div className="flex items-center text-xs text-neutral-500 space-x-2">
                                                        <Phone className="w-3.5 h-3.5" />
                                                        <span>{emp.phone}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-xs text-neutral-700 font-medium space-x-2">
                                                    <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                                                    <span>{emp.department}</span>
                                                </div>
                                                <div className="flex items-center text-xs text-neutral-500 space-x-2">
                                                    <Briefcase className="w-3.5 h-3.5 text-neutral-400" />
                                                    <span>{emp.position}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-neutral-600">
                                            {format(new Date(emp.hireDate), 'MMM dd, yyyy')}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={cn(
                                                "px-2.5 py-1 rounded-full text-xs font-bold uppercase",
                                                emp.status === 'ACTIVE' ? "bg-emerald-50 text-emerald-700" :
                                                    emp.status === 'TERMINATED' ? "bg-red-50 text-red-700" :
                                                        "bg-amber-50 text-amber-700"
                                            )}>
                                                {emp.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary-600 transition-colors tooltip" title="Edit Profile">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (confirm('Are you sure you want to delete this employee?')) {
                                                            deleteEmployee.mutate(emp.id);
                                                        }
                                                    }}
                                                    className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-red-600 transition-colors tooltip" title="Delete Employee"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-neutral-900 transition-colors">
                                                    <ExternalLink className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {!isLoading && employees.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center justify-center space-y-3">
                                                <div className="bg-neutral-50 p-4 rounded-full">
                                                    <Users className="w-10 h-10 text-neutral-300" />
                                                </div>
                                                <p className="text-neutral-500 font-medium">No employees found matching your criteria</p>
                                                <button
                                                    onClick={() => { setSearchTerm(''); setDeptFilter(''); setStatusFilter(''); }}
                                                    className="text-primary-600 text-sm font-bold hover:underline"
                                                >
                                                    Clear all filters
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-6 bg-neutral-50/50 border-t border-neutral-100 flex items-center justify-between">
                        <p className="text-sm text-neutral-500">
                            Showing <span className="font-semibold text-neutral-900">{employees.length}</span> team members
                        </p>
                        <div className="flex space-x-2">
                            <button disabled className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium disabled:opacity-50">Previous</button>
                            <button disabled className="px-4 py-2 border border-neutral-200 rounded-lg text-sm font-medium disabled:opacity-50">Next</button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <AddEmployeeModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={(data) => createEmployee.mutate(data)}
                    loading={createEmployee.isPending}
                />
            )}
        </MainLayout>
    );
};

export default Employees;
