# ASG AI S2PROD - EXECUTE NOW Template

**Copy this ENTIRE prompt to Antigravity. It will execute the full implementation.**

---

## Full Implementation Prompt (Copy Everything Below)

```
EXECUTE ASG AI S2PROD FULL IMPLEMENTATION for my project.

⚠️ CRITICAL INSTRUCTIONS - READ CAREFULLY:

1. DO NOT stop to ask "what would you like to do next?"
2. DO NOT show menu of options
3. DO NOT wait for me to type commands
4. EXECUTE ALL STEPS AUTOMATICALLY
5. Only stop if there's an actual ERROR

PROJECT DETAILS:
- Directory: [REPLACE WITH YOUR PATH, e.g., /Users/me/dev/lexreply]
- Database: PostgreSQL local, create database named: [REPLACE, e.g., lexreply_db]
- PostgreSQL user: [REPLACE, e.g., postgres]

EXECUTE THIS 10-STEP PIPELINE NOW:

[Step 1] Analyze existing project:
- List files: ls -la
- Read package.json
- Check prisma/schema.prisma
- Find existing routes in src/

[Step 2] Create database:
- Run: createdb [database_name]

[Step 3] Read reference implementations:
- cat .agent/skills/secure-llm-proxy/references/implementation/schema.prisma
- cat .agent/skills/secure-llm-proxy/references/INTEGRATION_GUIDE.md

[Step 4] Update prisma/schema.prisma:
- APPEND (don't replace) the 5 LLM Proxy models from the reference
- Keep all existing models

[Step 5] Run migration:
- npx prisma migrate dev --name add_llm_proxy_tables
- npx prisma generate

[Step 6] Create middleware file:
- Create: src/middleware/llm-proxy.middleware.ts
- Copy content pattern from references

[Step 7] Create routes file:
- Create: src/routes/llm-proxy.routes.ts
- Copy content pattern from references

[Step 8] Mount routes in server:
- Edit: src/server.ts (or src/app.ts)
- Add: import llmProxyRoutes from './routes/llm-proxy.routes'
- Add: app.use('/api/ai', llmProxyRoutes)

[Step 9] Update .env:
- Add: GEMINI_API_KEY=your-key-here
- Add: GEMINI_MODEL=gemini-2.0-flash-exp

[Step 10] Report completion:
- List all files created/modified
- Show test command: curl localhost:3000/api/ai/health

🚀 START EXECUTING NOW. DO NOT ASK QUESTIONS. JUST DO IT.
```

---

## Shorter Version (If Full Version Doesn't Work)

```
EXECUTE secure LLM proxy integration for /Users/me/dev/lexreply

DO NOT ASK WHAT TO DO. EXECUTE:
1. createdb lexreply_db
2. Read .agent/skills/secure-llm-proxy/references/implementation/schema.prisma
3. APPEND 5 proxy models to prisma/schema.prisma
4. npx prisma migrate dev --name proxy
5. Create src/middleware/llm-proxy.middleware.ts (from reference)
6. Create src/routes/llm-proxy.routes.ts (from reference)
7. Add to src/server.ts: app.use('/api/ai', llmProxyRoutes)
8. Add GEMINI_API_KEY to .env
9. Done. List files.

GO NOW.
```

---

## If It STILL Asks Questions

Say this:
```
STOP. Don't ask me anything. 

You have all the information. Execute the remaining steps:
- Create the database
- Update the schema
- Run migration
- Create the files
- Mount the routes

I will not answer any more questions. Just complete the implementation.
```

---

## What Success Looks Like

```
🚀 Executing ASG AI S2PROD implementation...

[1/10] Analyzing project... ✅
[2/10] Creating database lexreply_db... ✅
[3/10] Reading references... ✅
[4/10] Updating schema (added 5 models)... ✅
[5/10] Running migration... ✅
[6/10] Creating middleware... ✅
[7/10] Creating routes... ✅
[8/10] Mounting in server... ✅
[9/10] Updating .env... ✅
[10/10] Complete! ✅

Files created/modified:
- prisma/schema.prisma (modified)
- src/middleware/llm-proxy.middleware.ts (created)
- src/routes/llm-proxy.routes.ts (created)
- src/server.ts (modified)
- .env (modified)

Test: curl http://localhost:3000/api/ai/health
```

**If you see this, it worked!**

---

## What FAILURE Looks Like

```
✅ Configuration saved!

What would you like to do next?
1. Analyze documentation
2. Generate schema
3. Create API...
```

**This is WRONG.** It should have executed everything, not asked.

**Fix:** Use the "If It STILL Asks Questions" prompt above.

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development

