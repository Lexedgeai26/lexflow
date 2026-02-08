import { prisma } from '../config/database';
import { logger } from '../config/logger';
import { AppError } from '../middleware/errorHandler';
import { Department, EmploymentStatus, Prisma } from '@prisma/client';

interface CreateEmployeeData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dateOfBirth?: Date;
    address?: string;
    employeeId: string;
    department: Department;
    position: string;
    hireDate: Date;
    salary?: number;
    currency?: string;
    managerId?: string;
    userId?: string;
    notes?: string;
}

interface UpdateEmployeeData {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    dateOfBirth?: Date;
    address?: string;
    department?: Department;
    position?: string;
    status?: EmploymentStatus;
    hireDate?: Date;
    terminationDate?: Date;
    salary?: number;
    currency?: string;
    managerId?: string;
    notes?: string;
}

export class EmployeeService {
    /**
     * Create a new employee
     */
    static async createEmployee(data: CreateEmployeeData) {
        // Check if employee ID already exists
        const existingEmployee = await prisma.employee.findFirst({
            where: {
                OR: [
                    { employeeId: data.employeeId },
                    { email: data.email }
                ]
            }
        });

        if (existingEmployee) {
            throw new AppError('Employee with this ID or email already exists', 409);
        }

        // If userId provided, check if user exists and doesn't already have an employee profile
        if (data.userId) {
            const user = await prisma.user.findUnique({
                where: { id: data.userId },
                include: { employee: true }
            });

            if (!user) {
                throw new AppError('User not found', 404);
            }

            if (user.employee) {
                throw new AppError('User already has an employee profile', 409);
            }
        }

        // Create employee
        const employee = await prisma.employee.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                dateOfBirth: data.dateOfBirth,
                address: data.address,
                employeeId: data.employeeId,
                department: data.department,
                position: data.position,
                hireDate: data.hireDate,
                salary: data.salary ? new Prisma.Decimal(data.salary) : undefined,
                currency: data.currency,
                managerId: data.managerId,
                userId: data.userId,
                notes: data.notes
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        role: true
                    }
                },
                manager: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        employeeId: true,
                        position: true
                    }
                }
            }
        });

        logger.info(`New employee created: ${employee.employeeId} - ${employee.firstName} ${employee.lastName}`);

        return employee;
    }

    /**
     * Get all employees with optional filters
     */
    static async getAllEmployees(filters?: {
        department?: Department;
        status?: EmploymentStatus;
        managerId?: string;
    }) {
        const where: any = {};

        if (filters?.department) {
            where.department = filters.department;
        }

        if (filters?.status) {
            where.status = filters.status;
        }

        if (filters?.managerId) {
            where.managerId = filters.managerId;
        }

        const employees = await prisma.employee.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        role: true
                    }
                },
                manager: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        employeeId: true,
                        position: true
                    }
                },
                _count: {
                    select: {
                        subordinates: true,
                        documents: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return employees;
    }

    /**
     * Get employee by ID
     */
    static async getEmployeeById(id: string) {
        const employee = await prisma.employee.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        role: true
                    }
                },
                manager: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        employeeId: true,
                        position: true,
                        department: true
                    }
                },
                subordinates: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        employeeId: true,
                        position: true,
                        department: true,
                        status: true
                    }
                },
                documents: {
                    include: {
                        document: {
                            select: {
                                id: true,
                                name: true,
                                mimeType: true,
                                size: true,
                                version: true,
                                createdAt: true
                            }
                        }
                    }
                }
            }
        });

        if (!employee) {
            throw new AppError('Employee not found', 404);
        }

        return employee;
    }

    /**
     * Update employee
     */
    static async updateEmployee(id: string, data: UpdateEmployeeData) {
        // Check if employee exists
        const existingEmployee = await prisma.employee.findUnique({
            where: { id }
        });

        if (!existingEmployee) {
            throw new AppError('Employee not found', 404);
        }

        // If email is being updated, check for conflicts
        if (data.email && data.email !== existingEmployee.email) {
            const emailConflict = await prisma.employee.findUnique({
                where: { email: data.email }
            });

            if (emailConflict) {
                throw new AppError('Email already in use by another employee', 409);
            }
        }

        const updateData: any = { ...data };

        // Convert salary to Decimal if provided
        if (data.salary !== undefined) {
            updateData.salary = new Prisma.Decimal(data.salary);
        }

        const employee = await prisma.employee.update({
            where: { id },
            data: updateData,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        role: true
                    }
                },
                manager: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        employeeId: true,
                        position: true
                    }
                }
            }
        });

        logger.info(`Employee updated: ${employee.employeeId} - ${employee.firstName} ${employee.lastName}`);

        return employee;
    }

    /**
     * Delete employee (soft delete by setting status to TERMINATED)
     */
    static async deleteEmployee(id: string) {
        const employee = await prisma.employee.findUnique({
            where: { id }
        });

        if (!employee) {
            throw new AppError('Employee not found', 404);
        }

        // Soft delete: set status to TERMINATED
        await prisma.employee.update({
            where: { id },
            data: {
                status: EmploymentStatus.TERMINATED,
                terminationDate: new Date()
            }
        });

        logger.info(`Employee terminated: ${employee.employeeId} - ${employee.firstName} ${employee.lastName}`);
    }

    /**
     * Permanently delete employee (hard delete)
     */
    static async permanentlyDeleteEmployee(id: string) {
        const employee = await prisma.employee.findUnique({
            where: { id }
        });

        if (!employee) {
            throw new AppError('Employee not found', 404);
        }

        await prisma.employee.delete({
            where: { id }
        });

        logger.info(`Employee permanently deleted: ${employee.employeeId} - ${employee.firstName} ${employee.lastName}`);
    }

    /**
     * Get employee by employee ID
     */
    static async getEmployeeByEmployeeId(employeeId: string) {
        const employee = await prisma.employee.findUnique({
            where: { employeeId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        role: true
                    }
                },
                manager: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        employeeId: true,
                        position: true
                    }
                }
            }
        });

        if (!employee) {
            throw new AppError('Employee not found', 404);
        }

        return employee;
    }
}
