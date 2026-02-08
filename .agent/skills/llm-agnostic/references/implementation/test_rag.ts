
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import { IndexerService } from "../src/server/rag/indexer";
import { AssistantService } from "../src/server/rag/assistant";

async function testRAG() {
    console.log("🚀 Starting RAG Verification Test...\n");

    const indexer = IndexerService.getInstance();
    const assistant = AssistantService.getInstance();

    try {
        // 1. Index Content
        console.log("1️⃣  Indexing Sample Data...");
        await indexer.indexText(
            "LexReply AI is a cutting-edge legal drafting tool designed for Indian advocates. It automates replies to legal notices using a secure, local-first architecture.",
            { id: "test-1", title: "About LexReply", type: "knowledge_base" }
        );
        console.log("   ✅ Indexed 'About LexReply'");

        await indexer.indexText(
            "To use the 'Auto-fill' feature, upload a PDF or Image of the opposing party's notice. The AI will extract Client Name, Jurisdiction, and Key Facts.",
            { id: "test-2", title: "How to use Auto-fill", type: "knowledge_base" }
        );
        console.log("   ✅ Indexed 'Auto-fill Feature'");

        // 2. Query
        const question = "How do I use the auto-fill feature?";
        console.log(`\n2️⃣  Asking RAG: "${question}"`);

        const result = await assistant.ask(question);

        // 3. Verify
        console.log("\n   ✅ Answer Received:");
        console.log("   ------------------------------------------------");
        console.log(result.answer);
        console.log("   ------------------------------------------------");

        console.log("\n   🔍 Citations:");
        result.sources.forEach(s => console.log(`   - [${s.type}] ${s.title}`));

    } catch (error) {
        console.error("\n❌ RAG TEST FAILED:", error);
    }
}

testRAG();
