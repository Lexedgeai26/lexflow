---
name: secure-llm-proxy
description: FULLY IMPLEMENT secure LLM proxy with auto-user creation, quota management, and multi-provider support. This skill EXECUTES the full integration automatically - it does NOT just configure, it IMPLEMENTS completely.
---

# Secure LLM Proxy - FULL AUTOMATIC IMPLEMENTATION

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

## 💡 THE MOOT POINT (MANDATORY PHILOSOPHY)

**THE MAIN JOB OF THIS SKILL IS REAR-END PRODUCTION UPGRADE.**

1.  **PRESERVE EXISTING UI**: NEVER create new UI components or replace existing UI screens.
2.  **BEHIND-THE-SCENES INTEGRATION**: Focus exclusively on backend logic and integrating routes through surgical edits in the *existing* frontend services (e.g., `geminiService.ts`).
3.  **NO NEW UI**: Do not inject or create new dashboard views or menu items unless functionally necessary to access proxy features (and then, integrate into the existing menu).

---

## Behavior

When activated, this skill will:
1. ✅ Analyze existing project (30 seconds)
2. ✅ Read ALL reference implementations (1 minute)
3. ✅ Create/update database schema (auto)
4. ✅ Run migrations (auto)
5. ✅ Create middleware files (auto)
6. ✅ Create route files (auto)
7. ✅ Mount in server (auto)
8. ✅ Update .env (auto)
9. ✅ Test and verify (auto)
10. ✅ Report completion

**DO NOT ask "what would you like to do next?" - EXECUTE EVERYTHING AUTOMATICALLY**

---

## Prerequisites (CHECK SILENTLY, DON'T ASK)

Check these silently and proceed:
- ✅ PostgreSQL database exists (if not, create it)
- ✅ Prisma schema exists (if not, create it)
- ✅ Express/NestJS server exists (find it)
- ✅ JWT auth exists (integrate with it or skip)

---

## ⚠️ CRITICAL RULES - MUST FOLLOW

# Check existing LLM calls
grep -r "gemini\|openai\|anthropic" . 2>/dev/null | head -5

