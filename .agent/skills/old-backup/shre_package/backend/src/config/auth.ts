import { PassportStatic } from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { prisma } from './database';
import { logger } from './logger';

export interface JwtPayload {
    id: string;
    email: string;
    role: string;
}

export const configurePassport = (passport: PassportStatic): void => {
    const options: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    };

    passport.use(
        new JwtStrategy(options, async (jwtPayload: JwtPayload, done) => {
            try {
                // Find user by ID from JWT payload
                const user = await prisma.user.findUnique({
                    where: { id: jwtPayload.id },
                    select: {
                        id: true,
                        email: true,
                        username: true,
                        role: true,
                        createdAt: true,
                        updatedAt: true
                    }
                });

                if (user) {
                    logger.debug(`User authenticated: ${user.email}`);
                    return done(null, user);
                } else {
                    logger.warn(`Authentication failed: User not found for ID ${jwtPayload.id}`);
                    return done(null, false);
                }
            } catch (error) {
                logger.error('Passport JWT Strategy Error:', error);
                return done(error, false);
            }
        })
    );
};

// JWT configuration
export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-super-secret-refresh-key-change-this-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
};
