# ASG AI S2PROD - Prompt Template for Google Antigravity

**Copy and paste these templates to ensure Antigravity EXECUTES FULLY (not just configures)**

## 💡 THE MOOT POINT (MANDATORY PHILOSOPHY)

**THE MAIN JOB OF THIS SUITE IS REAR-END PRODUCTION UPGRADE.**

1.  **PRESERVE EXISTING UI**: DO NOT create new UI or replace existing UI screens.
2.  **SURGICAL EDITS**: Only update existing files to point to new backend features.
3.  **ANALYSIS FIRST**: Always analyze existing UI features before implementing.

---

## ⚠️ KEY POINT: EXECUTE, DON'T ASK

The most common problem is Antigravity stopping to ask "what next?" instead of completing the implementation.

**Use these prompts that explicitly tell it to EXECUTE EVERYTHING:**

---

## Template 1: FULL IMPLEMENTATION (Recommended)

```
Implement ASG AI S2PROD FULLY for my project. Execute ALL steps automatically.

Project: /Users/me/dev/lexreply
Database: PostgreSQL (local) - Create "lexreply_db" with user "postgres"

⚠️ CRITICAL INSTRUCTIONS:
1. DO NOT stop to ask "what would you like to do next?"
2. EXECUTE the full 10-step implementation pipeline automatically
3. Create the database, apply schema, create all files, mount routes
4. Only stop if there's an actual error
5. Report completion at the end with all files created

Read references from .agent/skills/*/references/ and IMPLEMENT everything.

GO! Execute all steps now.
```

---

## Template 2: Add Secure LLM Proxy (EXECUTE FULLY)

```
Implement secure LLM proxy into my existing project. EXECUTE ALL STEPS AUTOMATICALLY.

Project: /Users/me/dev/lexreply
Existing database: PostgreSQL at localhost:5432

⚠️ CRITICAL - AUTO-EXECUTE ALL:
1. Read .agent/skills/secure-llm-proxy/references/ (all files)
2. APPEND 5 proxy tables to my EXISTING prisma/schema.prisma
3. Run: npx prisma migrate dev --name add_llm_proxy
4. CREATE: src/middleware/llm-proxy.middleware.ts
5. CREATE: src/routes/llm-proxy.routes.ts  
6. MOUNT routes in my existing src/server.ts at /api/ai
7. UPDATE: .env with GEMINI_API_KEY placeholder
8. TEST: Verify migration applied

DO NOT:
❌ Stop and ask "what would you like to do next?"
❌ Just create config - IMPLEMENT FULLY
❌ Replace existing code - ADD to it
❌ Generate from scratch - COPY from references

EXECUTE ALL STEPS NOW. Report completion with list of files created.
GO!
```

---

## Template 3: Make LLM Agnostic

```
Make my application LLM-agnostic using LangChain with these requirements:

⚠️ CRITICAL:
1. Analyze my EXISTING LLM calls first (grep for gemini/openai/anthropic)
2. Read reference: .agent/skills/llm-agnostic/references/
3. WRAP existing calls with LangChain abstraction (don't replace)
4. Support multiple providers: Gemini, OpenAI, Claude

My project currently uses:
- LLM Provider: [Gemini/OpenAI/Claude]
- Location of LLM calls: [File paths]
- Existing integration: [Direct API/Proxy/Other]

Show me the existing LLM calls before making changes.
```

---

## Template 4: Add RAG Module

```
Add RAG and Chat module to my project with these requirements:

⚠️ CRITICAL:
1. Read reference: .agent/skills/rag-integration/references/
2. INTEGRATE with my existing database and UI (don't create new app)
3. Use my existing vector storage or create new one
4. Add chat UI component to my existing frontend

My project setup:
- Backend: [Express/NestJS/etc at src/]
- Frontend: [React/Next.js/etc at client/]
- Database: [PostgreSQL with Prisma]
- Existing chat/AI features: [Yes/No, location]

First analyze my existing UI structure.
```

---

## Template 5: Review for Production

```
Review my code for production readiness with these checks:

⚠️ CRITICAL CHECKS:
1. No business data in localStorage (must use database)
2. No mock/hardcoded data
3. No console.log statements
4. Proper error handling
5. Input validation
6. Security best practices
7. Environment variables configured
8. Database migrations ready

Analyze these directories:
- src/
- client/
- prisma/

Report issues with specific file locations and line numbers.
```

---

## Template 6: Generate Tests

```
Generate automated tests for my EXISTING code with these requirements:

⚠️ CRITICAL:
1. Analyze my EXISTING code first to understand structure
2. Use appropriate test framework (Jest/Vitest/etc based on my project)
3. Generate tests for EXISTING features (don't test features that don't exist)
4. Include: unit tests, integration tests, E2E tests

My project uses:
- Test framework: [Jest/Mocha/Vitest/etc or "none, choose appropriate"]
- Existing features to test: [List main features]
- API endpoints: [List routes]

First, show me your understanding of my existing code structure.
```

---

## General Tips

### Always Start With:
```
Before doing anything, analyze my existing project:
- File structure
- Package.json dependencies
- Existing database schema
- Existing routes/APIs
- Existing auth system
- Existing LLM integrations

Report your findings before making changes.
```

### Always Remind:
```
Remember:
- Use .asgais2prod/ folder
- Read from .agent/skills/*/references/ folders
- Build on existing code (don't replace)
- Local database (not Docker) unless I specify
```

### If Things Go Wrong:
```
Stop! Let's reset:

1. Remove .app-to-production/ if created (wrong name)
2. Restore my original files from backup
3. Start fresh with correct approach:
   - Analyze existing project first
   - Read reference implementations
   - Build on existing code

Let's try again with the correct method.
```

---

## Quick Reference

| Correct | Wrong |
|---------|-------|
| `.asgais2prod/` | ❌ `.app-to-production/` |
| Analyze existing first | ❌ Generate from scratch |
| Read `references/` | ❌ Create new code |
| Local PostgreSQL | ❌ Assume Docker |
| Append to schema | ❌ Replace schema |
| Build on existing | ❌ Replace existing |

---

## Example Full Session

```
You: [Paste Template 1 - Initialize]

AI: Analyzing existing project...
    Found: Express.js, Prisma, existing auth
    [Shows analysis]

You: Good! Here are my PostgreSQL details:
    Host: localhost
    Port: 5432
    Database: myapp_db
    Username: postgres

AI: ✅ Configuration saved to .asgais2prod/config.json

You: [Paste Template 2 - Add Secure LLM Proxy]

AI: Reading reference implementation...
    ✅ Read schema.prisma (5 models)
    ✅ Read integration guide
    Appending to your existing schema...

You: Perfect! Continue.

AI: ✅ LLM Proxy integrated!
    - Added 5 tables to existing schema
    - Created src/routes/llm-proxy.routes.ts
    - Mounted in existing server.ts
    - Your existing code unchanged

You: [Paste Template 5 - Review]

AI: Reviewing...
    ✅ No localStorage for business data
    ⚠️ Found 2 console.log statements
    ✅ Good error handling
    
    [Shows specific issues]
```

---

**Save this file and refer to it when working with Antigravity!**

---

**Powered by [AIShift](https://aishift.dev/)** - Accelerate Your Development 10× Faster with AI

Copyright © 2026 AIShift. All rights reserved.

