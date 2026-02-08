import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { EmbeddingsService } from './embeddings';
import { Document } from '@langchain/core/documents';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VectorStoreService implements OnModuleInit {
    private vectorStore: HNSWLib | null = null;
    private readonly storePath: string;

    constructor(
        private configService: ConfigService,
        private embeddingsService: EmbeddingsService,
    ) {
        this.storePath = this.configService.get<string>('VECTOR_STORE_PATH') || './vector_store';
    }

    async onModuleInit() {
        await this.ensureStore();
    }

    private async ensureStore() {
        const embeddings = this.embeddingsService.getEmbeddings();

        if (fs.existsSync(path.join(this.storePath, 'docstore.json'))) {
            this.vectorStore = await HNSWLib.load(this.storePath, embeddings);
        } else {
            // Create an initial store with a dummy document if it doesn't exist
            // HNSWLib needs at least one document to be initialized
            this.vectorStore = await HNSWLib.fromDocuments(
                [new Document({ pageContent: "Marketing Assistant Initialized", metadata: { type: "system" } })],
                embeddings
            );
            await this.vectorStore.save(this.storePath);
        }
    }

    async addDocuments(docs: Document[]) {
        if (!this.vectorStore) await this.ensureStore();
        await this.vectorStore!.addDocuments(docs);
        await this.vectorStore!.save(this.storePath);
    }

    async search(query: string, k = 5) {
        if (!this.vectorStore) await this.ensureStore();
        return this.vectorStore!.similaritySearch(query, k);
    }

    async searchByWorkspace(query: string, workspaceId: string, k = 5) {
        if (!this.vectorStore) await this.ensureStore();

        // Search with workspace filter
        const results = await this.vectorStore!.similaritySearch(query, k * 3); // Get more results

        // Filter by workspace in memory (since HNSWLib doesn't support native filtering)
        const filtered = results.filter(doc =>
            doc.metadata.workspaceId === workspaceId
        ).slice(0, k);

        return filtered;
    }

    async searchByCampaign(query: string, campaignId: string, k = 5) {
        if (!this.vectorStore) await this.ensureStore();

        // Search with campaign filter
        const results = await this.vectorStore!.similaritySearch(query, k * 4);

        // Filter by campaignId in memory
        const filtered = results.filter(doc =>
            doc.metadata.campaignId === campaignId || doc.metadata.id === campaignId
        ).slice(0, k);

        return filtered;
    }

    /**
     * Delete all documents matching an entity ID
     * Since HNSWLib doesn't support native deletion, we rebuild the store without the deleted docs
     */
    async deleteByEntityId(entityId: string): Promise<boolean> {
        if (!this.vectorStore) await this.ensureStore();

        try {
            // Get all documents from the docstore
            const docstorePath = path.join(this.storePath, 'docstore.json');
            if (!fs.existsSync(docstorePath)) {
                console.log('[VectorStore] No docstore found, nothing to delete');
                return false;
            }

            const docstoreData = JSON.parse(fs.readFileSync(docstorePath, 'utf-8'));
            const allDocs: Document[] = [];
            let deletedCount = 0;

            // Filter out documents with the matching entity ID
            for (const [_key, docData] of docstoreData) {
                const doc = docData as any;
                if (doc.metadata?.id === entityId || doc.metadata?.originalId === entityId) {
                    deletedCount++;
                    continue; // Skip this document (delete it)
                }
                allDocs.push(new Document({
                    pageContent: doc.pageContent,
                    metadata: doc.metadata
                }));
            }

            if (deletedCount === 0) {
                console.log(`[VectorStore] No documents found with ID: ${entityId}`);
                return false;
            }

            // Rebuild the store without deleted documents
            await this.rebuildStore(allDocs);
            console.log(`[VectorStore] Deleted ${deletedCount} documents with ID: ${entityId}`);
            return true;
        } catch (error) {
            console.error('[VectorStore] Delete failed:', error);
            return false;
        }
    }

    /**
     * Delete all documents matching a filter criteria
     */
    async deleteByFilter(filter: { campaignId?: string; type?: string; entityType?: string }): Promise<number> {
        if (!this.vectorStore) await this.ensureStore();

        try {
            const docstorePath = path.join(this.storePath, 'docstore.json');
            if (!fs.existsSync(docstorePath)) {
                return 0;
            }

            const docstoreData = JSON.parse(fs.readFileSync(docstorePath, 'utf-8'));
            const allDocs: Document[] = [];
            let deletedCount = 0;

            for (const [_key, docData] of docstoreData) {
                const doc = docData as any;
                const meta = doc.metadata || {};

                // Check if document matches any filter criteria
                let shouldDelete = false;
                if (filter.campaignId && meta.campaignId === filter.campaignId) shouldDelete = true;
                if (filter.type && meta.type === filter.type) shouldDelete = true;
                if (filter.entityType && meta.entityType === filter.entityType) shouldDelete = true;

                if (shouldDelete && Object.keys(filter).length > 0) {
                    // If multiple filters, all must match
                    let allMatch = true;
                    if (filter.campaignId && meta.campaignId !== filter.campaignId) allMatch = false;
                    if (filter.type && meta.type !== filter.type) allMatch = false;
                    if (filter.entityType && meta.entityType !== filter.entityType) allMatch = false;

                    if (allMatch) {
                        deletedCount++;
                        continue;
                    }
                }

                allDocs.push(new Document({
                    pageContent: doc.pageContent,
                    metadata: doc.metadata
                }));
            }

            if (deletedCount > 0) {
                await this.rebuildStore(allDocs);
                console.log(`[VectorStore] Deleted ${deletedCount} documents matching filter`);
            }

            return deletedCount;
        } catch (error) {
            console.error('[VectorStore] Delete by filter failed:', error);
            return 0;
        }
    }

    /**
     * Rebuild the vector store with a new set of documents
     */
    private async rebuildStore(docs: Document[]) {
        const embeddings = this.embeddingsService.getEmbeddings();

        // Ensure we have at least one document
        if (docs.length === 0) {
            docs.push(new Document({
                pageContent: "Marketing Assistant Initialized",
                metadata: { type: "system" }
            }));
        }

        // Remove old store
        if (fs.existsSync(this.storePath)) {
            fs.rmSync(this.storePath, { recursive: true, force: true });
        }

        // Create new store with remaining documents
        this.vectorStore = await HNSWLib.fromDocuments(docs, embeddings);
        await this.vectorStore.save(this.storePath);
    }

    async clearStore() {
        if (fs.existsSync(this.storePath)) {
            fs.rmSync(this.storePath, { recursive: true, force: true });
        }
        await this.ensureStore();
    }

    /**
     * Get count of documents by type (for debugging)
     */
    async getDocumentCounts(): Promise<Record<string, number>> {
        if (!this.vectorStore) await this.ensureStore();

        const docstorePath = path.join(this.storePath, 'docstore.json');
        if (!fs.existsSync(docstorePath)) {
            return {};
        }

        const docstoreData = JSON.parse(fs.readFileSync(docstorePath, 'utf-8'));
        const counts: Record<string, number> = {};

        for (const [_key, docData] of docstoreData) {
            const doc = docData as any;
            const type = doc.metadata?.entityType || doc.metadata?.type || 'unknown';
            counts[type] = (counts[type] || 0) + 1;
        }

        return counts;
    }
}

