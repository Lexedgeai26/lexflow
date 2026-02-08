
import { LLMProvider, AnalysisResult, SkillDefinition, LegalContext, ChatMessage } from "./types.js";
import { GeminiProvider } from "./providers/GeminiProvider.js";
import { OpenAIProvider } from "./providers/OpenAIProvider.js";
import { AnthropicProvider } from "./providers/AnthropicProvider.js";

export enum AIProviderType {
    GEMINI = 'gemini',
    OPENAI = 'openai',
    ANTHROPIC = 'claude'
}

export class AIService {

    private getProvider(type: string = AIProviderType.GEMINI, apiKey?: string): LLMProvider {
        const trimmedKey = apiKey?.trim();
        switch (type) {
            case AIProviderType.GEMINI:
                return new GeminiProvider(trimmedKey);
            case AIProviderType.OPENAI:
                return new OpenAIProvider(trimmedKey);
            case AIProviderType.ANTHROPIC:
                return new AnthropicProvider(trimmedKey);
            default:
                return new GeminiProvider(trimmedKey);
        }
    }

    async analyzeDocument(
        text: string,
        matterType: string,
        activeSkills: SkillDefinition[],
        context: LegalContext,
        llmConfig?: { provider?: string; apiKey?: string }
    ): Promise<AnalysisResult> {
        const provider = this.getProvider(llmConfig?.provider, llmConfig?.apiKey);
        return provider.analyzeDocument(text, matterType, activeSkills, context);
    }

    async chatWithProject(
        projectName: string,
        documentContent: string,
        analysisSummary: string,
        context: LegalContext,
        message: string,
        history: ChatMessage[],
        llmConfig?: { provider?: string; apiKey?: string }
    ): Promise<AsyncGenerator<string>> {
        const provider = this.getProvider(llmConfig?.provider, llmConfig?.apiKey);
        const stream = await provider.chatWithProject(
            projectName,
            documentContent,
            analysisSummary,
            context,
            message,
            history
        );

        if (Symbol.asyncIterator in stream) {
            return stream as AsyncGenerator<string>;
        }

        return stream as AsyncGenerator<string>;
    }

    async validateKey(providerType?: string, apiKey?: string): Promise<boolean> {
        const provider = this.getProvider(providerType, apiKey);
        return provider.validateKey();
    }
}

export const aiService = new AIService();
