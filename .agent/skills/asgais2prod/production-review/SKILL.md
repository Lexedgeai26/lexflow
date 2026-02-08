---
name: production-review
description: Review code for production readiness. Use this when the user asks to "review code for production", "check production readiness", "final review before deployment", or "validate production code".
---

# Production Readiness Review

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

## Goal

Perform comprehensive review to ensure code is production-ready, with NO localStorage data storage, NO mock data, and ALL data stored in the configured database.

## 🔴 CRITICAL: localStorage & Mock Data Removal

**This is the MOST IMPORTANT check.**

### Search for localStorage Usage

Run these commands and report ALL findings:

```bash
# Find localStorage data storage (MUST return ZERO results for business data)
grep -rn "localStorage\.\(setItem\|getItem\)" --include="*.js" --include="*.ts" --include="*.jsx" --include="*.tsx" src/ | grep -v "Token\|token\|theme\|llmProvider"

# Find sessionStorage
grep -rn "sessionStorage" --include="*.js" --include="*.ts" src/

# Find mock/hardcoded data
grep -rn "mock\|Mock\|fake\|Fake\|dummy\|hardcode\|HARDCODE" --include="*.js" --include="*.ts" src/

# Find TODO/FIXME
grep -rn "TODO\|FIXME\|HACK\|XXX\|TEMP" --include="*.js" --include="*.ts" src/

# Find console.log
grep -rn "console\.log" --include="*.js" --include="*.ts" src/ | grep -v "node_modules"
```

### Allowed localStorage (ONLY these):
- ✅ `localStorage.getItem('accessToken')` - JWT token
- ✅ `localStorage.getItem('refreshToken')` - Refresh token
- ✅ `localStorage.getItem('theme')` - UI preference
- ✅ `localStorage.getItem('llmProvider')` - User preference

### MUST BE REMOVED:
- ❌ `localStorage.setItem('users', ...)`
- ❌ `localStorage.setItem('cases', ...)`
- ❌ `localStorage.setItem('gst_saved_cases', ...)`
- ❌ ANY business data in localStorage
- ❌ Mock data arrays
- ❌ Hardcoded test data
- ❌ console.log statements
- ❌ TODO/FIXME comments

## Review Checklist

### 1. Database Review

```markdown
## DATABASE REVIEW

- [ ] All tables have PRIMARY KEY (UUID preferred)
- [ ] Foreign keys with proper CASCADE rules
- [ ] NOT NULL constraints where required
- [ ] CHECK constraints for enums
- [ ] Indexes on foreign keys and queried columns
- [ ] GRANT statements included
- [ ] Seed scripts are IDEMPOTENT (use ON CONFLICT DO NOTHING)
- [ ] NO TRUNCATE or DELETE in seed scripts
- [ ] Valid UUIDs (no invalid hex chars)
```

### 2. API Endpoint Review

```markdown
## API ENDPOINT REVIEW

For each endpoint, verify:

- [ ] Proper HTTP method (GET, POST, PUT, DELETE)
- [ ] Request validation (Joi/Zod schema)
- [ ] Authentication required where needed
- [ ] Authorization (RBAC) applied
- [ ] Try-catch on all async operations
- [ ] Correct HTTP status codes (200, 201, 400, 401, 403, 404, 500)
- [ ] Consistent response format { success, data/error }
- [ ] Error messages don't expose internals
- [ ] Pagination on list endpoints
- [ ] No SQL injection (parameterized queries)
```

### 3. Authentication Review

```markdown
## AUTHENTICATION REVIEW

- [ ] JWT access token generated correctly
- [ ] JWT refresh token generated correctly
- [ ] Token expiry set (8h access, 7d refresh)
- [ ] Secrets from environment variables
- [ ] bcrypt used for password hashing (salt rounds >= 12)
- [ ] Password NEVER stored in plain text
- [ ] Generic error messages (don't reveal user exists)
- [ ] Rate limiting on auth endpoints
- [ ] Token refresh endpoint implemented
```

### 4. Data Storage Review ⚠️ CRITICAL

