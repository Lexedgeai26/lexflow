
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { VectorStoreService } from "./vectorStore";
import { Document } from "@langchain/core/documents";

export class AssistantService {
    private static instance: AssistantService;
    private vectorStore: VectorStoreService;
    private model: ChatOpenAI;

    private constructor() {
        this.vectorStore = VectorStoreService.getInstance();
        this.model = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            modelName: "gpt-4o-mini", // Fast and efficient for RAG
            temperature: 0,
        });
    }

    public static getInstance(): AssistantService {
        if (!AssistantService.instance) {
            AssistantService.instance = new AssistantService();
        }
        return AssistantService.instance;
    }

    private formatDocs(docs: Document[]): string {
        return docs.map((doc, i) => `
[Source ${i + 1}]: ${doc.metadata.type || 'Document'} - ${doc.metadata.title || 'Untitled'}
${doc.pageContent}
---
`).join("\n");
    }

    async ask(question: string, contextOverride?: string): Promise<{ answer: string; sources: any[] }> {
        try {
            console.log(`[RAG] Asking: "${question}"`);

            // 1. Retrieve Context
            const relevantDocs = await this.vectorStore.search(question, 4);
            const contextText = this.formatDocs(relevantDocs);

            if (relevantDocs.length === 0) {
                console.log("[RAG] No context found.");
            }

            // 2. Construct Prompt
            const template = `
You are LexReply AI, an intelligent Legal Assistant for lawyers.

RULES:
1. Answer the question based on the "Legal Context" provided below.
2. Be professional, precise, and cite the source number (e.g. [Source 1]) where possible.
3. If the context does not contain the answer, say "I don't have enough specific legal context in the database to answer that reliably," but you may offer general legal principles if safe.
4. Do not make up facts about specific cases or statutes not in the context.

Legal Context:
{context}

Question: {question}

Answer:
`;

            const prompt = PromptTemplate.fromTemplate(template);

            // 3. Create Chain
            const chain = RunnableSequence.from([
                {
                    context: () => contextText,
                    question: new RunnablePassthrough(),
                },
                prompt,
                this.model,
                new StringOutputParser(),
            ]);

            // 4. Generate
            const answer = await chain.invoke(question);

            // 5. Format Sources for Frontend
            const sources = relevantDocs.map(doc => ({
                id: doc.metadata.id,
                title: doc.metadata.title,
                type: doc.metadata.type,
                preview: doc.pageContent.substring(0, 100) + "..."
            }));

            return { answer, sources };

        } catch (error: any) {
            console.error("[RAG] Error asking assistant:", error);
            throw new Error(`RAG Error: ${error.message}`);
        }
    }
}
