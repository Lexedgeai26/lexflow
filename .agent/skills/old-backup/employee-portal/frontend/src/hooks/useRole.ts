import { useAuthStore } from '@/store/authStore';

export const useRole = () => {
    const user = useAuthStore((state) => state.user);

    const isAdmin = user?.role === 'admin';
    const isManager = user?.role === 'manager';
    const isEmployee = user?.role === 'employee';

    const canManage = isAdmin || isManager;
    const canDelete = isAdmin; // Only admins can delete

    return {
        role: user?.role,
        isAdmin,
        isManager,
        isEmployee,
        canManage,
        canDelete
    };
};
