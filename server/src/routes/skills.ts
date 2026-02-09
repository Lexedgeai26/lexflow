
import { Router } from 'express';
import { db } from '../db/database.js';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// GET all skills
router.get('/', (req, res) => {
    db.all('SELECT * FROM skills ORDER BY created_at ASC', [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        const skills = rows.map((row: any) => ({
            id: row.id,
            name: row.name,
            description: row.description,
            prompt: row.prompt,
            isActive: row.is_active === 1
        }));
        res.json({ data: skills });
    });
});

// GET single skill by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM skills WHERE id = ?', [id], (err, row: any) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Skill not found' });
            return;
        }
        res.json({
            data: {
                id: row.id,
                name: row.name,
                description: row.description,
                prompt: row.prompt,
                isActive: row.is_active === 1
            }
        });
    });
});

// POST create new skill
router.post('/', (req, res) => {
    const { id, name, description, prompt, isActive } = req.body;
    const skillId = id || uuidv4();
    const is_active = isActive !== false ? 1 : 0;

    const sql = `INSERT INTO skills (id, name, description, prompt, is_active) VALUES (?, ?, ?, ?, ?)`;
    const params = [skillId, name, description || '', prompt || '', is_active];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: { id: skillId, name, description, prompt, isActive: is_active === 1 }
        });
    });
});

// PUT update skill
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, prompt, isActive } = req.body;
    const is_active = isActive !== false ? 1 : 0;

    const sql = `UPDATE skills SET name = ?, description = ?, prompt = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    const params = [name, description || '', prompt || '', is_active, id];

    db.run(sql, params, function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Skill not found' });
            return;
        }
        res.json({
            message: 'success',
            data: { id, name, description, prompt, isActive: is_active === 1 }
        });
    });
});

// DELETE skill
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM skills WHERE id = ?', [id], function (err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (this.changes === 0) {
            res.status(404).json({ error: 'Skill not found' });
            return;
        }
        res.json({ message: 'success', deleted: id });
    });
});

// POST bulk upsert skills (for initial seeding)
router.post('/bulk', (req, res) => {
    const { skills } = req.body;
    
    if (!Array.isArray(skills)) {
        res.status(400).json({ error: 'skills must be an array' });
        return;
    }

    const stmt = db.prepare(`INSERT OR REPLACE INTO skills (id, name, description, prompt, is_active, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`);
    
    let errors: string[] = [];
    
    db.serialize(() => {
        skills.forEach((skill: any) => {
            const is_active = skill.isActive !== false ? 1 : 0;
            stmt.run([skill.id, skill.name, skill.description || '', skill.prompt || '', is_active], (err) => {
                if (err) {
                    errors.push(`Failed to upsert skill ${skill.id}: ${err.message}`);
                }
            });
        });
        
        stmt.finalize((err) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            if (errors.length > 0) {
                res.status(207).json({ message: 'partial success', errors });
            } else {
                res.json({ message: 'success', count: skills.length });
            }
        });
    });
});

export default router;
