
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-change-in-prod';

router.post('/login', async (req, res) => {
    const { email, password, name } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    // In a real app, verify password hash here.
    // For this conversion, we'll auto-provision or match strictly by email.
    // Since we rely on the proxy middleware to create the user, we just issue the token here.

    // Create a JWT
    const token = jwt.sign(
        {
            email,
            name: name || email.split('@')[0],
            sub: email, // Use email as ID for simplicity or fetch real ID if strictly needed 
            // Ideally we should lookup user to get their UUID, but auto-user middleware handles creation by 'sub'
        },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.json({
        token,
        user: { email, name }
    });
});

export default router;
