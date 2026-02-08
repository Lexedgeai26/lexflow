# ASG AI S2PROD - Troubleshooting Guide

**Solutions to common issues when using ASG AI S2PROD with Google Antigravity**

---

## 🚨 Issue 0: Stops After Config and Asks "What Next?" (MOST COMMON)

### ❌ Problem
```
✅ Configuration saved to .asgais2prod/config.json

Next steps:
1. "Analyze documentation" - ...
2. "Generate schema" - ...

Which would you like to start with?  <-- WRONG! Should auto-execute!
```

### ✅ Solution

**The skill should AUTO-EXECUTE all steps, not stop and ask.**

**Fix 1: Use explicit prompt:**
```
Execute ALL steps automatically. DO NOT stop to ask "what next?"

1. Create database
2. Apply schema  
3. Create files
4. Mount routes
5. Complete everything

GO! Execute now.
```

**Fix 2: If it still stops, say:**
```
Don't ask me what to do. Continue executing all remaining steps automatically.
Create the database, apply the schema, create all code files, mount the routes.
Complete the full implementation NOW.
```

**Fix 3: Be very direct:**
```
STOP ASKING QUESTIONS. EXECUTE.

You've created config. Now do steps 2-10:
- Create database: createdb mydb
- Update schema: add 5 proxy tables to prisma/schema.prisma
- Migrate: npx prisma migrate dev
- Create: src/middleware/llm-proxy.middleware.ts
- Create: src/routes/llm-proxy.routes.ts
- Mount in server.ts
- Done.

GO.
```

**Why this happens:** The skill is being too polite/passive. Updated versions explicitly say "AUTO-EXECUTE, DON'T ASK" but Antigravity may still try to be interactive.

**Best practice:** Always include "Execute ALL steps automatically" and "DO NOT ask what next" in your prompt.

---

## Issue 1: Wrong Folder Name Created

### ❌ Problem
```bash
mkdir -p .app-to-production  # WRONG! Old name
```

### ✅ Solution

The skill files have been updated. Make sure you're using the latest version:

```bash
# Remove old skills
rm -rf .agent/skills/*

# Copy latest version
cp -r /path/to/asgais2prod/* .agent/skills/

# Verify correct folder name in skills
grep "asgais2prod" .agent/skills/app-init/SKILL.md
# Should see: .asgais2prod/ (not .app-to-production/)
```

**If Antigravity still creates wrong folder:**
1. Stop the current session
2. Start fresh conversation
3. Say: "Use .asgais2prod folder, not .app-to-production"

---

## Issue 2: Not Using Reference Implementation

### ❌ Problem
Antigravity generates new code from scratch instead of copying from `references/` folder.

### ✅ Solution

**The skills have been updated with MANDATORY reading steps.**

**Verify skills have references:**
```bash
ls -la .agent/skills/secure-llm-proxy/references/
# Should see:
# - README.md
# - LLM_PROXY_README.md
# - INTEGRATION_GUIDE.md
# - implementation/
```

**If references folder is missing:**
```bash
# Make sure you copied the entire skill folder
cp -r /path/to/asgais2prod/secure-llm-proxy .agent/skills/
```

**When using the skill, explicitly say:**
```
Add secure LLM proxy using the reference implementation in references/ folder
```

---

## Issue 3: Not Respecting Existing Code

### ❌ Problem
Antigravity creates new code instead of building on existing project code.

### ✅ Solution

**The `app-init` skill now has Step 0: Analyze Existing Project.**

**Before starting, tell Antigravity:**
```
Before doing anything, analyze my existing project code.
I want to enhance my existing code, not replace it.
```

**Explicitly mention existing features:**
```
My project already has:
- Express.js server in src/server.ts
- User authentication in src/routes/auth.ts
- Database models in prisma/schema.prisma

Enhance these existing files, don't create new ones.
```

**Check if Antigravity analyzed your project:**

Look for output like:
```
📊 Existing Project Analysis:
- Framework: Express
- Database: PostgreSQL with Prisma
- Existing routes: /api/auth, /api/users
- Auth system: Yes (JWT)
```

If you don't see this, stop and say:
```
Please analyze my existing project first before making changes
```

---

## Issue 4: Not Asking for Local Database

### ❌ Problem
Antigravity doesn't ask for local PostgreSQL details or assumes Docker.

### ✅ Solution

**The `app-init` skill now defaults to local database.**

**When initializing, explicitly say:**
```
Initialize ASG AI S2PROD with local PostgreSQL database (no Docker)
```

**Provide connection details:**
```
Database: PostgreSQL (local)
Host: localhost
Port: 5432
Database: lexreply_db
Username: postgres
Password: [your password]
```

**If Antigravity still tries Docker:**
```
Stop! I want local PostgreSQL, not Docker.
Ask me for local database connection details.
```

---

## Issue 5: Creating Own Code vs Using References

### ❌ Problem
```
I'll create a configuration interface for the LLM proxy...  ❌ WRONG
```

### ✅ Solution

