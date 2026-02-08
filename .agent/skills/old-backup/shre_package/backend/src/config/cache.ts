import Redis from 'ioredis';
import { logger } from './logger';

// Redis Configuration
const REDIS_ENABLED = process.env.REDIS_ENABLED === 'true';
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
const REDIS_DB = parseInt(process.env.REDIS_DB || '0');

// Default cache TTL (Time To Live) in seconds
const DEFAULT_TTL = parseInt(process.env.CACHE_TTL || '3600'); // 1 hour

// Initialize Redis Client
let redisClient: Redis | null = null;

if (REDIS_ENABLED) {
    redisClient = new Redis({
        host: REDIS_HOST,
        port: REDIS_PORT,
        password: REDIS_PASSWORD,
        db: REDIS_DB,
        retryStrategy: (times) => {
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
        maxRetriesPerRequest: 3
    });

    redisClient.on('connect', () => {
        logger.info('✅ Redis client connected');
    });

    redisClient.on('error', (err) => {
        logger.error('❌ Redis client error:', err);
    });

    redisClient.on('ready', () => {
        logger.info('✅ Redis client ready');
    });
} else {
    logger.warn('⚠️  Redis not enabled - caching disabled');
}

export class CacheService {
    /**
     * Set cache with TTL
     */
    static async set(key: string, value: any, ttl: number = DEFAULT_TTL): Promise<void> {
        if (!redisClient) {
            return; // Silently skip if Redis not available
        }

        try {
            const serialized = JSON.stringify(value);
            await redisClient.setex(key, ttl, serialized);
            logger.debug(`Cache set: ${key} (TTL: ${ttl}s)`);
        } catch (error) {
            logger.error('Cache set error:', error);
            // Don't throw - caching is optional
        }
    }

    /**
     * Get cached value
     */
    static async get<T>(key: string): Promise<T | null> {
        if (!redisClient) {
            return null; // Return null if Redis not available
        }

        try {
            const cached = await redisClient.get(key);
            if (!cached) {
                return null;
            }

            const deserialized = JSON.parse(cached);
            logger.debug(`Cache hit: ${key}`);
            return deserialized as T;
        } catch (error) {
            logger.error('Cache get error:', error);
            return null;
        }
    }

    /**
     * Delete cached value
     */
    static async delete(key: string): Promise<void> {
        if (!redisClient) {
            return;
        }

        try {
            await redisClient.del(key);
            logger.debug(`Cache deleted: ${key}`);
        } catch (error) {
            logger.error('Cache delete error:', error);
        }
    }

    /**
     * Delete multiple keys matching pattern
     */
    static async deletePattern(pattern: string): Promise<void> {
        if (!redisClient) {
            return;
        }

        try {
            const keys = await redisClient.keys(pattern);
            if (keys.length > 0) {
                await redisClient.del(...keys);
                logger.debug(`Cache deleted pattern: ${pattern} (${keys.length} keys)`);
            }
        } catch (error) {
            logger.error('Cache delete pattern error:', error);
        }
    }

    /**
     * Check if key exists
     */
    static async exists(key: string): Promise<boolean> {
        if (!redisClient) {
            return false;
        }

        try {
            const exists = await redisClient.exists(key);
            return exists === 1;
        } catch (error) {
            logger.error('Cache exists error:', error);
            return false;
        }
    }

    /**
     * Set cache with no expiration
     */
    static async setPermanent(key: string, value: any): Promise<void> {
        if (!redisClient) {
            return;
        }

        try {
            const serialized = JSON.stringify(value);
            await redisClient.set(key, serialized);
            logger.debug(`Cache set (permanent): ${key}`);
        } catch (error) {
            logger.error('Cache set permanent error:', error);
        }
    }

    /**
     * Increment counter
     */
    static async increment(key: string, amount: number = 1): Promise<number> {
        if (!redisClient) {
            return 0;
        }

        try {
            const result = await redisClient.incrby(key, amount);
            return result;
        } catch (error) {
            logger.error('Cache increment error:', error);
            return 0;
        }
    }

    /**
     * Get TTL (Time To Live) for a key
     */
    static async getTTL(key: string): Promise<number> {
        if (!redisClient) {
            return -1;
        }

        try {
            return await redisClient.ttl(key);
        } catch (error) {
            logger.error('Cache TTL error:', error);
            return -1;
        }
    }

    /**
     * Flush all cache
     */
    static async flushAll(): Promise<void> {
        if (!redisClient) {
            return;
        }

        try {
            await redisClient.flushdb();
            logger.warn('⚠️  Cache flushed (all keys deleted)');
        } catch (error) {
            logger.error('Cache flush error:', error);
        }
    }

    /**
     * Check if Redis is enabled and connected
     */
    static isEnabled(): boolean {
        return REDIS_ENABLED && redisClient !== null && redisClient.status === 'ready';
    }

    /**
     * Get cache statistics
     */
    static async getStats(): Promise<any> {
        if (!redisClient) {
            return { enabled: false };
        }

        try {
            const info = await redisClient.info('stats');
            const dbSize = await redisClient.dbsize();

            return {
                enabled: true,
                status: redisClient.status,
                dbSize,
                info
            };
        } catch (error) {
            logger.error('Cache stats error:', error);
            return { enabled: true, error: 'Failed to get stats' };
        }
    }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
    if (redisClient) {
        await redisClient.quit();
        logger.info('Redis client disconnected');
    }
});

process.on('SIGINT', async () => {
    if (redisClient) {
        await redisClient.quit();
        logger.info('Redis client disconnected');
    }
});

export { redisClient };
