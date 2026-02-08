import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { asyncHandler } from '../middleware/errorHandler';
import { logger } from '../config/logger';

/**
 * Register a new user
 */
export const register = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password, role } = req.body;

    // Validation
    if (!username || !email || !password) {
        res.status(400).json({ error: 'Username, email, and password are required' });
        return;
    }

    const result = await AuthService.register({ username, email, password, role });

    res.status(201).json({
        message: 'User registered successfully',
        ...result
    });
});

/**
 * Login user
 */
export const login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
    }

    const result = await AuthService.login({ email, password });

    res.status(200).json({
        message: 'Login successful',
        ...result
    });
});

/**
 * Refresh access token
 */
export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token is required' });
        return;
    }

    const result = await AuthService.refreshAccessToken(refreshToken);

    res.status(200).json({
        message: 'Token refreshed successfully',
        ...result
    });
});

/**
 * Logout user
 */
export const logout = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        res.status(400).json({ error: 'Refresh token is required' });
        return;
    }

    await AuthService.logout(refreshToken);

    res.status(200).json({
        message: 'Logout successful'
    });
});

/**
 * Get current user profile
 */
export const me = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    res.status(200).json({
        user: req.user
    });
});