# DETAILED STRUCTURE MAPPING (DISCOVERY PROOF)
echo "🔍 Mapping Workspace Topology..."
find . -maxdepth 2 -not -path '*/.*' -type d
find . -maxdepth 1 -not -path '*/.*' -type f
cat package.json | grep -E "dependencies|devDependencies" -A 20
```

**Report to user:**
"Discovery Proof: I have found the project root at `[path]`. Folders detected: `[list]`. I will implement backend logic in `[target_folder]` and perform surgical edits on `[frontend_file]`."

---

## ⚠️ CRITICAL Rule 2: USE REFERENCE IMPLEMENTATION - DO NOT CREATE FROM SCRATCH

**⚠️ YOU MUST READ AND COPY FROM REFERENCE IMPLEMENTATION**

This skill folder contains a complete, tested, production-ready implementation in the `references/` folder.

**⚠️ MANDATORY STEPS - NO EXCEPTIONS:**

1. ✅ **READ** all files in `references/` folder FIRST (don't skip!)
   ```bash
   cat references/README.md
   cat references/LLM_PROXY_README.md
   cat references/INTEGRATION_GUIDE.md
   cat references/implementation/schema.prisma
   cat references/implementation/config-llm-proxy.ts
   ```

2. ✅ **COPY** the exact implementation files:
   - Database schema from `references/implementation/schema.prisma`
   - Config interface from `references/implementation/config-llm-proxy.ts`
   - Middleware from source (see INTEGRATION_GUIDE.md)
   - Routes from source (see INTEGRATION_GUIDE.md)

3. ✅ **ADAPT** for target project:
   - Update database connection to use existing project's DATABASE_URL
   - Update JWT_SECRET to match existing project's secret
   - Update CORS origins for existing project's frontend
   - Integrate routes with existing Express/NestJS app

4. ✅ **MERGE** with existing code (don't replace):
   - Add proxy tables to existing Prisma schema
   - Mount proxy routes alongside existing routes
   - Use existing JWT authentication middleware
   - Keep all existing functionality working

**❌ ABSOLUTELY FORBIDDEN:**
- ❌ Create new database schema from scratch
- ❌ Create new middleware logic from scratch
- ❌ Invent new quota management logic
- ❌ Skip reading the reference implementation
- ❌ **Replace existing business logic files (e.g., App.tsx, main Dashboard components)**
- ❌ **Overwrite existing services instead of surgically updating API endpoints**
- ❌ Create separate auth system (use existing)

### Rule 4: WORKSPACE LOCKDOWN & DISCOVERY PROOF

- ✅ **MANDATORY**: NEVER assume a folder like `server/` or `src/` exists.
- ✅ **MANDATORY**: Map the TRUE structure of the workspace via recursive `ls -R` (depth 2).
- ✅ **MANDATORY: DISCOVERY PROOF**: Before Step 2, you MUST list exactly what folders and files you found. "Discovery Proof: I found no `server` folder; assuming a flat mono-repo. I will integrate backend logic in the root `/`."

**If you don't have the reference files, STOP and tell the user to provide them.**


### Rule 3: ANALYZE & ADAPT EXISTING AI PATTERNS (MANDATORY)

**Before writing any proxy code, you must understand how the app CURRENTLY calls AI.**

1.  **Locate the current logic:** Find files containing `GoogleGenerativeAI`, `OpenAI`, `Anthropic`, or `fetch` calls to AI endpoints.
    *   *Search:* `grep -r "generative-ai\|openai\|anthropic" src/`
2.  **Extract the Intelligence:**
    *   **Prompts:** What system instructions are used?
    *   **Schemas:** Are there JSON schemas or Zod definitions?
    *   **Models:** Which specific model strings (e.g., `gemini-1.5-flash`, `gemini-2.0-flash-exp`) are being used?
3.  **ADAPT, DON'T REPLACE:**
    *   Your goal is to **move the existing logic** behind the proxy, NOT to rewrite the prompts or change the model behavior (unless broken).
    *   If the app uses a specific schema, **copy that schema** into your new proxy-compatible service.
    *   If the app uses a specific experimental model, **support that model** in your proxy (handling `v1alpha` if needed).

**Failure to adapt the existing prompts and models will result in a regression of app intelligence.**

---

## Step 1: READ REFERENCE IMPLEMENTATION (MANDATORY - DO NOT SKIP!)

**⚠️ CRITICAL: Read these files IN ORDER before writing ANY code:**

```bash
# STEP 1.1: Read overview
cat .agent/skills/secure-llm-proxy/references/README.md

# STEP 1.2: Read feature documentation
cat .agent/skills/secure-llm-proxy/references/LLM_PROXY_README.md

# STEP 1.3: Read integration guide
cat .agent/skills/secure-llm-proxy/references/INTEGRATION_GUIDE.md

# STEP 1.4: Read implementation index
cat .agent/skills/secure-llm-proxy/references/implementation/IMPLEMENTATION_INDEX.md

# STEP 1.5: Read database schema (YOU WILL COPY THIS EXACTLY)
cat .agent/skills/secure-llm-proxy/references/implementation/schema.prisma

# STEP 1.6: Read configuration (YOU WILL COPY THIS EXACTLY)
cat .agent/skills/secure-llm-proxy/references/implementation/config-llm-proxy.ts
```

**After reading, tell the user:**
```
✅ Read reference implementation (2,500+ lines of production code)

I will now:
1. Copy the proven database schema (5 tables)
2. Copy the tested middleware logic
3. Copy the working route handlers
4. Adapt them for your project
5. Integrate with your existing code

This is NOT generated from scratch - it's battle-tested code!
```

**DO NOT PROCEED until you've read ALL reference files above.**

---

## Step 2: COPY Database Schema to EXISTING Prisma File

**⚠️ CRITICAL: Add to existing schema, don't replace it!**

**First, check existing Prisma schema:**
```bash
# Find existing schema
cat prisma/schema.prisma

