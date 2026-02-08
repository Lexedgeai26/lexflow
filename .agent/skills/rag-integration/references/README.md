# RAG Module - Reference Implementation

**Source:** `/Users/chiragahmedabadi/dev/AIGrowthPilot/backend/src/rag/`

This is a production-tested RAG (Retrieval-Augmented Generation) module using LangChain that provides:
- ✅ Vector-based semantic search
- ✅ Document indexing for multiple entity types
- ✅ LangChain LLM integration
- ✅ Response caching
- ✅ Workspace/Campaign filtering
- ✅ Metrics and monitoring

## Architecture

```
rag/
├── assistant.ts        (RAG assistant with LangChain)
├── cache.service.ts    (Response caching)
├── config.ts           (Configuration)
├── embeddings.ts       (OpenAI embeddings service)
├── indexer.ts          (Multi-entity document indexer)
├── metrics.service.ts  (Query metrics tracking)
├── rag.controller.ts   (REST API endpoints)
├── rag.module.ts       (NestJS module)
└── vectorStore.ts      (HNSWLib vector store)
```

## Key Features

### Vector Store
Uses HNSWLib (local file-based) for vector storage:
- Fast similarity search
- Persistent storage to disk
- No external service required

### Multi-Entity Indexing
Indexes multiple entity types:
- Campaigns
- Tasks (GTM)
- Content Assets
- Brand Kits
- Audience Profiles
- Offers/Value Propositions
- Copy Projects
- Email Projects
- Market Insights
- Strategy Documents

### LangChain Integration
- `@langchain/openai` - ChatOpenAI for responses
- `@langchain/core` - Prompts, parsers, documents
- `@langchain/community/vectorstores/hnswlib` - Vector storage

### Caching
- SHA256-based query hashing
- 4-hour TTL
- Workspace-scoped caching
- LRU eviction (5000 entries max)

## API Endpoints

- `POST /api/rag/ask` - Ask a question with RAG
- `GET /api/rag/stats` - Get vector store statistics

## Usage

```typescript
// Frontend call
const response = await fetch('/api/rag/ask', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question: 'What is my pricing strategy?',
    context: {
      workspaceId: 'ws-123',
      campaignId: 'camp-456',
      currentPath: '/pricing',
      persona: 'Marketing Expert',
    },
  }),
});

// Response
{
  "answer": "Based on your documents...",
  "sources": [
    {
      "type": "strategy",
      "entityType": "StrategyContent",
      "id": "...",
      "preview": "...",
      "url": "/pricing"
    }
  ],
  "cached": false
}
```

## Environment Variables

```bash
# Required
OPENAI_API_KEY=your-openai-key

# Optional
LLM_MODEL=gpt-4o-mini
VECTOR_STORE_PATH=./vector_store
```

## Files Included

1. **assistant.ts** - Main RAG assistant using LangChain
2. **vectorStore.ts** - HNSWLib vector store management
3. **embeddings.ts** - OpenAI embeddings service
4. **indexer.ts** - Multi-entity document indexer
5. **cache.service.ts** - Response caching
6. **metrics.service.ts** - Query metrics tracking
7. **rag.controller.ts** - REST API controller
8. **rag.module.ts** - NestJS module
9. **config.ts** - Configuration helper

## Integration Steps

1. Copy all files to `src/rag/`
2. Import `RagModule` in `app.module.ts`
3. Configure OpenAI API key
4. Call `indexer.indexXxx()` when entities are created/updated
5. Frontend calls `/api/rag/ask` for AI assistance

## Indexing Example

```typescript
// In your entity service
constructor(private indexerService: IndexerService) {}

async createCampaign(data: CreateCampaignDto) {
  const campaign = await this.prisma.campaign.create({ data });
  
  // Index for RAG
  await this.indexerService.indexCampaign(campaign);
  
  return campaign;
}
```

---

**Powered by [AIShift](https://aishift.dev/)**

