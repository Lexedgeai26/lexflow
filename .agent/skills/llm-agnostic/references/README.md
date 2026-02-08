# LLM-Agnostic Module - Reference Implementation

**Source:** `/Users/chiragahmedabadi/dev/AIGrowthPilot/backend/src/llm-proxy/`

This is a production-tested, LangChain-based LLM abstraction layer that supports:
- ✅ Google Gemini
- ✅ OpenAI GPT-4
- ✅ Anthropic Claude
- ✅ Automatic fallback
- ✅ Usage tracking
- ✅ Quota enforcement

## Architecture

```
llm-proxy/
├── dto/
│   ├── generate.dto.ts     (DTOs and enums)
│   └── index.ts            (Barrel export)
├── llm-proxy.controller.ts (REST API endpoints)
├── llm-proxy.module.ts     (NestJS module)
├── llm-proxy.service.ts    (LangChain multi-provider service)
├── quota.service.ts        (Quota management)
└── usage-tracking.service.ts (Usage logging)
```

## Key Features

### Multi-Provider Support
Uses LangChain for provider abstraction:
- `@langchain/openai` - ChatOpenAI
- `@langchain/google-genai` - ChatGoogleGenerativeAI
- `@langchain/anthropic` - ChatAnthropic

### Automatic Fallback
If requested provider unavailable, falls back to first available provider.

### Reasoning Models
Supports both standard and reasoning models:
- Gemini: gemini-2.0-flash-thinking-exp
- OpenAI: o1-preview

### API Endpoints
- `POST /api/llm-proxy/generate` - Generate text
- `POST /api/llm-proxy/generate-json` - Generate JSON
- `GET /api/llm-proxy/providers` - List available providers
- `GET /api/llm-proxy/usage` - Get usage statistics
- `GET /api/llm-proxy/quota` - Get quota status
- `GET /api/llm-proxy/health` - Health check

## Usage

```typescript
// Frontend call
const response = await fetch('/api/llm-proxy/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Generate a marketing headline',
    systemInstruction: 'You are a marketing expert',
    provider: 'gemini', // optional - auto-selects if not provided
  }),
});
```

## Environment Variables

```bash
# At least one required
GEMINI_API_KEY=your-gemini-key
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# Optional model overrides
GEMINI_MODEL=gemini-2.0-flash-exp
OPENAI_MODEL=gpt-4o
CLAUDE_MODEL=claude-3-5-sonnet-20241022
```

## Files Included

1. **llm-proxy.service.ts** - Main LangChain multi-provider service
2. **llm-proxy.controller.ts** - REST API controller
3. **llm-proxy.module.ts** - NestJS module configuration
4. **dto/generate.dto.ts** - DTOs and TypeScript types
5. **quota.service.ts** - Quota enforcement per workspace
6. **usage-tracking.service.ts** - Usage logging to database

## Integration Steps

1. Copy all files to `src/llm-proxy/`
2. Import `LLMProxyModule` in `app.module.ts`
3. Configure environment variables
4. Create database tables for usage tracking (see schema.prisma)

---

**Powered by [AIShift](https://aishift.dev/)**

