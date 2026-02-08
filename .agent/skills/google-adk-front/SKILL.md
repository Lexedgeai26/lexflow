---
name: google-adk-front
description: Generate production-ready frontend applications with React and TypeScript, optimized for interacting with google-adk agentic backends. Includes SSE streaming, rich JSON parsing, and secure Auth UI.
---

# Google ADK High-End Frontend Generator

**Generate premium, real-time user interfaces that handle complex agentic interactions and secure workflows.**

---

## 💡 PHILOSOPHY

**THE UI SHOULD BE AS SMART AS THE AGENT.**

1.  **RICH JSON PARSING**: Agents return structured JSON; the UI must transform this into beautiful tables, charts, and interactive cards.
2.  **SECURE AUTHENTICATION**: Built-in logic for login, session persistence, and token-based API/SSE requests.
3.  **SCALABLE SSE**: Robust implementation of SSE streaming with automatic reconnection and exponential backoff.
4.  **ACTIVITY TIMELINE**: A professional sidebar visualizing every sub-agent's action and thinking process.
5.  **GENERATIVE UI**: Dynamically render tool-specific components (e.g., Data Summary Card) based on the agent's response metadata.

---

## 🗂️ DOMAIN-SPECIFIC PATTERNS

For high-end UI generation, reference the rich schemas in `resources/domain_patterns/`:
- `healthcare.json`: SOAP Card, Lab Results Table.
- `legal.json`: Clause Risk List, Document Comparison.
- `customer_support.json`: Ticket Info Card, Resolution Status.
- `academic_research.json`: Citation List, Reference Table.
- `content_generation.json`: Content Outline Tree, SEO Checklist.
- `marketing.json`: Campaign Dashboard, Metric Widgets.

---

## Behavior

When activated, this skill will:
1. ✅ **Analyze Backend Agents**: Map all sub-agents (including those in modular packages) to UI icons/titles in the Activity Timeline.
2. ✅ **Project Architecture**: Generate a modular Vite + React + TS project with `components/chat/`, `components/ui/`, `context/`, and `services/`.
3. ✅ **Secure API Service**: Implement an ADK Service that handles JWT tokens and SSE line-buffering.
4. ✅ **Rich Parsing System**: Implement a `MessageRenderer` that detects and formats JSON, Markdown, and Citations.
5. ✅ **Stateful UX**: Manage multi-turn conversations with a responsive, premium 디자인.

**DO NOT ask "what would you like to do next?" - EXECUTE AUTOMATICALLY**

---

## 🏗️ PRODUCTION PROJECT STRUCTURE

```text
frontend_root/
├── src/
│   ├── components/
│   │   ├── chat/          # ChatView, MessageList, RichMessage
│   │   ├── activity/      # ActivityTimeline, AgentState
│   │   └── tools/         # Tool-specific UI components (e.g., DataVisualization)
│   ├── context/           # AuthContext, ChatContext
│   ├── services/          # adkApiService.ts (SSE + Auth logic)
│   └── lib/               # utils, constants, theme
```

---

## 🚀 EXECUTION PIPELINE

### Phase 1: Authentication & Connection [AUTO]

**Step 1.1: Auth Implementation**
Create `AuthContext` to manage JWTs. Ensure all `fetch` and SSE requests include the `Authorization: Bearer <token>` header.

### Phase 2: Rich Communication [AUTO]

**Step 2.1: Robust SSE Service**
Implement a service with line-buffering and JSON parsing that specifically extracts:
- `parts` (for streaming text)
- `author` (for timeline updates)
- `actions.stateDelta` (for UI-state synchronization)

### Phase 3: Premium UI Rendering [AUTO]

**Step 3.1: RichMessage Component**
Build a component that:
- Uses `react-markdown` for text.
- Detects JSON blocks and renders them as `lucide-react` powered tables or cards.
- Handles Citations as clickable badges/tooltips.

**Step 3.2: Activity Timeline**
Create a vertical timeline that shows which specialist agent is currently active and what they are doing.

### Phase 4: Verification [AUTO]

Test with structured agent outputs (e.g., JSON datasets) to ensure successful transformation into UI elements.

---

## ⚠️ CRITICAL RULES

- 🔐 **FORCE AUTH**: Redirect to login if a session is invalid.
- 🧱 **PARSER FIRST**: Always attempt to parse structured JSON before falling back to raw text.
- ⚡ **FLICKER-FREE**: Use stable keys and memoization for large chat histories.
- 📱 **RESPONSIVE**: The timeline should collapse or move to a drawer on mobile.

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development with AI
