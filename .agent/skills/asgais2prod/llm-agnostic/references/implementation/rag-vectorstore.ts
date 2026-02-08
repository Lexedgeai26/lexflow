
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { Document } from "@langchain/core/documents";
import { EmbeddingService } from "./embeddings";
import path from "path";
import fs from "fs";

const VECTOR_STORE_PATH = process.env.VECTOR_STORE_PATH || "./vector_store";

export class VectorStoreService {
    private static instance: VectorStoreService;
    private vectorStore: HNSWLib | null = null;
    private embeddingService: EmbeddingService;
    private isInitialized = false;

    private constructor() {
        this.embeddingService = EmbeddingService.getInstance();
        this.initialize();
    }

    public static getInstance(): VectorStoreService {
        if (!VectorStoreService.instance) {
            VectorStoreService.instance = new VectorStoreService();
        }
        return VectorStoreService.instance;
    }

    private async initialize() {
        if (this.isInitialized) return;

        try {
            if (fs.existsSync(path.join(VECTOR_STORE_PATH, "args.json"))) {
                console.log("[RAG] Loading existing vector store...");
                this.vectorStore = await HNSWLib.load(
                    VECTOR_STORE_PATH,
                    this.embeddingService.model
                );
            } else {
                console.log("[RAG] Creating new vector store...");
                // Initialize with dummy doc to create structure
                this.vectorStore = await HNSWLib.fromTexts(
                    ["Initial Index"],
                    [{ id: "init", type: "system" }],
                    this.embeddingService.model
                );
                await this.vectorStore.save(VECTOR_STORE_PATH);
            }
            this.isInitialized = true;
            console.log("[RAG] Vector Store Initialized.");
        } catch (err) {
            console.error("[RAG] Failed to initialize Vector Store:", err);
        }
    }

    async addDocuments(docs: Document[]) {
        if (!this.vectorStore) await this.initialize();
        if (!this.vectorStore) throw new Error("Vector Store not initialized");

        await this.vectorStore.addDocuments(docs);
        await this.vectorStore.save(VECTOR_STORE_PATH);
        console.log(`[RAG] Added ${docs.length} documents to index.`);
    }

    async search(query: string, k = 4): Promise<Document[]> {
        if (!this.vectorStore) await this.initialize();
        if (!this.vectorStore) return [];

        return this.vectorStore.similaritySearch(query, k);
    }

    async getDocumentCounts(): Promise<Record<string, number>> {
        // HNSWLib doesn't expose a clean count, but we can verify index existence
        if (!this.vectorStore) return { total: 0 };
        return {
            indexSize: this.vectorStore.index.getCurrentCount()
        };
    }
}
