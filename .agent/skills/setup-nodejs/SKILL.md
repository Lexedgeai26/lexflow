---
name: setup-nodejs
description: Install and configure Node.js development environment. Complete beginner guide for Mac, Windows, and Linux with version management.
---

# Node.js Setup - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never written code before. That's okay.
2. **EXPLAIN EVERYTHING**: Every term, every command, every step.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Node.js?

**Node.js** lets you run JavaScript outside of a web browser.

**Think of it like this:**
- JavaScript was created to make websites interactive
- Node.js takes that power and lets you use it for other things: servers, command-line tools, desktop apps

**Why do you need it?**
- To run React, Vue, Next.js, or any modern web project
- To use npm (Node Package Manager) - a huge library of free code
- To build backend servers with Express, Fastify, etc.

---

## 🖥️ WHAT'S YOUR OPERATING SYSTEM?

Click on your system below:

- [Mac](#mac-installation)
- [Windows](#windows-installation)
- [Linux](#linux-installation)

---

## Mac Installation

### Step 1: Open Terminal

1. Press **Cmd + Space** (opens Spotlight search)
2. Type `Terminal`
3. Press **Enter**

A black/white window opens - this is your terminal!

### Step 2: Install Homebrew (Package Manager)

Homebrew is like an App Store for developer tools.

**Check if already installed:**
```bash
brew --version
```

If you see a version number, skip to Step 3.

**If NOT installed, run:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the prompts (enter your password when asked).

### Step 3: Install Node.js

```bash
brew install node
```

### Step 4: Verify Installation

```bash
node --version
npm --version
```

**Expected output:**
```
v20.x.x
10.x.x
```

✅ **Done! Node.js is installed!**

---

## Windows Installation

### Step 1: Download Node.js

1. Go to https://nodejs.org
2. Click the **LTS** button (green, on the left)
3. Download the `.msi` file

### Step 2: Run the Installer

1. Double-click the downloaded file
2. Click **Next** through all screens
3. Accept the license agreement
4. Keep default installation location
5. Click **Install**
6. Click **Finish**

### Step 3: Open Command Prompt

1. Press **Windows + R**
2. Type `cmd`
3. Press **Enter**

### Step 4: Verify Installation

```bash
node --version
npm --version
```

**Expected output:**
```
v20.x.x
10.x.x
```

✅ **Done! Node.js is installed!**

---

## Linux Installation

### Ubuntu/Debian

```bash
# Update package list
sudo apt update

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Fedora/RHEL

```bash
sudo dnf install nodejs npm
```

---

## 🔄 MANAGING MULTIPLE NODE VERSIONS (Optional)

If you work on multiple projects, they might need different Node versions.

### Install nvm (Node Version Manager)

**Mac/Linux:**
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Close and reopen your terminal, then:
```bash
nvm install 20
nvm install 18
nvm use 20
```

**Windows:**
Download nvm-windows from https://github.com/coreybutler/nvm-windows/releases

---

## 📦 npm BASICS

**npm** = Node Package Manager. It downloads free code packages.

### Common Commands

| Command | What it does |
|---------|--------------|
| `npm install` | Install all project dependencies |
| `npm install express` | Install a specific package |
| `npm run dev` | Run development server |
| `npm run build` | Build for production |

### Create a New Project

```bash
mkdir my-project
cd my-project
npm init -y
```

This creates `package.json` - your project's config file.

---

## 🛑 COMMON ISSUES

### "npm: command not found"
**Mac Fix:**
```bash
export PATH="/usr/local/bin:$PATH"
```
Add this line to `~/.zshrc` to make it permanent.

### "Permission denied"
**Never use `sudo npm install`!** Instead:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### "Node version wrong"
```bash
nvm use 20
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Terminal/Command Prompt opened
- [ ] Node.js installed
- [ ] `node --version` shows version
- [ ] `npm --version` shows version
- [ ] (Optional) nvm installed for version management

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
