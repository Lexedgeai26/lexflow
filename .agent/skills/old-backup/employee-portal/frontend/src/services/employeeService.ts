import api from './api';

export interface Employee {
    id: string;
    employee_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    position?: string;
    department_id?: string;
    department?: {
        id: string;
        name: string;
    };
    hire_date: string;
    status: string;
    salary?: number;
}

export interface EmployeeListResponse {
    data: Employee[];
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export const employeeService = {
    list: async (params: any) => {
        // Clean up parameters: remove empty strings, nulls, undefined
        const cleanParams = Object.keys(params).reduce((acc: any, key) => {
            const value = params[key];
            if (value !== '' && value !== null && value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {});

        const { data } = await api.get<EmployeeListResponse>('/employees/', { params: cleanParams });
        return data;
    },

    getById: async (id: string) => {
        const { data } = await api.get<Employee>(`/employees/${id}`);
        return data;
    },

    create: async (employee: any) => {
        const { data } = await api.post<Employee>('/employees/', employee);
        return data;
    },

    update: async (id: string, employee: any) => {
        const { data } = await api.patch<Employee>(`/employees/${id}`, employee);
        return data;
    },

    delete: async (id: string) => {
        await api.delete(`/employees/${id}`);
    }
};
