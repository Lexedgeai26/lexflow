
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import llmProxyRoutes from './routes/llm-proxy.routes';
import authRoutes from './routes/auth.routes';
import ragRoutes from './routes/rag.routes';
import casesRoutes from './routes/cases.routes';

// Load environment variables
// Priority: .env.local -> .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); // Allow all for dev
app.use(express.json({ limit: '10mb' })); // Support large prompts/images

// Routes
app.use('/api/ai', llmProxyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rag', ragRoutes);
app.use('/api/cases', casesRoutes);

// Root Health
app.get('/', (req, res) => {
  res.send('LexReply AI Backend is Running');
});

// Start Server
app.listen(PORT, () => {
  console.log(`
🚀 LexReply Backend running on http://localhost:${PORT}
🔑 Secure LLM Proxy Active at /api/ai
📚 RAG System Active at /api/rag
  `);
});
