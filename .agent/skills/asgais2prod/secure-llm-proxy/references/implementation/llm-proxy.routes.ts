
import { Router, Request, Response } from 'express';
import { autoUserMiddleware, checkQuotaMiddleware, logUsage } from '../middleware/llm-proxy.middleware';

const router = Router();

// Helper for Gemini Raw REST API Call
async function generateGemini(apiKey: string, model: string, contents: any[], config: any) {
    // Determine API Version
    const apiVersion = (model.includes('gemini-3') || model.includes('thinking')) ? 'v1alpha' : 'v1beta';
    const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;

    const { tools, ...generationConfig } = config || {};
    const restPayload: any = { contents, generationConfig };
    if (tools) restPayload.tools = tools;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restPayload)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    const candidate = result.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text || '';
    const usage = result.usageMetadata || { promptTokenCount: 0, candidatesTokenCount: 0, totalTokenCount: 0 };

    return {
        text,
        raw: result,
        usage: {
            prompt: usage.promptTokenCount || 0,
            completion: usage.candidatesTokenCount || 0,
            total: usage.totalTokenCount || 0
        }
    };
}

// Helper for OpenAI (Stubbed for now, but structured)
async function generateOpenAI(apiKey: string, model: string, contents: any[], config: any) {
    // Basic adapter to convert Gemini "contents" to OpenAI "messages"
    const messages = contents.map((c: any) => ({
        role: c.role === 'model' ? 'assistant' : c.role,
        content: c.parts[0].text
    }));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: model,
            messages: messages,
            temperature: config?.temperature || 0.7
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI API Error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    return {
        text: result.choices[0].message.content,
        raw: result,
        usage: {
            prompt: result.usage.prompt_tokens,
            completion: result.usage.completion_tokens,
            total: result.usage.total_tokens
        }
    };
}

// Generate Content (Proxy) - AGNOSTIC ROUTER
router.post('/generate', autoUserMiddleware, checkQuotaMiddleware, async (req: Request, res: Response) => {
    const startTime = Date.now();
    const { contents, model, config, provider: explicitProvider } = req.body;
    const user = req.llmUser;

    try {
        const targetModel = model || 'gemini-1.5-flash';

        // Determine Provider
        let provider = 'gemini';
        if (explicitProvider) {
            provider = explicitProvider;
        } else if (targetModel.startsWith('gpt') || targetModel.startsWith('o1')) {
            provider = 'openai';
        } else if (targetModel.startsWith('claude')) {
            provider = 'anthropic';
        }

        console.log(`[LLM Proxy] Request from ${user.email} for ${targetModel} (${provider})`);

        // Adapt contents if needed (Standardizing input format)
        let finalContents: any = contents;
        if (contents && !Array.isArray(contents)) {
            if (contents.parts) {
                finalContents = [contents];
            } else {
                finalContents = [{ role: 'user', parts: [{ text: JSON.stringify(contents) }] }];
            }
        }

        let result: any;

        // Dispatch to Provider
        if (provider === 'gemini') {
            const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
            if (!apiKey) throw new Error("GEMINI_API_KEY missing");
            result = await generateGemini(apiKey.trim(), targetModel, finalContents, config);
        } else if (provider === 'openai') {
            const apiKey = process.env.OPENAI_API_KEY || '';
            if (!apiKey) throw new Error("OPENAI_API_KEY missing");
            result = await generateOpenAI(apiKey.trim(), targetModel, finalContents, config);
        } else {
            throw new Error(`Provider ${provider} not supported yet`);
        }

        // Log Success
        await logUsage(user.id, {
            provider: provider,
            model: targetModel,
            operation: 'generate',
            tokens: result.usage,
            latency: Date.now() - startTime,
            success: true,
            statusCode: 200
        });

        // Return expected format
        res.json({
            text: result.text,
            raw: result.raw
        });

    } catch (error: any) {
        console.error('[LLM Proxy] Generation Error:', error);

        // Log Failure
        await logUsage(user.id, {
            provider: 'unknown',
            model: model || 'unknown',
            operation: 'generate',
            tokens: { prompt: 0, completion: 0, total: 0 },
            latency: Date.now() - startTime,
            success: false,
            statusCode: 500,
            errorMessage: error.message
        });

        res.status(500).json({
            error: 'Generation failed',
            details: error.message
        });
    }
});

export default router;
