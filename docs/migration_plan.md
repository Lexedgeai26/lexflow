# LexFlow AI Migration Plan: Persistent Local Architecture

## 1. Overview
This document outlines the transition of LexFlow AI from an in-memory application to a persistent, enterprise-ready platform using local browser storage (IndexedDB) to simulate a full SQLite environment.

## 2. Data Schema (Local Database)

### `users` Table
| Column | Type | Description |
| :--- | :--- | :--- |
| id | UUID (PK) | Unique user identifier |
| email | String (Unique) | Login credential |
| password_hash | String | Simulated local auth hash |
| context | JSON | Firm name, jurisdiction, lead lawyer details |

### `projects` Table
| Column | Type | Description |
| :--- | :--- | :--- |
| id | UUID (PK) | Unique project identifier |
| user_id | UUID (FK) | Reference to the owner |
| name | String | Project name |
| status | Enum | DRAFT, ANALYZING, UNDER_REVIEW, etc. |
| analysis | JSON | Full Gemini AI analysis results |
| chat_history | JSON | Serialized AI conversation state |

### `documents` Table
| Column | Type | Description |
| :--- | :--- | :--- |
| id | UUID (PK) | Unique doc identifier |
| project_id | UUID (FK) | Parent project reference |
| content | Text | Extracted/uploaded document content |
| metadata | JSON | Versioning, MIME type, upload timestamps |

## 3. Implementation Steps

### Phase 1: Persistence Layer
- Implement `services/dbService.ts` using the Browser IndexedDB API.
- Create an abstraction layer that mimics SQL operations (`SELECT`, `INSERT`, `UPDATE`).

### Phase 2: Authentication Engine
- Develop a Login/Signup interface.
- Store user sessions in `localStorage` for immediate persistence.
- Encrypt (mock) user credentials locally for secure simulation.

### Phase 3: State Hydration
- Update `App.tsx` to fetch data from `dbService` during the `useEffect` lifecycle.
- Ensure the AI `chatHistory` is updated in the database after every model response.

## 4. Visual Standards
- Login screen must match the Slate-900 / Blue-600 professional aesthetic.
- Add "Last Sync" indicators to show database status.
- Provide a "Clear Local Data" option in Settings for privacy.
