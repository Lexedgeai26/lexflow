# LLM-Agnostic Architecture - Prompt Templates

Prompts to guide AI agents through refactoring a backend to support multiple LLM providers seamlessly using factory patterns and abstraction layers.

---

## 🚀 Quick Start

### Prompt 0: Make Backend LLM Agnostic FULLY
```
Refactor my backend to be LLM-agnostic FULLY. Execute ALL steps automatically.

Project Type: [Express/NextJS]
Desired Providers: [Gemini, OpenAI, Anthropic]

⚠️ CRITICAL INSTRUCTIONS:
1. USE the llm-agnostic skill.
2. DO NOT stop to ask "what would you like to do next?"
3. CREATE: Base provider interface and multiple provider implementations.
4. IMPLEMENT: Factory pattern to select providers at runtime.
5. UPDATE: Existing services to use the new abstraction instead of direct calls.

GO! Execute all steps now.
```

---

## Phase 1: Preparation

### Prompt 1: Analyze Existing Calls
```
Find all direct calls to LLMs (Gemini, OpenAI, etc.) in the project codebase. List all files and functions that need refactoring.
```

---

## Phase 2: Refactoring

### Prompt 2: Core Abstraction
```
Implement the LLM provider abstraction layer based on references in llm-agnostic/references/:
- Create src/services/llm/providers/base.provider.ts
- Create src/services/llm/providers/gemini.provider.ts
- Create src/services/llm/providers/openai.provider.ts
- Create src/services/llm/provider.factory.ts
```

### Prompt 3: Wrap Existing Services
```
Update existing AI-related services to use the `LLMProviderFactory`. 

Refactor: [FILE_PATHS]
```

---

## Phase 3: Validation

### Prompt 4: Verify Multi-Provider Support
```
Verify that the abstraction works:
1. Test using Gemini.
2. Switch configuration to OpenAI and test again.
3. Ensure error handling is consistent across providers.
```

---

## Quick Copy-Paste One-Liners

1. **Full Refactor**: `Use llm-agnostic to make your backend support multiple AI providers`
2. **Add Provider**: `Add a new [PROVIDER_NAME] implementation to the LLM factory`
3. **Switch Logic**: `Enable runtime provider switching based on [CONDITION]`
4. **Clean Abstraction**: `Create a base provider interface for [FUNCTIONALITY]`

---

**Part of ASG AI S2PROD Framework**  
**Powered by [AIShift](https://aishift.dev/)**
