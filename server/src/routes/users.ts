
import { Router } from 'express';
import { db } from '../db/database';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

const router = Router();

// POST register
router.post('/register', async (req, res) => {
    const { email, password, firmName, lawyerName, areaOfPractice, jurisdiction } = req.body;

    if (!password) {
        res.status(400).json({ error: 'Password is required' });
        return;
    }

    const id = uuidv4();

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const sql = `INSERT INTO users (id, email, context, password_hash) VALUES (?, ?, ?, ?)`;
        const context = JSON.stringify({
            firmName,
            lawyerName,
            areaOfPractice,
            jurisdiction
        });

        db.run(sql, [id, email, context, passwordHash], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    res.status(409).json({ error: 'User already exists' });
                } else {
                    res.status(400).json({ error: err.message });
                }
                return;
            }
            res.json({
                user: {
                    id,
                    email,
                    firmName,
                    lawyerName,
                    areaOfPractice,
                    jurisdiction
                }
            });
        });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// POST login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!password) {
        res.status(400).json({ error: 'Password is required' });
        return;
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.get(sql, [email], async (err, row: any) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const validPassword = await bcrypt.compare(password, row.password_hash);
        if (!validPassword) {
            res.status(400).json({ error: 'Invalid password' });
            return;
        }

        try {
            const context = JSON.parse(row.context);
            res.json({
                user: {
                    id: row.id,
                    email: row.email,
                    ...context
                }
            });
        } catch (e) {
            res.status(500).json({ error: 'Data corruption error' });
        }
    });
});

export default router;
