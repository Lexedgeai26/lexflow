---
name: app-init
description: Initialize and FULLY EXECUTE ASG AI S2PROD conversion. Use this skill when the user wants to convert application documentation into a production-ready app. This skill DOES NOT just configure - it COMPLETES the full implementation automatically.
---

# ASG AI S2PROD - Full Automated Implementation

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

## 💡 THE MOOT POINT (MANDATORY PHILOSOPHY)

**THE MAIN JOB OF THIS SKILL IS REAR-END PRODUCTION UPGRADE.**

1.  **PRESERVE EXISTING UI**: NEVER create new UI components or replace existing UI screens unless explicitly and specifically requested توسط user.
2.  **BEHIND-THE-SCENES INTEGRATION**: Focus exclusively on backend logic, production infrastructure (Database, Schema, Auth), and integrating these features into the *existing* frontend code via surgical edits.
3.  **DO NOT START FROM SCRATCH**: The "Source of Truth" is the user's existing working directory. Enhance it, don't replace it.
4.  **RESPECT EXISTING UX**: Documentation provided is for *feature alignment*, not for a UI redesign. Maintain the original project's look and feel.

---

## EXECUTION PIPELINE

## ⚠️ CRITICAL RULES

### Rule 1: AUTO-EXECUTE, DON'T ASK

❌ **WRONG:**
```
Configuration complete! What would you like to do next?
1. Analyze docs
2. Generate schema
...
```

✅ **CORRECT:**
```
Configuration saved. Now executing full implementation pipeline...

[Step 1/7] Analyzing documentation...
[Step 2/7] Creating database...
[Step 3/7] Applying schema...
...
[7/7] Complete! ✅
```

### Rule 2: CREATE EVERYTHING AUTOMATICALLY

