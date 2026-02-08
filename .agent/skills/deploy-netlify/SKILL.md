---
name: deploy-netlify
description: Deploy your application to Netlify. Best for static sites, JAMstack, and React apps. Beginner-friendly with generous free tier.
---

# Deploy to Netlify - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never deployed anything before. That's okay.
2. **EXPLAIN EVERYTHING**: Every step, every button, every concept.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Netlify?

**Netlify** is a platform for deploying websites and web applications.

**Why Netlify?**
- ✅ **Generous free tier** - 100GB bandwidth/month
- ✅ **Drag and drop** - Deploy without Git
- ✅ **Serverless functions** - Backend logic without servers
- ✅ **Form handling** - Built-in form submissions
- ✅ **Split testing** - A/B test different versions

**Best for:**
- Static websites
- React / Vue / Svelte apps
- JAMstack applications
- Sites with simple backend needs (use Netlify Functions)

---

## 📋 PREREQUISITES

### Option A: GitHub Repository (Recommended)
Your code on GitHub for automatic deployments.

### Option B: Just a Folder
You can drag-and-drop a folder to deploy instantly.

---

## 🚀 METHOD 1: Deploy from GitHub (Recommended)

### Step 1: Create Netlify Account

1. Go to https://netlify.com
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"**

---

### Step 2: Create New Site

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Authorize Netlify if prompted
4. Select your repository

---

### Step 3: Configure Build Settings

| Setting | Vite/React | Next.js | Plain HTML |
|---------|------------|---------|------------|
| **Build command** | `npm run build` | `npm run build` | (leave blank) |
| **Publish directory** | `dist` | `.next` | `.` or `public` |

---

### Step 4: Environment Variables

1. Click **"Show advanced"**
2. Add variables like:
   - `VITE_API_URL`: `https://my-api.com`

---

### Step 5: Deploy

Click **"Deploy site"** - done in 1-2 minutes!

Your site is live at: `https://random-name-123.netlify.app`

---

## 🚀 METHOD 2: Drag and Drop (Instant)

### Step 1: Build Your Project

```bash
npm run build
```

This creates a `dist` or `build` folder.

---

### Step 2: Deploy

1. Go to https://app.netlify.com/drop
2. **Drag your `dist` folder** onto the page
3. Done! Your site is live in seconds.

---

## 🔗 Custom Domain

### Step 1: Add Domain

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `mysite.com`

### Step 2: Update DNS

Add these records at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | `75.2.60.5` |
| CNAME | www | `your-site.netlify.app` |

---

## ⚡ Netlify Functions (Serverless Backend)

Need backend logic? Create serverless functions:

### Step 1: Create Function

Create `netlify/functions/hello.js`:

```javascript
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" }),
  };
};
```

### Step 2: Access Function

After deploy, access at:
```
https://your-site.netlify.app/.netlify/functions/hello
```

---

## 📝 netlify.toml Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## 🔄 Automatic Deployments

Push to GitHub = automatic deploy:

```bash
git add .
git commit -m "Update site"
git push
```

Netlify builds and deploys in 1-2 minutes.

---

## 🛑 COMMON ISSUES

### "Page not found on refresh" (SPA)
**Fix**: Add `netlify.toml` with redirect rule (see above).

### "Build failed: npm ERR!"
**Check**:
1. Node version is correct (set in `netlify.toml`)
2. All dependencies are in `package.json`
3. Build command is correct

### "Environment variable not working"
**For Vite**: Variable must start with `VITE_`
**Rebuild required** after changing env vars.

---

## ✅ COMPLETION CHECKLIST

- [ ] Netlify account created
- [ ] Site deployed (GitHub or drag-drop)
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Site accessible at `.netlify.app` URL
- [ ] (Optional) Custom domain added
- [ ] (Optional) Netlify Functions set up

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
