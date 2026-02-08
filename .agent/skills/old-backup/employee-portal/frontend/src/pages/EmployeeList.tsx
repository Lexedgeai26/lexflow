import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeService } from '@/services/employeeService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { EmployeeForm } from '@/components/EmployeeForm';
import { EmployeeDetails } from '@/components/EmployeeDetails';
import { useRole } from '@/hooks/useRole';
import {
    Plus,
    Search,
    Filter,
    MoreVertical,
    FileText,
    Pencil,
    Trash2,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EmployeeList() {
    const queryClient = useQueryClient();
    const { canManage, canDelete } = useRole();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [deptFilter, setDeptFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    // Dialog states
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<any | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

    const { data: employeesData, isLoading } = useQuery({
        queryKey: ['employees', page, search, deptFilter, statusFilter],
        queryFn: () => employeeService.list({ page, search, department_id: deptFilter, status: statusFilter })
    });

    const createMutation = useMutation({
        mutationFn: employeeService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            setIsAddDialogOpen(false);
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => employeeService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            setEditingEmployee(null);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: employeeService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
        }
    });

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to archive this employee?')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-display">Employees</h2>
                    <p className="text-muted-foreground">Manage your workforce, positions, and details.</p>
                </div>
                {canManage && (
                    <Button className="w-fit shadow-lg shadow-primary/20" onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add Employee
                    </Button>
                )}
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-xl border shadow-sm">
                <div className="relative col-span-1 md:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search employees..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="on_leave">On Leave</option>
                    <option value="terminated">Terminated</option>
                </select>
                <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="w-4 h-4" /> More Filters
                </Button>
            </div>

            {/* Table */}
            <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-50/50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {isLoading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="animate-pulse">
                                        <td colSpan={5} className="px-6 py-4 h-16 bg-gray-50/30" />
                                    </tr>
                                ))
                            ) : employeesData?.data?.map((emp: any) => (
                                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs border border-blue-200">
                                                {emp.first_name[0]}{emp.last_name[0]}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{emp.first_name} {emp.last_name}</p>
                                                <p className="text-xs text-muted-foreground">{emp.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-600 px-2 py-1 bg-gray-100 rounded-md">
                                            {emp.department?.name || 'Unassigned'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                                            emp.status === 'active' ? "bg-green-100 text-green-700" :
                                                emp.status === 'on_leave' ? "bg-amber-100 text-amber-700" :
                                                    "bg-gray-100 text-gray-700"
                                        )}>
                                            {emp.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {emp.position}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={() => setSelectedEmployeeId(emp.id)}
                                                title="View Details"
                                            >
                                                <FileText className="w-4 h-4" />
                                            </Button>
                                            {canManage && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                                    onClick={() => setEditingEmployee(emp)}
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Button>
                                            )}
                                            {canDelete && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => handleDelete(emp.id)}
                                                    title="Archive"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                        {!canManage && (
                                            <div className="group-hover:hidden">
                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedEmployeeId(emp.id)}>
                                                    <FileText className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                        {canManage && (
                                            <div className="group-hover:hidden">
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Dialog */}
            <Dialog
                isOpen={isAddDialogOpen}
                onClose={() => setIsAddDialogOpen(false)}
                title="Add New Employee"
                description="Enter the details of the new employee to add them to the system."
            >
                <EmployeeForm
                    onSubmit={async (values) => {
                        await createMutation.mutateAsync(values);
                    }}
                    isLoading={createMutation.isPending}
                />
            </Dialog>

            {/* Edit Dialog */}
            <Dialog
                isOpen={!!editingEmployee}
                onClose={() => setEditingEmployee(null)}
                title="Edit Employee"
                description={`Updating information for ${editingEmployee?.first_name} ${editingEmployee?.last_name}`}
            >
                {editingEmployee && (
                    <EmployeeForm
                        initialData={{
                            ...editingEmployee,
                            hire_date: editingEmployee.hire_date.split('T')[0]
                        }}
                        onSubmit={async (values) => {
                            await updateMutation.mutateAsync({ id: editingEmployee.id, data: values });
                        }}
                        isLoading={updateMutation.isPending}
                    />
                )}
            </Dialog>

            {/* View Details Dialog */}
            <Dialog
                isOpen={!!selectedEmployeeId}
                onClose={() => setSelectedEmployeeId(null)}
                title="Employee Profile"
            >
                {selectedEmployeeId && (
                    <EmployeeDetails employeeId={selectedEmployeeId} />
                )}
            </Dialog>
        </div>
    );
}
