---
name: deploy-azure
description: Deploy your application to Azure (Microsoft Cloud). Enterprise-grade platform with excellent .NET support. Good free tier.
---

# Deploy to Azure - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never used Azure before. That's okay.
2. **EXPLAIN EVERYTHING**: Every service, every term, every step.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Azure?

**Azure** is Microsoft's cloud platform, competing with AWS and GCP.

**Why Azure?**
- ✅ **$200 free credit** for 30 days + 12 months of free services
- ✅ **Great for .NET** - First-class C#, ASP.NET support
- ✅ **Enterprise integration** - Works with Microsoft 365, Active Directory
- ✅ **Visual Studio integration** - Deploy directly from IDE

**Best for:**
- .NET / C# applications
- Enterprise applications
- Microsoft ecosystem users

---

## 🧭 Azure Services Simplified

| What You Need | Azure Service |
|---------------|---------------|
| Host a website | App Service |
| Run containers | Container Apps |
| Serverless | Azure Functions |
| Database | Azure SQL / Cosmos DB |
| Static sites | Static Web Apps |
| File storage | Blob Storage |

---

## 📋 PREREQUISITES

### 1. Azure Account
1. Go to https://azure.microsoft.com/free
2. Click **"Start free"**
3. Sign in with Microsoft account
4. Complete verification (credit card required for identity)

### 2. Azure CLI
```bash
# Mac
brew install azure-cli

# Windows
# Download from https://aka.ms/installazurecliwindows

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### 3. Login to Azure
```bash
az login
```

This opens a browser. Sign in with your Microsoft account.

---

## 🚀 OPTION 1: Static Web App (Easiest)

### Best for: React, Vue, Angular, static sites

### Step 1: Push to GitHub
Make sure your code is on GitHub.

### Step 2: Create Static Web App

1. Go to https://portal.azure.com
2. Click **"Create a resource"**
3. Search for **"Static Web Apps"**
4. Click **"Create"**

### Step 3: Configure

| Setting | Value |
|---------|-------|
| **Subscription** | Your subscription |
| **Resource Group** | Create new: `my-app-rg` |
| **Name** | `my-static-app` |
| **Region** | Choose closest to users |
| **Source** | GitHub |
| **Organization** | Your GitHub username |
| **Repository** | Your repo |
| **Branch** | `main` |

### Step 4: Build Details

| Framework | Build Preset | App location | Output location |
|-----------|--------------|--------------|-----------------|
| React (Vite) | React | `/` | `dist` |
| React (CRA) | React | `/` | `build` |
| Vue | Vue.js | `/` | `dist` |
| Next.js | Next.js | `/` | `.next` |

### Step 5: Deploy

Click **"Review + create"** → **"Create"**

Azure creates a GitHub Action that deploys automatically!

**Your app URL:**
```
https://my-static-app.azurestaticapps.net
```

---

## 🚀 OPTION 2: App Service (Backend Apps)

### Best for: Node.js, Python, .NET, Java backends

### Step 1: Create App Service via CLI

```bash
# Create resource group
az group create --name my-app-rg --location eastus

# Create App Service plan
az appservice plan create --name my-plan --resource-group my-app-rg --sku F1 --is-linux

# Create web app (Node.js example)
az webapp create --name my-backend-app --resource-group my-app-rg --plan my-plan --runtime "NODE:18-lts"
```

### Step 2: Deploy Your Code

```bash
# From your project directory
az webapp up --name my-backend-app --resource-group my-app-rg
```

### Step 3: Set Environment Variables

```bash
az webapp config appsettings set --name my-backend-app --resource-group my-app-rg --settings DATABASE_URL="your-connection-string" JWT_SECRET="your-secret"
```

### Step 4: View Logs

```bash
az webapp log tail --name my-backend-app --resource-group my-app-rg
```

---

## 🗄️ Azure Database

### Create PostgreSQL

```bash
az postgres flexible-server create \
    --name my-postgres-server \
    --resource-group my-app-rg \
    --location eastus \
    --admin-user adminuser \
    --admin-password MyPassword123! \
    --sku-name Standard_B1ms \
    --tier Burstable
```

### Create Database

```bash
az postgres flexible-server db create \
    --resource-group my-app-rg \
    --server-name my-postgres-server \
    --database-name myapp
```

### Connection String

```
postgresql://adminuser:MyPassword123!@my-postgres-server.postgres.database.azure.com:5432/myapp
```

---

## ⚡ Azure Functions (Serverless)

### Step 1: Install Functions Core Tools

```bash
npm install -g azure-functions-core-tools@4
```

### Step 2: Create Function Project

```bash
func init my-functions --javascript
cd my-functions
func new --name hello --template "HTTP trigger"
```

### Step 3: Test Locally

```bash
func start
```

### Step 4: Deploy

```bash
# Create Function App
az functionapp create --name my-function-app --resource-group my-app-rg --consumption-plan-location eastus --runtime node --runtime-version 18 --functions-version 4 --storage-account mystorageaccount

# Deploy
func azure functionapp publish my-function-app
```

---

## 💰 FREE TIER

| Service | Free Tier |
|---------|-----------|
| **App Service** | F1 tier - 60 min/day compute |
| **Static Web Apps** | Free with 100GB bandwidth |
| **Azure Functions** | 1 million executions/month |
| **Cosmos DB** | 1000 RU/s free |

⚠️ Set up **cost alerts** in Azure Portal!

---

## 🛑 COMMON ISSUES

### "Resource group not found"
Create it first:
```bash
az group create --name my-app-rg --location eastus
```

### "SKU not available in region"
Try different region:
```bash
--location westus2
```

### "Deployment failed"
Check logs:
```bash
az webapp log tail --name my-app --resource-group my-app-rg
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Azure account created
- [ ] Azure CLI installed and logged in
- [ ] Resource group created
- [ ] App deployed (Static Web App or App Service)
- [ ] Environment variables configured
- [ ] Database created (if needed)
- [ ] App accessible via `.azurewebsites.net` or `.azurestaticapps.net`

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
