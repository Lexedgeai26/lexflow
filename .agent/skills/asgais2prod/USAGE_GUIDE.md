## 💡 THE MOOT POINT (MANDATORY PHILOSOPHY)

**THE MAIN JOB OF THIS SUITE IS REAR-END PRODUCTION UPGRADE.**

1.  **PRESERVE EXISTING UI**: NEVER create new UI components or replace existing UI screens.
2.  **BEHIND-THE-SCENES INTEGRATION**: Focus on backend logic and integrating features into the *existing* frontend code via surgical edits.
3.  **NO NEW UI**: Do not inject or create new dashboard views or menu items unless functionally necessary.

---

## Step 1: Install the Skills

## Step 1: Install the Skills

First, copy the skills to your project:

```bash
# Navigate to your project
cd /path/to/your-project

# Create .agent/skills folder if it doesn't exist
mkdir -p .agent/skills

# Copy ASG AI S2PROD skills
cp -r /path/to/asgais2prod/* .agent/skills/
```

**Verify installation:**
```bash
ls -la .agent/skills/
# You should see: app-init/, schema-generation/, secure-llm-proxy/, etc.
```

---

## Step 2: Open Google Antigravity

Open your project in your IDE with Google Antigravity extension enabled, or use Antigravity CLI.

---

## Step 3: Use Natural Language Prompts

Google Antigravity automatically detects which skill to use based on your prompt. Just talk naturally!

### 🎯 Example Prompts

#### Initialize Project
```
Initialize ASG AI S2PROD conversion for my project
```

**What happens:**
- Antigravity activates the `app-init` skill
- Asks you questions interactively
- Creates `.asgais2prod/config.json`

---

#### Generate Database Schema
```
Generate PostgreSQL database schema from my documentation
```

or

```
Create database schema for user authentication and roles
```

**What happens:**
- Antigravity activates the `schema-generation` skill
- Reads your documentation
- Generates `schema.sql` and `seed.sql`

---

#### Add Secure LLM Proxy
```
Add secure LLM proxy to my app
```

or

```
I want to secure my Gemini API calls with a proxy
```

**What happens:**
- Antigravity activates the `secure-llm-proxy` skill
- Reads reference implementation
- Copies and adapts code to your project

---

#### Generate API Endpoints
```
Generate Express.js REST API endpoints
```

or

```
Create API routes for users and authentication
```

**What happens:**
- Antigravity activates the `api-generation` skill
- Creates route files
- Adds controllers and services

---

#### Review Code for Production
```
Review my code for production readiness
```

or

```
Check if my code is production-ready
```

**What happens:**
- Antigravity activates the `production-review` skill
- Analyzes code
- Reports issues and suggests fixes

---

#### Generate Tests
```
Generate automated tests for my project
```

or

```
Create test cases for authentication module
```

**What happens:**
- Antigravity activates the `qa-automation` skill
- Generates test files
- Creates test scripts

---

## How Skills Are Activated

Each skill has a `description` field in its `SKILL.md` file that tells Antigravity when to use it:

**Example from `app-init/SKILL.md`:**
```yaml
---
name: app-init
description: Initialize ASG AI S2PROD conversion. Use this skill when the user wants to start converting application documentation into a production-ready app, asks to "initialize conversion", "start project conversion", or "setup ASG AI S2PROD".
---
```

**This means Antigravity activates `app-init` when you say:**
- ✅ "Initialize ASG AI S2PROD conversion"
- ✅ "Start project conversion"
- ✅ "Setup ASG AI S2PROD"
- ✅ "Initialize conversion"
- ✅ Any similar phrase

---

## Complete Workflow Example

### Scenario: Convert Documentation to Production App

**Prompt 1: Initialize**
```
Initialize ASG AI S2PROD conversion
```

**Antigravity Response:**
```
Let's set up your project. What is your project directory path?
> /Users/me/my-app

What is the path to your documentation?
> docs/API_SPEC.md

Do you want Docker setup? (yes/no)
> no

Do you want to use local PostgreSQL? (yes/no)
> yes

What is your PostgreSQL connection URL?
> postgresql://localhost:5432/myapp

✅ Configuration saved to .asgais2prod/config.json
```

---

**Prompt 2: Generate Schema**
```
Generate database schema
```

**Antigravity Response:**
```
Reading documentation from docs/API_SPEC.md...
Found models: User, Role, Permission

Generated files:
✅ database/schema.sql
✅ database/seed.sql

Run: psql $DATABASE_URL -f database/schema.sql
```

---

**Prompt 3: Generate APIs**
```
Create Express.js API endpoints
```

**Antigravity Response:**
```
Generating API routes...

Created:
✅ src/routes/users.ts
✅ src/routes/auth.ts
✅ src/controllers/userController.ts
✅ src/services/userService.ts

Endpoints available:
- POST /api/auth/login
- POST /api/auth/register
- GET /api/users
- GET /api/users/:id
```

---

**Prompt 4: Add Security**
```
Add secure LLM proxy
```

