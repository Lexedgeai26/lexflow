
import { Router } from 'express';
import { AssistantService } from '../rag/assistant';
import { VectorStoreService } from '../rag/vectorStore';
import { autoUserMiddleware } from '../middleware/llm-proxy.middleware';

const router = Router();
const assistant = AssistantService.getInstance();
const vectorStore = VectorStoreService.getInstance();

// Index a Case
router.post('/index', autoUserMiddleware, async (req, res) => {
    try {
        const { caseData } = req.body;
        if (!caseData) {
            return res.status(400).json({ error: 'caseData is required' });
        }

        const { IndexerService } = await import('../rag/indexer');
        await IndexerService.getInstance().indexCase(caseData);

        res.json({ success: true, message: 'Case indexed successfully' });
    } catch (error: any) {
        console.error('Indexing Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Ask Question with RAG
router.post('/ask', autoUserMiddleware, async (req, res) => {
    try {
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ error: 'Question is required' });
        }

        const result = await assistant.ask(question);
        res.json(result);

    } catch (error: any) {
        console.error('RAG Endpoint Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get RAG Stats
router.get('/stats', autoUserMiddleware, async (req, res) => {
    try {
        const stats = await vectorStore.getDocumentCounts();
        res.json(stats);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
