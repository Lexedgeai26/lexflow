---
name: deploy-heroku
description: Deploy your application to Heroku. Classic PaaS platform for full-stack apps. Note - No longer has free tier but still beginner-friendly.
---

# Deploy to Heroku - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never deployed anything before. That's okay.
2. **EXPLAIN EVERYTHING**: Every step, every button, every concept.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Heroku?

**Heroku** is one of the original Platform-as-a-Service (PaaS) providers. It makes deployment simple.

**Why Heroku?**
- ✅ **Very beginner-friendly** - Git push to deploy
- ✅ **Great documentation** - Everything is well explained
- ✅ **Add-ons marketplace** - Easy to add databases, monitoring, etc.
- ✅ **Supports many languages** - Node.js, Python, Ruby, Java, Go, PHP

**⚠️ IMPORTANT**: Heroku **removed its free tier** in 2022. The cheapest option is now **$5/month** per dyno.

> **Free alternative?** Consider `deploy-render` skill instead.

---

## 📋 PREREQUISITES

### 1. Heroku Account
1. Go to https://signup.heroku.com
2. Create an account
3. Verify your email

### 2. Heroku CLI
```bash
# Mac
brew tap heroku/brew && brew install heroku

# Windows
# Download from https://devcenter.heroku.com/articles/heroku-cli

# Linux
curl https://cli-assets.heroku.com/install.sh | sh
```

Verify installation:
```bash
heroku --version
```

### 3. Git
```bash
git --version
```

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Login to Heroku

```bash
heroku login
```

This opens a browser. Click "Log In".

---

### Step 2: Prepare Your App

**For Node.js apps**, make sure `package.json` has:
```json
{
  "scripts": {
    "start": "node dist/index.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

**For Python apps**, create `Procfile`:
```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

Also create `runtime.txt`:
```
python-3.11.0
```

---

### Step 3: Create Heroku App

```bash
cd your-project
heroku create my-app-name
```

**Output:**
```
Creating ⬢ my-app-name... done
https://my-app-name.herokuapp.com/ | https://git.heroku.com/my-app-name.git
```

---

### Step 4: Add PostgreSQL Database (Optional)

```bash
heroku addons:create heroku-postgresql:essential-0
```

This adds a PostgreSQL database and sets `DATABASE_URL` automatically.

---

### Step 5: Set Environment Variables

```bash
heroku config:set JWT_SECRET=your-secret-key
heroku config:set NODE_ENV=production
```

View all config:
```bash
heroku config
```

---

### Step 6: Deploy

Make sure your code is committed:
```bash
git add .
git commit -m "Ready for Heroku"
```

Push to Heroku:
```bash
git push heroku main
```

**Output:**
```
remote: -----> Build succeeded!
remote: -----> Launching...
remote:        Released v1
remote:        https://my-app-name.herokuapp.com/ deployed to Heroku
```

---

### Step 7: Open Your App

```bash
heroku open
```

Or visit: `https://my-app-name.herokuapp.com`

---

## 🔧 Useful Commands

### View Logs
```bash
heroku logs --tail
```

### Run Database Migrations
```bash
heroku run npm run migrate
```

### Open Database Console
```bash
heroku pg:psql
```

### Restart App
```bash
heroku restart
```

### Scale Dynos
```bash
heroku ps:scale web=1
```

---

## 🔗 Custom Domain

### Add Domain
```bash
heroku domains:add myapp.com
heroku domains:add www.myapp.com
```

### Get DNS Target
```bash
heroku domains
```

Add CNAME record at your registrar:
```
www.myapp.com → myapp.com.herokudns.com
```

---

## 📝 Procfile Reference

| App Type | Procfile Content |
|----------|------------------|
| Node.js | `web: node dist/index.js` |
| Node.js (npm start) | `web: npm start` |
| Python FastAPI | `web: uvicorn main:app --host 0.0.0.0 --port $PORT` |
| Python Flask | `web: gunicorn app:app` |
| Python Django | `web: gunicorn myproject.wsgi` |

---

## 🛑 COMMON ISSUES

### "Application Error"
Check logs:
```bash
heroku logs --tail
```

Common causes:
- Port not using `$PORT` environment variable
- Missing dependencies
- Build failed

### "No default language detected"
Add a `package.json` (Node) or `requirements.txt` (Python) to your root.

### "Database connection failed"
Make sure you're using `process.env.DATABASE_URL` and it includes `?sslmode=require` for PostgreSQL.

---

## 💰 Pricing

| Plan | Price | Notes |
|------|-------|-------|
| Eco | $5/mo | Sleeps after 30 min inactivity |
| Basic | $7/mo | Always on |
| Standard | $25+/mo | Horizontal scaling |

---

## ✅ COMPLETION CHECKLIST

- [ ] Heroku account created
- [ ] Heroku CLI installed
- [ ] Logged in (`heroku login`)
- [ ] App created (`heroku create`)
- [ ] Procfile added
- [ ] Environment variables set
- [ ] Deployed (`git push heroku main`)
- [ ] App accessible at `.herokuapp.com`
- [ ] (Optional) Database added
- [ ] (Optional) Custom domain configured

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
