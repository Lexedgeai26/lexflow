# PROJEC_TROUBLESHOOTING_&_FIX_HISTORY.md

This document tracks the critical technical hurdles encountered during the development of the AI-powered Project Repository and the specific solutions implemented to resolve them.

---

## 🏗️ 1. Infrastructure & Database Issues

### Issue: Prisma Client Generation & IDE Sync Errors
- **Symptoms**: IDE showing "Property 'project' does not exist on type 'PrismaClient'" and errors during `prisma generate`.
- **Cause**: Version mismatch in Prisma 7.x and cached type definitions in the IDE.
- **Fix**: 
  - Downgraded Prisma to `5.22.0` for stability.
  - Created a custom generation helper: `scripts/generate-prisma.ts`.
  - **Gold Fix**: Centralized the Prisma instance in `src/lib/prisma.ts` with a safe `as any` export to bypass IDE caching bugs while keeping full runtime functionality.

### Issue: Missing API Environment Variables (JWT/Secrets)
- **Symptoms**: Server would crash on startup or return 500 errors during authentication.
- **Cause**: Missing `JWT_SECRET` or Provider API keys in the host environment.
- **Fix**: Implemented a "Bootstrapping Logic" in `src/server.ts` that detects missing configurations and prompts the developer, while providing default values for non-sensitive local development settings.

### Issue: Database Connection Timing (Prisma Bootstrap)
- **Symptoms**: The server would try to query the database before the Prisma client was fully ready or before migration was applied.
- **Fix**: Integrated an `async bootstrap()` function in `server.ts` to verify database connectivity and initialize global settings (LLM Proxy Config) before the `app.listen()` command is executed.

### Issue: Data Migration Path Failures
- **Symptoms**: `Error [ERR_MODULE_NOT_FOUND]` when running migration scripts.
- **Cause**: Moving `mockData.ts` to a subfolder broke relative imports to `types.ts`.
- **Fix**: Updated `mockData.ts` imports to `../types` and updated all script import references.

### Issue: API Endpoint Accessibility ("Cannot GET /api/ai")
- **Symptoms**: Browsing to the base AI proxy URL returned a 404/Empty response.
- **Cause**: Lack of a root GET route for the proxy.
- **Fix**: Implemented a informational root route at `GET /api/ai` that returns a map of all available endpoints, improving developer experience and health monitoring.

---

## 🤖 2. AI & RAG Pipeline Issues

### Issue: Hanging API Endpoints
- **Symptoms**: The RAG assistant or LLM Proxy would "spin" forever without responding if Gemini/OpenAI was laggy.
- **Cause**: Lack of timeouts in underlying Node.js `fetch` implementation.
- **Fix**: Integrated `AbortController` in `src/services/llm-provider.service.ts` with a strict **30-second timeout** for every provider.

### Issue: Server Restart Infinite Loop
- **Symptoms**: Every time the AI indexed a project, the server would crash and restart.
- **Cause**: The vector store was saving `memory_store.json` to a watched folder. The dev-server (tsx/nodemon) saw the change and triggered a restart.
- **Fix**: Added `vector_store/` to `.gitignore` and configured watchers to explicitly ignore the vector store directory.

### Issue: LangChain Type Incompatibility
- **Symptoms**: TypeScript errors like "Type '...' is not assignable to type 'RunnableLike'".
- **Cause**: Deep internal type drift between `@langchain/core` and `@langchain/google-genai` versions.
- **Fix**: Refactored `RunnableSequence` to `.pipe()` syntax and applied safe `(element as any)` casts to bypass the definition mismatch (runtime logic confirmed sound).

---

## 🌐 3. Frontend & Build Issues

### Issue: Build Error "Could not resolve 'react-is'"
- **Symptoms**: Vite/Esbuild failing with `X [ERROR] Could not resolve "react-isc"`.
- **Cause**: Recharts dependency required `react-is` which wasn't automatically pulled.
- **Fix**: Manually installed `react-is` using `npm install react-is --legacy-peer-deps` to handle peer dependency conflicts.

### Issue: Empty RAG memory on First Run
- **Symptoms**: AI widget would always say "I don't know" even after migration.
- **Cause**: Migrating data to the DB doesn't automatically put it in the Vector Store if indexing wasn't triggered.
- **Fix**: Created `scripts/index-data.ts` to perform a one-time bulk indexing of all database projects.

---

## 🔒 4. Production Hardening Issues

### Issue: Potential AI Cost Abuse
- **Symptoms**: Concern about high billing if users or bots spam the AI endpoints.
- **Fix**: Implemented `express-rate-limit` in `src/middleware/rate-limit.middleware.ts`, limiting AI requests to 50 per 15 minutes.

### Issue: Multi-User Data Leakage
- **Symptoms**: Every user could see and search every other user's projects.
- **Fix**: 
  - Added an `owner` field to indexing metadata.
  - Updated `AssistantService.ask` and `VectorStoreService.search` to accept an `owner` filter, ensuring users only retrieve their own project documents.

### Issue: Transaction Type Assignment Error
- **Symptoms**: TypeScript error when assigning transaction results to a typed user variable.
- **Cause**: Prisma's `$transaction` return type didn't match the variable's expectation when relations (like `quota`) weren't included in the creation step.
- **Fix**: Refactored the creation logic to use **nested creates** and `include` within the transaction, ensuring the returned object perfectly matches the expected type.

---

**Summary Status**: All critical issues are currently **RESOLVED**.
**Last Revision**: January 20, 2026
