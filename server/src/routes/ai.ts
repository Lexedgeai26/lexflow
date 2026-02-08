import { Router } from 'express';
import { aiService } from '../services/ai/aiService.js';
import multer from 'multer';
import mammoth from 'mammoth';
import { PDFParse } from 'pdf-parse';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

// POST /api/ai/upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const fileName = req.file.originalname.toLowerCase();
        let extractedText = '';

        if (fileName.endsWith('.pdf')) {
            console.log(`[FILES] Processing PDF: ${req.file.originalname}`);
            try {
                // In this specific version of pdf-parse, it's a class and requires Uint8Array
                const binaryData = new Uint8Array(req.file.buffer);
                const parser = new (PDFParse as any)(binaryData);
                await parser.load();
                const result = await parser.getText();
                extractedText = typeof result === 'string' ? result : (result?.text || '');
                console.log(`[FILES] Extracted ${extractedText.length} characters`);
            } catch (pdfErr: any) {
                console.error("[FILES] PDF Extraction Error:", pdfErr);
                res.status(400).json({ error: pdfErr.message || "Failed to parse PDF." });
                return;
            }
        }
        else if (fileName.endsWith('.docx')) {
            const result = await mammoth.extractRawText({ buffer: req.file.buffer });
            extractedText = result.value;
        } else if (fileName.endsWith('.txt')) {
            extractedText = req.file.buffer.toString('utf8');
        } else {
            res.status(400).json({ error: 'Unsupported file type. Please upload PDF, DOCX, or TXT.' });
            return;
        }

        if (!extractedText.trim()) {
            res.status(400).json({ error: 'Could not extract text from file' });
            return;
        }

        res.json({ text: extractedText });
    } catch (error: any) {
        console.error('File Upload/Extraction Error:', error);
        res.status(500).json({ error: 'Failed to extract text from file' });
    }
});

// POST /api/ai/analyze
router.post('/analyze', async (req, res) => {
    try {
        const { text, matterType, activeSkills, context, llmConfig } = req.body;
        console.log(`Analyzing document: ${matterType}, Text length: ${text?.length}`);

        if (!text || !matterType || !activeSkills || !context) {
            console.warn('Missing required fields for analysis');
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const result = await aiService.analyzeDocument(text, matterType, activeSkills, context, llmConfig);
        console.log('Analysis completed successfully');
        res.json(result);
    } catch (error: any) {
        console.error('AI Service Error in Route:', error);
        res.status(500).json({ error: error.message || 'AI Analysis failed' });
    }
});

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
    try {
        const { projectName, documentContent, analysisSummary, context, message, history, llmConfig } = req.body;

        if (!message) {
            res.status(400).json({ error: 'Message is required' });
            return;
        }

        // Set headers for SSE (Server-Sent Events) or simple chunked transfer
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');

        const stream = await aiService.chatWithProject(
            projectName,
            documentContent,
            analysisSummary,
            context,
            message,
            history,
            llmConfig
        );

        for await (const chunk of stream) {
            res.write(chunk);
        }
        res.end();

    } catch (error: any) {
        console.error('AI Chat Error:', error);
        // If headers already sent, we can't send JSON error, just end stream
        if (res.headersSent) {
            res.end();
        } else {
            res.status(500).json({ error: error.message || 'AI Chat failed' });
        }
    }
});

// POST /api/ai/validate
router.post('/validate', async (req, res) => {
    try {
        const { provider, apiKey } = req.body;
        console.log(`Validating API Key for provider: ${provider}, Key length: ${apiKey?.length}`);

        if (!apiKey) {
            res.status(400).json({ error: 'API Key is required' });
            return;
        }

        const isValid = await aiService.validateKey(provider, apiKey);
        console.log(`Validation result for ${provider}: ${isValid}`);
        res.json({ valid: isValid });
    } catch (error: any) {
        console.error('AI Validation Error in Route:', error);
        res.status(500).json({ error: error.message || 'Validation failed' });
    }
});

export default router;