**Tell Antigravity explicitly:**
```
Don't create new code from scratch.

Read and copy from:
.agent/skills/secure-llm-proxy/references/implementation/

Specifically:
1. Read references/implementation/schema.prisma
2. Read references/implementation/config-llm-proxy.ts
3. Copy these EXACTLY to my project
4. Adapt only the paths and configuration
```

**Verify Antigravity reads references:**

You should see output like:
```
✅ Reading reference implementation from references/implementation/schema.prisma
✅ Found 5 database models: LLMProxyConfig, LLMProxyUser, ...
✅ Copying proven patterns to your project
```

If you don't see this, **STOP** and say:
```
Stop! Read the reference files first:
cat .agent/skills/secure-llm-proxy/references/implementation/schema.prisma
```

---

## Issue 6: Overwriting Existing Files

### ❌ Problem
Antigravity replaces `prisma/schema.prisma` instead of adding to it.

### ✅ Solution

**Tell Antigravity:**
```
DO NOT replace my existing prisma/schema.prisma file.

APPEND the LLM proxy models to the END of my existing schema.

Keep all my existing models: User, Role, etc.
```

**Verify before running migration:**
```bash
# Check that your existing models are still there
cat prisma/schema.prisma | grep "model User"
cat prisma/schema.prisma | grep "model LLMProxyConfig"

# Both should be found
```

---

## Best Practices to Avoid Issues

### 1. Start Fresh with Latest Skills
```bash
# Remove old version
rm -rf .agent/skills/*

# Copy latest (with all fixes)
cp -r /path/to/asgais2prod/* .agent/skills/

# Verify
ls -la .agent/skills/app-init/SKILL.md
```

### 2. Be Explicit in First Prompt
```
Initialize ASG AI S2PROD with these requirements:

1. Analyze my EXISTING project code first
2. Use .asgais2prod/ folder (not .app-to-production/)
3. Use local PostgreSQL (ask me for connection details)
4. Read reference implementations from .agent/skills/*/references/
5. Build on my existing code, don't replace it
6. Copy proven patterns, don't generate from scratch
```

### 3. Verify Each Step
After each action, check:
```bash
# Correct folder?
ls -la .asgais2prod/  # Should exist
ls -la .app-to-production/  # Should NOT exist

# Used references?
grep -r "from reference" <output>

# Kept existing code?
cat prisma/schema.prisma | grep "model User"  # Still there?
```

### 4. Stop and Correct Early
If you see:
- Wrong folder name → Stop immediately, correct it
- New code being generated → Stop, tell it to read references
- Existing code being replaced → Stop, tell it to append/enhance

**Don't let it continue with wrong approach!**

---

## Emergency Reset

If things go wrong:

### 1. Backup Your Work
```bash
cp -r src/ src-backup/
cp prisma/schema.prisma prisma/schema.prisma.backup
```

### 2. Remove Wrong Changes
```bash
# Remove wrong config folder
rm -rf .app-to-production/

# Restore schema if overwritten
cp prisma/schema.prisma.backup prisma/schema.prisma
```

### 3. Start Fresh Conversation
- Exit current Antigravity session
- Start new conversation
- Be very explicit from the start

### 4. Provide Example
```
I want to integrate secure LLM proxy into my EXISTING Express.js app.

Here's my current structure:
- src/server.ts (Express server)
- src/routes/ (existing routes)
- prisma/schema.prisma (existing models)

Please:
1. Analyze my existing code FIRST
2. Read from .agent/skills/secure-llm-proxy/references/
3. APPEND proxy models to my EXISTING prisma/schema.prisma
4. CREATE NEW route file: src/routes/llm-proxy.routes.ts
5. MOUNT it in EXISTING src/server.ts

Do NOT replace any existing files!
```

---

## Verification Checklist

After running any skill, verify:

- [ ] Correct folder created (`.asgais2prod/` not `.app-to-production/`)
- [ ] Reference files were read (`cat` commands in output)
- [ ] Existing code still works (test your app)
- [ ] New code added, not replaced (check file diffs)
- [ ] Database schema has both old and new models
- [ ] Local database configured (no Docker unless requested)

---

## Getting Help

If issues persist:

1. **Check skill version:**
   ```bash
   head -n 20 .agent/skills/app-init/SKILL.md
   # Should see: "⚠️ CRITICAL RULES"
   ```

2. **Re-download latest skills:**
   ```bash
   cd /path/to/claude
   git pull  # or download latest
   cp -r asgais2prod/* <your-project>/.agent/skills/
   ```

3. **Share logs with AIShift:**
   - Email: info@aishift.dev
   - Include: Prompt used, Antigravity output, file changes

---

## Key Reminders

1. ✅ Use **`.asgais2prod/`** folder
2. ✅ **Analyze existing project FIRST**
3. ✅ **Read reference implementations** before coding
4. ✅ **Local database is default** (not Docker)
5. ✅ **Build on existing code**, don't replace
6. ✅ **Copy proven patterns**, don't generate new
7. ✅ **Be explicit** in your prompts
8. ✅ **Stop and correct** if something's wrong

---

**Updated:** January 18, 2026  
**Version:** 2.0.0

---

**Powered by [AIShift](https://aishift.dev/)** - Accelerate Your Development 10× Faster with AI

Copyright © 2026 AIShift. All rights reserved.

