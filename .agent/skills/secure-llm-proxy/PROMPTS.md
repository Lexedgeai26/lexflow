# Secure LLM Proxy - Prompt Templates

Chronological prompts to guide AI agents through implementing a production-ready Secure LLM Proxy for multi-provider support and usage tracking.

---

## 🚀 Quick Start

### Prompt 0: Implement Secure LLM Proxy FULLY
```
Implement a Secure LLM Proxy into my existing project FULLY. Execute ALL steps automatically.

Project: [PROJECT_PATH]
Existing database: PostgreSQL at [HOST]:[PORT]

⚠️ CRITICAL INSTRUCTIONS:
1. USE the secure-llm-proxy skill.
2. DO NOT stop to ask "what would you like to do next?"
3. EXECUTE the full implementation pipeline automatically.
4. APPEND the proxy models to my existing prisma/schema.prisma.
5. Create all middleware, routes, and services.
6. Report completion with a list of all files created.

GO! Execute all steps now.
```

---

## Phase 1: Schema & Infrastructure

### Prompt 1: Add Database Models
```
Add the LLM Proxy models to my existing prisma/schema.prisma from secure-llm-proxy/references/implementation/schema.prisma.

Run migrations to apply the changes:
npx prisma migrate dev --name add_llm_proxy_tables
```

### Prompt 2: Initialize Configuration
```
Create the proxy configuration file and update .env with necessary keys for Gemini and OpenAI.
```

---

## Phase 2: Core Implementation

### Prompt 3: Create Middleware & Routes
```
Implement the core proxy logic:
- Create src/middleware/llm-proxy.middleware.ts
- Create src/routes/llm-proxy.routes.ts
- Create src/services/llm-proxy.service.ts

Use the reference implementation as the source of truth.
```

### Prompt 4: Mount Proxy Routes
```
Mount the newly created LLM proxy routes in the main Express/NestJS application entry point (e.g., src/server.ts) at the /api/ai prefix.
```

---

## Phase 3: Verification

### Prompt 5: Test Proxy Endpoints
```
Verify the implementation:
1. Test a proxied call to Gemini.
2. Test a proxied call to OpenAI.
3. Verify that usage is correctly logged in the database.
4. Check that unauthorized requests are blocked.
```

---

## Quick Copy-Paste One-Liners

1. **Full Integration**: `Use secure-llm-proxy to add a production-ready LLM proxy with usage tracking`
2. **Schema Upgrade**: `Add LLM proxy tables to existing Prisma schema`
3. **Add Provider**: `Add support for [PROVIDER] to the existing LLM proxy`
4. **Test Proxy**: `Verify LLM proxy endpoints and usage logging`

---

**Part of ASG AI S2PROD Framework**  
**Powered by [AIShift](https://aishift.dev/)**
