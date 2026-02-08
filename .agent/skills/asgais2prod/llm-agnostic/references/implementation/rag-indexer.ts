
import { Document } from "@langchain/core/documents";
import { VectorStoreService } from "./vectorStore";

export class IndexerService {
    private static instance: IndexerService;
    private vectorStore: VectorStoreService;

    private constructor() {
        this.vectorStore = VectorStoreService.getInstance();
    }

    public static getInstance(): IndexerService {
        if (!IndexerService.instance) {
            IndexerService.instance = new IndexerService();
        }
        return IndexerService.instance;
    }

    /**
     * Index a complete Legal Case
     */
    async indexCase(caseData: any) {
        if (!caseData || !caseData.id) return;

        console.log(`[RAG] Indexing Case: ${caseData.title}`);

        const docs: Document[] = [];

        // 1. Context Document
        if (caseData.contextText) {
            docs.push(new Document({
                pageContent: `CASE CONTEXT: ${caseData.contextText}\n\nClient: ${caseData.clientName}\nOpponent: ${caseData.opposingParty}\nJurisdiction: ${caseData.jurisdiction}`,
                metadata: {
                    id: caseData.id,
                    type: 'case_files',
                    title: caseData.title,
                    entityId: caseData.id,
                    createdAt: new Date().toISOString()
                }
            }));
        }

        // 2. Add to Vector Store
        if (docs.length > 0) {
            await this.vectorStore.addDocuments(docs);
        }
    }

    /**
     * Generic Text Indexer
     */
    async indexText(text: string, metadata: any) {
        const doc = new Document({
            pageContent: text,
            metadata: {
                ...metadata,
                indexedAt: new Date().toISOString()
            }
        });
        await this.vectorStore.addDocuments([doc]);
    }
}
