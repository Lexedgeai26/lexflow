# App Initialization - Prompt Templates

Prompts to guide AI agents through initializing any new project or transforming documentation into a production-ready application shell.

---

## 🚀 Quick Start

### Prompt 0: Initialize New Project FULLY
```
Use asgais2prod-init to initialize conversion.
```

or

```
Use app-init to bootstrap a new [TECH_STACK] application shell.
```

Project Documentation: [PATH_TO_DOCS]
Target Tech Stack: [TECH_STACK]
Database: PostgreSQL

⚠️ CRITICAL INSTRUCTIONS:
1. USE the app-init skill.
2. DO NOT stop to ask "what would you like to do next?"
3. EXECUTE the full initialization pipeline automatically.
4. Scaffold the project, install dependencies, and create initial configuration.
5. Report completion with a folder structure summary.

GO! Execute all steps now.
```

---

## Phase 1: Context & Discovery

### Prompt 1: Discovery Proof
```
Perform workspace discovery and report the findings:
- Current directory status (empty/existing)
- Environment checks (Node.js/npm versions)
- Available documentation analysis

Map the workspace topology before starting.
```

---

## Phase 2: Scaffolding

### Prompt 2: Bootstrap Core Structure
```
Create the foundational project structure:
- Folder hierarchy (src, docs, tests, etc.)
- Foundational configuration (package.json, tsconfig.json, .env.example)
- Database initialization (Prisma/TypeORM setup)

Run npm install to initialize dependencies.
```

### Prompt 3: Create Boilerplate
```
Generate the initial server boilerplate:
- Basic Express/NestJS setup
- Health check endpoints
- Error handling middleware
- Logger initialization
```

---

## Phase 3: Validation

### Prompt 4: Verify Bootstrap
```
Verify that the project shell is functional:
1. Ensure `npm run dev` starts without errors.
2. Test the /health endpoint.
3. Confirm database connection is successful.
```

---

## Quick Copy-Paste One-Liners

1. **New App**: `Use app-init to bootstrap a new [TECH_STACK] application shell`
2. **Convert Docs**: `Initialize project conversion from documentation folder [PATH]`
3. **Check Environment**: `Perform environment and discovery checks for a new project`
4. **Scaffold Only**: `Create folder structure and config files for [APP_TYPE]`

---

**Part of ASG AI S2PROD Framework**  
**Powered by [AIShift](https://aishift.dev/)**