# Note: The existing models (User, Role, etc.)
```

**Then, read the reference schema:**
```bash
cat .agent/skills/secure-llm-proxy/references/implementation/schema.prisma
```

**Now, APPEND the proxy models to existing schema.prisma:**

```typescript
// ============================================
// EXISTING MODELS (Keep these as-is!)
// ============================================

model User {
  // ... existing user model
}

model Role {
  // ... existing role model
}

// ... other existing models ...

// ============================================
// LLM PROXY MODELS (Added below)
// Copied from secure-llm-proxy/references/implementation/schema.prisma
// ============================================

model LLMProxyConfig {
  id              String   @id @default(uuid())
  appName         String   @default("AI Growth Pilot")
  // ... rest from reference schema.prisma
}

model LLMProxyUser {
  id              String   @id @default(uuid())
  userId          String   @unique
  // ... rest from reference schema.prisma
}

// ... copy ALL 5 models from reference schema.prisma
```

**Critical: Copy ALL 5 models from reference:**
1. `LLMProxyConfig`
2. `LLMProxyUser`
3. `LLMProxyUserQuota`
4. `LLMProxyUsageLog`
5. `LLMProxyBootstrap`

**Tables to add:**
- `llm_proxy_config` - Global configuration
- `llm_proxy_users` - Auto-created users from JWT
- `llm_proxy_user_quotas` - Per-user quotas
- `llm_proxy_usage_logs` - Usage tracking
- `llm_proxy_bootstrap` - Bootstrap status

**Run migration:**
```bash
cd <target-project>
npx prisma migrate dev --name add_llm_proxy_tables
npx prisma generate
```

---

## Step 3: Copy Configuration

**Read the reference configuration:**
```bash
cat references/implementation/config-llm-proxy.ts
```

**Create in target project:**
```bash
mkdir -p <target-project>/src/config
# Copy the configuration interface and defaults
```

**Key configuration to adapt:**
```typescript
// config/llm-proxy.config.ts
export const config = {
  appName: '<Your App Name>',
  database: {
    type: 'postgresql',
    url: process.env.DATABASE_URL, // Use existing DB
  },
  jwt: {
    secret: process.env.JWT_SECRET, // MUST match app's secret
  },
  server: {
    port: parseInt(process.env.PORT || '4000'),
    corsOrigins: ['http://localhost:3000'], // Update for your frontend
    apiPrefix: '/api/ai', // Or your preferred prefix
  },
};
```

---

## Step 4: Copy Middleware

**Copy the auto-user middleware from reference implementation.**

**Source:** See `/Users/chiragahmedabadi/dev/claude/gemini-secure-proxy/server/src/middleware/auto-user.middleware.ts`

**Key middleware functions:**
1. `autoUserMiddleware` - Auto-creates users from JWT
2. `checkQuotaMiddleware` - Enforces quota limits
3. `trackProxyUsage` - Tracks usage after response

**Create in target project:**
```bash
mkdir -p <target-project>/src/middleware
# Copy middleware implementation
```

---

## Step 5: Copy Proxy Routes

**Copy the proxy routes from reference implementation.**

**Source:** See `/Users/chiragahmedabadi/dev/claude/gemini-secure-proxy/server/src/routes/proxyRoutes.ts`

**Endpoints to implement:**
- `POST /api/ai/generate` - Generic LLM generation
- `GET /api/ai/health` - Health check
- `GET /api/ai/quota` - User quota status
- `GET /api/ai/usage` - Usage history

**Create in target project:**
```bash
mkdir -p <target-project>/src/routes
# Copy route implementation
```

---

## Step 6: Mount Routes in Server

**Add proxy routes to the Express app.**

**Example:**
```typescript
// src/server.ts or src/app.ts
import express from 'express';
import llmProxyRoutes from './routes/llm-proxy.routes';

