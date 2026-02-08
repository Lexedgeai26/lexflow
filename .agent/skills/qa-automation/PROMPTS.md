# QA Automation - Prompt Templates

Prompts to guide AI agents through generating and executing automated test suites for unit, integration, and E2E testing.

---

## 🚀 Quick Start

### Prompt 0: Generate Full Test Suite FULLY
```
Generate a complete automated test suite for my project FULLY. Execute ALL steps automatically.

Target Framework: [Jest/Vitest/Playwright]
Coverage Target: 80%+

⚠️ CRITICAL INSTRUCTIONS:
1. USE the qa-automation skill.
2. DO NOT stop to ask "what would you like to do next?"
3. ANALYZE existing code to understand features before writing tests.
4. GENERATE: Unit tests, Integration tests, and E2E tests.
5. RUN all tests and report results.

GO! Execute all steps now.
```

---

## Phase 1: Test Strategy & Setup

### Prompt 1: Analyze & Configure
```
Analyze my codebase and existing tests. Recommend and configure the best test framework (e.g., Vitest for projects using Vite).

Install necessary dependencies and create test configuration files.
```

---

## Phase 2: Generating Tests

### Prompt 2: Unit Testing
```
Generate unit tests for all core services and utilities. Focus on edge cases and business logic validation.

Ensure 80%+ line coverage.
```

### Prompt 3: Integration & API Testing
```
Generate integration tests for all API endpoints. Verify:
- Success cases
- Authentication/Authorization checks
- Validation errors (400)
- Not found cases (404)
- Server error handling (500)
```

---

## Phase 3: Validation

### Prompt 4: Run & Fix
```
Run the entire test suite and report any failures.

If tests fail:
1. Analyze the cause.
2. Fix the issues in the code OR the tests if they are stale.
3. Re-run until all pass.
```

---

## Quick Copy-Paste One-Liners

1. **Full QA**: `Use qa-automation to generate and run a complete test suite`
2. **Unit Tests**: `Generate unit tests for all files in [FOLDER]`
3. **API Tests**: `Create integration tests for all routes in [ROUTE_FILE]`
4. **Final Check**: `Run all tests and report coverage results`

---

**Part of ASG AI S2PROD Framework**  
**Powered by [AIShift](https://aishift.dev/)**
