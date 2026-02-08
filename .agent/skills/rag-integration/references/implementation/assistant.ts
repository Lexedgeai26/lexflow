import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { VectorStoreService } from './vectorStore';
import { CacheService } from './cache.service';
import { MetricsService } from './metrics.service';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { Document } from '@langchain/core/documents';
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
const formatDocs = (docs: Document[]) => docs.map(d => d.pageContent).join('\n\n');

@Injectable()
export class AssistantService {
    private model: ChatOpenAI;

    constructor(
        private configService: ConfigService,
        private vectorStoreService: VectorStoreService,
        private cacheService: CacheService,
        private metricsService: MetricsService,
    ) {
        this.model = new ChatOpenAI({
            openAIApiKey: this.configService.get<string>('OPENAI_API_KEY'),
            modelName: this.configService.get<string>('LLM_MODEL') || 'gpt-4o-mini',
            temperature: 0,
            streaming: true, // Enable streaming for faster perceived response
            maxTokens: 500, // Limit response length for speed
        });
    }

    async ask(question: string, context?: any) {
        const startTime = Date.now();
        const workspaceId = context?.workspaceId;
        let cacheHit = false;
        let error: string | undefined;

        try {
            // 1. Check cache first
            const cachedResult = this.cacheService.get(question, workspaceId);
            if (cachedResult) {
                cacheHit = true;
                this.metricsService.logQuery(question, Date.now() - startTime, cachedResult.sources.length, true);

                return {
                    answer: cachedResult.answer,
                    sources: cachedResult.sources,
                    cached: true,
                };
            }

            // 2. Enhance query with page context hints for better search
            const pageContextHints = this.getPageContextHints(context?.currentPath);
            const enhancedQuery = pageContextHints
                ? `${question} ${pageContextHints}`
                : question;

            // 3. Search for relevant documents - PRIORITIZE campaignId for filtering
            const campaignId = context?.campaignId;
            let relevantDocs;

            if (campaignId) {
                // Filter by campaign - most specific context
                relevantDocs = await this.vectorStoreService.searchByCampaign(enhancedQuery, campaignId, 5);
                console.log(`[RAG] Filtering by CampaignID: ${campaignId}`);
            } else if (workspaceId) {
                // Fall back to workspace filtering
                relevantDocs = await this.vectorStoreService.searchByWorkspace(enhancedQuery, workspaceId, 5);
                console.log(`[RAG] Filtering by WorkspaceID: ${workspaceId}`);
            } else {
                relevantDocs = await this.vectorStoreService.search(enhancedQuery, 5);
            }

            console.log(`[RAG] Query: "${question}" | Enhanced: "${enhancedQuery.substring(0, 80)}..." | Found ${relevantDocs.length} documents`);
            relevantDocs.forEach((doc, i) => {
                console.log(`[RAG] Doc ${i + 1}: Type=${doc.metadata.type}, Campaign=${doc.metadata.campaignId}, Preview=${doc.pageContent.substring(0, 50)}...`);
            });

            // 4. Format context - if empty, provide clear feedback
            const contextText = relevantDocs.length > 0
                ? formatDocs(relevantDocs)
                : 'NO RELEVANT DATA FOUND FOR THIS CAMPAIGN.';

            // 4. Extract persona from context if provided
            const persona = context?.persona || 'AI Marketing Copilot';
            const currentPath = context?.currentPath || '/';

            // 5. Create strictly grounded prompt - AI must only use retrieved context
            const prompt = PromptTemplate.fromTemplate(`
You are ${persona} for AI Growth Pilot.

CRITICAL RULES:
1. You MUST ONLY answer based on the "Retrieved Context" below.
2. If the context is empty or does not contain relevant information, say: "I couldn't find any matching data in your workspace. Try generating this content first using the relevant tool."
3. DO NOT make up information. DO NOT use general knowledge. ONLY use the context.
4. Be concise and use markdown (**bold**, lists, headers).

User Location: ${currentPath}

--- Retrieved Context ---
{retrieved_context}
--- End Context ---

Question: {question}

Answer (ONLY from context above):
    `);

            const chain = RunnableSequence.from([
                {
                    retrieved_context: () => contextText,
                    question: new RunnablePassthrough(),
                },
                prompt,
                this.model,
                new StringOutputParser(),
            ]);

            const answer = await chain.invoke(question);

            const sources = relevantDocs.map(doc => ({
                type: doc.metadata.type,
                entityType: doc.metadata.entityType,
                id: doc.metadata.id,
                originalId: doc.metadata.originalId || doc.metadata.id, // For chunked content
                campaignId: doc.metadata.campaignId,
                workspaceId: doc.metadata.workspaceId,
                preview: doc.pageContent.substring(0, 100) + '...',
                // Navigation info - using 'url' for frontend compatibility
                url: this.getRouteForEntity(doc.metadata),
                title: this.getTitleFromContent(doc.pageContent),
            }));

            // 6. Cache the result
            this.cacheService.set(question, answer, sources, workspaceId);

            // 7. Log metrics
            this.metricsService.logQuery(question, Date.now() - startTime, relevantDocs.length, false);

            return {
                answer,
                sources,
                cached: false,
            };
        } catch (err) {
            error = err.message || 'Unknown error';

            // Log error metrics
            this.metricsService.logQuery(question, Date.now() - startTime, 0, false);

            throw err;
        }
    }