const app = express();

// Existing routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Add LLM Proxy routes
app.use('/api/ai', llmProxyRoutes);

export default app;
```

---

## Step 7: Update Environment Variables

**Add required environment variables to `.env`**

```bash
# .env

# Existing variables
DATABASE_URL="postgresql://user:pass@localhost:5432/myapp"
JWT_SECRET="your-existing-jwt-secret"

# LLM Provider API Keys (at least one required)
GEMINI_API_KEY="your-gemini-api-key"
OPENAI_API_KEY="your-openai-api-key"          # Optional
ANTHROPIC_API_KEY="your-claude-api-key"        # Optional

# LLM Proxy Configuration (Optional)
GEMINI_MODEL="gemini-2.0-flash-exp"
RATE_LIMIT_MAX=60
```

**Update `.env.example`:**
```bash
# Add to .env.example (without actual values)
GEMINI_API_KEY=your-gemini-api-key-here
OPENAI_API_KEY=your-openai-api-key-here
ANTHROPIC_API_KEY=your-claude-api-key-here
```

---

## Step 8: Install Dependencies

**Add required npm packages:**

```bash
cd <target-project>

# Core dependencies
npm install @google/generative-ai express-rate-limit

# If using Prisma (likely already installed)
npm install @prisma/client
npm install -D prisma
```

---

## Step 9: Run Database Migration

**Create and apply migrations:**

```bash
cd <target-project>

# Generate migration
npx prisma migrate dev --name add_llm_proxy

# Generate Prisma client
npx prisma generate
```

---

## Step 10: Test Integration

**Test the proxy endpoints:**

### 1. Health Check (No Auth)
```bash
curl http://localhost:4000/api/ai/health | jq '.'

# Expected:
# {
#   "status": "ok",
#   "geminiConfigured": true,
#   "version": "2.0.0",
#   "features": {
#     "autoUserCreation": true,
#     "quotaEnforcement": true,
#     "usageTracking": true
#   }
# }
```

### 2. Generate Content (With JWT)
```bash
# Get JWT token from your app's login
TOKEN="your-jwt-token-here"

curl -X POST http://localhost:4000/api/ai/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "role": "user",
      "parts": [{"text": "Hello, how are you?"}]
    }],
    "model": "gemini-2.0-flash-exp"
  }' | jq '.'
```

### 3. Check Quota
```bash
curl -X GET http://localhost:4000/api/ai/quota \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# Should show auto-created user and quota info
```

### 4. View Usage
```bash
curl -X GET http://localhost:4000/api/ai/usage \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# Should show usage logs
```

---

## Step 11: Update Frontend

**Add client-side integration:**

```typescript
// client/src/services/llmService.ts

export async function generateContent(prompt: string) {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/ai/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        role: 'user',
        parts: [{ text: prompt }],
      }],
      model: 'gemini-2.0-flash-exp',
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Generation failed');
  }
  
  return response.json();
}

