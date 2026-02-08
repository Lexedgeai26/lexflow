# Schema Generation - Prompt Templates

Prompts to guide AI agents through designing and implementing optimized PostgreSQL schemas and migrations for any application.

---

## 🚀 Quick Start

### Prompt 0: Generate Database Schema FULLY
```
Generate an optimized PostgreSQL database schema for my project FULLY based on the provided documentation.

Documentation folder: [DOCS_PATH]
Database goal: PostgreSQL with Prisma ORM

⚠️ CRITICAL INSTRUCTIONS:
1. USE the schema-generation skill.
2. DO NOT stop to ask "what would you like to do next?"
3. ANALYZE all documentation to find all entities and relationships.
4. GENERATE: Prisma schema file or raw SQL with proper indexes and constraints.
5. CREATE a migration and seed script with realistic sample data.

GO! Execute all steps now.
```

---

## Phase 1: Conceptual Design

### Prompt 1: Analyze Entities
```
Read the project documentation and list all key entities, attributes, and relationships (1-to-1, 1-to-many, many-to-many).

Present use-case scenarios for each major table.
```

---

## Phase 2: Implementation

### Prompt 2: Core Schema Design
```
Design the core database schema. Ensure:
- Use of UUIDs for primary keys.
- Proper foreign key constraints.
- Creation of indexes for all searchable columns.
- Timestamps for all tables (created_at, updated_at).
```

### Prompt 3: Apply Migrations
```
Generate the initial migration files and apply them to the database.

Database: [DB_DETAILS]
```

---

## Phase 3: Population

### Prompt 4: Seed Realistic Data
```
Create a seeding script (`seed.ts` or `seed.sql`) that populates the database with realistic mock data (at least 10-20 records per table).

Ensure the dashboard doesn't look empty on first launch!
```

---

## Quick Copy-Paste One-Liners

1. **Full Schema**: `Use schema-generation to design and implement a PostgreSQL database`
2. **Add Tables**: `Add new tables for [FEATURES] to existing schema`
3. **Optimze DB**: `Add necessary indexes and constraints to current schema`
4. **Seed Database**: `Create a seed script with realistic data for all tables`

---

**Part of ASG AI S2PROD Framework**  
**Powered by [AIShift](https://aishift.dev/)**