**Antigravity Response:**
```
Reading reference implementation...

Added:
✅ prisma/schema.prisma (5 new tables)
✅ src/middleware/auto-user.middleware.ts
✅ src/routes/llm-proxy.routes.ts
✅ Updated .env with LLM keys

Test: curl http://localhost:4000/api/ai/health
```

---

**Prompt 5: Review**
```
Review code for production
```

**Antigravity Response:**
```
Reviewing codebase...

✅ No localStorage used for business data
✅ No mock/hardcoded data found
⚠️  Found 3 console.log statements - remove for production
✅ Error handling implemented
✅ Input validation present

Suggestions:
1. Remove console.log from auth.ts:45
2. Add rate limiting to /api/users
3. Enable CORS for production domains
```

---

## Quick Reference: Prompt → Skill Mapping

| Your Prompt | Skill Activated | What It Does |
|-------------|-----------------|--------------|
| "Initialize conversion" | `app-init` | Setup project config |
| "Generate schema" | `schema-generation` | Create database tables |
| "Create API endpoints" | `api-generation` | Generate Express routes |
| "Add authentication" | `auth-generation` | Implement JWT + RBAC |
| "Add Docker" | `docker-generation` | Create Docker files |
| "Add secure proxy" | `secure-llm-proxy` | Integrate LLM proxy |
| "Review for production" | `production-review` | Code quality check |
| "Generate tests" | `qa-automation` | Create test files |
| "Analyze docs" | `doc-analysis` | Extract requirements |
| "Check what's missing" | `gap-analysis` | Find incomplete features |

---

## Tips for Best Results

### ✅ Do:
- Use natural language
- Be specific about what you want
- Refer to your documentation path
- Mention the framework (Express, React, etc.)
- Ask follow-up questions

### ❌ Don't:
- Use technical jargon or code syntax
- Write very short 1-word prompts
- Skip the initialization step
- Expect it to work without documentation

---

## Troubleshooting

### Skill Not Activating?

**Problem:** "Generate schema" does nothing

**Solutions:**
1. Check skills are installed: `ls .agent/skills/`
2. Try more explicit prompt: "Generate PostgreSQL database schema"
3. Reference the skill name: "Use schema-generation skill"

---

### Wrong Skill Activated?

**Problem:** Asked for API but got schema

**Solutions:**
1. Be more specific: "Generate Express.js REST API routes"
2. Mention the output: "Create API endpoints in src/routes/"
3. Cancel and rephrase

---

### Skill Asks Too Many Questions?

**Problem:** Too many interactive prompts

**Solutions:**
1. Initialize first with `app-init` to save config
2. Config is saved in `.asgais2prod/config.json`
3. Skills read config automatically after first run

---

## Advanced Usage

### Force Specific Skill
```
Use secure-llm-proxy skill to integrate LLM proxy
```

### Chain Multiple Actions
```
Generate schema, then create API endpoints, then add tests
```

### Update Existing Code
```
Update the user authentication to use the secure LLM proxy
```

### Fix Issues
```
Fix the production issues found in the review
```

---

## Example Session (Full Conversation)

```
You: Initialize ASG AI S2PROD conversion
AI: [Asks configuration questions...]
AI: ✅ Setup complete!

You: Generate database schema from docs/spec.md
AI: [Generates schema.sql and seed.sql]
AI: ✅ Schema created!

You: Create Express API endpoints for users
AI: [Generates routes, controllers, services]
AI: ✅ API endpoints ready!

You: Add JWT authentication
AI: [Implements JWT middleware and auth routes]
AI: ✅ Authentication added!

You: Add secure LLM proxy
AI: [Integrates proxy with reference implementation]
AI: ✅ LLM proxy integrated!

You: Review everything for production
AI: [Analyzes all code]
AI: ✅ Production-ready! (with 2 minor suggestions)

You: Generate automated tests
AI: [Creates test files]
AI: ✅ 45 test cases generated!

You: Thanks!
AI: You're welcome! Your app is production-ready! 🚀
```

---

## Need Help?

If skills aren't working as expected:

1. **Check installation:**
   ```bash
   ls -la .agent/skills/app-init/SKILL.md
   ```

2. **Verify config:**
   ```bash
   cat .asgais2prod/config.json
   ```

3. **Read skill description:**
   ```bash
   head -n 10 .agent/skills/app-init/SKILL.md
   ```

4. **Contact AIShift:**
   - Email: info@aishift.dev
   - Website: https://aishift.dev/

---

## Summary

**Installation:**
```bash
cp -r asgais2prod/* <your-project>/.agent/skills/
```

**Usage:**
```
Just talk naturally to Antigravity!
"Initialize conversion"
"Generate schema"
"Create APIs"
"Review for production"
```

**That's it!** Antigravity handles the rest automatically. 🎉

---

**Powered by [AIShift](https://aishift.dev/)** - Accelerate Your Development 10× Faster with AI

Copyright © 2026 AIShift. All rights reserved.

