import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { employeeService } from '@/services/employeeService';
import { DocumentSection } from './DocumentSection';
import { AuditLogTab } from './AuditLogTab';
import {
    Loader2,
    User,
    Building,
    Mail,
    Phone,
    Calendar,
    DollarSign,
    BadgeCheck,
    Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmployeeDetailsProps {
    employeeId: string;
}

export function EmployeeDetails({ employeeId }: EmployeeDetailsProps) {
    const [activeTab, setActiveTab] = useState<'info' | 'documents' | 'activity'>('info');

    const { data: employee, isLoading } = useQuery({
        queryKey: ['employee', employeeId],
        queryFn: () => employeeService.getById(employeeId)
    });

    if (isLoading) {
        return (
            <div className="p-12 flex flex-col items-center justify-center gap-4 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin" />
                <p>Loading employee details...</p>
            </div>
        );
    }

    if (!employee) return <div>Employee not found.</div>;

    return (
        <div className="space-y-6">
            {/* Header Info */}
            <div className="flex items-start gap-6 pb-6 border-b">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                    <User className="w-10 h-10" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold">{employee.first_name} {employee.last_name}</h2>
                        <span className={cn(
                            "px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                            employee.status === 'active' ? "bg-green-100 text-green-700" :
                                employee.status === 'on_leave' ? "bg-amber-100 text-amber-700" :
                                    "bg-gray-100 text-gray-700"
                        )}>
                            {employee.status.replace('_', ' ')}
                        </span>
                    </div>
                    <p className="text-muted-foreground flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4 text-blue-500" />
                        {employee.position} • {employee.employee_id}
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b">
                <button
                    onClick={() => setActiveTab('info')}
                    className={cn(
                        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                        activeTab === 'info'
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>General Information</span>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('documents')}
                    className={cn(
                        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                        activeTab === 'documents'
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <BadgeCheck className="w-4 h-4" />
                        <span>Documents</span>
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('activity')}
                    className={cn(
                        "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                        activeTab === 'activity'
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4" />
                        <span>Activity</span>
                    </div>
                </button>
            </div>

            {/* Tab Content */}
            <div className="py-4">
                {activeTab === 'info' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Contact Details</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-muted-foreground" />
                                    <span>{employee.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="w-4 h-4 text-muted-foreground" />
                                    <span>{employee.phone || 'No phone provided'}</span>
                                </div>
                            </div>

                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground pt-4">Employment</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Building className="w-4 h-4 text-muted-foreground" />
                                    <span>{employee.department?.name || 'No department'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span>Hired on {new Date(employee.hire_date).toLocaleDateString()}</span>
                                </div>
                                {employee.salary && (
                                    <div className="flex items-center gap-3 text-sm font-medium text-green-700">
                                        <DollarSign className="w-4 h-4" />
                                        <span>${employee.salary.toLocaleString()} / month</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'documents' && (
                    <DocumentSection employeeId={employeeId} />
                )}

                {activeTab === 'activity' && (
                    <AuditLogTab entityType="employee" entityId={employeeId} />
                )}
            </div>
        </div>
    );
}
