import { Router } from 'express';
import {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    getEmployeeByEmployeeId,
    updateEmployee,
    deleteEmployee,
    permanentlyDeleteEmployee
} from '../controllers/employeeController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { UserRole } from '@prisma/client';

const router = Router();

// All employee routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/v1/employees
 * @desc    Create a new employee
 * @access  Admin only
 */
router.post('/', authorize(UserRole.ADMIN), createEmployee);

/**
 * @route   GET /api/v1/employees
 * @desc    Get all employees (with optional filters)
 * @access  Authenticated users
 * @query   department, status, managerId
 */
router.get('/', getAllEmployees);

/**
 * @route   GET /api/v1/employees/:id
 * @desc    Get employee by UUID
 * @access  Authenticated users
 */
router.get('/:id', getEmployeeById);

/**
 * @route   GET /api/v1/employees/emp/:employeeId
 * @desc    Get employee by employee ID
 * @access  Authenticated users
 */
router.get('/emp/:employeeId', getEmployeeByEmployeeId);

/**
 * @route   PUT /api/v1/employees/:id
 * @desc    Update employee
 * @access  Admin only (salary/status updates), Authenticated users (other fields)
 */
router.put('/:id', updateEmployee);

/**
 * @route   DELETE /api/v1/employees/:id
 * @desc    Soft delete employee (set status to TERMINATED)
 * @access  Admin only
 */
router.delete('/:id', authorize(UserRole.ADMIN), deleteEmployee);

/**
 * @route   DELETE /api/v1/employees/:id/permanent
 * @desc    Permanently delete employee (hard delete)
 * @access  Admin only
 */
router.delete('/:id/permanent', authorize(UserRole.ADMIN), permanentlyDeleteEmployee);

export default router;