- ✅ Create database automatically (don't ask)
- ✅ Generate and apply schema automatically
- ✅ Implement features automatically
- ✅ Only ask for passwords/secrets when needed

### Rule 3: USE REFERENCE IMPLEMENTATIONS

- ✅ Read from `.agent/skills/*/references/` folders
- ✅ Copy proven code patterns
- ✅ Don't generate from scratch

### Rule 4: BUILD ON EXISTING CODE - SURGICAL INTEGRATION

- ✅ Analyze existing code FIRST (Deep Scan of UI components)
- ✅ Integrate with existing features
- ✅ **ABSOLUTELY FORBIDDEN**: Do not replace existing business functionality or UI logic.
- ✅ **ABSOLUTELY FORBIDDEN**: Do not create or inject "default" AI-generated UIs.
- ✅ **MANDATORY**: Use surgical edits for integration (e.g., updating a `fetch` call) instead of file overwrites.
- ✅ **MANDATORY**: If the user has a "Matter Creation" UI, use it. Do not create a new one.

### Rule 5: WORKSPACE LOCKDOWN & DISCOVERY PROOF

- ✅ **MANDATORY**: NEVER assume a standard folder structure (e.g., don't assume `server/` or `client/` exists).
- ✅ **MANDATORY**: Perform a recursive `ls -R` (limited depth 2) to map the TRUE structure of the workspace.
- ✅ **MANDATORY**: If the user's root is `/Users/.../lexreply` and there is no `server/` folder in that root, DO NOT search for it in parent or sibling directories.
- ✅ **MANDATORY: DISCOVERY PROOF**: Before Step 2, you MUST list exactly what folders and files you found. If you find the project is a "Flat Mono-Repo" (files in root), implement everything in the root. If it's a "Split Repo" (folders like `server/`, `frontend/`), implement in the respective folders.

---

## EXECUTION PIPELINE

**After gathering basic info, EXECUTE ALL STEPS AUTOMATICALLY:**

### Phase 1: Information Gathering (QUICK - 2 minutes max)

**Ask ONLY these essentials:**
```
Quick setup for ASG AI S2PROD:

1. Project directory? (e.g., /Users/you/dev/myapp)
2. Documentation location? (e.g., ./docs)
3. PostgreSQL database name to CREATE? (e.g., myapp_db)
4. PostgreSQL username? (default: postgres)
5. PostgreSQL password? (leave blank for trust auth)

That's it! I'll handle everything else automatically.
```

**Once answered, IMMEDIATELY proceed to Phase 2. DO NOT ASK MORE QUESTIONS.**

---

### Phase 2: AUTO-EXECUTE (DO ALL OF THIS AUTOMATICALLY)

```
🚀 Starting ASG AI S2PROD Full Implementation Pipeline...
```

#### Step 1: Analyze Existing Project [AUTO]
```bash
echo "📊 [1/10] Analyzing existing project..."

# Read project structure
ls -la
cat package.json

# Find existing code
find . -name "*.ts" -o -name "*.js" | head -20

# Check existing database models
cat prisma/schema.prisma 2>/dev/null || echo "No existing schema"

# Check existing routes
ls src/routes/ 2>/dev/null || ls src/api/ 2>/dev/null

# Check existing auth
grep -r "jwt\|auth" . --exclude-dir=node_modules 2>/dev/null | head -5

# DETAILED STRUCTURE MAPPING (DISCOVERY PROOF)
echo "🔍 Mapping Workspace Topology..."
find . -maxdepth 2 -not -path '*/.*' -type d
find . -maxdepth 1 -not -path '*/.*' -type f
cat package.json | grep -E "dependencies|devDependencies" -A 20
```

**MANDATORY ASSESSMENT BEFORE WRITING CODE:**
1.  **Topology Check**: Is this a flat repo or split repo? (e.g., "Found no `server` folder, implementing in project root `.`").
2.  **Map Features**: Identify which existing UI files correspond to which documentation features.
3.  **State Management Audit**: Understand how the existing app manages data (LocalStorage? React State?).
4.  **Visual Hierarchy**: Identify the "Global Layout" to ensure new integration.

**REPORT DISCOVERY PROOF:**
"Discovery Proof: I have found the project root at `[path]`. The project has NO `server` folder; it appears to be a flat React/Vite project. I will implement the backend logic in the root `/` and integrate with `App.tsx` directly."

---

#### Step 2: Create Database [AUTO]
```bash
echo "🗄️ [2/10] Creating PostgreSQL database..."

# Create the database
createdb -h localhost -U [username] [database_name] 2>/dev/null || echo "Database may already exist"

# Verify connection
psql -h localhost -U [username] -d [database_name] -c "SELECT 1" 
```

**Report and CONTINUE:**
```
✅ Database created: [database_name]
   Continuing to next step...
```

#### Step 3: Read Reference Implementations [AUTO]
```bash
echo "📚 [3/10] Reading reference implementations..."

# Read secure proxy references
cat .agent/skills/secure-llm-proxy/references/implementation/schema.prisma
cat .agent/skills/secure-llm-proxy/references/implementation/config-llm-proxy.ts

# Read any other enabled feature references
```

**Report and CONTINUE:**
```
✅ Loaded reference implementations (2,500+ lines of production code)
   Continuing to next step...
```

#### Step 4: Update Database Schema [AUTO]
```bash
echo "📋 [4/10] Updating database schema..."
```

**Add proxy tables to existing prisma/schema.prisma:**
```prisma
// ============================================
// EXISTING MODELS (Kept as-is)
// ============================================
// ... existing models stay here ...

// ============================================
// LLM PROXY MODELS (Added by ASG AI S2PROD)
// ============================================
model LLMProxyConfig {
  id              String   @id @default(uuid())
  appName         String   @default("LLM Proxy")
  geminiEnabled   Boolean  @default(true)
  openaiEnabled   Boolean  @default(true)
  claudeEnabled   Boolean  @default(false)
  dailyTokenLimit     Int      @default(100000)
  monthlySpendLimit   Float    @default(100.0)
  autoCreateUsers     Boolean  @default(true)
  enforceQuotas       Boolean  @default(true)
  trackUsage          Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  @@map("llm_proxy_config")
}

model LLMProxyUser {
  id              String   @id @default(uuid())
  userId          String   @unique
  email           String   @unique
  name            String?
  createdFromJWT  Boolean  @default(true)
  firstSeenAt     DateTime @default(now())
  lastActiveAt    DateTime @default(now())
  isActive        Boolean  @default(true)
  quota           LLMProxyUserQuota?
  usage           LLMProxyUsageLog[]
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  @@index([userId])
  @@index([email])
  @@map("llm_proxy_users")
}

model LLMProxyUserQuota {
  id                  String   @id @default(uuid())
  userId              String   @unique
  user                LLMProxyUser @relation(fields: [userId], references: [id], onDelete: Cascade)
  dailyTokenLimit     Int      @default(10000)
  monthlyTokenLimit   Int      @default(300000)
  requestsPerMinute   Int      @default(10)
  maxConcurrent       Int      @default(3)
  currentDailyTokens  Int      @default(0)
  currentMonthlyTokens Int     @default(0)
  currentMinuteRequests Int    @default(0)
  currentConcurrent   Int      @default(0)
  lastDailyReset      DateTime @default(now())
  lastMonthlyReset    DateTime @default(now())
  lastMinuteReset     DateTime @default(now())
  totalTokensUsed     Int      @default(0)
  totalRequests       Int      @default(0)
  totalCost           Float    @default(0.0)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  @@map("llm_proxy_user_quotas")
}

model LLMProxyUsageLog {
  id              String   @id @default(uuid())
  userId          String
  user            LLMProxyUser @relation(fields: [userId], references: [id], onDelete: Cascade)
  provider        String
  model           String
  operation       String
  endpoint        String
  method          String   @default("POST")
  promptTokens    Int      @default(0)
  completionTokens Int     @default(0)
  totalTokens     Int
  estimatedCost   Float    @default(0.0)
  latencyMs       Int      @default(0)
  success         Boolean  @default(true)
  statusCode      Int      @default(200)
  errorMessage    String?
  userAgent       String?
  ipAddress       String?
  timestamp       DateTime @default(now())
  @@index([userId, timestamp])
  @@index([provider, timestamp])
  @@map("llm_proxy_usage_logs")
}

model LLMProxyBootstrap {
  id                String   @id @default(uuid())
  isConfigured      Boolean  @default(false)
  hasApiKeys        Boolean  @default(false)
  firstBootstrapAt  DateTime @default(now())
  lastHealthCheckAt DateTime @default(now())
  totalUsers        Int      @default(0)
  totalRequests     Int      @default(0)
  version           String   @default("2.0.0")
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  @@map("llm_proxy_bootstrap")
}
```

**Report and CONTINUE:**
```
✅ Schema updated: Added 5 LLM Proxy tables
   Continuing to next step...
```

#### Step 5: Run Database Migration [AUTO]
```bash
echo "🔄 [5/10] Running database migration..."

# Generate and apply migration
npx prisma migrate dev --name add_llm_proxy_tables

# Generate Prisma client
npx prisma generate
```

**Report and CONTINUE:**
```
✅ Migration complete: 5 tables created
   Continuing to next step...
```

#### Step 6: Create Middleware [AUTO]
```bash
echo "🔧 [6/10] Creating LLM proxy middleware..."
```

**Create src/middleware/llm-proxy.middleware.ts:**
(Copy EXACT content from references/implementation - see secure-llm-proxy skill)

**Report and CONTINUE:**
```
✅ Middleware created: src/middleware/llm-proxy.middleware.ts
   Continuing to next step...
```

#### Step 7: Create Proxy Routes [AUTO]
```bash
echo "🌐 [7/10] Creating LLM proxy routes..."
```

**Create src/routes/llm-proxy.routes.ts:**
(Copy EXACT content from references/implementation - see secure-llm-proxy skill)

**Report and CONTINUE:**
```
✅ Routes created: src/routes/llm-proxy.routes.ts
   Continuing to next step...
```

#### Step 8: Mount Routes in Server [AUTO]
```bash
echo "🔗 [8/10] Mounting routes in server..."
```

**Update src/server.ts or src/app.ts:**
```typescript
// Add import at top
import llmProxyRoutes from './routes/llm-proxy.routes';

// Add route mounting (after existing routes)
app.use('/api/ai', llmProxyRoutes);
```

**Report and CONTINUE:**
```
✅ Routes mounted at /api/ai
   Continuing to next step...
```

#### Step 9: Update Environment Variables [AUTO]
```bash
echo "⚙️ [9/10] Updating environment variables..."
```

**Add to .env (if not present):**
```bash
# LLM Proxy Configuration
GEMINI_API_KEY=your-gemini-key-here
OPENAI_API_KEY=your-openai-key-here
ANTHROPIC_API_KEY=your-anthropic-key-here
GEMINI_MODEL=gemini-2.0-flash-exp
```

**Report and CONTINUE:**
```
✅ Environment variables updated
   Continuing to final step...
```

#### Step 10: Test and Verify [AUTO]
```bash
echo "🧪 [10/10] Testing integration..."

# Test database connection
npx prisma db pull --force

# Test health endpoint (if server running)
curl -s http://localhost:3000/api/ai/health 2>/dev/null || echo "Server not running - manual test needed"
```

**Report COMPLETION:**
```
🎉 ASG AI S2PROD IMPLEMENTATION COMPLETE!

✅ Created database: [database_name]
✅ Added 5 LLM Proxy tables
✅ Created middleware: src/middleware/llm-proxy.middleware.ts
✅ Created routes: src/routes/llm-proxy.routes.ts
✅ Mounted at: /api/ai
✅ Updated .env with LLM configuration

📋 Files created/modified:
- prisma/schema.prisma (modified - added 5 models)
- src/middleware/llm-proxy.middleware.ts (created)
- src/routes/llm-proxy.routes.ts (created)
- src/server.ts (modified - mounted routes)
- .env (modified - added LLM keys)
- .asgais2prod/config.json (created)

🚀 To start using:
1. Add your actual API keys to .env
2. Start server: npm run dev
3. Test: curl http://localhost:3000/api/ai/health

The LLM proxy is now integrated and ready!
```

---

## DO NOT DO THIS

❌ **Stop and ask "What would you like to do next?"**
❌ **Show menu of options**
❌ **Wait for user to type commands**
❌ **Only create configuration file**
❌ **Skip creating database**
❌ **Skip applying schema**
❌ **Skip creating actual code files**

## DO THIS INSTEAD

✅ **Ask minimal questions (5 max)**
✅ **Then AUTO-EXECUTE ALL 10 STEPS**
✅ **Create database automatically**
✅ **Apply schema automatically**
✅ **Create all code files automatically**
✅ **Mount routes automatically**
✅ **Only stop if there's an actual ERROR**
✅ **Report full completion at end**

---

## Example Interaction

**User:** "Initialize ASG AI S2PROD"

**Agent:** 
```
Quick setup:
1. Project directory? 
2. Documentation location?
3. Database name to create?
4. PostgreSQL username?
5. Password? (blank for trust auth)
```

**User:** 
```
1. /Users/me/dev/lexreply
2. ./docs
3. lexreply_db
4. postgres
5. (blank)
```

**Agent:**
```
🚀 Starting full implementation...

[1/10] Analyzing project... ✅ Found Express.js with existing models
[2/10] Creating database... ✅ Created lexreply_db
[3/10] Reading references... ✅ Loaded 2,500+ lines
[4/10] Updating schema... ✅ Added 5 tables
[5/10] Running migration... ✅ Applied successfully  
[6/10] Creating middleware... ✅ Created
[7/10] Creating routes... ✅ Created
[8/10] Mounting routes... ✅ Mounted at /api/ai
[9/10] Updating .env... ✅ Updated
[10/10] Testing... ✅ All good

🎉 COMPLETE! LLM proxy integrated.
Start server and test: curl localhost:3000/api/ai/health
```

**DO NOT ask what to do next. The implementation is COMPLETE.**

---

## Constraints

- Maximum 5 questions before executing
- NO menus or option lists
- AUTO-EXECUTE all 10 steps
- Create REAL files, not just configuration
- STOP only on errors
- Report COMPLETION at end

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development with AI

Copyright © 2026 AIShift. All rights reserved.
