---
name: rag-integration
description: FULLY IMPLEMENT RAG (Retrieval-Augmented Generation) module using LangChain. This skill adds semantic search, document indexing, and AI-assisted Q&A. USE THE REFERENCE IMPLEMENTATION - DO NOT CREATE FROM SCRATCH.
---

# RAG Module Integration - FULL AUTO-IMPLEMENTATION

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

## 💡 THE MOOT POINT (MANDATORY PHILOSOPHY)

**THE MAIN JOB OF THIS SKILL IS REAR-END PRODUCTION UPGRADE.**

1.  **PRESERVE EXISTING UI**: NEVER create new UI components or replace existing UI screens.
2.  **BEHIND-THE-SCENES INTEGRATION**: Focus on backend indexing and API routes.
3.  **UI INTEGRATION**: If the user has an existing search/chat bar, update it surgically to use the RAG endpoint. DO NOT create a new floating widget unless specifically requested.

---

## Goal

Integrate a production-ready RAG (Retrieval-Augmented Generation) module that provides:
- ✅ Vector-based semantic search (HNSWLib)
- ✅ Multi-entity document indexing
- ✅ LangChain LLM integration (Gemini/OpenAI)
- ✅ Response caching (4-hour TTL)
- ✅ Workspace/Campaign filtering
- ✅ Metrics and monitoring

---

## 🛑 AGENT RECOVERY & STABILITY RULES (NEW)

### 1. PROVIDER SPECIFICITY OR HANG (CRITICAL)
If the project uses Gemini (Google), **DO NOT** use OpenAI as the default for RAG.
- Use `@langchain/google-genai` for both Embeddings and LLM.
- **DANGER**: Mixing OpenAI embeddings with Gemini LLM (or vice-versa) can cause hangs or silent failures if keys are missing.
- Verification: `curl -X POST ... /api/rag/ask` should return in < 5 seconds. If it hangs, check the provider SDK.

### 2. NODEMON INFINITE LOOPS
**NEVER** run `npm run dev` with HNSWLib without adding `--ignore vector_store` (or whatever the store path is) to `nodemon`.
- Symptoms: Backend restarts every time an entity is indexed.
- Fix: Update `package.json` dev script to include `--ignore vector_store`.

### 3. DIMENSION MISMATCH
If you switch embedding providers (e.g., OpenAI → Gemini), the `vector_store` directory **MUST BE DELETED** and recreated.
- Symptom: `vector store dimension mismatch` error.

---

## ⚠️ CRITICAL RULES

### Rule 1: USE REFERENCE IMPLEMENTATION - DO NOT CREATE FROM SCRATCH

**The complete, production-tested code is in `references/implementation/`**

**MANDATORY: Read these files FIRST:**
```bash
cat references/README.md
cat references/implementation/assistant.ts
cat references/implementation/vectorStore.ts
cat references/implementation/indexer.ts
cat references/implementation/embeddings.ts
cat references/implementation/cache.service.ts
cat references/implementation/metrics.service.ts
cat references/implementation/rag.controller.ts
cat references/implementation/rag.module.ts
```

Before making changes:
```bash
# Check existing code topology
find . -maxdepth 2 -not -path '*/.*' -type d
cat package.json | grep -E "dependencies|devDependencies" -A 20
grep -r "rag\|RAG\|vector\|embedding" . --exclude-dir=node_modules 2>/dev/null | head -10
```

**Report to user:**
"Discovery Proof: I have found the project root at `[path]`. Topology: `[Flat/Split]`. I will implement RAG in `[folder]`."

---

Do NOT ask "what would you like to do next?" - EXECUTE EVERYTHING.

### Rule 4: WORKSPACE LOCKDOWN & DISCOVERY PROOF

- ✅ **MANDATORY**: Map the TRUE structure of the workspace via recursive `ls -R` (depth 2).
- ✅ **MANDATORY: DISCOVERY PROOF**: Before Step 2, you MUST list exactly what folders and files you found. "Discovery Proof: I found no `src` folder; assuming a flat mono-repo. I will create `rag` in the root `/rag`."

---

## EXECUTION PIPELINE

### Step 1: Read Reference Implementation [AUTO]
```bash
echo "📚 [1/10] Reading reference implementation..."
cat references/implementation/assistant.ts
cat references/implementation/vectorStore.ts
cat references/implementation/indexer.ts
```

### Step 2: Install Dependencies [AUTO]
```bash
echo "📦 [2/10] Installing RAG dependencies..."
# Core RAG
npm install @langchain/core @langchain/community hnswlib-node

# Provider specific (Check .env for primary provider)
# For Gemini:
npm install @langchain/google-genai
# For OpenAI:
npm install @langchain/openai
```

