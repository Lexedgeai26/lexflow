import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { UserRole } from '@prisma/client';
import { logger } from '../config/logger';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface User {
            id: string;
            email: string;
            username: string;
            role: UserRole;
            createdAt: Date;
            updatedAt: Date;
        }
    }
}

/**
 * Middleware to authenticate JWT token
 */
export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate('jwt', { session: false }, (err: Error, user: Express.User, info: any) => {
        if (err) {
            logger.error('Authentication error:', err);
            res.status(500).json({ error: 'Internal server error during authentication' });
            return;
        }

        if (!user) {
            logger.warn('Authentication failed:', info?.message || 'No user found');
            res.status(401).json({ error: 'Unauthorized', message: info?.message || 'Invalid or expired token' });
            return;
        }

        req.user = user;
        next();
    })(req, res, next);
};

/**
 * Middleware to authorize based on user roles
 */
export const authorize = (...allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized', message: 'Authentication required' });
            return;
        }

        const userRole = req.user.role;

        if (!allowedRoles.includes(userRole)) {
            logger.warn(`Authorization failed: User ${req.user.email} with role ${userRole} attempted to access resource requiring roles: ${allowedRoles.join(', ')}`);
            res.status(403).json({
                error: 'Forbidden',
                message: 'You do not have permission to access this resource'
            });
            return;
        }

        next();
    };
};
