import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import { graphqlHTTP } from 'express-graphql';
import rateLimit from 'express-rate-limit';

// Import configurations
import { configurePassport } from './config/auth';
import { logger } from './config/logger';
import { prisma } from './config/database';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import employeeRoutes from './routes/employeeRoutes';
import documentRoutes from './routes/documentRoutes';

// Import GraphQL schema
import { schema } from './graphql/schema';

// Import middleware
import { errorHandler } from './middleware/errorHandler';

// Import services
import { DocumentService } from './services/DocumentService';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;
const API_VERSION = process.env.API_VERSION || 'v1';

// Initialize services
DocumentService.initializeUploadDir().catch((err) => {
    logger.error('Failed to initialize upload directory:', err);
});

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
});
app.use(`/api/${API_VERSION}`, limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Initialize Passport
configurePassport(passport);
app.use(passport.initialize());

// Health check endpoint
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'shre-backend',
        version: API_VERSION
    });
});

// REST API routes
app.use(`/api/${API_VERSION}/auth`, authRoutes);
app.use(`/api/${API_VERSION}/users`, userRoutes);
app.use(`/api/${API_VERSION}/employees`, employeeRoutes);
app.use(`/api/${API_VERSION}/documents`, documentRoutes);

// GraphQL endpoint
app.use(`/api/${API_VERSION}/graphql`, graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    customFormatErrorFn: (error) => {
        logger.error('GraphQL Error:', error);
        return error;
    }
}));

// Error handling middleware (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', async () => {
    logger.info('SIGTERM signal received: closing HTTP server');
    await prisma.$disconnect();
    process.exit(0);
});

process.on('SIGINT', async () => {
    logger.info('SIGINT signal received: closing HTTP server');
    await prisma.$disconnect();
    process.exit(0);
});

// Start server
app.listen(PORT, () => {
    logger.info(`🚀 Server running on port ${PORT}`);
    logger.info(`📊 GraphQL endpoint: http://localhost:${PORT}/api/${API_VERSION}/graphql`);
    logger.info(`🏥 Health check: http://localhost:${PORT}/health`);
    logger.info(`📁 Employee Management: http://localhost:${PORT}/api/${API_VERSION}/employees`);
    logger.info(`📄 Document Management: http://localhost:${PORT}/api/${API_VERSION}/documents`);
    logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
