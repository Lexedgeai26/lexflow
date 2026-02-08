---
name: db-mysql
description: Set up MySQL database for any project. Beginner-friendly guide with Docker, connection strings, and ORM integration. Popular choice for Laravel and WordPress.
---

# MySQL Database Setup - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You know nothing about databases. That's okay.
2. **EXPLAIN EVERYTHING**: Every command, every term, every concept.
3. **COPY-PASTE READY**: All commands work as-is. Just copy and run.
4. **FAIL-SAFE**: Verification steps after every action.
5. **RECOMMEND, DON'T ENFORCE**: We suggest best practices but allow flexibility.

---

## 🎯 What is MySQL?

**MySQL** is a **database** - a place where your application stores information (like users, products, orders).

Think of it like a super-organized spreadsheet that your code can read and write to.

**Why MySQL?**
- ✅ Free and open-source
- ✅ Very fast for read-heavy applications
- ✅ Default database for Laravel, WordPress, and many PHP apps
- ✅ Extremely well-documented

---

## 📋 PREREQUISITES CHECKLIST

Before we start, you need these tools installed:

### 1. Docker Desktop
Docker lets you run MySQL without installing it directly on your computer.

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

A `docker-compose.yml` file tells Docker how to run MySQL.

**Create a file named `docker-compose.yml`** in your project root:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: my_mysql_db
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword123
      MYSQL_USER: admin
      MYSQL_PASSWORD: supersecretpassword123
      MYSQL_DATABASE: myapp_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
    command: --default-authentication-plugin=mysql_native_password

volumes:
  mysql_data:
```

**What does this mean?**
- `image: mysql:8.0` → Use MySQL version 8.0
- `MYSQL_ROOT_PASSWORD` → The "superuser" password (for emergencies)
- `MYSQL_USER` → Your application's database username
- `MYSQL_PASSWORD` → Your application's database password (CHANGE THIS!)
- `MYSQL_DATABASE` → The name of your database
- `ports: "3306:3306"` → Makes the database accessible on port 3306

---

### Step 2: Start MySQL [AUTO]

Run this command in your terminal (from the folder with `docker-compose.yml`):

```bash
echo "🐬 [1/3] Starting MySQL..."
docker compose up -d
```

**What does this do?**
- `docker compose up` → Starts the database
- `-d` → Runs in the background (detached mode)

**Expected output:**
```
[+] Running 2/2
 ✔ Network myapp_default  Created
 ✔ Container my_mysql_db  Started
```

---

### Step 3: Verify Database is Running [AUTO]

```bash
echo "✅ [2/3] Verifying MySQL is running..."
docker ps | grep mysql
```

**Expected output:**
```
abc123  mysql:8.0  "docker-entrypoint.s…"  Up 10 seconds  0.0.0.0:3306->3306/tcp  my_mysql_db
```

If you see this, MySQL is running! 🎉

---

### Step 4: Test Database Connection [AUTO]

```bash
echo "🔌 [3/3] Testing database connection..."
docker exec -it my_mysql_db mysql -u admin -psupersecretpassword123 -e "SELECT 1 as connection_test;"
```

**Expected output:**
```
+-----------------+
| connection_test |
+-----------------+
|               1 |
+-----------------+
```

If you see this, you can connect to the database! 🎉

---

## 🔗 CONNECTION STRING

Your application needs a **connection string** to connect to the database.

### Format:
```
mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME
```

### Your Connection String:
```
DATABASE_URL="mysql://admin:supersecretpassword123@localhost:3306/myapp_db"
```

**Add this to your `.env` file:**
```bash
# Database Configuration
DATABASE_URL="mysql://admin:supersecretpassword123@localhost:3306/myapp_db"
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
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### For Python (SQLAlchemy)
```bash
pip install sqlalchemy pymysql
```

```python
from sqlalchemy import create_engine
engine = create_engine("mysql+pymysql://admin:supersecretpassword123@localhost:3306/myapp_db")
```

### For PHP (Laravel)
Update `.env`:
```
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=myapp_db
DB_USERNAME=admin
DB_PASSWORD=supersecretpassword123
```

---

## 🛑 COMMON ISSUES & FIXES

### Issue: "Connection refused"
**Cause**: MySQL container is not running.
**Fix**: Run `docker compose up -d` again.

### Issue: "Access denied for user"
**Cause**: Wrong username or password.
**Fix**: Check your `.env` file matches the `docker-compose.yml` credentials.

### Issue: "Can't connect to MySQL server"
**Cause**: MySQL is still starting up (takes ~30 seconds).
**Fix**: Wait 30 seconds and try again.

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
docker logs my_mysql_db
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Docker Desktop installed and running
- [ ] `docker-compose.yml` created
- [ ] MySQL container started (`docker compose up -d`)
- [ ] Connection verified (`docker exec ... SELECT 1`)
- [ ] `DATABASE_URL` added to `.env`
- [ ] ORM configured (Prisma/SQLAlchemy/Eloquent)

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
