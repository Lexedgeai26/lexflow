---
name: setup-git
description: Install and learn Git version control. Complete beginner guide for tracking code changes and collaborating with others.
---

# Git Setup - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never used version control before. That's okay.
2. **EXPLAIN EVERYTHING**: Every term, every command, every step.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Git?

**Git** is a tool that tracks changes to your files over time.

**Think of it like this:**
- Google Docs has "Version History" - you can see every change ever made
- Git is like that, but for code, and much more powerful

**Why use Git?**
- ✅ **Undo mistakes** - Go back to any previous version
- ✅ **Collaborate** - Multiple people can work on the same project
- ✅ **Backup** - Push to GitHub for cloud storage
- ✅ **Required** - Every programming job expects you to know Git

---

## 🖥️ INSTALLATION

### Mac

**Check if already installed:**
```bash
git --version
```

If you see a version, you're done!

**If not installed:**
```bash
xcode-select --install
```

Click "Install" in the popup.

### Windows

1. Go to https://git-scm.com/download/win
2. Download the installer
3. Run it, click "Next" through all screens (defaults are fine)
4. Open a new Command Prompt

**Check:**
```bash
git --version
```

### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install git

# Fedora
sudo dnf install git
```

---

## ⚙️ FIRST-TIME SETUP

Tell Git who you are (used in commit history):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Set default branch name to `main`:
```bash
git config --global init.defaultBranch main
```

**Verify:**
```bash
git config --list
```

---

## 📚 KEY CONCEPTS

| Term | Meaning | Analogy |
|------|---------|---------|
| **Repository (Repo)** | A project folder tracked by Git | A folder with version history |
| **Commit** | A saved snapshot of your changes | A save point in a video game |
| **Branch** | A parallel version of your code | An alternate timeline |
| **Push** | Upload commits to GitHub | Save to cloud |
| **Pull** | Download commits from GitHub | Sync from cloud |
| **Clone** | Download a repo | Copy someone's project |

---

## 🚀 BASIC WORKFLOW

### 1. Create a New Repository

```bash
# Navigate to your project
cd my-project

# Initialize Git
git init
```

### 2. Stage Changes

```bash
# Stage specific file
git add filename.js

# Stage all changes
git add .
```

### 3. Commit Changes

```bash
git commit -m "Describe what you changed"
```

**Good commit messages:**
- ✅ "Add user login feature"
- ✅ "Fix bug where form didn't submit"
- ❌ "Update stuff"
- ❌ "asdfasdf"

### 4. Check Status

```bash
git status
```

This shows:
- Files you've modified
- Files staged for commit
- Untracked files

---

## 🔗 CONNECT TO GITHUB

### Step 1: Create GitHub Account

1. Go to https://github.com
2. Click "Sign up"
3. Follow the steps

### Step 2: Create a Repository on GitHub

1. Click the "+" button (top right)
2. Click "New repository"
3. Name it (e.g., "my-project")
4. Don't add README (we already have code)
5. Click "Create repository"

### Step 3: Connect Local to GitHub

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/my-project.git

# Push your code
git branch -M main
git push -u origin main
```

**First time:** GitHub will ask for login. Use a personal access token:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate a new token with "repo" scope
3. Use this as your password

---

## 📋 COMMON COMMANDS CHEATSHEET

```bash
# Initialize repo
git init

# Check status
git status

# Stage all files
git add .

# Commit
git commit -m "Message"

# Push to GitHub
git push

# Pull from GitHub
git pull

# View commit history
git log --oneline

# Clone a repo
git clone https://github.com/user/repo.git

# Create branch
git checkout -b new-feature

# Switch branch
git checkout main

# Merge branch
git merge new-feature
```

---

## 🔀 BRANCHING (Intermediate)

Branches let you work on features without affecting the main code.

```bash
# Create and switch to new branch
git checkout -b feature/login

# Make changes, commit...
git add .
git commit -m "Add login page"

# Switch back to main
git checkout main

# Merge your feature
git merge feature/login

# Push
git push
```

---

## 📁 .gitignore

A `.gitignore` file tells Git which files to NOT track.

**Create `.gitignore`:**
```
# Dependencies
node_modules/
venv/

# Environment files
.env
.env.local

# Build output
dist/
build/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db
```

---

## 🛑 COMMON ISSUES

### "Please tell me who you are"
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### "Failed to push - rejected"
Someone else pushed changes. Pull first:
```bash
git pull
git push
```

### "Merge conflict"
Edit the file to resolve, then:
```bash
git add .
git commit -m "Resolve merge conflict"
```

### Undo last commit (keep changes)
```bash
git reset --soft HEAD~1
```

### Undo all uncommitted changes
```bash
git checkout -- .
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Git installed (`git --version`)
- [ ] Name and email configured
- [ ] Know how to: init, add, commit
- [ ] Know how to: push, pull
- [ ] GitHub account created
- [ ] Pushed first repo to GitHub
- [ ] Created `.gitignore`

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
