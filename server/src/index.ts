
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { db } from './db/database.js';
import projectRoutes from './routes/projects.js';
import userRoutes from './routes/users.js';
import aiRoutes from './routes/ai.js';
import skillRoutes from './routes/skills.js';

import { fileURLToPath } from 'url';
// @ts-ignore
// @ts-ignore
const _filename = (process.env.IS_CJS === 'true') ? __filename : fileURLToPath(import.meta.url);
// @ts-ignore
const _dirname = (process.env.IS_CJS === 'true') ? __dirname : path.dirname(_filename);

dotenv.config({ path: path.resolve(_dirname, '../../.env.local') });

const app = express();
const PORT = process.env.PORT || 8787;

app.use(cors());
app.use(express.json());

// Initialize Database
db.serialize(() => {
  console.log('Connected to SQLite database.');

  // Create Tables if they don't exist
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    password_hash TEXT,
    context TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    name TEXT,
    status TEXT,
    analysis TEXT,
    chat_history TEXT,
    project_json TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    project_id TEXT,
    name TEXT,
    content TEXT,
    metadata TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(project_id) REFERENCES projects(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS skills (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    prompt TEXT,
    is_active INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  const ensureColumn = (table: string, column: string, definition: string) => {
    db.all(`PRAGMA table_info(${table})`, [], (err, rows: any[]) => {
      if (err) {
        console.error(`Failed to inspect ${table}:`, err.message);
        return;
      }
      const exists = rows.some((row) => row.name === column);
      if (!exists) {
        db.run(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`, (alterErr) => {
          if (alterErr) {
            console.error(`Failed to add ${column} to ${table}:`, alterErr.message);
          }
        });
      }
    });
  };

  ensureColumn('projects', 'project_json', 'TEXT');
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/skills', skillRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', database: 'sqlite' });
});

app.listen(PORT as number, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