### Step 3: Create RAG Directory [AUTO]
```bash
echo "📁 [3/10] Creating RAG directory..."
mkdir -p src/rag
mkdir -p vector_store
```

### Step 4: Create Core Services [AUTO]
```bash
echo "⚙️ [4/10] Creating core services..."
```

Copy files from `references/implementation/`:
- `embeddings.ts` → `src/rag/embeddings.ts`
- `vectorStore.ts` → `src/rag/vectorStore.ts`
- `assistant.ts` → `src/rag/assistant.ts`

### Step 5: Create Indexer Service [AUTO]
```bash
echo "📑 [5/10] Creating indexer service..."
```

Copy `references/implementation/indexer.ts` → `src/rag/indexer.ts`

### Step 6: Create Support Services [AUTO]
```bash
echo "🔧 [6/10] Creating support services..."
```

Copy files:
- `cache.service.ts` → `src/rag/cache.service.ts`
- `metrics.service.ts` → `src/rag/metrics.service.ts`
- `config.ts` → `src/rag/config.ts`

### Step 7: Create Controller [AUTO]
```bash
echo "🌐 [7/10] Creating controller..."
```

Copy `references/implementation/rag.controller.ts` → `src/rag/rag.controller.ts`

### Step 8: Create Module [AUTO]
```bash
echo "📦 [8/10] Creating module..."
```

Copy `references/implementation/rag.module.ts` → `src/rag/rag.module.ts`

### Step 9: Register Module [AUTO]
```bash
echo "🔗 [9/10] Registering module in app.module.ts..."
```

Add to `src/app.module.ts`:
```typescript
import { RagModule } from './rag/rag.module';

@Module({
  imports: [
    // ... existing imports
    RagModule,
  ],
})
```

### Step 10: Update Environment Variables & Scripts [AUTO]
```bash
echo "⚙️ [10/10] Updating .env and package.json..."
```

Add to `.env`:
```bash
# RAG Configuration
# If Gemini:
GEMINI_API_KEY=your-key
LLM_MODEL=gemini-2.0-flash
EMBEDDING_MODEL=embedding-001

# If OpenAI:
OPENAI_API_KEY=your-key
LLM_MODEL=gpt-4o-mini
EMBEDDING_MODEL=text-embedding-3-small

VECTOR_STORE_PATH=./vector_store
```

**MANDATORY**: Update `package.json`:
```json
"dev": "nodemon --ignore vector_store --exec ts-node src/index.ts"
```

---

## Report Completion

```
🎉 RAG MODULE IMPLEMENTATION COMPLETE!

Files created:
- src/rag/embeddings.ts
- src/rag/vectorStore.ts
- src/rag/assistant.ts
- src/rag/indexer.ts
- src/rag/cache.service.ts
- src/rag/metrics.service.ts
- src/rag/config.ts
- src/rag/rag.controller.ts
- src/rag/rag.module.ts
- src/app.module.ts (modified)
- .env (modified)
- vector_store/ (created)

API Endpoints available:
- POST /api/rag/ask - Ask a question with RAG
- GET /api/rag/stats - Get vector store statistics

Usage in other services:
- Import IndexerService to index entities
- Import AssistantService for programmatic Q&A

Test: curl http://localhost:3000/api/rag/stats
```

---

## Indexing Entities

After integration, inject `IndexerService` in your entity services:

```typescript
import { IndexerService } from '../rag/indexer';

@Injectable()
export class CampaignService {
  constructor(private indexer: IndexerService) {}

  async create(data) {
    const campaign = await this.prisma.campaign.create({ data });
    await this.indexer.indexCampaign(campaign); // Auto-index for RAG
    return campaign;
  }
}
```

Supported entity types:
- `indexCampaign(campaign)`
- `indexTask(task)`
- `indexContentAsset(asset)`
- `indexBrandKit(brandKit)`
- `indexAudience(audience)`
- `indexOffer(offer)`
- `indexCopyProject(copy)`
- `indexEmailProject(email)`
- `indexMarketInsight(insight)`

---

## DO NOT DO THIS

❌ Generate code from scratch
❌ Ask "what would you like to do next?"
❌ Stop after creating one file
❌ Skip reading reference implementation

## DO THIS INSTEAD

✅ Read ALL reference files first
✅ Copy implementation files exactly
✅ Execute all 10 steps automatically
✅ Report completion with file list

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development

