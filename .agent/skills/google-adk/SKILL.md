---
name: google-adk
description: FULLY IMPLEMENT a complete, production-grade agentic system using Python and Google ADK. This skill creates complex hierarchical agents, specialized tools, and a scalable FastAPI-based streaming backend.
---

# Google ADK Production-Grade Backend Generator

**Generate high-end, scalable, and secure agentic systems with advanced hierarchies.**

---

## 💡 PHILOSOPHY

**BUILD FOR PRODUCTION, NOT JUST PROTOTYPES.**

1.  **AGENT PACKAGES**: For complex systems, organize each sub-agent into its own directory (e.g., `app/agents/researcher/`) containing its own `instructions.txt`, `tools.py`, and `agent.py`.
2.  **API-DRIVEN TOOLS**: Tools MUST be mapped to the actual API endpoints provided in the PRD/documentation. Do NOT mock unless explicitly asked.
3.  **STRICT ENV MAPPING**: All API Base URLs and Secrets MUST be defined in `.env`. Tools must read these values at runtime.
4.  **SCALABLE SESSIONS**: Always use `DatabaseSessionService` (SQLAlchemy/PostgreSQL) for persistence across instances.
5.  **PRODUCTION AUTH**: Implement JWT-based authentication to secure the ADK API and WebSocket endpoints.

---

## 🗂️ DOMAIN-SPECIFIC PATTERNS

For faster and more accurate implementation, reference the standardized patterns in `resources/domain_patterns/`:
- `healthcare.json`: SOAP notes, diagnostic tools, patient history.
- `legal.json`: Contract analysis, clause extraction, legal research.
- `customer_support.json`: Knowledge base search, ticket management, resolutions.
- `academic_research.json`: Literature synthesis, citation management, paper summaries.
- `content_generation.json`: SEO optimization, content planning, copywriting.
- `marketing.json`: Campaign strategy, competitor analysis, social monitoring.

---

## Behavior

When activated, this skill will:
1. ✅ **Deep PRD Analysis**: Rigorously analyze the documentation to map functional roles to sub-agents and endpoints to tools.
2. ✅ **Modular Package Structure**: Generate a structured `app/` directory where each sub-agent is a self-contained package.
3. ✅ **Scalable Core**: Implement `DatabaseSessionService` and custom FastAPI middleware for Auth.
4. ✅ **Hierarchical Orchestration**: Use a `root_agent` to route requests to specialized sub-agents with their own toolsets and prompts.
5. ✅ **Standard Serving**: Use `adk api_server` or a custom `FastAPI` app that mounts the ADK `App`.

**DO NOT ask "what would you like to do next?" - EXECUTE AUTOMATICALLY**

---

## 🏗️ PRODUCTION PROJECT STRUCTURE

```text
project_root/
├── .env                  # API_BASE_URLS and Secrets
├── requirements.txt      # google-adk, sqlalchemy, httpx, etc.
└── app/
    ├── __init__.py
    ├── agent.py          # Root agent and App instantiation
    ├── config.py         # Config loader for .env values
    ├── agents/           # Modular Agent Packages
    │   ├── researcher/
    │   │   ├── instructions.md
    │   │   ├── tools.py
    │   │   └── agent.py
    │   └── analyst/
    │       ├── instructions.md
    │       ├── tools.py
    │       └── agent.py
    └── services/         # Shared Services
        ├── database.py
        └── auth.py
```

---

## 🚀 EXECUTION PIPELINE

### Phase 1: Architectural Design [AUTO]

1.  **Analyze Roles**: Map PRD personas to ADK Agents.
2.  **API Discovery**: RIGOROUSLY list every endpoint Mentioned in the PRD and map it to a specific sub-agent tool.
3.  **Design Routing**: Define the `root_agent`'s logic for delegating to sub-agents.
4.  **Plan Environment**: Define the key names for all required API base URLs to be placed in `.env`.

### Phase 2: Implementation [AUTO]

**Step 2.1: Implement Production Services**
-   `services/database.py`: Configure SQLAlchemy and `DatabaseSessionService`.
-   `services/auth.py`: Implement JWT token verification and FastAPI middleware.

**Step 2.2: Implement Specialized Tools**
-   Create robust tools with full docstrings, local validation, and error handling.

**Step 2.3: Implement Agents**
-   Instantiate sub-agents in their respective files.
-   Assemble the `root_agent` in `app/agent.py`.

**Step 2.4: Assemble App**
-   `app = App(root_agent=root_agent, session_service=db_session_service)`

### Phase 3: Deployment & Serving [AUTO]

Configure the server entry point (e.g., `main.py`) to run the ADK app with the appropriate middleware.

---

## ⚠️ CRITICAL RULES

- 🔐 **SECURE WS**: WebSocket connections must be authenticated via tokens in the handshake/query.
- 💾 **PERSISTENCE**: Never use in-memory sessions for systems requiring high availability.
- 🧱 **HIERARCHY**: Sub-agents MUST have their own specialized toolsets.
- 🌊 **STREAMING**: Support real-time events for ALL terminal agents.

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development with AI
