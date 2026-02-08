
import { LegalProject, LegalContext, SkillDefinition, AnalysisResult, ChatMessage } from '../types';

const API_BASE = '/api/ai';

export const analyzeDocument = async (
    text: string,
    matterType: string,
    activeSkills: SkillDefinition[],
    context: LegalContext,
    llmConfig?: { provider?: string; apiKey?: string }
): Promise<AnalysisResult> => {
    try {
        const response = await fetch(`${API_BASE}/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, matterType, activeSkills, context, llmConfig })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Analysis failed');
        }

        return await response.json();
    } catch (error) {
        console.error("Analysis Error:", error);
        throw error;
    }
};

export const chatWithProject = async (
    project: LegalProject,
    context: LegalContext,
    message: string,
    history: ChatMessage[] = [],
    onChunk: (text: string) => void,
    llmConfig?: { provider?: string; apiKey?: string }
) => {
    const docContents = project.documents.map(d => `Document Name: ${d.name}\nContent:\n${d.content}`).join('\n\n');
    const analysisSummary = project.analysis ? `Analysis Summary: ${project.analysis.summary}\nOverall Risk: ${project.analysis.overallRisk}\nRisk Score: ${project.analysis.riskScore}` : 'No analysis performed yet.';

    try {
        const response = await fetch(`${API_BASE}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                projectName: project.name,
                documentContent: docContents,
                analysisSummary,
                context,
                message,
                history,
                llmConfig
            })
        });

        if (!response.ok) {
            throw new Error('Chat request failed');
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('No stream reader available');

        const decoder = new TextDecoder();
        let fullText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            fullText += chunk;
            onChunk(fullText);
        }

        // Final flush
        fullText += decoder.decode();
        return fullText;

    } catch (error) {
        console.error("Chat Error:", error);
        throw error;
    }
};

export const validateApiKey = async (provider: string, apiKey: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE}/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ provider, apiKey })
        });
        if (!response.ok) return false;
        const data = await response.json();
        return data.valid === true;
    } catch (error) {
        console.error("Validation Error:", error);
        return false;
    }
};
