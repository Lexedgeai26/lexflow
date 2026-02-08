# RAG Integration - Prompt Templates

Simple, chronological prompts to guide AI agents through integrating a production-ready RAG (Retrieval-Augmented Generation) module.

---

## 🚀 Quick Start

### Prompt 0: Integrate RAG FULLY
```
Integrate RAG (Retrieval-Augmented Generation) into my project FULLY. Execute ALL steps automatically.

Project: [PROJECT_PATH]
Existing database: PostgreSQL at [HOST]:[PORT]

⚠️ CRITICAL INSTRUCTIONS:
1. USE the rag-integration skill.
2. DO NOT stop to ask "what would you like to do next?"
3. EXECUTE the full implementation pipeline automatically.
4. Read references from rag-integration/references/ and IMPLEMENT everything.
5. Report completion with a list of all files created.

GO! Execute all steps now.
```

---

## Phase 1: Analysis & Preparation

### Prompt 1: Analyze Existing Code
```
Analyze my existing project to prepare for RAG integration:
- File structure
- Package.json dependencies
- Existing database schema
- Existing UI components (search/chat)

Report findings before proceeding.
```

---

## Phase 2: Implementation

### Prompt 2: Core Services Setup
```
Implement RAG core services using references from rag-integration/references/implementation:
- embeddings.ts
- vectorStore.ts
- assistant.ts
- indexer.ts

Test that the services initialize correctly.
```

### Prompt 3: Controller & Module Integration
```
Create the RAG controller and module, then register them in the main application module.

Update .env with:
- GEMINI_API_KEY
- LLM_MODEL
- EMBEDDING_MODEL
- VECTOR_STORE_PATH
```

---

## Phase 3: Integration & Testing

### Prompt 4: Update Existing Services
```
Update my existing services to use the newly created IndexerService for automatic entity indexing.

Entities to index:
- [LIST_ENTITIES]
```

### Prompt 5: Verify Integration
```
Verify the RAG implementation:
1. Check that the /api/rag/stats endpoint returns correctly.
2. Test a sample query via /api/rag/ask.
3. Verify that new entities are being indexed in the vector store.
```

---

## Quick Copy-Paste One-Liners

1. **Full Integration**: `Use rag-integration to integrate a complete RAG module with automatic indexing`
2. **Analysis**: `Analyze codebase for RAG integration readiness`
3. **Index Entities**: `Update services to index [ENTITIES] for RAG search`
4. **Test RAG**: `Verify RAG endpoints and vector store status`

---

**Part of ASG AI S2PROD Framework**  
**Powered by [AIShift](https://aishift.dev/)**
