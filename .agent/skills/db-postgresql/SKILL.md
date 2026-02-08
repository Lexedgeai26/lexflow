---
name: db-postgresql
description: Set up PostgreSQL database for any project. Beginner-friendly guide with Docker, connection strings, and ORM integration. Recommended for most projects.
---

# PostgreSQL Database Setup - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You know nothing about databases. That's okay.
2. **EXPLAIN EVERYTHING**: Every command, every term, every concept.
3. **COPY-PASTE READY**: All commands work as-is. Just copy and run.
4. **FAIL-SAFE**: Verification steps after every action.
5. **RECOMMEND, DON'T ENFORCE**: We suggest best practices but allow flexibility.

---

## 🎯 What is PostgreSQL?

**PostgreSQL** (often called "Postgres") is a **database** - a place where your application stores information (like users, products, orders).

Think of it like a super-organized spreadsheet that your code can read and write to.

**Why PostgreSQL?**
- ✅ Free and open-source
- ✅ Extremely reliable and battle-tested
- ✅ Works with almost every programming language
- ✅ Recommended by most frameworks (Django, Rails, Laravel, FastAPI)

---

## 📋 PREREQUISITES CHECKLIST

Before we start, you need these tools installed:

### 1. Docker Desktop
Docker lets you run PostgreSQL without installing it directly on your computer.

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

A `docker-compose.yml` file tells Docker how to run PostgreSQL.

**Create a file named `docker-compose.yml`** in your project root:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: my_postgres_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: supersecretpassword123
      POSTGRES_DB: myapp_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**What does this mean?**
- `image: postgres:16-alpine` → Use PostgreSQL version 16 (lightweight Alpine version)
- `POSTGRES_USER` → Your database username (like a login)
- `POSTGRES_PASSWORD` → Your database password (CHANGE THIS in production!)
- `POSTGRES_DB` → The name of your database
- `ports: "5432:5432"` → Makes the database accessible on port 5432
- `volumes` → Saves your data even if Docker restarts

---

### Step 2: Start PostgreSQL [AUTO]

Run this command in your terminal (from the folder with `docker-compose.yml`):

```bash
echo "🐘 [1/3] Starting PostgreSQL..."
docker compose up -d
```

**What does this do?**
- `docker compose up` → Starts the database
- `-d` → Runs in the background (detached mode)

**Expected output:**
```
[+] Running 2/2
 ✔ Network myapp_default  Created
 ✔ Container my_postgres_db  Started
```

---

### Step 3: Verify Database is Running [AUTO]

```bash
echo "✅ [2/3] Verifying PostgreSQL is running..."
docker ps | grep postgres
```

**Expected output:**
```
abc123  postgres:16-alpine  "docker-entrypoint.s…"  Up 10 seconds  0.0.0.0:5432->5432/tcp  my_postgres_db
```

If you see this, PostgreSQL is running! 🎉

---

### Step 4: Test Database Connection [AUTO]

```bash
echo "🔌 [3/3] Testing database connection..."
docker exec -it my_postgres_db psql -U admin -d myapp_db -c "SELECT 1 as connection_test;"
```

**Expected output:**
```
 connection_test 
-----------------
               1
(1 row)
```

If you see this, you can connect to the database! 🎉

---

## 🔗 CONNECTION STRING

Your application needs a **connection string** to connect to the database.

### Format:
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

### Your Connection String:
```
DATABASE_URL="postgresql://admin:supersecretpassword123@localhost:5432/myapp_db"
```

**Add this to your `.env` file:**
```bash
# Database Configuration
DATABASE_URL="postgresql://admin:supersecretpassword123@localhost:5432/myapp_db"
```

---

## 🔧 ORM INTEGRATION

### For Node.js (Prisma)
```bash
npm install prisma @prisma/client
npx prisma init
```

Then update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### For Python (SQLAlchemy)
```bash
pip install sqlalchemy psycopg2-binary
```

```python
from sqlalchemy import create_engine
engine = create_engine("postgresql://admin:supersecretpassword123@localhost:5432/myapp_db")
```

### For Python (Prisma)
```bash
pip install prisma
prisma init
```

### For PHP (Laravel)
Update `.env`:
```
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=myapp_db
DB_USERNAME=admin
DB_PASSWORD=supersecretpassword123
```

---

## 🛑 COMMON ISSUES & FIXES

### Issue: "Connection refused"
**Cause**: PostgreSQL container is not running.
**Fix**: Run `docker compose up -d` again.

### Issue: "Authentication failed"
**Cause**: Wrong username or password.
**Fix**: Check your `.env` file matches the `docker-compose.yml` credentials.

### Issue: "Database does not exist"
**Cause**: Database wasn't created.
**Fix**: Recreate the container:
```bash
docker compose down -v
docker compose up -d
```

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
docker logs my_postgres_db
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Docker Desktop installed and running
- [ ] `docker-compose.yml` created
- [ ] PostgreSQL container started (`docker compose up -d`)
- [ ] Connection verified (`docker exec ... SELECT 1`)
- [ ] `DATABASE_URL` added to `.env`
- [ ] ORM configured (Prisma/SQLAlchemy/Eloquent)

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
