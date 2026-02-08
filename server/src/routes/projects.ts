
import { Router } from 'express';
import { db } from '../db/database';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// GET all projects
router.get('/', (req, res) => {
    db.all('SELECT * FROM projects', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        // Parse JSON fields
        const projects = rows.map((row: any) => ({
            ...row,
            analysis: row.analysis ? JSON.parse(row.analysis) : null,
            chat_history: row.chat_history ? JSON.parse(row.chat_history) : []
        }));
        res.json({ data: projects });
    });
});

// POST new project
router.post('/', (req, res) => {
    const { name, user_id } = req.body;
    const id = uuidv4();
    const status = 'DRAFT';

    const sql = 'INSERT INTO projects (id, user_id, name, status) VALUES (?, ?, ?, ?)';
    const params = [id, user_id || 'default-user', name, status];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: { id, name, status }
        });
    });
});

export default router;
