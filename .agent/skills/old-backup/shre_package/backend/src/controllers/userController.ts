import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { asyncHandler, AppError } from '../middleware/errorHandler';
import { UserRole } from '@prisma/client';

/**
 * Get all users (Admin only)
 */
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.status(200).json({
        count: users.length,
        users
    });
});

/**
 * Get user by ID
 */
export const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Users can only view their own profile unless they're admin
    if (req.user?.role !== UserRole.ADMIN && req.user?.id !== id) {
        throw new AppError('You can only view your own profile', 403);
    }

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            documents: {
                select: {
                    id: true,
                    name: true,
                    mimeType: true,
                    size: true,
                    version: true,
                    createdAt: true,
                    updatedAt: true
                }
            }
        }
    });

    if (!user) {
        throw new AppError('User not found', 404);
    }

    res.status(200).json({ user });
});

/**
 * Update user
 */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, email, role } = req.body;

    // Users can only update their own profile unless they're admin
    if (req.user?.role !== UserRole.ADMIN && req.user?.id !== id) {
        throw new AppError('You can only update your own profile', 403);
    }

    // Only admins can change roles
    if (role && req.user?.role !== UserRole.ADMIN) {
        throw new AppError('Only admins can change user roles', 403);
    }

    const updateData: any = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (role && req.user?.role === UserRole.ADMIN) updateData.role = role;

    const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
            id: true,
            username: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true
        }
    });

    res.status(200).json({
        message: 'User updated successfully',
        user
    });
});

/**
 * Delete user (Admin only)
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.user.delete({
        where: { id }
    });

    res.status(200).json({
        message: 'User deleted successfully'
    });
});
