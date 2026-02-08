---
name: db-mongodb
description: Set up MongoDB database for any project. Beginner-friendly guide with Docker, connection strings, and ODM integration. Best for flexible, document-based data.
---

# MongoDB Database Setup - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You know nothing about databases. That's okay.
2. **EXPLAIN EVERYTHING**: Every command, every term, every concept.
3. **COPY-PASTE READY**: All commands work as-is. Just copy and run.
4. **FAIL-SAFE**: Verification steps after every action.
5. **RECOMMEND, DON'T ENFORCE**: We suggest best practices but allow flexibility.

---

## 🎯 What is MongoDB?

**MongoDB** is a **NoSQL database** - instead of tables and rows (like Excel), it stores data as **documents** (like JSON files).

Think of it like storing sticky notes in folders, where each note can have different information.

**Why MongoDB?**
- ✅ Flexible - no fixed structure required
- ✅ Great for JavaScript/Node.js projects
- ✅ Easy to get started
- ✅ Default choice for MERN stack (MongoDB, Express, React, Node)

**When to use MongoDB:**
- You're building a MERN stack app
- Your data structure changes frequently
- You don't need complex relationships between data

---

## 📋 PREREQUISITES CHECKLIST

Before we start, you need these tools installed:

### 1. Docker Desktop
Docker lets you run MongoDB without installing it directly on your computer.

**Check if installed:**
```bash
docker --version
```

**If NOT installed:**
- **Mac**: Download from https://www.docker.com/products/docker-desktop/
- **Windows**: Download from https://www.docker.com/products/docker-desktop/
- **Linux**: Run `sudo apt install docker.io docker-compose`

### 2. A Terminal/Command Line
- **Mac**: Open "Terminal" app (search in Spotlight)
- **Windows**: Open "PowerShell" or "Command Prompt"
- **Linux**: Open your terminal emulator

---

## 🚀 EXECUTION PIPELINE

### Step 1: Create Docker Compose File [MANUAL]

A `docker-compose.yml` file tells Docker how to run MongoDB.

**Create a file named `docker-compose.yml`** in your project root:

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    container_name: my_mongo_db
    restart: unless-stopped
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: supersecretpassword123
      MONGO_INITDB_DATABASE: myapp_db
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  mongo_data:
```

**What does this mean?**
- `image: mongo:7` → Use MongoDB version 7
- `MONGO_INITDB_ROOT_USERNAME` → Your database username
- `MONGO_INITDB_ROOT_PASSWORD` → Your database password (CHANGE THIS!)
- `MONGO_INITDB_DATABASE` → The name of your database
- `ports: "27017:27017"` → Makes the database accessible on port 27017

---

### Step 2: Start MongoDB [AUTO]

Run this command in your terminal (from the folder with `docker-compose.yml`):

```bash
echo "🍃 [1/3] Starting MongoDB..."
docker compose up -d
```

**What does this do?**
- `docker compose up` → Starts the database
- `-d` → Runs in the background (detached mode)

**Expected output:**
```
[+] Running 2/2
 ✔ Network myapp_default  Created
 ✔ Container my_mongo_db  Started
```

---

### Step 3: Verify Database is Running [AUTO]

```bash
echo "✅ [2/3] Verifying MongoDB is running..."
docker ps | grep mongo
```

**Expected output:**
```
abc123  mongo:7  "docker-entrypoint.s…"  Up 10 seconds  0.0.0.0:27017->27017/tcp  my_mongo_db
```

If you see this, MongoDB is running! 🎉

---

### Step 4: Test Database Connection [AUTO]

```bash
echo "🔌 [3/3] Testing database connection..."
docker exec -it my_mongo_db mongosh -u admin -p supersecretpassword123 --eval "db.runCommand({ ping: 1 })"
```

**Expected output:**
```
{ ok: 1 }
```

If you see `ok: 1`, you can connect to the database! 🎉

---

## 🔗 CONNECTION STRING

Your application needs a **connection string** to connect to the database.

### Format:
```
mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME?authSource=admin
```

### Your Connection String:
```
MONGODB_URI="mongodb://admin:supersecretpassword123@localhost:27017/myapp_db?authSource=admin"
```

**Add this to your `.env` file:**
```bash
# Database Configuration
MONGODB_URI="mongodb://admin:supersecretpassword123@localhost:27017/myapp_db?authSource=admin"
```

---

## 🔧 ODM INTEGRATION

### For Node.js (Mongoose) - RECOMMENDED
```bash
npm install mongoose
```

```javascript
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));
```

### For Node.js (Prisma)
```bash
npm install prisma @prisma/client
npx prisma init
```

Then update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "mongodb"
  url      = env("MONGODB_URI")
}
```

### For Python (Motor - Async)
```bash
pip install motor
```

```python
from motor.motor_asyncio import AsyncIOMotorClient

client = AsyncIOMotorClient("mongodb://admin:supersecretpassword123@localhost:27017/myapp_db?authSource=admin")
db = client.myapp_db
```

### For Python (PyMongo - Sync)
```bash
pip install pymongo
```

```python
from pymongo import MongoClient

client = MongoClient("mongodb://admin:supersecretpassword123@localhost:27017/myapp_db?authSource=admin")
db = client.myapp_db
```

---

## 🛑 COMMON ISSUES & FIXES

### Issue: "Connection refused"
**Cause**: MongoDB container is not running.
**Fix**: Run `docker compose up -d` again.

### Issue: "Authentication failed"
**Cause**: Wrong username or password, or missing `?authSource=admin`.
**Fix**: Make sure your connection string includes `?authSource=admin`.

### Issue: "MongoNetworkError"
**Cause**: MongoDB is still starting up (takes ~10-20 seconds).
**Fix**: Wait 20 seconds and try again.

---

## 🧹 CLEANUP COMMANDS

### Stop the database (keeps data):
```bash
docker compose stop
```

### Stop and remove everything (DELETES DATA):
```bash
docker compose down -v
```

### View database logs:
```bash
docker logs my_mongo_db
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Docker Desktop installed and running
- [ ] `docker-compose.yml` created
- [ ] MongoDB container started (`docker compose up -d`)
- [ ] Connection verified (`docker exec ... ping`)
- [ ] `MONGODB_URI` added to `.env`
- [ ] ODM configured (Mongoose/Motor/Prisma)

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
