import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '../config/database';
import { jwtConfig } from '../config/auth';
import { logger } from '../config/logger';
import { AppError } from '../middleware/errorHandler';
import { UserRole } from '@prisma/client';

interface RegisterData {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
}

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        username: string;
        role: UserRole;
    };
}

export class AuthService {
    /**
     * Register a new user
     */
    static async register(data: RegisterData): Promise<AuthResponse> {
        const { username, email, password, role = UserRole.USER } = data;

        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        });

        if (existingUser) {
            throw new AppError('User with this email or username already exists', 409);
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role
            },
            select: {
                id: true,
                email: true,
                username: true,
                role: true
            }
        });

        logger.info(`New user registered: ${user.email}`);

        // Generate tokens
        const { accessToken, refreshToken } = await this.generateTokens(user);

        return {
            accessToken,
            refreshToken,
            user
        };
    }

    /**
     * Login user
     */
    static async login(data: LoginData): Promise<AuthResponse> {
        const { email, password } = data;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError('Invalid email or password', 401);
        }

        logger.info(`User logged in: ${user.email}`);

        // Generate tokens
        const { accessToken, refreshToken } = await this.generateTokens({
            id: user.id,
            email: user.email,
            role: user.role
        });

        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        };
    }

    /**
     * Refresh access token
     */
    static async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
        try {
            // Verify refresh token
            const decoded = jwt.verify(refreshToken, jwtConfig.refreshSecret) as { id: string };

            // Check if refresh token exists in database
            const storedToken = await prisma.refreshToken.findUnique({
                where: { token: refreshToken },
                include: { user: true }
            });

            if (!storedToken || storedToken.expiresAt < new Date()) {
                throw new AppError('Invalid or expired refresh token', 401);
            }

            // Generate new access token
            const accessToken = jwt.sign(
                {
                    id: storedToken.user.id,
                    email: storedToken.user.email,
                    role: storedToken.user.role
                },
                jwtConfig.secret as string,
                { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions
            );

            return { accessToken };
        } catch (error) {
            throw new AppError('Invalid or expired refresh token', 401);
        }
    }

    /**
     * Logout user (invalidate refresh token)
     */
    static async logout(refreshToken: string): Promise<void> {
        await prisma.refreshToken.deleteMany({
            where: { token: refreshToken }
        });
        logger.info('User logged out');
    }

    /**
     * Generate access and refresh tokens
     */
    private static async generateTokens(user: { id: string; email: string; role: UserRole }): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        // Generate access token
        const accessToken = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            jwtConfig.secret as string,
            { expiresIn: jwtConfig.expiresIn } as jwt.SignOptions
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
            { id: user.id },
            jwtConfig.refreshSecret as string,
            { expiresIn: jwtConfig.refreshExpiresIn } as jwt.SignOptions
        );

        // Calculate expiration date
        const expiresAt = new Date();
        const daysMatch = jwtConfig.refreshExpiresIn.match(/(\d+)d/);
        if (daysMatch) {
            expiresAt.setDate(expiresAt.getDate() + parseInt(daysMatch[1]));
        }

        // Store refresh token in database
        await prisma.refreshToken.create({
            data: {
                userId: user.id,
                token: refreshToken,
                expiresAt
            }
        });

        return { accessToken, refreshToken };
    }
}
