# Installation Guide

Follow these steps to set up LexEdge Flow on your local machine.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A valid API key from OpenAI, Anthropic, or Google Gemini.

## 1. Environment Setup

Clone the repository and enter the project folder:
```bash
git clone https://github.com/your-repo/lexflow.git
cd lexflow
```

## 2. Frontend Installation

The frontend is built with Vite and React.
```bash
npm install
```

## 3. Backend Installation

The backend is an Express server using SQLite.
```bash
cd backend
npm install
```

## 4. Database Initialization

The database is automatically created and initialized when you start the backend server for the first time. To seed it with demo data:
```bash
node seed.js
```

## 5. Running the Application

### Start the Backend
From the `backend/` directory:
```bash
npm start
```
The backend will run on `http://localhost:8787`.

### Start the Frontend
From the root directory:
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`.

## 6. AI Configuration

When you first open the application, you will be prompted to set up your AI Provider and API Key.
- **Provider:** Choose OpenAI, Claude, or Gemini.
- **API Key:** Enter your private key.
- **Validation:** Click "Validate" to ensure the key is working before proceeding.

---
For support, visit [lexedge.ai](https://www.lexedge.ai/)
