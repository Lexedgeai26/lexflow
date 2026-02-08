/**
 * LLM Proxy Module Configuration
 * 
 * Defines the configuration interface for the LLM Proxy module.
 * Supports flexible setup for different deployment scenarios.
 */

export interface LLMProxyModuleConfig {
  /**
   * Application name (for display purposes)
   */
  appName?: string;

  /**
   * Database configuration
   */
  database?: {
    /**
     * Database type
     * - 'postgresql': Use PostgreSQL (shared with main app or separate)
     * - 'sqlite': Use SQLite (standalone file)
     */
    type: 'postgresql' | 'sqlite';
    
    /**
     * Connection URL
     * For PostgreSQL: postgresql://user:pass@host:port/db
     * For SQLite: file:./llm-proxy.db
     */
    url?: string;
    
    /**
     * SQLite file path (if type is 'sqlite')
     */
    sqlitePath?: string;
  };

  /**
   * LLM Provider API Keys
   * Can also be set via environment variables
   */
  apiKeys?: {
    gemini?: string;
    openai?: string;
    claude?: string;
  };

  /**
   * Feature flags
   */
  features?: {
    /**
     * Auto-create users from JWT on first request
     * Default: true
     */
    autoCreateUsers?: boolean;

    /**
     * Enforce quota limits
     * Default: true
     */
    enforceQuotas?: boolean;

    /**
     * Track usage in database
     * Default: true
     */
    trackUsage?: boolean;

    /**
     * Enable bootstrap UI
     * Default: false (API only)
     */
    enableBootstrapUI?: boolean;
  };

  /**
   * Default user quota settings
   * Applied to new auto-created users
   */
  defaultUserQuota?: {
    dailyTokenLimit?: number;
    monthlyTokenLimit?: number;
    requestsPerMinute?: number;
    maxConcurrent?: number;
  };

  /**
   * Global limits
   */
  globalLimits?: {
    dailyTokenLimit?: number;
    monthlySpendLimit?: number;
  };

  /**
   * JWT Configuration
   */
  jwt?: {
    /**
     * JWT secret for token validation
     * If not provided, uses process.env.JWT_SECRET
     */
    secret?: string;

    /**
     * Custom JWT user extractor
     * Extracts user info from JWT payload
     */
    userExtractor?: (payload: any) => {
      userId: string;
      email: string;
      name?: string;
    };
  };

  /**
   * Server configuration
   */
  server?: {
    /**
     * Port to run on
     * Default: 4000
     */
    port?: number;

    /**
     * CORS origins
     * Default: ['http://localhost:3000', 'http://localhost:3001']
     */
    corsOrigins?: string[] | boolean;

    /**
     * API prefix
     * Default: '/api/ai'
     */
    apiPrefix?: string;
  };

  /**
   * Logging configuration
   */
  logging?: {
    /**
     * Log level
     * Default: 'info'
     */
    level?: 'debug' | 'info' | 'warn' | 'error';

    /**
     * Enable request logging
     * Default: true
     */
    logRequests?: boolean;

    /**
     * Enable performance logging
     * Default: true
     */
    logPerformance?: boolean;
  };
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: LLMProxyModuleConfig = {
  appName: 'LLM Proxy',
  database: {
    type: 'postgresql',
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/llm_proxy',
  },
  features: {
    autoCreateUsers: true,
    enforceQuotas: true,
    trackUsage: true,
    enableBootstrapUI: false,
  },
  defaultUserQuota: {
    dailyTokenLimit: 10000,
    monthlyTokenLimit: 300000,
    requestsPerMinute: 10,
    maxConcurrent: 3,
  },
  globalLimits: {
    dailyTokenLimit: 100000,
    monthlySpendLimit: 100.0,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret',
  },
  server: {
    port: parseInt(process.env.PORT || '4000'),
    corsOrigins: true, // Allow all in dev
    apiPrefix: '/api/ai',
  },
  logging: {
    level: 'info',
    logRequests: true,
    logPerformance: true,
  },
};

