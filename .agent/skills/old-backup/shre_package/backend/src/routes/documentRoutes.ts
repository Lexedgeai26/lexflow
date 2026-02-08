import { Router } from 'express';
import {
    uploadDocument,
    getMyDocuments,
    getAllDocuments,
    getDocumentById,
    downloadDocument,
    deleteDocument,
    attachDocumentToEmployee,
    getEmployeeDocuments,
    detachDocumentFromEmployee,
    getDocumentVersions
} from '../controllers/documentController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { UserRole } from '@prisma/client';

const router = Router();

// All document routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/v1/documents/upload
 * @desc    Upload a document
 * @access  Authenticated users
 */
router.post('/upload', uploadDocument);

/**
 * @route   GET /api/v1/documents/my
 * @desc    Get all documents for current user
 * @access  Authenticated users
 */
router.get('/my', getMyDocuments);

/**
 * @route   GET /api/v1/documents/versions
 * @desc    Get all versions of a document by name
 * @access  Authenticated users
 * @query   name (required)
 */
router.get('/versions', getDocumentVersions);

/**
 * @route   GET /api/v1/documents
 * @desc    Get all documents (Admin only)
 * @access  Admin only
 */
router.get('/', authorize(UserRole.ADMIN), getAllDocuments);

/**
 * @route   GET /api/v1/documents/:id
 * @desc    Get document by ID
 * @access  Authenticated users (own documents) or Admin (any document)
 */
router.get('/:id', getDocumentById);

/**
 * @route   GET /api/v1/documents/:id/download
 * @desc    Download document
 * @access  Authenticated users (own documents) or Admin (any document)
 */
router.get('/:id/download', downloadDocument);

/**
 * @route   DELETE /api/v1/documents/:id
 * @desc    Delete document
 * @access  Authenticated users (own documents) or Admin (any document)
 */
router.delete('/:id', deleteDocument);

/**
 * @route   POST /api/v1/documents/attach
 * @desc    Attach document to employee
 * @access  Admin only
 */
router.post('/attach', authorize(UserRole.ADMIN), attachDocumentToEmployee);

/**
 * @route   GET /api/v1/documents/employee/:employeeId
 * @desc    Get all documents for an employee
 * @access  Authenticated users
 */
router.get('/employee/:employeeId', getEmployeeDocuments);

/**
 * @route   DELETE /api/v1/documents/employee/:employeeId/:documentId
 * @desc    Detach document from employee
 * @access  Admin only
 */
router.delete('/employee/:employeeId/:documentId', authorize(UserRole.ADMIN), detachDocumentFromEmployee);

export default router;
