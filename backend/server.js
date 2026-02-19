import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import mammoth from 'mammoth';
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8787;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// Database setup
let db;

async function initDb() {
    try {
        db = await open({
            filename: path.join(__dirname, 'lexflow.db'),
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS projects (
                id TEXT PRIMARY KEY,
                name TEXT,
                matterType TEXT,
                status TEXT,
                createdAt TEXT,
                updatedAt TEXT,
                analysis TEXT,
                documents TEXT,
                chatHistory TEXT
            );
            CREATE TABLE IF NOT EXISTS users (
                id TEXT PRIMARY KEY,
                email TEXT UNIQUE,
                password TEXT,
                firmName TEXT,
                lawyerName TEXT,
                areaOfPractice TEXT,
                jurisdiction TEXT,
                llmProvider TEXT,
                llmApiKey TEXT
            );
            CREATE TABLE IF NOT EXISTS skills (
                id TEXT PRIMARY KEY,
                name TEXT,
                description TEXT,
                prompt TEXT,
                isActive INTEGER
            );
        `);
        console.log('Database initialized');
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
}

// Middleware to ensure DB is ready
app.use((req, res, next) => {
    if (!db && req.path !== '/health') {
        return res.status(503).json({ error: 'Database initializing, please try again in a moment.' });
    }
    next();
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', dbReady: !!db });
});

// AI Provider Logic
async function callLLM(provider, apiKey, prompt, systemPrompt = "", history = []) {
    try {
        if (provider === 'openai') {
            const openai = new OpenAI({ apiKey });
            const messages = [
                { role: "system", content: systemPrompt },
                ...history.map(m => ({
                    role: m.role === 'model' ? 'assistant' : m.role,
                    content: m.parts[0].text
                })),
                { role: "user", content: prompt }
            ];
            const response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages
            });
            return response.choices[0].message.content;
        } else if (provider === 'gemini') {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-pro",
                systemInstruction: systemPrompt
            });
            const chat = model.startChat({
                history: history.map(m => ({
                    role: m.role === 'model' ? 'model' : 'user',
                    parts: [{ text: m.parts[0].text }]
                }))
            });
            const result = await chat.sendMessage(prompt);
            const response = await result.response;
            return response.text();
        } else if (provider === 'claude') {
            const anthropic = new Anthropic({ apiKey });
            const response = await anthropic.messages.create({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 4096,
                system: systemPrompt,
                messages: [
                    ...history.map(m => ({
                        role: m.role === 'model' ? 'assistant' : m.role,
                        content: m.parts[0].text
                    })),
                    { role: "user", content: prompt }
                ]
            });
            return response.content[0].text;
        }
        throw new Error('Unsupported provider');
    } catch (error) {
        console.error(`Error with ${provider}:`, error);
        throw error;
    }
}

// API Routes
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await db.all('SELECT * FROM projects');
        const parsedProjects = projects.map(p => ({
            ...p,
            analysis: p.analysis ? JSON.parse(p.analysis) : null,
            documents: p.documents ? JSON.parse(p.documents) : [],
            chatHistory: p.chatHistory ? JSON.parse(p.chatHistory) : []
        }));
        res.json({ data: parsedProjects });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/projects', async (req, res) => {
    const project = req.body;
    try {
        await db.run(
            `INSERT OR REPLACE INTO projects (id, name, matterType, status, createdAt, updatedAt, analysis, documents, chatHistory)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                project.id,
                project.name,
                project.matterType,
                project.status,
                project.createdAt,
                project.updatedAt,
                JSON.stringify(project.analysis),
                JSON.stringify(project.documents),
                JSON.stringify(project.chatHistory)
            ]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/skills', async (req, res) => {
    try {
        const skills = await db.all('SELECT * FROM skills');
        const parsedSkills = skills.map(s => ({
            ...s,
            isActive: s.isActive === 1
        }));
        res.json({ data: parsedSkills });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/skills', async (req, res) => {
    const skill = req.body;
    try {
        await db.run(
            `INSERT INTO skills (id, name, description, prompt, isActive) VALUES (?, ?, ?, ?, ?)`,
            [skill.id, skill.name, skill.description, skill.prompt, skill.isActive ? 1 : 0]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/skills/bulk', async (req, res) => {
    const { skills } = req.body;
    let transactionActive = false;
    try {
        await db.run('BEGIN TRANSACTION');
        transactionActive = true;
        for (const skill of skills) {
            await db.run(
                `INSERT OR REPLACE INTO skills (id, name, description, prompt, isActive) VALUES (?, ?, ?, ?, ?)`,
                [skill.id, skill.name, skill.description, skill.prompt, skill.isActive ? 1 : 0]
            );
        }
        await db.run('COMMIT');
        res.json({ success: true });
    } catch (error) {
        if (transactionActive) {
            await db.run('ROLLBACK').catch(() => { });
        }
        res.status(500).json({ error: error.message });
    }
});

// User Routes
app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        if (user) {
            res.json({ user });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/users/register', async (req, res) => {
    const { email, password, firmName, lawyerName, areaOfPractice, jurisdiction, llmProvider, llmApiKey } = req.body;
    const id = Math.random().toString(36).substr(2, 9);
    try {
        await db.run(
            `INSERT INTO users (id, email, password, firmName, lawyerName, areaOfPractice, jurisdiction, llmProvider, llmApiKey)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id, email, password, firmName, lawyerName, areaOfPractice, jurisdiction, llmProvider, llmApiKey]
        );
        res.json({ user: { id, email, firmName, lawyerName, areaOfPractice, jurisdiction, llmProvider, llmApiKey } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/users/update-context', async (req, res) => {
    const { userId, context } = req.body;
    try {
        await db.run(
            `UPDATE users SET firmName = ?, lawyerName = ?, areaOfPractice = ?, jurisdiction = ?, llmProvider = ?, llmApiKey = ?
             WHERE id = ?`,
            [context.firmName, context.lawyerName, context.areaOfPractice, context.jurisdiction, context.llmProvider, context.llmApiKey, userId]
        );
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// AI Routes
app.post('/api/ai/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    try {
        let text = '';
        const buffer = req.file.buffer;
        const extension = path.extname(req.file.originalname).toLowerCase();
        if (extension === '.txt') text = buffer.toString('utf-8');
        else if (extension === '.pdf') text = (await pdf(buffer)).text;
        else if (extension === '.docx') text = (await mammoth.extractRawText({ buffer })).value;
        else return res.status(400).json({ error: 'Unsupported file type' });
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to extract text' });
    }
});

app.post('/api/ai/analyze', async (req, res) => {
    const { text, matterType, skills, context, llmConfig } = req.body;
    if (!llmConfig?.apiKey) return res.status(400).json({ error: 'AI API Key missing' });

    const skillsToUse = skills || req.body.activeSkills || [];
    const systemPrompt = `You are LexEdge AI. Analyze this document in the context of:
Firm: ${context.firmName}
Jurisdiction: ${context.jurisdiction}
Matter: ${matterType}

Skills Applied:
${skillsToUse.map(s => `- ${s.name}: ${s.prompt}`).join('\n')}

Output JSON with EXACTLY these keys:
{
  "docType": "Document type",
  "summary": "Executive summary",
  "overallRisk": "GREEN | YELLOW | RED",
  "riskScore": 0-100,
  "jurisdictionDetected": "Detected jurisdiction",
  "confidence": 0.0-1.0,
  "skillsApplied": [
    {
      "title": "Skill name",
      "content": "Analysis content",
      "riskLevel": "GREEN | YELLOW | RED",
      "clauses": ["extracted clause text"],
      "suggestions": ["recommendation"]
    }
  ]
}`;

    try {
        const result = await callLLM(llmConfig.provider, llmConfig.apiKey, text, systemPrompt);
        res.json(JSON.parse(result.replace(/```json\n?|```/g, '').trim()));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/ai/chat', async (req, res) => {
    const { projectName, documentContent, analysisSummary, context, message, history, llmConfig } = req.body;
    if (!llmConfig?.apiKey) return res.status(400).json({ error: 'AI API Key missing' });

    const systemPrompt = `You are LexEdge AI. You are discussing project: ${projectName}.
Analysis Context: ${analysisSummary}
Professional Context: Firm: ${context.firmName}, Jurisdiction: ${context.jurisdiction}
Document Content: ${documentContent}`;

    try {
        const result = await callLLM(llmConfig.provider, llmConfig.apiKey, message, systemPrompt, history);
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/ai/validate', async (req, res) => {
    const { provider, apiKey } = req.body;
    try {
        if (provider === 'openai') await (new OpenAI({ apiKey })).models.list();
        else if (provider === 'gemini') await (new GoogleGenerativeAI(apiKey)).getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent("t");
        else if (provider === 'claude') await (new Anthropic({ apiKey })).messages.create({ model: "claude-3-haiku-20240307", max_tokens: 1, messages: [{ role: "user", content: "t" }] });
        res.json({ valid: true });
    } catch (err) {
        res.json({ valid: false, error: err.message });
    }
});

app.listen(port, async () => {
    await initDb();
    console.log(`Backend server running at http://localhost:${port}`);
});
