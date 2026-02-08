---
name: stack-fastapi-react-admin
description: Create a full-stack application with Python FastAPI backend, React frontend, and Jinja2/HTMX admin panel. Beginner-friendly with database selection.
---

# FastAPI + React + Admin Panel - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You know nothing about web development. That's okay.
2. **EXPLAIN EVERYTHING**: Every command, every term, every concept.
3. **COPY-PASTE READY**: All commands work as-is. Just copy and run.
4. **FAIL-SAFE**: Verification steps after every action.
5. **RECOMMEND, DON'T ENFORCE**: We suggest best practices but allow flexibility.

---

## 🎯 What is This Stack?

This stack combines three technologies:

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend** | FastAPI (Python) | API server - handles data and logic |
| **Frontend** | React + Vite | What users see and interact with |
| **Admin Panel** | Jinja2 + HTMX | Internal dashboard for admins |

**Why this stack?**
- ✅ Python is beginner-friendly
- ✅ FastAPI is extremely fast and modern
- ✅ React is the most popular frontend framework
- ✅ Admin panel doesn't need a separate React app

---

## 📋 PREREQUISITES CHECKLIST

### 1. Python 3.11+
```bash
python3 --version
```
**Expected:** `Python 3.11.x` or higher

**If NOT installed:**
- **Mac**: `brew install python@3.11`
- **Windows**: Download from https://www.python.org/downloads/

### 2. Node.js 18+
```bash
node --version
```
**If NOT installed:** https://nodejs.org/

### 3. Docker Desktop (for database)
```bash
docker --version
```
**If NOT installed:** https://www.docker.com/products/docker-desktop/

---

## 🗄️ DATABASE SELECTION

**Which database would you like to use?**

| Database | Best For | Recommendation |
|----------|----------|----------------|
| **PostgreSQL** ⭐ | Most projects | **RECOMMENDED** |
| MySQL | WordPress migration, Laravel | Good alternative |
| MongoDB | Flexible schemas | Only if you need NoSQL |

**Default:** PostgreSQL

👉 **Use the `db-postgresql` skill to set up your database first.**

---

## 🚀 EXECUTION PIPELINE

### Step 1: Create Project Structure [AUTO]

```bash
echo "📁 [1/12] Creating project structure..."
mkdir my-fullstack-app
cd my-fullstack-app
mkdir backend frontend
```

---

### Step 2: Setup Database [AUTO]

**Run the `db-postgresql` skill** or create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: myapp_postgres
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: myapp_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

```bash
echo "🐘 [2/12] Starting PostgreSQL..."
docker compose up -d
```

---

### Step 3: Initialize Python Backend [AUTO]

```bash
echo "🐍 [3/12] Setting up Python backend..."
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

**Install dependencies:**
```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary alembic python-dotenv pydantic jinja2 python-multipart bcrypt python-jose[cryptography]
```

**What are these?**
- `fastapi` - Web framework
- `uvicorn` - ASGI server (runs FastAPI)
- `sqlalchemy` - Database ORM
- `alembic` - Database migrations
- `jinja2` - Template engine for admin panel
- `bcrypt` - Password hashing

---

### Step 4: Create Backend Structure [AUTO]

```bash
echo "📂 [4/12] Creating backend files..."
mkdir app
mkdir app/routers app/models app/schemas app/templates app/static
touch app/__init__.py app/main.py app/database.py app/config.py
touch .env
```

**Create `backend/.env`:**
```bash
DATABASE_URL=postgresql://admin:password123@localhost:5432/myapp_db
SECRET_KEY=your-super-secret-key-change-this
```

**Create `backend/app/main.py`:**
```python
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="My App API")

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Templates for Admin Panel
templates = Jinja2Templates(directory="app/templates")
app.mount("/static", StaticFiles(directory="app/static"), name="static")

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "API is running!"}

@app.get("/admin")
def admin_dashboard(request: Request):
    return templates.TemplateResponse("admin/dashboard.html", {"request": request})
```

**Create `backend/app/templates/admin/dashboard.html`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <style>
        body { font-family: sans-serif; padding: 2rem; background: #f5f5f5; }
        .card { background: white; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h1 { color: #333; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🛠️ Admin Dashboard</h1>
        <p>Welcome to your admin panel!</p>
        <button hx-get="/api/stats" hx-target="#stats">Load Stats</button>
        <div id="stats"></div>
    </div>
</body>
</html>
```

---

### Step 5: Run Backend [AUTO]

```bash
echo "🚀 [5/12] Starting FastAPI server..."
uvicorn app.main:app --reload --port 8000
```

**Verify:** Open http://localhost:8000/health

---

### Step 6: Initialize React Frontend [AUTO]

```bash
echo "⚛️ [6/12] Creating React frontend..."
cd ../frontend
npm create vite@latest . -- --template react-ts
npm install
npm install axios react-router-dom
```

---

### Step 7: Configure Frontend [AUTO]

**Create `frontend/src/api/index.ts`:**
```typescript
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8000',
});
```

**Update `frontend/src/App.tsx`:**
```tsx
import { useState, useEffect } from 'react';
import { api } from './api';

function App() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    api.get('/health')
      .then(res => setStatus(res.data.message))
      .catch(() => setStatus('Error connecting to API'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🚀 FastAPI + React App</h1>
      <p>API Status: <strong>{status}</strong></p>
      <p><a href="http://localhost:8000/admin">Go to Admin Panel →</a></p>
    </div>
  );
}

export default App;
```

---

### Step 8: Run Frontend [AUTO]

```bash
echo "🎨 [7/12] Starting React frontend..."
npm run dev
```

**Verify:** Open http://localhost:5173

---

## 📂 FINAL PROJECT STRUCTURE

```
my-fullstack-app/
├── docker-compose.yml
├── backend/
│   ├── venv/
│   ├── .env
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── routers/
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── templates/
│   │   │   └── admin/
│   │   │       └── dashboard.html
│   │   └── static/
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── App.tsx
    │   ├── api/
    │   └── components/
    └── package.json
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Python 3.11+ installed
- [ ] Node.js 18+ installed
- [ ] PostgreSQL running (`docker compose up -d`)
- [ ] Backend running (`uvicorn app.main:app --reload`)
- [ ] Frontend running (`npm run dev`)
- [ ] http://localhost:8000/health shows "API is running!"
- [ ] http://localhost:5173 shows React app
- [ ] http://localhost:8000/admin shows Admin panel

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
