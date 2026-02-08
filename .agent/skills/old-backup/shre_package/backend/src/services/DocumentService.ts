import { prisma } from '../config/database';
import { logger } from '../config/logger';
import { AppError } from '../middleware/errorHandler';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

// For now, we'll use local file storage
// In production, this should be replaced with AWS S3
const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

interface UploadDocumentData {
    userId: string;
    name: string;
    content: Buffer;
    mimeType: string;
    size: number;
}

interface AttachDocumentToEmployeeData {
    employeeId: string;
    documentId: string;
    category: string;
    description?: string;
}

export class DocumentService {
    /**
     * Initialize upload directory
     */
    static async initializeUploadDir() {
        try {
            await fs.access(UPLOAD_DIR);
        } catch {
            await fs.mkdir(UPLOAD_DIR, { recursive: true });
            logger.info(`Created upload directory: ${UPLOAD_DIR}`);
        }
    }

    /**
     * Upload a document
     */
    static async uploadDocument(data: UploadDocumentData) {
        // Ensure upload directory exists
        await this.initializeUploadDir();

        // Generate unique filename
        const fileExtension = path.extname(data.name);
        const fileName = `${uuidv4()}${fileExtension}`;
        const filePath = path.join(UPLOAD_DIR, fileName);

        // Save file to disk
        await fs.writeFile(filePath, data.content);

        // Check if a document with the same name exists for this user
        const existingDoc = await prisma.document.findFirst({
            where: {
                userId: data.userId,
                name: data.name
            },
            orderBy: {
                version: 'desc'
            }
        });

        const version = existingDoc ? existingDoc.version + 1 : 1;

        // Create document record in database
        const document = await prisma.document.create({
            data: {
                userId: data.userId,
                name: data.name,
                content: data.content,
                mimeType: data.mimeType,
                size: data.size,
                version,
                s3Key: fileName // Using local filename, in production this would be S3 key
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });

        logger.info(`Document uploaded: ${document.name} (v${document.version}) by user ${data.userId}`);

        return document;
    }

    /**
     * Get document by ID
     */
    static async getDocumentById(id: string, userId?: string) {
        const document = await prisma.document.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
                employeeDocuments: {
                    include: {
                        employee: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                employeeId: true
                            }
                        }
                    }
                }
            }
        });

        if (!document) {
            throw new AppError('Document not found', 404);
        }

        // Check access permissions (user can only access their own documents unless admin)
        if (userId && document.userId !== userId) {
            throw new AppError('Access denied', 403);
        }

        return document;
    }

    /**
     * Get all documents for a user
     */
    static async getDocumentsByUserId(userId: string) {
        const documents = await prisma.document.findMany({
            where: { userId },
            include: {
                employeeDocuments: {
                    include: {
                        employee: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                employeeId: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return documents;
    }

    /**
     * Get all documents (Admin only)
     */
    static async getAllDocuments() {
        const documents = await prisma.document.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                },
                employeeDocuments: {
                    include: {
                        employee: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                employeeId: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return documents;
    }

    /**
     * Download document content
     */
    static async downloadDocument(id: string, userId?: string) {
        const document = await this.getDocumentById(id, userId);

        // For local storage, read from file
        if (document.s3Key) {
            const filePath = path.join(UPLOAD_DIR, document.s3Key);
            try {
                const content = await fs.readFile(filePath);
                return {
                    content,
                    name: document.name,
                    mimeType: document.mimeType || 'application/octet-stream'
                };
            } catch (error) {
                logger.error(`Error reading file: ${filePath}`, error);
                throw new AppError('Error reading document file', 500);
            }
        }

        // Fallback to database content
        return {
            content: document.content,
            name: document.name,
            mimeType: document.mimeType || 'application/octet-stream'
        };
    }

    /**
     * Delete document
     */
    static async deleteDocument(id: string, userId?: string) {
        const document = await this.getDocumentById(id, userId);

        // Delete file from disk if exists
        if (document.s3Key) {
            const filePath = path.join(UPLOAD_DIR, document.s3Key);
            try {
                await fs.unlink(filePath);
                logger.info(`Deleted file: ${filePath}`);
            } catch (error) {
                logger.warn(`Could not delete file: ${filePath}`, error);
            }
        }

        // Delete from database
        await prisma.document.delete({
            where: { id }
        });

        logger.info(`Document deleted: ${document.name} (ID: ${id})`);
    }

    /**
     * Attach document to employee
     */
    static async attachDocumentToEmployee(data: AttachDocumentToEmployeeData) {
        // Verify employee exists
        const employee = await prisma.employee.findUnique({
            where: { id: data.employeeId }
        });

        if (!employee) {
            throw new AppError('Employee not found', 404);
        }

        // Verify document exists
        const document = await prisma.document.findUnique({
            where: { id: data.documentId }
        });

        if (!document) {
            throw new AppError('Document not found', 404);
        }

        // Check if already attached
        const existing = await prisma.employeeDocument.findFirst({
            where: {
                employeeId: data.employeeId,
                documentId: data.documentId
            }
        });

        if (existing) {
            throw new AppError('Document already attached to this employee', 409);
        }

        // Create association
        const employeeDocument = await prisma.employeeDocument.create({
            data: {
                employeeId: data.employeeId,
                documentId: data.documentId,
                category: data.category,
                description: data.description
            },
            include: {
                employee: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        employeeId: true
                    }
                },
                document: {
                    select: {
                        id: true,
                        name: true,
                        mimeType: true,
                        size: true,
                        version: true
                    }
                }
            }
        });

        logger.info(`Document ${document.name} attached to employee ${employee.employeeId}`);

        return employeeDocument;
    }

    /**
     * Get documents for an employee
     */
    static async getEmployeeDocuments(employeeId: string) {
        const employeeDocuments = await prisma.employeeDocument.findMany({
            where: { employeeId },
            include: {
                document: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                username: true,
                                email: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return employeeDocuments;
    }

    /**
     * Detach document from employee
     */
    static async detachDocumentFromEmployee(employeeId: string, documentId: string) {
        const employeeDocument = await prisma.employeeDocument.findFirst({
            where: {
                employeeId,
                documentId
            }
        });

        if (!employeeDocument) {
            throw new AppError('Document not attached to this employee', 404);
        }

        await prisma.employeeDocument.delete({
            where: { id: employeeDocument.id }
        });

        logger.info(`Document ${documentId} detached from employee ${employeeId}`);
    }

    /**
     * Get document versions
     */
    static async getDocumentVersions(userId: string, name: string) {
        const versions = await prisma.document.findMany({
            where: {
                userId,
                name
            },
            orderBy: {
                version: 'desc'
            },
            select: {
                id: true,
                name: true,
                version: true,
                size: true,
                mimeType: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return versions;
    }
}
