---
name: qa-automation
description: Generate and run automated tests. Use this when the user asks to "generate automated tests", "create test cases", "run tests", "setup testing", or "generate unit and integration tests".
---

# QA Automation - Automated Testing

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

## Goal

Detect tech stack, generate comprehensive automated test cases, and run tests using appropriate frameworks to verify all features are implemented.

## Instructions

### Step 1: Detect Tech Stack

Analyze the project to determine testing frameworks:

```bash
# Check package.json
cat package.json | grep -E "react|vue|angular|express|nestjs|fastify"

# Check for existing test config
ls -la | grep -E "jest|vitest|playwright|cypress"

# Check backend framework
grep -r "express\|fastify\|nestjs" --include="*.js" --include="*.ts" src/
```

### Framework Selection Matrix

| Detected Stack | Unit/Integration | E2E |
|----------------|------------------|-----|
| Express backend | Jest + Supertest | Playwright |
| React frontend | Jest/Vitest + Testing Library | Playwright |
| NestJS backend | Jest + Supertest | Playwright |
| PostgreSQL | pg-mem (in-memory) | - |

### Step 2: Install Dependencies

Based on detected stack:

```bash
# Backend testing
npm install --save-dev jest supertest @types/jest @types/supertest ts-jest

# Frontend testing
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# E2E testing
npm install --save-dev playwright @playwright/test

# Database testing
npm install --save-dev pg-mem
```

### Step 3: Create Test Configuration

**jest.config.js (Backend):**
```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

**playwright.config.ts (E2E):**
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:3034',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3034',
  },
});
```

### Step 4: Generate Test Files

Create comprehensive test suite:

```
tests/
├── unit/
│   ├── services/
│   │   ├── authService.test.ts
│   │   └── caseService.test.ts
│   └── utils/
│       └── validators.test.ts
├── integration/
│   ├── auth.test.ts
│   ├── cases.test.ts
│   ├── rbac.test.ts
│   └── database.test.ts
├── e2e/
│   ├── auth.spec.ts
│   ├── cases.spec.ts
│   └── flows.spec.ts
└── helpers/
    ├── db.ts
    └── setup.ts
```

### Step 5: Generate Authentication Tests

Create `tests/integration/auth.test.ts`:

```typescript
import request from 'supertest';
import app from '../../src/app';
import { setupTestDatabase, teardownTestDatabase } from '../helpers/db';

describe('Authentication API', () => {
  beforeAll(async () => await setupTestDatabase());
  afterAll(async () => await teardownTestDatabase());

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'SecurePass123!',
          fullName: 'Test User'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.accessToken).toBeDefined();
    });

    it('should reject duplicate email', async () => {
      // First registration
      await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'SecurePass123!',
          fullName: 'User 1'
        });

      // Duplicate attempt
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'SecurePass123!',
          fullName: 'User 2'
        });

      expect(response.status).toBe(409);
    });

    it('should reject weak password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'weak@example.com',
          password: '123',
          fullName: 'Weak Password User'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'SecurePass123!'
        });

      expect(response.status).toBe(200);
      expect(response.body.data.accessToken).toBeDefined();
    });

    it('should reject wrong password', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
    });
  });
});
```

### Step 6: Generate CRUD Tests

Create `tests/integration/cases.test.ts`:

```typescript
describe('Cases API', () => {
  let accessToken: string;

  beforeAll(async () => {
    await setupTestDatabase();
    accessToken = await getTestToken();
  });

  describe('POST /api/cases', () => {
    it('should create a new case', async () => {
      const response = await request(app)
        .post('/api/cases')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          legalName: 'Test Company',
          gstin: '12ABCDE1234F1Z5'
        });

      expect(response.status).toBe(201);
      expect(response.body.data.id).toBeDefined();
    });

    it('should reject unauthenticated request', async () => {
      const response = await request(app)
        .post('/api/cases')
        .send({ legalName: 'Test' });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/cases', () => {
    it('should return list of cases', async () => {
      const response = await request(app)
        .get('/api/cases')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});
```

### Step 7: Generate E2E Tests

Create `tests/e2e/auth.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should register new user', async ({ page }) => {
    await page.goto('/register');

    await page.fill('input[name="email"]', 'e2e@test.com');
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.fill('input[name="fullName"]', 'E2E Test User');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
  });

  test('should login existing user', async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'admin@example.com');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### Step 8: Add NPM Scripts

Add to `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:integration": "jest --testPathPattern=integration",
    "test:e2e": "playwright test",
    "test:all": "npm run test:coverage && npm run test:e2e"
  }
}
```

### Step 9: Run Tests and Report

```bash
# Run all tests
npm run test:all
```

Generate report:

```markdown
# QA AUTOMATION TEST REPORT

**Project:** [name]
**Date:** [timestamp]

## Test Summary

| Category | Total | Passed | Failed |
|----------|-------|--------|--------|
| Unit Tests | 15 | 15 | 0 |
| Integration Tests | 32 | 30 | 2 |
| E2E Tests | 12 | 12 | 0 |
| **TOTAL** | **59** | **57** | **2** |

**Pass Rate:** 96.6%

## Coverage

| Metric | Coverage |
|--------|----------|
| Statements | 87% |
| Branches | 82% |
| Functions | 91% |
| Lines | 86% |

## Feature Coverage

### Authentication
- [x] User registration (3 tests)
- [x] User login (2 tests)
- [x] Token refresh (2 tests)
- [x] Logout (1 test)

### CRUD Operations
- [x] Create (3 tests)
- [x] Read (4 tests)
- [x] Update (2 tests)
- [x] Delete (2 tests)

### Authorization
- [x] Admin access (2 tests)
- [x] User restrictions (2 tests)

### E2E Flows
- [x] Registration flow (1 test)
- [x] Login flow (1 test)
- [x] CRUD flow (3 tests)

## Failed Tests

1. **auth.test.ts:145** - Token refresh endpoint not implemented
2. **cases.test.ts:89** - Pagination returns wrong count

## Recommendations

- Fix 2 failing tests before deployment
- Increase branch coverage to 85%+
- Add edge case tests
```

## Test Categories

Generate tests for:

1. **Authentication** (10+ tests)
   - Registration, login, logout
   - Password validation
   - Token refresh

2. **CRUD API** (15+ tests)
   - Create, read, update, delete
   - Pagination, filtering
   - Error handling

3. **Authorization** (8+ tests)
   - Admin access
   - User restrictions
   - Resource ownership

4. **Database** (10+ tests)
   - Schema validation
   - Constraints
   - Cascades

5. **E2E** (15+ tests)
   - Full user flows
   - Error handling
   - UI validation

## Coverage Requirements

| Metric | Minimum | Target |
|--------|---------|--------|
| Statements | 80% | 90% |
| Branches | 75% | 85% |
| Functions | 80% | 90% |
| Lines | 80% | 90% |

## Constraints

- Detect stack automatically
- Generate tests for ALL features
- Run tests and report results
- Target 80%+ coverage
- Tests must pass before deployment

## Example Interaction

User: "Generate automated tests for all features"

Agent: [Detects Express + React stack]

Agent: [Installs Jest, Supertest, Playwright]

Agent: [Generates 59 test cases]

Agent: [Runs tests]

Agent: "✅ Generated 59 tests:
- 15 unit tests
- 32 integration tests
- 12 E2E tests
- Coverage: 87%
- Pass rate: 96.6%

2 tests failed - see report"

