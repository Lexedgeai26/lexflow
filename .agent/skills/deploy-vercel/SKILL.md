---
name: deploy-vercel
description: Deploy your application to Vercel. Best for React, Next.js, and static sites. Beginner-friendly with zero-config deployment.
---

# Deploy to Vercel - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never deployed anything before. That's okay.
2. **EXPLAIN EVERYTHING**: Every step, every button, every concept.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Vercel?

**Vercel** is a platform that puts your website on the internet. 

Think of it like uploading a photo to Instagram, but for websites. You push your code, and Vercel makes it available to everyone.

**Why Vercel?**
- ✅ **Free tier** - Perfect for personal projects
- ✅ **Zero config** - Just connect and deploy
- ✅ **Automatic HTTPS** - Secure by default
- ✅ **Made by Next.js team** - Best support for React/Next.js

**Best for:**
- React / Next.js applications
- Static websites (HTML, CSS, JS)
- Frontend-only projects

**NOT ideal for:**
- Backend-heavy apps (use Render or AWS instead)
- Apps requiring persistent file storage

---

## 📋 PREREQUISITES

### 1. Your code must be on GitHub
If not, run:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. A Vercel Account
- Go to https://vercel.com/signup
- Click **"Continue with GitHub"**
- Authorize Vercel to access your GitHub

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Go to Vercel Dashboard

1. Open https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**

---

### Step 2: Import Your Repository

1. You'll see a list of your GitHub repositories
2. Find your project and click **"Import"**

> **Can't find your repo?** Click "Adjust GitHub App Permissions" to grant access.

---

### Step 3: Configure Project Settings

Vercel auto-detects most settings, but verify:

| Setting | What to Enter |
|---------|---------------|
| **Framework Preset** | Select your framework (Next.js, Vite, Create React App, etc.) |
| **Root Directory** | Usually `.` (root) or `frontend` if in a subfolder |
| **Build Command** | Usually auto-detected (`npm run build`) |
| **Output Directory** | Usually auto-detected (`dist`, `build`, `.next`) |

---

### Step 4: Add Environment Variables

If your app needs environment variables (like API keys):

1. Expand **"Environment Variables"**
2. Add each variable:
   - **Name**: `VITE_API_URL` (or whatever your app uses)
   - **Value**: Your actual value

> ⚠️ **Important for Vite apps**: Variables must start with `VITE_` to be accessible in the browser.

---

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 1-3 minutes for the build
3. You'll see a success screen with your URL!

**Your app is now live at:**
```
https://your-project-name.vercel.app
```

---

## 🔗 Custom Domain (Optional)

### Add Your Own Domain

1. Go to your project → **Settings** → **Domains**
2. Enter your domain: `myapp.com`
3. Click **"Add"**

### Update DNS Records

Vercel will show you DNS records to add. Go to your domain registrar (GoDaddy, Namecheap, etc.) and add:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

Wait 5-30 minutes for DNS to propagate.

---

## 🔄 Automatic Deployments

Once set up, Vercel automatically deploys when you push to GitHub:

```bash
git add .
git commit -m "Update homepage"
git push
```

Within 1-2 minutes, your changes are live!

---

## 🛠️ Useful CLI Commands

Install Vercel CLI:
```bash
npm install -g vercel
```

Deploy from terminal:
```bash
vercel
```

Deploy to production:
```bash
vercel --prod
```

Check deployment logs:
```bash
vercel logs your-project-name.vercel.app
```

---

## 🛑 COMMON ISSUES

### "Build failed"
**Check:**
1. Build command is correct (`npm run build`)
2. All dependencies are in `package.json` (not just installed locally)
3. Environment variables are set

### "404 on refresh" (React Router)
**Add `vercel.json` to project root:**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### "API routes not working"
Vercel API routes only work with Next.js. For other frameworks, you need a separate backend (use `deploy-render` skill).

---

## ✅ COMPLETION CHECKLIST

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Site accessible at `.vercel.app` URL
- [ ] (Optional) Custom domain configured

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
