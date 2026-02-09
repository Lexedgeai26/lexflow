
import { Router } from 'express';
import { db } from '../db/database.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// GET all projects
router.get('/', (req, res) => {
    db.all('SELECT * FROM projects', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        const projects = rows.map((row: any) => {
            if (row.project_json) {
                try {
                    return JSON.parse(row.project_json);
                } catch (e) {
                    console.warn('Failed to parse project_json, falling back:', e);
                }
            }
            return {
                id: row.id,
                name: row.name,
                matterType: '',
                status: row.status,
                documents: [],
                analysis: row.analysis ? JSON.parse(row.analysis) : null,
                createdAt: row.created_at || '',
                updatedAt: row.updated_at || '',
                owner: row.user_id || 'default-user',
                chatHistory: row.chat_history ? JSON.parse(row.chat_history) : []
            };
        });
        res.json({ data: projects });
    });
});

// POST new project
router.post('/', (req, res) => {
    const project = req.body || {};
    const id = project.id || uuidv4();
    const name = project.name || 'Untitled Project';
    const status = project.status || 'DRAFT';
    const owner = project.owner || project.user_id || 'default-user';
    const analysis = project.analysis ? JSON.stringify(project.analysis) : null;
    const chatHistory = project.chatHistory ? JSON.stringify(project.chatHistory) : JSON.stringify([]);
    const projectJson = JSON.stringify({ ...project, id });

    const sql = `
        INSERT INTO projects (id, user_id, name, status, analysis, chat_history, project_json, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
            user_id = excluded.user_id,
            name = excluded.name,
            status = excluded.status,
            analysis = excluded.analysis,
            chat_history = excluded.chat_history,
            project_json = excluded.project_json,
            updated_at = CURRENT_TIMESTAMP
    `;
    const params = [id, owner, name, status, analysis, chatHistory, projectJson];

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
