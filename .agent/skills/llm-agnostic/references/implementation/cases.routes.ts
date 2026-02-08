
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { autoUserMiddleware } from '../middleware/llm-proxy.middleware';
import { IndexerService } from '../rag/indexer';

const router = Router();
const prisma = new PrismaClient();
const indexer = IndexerService.getInstance();

// GET /api/cases - List all cases for current user
router.get('/', autoUserMiddleware, async (req: any, res) => {
    try {
        const cases = await prisma.case.findMany({
            where: { userId: req.llmUser.id },
            orderBy: { createdAt: 'desc' }
        });

        // Convert dates to timestamps for frontend compatibility if needed, 
        // but Typescript Case interface uses number for createdAt.
        // We will return ISO string which JSON.parse handles easily or map it.
        const mappedCases = cases.map(c => ({
            ...c,
            createdAt: c.createdAt.getTime() // Convert to ms timestamp
        }));

        res.json(mappedCases);
    } catch (error: any) {
        console.error('List Cases Error:', error);
        res.status(500).json({ error: 'Failed to fetch cases' });
    }
});

// POST /api/cases - Create a new case
router.post('/', autoUserMiddleware, async (req: any, res) => {
    try {
        const { title, clientName, opposingParty, jurisdiction, contextText, caseNumber } = req.body;

        if (!title || !clientName) {
            return res.status(400).json({ error: 'Title and Client Name are required' });
        }

        const newCase = await prisma.case.create({
            data: {
                userId: req.llmUser.id,
                title,
                clientName,
                opposingParty: opposingParty || 'Unknown',
                jurisdiction: jurisdiction || 'General',
                contextText: contextText || '',
                caseNumber
            }
        });

        // AUTO-INDEX for RAG
        // We run this in background so UI is snappy
        indexer.indexCase({
            id: newCase.id,
            title: newCase.title,
            clientName: newCase.clientName,
            opposingParty: newCase.opposingParty,
            jurisdiction: newCase.jurisdiction,
            contextText: newCase.contextText
        }).catch(err => console.error(`[RAG] Auto-index failed for ${newCase.id}`, err));

        res.json({
            ...newCase,
            createdAt: newCase.createdAt.getTime()
        });
    } catch (error: any) {
        console.error('Create Case Error:', error);
        res.status(500).json({ error: 'Failed to create case' });
    }
});

// DELETE /api/cases/:id - Delete a case
router.delete('/:id', autoUserMiddleware, async (req: any, res) => {
    try {
        const { id } = req.params;

        // Ensure user owns the case
        const existing = await prisma.case.findFirst({
            where: { id, userId: req.llmUser.id }
        });

        if (!existing) {
            return res.status(404).json({ error: 'Case not found' });
        }

        await prisma.case.delete({
            where: { id }
        });

        // Note: RAG deletion is tricky with HNSWLib (append-only mostly). 
        // For now, we accept it exists in index until re-index.

        res.json({ success: true });
    } catch (error: any) {
        console.error('Delete Case Error:', error);
        res.status(500).json({ error: 'Failed to delete case' });
    }
});

export default router;
