export enum UserRole {
    ADMIN = 'ADMIN',
    HR = 'HR',
    EMPLOYEE = 'EMPLOYEE',
}

export interface User {
    id: string;
    username: string;
    email: string;
    role: UserRole;
}

export enum EmploymentStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    ON_LEAVE = 'ON_LEAVE',
    TERMINATED = 'TERMINATED',
}

export enum Department {
    ENGINEERING = 'ENGINEERING',
    HR = 'HR',
    FINANCE = 'FINANCE',
    MARKETING = 'MARKETING',
    SALES = 'SALES',
    OPERATIONS = 'OPERATIONS',
    IT = 'IT',
    LEGAL = 'LEGAL',
    ADMIN = 'ADMIN',
}

export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    employeeId: string;
    department: Department;
    position: string;
    status: EmploymentStatus;
    hireDate: string;
    salary?: number;
    currency?: string;
    managerId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Document {
    id: string;
    name: string;
    mimeType: string;
    size: number;
    version: number;
    createdAt: string;
    userId: string;
}