    private getRouteForEntity(metadata: any): string {
        const campaignId = metadata.campaignId;
        const entityType = metadata.entityType;
        const type = metadata.type;

        // Map entity types to frontend routes
        const routeMap: Record<string, string> = {
            'campaign': `/campaigns`,
            'task': `/gtm`,
            'GTMTask': `/gtm`,
            'content': `/studio`,
            'ContentAsset': `/studio`,
            'brand_kit': `/branding`,
            'BrandKit': `/branding`,
            'audience': `/profile`,
            'AudienceProfile': `/profile`,
            'offer': `/profile`,
            'Offer': `/profile`,
            'copy': `/copy-craft`,
            'CopyProject': `/copy-craft`,
            'brand_project': `/branding`,
            'BrandProject': `/branding`,
            'email_project': `/email-marketing`,
            'EmailMarketingProject': `/email-marketing`,
            'market_insight': `/reddit-intel`, // Default, could be quora too
            'MarketInsight': `/reddit-intel`,
            'strategy': `/pricing`,
            'StrategyContent': `/pricing`,
            'pricing': `/pricing`,
            'competitive': `/competitive`,
        };

        const route = routeMap[entityType] || routeMap[type] || '/dashboard';
        return route;
    }

    private getTitleFromContent(content: string): string {
        // Extract title from content (usually first line or after first colon)
        const lines = content.trim().split('\n');
        const firstLine = lines[0] || '';

        // Try to extract title after colon
        const colonMatch = firstLine.match(/^[^:]+:\s*(.+)/);
        if (colonMatch) {
            return colonMatch[1].trim().substring(0, 60);
        }

        // Otherwise return first line
        return firstLine.trim().substring(0, 60);
    }

    /**
     * Get page-specific hints to boost search relevance based on user's current location
     */
    private getPageContextHints(currentPath?: string): string {
        if (!currentPath) return '';

        const pathLower = currentPath.toLowerCase();

        // Map page routes to relevant search terms
        const pageHints: Record<string, string> = {
            'value-proposition': 'offer value proposition benefits differentiators pricing',
            'value_proposition': 'offer value proposition benefits differentiators pricing',
            'offers': 'offer value proposition pricing model',
            'pricing': 'pricing model tier strategy package',
            'audience': 'audience profile persona demographics pain points',
            'icp': 'audience profile ideal customer persona',
            'brand': 'brand kit identity mission vision values',
            'gtm': 'go to market task readiness launch',
            'competitive': 'competitor analysis strengths weaknesses',
            'keyword': 'keyword research SEO opportunity',
            'content': 'content asset blog post social video',
            'email': 'email marketing sequence campaign',
            'copy': 'copywriting sales copy persuasion',
            'reddit': 'reddit market insight community',
            'quora': 'quora questions insights trends',
        };

        for (const [key, hints] of Object.entries(pageHints)) {
            if (pathLower.includes(key)) {
                return hints;
            }
        }

        return '';
    }
}

