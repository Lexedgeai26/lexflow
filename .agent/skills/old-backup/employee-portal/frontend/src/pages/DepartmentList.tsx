import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { departmentService } from '@/services/departmentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog } from '@/components/ui/dialog';
import { useRole } from '@/hooks/useRole';
import {
    Plus,
    Building2,
    Users,
    Loader2,
    Pencil,
    Trash2,
    ArrowRight
} from 'lucide-react';

export default function DepartmentList() {
    const queryClient = useQueryClient();
    const { canManage, canDelete } = useRole();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingDept, setEditingDept] = useState<any | null>(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const { data: departments, isLoading } = useQuery({
        queryKey: ['departments'],
        queryFn: departmentService.list
    });

    const createMutation = useMutation({
        mutationFn: departmentService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
            setIsAddDialogOpen(false);
            resetForm();
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => departmentService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
            setEditingDept(null);
            resetForm();
        }
    });

    const deleteMutation = useMutation({
        mutationFn: departmentService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['departments'] });
        }
    });

    const resetForm = () => {
        setName('');
        setDescription('');
    };

    const handleEdit = (dept: any) => {
        setEditingDept(dept);
        setName(dept.name);
        setDescription(dept.description || '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        if (editingDept) {
            await updateMutation.mutateAsync({ id: editingDept.id, data: { name, description } });
        } else {
            await createMutation.mutateAsync({ name, description });
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this department? This might affect assigned employees.')) {
            await deleteMutation.mutateAsync(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 font-display">Departments</h2>
                    <p className="text-muted-foreground">Manage organizational structure and resource allocation.</p>
                </div>
                {canManage && (
                    <Button className="w-fit shadow-lg shadow-primary/20" onClick={() => { resetForm(); setIsAddDialogOpen(true); }}>
                        <Plus className="mr-2 h-4 w-4" /> Add Department
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    [...Array(3)].map((_, i) => (
                        <div key={i} className="h-48 bg-white border rounded-2xl animate-pulse" />
                    ))
                ) : departments?.length === 0 ? (
                    <div className="col-span-full p-16 bg-white border border-dashed rounded-3xl text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-8 h-8 text-muted-foreground opacity-20" />
                        </div>
                        <h3 className="text-lg font-semibold mb-1">No Departments</h3>
                        <p className="text-muted-foreground mb-6">Create your first department to start organizing your team.</p>
                        {canManage && (
                            <Button variant="outline" onClick={() => setIsAddDialogOpen(true)}>Create Department</Button>
                        )}
                    </div>
                ) : (
                    departments?.map((dept) => (
                        <div key={dept.id} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

                            <div className="flex items-start justify-between mb-6 relative">
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                                    <Building2 className="w-7 h-7" />
                                </div>
                                <div className="flex gap-1">
                                    {canManage && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                                            onClick={() => handleEdit(dept)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                    )}
                                    {canDelete && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(dept.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{dept.name}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-6 h-10 leading-relaxed">
                                {dept.description || 'Dedicated to excellence and innovation within the organization.'}
                            </p>

                            <div className="flex items-center justify-between pt-5 border-t relative">
                                <div className="flex items-center gap-2 group/stat">
                                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border group-hover/stat:bg-blue-50 group-hover/stat:border-blue-200 transition-colors">
                                        <Users className="w-4 h-4 text-muted-foreground group-hover/stat:text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground leading-none mb-1">Team Size</p>
                                        <span className="text-sm font-bold text-gray-900">{dept.employee_count || 0} Members</span>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" className="group/btn text-primary p-0 h-auto hover:bg-transparent">
                                    <span className="mr-1">Details</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Form Dialog (Handles both Add and Edit) */}
            <Dialog
                isOpen={isAddDialogOpen || !!editingDept}
                onClose={() => { setIsAddDialogOpen(false); setEditingDept(null); }}
                title={editingDept ? "Edit Department" : "Create Department"}
                description={editingDept ? `Updating details for ${editingDept.name}` : "Add a new organizational unit to your company."}
            >
                <form onSubmit={handleSubmit} className="space-y-5 pt-2">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Department Name</label>
                        <Input
                            placeholder="e.g. Engineering"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50/50 focus:bg-white"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            className="flex min-h-[120px] w-full rounded-xl border border-input bg-gray-50/50 focus:bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
                            placeholder="Brief description of the department's role and responsibilities..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t mt-4">
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={() => { setIsAddDialogOpen(false); setEditingDept(null); }}
                            className="w-full md:w-fit"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={createMutation.isPending || updateMutation.isPending}
                            className="w-full md:w-fit min-w-[140px] shadow-lg shadow-primary/20"
                        >
                            {createMutation.isPending || updateMutation.isPending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                editingDept ? 'Update Details' : 'Create Department'
                            )}
                        </Button>
                    </div>
                </form>
            </Dialog>
        </div>
    );
}
