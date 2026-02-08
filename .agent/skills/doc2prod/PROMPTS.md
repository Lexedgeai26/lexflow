# DOC2PROD - Prompt Templates

Simple, chronological prompts to guide AI agents through building complete projects from requirements to production.

---

## Phase 1: Requirements & Planning

### Prompt 0: Resume / Rehydrate Project
```
Use doc2prod to resume work on the current project.

1. Check for existing context in `docs/` (Context Rehydration).
2. Read the project spec and phase plans.
3. Determine the last completed phase.
4. Resume execution from the next pending phase.
```

---

### Prompt 1: Start New Project

**Option 1: Using asgais2prod prefix**
```
Use asgais2prod to create a new [PROJECT_TYPE] application.

Project: [PROJECT_NAME]

Requirements:
- [Feature 1]
- [Feature 2]
- [Feature 3]

Expected users: [NUMBER]
Deployment: [Docker/Cloud/VPS]

⚠️ EXECUTE ALL PHASES AUTOMATICALLY with approval gates between phases.

Start with requirements gathering.
```

**Option 2: Using doc2prod name**
```
Use doc2prod to create a new [PROJECT_TYPE] application.

Project: [PROJECT_NAME]

Requirements:
- [Feature 1]
- [Feature 2]
- [Feature 3]

Expected users: [NUMBER]
Deployment: [Docker/Cloud/VPS]

⚠️ EXECUTE ALL PHASES AUTOMATICALLY with approval gates between phases.

Start with requirements gathering.
```

---

### Prompt 2: Review Specification
```
Review the generated project specification.

Please confirm:
- Tech stack choices
- Database design
- Security architecture
- Phase breakdown

If approved, proceed to bootstrap.
```

---

## Phase 2: Project Bootstrap

### Prompt 3: Bootstrap Project
```
Bootstrap the project with:
- Folder structure
- Configuration files
- Database setup
- Initial dependencies

Test that the server starts successfully.
```

---

## Phase 3: Phased Implementation

### Prompt 4: Execute Phase 0 (Foundation)
```
Execute Phase 0: Foundation

Implement:
- Database schema and migrations
- Authentication system
- Core infrastructure
- Health check endpoints

Test all endpoints and wait for approval.
```

---

### Prompt 5: Execute Phase 1 (Core Features)
```
Execute Phase 1: Core Features

Implement:
- Primary business logic
- Main API endpoints
- Essential services
- Data validation

Test all features and wait for approval.
```

---

### Prompt 6: Execute Phase 2 (Secondary Features)
```
Execute Phase 2: Secondary Features

Implement:
- Additional functionality
- Integrations
- Advanced features

Test all features and wait for approval.
```

---

### Prompt 7: Execute Phase 3 (Advanced Features)
```
Execute Phase 3: Advanced Features

Implement:
- Optimizations
- Analytics
- Admin features
- Performance improvements

Test all features and wait for approval.
```

---

## Phase 4: Testing & Deployment

### Prompt 8: Generate Test Suite
```
Execute Phase 4: Testing & Deployment

Generate:
- Unit tests (80%+ coverage)
- Integration tests
- E2E tests
- Manual testing guide

Run all tests and report results.
```

---

### Prompt 9: Production Readiness
```
Prepare for production deployment:

Create:
- Docker configuration
- CI/CD pipeline
- Production environment config
- Deployment guide
- Production checklist

Verify all items on checklist.
```

---

## Quick Copy-Paste Templates

### For REST API

```
Use doc2prod to create a REST API for [DOMAIN].

Requirements:
- User authentication (JWT)
- CRUD operations for [ENTITIES]
- PostgreSQL database
- Docker deployment

Tech Stack: Node.js + Express + Prisma

Execute all phases with approval gates.
```

---

### For Full-Stack Application

```
Use doc2prod to build a full-stack [APPLICATION_TYPE].

Requirements:
- Frontend: React + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL
- Auth: JWT with refresh tokens
- Features: [LIST_FEATURES]

Execute all phases with approval gates.
```

---

### For Microservices

```
Use doc2prod to create a microservices architecture for [DOMAIN].

Requirements:
- Services: [LIST_SERVICES]
- API Gateway
- Service discovery
- Database per service
- Docker Compose

Execute all phases with approval gates.
```

---

## One-Liner Prompts

For quick copy-paste:

1. **Start Project**: `Use doc2prod to create a [TYPE] app with [FEATURES]`
2. **Resume Project**: `Use doc2prod to resume work from existing docs/`
3. **Review Spec**: `Review and approve the project specification`
3. **Bootstrap**: `Bootstrap the project structure`
4. **Phase 0**: `Execute Phase 0: Foundation with auth and database`
5. **Phase 1**: `Execute Phase 1: Core features`
6. **Phase 2**: `Execute Phase 2: Secondary features`
7. **Phase 3**: `Execute Phase 3: Advanced features`
8. **Testing**: `Execute Phase 4: Generate and run all tests`
9. **Production**: `Prepare for production deployment`
10. **Deploy**: `Create deployment guide and checklist`

---

## Detailed Example: Task Management System

### Step 1: Initialize
```
Use doc2prod to create a task management system.

Requirements:
- User authentication and authorization
- Task CRUD with assignments
- Team collaboration
- Due dates and priorities
- Comments on tasks
- Real-time notifications

Expected users: 500-1000
Tech preference: Node.js + React
Database: PostgreSQL
Deployment: Docker

Execute all phases with approval gates between each phase.
```

