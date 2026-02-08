import { useQuery } from '@tanstack/react-query';
import { employeeService } from '@/services/employeeService';
import { departmentService } from '@/services/departmentService';
import {
    Users,
    Building2,
    FileCheck,
    TrendingUp,
    UserPlus,
    Clock,
    Activity
} from 'lucide-react';
import { auditLogService } from '@/services/auditLogService';
import { formatDistanceToNow } from 'date-fns';

export default function Dashboard() {
    const { data: employees } = useQuery({
        queryKey: ['employees', 'summary'],
        queryFn: () => employeeService.list({ limit: 100 })
    });

    const { data: departments } = useQuery({
        queryKey: ['departments'],
        queryFn: departmentService.list
    });

    const { data: recentLogs } = useQuery({
        queryKey: ['audit-logs', 'recent'],
        queryFn: () => auditLogService.list({ limit: 6 })
    });

    const stats = [
        {
            label: 'Total Employees',
            value: employees?.total || 0,
            icon: Users,
            color: 'bg-blue-500',
            trend: '+12% from last month'
        },
        {
            label: 'Departments',
            value: departments?.length || 0,
            icon: Building2,
            color: 'bg-purple-500',
            trend: 'Across all units'
        },
        {
            label: 'Active Personnel',
            value: employees?.data.filter((e: any) => e.status === 'active').length || 0,
            icon: UserPlus,
            color: 'bg-green-500',
            trend: 'Currently on duty'
        },
        {
            label: 'Compliance rate',
            value: '98%',
            icon: FileCheck,
            color: 'bg-amber-500',
            trend: 'Documents verified'
        },
    ];

    const recentEmployees = employees?.data.slice(0, 5) || [];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground">Overview of your company's workforce and operations.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-2.5 rounded-xl ${stat.color} text-white shadow-lg`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                        </div>
                        <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {stat.trend}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border shadow-sm">
                    <div className="p-6 border-b flex items-center justify-between">
                        <h3 className="text-lg font-bold">Recent Hires</h3>
                        <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="divide-y">
                        {recentEmployees.map((emp: any) => (
                            <div key={emp.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs uppercase">
                                        {emp.first_name[0]}{emp.last_name[0]}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-semibold text-sm truncate">{emp.first_name} {emp.last_name}</p>
                                        <p className="text-xs text-muted-foreground truncate">{emp.position}</p>
                                    </div>
                                </div>
                                <div className="text-[10px] text-muted-foreground bg-gray-50 px-2 py-1 rounded border">
                                    {new Date(emp.hire_date).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border shadow-sm col-span-1">
                    <div className="p-6 border-b flex items-center justify-between">
                        <h3 className="text-lg font-bold">System Activity</h3>
                        <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <div className="divide-y h-[360px] overflow-y-auto">
                        {recentLogs?.map((log: any) => (
                            <div key={log.id} className="p-4 flex gap-3 hover:bg-gray-50 transition-colors">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-900 leading-tight">
                                        <span className="capitalize">{log.action}</span> {log.entity_type}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground mt-1">
                                        {formatDistanceToNow(new Date(log.created_at), { addSuffix: true })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {(!recentLogs || recentLogs.length === 0) && (
                            <div className="p-8 text-center text-muted-foreground text-xs">No recent activity.</div>
                        )}
                    </div>
                </div>

                {/* Quick Actions / Department Breakdown */}
                <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
                    <div className="p-6 border-b bg-gray-50/50">
                        <h3 className="text-lg font-bold">Departments</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        {departments?.map((dept: any) => (
                            <div key={dept.id} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{dept.name}</span>
                                    <span className="text-muted-foreground">{dept.employee_count || 0}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-500"
                                        style={{ width: `${Math.min((dept.employee_count || 0) * 10, 100)}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                        {(!departments || departments.length === 0) && (
                            <p className="text-sm text-center text-muted-foreground">No departments configured.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
