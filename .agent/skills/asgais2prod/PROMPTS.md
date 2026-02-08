# LLM-Agnostic Backend with RAG - Prompt Templates

A simple, chronological list of prompts to guide AI agents through implementing an LLM-agnostic backend with RAG capabilities.

---

## Phase 1: Backend Foundation

### Prompt 1: Initialize Backend
```
Initialize app conversion for my [PROJECT_NAME] application.

I want to implement:
1. Backend server with [Express/NestJS/FastAPI]
2. Database integration with [Prisma/TypeORM/SQLAlchemy]
3. Secure LLM Proxy
4. Frontend integration

Use the ASG AI S2PROD app-init skill.
```

---

### Prompt 2: Implement LLM Proxy
```
Implement a Secure LLM Proxy with:
- JWT authentication
- Usage tracking and quota management
- Support for multiple LLM providers (Gemini, OpenAI)
- Request/response logging

Use the ASG AI S2PROD llm-proxy skill.
```

---

## Phase 2: LLM Provider Abstraction

### Prompt 3: Make Backend LLM Agnostic
```
Refactor the backend to be LLM agnostic.

Requirements:
- Abstract provider interface (BaseLLMProvider)
- Provider implementations (Gemini, OpenAI)
- Factory pattern for provider selection
- Runtime provider switching based on model name
```

---

## Phase 3: RAG Integration

### Prompt 4: Integrate RAG Pipeline
```
Integrate RAG (Retrieval-Augmented Generation) for my application.

Requirements:
1. Vector-based semantic search
2. Automatic indexing of [ENTITY_TYPES]
3. Context-aware AI responses
4. Response caching
5. API endpoints for asking questions

Use the ASG AI S2PROD rag-integration skill.
```

---

## Phase 4: Frontend Integration

### Prompt 5: Add AI Assistant Widget
```
Create an AI assistant widget for the frontend.

Requirements:
- Floating chat widget (bottom-right corner)
- Chat-style interaction
- Integration with /api/rag/ask endpoint
- Loading states and error handling
- Styled with [Tailwind/Material-UI/etc]
```

---

## Phase 5: Data Migration

### Prompt 6: Move Data to Backend
```
Migrate [DATA_TYPE] from [local storage/current location] to the backend database.

Requirements:
1. Create backend CRUD endpoints (/api/[entities])
2. Update frontend to use new API
3. Ensure new data is automatically indexed for RAG
4. Remove old storage dependencies
```

---

## Phase 6: Bug Fixes

### Prompt 7: Fix Hanging Endpoint
```
The [ENDPOINT] endpoint is not responding / hanging.

Please investigate and fix.
```

---

### Prompt 8: Fix Server Restart Loop
```
The development server keeps restarting continuously.

Please diagnose and resolve.
```

---

## Phase 7: Documentation

### Prompt 9: Update Skills Documentation
```
Update the skills documentation to include:
- Issues encountered during this implementation
- Solutions and workarounds
- Prevention strategies for future projects

Update: .agent/skills/asgais2prod/rag-integration/SKILL.md
```

---

### Prompt 10: Document Implementation
```
Document all user prompts and implementation journey in the docs/ folder.

Create a comprehensive guide for future reference.
```

---

## Quick Copy-Paste Templates

### For Any New Project

**Step 1:**
```
Initialize app conversion. I want to implement an LLM-agnostic backend with Express and Prisma. Use the ASG AI S2PROD app-init skill.
```

**Step 2:**
```
Implement Secure LLM Proxy with JWT authentication and support for Gemini and OpenAI. Use the ASG AI S2PROD llm-proxy skill.
```

**Step 3:**
```
Make the backend LLM agnostic using factory pattern and provider abstraction.
```

**Step 4:**
```
Integrate RAG pipeline with automatic entity indexing. Use the ASG AI S2PROD rag-integration skill.
```

**Step 5:**
```
Create an AI assistant widget in the frontend that connects to /api/rag/ask.
```

**Step 6:**
```
Move [my data] from [current location] to the backend database with automatic RAG indexing.
```

**Step 7 (if needed):**
```
The /api/rag/ask endpoint is not responding. Please investigate and fix.
```

**Step 8 (if needed):**
```
The server keeps restarting. Please diagnose and resolve.
```

**Step 9:**
```
Update the skills documentation with lessons learned from this implementation.
```

**Step 10:**
```
Document all prompts and implementation journey in docs/ folder.
```

---

## One-Liner Prompts

For quick copy-paste:

1. `Initialize app conversion with Express, Prisma, and LLM proxy using ASG AI S2PROD app-init skill`
2. `Implement Secure LLM Proxy with JWT auth using ASG AI S2PROD llm-proxy skill`
3. `Make backend LLM agnostic with factory pattern`
4. `Integrate RAG pipeline using ASG AI S2PROD rag-integration skill`
5. `Create AI assistant widget in frontend`
6. `Move data to backend with automatic RAG indexing`
7. `Fix hanging /api/rag/ask endpoint`
8. `Fix server restart loop`
9. `Update skills documentation with lessons learned`
10. `Document implementation journey in docs/`

---

**Document Type**: Prompt Templates  
**Version**: 1.0  
**Last Updated**: 2026-01-19
