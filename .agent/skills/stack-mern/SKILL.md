---
name: stack-mern
description: Create a complete MERN stack application (MongoDB, Express, React, Node.js). Beginner-friendly with full setup, authentication, and deployment guidance.
---

# MERN Stack Setup - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You know nothing about web development. That's okay.
2. **EXPLAIN EVERYTHING**: Every command, every term, every concept.
3. **COPY-PASTE READY**: All commands work as-is. Just copy and run.
4. **FAIL-SAFE**: Verification steps after every action.
5. **RECOMMEND, DON'T ENFORCE**: We suggest best practices but allow flexibility.

---

## 🎯 What is MERN Stack?

**MERN** is a combination of four technologies used to build web applications:

| Letter | Technology | Purpose |
|--------|------------|---------|
| **M** | MongoDB | Database (stores your data) |
| **E** | Express.js | Backend framework (handles requests) |
| **R** | React | Frontend framework (what users see) |
| **N** | Node.js | Runtime (runs JavaScript on server) |

**Why MERN?**
- ✅ All JavaScript - one language for everything
- ✅ Huge community and resources
- ✅ Great for beginners
- ✅ Fast development cycle

---

## 📋 PREREQUISITES CHECKLIST

Before we start, you need these tools installed:

### 1. Node.js (version 18 or higher)
**Check if installed:**
```bash
node --version
```
**Expected:** `v18.x.x` or higher

**If NOT installed:**
- Download from https://nodejs.org/ (choose "LTS" version)

### 2. Docker Desktop (for MongoDB)
**Check if installed:**
```bash
docker --version
```

**If NOT installed:**
- Download from https://www.docker.com/products/docker-desktop/

### 3. Git
**Check if installed:**
```bash
git --version
```

**If NOT installed:**
- **Mac**: Run `xcode-select --install`
- **Windows**: Download from https://git-scm.com/

### 4. A Code Editor
- **Recommended**: VS Code - https://code.visualstudio.com/

---

## 🚀 EXECUTION PIPELINE

### Step 1: Create Project Structure [AUTO]

```bash
echo "📁 [1/10] Creating project structure..."
mkdir my-mern-app
cd my-mern-app
mkdir backend frontend
```

**What does this do?**
- Creates a folder called `my-mern-app`
- Creates two subfolders: `backend` (server) and `frontend` (React)

---

### Step 2: Setup MongoDB [AUTO]

First, we need a database. Use the `db-mongodb` skill or create this file:

**Create `docker-compose.yml` in project root:**
```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    container_name: mern_mongodb
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

**Start MongoDB:**
```bash
echo "🍃 [2/10] Starting MongoDB..."
docker compose up -d
```

---

### Step 3: Initialize Backend [AUTO]

```bash
echo "⚙️ [3/10] Initializing backend..."
cd backend
npm init -y
```

**Install dependencies:**
```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install -D nodemon typescript @types/node @types/express ts-node
```

**What are these?**
- `express` - Web framework
- `mongoose` - MongoDB connector
- `cors` - Allows frontend to talk to backend
- `dotenv` - Loads environment variables
- `bcryptjs` - Password hashing
- `jsonwebtoken` - Authentication tokens
- `nodemon` - Auto-restarts server during development

---

### Step 4: Create Backend Structure [AUTO]

```bash
echo "📂 [4/10] Creating backend files..."
mkdir src
mkdir src/routes src/models src/middleware src/controllers
touch src/index.ts
touch .env
```

**Create `backend/src/index.ts`:**
```typescript
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running!' });
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
```

**Create `backend/.env`:**
```bash
PORT=5000
MONGODB_URI=mongodb://admin:password123@localhost:27017/mern_app?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-this
```

**Update `backend/package.json` scripts:**
```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

---

### Step 5: Initialize Frontend [AUTO]

```bash
echo "⚛️ [5/10] Creating React frontend..."
cd ../frontend
npm create vite@latest . -- --template react-ts
npm install
npm install axios react-router-dom
```

**What are these?**
- `vite` - Fast build tool for React
- `axios` - Makes HTTP requests to backend
- `react-router-dom` - Navigation between pages

---

### Step 6: Configure Frontend API [AUTO]

**Create `frontend/src/api/index.ts`:**
```typescript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Create `frontend/.env`:**
```bash
VITE_API_URL=http://localhost:5000
```

---

### Step 7: Update Frontend App [AUTO]

**Replace `frontend/src/App.tsx`:**
```tsx
import { useState, useEffect } from 'react';
import { api } from './api';

function App() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    api.get('/health')
      .then(res => setStatus(res.data.message))
      .catch(err => setStatus('Error connecting to server'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🚀 MERN Stack App</h1>
      <p>Server Status: <strong>{status}</strong></p>
    </div>
  );
}

export default App;
```

---

### Step 8: Create Run Scripts [AUTO]

**Create `package.json` in project root:**
```json
{
  "name": "my-mern-app",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "install:all": "npm install && cd backend && npm install && cd ../frontend && npm install"
  },
  "devDependencies": {
    "concurrently": "^8.2.2"
  }
}
```

**Install concurrently:**
```bash
cd ..
npm init -y
npm install -D concurrently
```

---

### Step 9: Start Development [AUTO]

```bash
echo "🚀 [9/10] Starting development servers..."
npm run dev
```

**What happens:**
- Backend starts on http://localhost:5000
- Frontend starts on http://localhost:5173
- MongoDB runs on port 27017

---

### Step 10: Verify Everything Works [AUTO]

1. **Open browser:** http://localhost:5173
2. **You should see:** "Server Status: Server is running!"

If you see this, your MERN stack is working! 🎉

---

## 📂 FINAL PROJECT STRUCTURE

```
my-mern-app/
├── docker-compose.yml      # MongoDB configuration
├── package.json            # Root scripts
├── backend/
│   ├── package.json
│   ├── .env
│   ├── src/
│   │   ├── index.ts        # Server entry point
│   │   ├── routes/         # API routes
│   │   ├── models/         # Database models
│   │   ├── controllers/    # Business logic
│   │   └── middleware/     # Auth, validation
│   └── tsconfig.json
└── frontend/
    ├── package.json
    ├── .env
    ├── src/
    │   ├── App.tsx
    │   ├── api/
    │   └── components/
    └── vite.config.ts
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Node.js 18+ installed
- [ ] Docker Desktop installed
- [ ] MongoDB running (`docker compose up -d`)
- [ ] Backend initialized (`npm install`)
- [ ] Frontend initialized (`npm install`)
- [ ] Both servers running (`npm run dev`)
- [ ] Browser shows "Server is running!"

---

## 🛑 COMMON ISSUES

### "MongoNetworkError"
**Fix:** Make sure MongoDB is running: `docker compose up -d`

### "CORS error"
**Fix:** Backend is not running. Start it with `npm run dev:backend`

### "Cannot find module"
**Fix:** Run `npm install` in both `backend` and `frontend` folders

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
