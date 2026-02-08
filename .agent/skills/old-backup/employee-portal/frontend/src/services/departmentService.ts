import api from './api';

export interface Department {
    id: string;
    name: string;
    description?: string;
    employee_count?: number;
}

export const departmentService = {
    list: async () => {
        const { data } = await api.get<Department[]>('/departments/');
        return data;
    },

    create: async (dept: any) => {
        const { data } = await api.post<Department>('/departments/', dept);
        return data;
    },

    update: async (id: string, dept: any) => {
        const { data } = await api.patch<Department>(`/departments/${id}`, dept);
        return data;
    },

    delete: async (id: string) => {
        await api.delete(`/departments/${id}`);
    }
};