### Step 2: Review Specification
```
I've reviewed the specification. Looks good!

Please proceed with:
- Tech Stack: Node.js + Express + React + PostgreSQL
- Auth: JWT with refresh tokens
- Phase breakdown: P0-P4

Start bootstrap.
```

### Step 3: Bootstrap
```
Bootstrap approved. Proceed with Phase 0.
```

### Step 4: Phase 0
```
Phase 0 looks good. All tests passing.

Proceed to Phase 1: Core Features.
```

### Step 5: Phase 1
```
Phase 1 approved. Task CRUD working perfectly.

Proceed to Phase 2: Collaboration Features.
```

### Step 6: Phase 2
```
Phase 2 approved. Team features working well.

Proceed to Phase 3: Advanced Features.
```

### Step 7: Phase 3
```
Phase 3 approved. Notifications and analytics working.

Proceed to Phase 4: Testing & Deployment.
```

### Step 8: Testing
```
All tests passing! 85% coverage achieved.

Proceed with production preparation.
```

### Step 9: Production Ready
```
Production checklist complete. Ready to deploy!

Please provide deployment instructions for AWS.
```

---

## Troubleshooting Prompts

### Issue: Skill Not Activating
```
Activate the doc2prod skill to create a new project for [DESCRIPTION].
```

### Issue: Phases Being Skipped
```
Execute Phase [N] FULLY. Do not skip to the next phase.

Implement all deliverables, run tests, and wait for my approval.
```

### Issue: Tests Failing
```
Phase [N] tests are failing. Please:
1. Analyze the failures
2. Fix the issues
3. Re-run tests
4. Show results

Do not proceed until all tests pass.
```

### Issue: Missing Documentation
```
Generate missing documentation:
- [DOCUMENT_TYPE]

Ensure all documentation is complete before proceeding.
```

---

## Advanced Prompts

### Custom Tech Stack
```
Use doc2prod with custom tech stack:

Backend: [FRAMEWORK]
Frontend: [FRAMEWORK]
Database: [TYPE]
Auth: [METHOD]
Deployment: [PLATFORM]

Requirements: [LIST]

Execute all phases with approval gates.
```

### Existing Project Enhancement
```
Use doc2prod to enhance my existing project at [PATH].

Add:
- [Feature 1]
- [Feature 2]

Analyze existing code first, then implement in phases.
```

### Migration Project
```
Use doc2prod to migrate my application from [OLD_STACK] to [NEW_STACK].

Current: [DESCRIPTION]
Target: [DESCRIPTION]

Create migration plan and execute in phases.
```

---

## Best Practices

### 1. Be Specific
```
❌ "Create an app"
✅ "Use doc2prod to create a task management REST API with JWT auth and PostgreSQL"
```

### 2. Mention Approval Gates
```
❌ "Build everything"
✅ "Execute all phases with approval gates between each phase"
```

### 3. Specify Tech Stack
```
❌ "Use any tech"
✅ "Tech Stack: Node.js + Express + React + PostgreSQL"
```

### 4. Define Scale
```
❌ "For users"
✅ "Expected users: 1000-5000, 100 requests/minute"
```

### 5. Request Testing
```
❌ "Make it work"
✅ "Implement with 80%+ test coverage and manual testing guide"
```

---

## Success Indicators

Your prompts are working well when:

- ✅ Skill activates on first try
- ✅ Requirements gathering is thorough
- ✅ Specification is detailed and accurate
- ✅ Each phase completes fully before asking for approval
- ✅ Tests are generated and run automatically
- ✅ Documentation is comprehensive
- ✅ Production checklist is complete

---

## Common Mistakes to Avoid

### Mistake 1: Vague Requirements
```
❌ "Build a website"
✅ "Build a blog platform with user auth, post CRUD, comments, and categories"
```

### Mistake 2: No Approval Gates
```
❌ "Do everything at once"
✅ "Execute phases P0-P4 with approval between each"
```

### Mistake 3: Skipping Testing
```
❌ "Just make it work"
✅ "Implement with comprehensive test suite"
```

### Mistake 4: No Tech Stack Preference
```
❌ "Use whatever"
✅ "Use Node.js + Express + PostgreSQL"
```

### Mistake 5: Ignoring Scale
```
❌ "For some users"
✅ "For 500-1000 concurrent users"
```

---

## Template Customization

### Replace These Placeholders

- `[PROJECT_NAME]` - Your project name
- `[PROJECT_TYPE]` - REST API, Full-Stack App, Microservices, etc.
- `[FEATURES]` - List of required features
- `[ENTITIES]` - Data models (User, Post, Comment, etc.)
- `[FRAMEWORK]` - Express, FastAPI, NestJS, etc.
- `[DATABASE]` - PostgreSQL, MongoDB, MySQL, etc.
- `[NUMBER]` - Expected user count
- `[PLATFORM]` - AWS, GCP, Azure, Docker, etc.

---

## Version History

**Version**: 1.0  
**Last Updated**: 2026-01-19  
**Status**: Active ✅

---

**Part of ASG AI S2PROD Framework**  
**Powered by [AIShift](https://aishift.dev/)**