```markdown
## DATA STORAGE REVIEW

### User Data Flow
- [ ] Registration saves to `users` table via API (NOT localStorage)
- [ ] Login fetches from `users` table via API (NOT localStorage)
- [ ] Profile updates go to database via API (NOT localStorage)

### Business Data Flow (Cases, Reports, etc.)
- [ ] Create → saves to database via API (NOT localStorage)
- [ ] Read → fetches from database via API (NOT localStorage)
- [ ] Update → modifies database via API (NOT localStorage)
- [ ] Delete → removes from database via API (NOT localStorage)

### Frontend Actions
- [ ] ALL data flows through API endpoints
- [ ] NO direct localStorage for business data
- [ ] ONLY tokens/theme/preferences in localStorage
```

### 5. Environment Configuration

```markdown
## ENVIRONMENT REVIEW

- [ ] .env.example provided with all variables
- [ ] .env added to .gitignore
- [ ] dotenv.config() called correctly (NO bad paths like '../.env')
- [ ] Required variables validated on startup
- [ ] PORT conflict handling
- [ ] All secrets from environment (not hardcoded)
```

### 6. Code Cleanup

```markdown
## CODE CLEANUP

- [ ] NO console.log statements (except logger)
- [ ] NO commented-out code
- [ ] NO TODO/FIXME comments (or all resolved)
- [ ] NO unused imports
- [ ] NO unused functions
- [ ] NO mock data files
- [ ] NO hardcoded arrays of business data
```

## Instructions

### Step 1: Run All Checks

Execute all grep commands above and collect results.

### Step 2: Generate Report

Create a detailed report:

```markdown
# PRODUCTION READINESS REVIEW REPORT

**Date:** [timestamp]
**Project:** [name]

## Summary

| Category | Status |
|----------|--------|
| localStorage Cleanup | ✅ PASS / ❌ FAIL |
| Mock Data Removal | ✅ PASS / ❌ FAIL |
| Database Usage | ✅ PASS / ❌ FAIL |
| API Endpoints | ✅ PASS / ❌ FAIL |
| Authentication | ✅ PASS / ❌ FAIL |
| Environment Config | ✅ PASS / ❌ FAIL |
| Code Cleanup | ✅ PASS / ❌ FAIL |

**Overall Status:** READY / NEEDS FIXES

## Issues Found

### CRITICAL Issues (Must Fix)

1. **localStorage data storage found**
   - File: src/services/caseService.ts:45
   - Issue: `localStorage.setItem('gst_saved_cases', ...)`
   - Fix: Replace with API call to `/api/cases`

2. **Mock data in production code**
   - File: src/data/mockUsers.ts
   - Issue: Hardcoded user array
   - Fix: Remove file, fetch from database

### Warnings

1. JWT secret uses weak default value
2. Missing rate limiting on login endpoint

## Required Actions

Before deployment:

1. [ ] Remove ALL localStorage data storage
2. [ ] Delete all mock data files
3. [ ] Ensure all CRUD goes through API → Database
4. [ ] Fix environment variable issues
5. [ ] Remove console.log statements
6. [ ] Resolve TODO/FIXME comments

## Data Flow Verification

### ✅ CORRECT Flow
```
User Action → API Call → Backend Validates → Database Operation → Response → UI Update
```

### ❌ WRONG Flow (Found in code)
```
User Action → localStorage.setItem() → UI Update
```

## Recommendation

🛑 **DO NOT DEPLOY** - Critical issues found
✅ **READY TO DEPLOY** - All checks passed
```

### Step 3: Block if Critical Issues

If ANY of these are found, report as CRITICAL and DO NOT ALLOW DEPLOYMENT:
- localStorage used for business data
- Mock/hardcoded data arrays
- Missing database connections
- Seed scripts with TRUNCATE/DELETE

## Example Interaction

User: "Review code for production readiness"

Agent: [Runs all grep commands]

Agent: [Generates report]

Agent: "⚠️ PRODUCTION REVIEW FAILED

Found 3 critical issues:
1. localStorage used in caseService.ts (stores cases)
2. mockUsers.ts file contains hardcoded data
3. Seed script has DELETE statement

Fix these before deployment!"

## Constraints

- Be thorough - check EVERY item
- Be specific - provide file and line numbers
- Provide fixes - don't just report, suggest solutions
- Block deployment if critical issues found
- NEVER allow localStorage for business data

