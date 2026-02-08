# Secure LLM Proxy - Reference Implementation

This folder contains the complete reference implementation of the Secure LLM Proxy.

**Source:** `/Users/chiragahmedabadi/dev/claude/gemini-secure-proxy`

## Reference Documentation

1. **README.md** - Main documentation and overview
2. **INTEGRATION_GUIDE.md** - How to integrate the proxy
3. **API_REFERENCE.md** - API endpoints documentation
4. **QUICK_START.md** - Quick start guide

## Implementation Files

Located in `implementation/` folder:

```
implementation/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── llm-proxy.config.ts
│   │   ├── routes/
│   │   │   ├── proxyRoutes.ts
│   │   │   ├── healthRoutes.ts
│   │   │   └── settingsRoutes.ts
│   │   ├── services/
│   │   │   ├── creditService.ts
│   │   │   └── corsService.ts
│   │   └── middleware/
│   │       └── auto-user.middleware.ts
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
├── client.ts
└── server.js
```

## How to Use

The skill should:
1. Read the documentation files in this folder
2. Use the implementation files as reference
3. Copy the proven patterns, NOT create new ones
4. Adapt file paths and configuration for the target project

## Key Features

- ✅ Zero-Setup User Management (auto-creates from JWT)
- ✅ Multi-Provider Support (Gemini, OpenAI, Claude)
- ✅ Built-in Quota System (per-user limits)
- ✅ JWT-Based Authentication
- ✅ Usage Analytics & Tracking
- ✅ Bootstrap UI Dashboard
- ✅ Hot-Swappable Providers
- ✅ Production Ready

