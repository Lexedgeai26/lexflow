
# Implementation Index

This directory contains the verified reference implementation of the **LLM Agnostic Proxy**, **RAG Pipeline**, and **Case Management System**.

## Core Backend Infrastructure
*   **`server-index.ts`**: The main Express application entry point. It demonstrates how to mount the various route modules (`/api/ai`, `/api/rag`, `/api/cases`, `/api/auth`) and configure middleware.
*   **`schema.prisma`**: The PostgreSQL schema defining the `LLMProxyUser`, `LLMProxyUserQuota`, and `Case` models. This shows the database structure required for user management and case storage.
*   **`llm-proxy.middleware.ts`**: The critical middleware that secures all AI routes. It handles JWT authentication, automated user creation, quota tracking, and usage logging.
*   **`llm-proxy.routes.ts`**: The universal proxy adapter. It accepts standardized Gemini-format requests and routes them to the appropriate provider (Gemini or OpenAI) based on the model name.

## RAG & Vector Search
*   **`rag.routes.ts`**: API endpoints for the RAG system, allowing clients to ask questions (`/ask`), index data (`/index`), and view stats.
*   **`rag-vectorstore.ts`**: A singleton service wrapping `HNSWLib`. It handles the creation, loading, and saving of the local vector index.
*   **`rag-indexer.ts`**: A service responsible for transforming application data (like Legal Cases) into vector documents and adding them to the store.
*   **`rag-assistant.ts`**: The high-level service that orchestrates the RAG process: retrieving relevant documents and generating an answer using an LLM.

## Case Management
*   **`cases.routes.ts`**: Implements CRUD operations for Legal Cases. Crucially, it demonstrates **Backend-First Indexing** by calling the `IndexerService` immediately after a case is created, ensuring the RAG system is always up-to-date.

## Frontend Client
*   **`frontend-service.ts`**: The client-side service layer. It shows how to interact with the backend proxy for drafting (`generateDraft`) and validation (`validateDraft`) using secure API calls instead of direct SDK usage.
*   **`App.tsx`**: A complete reference React application. It demonstrates authentication flow, case management UI, and the integration of the `LegalCopilot` RAG widget.

## Authentication
*   **`auth.routes.ts`**: A simple implementation of JWT issuance (login/signup) to bootstrap the secure system.

## Tests
*   **`test_openai.ts`**: Script to verify the LLM proxy's ability to route to OpenAI.
