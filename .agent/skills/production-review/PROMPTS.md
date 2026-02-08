# Production Review - Prompt Templates

Prompts to guide AI agents through reviewing a project for production readiness, including security, performance, and best practices checks.

---

## 🚀 Quick Start

### Prompt 0: Perform Production Review FULLY
```
Perform a comprehensive production readiness review for my project FULLY. Execute ALL checks automatically.

Project Path: [PROJECT_PATH]

⚠️ CRITICAL INSTRUCTIONS:
1. USE the production-review skill.
2. DO NOT stop to ask "what would you like to do next?"
3. CHECK for: Hardcoded secrets, console.log statements, error handling gaps, and performance bottlenecks.
4. GENERATE a detailed report with recommendations.
5. IMPLEMENT minor fixes (like removing logs) automatically.

GO! Execute all checks now.
```

---

## Phase 1: Security & Best Practices

### Prompt 1: Security Audit
```
Audit the project for security vulnerabilities:
- Check for hardcoded API keys or credentials.
- Verify JWT implementation and cors settings.
- Check for input sanitization in database queries.
```

### Prompt 2: Code Quality Check
```
Review the codebase for:
- Console.log or debugging statements.
- Missing or poor error handling in critical paths.
- Proper use of environment variables instead of hardcoded strings.
```

---

## Phase 2: Performance & Scale

### Prompt 3: Database Efficiency
```
Analyze the database schema and queries for performance:
- Are primary/foreign keys indexed correctly?
- Are there any obvious N+1 query problems in the code?
- Recommend composite indexes for common query patterns.
```

---

## Phase 3: Final Report

### Prompt 4: Production Checklist
```
Generate a final production-readiness checklist and summary report. Highlight any critical issues that must be addressed before deployment.
```

---

## Quick Copy-Paste One-Liners

1. **Full Review**: `Use production-review to perform a complete readiness audit`
2. **Security Audit**: `Check for hardcoded secrets and security gaps`
3. **Database Check**: `Analyze schema and queries for performance optimizations`
4. **Clean Code**: `Remove all console logs and fix basic error handling gaps`

---

**Part of ASG AI S2PROD Framework**  
**Powered by [AIShift](https://aishift.dev/)**
