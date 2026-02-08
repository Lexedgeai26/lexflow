import { Request, Response } from 'express';
import { EmployeeService } from '../services/EmployeeService';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { Department, EmploymentStatus, UserRole } from '@prisma/client';

/**
 * Create a new employee
 */
export const createEmployee = asyncHandler(async (req: Request, res: Response) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        address,
        employeeId,
        department,
        position,
        hireDate,
        salary,
        currency,
        managerId,
        userId,
        notes
    } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !employeeId || !department || !position || !hireDate) {
        res.status(400).json({
            error: 'Missing required fields: firstName, lastName, email, employeeId, department, position, hireDate'
        });
        return;
    }

    const employee = await EmployeeService.createEmployee({
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        address,
        employeeId,
        department,
        position,
        hireDate: new Date(hireDate),
        salary,
        currency,
        managerId,
        userId,
        notes
    });

    res.status(201).json({
        message: 'Employee created successfully',
        employee
    });
});

/**
 * Get all employees
 */
export const getAllEmployees = asyncHandler(async (req: Request, res: Response) => {
    const { department, status, managerId } = req.query;

    const filters: any = {};

    if (department) {
        filters.department = department as Department;
    }

    if (status) {
        filters.status = status as EmploymentStatus;
    }

    if (managerId) {
        filters.managerId = managerId as string;
    }

    const employees = await EmployeeService.getAllEmployees(filters);

    res.status(200).json({
        count: employees.length,
        employees
    });
});

/**
 * Get employee by ID
 */
export const getEmployeeById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const employee = await EmployeeService.getEmployeeById(id);

    res.status(200).json({
        employee
    });
});

/**
 * Get employee by employee ID
 */
export const getEmployeeByEmployeeId = asyncHandler(async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    const employee = await EmployeeService.getEmployeeByEmployeeId(employeeId);

    res.status(200).json({
        employee
    });
});

/**
 * Update employee
 */
export const updateEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth,
        address,
        department,
        position,
        status,
        hireDate,
        terminationDate,
        salary,
        currency,
        managerId,
        notes
    } = req.body;

    // Only admins can update salary and status
    if ((salary !== undefined || status !== undefined) && req.user?.role !== UserRole.ADMIN) {
        throw new AppError('Only admins can update salary and employment status', 403);
    }

    const updateData: any = {};

    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (email) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
    if (address !== undefined) updateData.address = address;
    if (department) updateData.department = department;
    if (position) updateData.position = position;
    if (status) updateData.status = status;
    if (hireDate) updateData.hireDate = new Date(hireDate);
    if (terminationDate) updateData.terminationDate = new Date(terminationDate);
    if (salary !== undefined) updateData.salary = salary;
    if (currency) updateData.currency = currency;
    if (managerId !== undefined) updateData.managerId = managerId;
    if (notes !== undefined) updateData.notes = notes;

    const employee = await EmployeeService.updateEmployee(id, updateData);

    res.status(200).json({
        message: 'Employee updated successfully',
        employee
    });
});

/**
 * Delete employee (soft delete)
 */
export const deleteEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await EmployeeService.deleteEmployee(id);

    res.status(200).json({
        message: 'Employee terminated successfully'
    });
});

/**
 * Permanently delete employee (hard delete - Admin only)
 */
export const permanentlyDeleteEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await EmployeeService.permanentlyDeleteEmployee(id);

    res.status(200).json({
        message: 'Employee permanently deleted'
    });
});
