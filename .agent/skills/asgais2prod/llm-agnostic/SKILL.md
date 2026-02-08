---
name: llm-agnostic
description: Implements a Provider-Agnostic LLM Proxy (Express.js) that routes requests to Gemini, OpenAI, or Anthropic based on model name, using a standardized "Gemini-style" frontend protocol.
---

# LLM Agnostic Proxy

**Part of ASG AI S2PROD**

This skill implements a **Universal LLM Proxy** that decouples your frontend from specific AI providers. It allows you to switch between Google Gemini, OpenAI GPT, and Anthropic Claude just by changing the `model` string, without rewriting your frontend data structures.

---

## ⚠️ CRITICAL RULES

### Rule 1: One Protocol to Rule Them All
The Frontend MUST always speak **Gemini Protocol** (`contents`, `parts`, `role`). 
- **Do not** write separate frontend services for OpenAI or Claude.
- **Do not** leak provider-specific schemas (like OpenAI `messages`) into the frontend.
The Backend Proxy is solely responsible for **Adapting** this protocol to the target provider.

### Rule 2: Dynamic Routing by Model Name
The Proxy determines the provider automatically:
- `model: "gpt-..."` -> **OpenAI**
- `model: "claude-..."` -> **Anthropic**
- `model: "gemini-..."` -> **Google**
- `provider: "..."` (Explicit override) -> **Target Provider**

### Rule 3: Centralized auth & Logging
Middleware handles Authentication, Quotas, and Logging **uniformly** across all providers.
- Usage logs track `provider`, `model`, and `tokens` regardless of the source.

### Rule 4: No LocalStorage for Business Data
**STOP** using `localStorage` for persisting business entities (e.g., Cases, Users, Chats) once the backend is live.
- `localStorage` is ONLY for the **Auth Token** (`token`) and minimal UI preferences.
- All Application Data MUST live in the PostgreSQL database.
- The Frontend MUST fetch data (e.g., `cases`) from the Backend API (`/api/cases`) on load.

---

## IMPLEMENTATION STEPS

### 1. Setup Environment
Ensure your `.env` contains keys for all providers you intend to support.
```bash
GEMINI_API_KEY=...
OPENAI_API_KEY=...
ANTHROPIC_API_KEY=...
```

### 2. The Universal Proxy Route
Implement the route that acts as the adapter. See `references/implementation/llm-proxy.routes.ts`.
- It receives `{ model, contents }`.
- It has helper functions: `generateGemini`, `generateOpenAI`, `generateAnthropic`.
- It normalizes the output to `{ text: string, usage: object }`.

### 3. Frontend Integration
Your frontend service simply calls the proxy. 
See `references/implementation/frontend-service.ts`.
```typescript
// Switch models easily:
callLLMProxy('/generate', { model: 'gpt-4o', contents: [...] });
callLLMProxy('/generate', { model: 'gemini-1.5-flash', contents: [...] });
```

### 4. RAG & Case Management Integration
The system includes a robust RAG (Retrieval-Augmented Generation) pipeline deeply integrated with Case Management.
- **Auto-Indexing**: New cases are automatically indexed into the Vector Store.
- **Context-Aware**: The RAG Assistant uses case-specific context for answers.

See `references/implementation/` for RAG components (`rag-*` files) and `cases.routes.ts`.

### 5. Verification
Always verify the integration using a script that tests the "cross-provider" capability.
See `references/implementation/test_openai.ts` and `references/implementation/test_rag.ts`.

---

## REFERENCE FILES
*(Located in `references/implementation/`)*

| File | Purpose |
|------|---------|
| `llm-proxy.routes.ts` | **The Core Adapter.** Contains the multi-provider routing logic. |
| `llm-proxy.middleware.ts` | **The Guard.** Handles Auth, User Creation, and Usage Logging. |
| `rag.routes.ts` | **RAG API.** Endpoints for `/ask`, `/index`, and `/stats`. |
| `cases.routes.ts` | **Case Management.** CRUD for cases + **Auto-Indexing** triggers. |
| `rag-indexer.ts` | **The Librarian.** Logic to convert Cases into Vector Documents. |
| `rag-vectorstore.ts` | **The Vault.** Manages the HNSWLib vector index persistence. |
| `rag-assistant.ts` | **The Brain.** Orchestrates retrieval and generation (RAG loop). |
| `server-index.ts` | **The Entry Point.** Mounts all routes (`/api/ai`, `/api/rag`, `/api/cases`). |
| `schema.prisma` | **The Data Model.** Defines Users, Quotas, and **Cases**. |
| `frontend-service.ts` | **The Client.** Frontend integration for AI and RAG calls. |
| `auth.routes.ts` | **The Key.** Issues JWTs for access. |
| `App.tsx` | **The UI.** Reference implementation of the Legal Copilot integration. |

---

**Powered by [AIShift](https://aishift.dev/)** - Accelerate Your Development 10× Faster with AI

Copyright © 2026 AIShift. All rights reserved.
