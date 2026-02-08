import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { departmentService } from '@/services/departmentService';

const employeeSchema = z.object({
    first_name: z.string().min(2, 'First name is required'),
    last_name: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    employee_id: z.string().min(3, 'Employee ID is required'),
    phone: z.string().optional(),
    position: z.string().min(2, 'Position is required'),
    department_id: z.string().uuid('Department is required'),
    hire_date: z.string().min(1, 'Hire date is required'),
    salary: z.coerce.number().min(0, 'Salary must be positive').optional(),
    status: z.string().default('active'),
});

type EmployeeFormValues = z.infer<typeof employeeSchema>;

interface EmployeeFormProps {
    onSubmit: (values: EmployeeFormValues) => Promise<void>;
    isLoading?: boolean;
    initialData?: Partial<EmployeeFormValues>;
}

export function EmployeeForm({ onSubmit, isLoading, initialData }: EmployeeFormProps) {
    const { data: departments } = useQuery({
        queryKey: ['departments'],
        queryFn: departmentService.list
    });

    const { register, handleSubmit, formState: { errors } } = useForm<EmployeeFormValues>({
        resolver: zodResolver(employeeSchema),
        defaultValues: initialData || {
            status: 'active',
            hire_date: new Date().toISOString().split('T')[0],
        }
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input {...register('first_name')} placeholder="John" />
                    {errors.first_name && <p className="text-xs text-destructive">{errors.first_name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input {...register('last_name')} placeholder="Doe" />
                    {errors.last_name && <p className="text-xs text-destructive">{errors.last_name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input type="email" {...register('email')} placeholder="john.doe@company.com" />
                    {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Employee ID</label>
                    <Input {...register('employee_id')} placeholder="EMP-100" />
                    {errors.employee_id && <p className="text-xs text-destructive">{errors.employee_id.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <select
                        {...register('department_id')}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        <option value="">Select Department</option>
                        {departments?.map(dept => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                    </select>
                    {errors.department_id && <p className="text-xs text-destructive">{errors.department_id.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <Input {...register('position')} placeholder="Software Engineer" />
                    {errors.position && <p className="text-xs text-destructive">{errors.position.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Hire Date</label>
                    <Input type="date" {...register('hire_date')} />
                    {errors.hire_date && <p className="text-xs text-destructive">{errors.hire_date.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Monthly Salary</label>
                    <Input type="number" {...register('salary')} placeholder="5000" />
                    {errors.salary && <p className="text-xs text-destructive">{errors.salary.message}</p>}
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="submit" disabled={isLoading} className="w-full md:w-fit min-w-[120px]">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Employee'}
                </Button>
            </div>
        </form>
    );
}
