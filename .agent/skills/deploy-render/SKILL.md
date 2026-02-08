---
name: deploy-render
description: Deploy your application to Render. Best for full-stack apps with backend. Beginner-friendly with free tier for web services.
---

# Deploy to Render - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never deployed anything before. That's okay.
2. **EXPLAIN EVERYTHING**: Every step, every button, every concept.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Render?

**Render** is a cloud platform that runs your entire application - frontend, backend, and database.

**Why Render?**
- ✅ **Free tier** for web services
- ✅ **Supports backends** - Node.js, Python, Go, etc.
- ✅ **Free PostgreSQL database** (90-day limit)
- ✅ **Simple pricing** - No surprise bills
- ✅ **Heroku alternative** - After Heroku removed free tier

**Best for:**
- Full-stack applications (frontend + backend)
- Node.js / Express / FastAPI backends
- Apps that need a database

---

## 📋 PREREQUISITES

### 1. Your code must be on GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. A Render Account
- Go to https://render.com
- Click **"Get Started for Free"**
- Sign up with GitHub

---

## 🚀 DEPLOY A WEB SERVICE (Backend)

### Step 1: Create New Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository

---

### Step 2: Configure Service

| Setting | What to Enter |
|---------|---------------|
| **Name** | `my-backend-api` |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Root Directory** | Leave blank (or `backend` if in subfolder) |
| **Runtime** | `Node` / `Python` / etc. |
| **Build Command** | `npm install` or `pip install -r requirements.txt` |
| **Start Command** | `npm start` or `uvicorn main:app --host 0.0.0.0 --port $PORT` |

---

### Step 3: Choose Plan

- **Free**: Good for testing (spins down after 15 min inactivity)
- **Starter ($7/mo)**: Always on, better for production

---

### Step 4: Add Environment Variables

1. Scroll to **"Environment Variables"**
2. Add your variables:
   - `DATABASE_URL`: Your database connection string
   - `JWT_SECRET`: Your secret key
   - etc.

---

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait 2-5 minutes for build
3. Your backend is live at: `https://my-backend-api.onrender.com`

---

## 🗄️ DEPLOY A POSTGRESQL DATABASE

### Step 1: Create Database

1. Click **"New +"** → **"PostgreSQL"**
2. Enter a name: `my-app-db`
3. Choose **Free** plan (90-day limit) or **Starter** ($7/mo)
4. Click **"Create Database"**

---

### Step 2: Get Connection String

After creation, go to your database and copy:
- **Internal Database URL** (for Render services)
- **External Database URL** (for local development)

Add to your Web Service environment variables:
```
DATABASE_URL=postgres://user:password@host:5432/database
```

---

## 🌐 DEPLOY A STATIC SITE (Frontend)

### Step 1: Create Static Site

1. Click **"New +"** → **"Static Site"**
2. Connect your GitHub repository

---

### Step 2: Configure

| Setting | What to Enter |
|---------|---------------|
| **Name** | `my-frontend` |
| **Branch** | `main` |
| **Root Directory** | `frontend` (or where your frontend code is) |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` (Vite) or `build` (CRA) |

---

### Step 3: Add Environment Variables

For the frontend to know your backend URL:
```
VITE_API_URL=https://my-backend-api.onrender.com
```

---

### Step 4: Deploy

Click **"Create Static Site"** - it's free!

---

## 📁 render.yaml (Optional - Infrastructure as Code)

Create `render.yaml` in your project root for automatic setup:

```yaml
services:
  - type: web
    name: my-backend
    runtime: node
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: my-database
          property: connectionString

  - type: web
    name: my-frontend
    runtime: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/dist

databases:
  - name: my-database
    plan: free
```

---

## 🔄 Automatic Deployments

Render automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Add new feature"
git push
```

---

## 🛑 COMMON ISSUES

### "Service is spinning down"
**Cause**: Free tier spins down after 15 min inactivity.
**Fix**: Upgrade to Starter ($7/mo) or accept 30-second cold start.

### "Build failed: Cannot find module"
**Fix**: Make sure all dependencies are in `package.json`, then:
```bash
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Fix: Update package-lock.json"
git push
```

### "Database connection refused"
**Check**:
1. Using **Internal URL** for Render services
2. Using **External URL** for local development
3. Database is not suspended (check dashboard)

---

## ✅ COMPLETION CHECKLIST

- [ ] Code pushed to GitHub
- [ ] Render account created
- [ ] Web Service deployed
- [ ] Database created (if needed)
- [ ] Environment variables set
- [ ] Frontend deployed (if applicable)
- [ ] All services connected and working

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
