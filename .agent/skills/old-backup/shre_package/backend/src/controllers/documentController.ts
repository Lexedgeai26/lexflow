import { Request, Response } from 'express';
import { DocumentService } from '../services/DocumentService';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { UserRole } from '@prisma/client';
import multer from 'multer';

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});

/**
 * Upload a document
 */
export const uploadDocument = [
    upload.single('file'),
    asyncHandler(async (req: Request, res: Response) => {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        if (!req.user) {
            throw new AppError('User not authenticated', 401);
        }

        const document = await DocumentService.uploadDocument({
            userId: req.user.id,
            name: req.file.originalname,
            content: req.file.buffer,
            mimeType: req.file.mimetype,
            size: req.file.size
        });

        // Remove content from response (too large)
        const { content, ...documentWithoutContent } = document as any;

        res.status(201).json({
            message: 'Document uploaded successfully',
            document: documentWithoutContent
        });
    })
];

/**
 * Get all documents for current user
 */
export const getMyDocuments = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new AppError('User not authenticated', 401);
    }

    const documents = await DocumentService.getDocumentsByUserId(req.user.id);

    // Remove content from response
    const documentsWithoutContent = documents.map(({ content, ...doc }) => doc);

    res.status(200).json({
        count: documents.length,
        documents: documentsWithoutContent
    });
});

/**
 * Get all documents (Admin only)
 */
export const getAllDocuments = asyncHandler(async (req: Request, res: Response) => {
    const documents = await DocumentService.getAllDocuments();

    // Remove content from response
    const documentsWithoutContent = documents.map(({ content, ...doc }) => doc);

    res.status(200).json({
        count: documents.length,
        documents: documentsWithoutContent
    });
});

/**
 * Get document by ID
 */
export const getDocumentById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Admins can access any document, users can only access their own
    const userId = req.user?.role === UserRole.ADMIN ? undefined : req.user?.id;

    const document = await DocumentService.getDocumentById(id, userId);

    // Remove content from response
    const { content, ...documentWithoutContent } = document as any;

    res.status(200).json({
        document: documentWithoutContent
    });
});

/**
 * Download document
 */
export const downloadDocument = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Admins can download any document, users can only download their own
    const userId = req.user?.role === UserRole.ADMIN ? undefined : req.user?.id;

    const { content, name, mimeType } = await DocumentService.downloadDocument(id, userId);

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.send(content);
});

/**
 * Delete document
 */
export const deleteDocument = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Admins can delete any document, users can only delete their own
    const userId = req.user?.role === UserRole.ADMIN ? undefined : req.user?.id;

    await DocumentService.deleteDocument(id, userId);

    res.status(200).json({
        message: 'Document deleted successfully'
    });
});

/**
 * Attach document to employee
 */
export const attachDocumentToEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, documentId, category, description } = req.body;

    if (!employeeId || !documentId || !category) {
        res.status(400).json({
            error: 'Missing required fields: employeeId, documentId, category'
        });
        return;
    }

    const employeeDocument = await DocumentService.attachDocumentToEmployee({
        employeeId,
        documentId,
        category,
        description
    });

    res.status(201).json({
        message: 'Document attached to employee successfully',
        employeeDocument
    });
});

/**
 * Get documents for an employee
 */
export const getEmployeeDocuments = asyncHandler(async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    const documents = await DocumentService.getEmployeeDocuments(employeeId);

    res.status(200).json({
        count: documents.length,
        documents
    });
});

/**
 * Detach document from employee
 */
export const detachDocumentFromEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { employeeId, documentId } = req.params;

    await DocumentService.detachDocumentFromEmployee(employeeId, documentId);

    res.status(200).json({
        message: 'Document detached from employee successfully'
    });
});

/**
 * Get document versions
 */
export const getDocumentVersions = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
        res.status(400).json({ error: 'Document name is required' });
        return;
    }

    if (!req.user) {
        throw new AppError('User not authenticated', 401);
    }

    const versions = await DocumentService.getDocumentVersions(req.user.id, name);

    res.status(200).json({
        count: versions.length,
        versions
    });
});