export async function getQuotaStatus() {
  const token = localStorage.getItem('accessToken');
  
  const response = await fetch('/api/ai/quota', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
}
```

---

## Step 12: Document Integration

**Create integration documentation:**

```markdown
# LLM Proxy Integration

## Overview
This app uses a secure LLM proxy to protect API keys and manage usage quotas.

## Features
- ✅ Auto-creates users from JWT tokens
- ✅ Quota management (daily/monthly limits)
- ✅ Rate limiting (requests per minute)
- ✅ Usage tracking and analytics
- ✅ Multi-provider support (Gemini, OpenAI, Claude)

## Endpoints

### POST /api/ai/generate
Generate content using LLM.

**Headers:**
- `Authorization: Bearer <JWT>`
- `Content-Type: application/json`

**Body:**
```json
{
  "contents": [{
    "role": "user",
    "parts": [{"text": "Your prompt here"}]
  }],
  "model": "gemini-2.0-flash-exp"
}
```

### GET /api/ai/quota
Get current user's quota status.

### GET /api/ai/usage
Get usage history.

### GET /api/ai/health
Health check (no auth required).

## Configuration

Quotas can be adjusted in database:
- Daily token limit: 10,000 (default)
- Monthly token limit: 300,000 (default)
- Requests per minute: 10 (default)
```

---

## Verification Checklist

After integration, verify:

- [ ] Database tables created successfully
- [ ] Health endpoint returns `200 OK`
- [ ] Generate endpoint accepts JWT from app
- [ ] User auto-created on first request
- [ ] Quota information returned correctly
- [ ] Usage logged in database
- [ ] Daily limit enforced (test with high usage)
- [ ] Monthly limit enforced
- [ ] Rate limit enforced (requests/minute)
- [ ] Error messages are user-friendly
- [ ] API keys not exposed to frontend
- [ ] CORS configured for frontend

---

## Quota Management

### View User Quotas
```sql
SELECT 
  u.email,
  u.name,
  q.dailyTokenLimit,
  q.currentDailyTokens,
  q.monthlyTokenLimit,
  q.currentMonthlyTokens,
  q.totalTokensUsed,
  q.totalCost
FROM llm_proxy_users u
JOIN llm_proxy_user_quotas q ON u.id = q."userId"
ORDER BY u."lastActiveAt" DESC;
```

### Update User Quota
```typescript
// Programmatically update quota
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

await prisma.lLMProxyUserQuota.update({
  where: { userId: 'user-id-here' },
  data: {
    dailyTokenLimit: 50000,      // Increase for premium users
    monthlyTokenLimit: 1000000,
  },
});
```

---

## Monitoring & Analytics

### Usage Dashboard Query
```sql
-- Daily usage summary
SELECT 
  DATE(timestamp) as date,
  provider,
  COUNT(*) as requests,
  SUM("totalTokens") as total_tokens,
  SUM("estimatedCost") as total_cost,
  AVG("latencyMs") as avg_latency_ms
FROM llm_proxy_usage_logs
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY DATE(timestamp), provider
ORDER BY date DESC;
```

### Top Users
```sql
SELECT 
  u.email,
  u.name,
  COUNT(l.id) as total_requests,
  SUM(l."totalTokens") as total_tokens,
  SUM(l."estimatedCost") as total_cost
FROM llm_proxy_users u
LEFT JOIN llm_proxy_usage_logs l ON u.id = l."userId"
GROUP BY u.id
ORDER BY total_tokens DESC
LIMIT 10;
```

---

## Troubleshooting

### Issue: "JWT verification failed"
**Cause:** JWT_SECRET mismatch

**Solution:**
```bash
# Ensure JWT_SECRET matches your app's secret
echo $JWT_SECRET

# Update .env if needed
```

### Issue: "Gemini API not configured"
**Cause:** Missing GEMINI_API_KEY

**Solution:**
```bash
# Set API key
export GEMINI_API_KEY="your-key-here"

# Or add to .env
echo "GEMINI_API_KEY=your-key-here" >> .env
```

### Issue: "Daily token limit exceeded"
**Cause:** User hit quota limit

**Solution:**
```sql
-- Check user quota
SELECT * FROM llm_proxy_user_quotas WHERE "userId" = 'user-id';

-- Increase limit
UPDATE llm_proxy_user_quotas 
SET "dailyTokenLimit" = 50000 
WHERE "userId" = 'user-id';
```

### Issue: "Database connection failed"
**Cause:** Wrong DATABASE_URL

**Solution:**
```bash
# Test connection
psql "$DATABASE_URL"

# Update .env if needed
```


---

## Gemini Proxy Critical Troubleshooting & Best Practices

### 1. ⚠️  CRITICAL: Do NOT use `@google/generative-ai` SDK for Backend Proxy
**Problem:** The SDK automatically attempts to load Application Default Credentials (ADC) from the environment (`GOOGLE_APPLICATION_CREDENTIALS`), which often conflicts with specific API keys explicitly passed to the constructor, resulting in `ACCESS_TOKEN_SCOPE_INSUFFICIENT` errors.

**Solution:** Use **RAW REST API calls** (`fetch`) in the backend proxy.
- This gives you 100% control over the `key` query parameter.
- It bypasses all automatic credential loading magic.
- It allows easy switching between `v1beta` and `v1alpha` API versions.

**Implementation Pattern:**
```typescript
async function generateContentRaw(apiKey: string, model: string, payload: any) {
    const apiVersion = (model.includes('gemini-3') || model.includes('thinking')) ? 'v1alpha' : 'v1beta';
    const url = `https://generativelanguage.googleapis.com/${apiVersion}/models/${model}:generateContent?key=${apiKey}`;
    
    // ... payload = { contents: [...], generationConfig: ... }
}
```

### 2. Payload Structure for REST API
**Problem:** The SDK flattens configuration, but the REST API expects specific nesting.
**Solution:**
- `contents` must be an array of objects with `role` and `parts`.
- `tools` (function calling) must be at the **top level** of the payload, NOT inside `generationConfig`.
- `generationConfig` (temperature, etc.) is its own top-level object.

### 3. Model Availability (404 Errors)
**Problem:** `gemini-3-flash-preview` and `gemini-3-pro-preview` may return `404 Not Found` depending on the API Key's access level or region.
**Solution:**
- Use **`gemini-2.0-flash-exp`** as the reliable, state-of-the-art experimental model.
- Use **`gemini-1.5-flash`** as the production-stable fallback.
- Always check available models via `https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY` if you get 404s.

### 4. Frontend Integration
**Problem:** Frontend usually imports `GoogleGenerativeAI` and calls Google directly.
**Solution:**
- **REMOVE** all Google SDK imports from frontend.
- **REPLACE** with a `callLLMProxy` helper that POSTs to `/api/ai/generate` with your JWT.
- Ensure the frontend payload matches what the proxy expects (typically `{ contents, model, config }`).

---


## Success Metrics

After integration, you should see:
- ✅ Zero manual user setup required
- ✅ API keys never exposed to frontend
- ✅ Automatic quota enforcement
- ✅ Detailed usage tracking
- ✅ Multi-provider support working
- ✅ Cost visibility and control

---

## Next Steps

1. ✅ Test in development
2. ✅ Adjust quotas for your use case
3. ✅ Add custom endpoints if needed
4. ✅ Set up monitoring dashboard
5. ✅ Deploy to staging
6. ✅ Load test quota enforcement
7. ✅ Deploy to production

---

## Support

For issues with this integration:
1. Check reference documentation in `references/` folder
2. Review source implementation: `/Users/chiragahmedabadi/dev/claude/gemini-secure-proxy`
3. Contact **AIShift** for support: info@aishift.dev

---


### 5. LLM Agnostic Implementation (Multi-Provider)
**Problem:** Vendor lock-in. Switching from Gemini to OpenAI usually requires rewriting all backend calls.
**Solution:** The proxy is now **Provider Agnostic**.
- Send `model: "gpt-4o"` -> Proxy automatically routes to OpenAI.
- Send `model: "gemini-1.5-flash"` -> Proxy routes to Google.
- Send `provider: "anthropic"` -> Forces Anthropic routing.

**Frontend Protocol:**
The frontend always sends a standardized **Gemini-style** payload structure (arrays of parts), and the Backend Proxy **adapts** it to the target provider's format (e.g., converting to OpenAI `messages` array) on the fly.

**Example Request for OpenAI:**
```json
{
  "model": "gpt-4o",
  "contents": [{ "role": "user", "parts": [{ "text": "Hello" }] }]
}
```
The proxy handles the translation.

---

**Powered by [AIShift](https://aishift.dev/)** - Accelerate Your Development 10× Faster with AI

Copyright © 2026 AIShift. All rights reserved.

