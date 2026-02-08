# LLM Secure Proxy - Reference Implementation Files

This folder contains the complete, tested, and production-ready implementation of the LLM Secure Proxy.

**⚠️ CRITICAL: Do NOT create new code. Use these files as reference.**

---

## Core Files

### 1. Configuration
**File:** `config-llm-proxy.ts`  
**Purpose:** TypeScript interfaces and default configuration for the LLM Proxy module

**Key Exports:**
- `LLMProxyModuleConfig` interface
- `DEFAULT_CONFIG` constant
- Configuration validation functions

**Use this for:** Setting up module configuration, JWT settings, quota defaults

---

### 2. Database Schema
**File:** `schema.prisma`  
**Purpose:** Prisma schema for all proxy database tables

**Models:**
- `LLMProxyConfig` - Global app configuration
- `LLMProxyUser` - Auto-created users from JWT
- `LLMProxyUserQuota` - Per-user quotas with auto-reset
- `LLMProxyUsageLog` - Usage tracking per request
- `LLMProxyBootstrap` - Setup status and stats

**Use this for:** Database schema generation, understanding data model

---

### 3. Middleware - Auto User Creation
**File:** `llm-proxy.middleware.ts`  
**Purpose:** Express middleware for auto-creating users from JWT and logging usage.

**Key Functions:**
- `autoUserMiddleware` - Auto-creates proxy users on first request
- `checkQuotaMiddleware` - Enforces quota limits
- `logUsage` - Tracks usage after request completion

**Use this for:** User auto-creation flow, quota enforcement, usage tracking

---

### 4. Proxy Routes
**File:** `llm-proxy.routes.ts`  
**Purpose:** Express routes for LLM proxy endpoints with RAW REST API integration.

**Endpoints:**
- `POST /generate` - Generic LLM generation (using raw Gemini REST API)
- `GET /health` - Health check
- `GET /quota` - Get user quota status

**Use this for:** API endpoint implementation, avoiding ADC SDK issues.

---

### 5. Frontend Service (Example)
**File:** `geminiService.ts`
**Purpose:** Client-side service that calls the proxy instead of Google directly.

---

## Integration Pattern

### Step 1: Read Documentation
1. Read `LLM_PROXY_README.md` for overview
2. Read `INTEGRATION_GUIDE.md` for step-by-step instructions

### Step 2: Copy Reference Implementation
1. Copy `schema.prisma` to target project's `prisma/` folder
2. Copy middleware patterns from reference files
3. Copy route patterns from reference files
4. Copy configuration patterns from reference files

### Step 3: Adapt for Target Project
1. Update database connection URL for target database
2. Update JWT secret to match target app's secret
3. Update CORS origins for target app's frontend
4. Update API prefix if needed (default: `/api/ai`)
5. Customize quota limits for target app's use case

### Step 4: Initialize & Test
1. Run Prisma migrations: `npx prisma migrate dev`
2. Start proxy server
3. Test with JWT token from target app
4. Verify auto-user creation
5. Check quota enforcement
6. Validate usage tracking

---

## Key Features Implemented

✅ **Zero-Setup User Management**
- Auto-creates users from JWT on first request
- No manual user registration needed
- Extracts `userId`, `email`, `name` from JWT

✅ **Built-in Quota System**
- Daily token limits (default: 10,000)
- Monthly token limits (default: 300,000)
- Rate limiting (requests per minute)
- Automatic quota resets

✅ **Multi-Provider Support**
- Gemini (Google AI)
- OpenAI
- Claude (Anthropic)
- Hot-swappable providers

✅ **Usage Analytics**
- Per-request logging
- Token counting
- Cost estimation
- Performance metrics

✅ **Production Ready**
- Health checks
- Error handling
- Input validation
- Security best practices

---

## File Structure in Target Project

```
target-project/
├── prisma/
│   └── schema.prisma          (Add LLM Proxy models)
├── src/
│   ├── config/
│   │   └── llm-proxy.config.ts
│   ├── middleware/
│   │   └── auto-user.middleware.ts
│   ├── routes/
│   │   └── llm-proxy.routes.ts
│   └── server.ts              (Mount proxy routes)
├── .env
│   ├── DATABASE_URL=...
│   ├── JWT_SECRET=...
│   └── GEMINI_API_KEY=...
└── package.json
```

---

## Environment Variables Required

```bash
# Database (use existing app's database)
DATABASE_URL="postgresql://user:pass@localhost:5432/myapp"

# JWT Secret (MUST match existing app's secret)
JWT_SECRET="your-jwt-secret-here"

# LLM Provider API Keys (at least one)
GEMINI_API_KEY="your-gemini-api-key"
OPENAI_API_KEY="your-openai-api-key"        # Optional
ANTHROPIC_API_KEY="your-claude-api-key"     # Optional

# Server Configuration (Optional)
PORT=4000
```

---

## Critical Rules

1. **DO NOT create new implementation** - Copy from reference files
2. **DO match JWT_SECRET** - Must be same as host app
3. **DO use existing database** - Add proxy tables to host DB
4. **DO customize quotas** - Adjust for app's needs
5. **DO test auto-user creation** - Verify with real JWT
6. **DO NOT expose API keys** - Keep on server side only

---

## Testing Checklist

- [ ] Prisma migration runs successfully
- [ ] Health endpoint returns `200 OK`
- [ ] Generate endpoint accepts JWT token
- [ ] User auto-created on first request
- [ ] Quota info returned via `/quota` endpoint
- [ ] Usage logged in database
- [ ] Daily/monthly limits enforced
- [ ] Rate limiting works (requests/minute)
- [ ] Error responses are user-friendly
- [ ] No sensitive data in error messages

---

**Source:** `/Users/chiragahmedabadi/dev/claude/gemini-secure-proxy`  
**Version:** 2.0.0  
**Status:** Production-Ready ✅

