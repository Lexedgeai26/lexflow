---
name: setup-docker
description: Install and configure Docker for local development. Complete beginner guide for running databases and services.
---

# Docker Setup - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never used Docker before. That's okay.
2. **EXPLAIN EVERYTHING**: Every term, every command, every step.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Docker?

**Docker** lets you run software in isolated "containers".

**Think of it like this:**
- Imagine you want to try a new database (PostgreSQL)
- Without Docker: Download installer, configure settings, hope it doesn't break your computer
- With Docker: Run one command, database is ready. Delete when done.

**Why use Docker?**
- ✅ Same setup works on every computer
- ✅ Easy to run databases (PostgreSQL, MongoDB, Redis)
- ✅ Clean uninstall - just delete the container
- ✅ Run multiple versions side-by-side

---

## 🖥️ INSTALLATION

### Mac

1. Go to https://www.docker.com/products/docker-desktop/
2. Click **"Download for Mac"**
3. Choose your chip:
   - **Apple Silicon** (M1, M2, M3) - newer Macs
   - **Intel chip** - older Macs
4. Open the downloaded `.dmg` file
5. Drag Docker to Applications
6. Open Docker from Applications
7. Wait for Docker to start (whale icon in menu bar)

### Windows

1. Go to https://www.docker.com/products/docker-desktop/
2. Click **"Download for Windows"**
3. Run the installer
4. **Enable WSL 2** when prompted (recommended)
5. Restart your computer
6. Open Docker Desktop

### Linux (Ubuntu)

```bash
# Update packages
sudo apt update

# Install prerequisites
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Add Docker's official GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add your user to docker group (so you don't need sudo)
sudo usermod -aG docker $USER
```

Log out and back in for the group change to take effect.

---

## ✅ VERIFY INSTALLATION

```bash
docker --version
docker compose version
```

**Expected:**
```
Docker version 24.x.x
Docker Compose version v2.x.x
```

**Test Docker is running:**
```bash
docker run hello-world
```

You should see "Hello from Docker!"

---

## 📚 KEY CONCEPTS

### Container vs Image

| Concept | What it is | Analogy |
|---------|------------|---------|
| **Image** | A template/recipe | A cake recipe |
| **Container** | A running instance | The actual cake |

You download an **image** once. You can create many **containers** from it.

### Docker Hub

Docker Hub is like an app store for images. Browse at https://hub.docker.com

---

## 🚀 COMMON COMMANDS

### Container Management

```bash
# List running containers
docker ps

# List ALL containers (including stopped)
docker ps -a

# Stop a container
docker stop container_name

# Start a stopped container
docker start container_name

# Remove a container
docker rm container_name

# View container logs
docker logs container_name

# Enter a container's shell
docker exec -it container_name bash
```

### Image Management

```bash
# List downloaded images
docker images

# Download an image
docker pull postgres:16

# Remove an image
docker rmi postgres:16
```

---

## 🗄️ QUICK START: RUN A DATABASE

### PostgreSQL

```bash
docker run -d \
  --name my_postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=myapp \
  -p 5432:5432 \
  postgres:16-alpine
```

**Connection:** `postgresql://admin:password123@localhost:5432/myapp`

### MySQL

```bash
docker run -d \
  --name my_mysql \
  -e MYSQL_ROOT_PASSWORD=rootpass \
  -e MYSQL_USER=admin \
  -e MYSQL_PASSWORD=password123 \
  -e MYSQL_DATABASE=myapp \
  -p 3306:3306 \
  mysql:8.0
```

### MongoDB

```bash
docker run -d \
  --name my_mongo \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password123 \
  -p 27017:27017 \
  mongo:7
```

### Redis

```bash
docker run -d \
  --name my_redis \
  -p 6379:6379 \
  redis:alpine
```

---

## 📝 docker-compose.yml

Instead of long commands, use a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password123
      POSTGRES_DB: myapp
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Commands:**
```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Stop and DELETE data
docker compose down -v
```

---

## 🧹 CLEANUP

### Remove Everything (Nuclear Option)

```bash
# Stop all containers
docker stop $(docker ps -aq)

# Remove all containers
docker rm $(docker ps -aq)

# Remove all images
docker rmi $(docker images -q)

# Remove all volumes
docker volume prune

# Remove everything unused
docker system prune -a
```

---

## 🛑 COMMON ISSUES

### "Docker daemon is not running"
**Fix (Mac/Windows):** Open Docker Desktop and wait for it to start.

### "Port already in use"
```bash
# Find what's using the port
lsof -i :5432  # Mac/Linux
netstat -ano | findstr :5432  # Windows

# Use a different port
-p 5433:5432  # Maps container 5432 to host 5433
```

### "Permission denied"
**Linux:** Make sure you're in the docker group:
```bash
sudo usermod -aG docker $USER
# Then log out and back in
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Docker Desktop installed
- [ ] Docker is running (whale icon visible)
- [ ] `docker --version` works
- [ ] `docker run hello-world` works
- [ ] Know how to start/stop containers
- [ ] Know how to use docker-compose

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
