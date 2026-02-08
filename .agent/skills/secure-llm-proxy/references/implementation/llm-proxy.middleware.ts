
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-prod';

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            llmUser?: any;
        }
    }
}

/**
 * Middleware to strictly verify JWT and ensure user exists in LLM Proxy
 * Auto-creates user if they don't exist (if configured)
 */
export const autoUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Missing or invalid Authorization header' });
        }

        const token = authHeader.split(' ')[1];

        // 1. Verify Token
        let payload: any;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(403).json({ error: 'Invalid or expired token' });
        }

        const userId = payload.userId || payload.sub || payload.id;
        const email = payload.email;

        if (!userId || !email) {
            return res.status(400).json({ error: 'Token missing required user info (userId/email)' });
        }

        // 2. Find or Create LLM Proxy User
        let user = await prisma.lLMProxyUser.findUnique({
            where: { userId },
            include: { quota: true }
        });

        if (!user) {
            console.log(`[LLM Proxy] Auto-creating user: ${email} (${userId})`);

            // Transaction to create user and default quota
            user = await prisma.$transaction(async (tx) => {
                const newUser = await tx.lLMProxyUser.create({
                    data: {
                        userId,
                        email,
                        name: payload.name || email.split('@')[0],
                        createdFromJWT: true
                    }
                });

                await tx.lLMProxyUserQuota.create({
                    data: {
                        userId: newUser.id,
                        dailyTokenLimit: 100000,
                        monthlyTokenLimit: 500000,
                        requestsPerMinute: 20
                    }
                });

                return newUser;
            });

            // Re-fetch with quota
            user = await prisma.lLMProxyUser.findUnique({
                where: { id: user.id },
                include: { quota: true }
            });
        }

        if (!user?.isActive) {
            return res.status(403).json({ error: 'User account is disabled for AI access' });
        }

        // 3. Update Last Active
        await prisma.lLMProxyUser.update({
            where: { id: user.id },
            data: { lastActiveAt: new Date() }
        });

        req.llmUser = user;
        next();
    } catch (error) {
        console.error('[AutoUserMiddleware] Error:', error);
        res.status(500).json({ error: 'Internal Auth Error' });
    }
};

/**
 * Middleware to enforce quotas
 */
export const checkQuotaMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.llmUser;
    if (!user || !user.quota) {
        // Should be caught by autoUser, but safety check
        return res.status(500).json({ error: 'User context missing for quota check' });
    }

    const quota = user.quota;

    // 1. Check Daily Tokens (approximate check before request)
    if (quota.currentDailyTokens >= quota.dailyTokenLimit) {
        return res.status(429).json({
            error: 'Daily AI token limit exceeded',
            resetIn: '24h' // Simplified
        });
    }

    // 2. Check Monthly Tokens
    if (quota.currentMonthlyTokens >= quota.monthlyTokenLimit) {
        return res.status(429).json({
            error: 'Monthly AI token limit exceeded',
            resetIn: '30d'
        });
    }

    // 3. Rate Limit (Requests per minute) - Basic implementation
    // In production, use Redis. Here provided as DB check loop which is slow but strict, 
    // or rely on `express-rate-limit` for higher level blocking.
    // We'll trust the generic rate limiter for now or implement a counter update here.

    next();
};


/**
 * Helper to log usage after request
 */
export const logUsage = async (userId: string, details: {
    provider: string,
    model: string,
    operation: string,
    tokens: { prompt: number, completion: number, total: number },
    latency: number,
    success: boolean,
    statusCode: number,
    errorMessage?: string
}) => {
    try {
        // Calculate roughly estimated cost (example rates)
        let cost = 0;
        if (details.provider === 'gemini') {
            cost = (details.tokens.prompt * 0.0000005) + (details.tokens.completion * 0.0000015);
        } else if (details.provider === 'openai') {
            cost = (details.tokens.prompt * 0.000005) + (details.tokens.completion * 0.000015);
        }

        await prisma.$transaction([
            // Log entry
            prisma.lLMProxyUsageLog.create({
                data: {
                    userId, // INTERNAL DB ID
                    provider: details.provider,
                    model: details.model,
                    operation: details.operation,
                    endpoint: '/generate',
                    method: 'POST',
                    promptTokens: details.tokens.prompt,
                    completionTokens: details.tokens.completion,
                    totalTokens: details.tokens.total,
                    estimatedCost: cost,
                    latencyMs: details.latency,
                    success: details.success,
                    statusCode: details.statusCode,
                    errorMessage: details.errorMessage
                }
            }),
            // Update Quota
            prisma.lLMProxyUserQuota.update({
                where: { userId }, // This is the user's INTERNAL DB ID relation
                data: {
                    currentDailyTokens: { increment: details.tokens.total },
                    currentMonthlyTokens: { increment: details.tokens.total },
                    totalTokensUsed: { increment: details.tokens.total },
                    totalRequests: { increment: 1 },
                    totalCost: { increment: cost }
                }
            })
        ]);
    } catch (err) {
        console.error('[LogUsage] Failed to log usage:', err);
    }
};
