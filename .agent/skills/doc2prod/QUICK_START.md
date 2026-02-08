# DOC2PROD - Quick Start Guide

Complete walkthrough for building production-ready applications from requirements to deployment.

---

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start (5 Minutes)](#quick-start-5-minutes)
- [Detailed Walkthrough](#detailed-walkthrough)
- [Example Projects](#example-projects)
- [Troubleshooting](#troubleshooting)

---

## Overview

DOC2PROD transforms project requirements into production-ready applications through a phased, tested approach:

1. **Requirements Gathering** - Interactive discovery of project needs
2. **Specification Generation** - Detailed technical architecture
3. **Project Bootstrap** - Automated scaffolding
4. **Phased Implementation** - P0 → P1 → P2 → P3 → P4
5. **Testing & Validation** - Comprehensive test suite
6. **Production Deployment** - Docker, CI/CD, deployment guides

**Total Time**: 30 minutes to 4 hours (depending on project complexity)

---

## Prerequisites

### Required Tools
```bash
# Node.js (v18+ recommended)
node --version

# npm or yarn
npm --version

# Docker (optional but recommended)
docker --version
docker-compose --version

# PostgreSQL client (for database projects)
psql --version

# Git
git --version
```

### Skill Installation

```bash
# Navigate to your workspace
cd /path/to/your-workspace

# Copy doc2prod skill
cp -r /path/to/GAG_SKILL/doc2prod .agent/skills/

# Verify installation
ls .agent/skills/doc2prod/SKILL.md
```

---

## Quick Start (5 Minutes)

### Step 1: Prepare Your Idea (1 minute)

Write a brief description:
```
I want to build a task management system with:
- User authentication
- Task CRUD operations
- Team collaboration
- Due dates and priorities
```

### Step 2: Activate Skill (1 minute)

Tell Google Antigravity:
```
Use doc2prod to create a task management REST API.

Requirements:
- User authentication (JWT)
- Task CRUD with assignments
- PostgreSQL database
- Docker deployment

Execute all phases with approval gates.
```

### Step 3: Answer Questions (2 minutes)

Antigravity will ask:
- Expected number of users?
- Tech stack preference?
- Security requirements?
- Deployment target?

### Step 4: Review & Approve (1 minute)

Review the generated specification and approve to start implementation.

### Step 5: Monitor Progress

Antigravity will:
- Bootstrap project ✅
- Implement Phase 0 (Foundation) ✅
- Wait for your approval
- Implement Phase 1 (Core Features) ✅
- Wait for your approval
- Continue through all phases...

### Step 6: Resume Later (If needed)

If you take a break, you can resume anytime:
```
Use doc2prod to resume work from existing docs/
```
Antigravity will read your `docs/` folder and pick up exactly where you left off.

---

## Detailed Walkthrough

### Example: Building a Blog Platform

#### Phase 1: Requirements Discovery

**Your Prompt:**
```
Use doc2prod to create a blog platform.

Requirements:
- User authentication and profiles
- Create/edit/delete blog posts
- Rich text editor
- Comments on posts
- Categories and tags
- Search functionality

Expected users: 1000-5000
Deployment: Docker
```

**Antigravity Asks:**

1. **Features Confirmation:**
   ```
   Let me understand the core features:
   
   - What are the MUST-HAVE features (P0)?
   - What are the NICE-TO-HAVE features (P1-P2)?
   - What are the FUTURE features (P3+)?
   ```

   **Your Response:**
   ```
   MUST-HAVE (P0):
   - User auth (register, login)
   - Post CRUD
   - Basic text editor
   
   NICE-TO-HAVE (P1-P2):
   - Rich text editor
   - Comments
   - Categories/tags
   
   FUTURE (P3):
   - Search
   - Analytics
   ```

2. **Tech Stack:**
   ```
   Do you have a preferred tech stack?
   
   I recommend:
   - Backend: Node.js + Express + TypeScript
   - Database: PostgreSQL
   - Frontend: React + TypeScript (optional)
   - Auth: JWT
   ```

   **Your Response:**
   ```
   Looks good! Use your recommendations.
   ```

3. **Security:**
   ```
   Security requirements:
   - Authentication method: JWT/OAuth/Session?
   - Authorization model: RBAC/ABAC?
   - Data encryption needs?
   ```

   **Your Response:**
   ```
   - JWT with refresh tokens
   - RBAC (Admin, Author, Reader roles)
   - Standard encryption (HTTPS, password hashing)
   ```

4. **Database:**
   ```
   Database setup:
   - Use existing PostgreSQL server?
   - Or set up in Docker?
   ```

   **Your Response:**
   ```
   Set up in Docker
   ```

#### Phase 2: Specification Review

**Antigravity Generates:**

```markdown
# Blog Platform - Project Specification

## Architecture
- Monolithic backend with REST API
- React SPA frontend (optional)
- PostgreSQL database
- JWT authentication
- Docker Compose for local dev

## Tech Stack
- Backend: Node.js 18 + Express + TypeScript
- Database: PostgreSQL 15 + Prisma ORM
- Frontend: React 18 + TypeScript + Tailwind CSS
- Auth: JWT with refresh tokens
- Testing: Jest + Supertest + Playwright

## Database Schema
- users (id, email, password_hash, role, created_at)
- posts (id, title, content, author_id, published, created_at)
- comments (id, post_id, user_id, content, created_at)
- categories (id, name, slug)
- tags (id, name, slug)

## API Endpoints
POST /api/auth/register
POST /api/auth/login
POST /api/auth/refresh
GET  /api/posts
POST /api/posts
GET  /api/posts/:id
PUT  /api/posts/:id
DELETE /api/posts/:id
...

## Phase Breakdown
- P0: Foundation (4-6 hours)
  - Project setup, database, auth
- P1: Core Features (6-8 hours)
  - Post CRUD, basic editor
- P2: Social Features (4-6 hours)
  - Comments, categories, tags
- P3: Advanced Features (3-4 hours)
  - Search, analytics
- P4: Testing & Deployment (4-6 hours)
  - Tests, documentation, Docker

Total Estimated: 21-30 hours
```

**Your Response:**
```
Specification approved! Proceed with bootstrap.
```

#### Phase 3: Project Bootstrap

**Antigravity Executes:**

```bash
📁 [4/13] Creating project structure...

✅ Created docs/requirements.md
✅ Created docs/project-spec.md
✅ Created docs/folder-structure.md
✅ Created docs/database-schema.md
✅ Created src/server/
✅ Created tests/
✅ Created prisma/schema.prisma
✅ Generated package.json
✅ Generated tsconfig.json
✅ Created docker-compose.yml
✅ Created Dockerfile
✅ Created .env.example
✅ Created .gitignore
✅ Installing dependencies...
✅ Dependencies installed

📦 [5/13] Testing bootstrap...

✅ Server starts successfully
✅ Database connection verified
✅ Health check endpoint responds

Project bootstrapped successfully!

Ready to start Phase 0: Foundation?
```

**Your Response:**
```
Yes, proceed with Phase 0.
```

#### Phase 4: Phase 0 - Foundation

**Antigravity Implements:**

```bash
🏗️ [6/13] Executing Phase 0: Foundation...

Objectives:
- Set up authentication system
- Create user model and migrations
- Implement register/login/logout
- Add JWT middleware
- Create user routes

Implementing...

✅ Created prisma/schema.prisma (User model)
✅ Created src/server/middleware/auth.middleware.ts
✅ Created src/server/routes/auth.routes.ts
✅ Created src/server/controllers/auth.controller.ts
✅ Created src/server/services/auth.service.ts
✅ Created src/server/utils/jwt.utils.ts
✅ Created src/server/utils/password.utils.ts
✅ Ran migrations

Testing Phase 0...

✅ POST /api/auth/register - Success (201)
✅ POST /api/auth/login - Success (200)
✅ GET /api/auth/me - Success (200) with token
✅ POST /api/auth/logout - Success (200)

Gap Analysis:
✅ All P0 acceptance criteria met
✅ No gaps identified

Phase 0 Complete!

Summary:
- ✅ User authentication working
- ✅ JWT tokens generated
- ✅ Protected routes functional
- ✅ All tests passing

Continue to Phase 1: Core Features?
```

**Your Response:**
```
Phase 0 approved! Continue to Phase 1.
```

#### Phase 5: Phase 1 - Core Features

**Antigravity Implements:**

```bash
📝 [7/13] Executing Phase 1: Core Features...

Objectives:
- Implement post CRUD operations
- Add rich text editor support
- Create post routes and controllers
- Add authorization checks
- Implement pagination

Implementing...

✅ Updated prisma/schema.prisma (Post model)
✅ Created src/server/routes/post.routes.ts
✅ Created src/server/controllers/post.controller.ts
✅ Created src/server/services/post.service.ts
✅ Added authorization middleware
✅ Implemented pagination
✅ Ran migrations

Testing Phase 1...

✅ POST /api/posts - Success (201) - Author can create
✅ GET /api/posts - Success (200) - Returns paginated list
✅ GET /api/posts/:id - Success (200) - Returns post
✅ PUT /api/posts/:id - Success (200) - Author can update
✅ DELETE /api/posts/:id - Success (204) - Author can delete
✅ PUT /api/posts/:id - Forbidden (403) - Non-author cannot update

Gap Analysis:
✅ All P1 acceptance criteria met
✅ No gaps identified

Phase 1 Complete!

Summary:
- ✅ Post CRUD fully functional
- ✅ Authorization working correctly
- ✅ Pagination implemented
- ✅ All tests passing

Continue to Phase 2: Social Features?
```

**Your Response:**
```
Phase 1 approved! Continue to Phase 2.
```

#### Phase 6: Phase 2 - Social Features

**Antigravity Implements:**

```bash
💬 [8/13] Executing Phase 2: Social Features...

Objectives:
- Implement comments system
- Add categories and tags
- Create relationships
- Add filtering by category/tag

Implementing...

✅ Updated prisma/schema.prisma (Comment, Category, Tag models)
✅ Created src/server/routes/comment.routes.ts
✅ Created src/server/routes/category.routes.ts
✅ Created src/server/routes/tag.routes.ts
✅ Created controllers and services
✅ Ran migrations

Testing Phase 2...

✅ POST /api/posts/:id/comments - Success (201)
✅ GET /api/posts/:id/comments - Success (200)
✅ GET /api/categories - Success (200)
✅ GET /api/posts?category=tech - Success (200) - Filtered
✅ POST /api/posts/:id/tags - Success (200) - Tags added

Gap Analysis:
✅ All P2 acceptance criteria met
✅ No gaps identified

Phase 2 Complete!

Summary:
- ✅ Comments system working
- ✅ Categories and tags functional
- ✅ Filtering implemented
- ✅ All tests passing

Continue to Phase 3: Advanced Features?
```

**Your Response:**
```
Phase 2 approved! Continue to Phase 3.
```

#### Phase 7: Phase 3 - Advanced Features

**Antigravity Implements:**

```bash
🚀 [9/13] Executing Phase 3: Advanced Features...

Objectives:
- Implement search functionality
- Add analytics tracking
- Create admin dashboard endpoints
- Optimize database queries

Implementing...

✅ Created src/server/routes/search.routes.ts
✅ Created src/server/services/search.service.ts
✅ Added full-text search indexes
✅ Created analytics tracking
✅ Added admin routes
✅ Optimized queries with indexes

Testing Phase 3...

✅ GET /api/search?q=javascript - Success (200) - Returns results
✅ GET /api/admin/analytics - Success (200) - Admin only
✅ GET /api/admin/users - Success (200) - Admin only
✅ GET /api/admin/users - Forbidden (403) - Non-admin

Gap Analysis:
✅ All P3 acceptance criteria met
✅ No gaps identified

Phase 3 Complete!

Summary:
- ✅ Search working efficiently
- ✅ Analytics tracking active
- ✅ Admin features functional
- ✅ All tests passing

Continue to Phase 4: Testing & Deployment?
```

**Your Response:**
```
Phase 3 approved! Continue to Phase 4.
```

#### Phase 8: Phase 4 - Testing & Deployment

**Antigravity Implements:**

```bash
✅ [10/13] Executing Phase 4: Testing & Deployment...

Generating test suite...

✅ Created tests/unit/auth.test.ts (15 tests)
✅ Created tests/unit/posts.test.ts (20 tests)
✅ Created tests/unit/comments.test.ts (10 tests)
✅ Created tests/integration/api.test.ts (25 tests)
✅ Created tests/e2e/user-flow.test.ts (8 tests)

Running tests...

 PASS  tests/unit/auth.test.ts
 PASS  tests/unit/posts.test.ts
 PASS  tests/unit/comments.test.ts
 PASS  tests/integration/api.test.ts
 PASS  tests/e2e/user-flow.test.ts

Test Suites: 5 passed, 5 total
Tests:       78 passed, 78 total
Coverage:    87.3%

✅ All tests passing!

Creating documentation...

✅ Created docs/manual-testing-guide.md
✅ Created docs/production-checklist.md
✅ Created docs/api-documentation.md
✅ Updated README.md

Creating deployment configuration...

✅ Optimized Dockerfile (multi-stage build)
✅ Created docker-compose.prod.yml
✅ Created .github/workflows/ci.yml
✅ Created deployment guides for AWS/GCP/Azure

Production Checklist:
✅ All environment variables documented
✅ Security best practices followed
✅ Error handling comprehensive
✅ Logging implemented
✅ Performance optimized
✅ Documentation complete
✅ Tests passing (87% coverage)
✅ Docker configuration ready
✅ CI/CD pipeline configured

Project Complete! 🎉

Your blog platform is ready for deployment.

Next steps:
1. Review docs/manual-testing-guide.md
2. Test features in browser
3. Review docs/production-checklist.md
4. Deploy using docs/deployment-guide.md
```

---

## Example Projects

### 1. Simple REST API (1-2 hours)

```
Use doc2prod to create a REST API for a note-taking app.

Requirements:
- User authentication
- Note CRUD operations
- Markdown support
- Tags

Tech: Node.js + Express + PostgreSQL
```

**Phases:**
- P0: Auth + Database (30 min)
- P1: Note CRUD (30 min)
- P2: Tags (20 min)
- P3: Testing (20 min)

---

### 2. Full-Stack Application (3-4 hours)

```
Use doc2prod to build a recipe sharing platform.

Requirements:
- User profiles
- Recipe CRUD with images
- Ratings and reviews
- Search and filters
- Favorites

Tech: React + Node.js + PostgreSQL
```

**Phases:**
- P0: Auth + Database (45 min)
- P1: Recipe CRUD (60 min)
- P2: Social features (45 min)
- P3: Search + Advanced (45 min)
- P4: Testing + Deployment (45 min)

---

### 3. Microservices (6-8 hours)

```
Use doc2prod to create a microservices e-commerce platform.

Services:
- User service
- Product service
- Order service
- Payment service
- Notification service

Tech: NestJS + PostgreSQL + Redis + Docker
```

**Phases:**
- P0: Infrastructure + Auth (90 min)
- P1: Core services (120 min)
- P2: Integration (90 min)
- P3: Advanced features (90 min)
- P4: Testing + Deployment (90 min)

---

## Troubleshooting

### Issue 1: Skill Not Activating

**Symptom:** Antigravity doesn't recognize the doc2prod skill

**Solution:**
```bash
# Verify installation
ls .agent/skills/doc2prod/SKILL.md

# Use explicit activation
"Activate the doc2prod skill to create a new project"
```

---

### Issue 2: Phases Being Skipped

**Symptom:** Antigravity implements multiple phases at once

**Solution:**
```
Execute Phase [N] ONLY. Do not proceed to the next phase.

Wait for my approval before continuing.
```

---

### Issue 3: Tests Failing

**Symptom:** Tests fail during phase validation

**Solution:**
```
Phase [N] tests are failing. Please:
1. Show me the error messages
2. Fix the issues
3. Re-run tests
4. Wait for approval

Do not proceed until all tests pass.
```

---

### Issue 4: Database Connection Failed

**Symptom:** Cannot connect to database

**Solution:**
```bash
# Check Docker
docker ps | grep postgres

# Start database
docker-compose up -d postgres

# Verify connection
psql "$DATABASE_URL"
```

---

### Issue 5: Port Already in Use

**Symptom:** Server won't start (EADDRINUSE)

**Solution:**
```bash
# Find process
lsof -i :4000

# Kill process
kill -9 <PID>

# Or use different port
PORT=4001 npm run dev
```

---

## Best Practices

### 1. Clear Requirements
```
✅ GOOD:
"Create a task management API with user auth, task CRUD, team collaboration, 
and PostgreSQL database. Expected 500-1000 users."

❌ BAD:
"Make a task app"
```

### 2. Explicit Phase Control
```
✅ GOOD:
"Execute all phases with approval gates between each phase"

❌ BAD:
"Do everything"
```

### 3. Tech Stack Specification
```
✅ GOOD:
"Tech Stack: Node.js 18 + Express + TypeScript + PostgreSQL + Prisma"

❌ BAD:
"Use any tech"
```

### 4. Testing Requirements
```
✅ GOOD:
"Generate comprehensive test suite with 80%+ coverage"

❌ BAD:
"Add some tests"
```

---

## Success Metrics

Your project is successful when:

- ✅ All phases completed
- ✅ All tests passing
- ✅ Test coverage ≥ 80%
- ✅ Documentation complete
- ✅ Production checklist verified
- ✅ Application runs in Docker
- ✅ CI/CD pipeline configured

---

## Next Steps

After completing your project:

1. **Test Locally**
   ```bash
   docker-compose up
   npm test
   ```

2. **Review Documentation**
   - Read `docs/manual-testing-guide.md`
   - Check `docs/production-checklist.md`

3. **Deploy to Staging**
   - Follow `docs/deployment-guide.md`
   - Test in staging environment

4. **Monitor & Optimize**
   - Set up monitoring
   - Review performance
   - Optimize as needed

---

## Support

Need help?

- 📖 Read [SKILL.md](./SKILL.md) for detailed documentation
- 📋 Check [PROMPTS.md](./PROMPTS.md) for more templates
- 📧 Contact: info@aishift.dev
- 🌐 Website: https://aishift.dev

---

**Version**: 1.0  
**Last Updated**: 2026-01-19  
**Status**: Active ✅

---

**Part of ASG AI S2PROD Framework**  
**Powered by [AIShift](https://aishift.dev/)**
