---
name: deploy-gcp
description: Deploy your application to Google Cloud Platform. Excellent for Google ecosystem integration. Good free tier.
---

# Deploy to Google Cloud Platform - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never used GCP before. That's okay.
2. **EXPLAIN EVERYTHING**: Every service, every term, every step.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Google Cloud Platform?

**GCP** is Google's cloud platform, the same infrastructure that runs Google Search, YouTube, and Gmail.

**Why GCP?**
- ✅ **$300 free credit** for 90 days
- ✅ **Always free tier** for many services
- ✅ **Excellent for AI/ML** - TensorFlow, Vertex AI
- ✅ **Great Kubernetes** - GKE is industry-leading
- ✅ **Firebase integration** - Same platform

**Best for:**
- Apps using Google services (Maps, AI, etc.)
- Kubernetes/container deployments
- Data analytics and machine learning

---

## 🧭 GCP Services Simplified

| What You Need | GCP Service | Similar To |
|---------------|-------------|------------|
| Run containers | **Cloud Run** | Render, Railway |
| Host website | Cloud Storage + CDN | S3 + CloudFront |
| Full VM | Compute Engine | EC2 |
| Kubernetes | GKE | EKS, AKS |
| Serverless | Cloud Functions | Lambda |
| Database | Cloud SQL | RDS |

**Recommended:** Start with **Cloud Run** - it's the easiest!

---

## 📋 PREREQUISITES

### 1. Google Cloud Account
1. Go to https://console.cloud.google.com
2. Sign in with Google account
3. Accept terms and set up billing (free trial available)

### 2. Create a Project
1. Click project dropdown (top left)
2. Click **"New Project"**
3. Name: `my-app-project`
4. Click **"Create"**

### 3. Install Google Cloud CLI

```bash
# Mac
brew install google-cloud-sdk

# Windows/Linux
# Download from https://cloud.google.com/sdk/docs/install
```

### 4. Initialize gcloud

```bash
gcloud init
```

Follow prompts to:
- Login to your account
- Select your project
- Set default region (e.g., `us-central1`)

---

## 🚀 OPTION 1: Cloud Run (Recommended)

### Best for: Docker containers, backends, full-stack apps

Cloud Run automatically:
- Scales to zero when not in use (saves money!)
- Handles HTTPS and load balancing
- Manages containers for you

### Step 1: Create Dockerfile

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "start"]
```

### Step 2: Build and Push to Container Registry

```bash
# Enable required APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com

# Build and push
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/my-app
```

### Step 3: Deploy to Cloud Run

```bash
gcloud run deploy my-app \
    --image gcr.io/YOUR_PROJECT_ID/my-app \
    --platform managed \
    --region us-central1 \
    --allow-unauthenticated
```

### Step 4: Get Your URL

```
Service URL: https://my-app-abc123-uc.a.run.app
```

---

## 🚀 OPTION 2: App Engine (PaaS)

### Best for: Simple deployments without Docker

### Step 1: Create app.yaml

**For Node.js:**
```yaml
runtime: nodejs18

instance_class: F1

env_variables:
  NODE_ENV: production

handlers:
  - url: /.*
    script: auto
```

**For Python:**
```yaml
runtime: python311

instance_class: F1

entrypoint: gunicorn main:app

env_variables:
  ENVIRONMENT: production
```

### Step 2: Deploy

```bash
gcloud app deploy
```

### Step 3: Open Your App

```bash
gcloud app browse
```

---

## 🗄️ Cloud SQL (PostgreSQL)

### Create Instance

```bash
# Enable API
gcloud services enable sqladmin.googleapis.com

# Create instance
gcloud sql instances create my-db \
    --database-version=POSTGRES_15 \
    --tier=db-f1-micro \
    --region=us-central1

# Create database
gcloud sql databases create myapp --instance=my-db

# Create user
gcloud sql users create admin \
    --instance=my-db \
    --password=MyPassword123!
```

### Connect from Cloud Run

Add to deployment:
```bash
gcloud run deploy my-app \
    --add-cloudsql-instances=YOUR_PROJECT:us-central1:my-db \
    --set-env-vars=DATABASE_URL="postgresql://admin:MyPassword123!@/myapp?host=/cloudsql/YOUR_PROJECT:us-central1:my-db"
```

---

## ⚡ Cloud Functions (Serverless)

### Step 1: Create Function

Create `index.js`:
```javascript
exports.helloWorld = (req, res) => {
  res.json({ message: "Hello from Google Cloud!" });
};
```

Create `package.json`:
```json
{
  "name": "my-function",
  "version": "1.0.0"
}
```

### Step 2: Deploy

```bash
gcloud functions deploy helloWorld \
    --runtime nodejs18 \
    --trigger-http \
    --allow-unauthenticated \
    --region us-central1
```

### Step 3: Get URL

```
https://us-central1-YOUR_PROJECT.cloudfunctions.net/helloWorld
```

---

## 🌐 Static Website (Cloud Storage)

### Step 1: Create Bucket

```bash
gsutil mb -l us-central1 gs://my-static-site-bucket
```

### Step 2: Upload Files

```bash
gsutil -m cp -r dist/* gs://my-static-site-bucket
```

### Step 3: Enable Website

```bash
gsutil web set -m index.html -e index.html gs://my-static-site-bucket
```

### Step 4: Make Public

```bash
gsutil iam ch allUsers:objectViewer gs://my-static-site-bucket
```

---

## 💰 FREE TIER

| Service | Free Tier |
|---------|-----------|
| **Cloud Run** | 2 million requests/month |
| **Cloud Functions** | 2 million invocations/month |
| **Cloud Storage** | 5GB |
| **Cloud SQL** | No free tier (use Firestore instead) |
| **Firestore** | 1GB storage, 50K reads/day |

---

## 🛑 COMMON ISSUES

### "Permission denied"
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### "API not enabled"
```bash
gcloud services enable run.googleapis.com
```

### "Billing not enabled"
Go to https://console.cloud.google.com/billing and enable billing.

---

## ✅ COMPLETION CHECKLIST

- [ ] GCP account created
- [ ] Project created
- [ ] gcloud CLI installed and initialized
- [ ] App deployed (Cloud Run/App Engine)
- [ ] Environment variables set
- [ ] Database created (if needed)
- [ ] App accessible via `.run.app` or `.appspot.com` URL

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
