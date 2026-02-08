---
name: setup-python
description: Install and configure Python development environment. Complete beginner guide with virtual environments and pip.
---

# Python Setup - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never written code before. That's okay.
2. **EXPLAIN EVERYTHING**: Every term, every command, every step.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Python?

**Python** is a programming language known for being easy to read and learn.

**Think of it like this:**
- If programming languages were human languages, Python would be plain English
- The same code that works on your Mac works on Windows and Linux

**What can you build?**
- Web applications (Django, FastAPI, Flask)
- Data science and AI/ML projects
- Automation scripts
- Desktop applications

---

## 🖥️ WHAT'S YOUR OPERATING SYSTEM?

- [Mac](#mac-installation)
- [Windows](#windows-installation)
- [Linux](#linux-installation)

---

## Mac Installation

### Step 1: Open Terminal

1. Press **Cmd + Space**
2. Type `Terminal`
3. Press **Enter**

### Step 2: Check if Python is Installed

```bash
python3 --version
```

If you see `Python 3.x.x`, you have Python! Skip to Step 4.

### Step 3: Install Python

**Option A: Using Homebrew (Recommended)**
```bash
brew install python
```

**Option B: Download from python.org**
1. Go to https://www.python.org/downloads/
2. Click "Download Python 3.x"
3. Run the installer

### Step 4: Verify Installation

```bash
python3 --version
pip3 --version
```

**Expected:**
```
Python 3.11.x
pip 23.x.x
```

✅ **Python is installed!**

---

## Windows Installation

### Step 1: Download Python

1. Go to https://www.python.org/downloads/
2. Click the big yellow **"Download Python 3.x"** button

### Step 2: Run the Installer

⚠️ **CRITICAL**: On the first screen, check the box that says:
> ☑️ **Add Python to PATH**

Then click "Install Now".

### Step 3: Verify Installation

1. Press **Windows + R**
2. Type `cmd`
3. Press **Enter**

Run:
```bash
python --version
pip --version
```

**Expected:**
```
Python 3.11.x
pip 23.x.x
```

---

## Linux Installation

### Ubuntu/Debian

```bash
sudo apt update
sudo apt install python3 python3-pip python3-venv
```

### Fedora

```bash
sudo dnf install python3 python3-pip
```

### Verify

```bash
python3 --version
pip3 --version
```

---

## 🔒 VIRTUAL ENVIRONMENTS (IMPORTANT!)

A **virtual environment** is like a separate room for each project's packages.

**Why?**
- Project A needs Django 4.0
- Project B needs Django 3.2
- Without virtual environments, they would conflict!

### Create a Virtual Environment

```bash
# Navigate to your project
cd my-project

# Create virtual environment (do this once)
python3 -m venv venv

# Activate it (do this every time you work on the project)
# Mac/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate
```

**You'll see `(venv)` in your terminal** - this means it's active!

### Deactivate When Done

```bash
deactivate
```

---

## 📦 pip BASICS

**pip** = Python Package Installer. It downloads Python libraries.

### Common Commands

| Command | What it does |
|---------|--------------|
| `pip install flask` | Install a package |
| `pip install -r requirements.txt` | Install from file |
| `pip freeze > requirements.txt` | Save installed packages |
| `pip list` | Show installed packages |

### Install Common Packages

```bash
# Web frameworks
pip install fastapi uvicorn
pip install flask
pip install django

# Data science
pip install pandas numpy
pip install jupyter

# Database
pip install sqlalchemy psycopg2-binary
```

---

## 📄 requirements.txt

This file lists all packages your project needs.

**Create one:**
```bash
pip freeze > requirements.txt
```

**Install from one:**
```bash
pip install -r requirements.txt
```

**Example requirements.txt:**
```
fastapi==0.104.1
uvicorn==0.24.0
sqlalchemy==2.0.23
```

---

## 🛑 COMMON ISSUES

### "python: command not found" (Mac)
**Use `python3` instead of `python`:**
```bash
python3 --version
pip3 install flask
```

### "pip: command not found"
```bash
python3 -m pip install flask
```

### "Permission denied"
**Never use `sudo pip install`!** Use virtual environment instead.

### "ModuleNotFoundError"
Activate your virtual environment:
```bash
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate    # Windows
```

---

## 🔄 MANAGING PYTHON VERSIONS (Optional)

Use **pyenv** to manage multiple Python versions:

**Mac:**
```bash
brew install pyenv
pyenv install 3.11.0
pyenv global 3.11.0
```

**Linux:**
```bash
curl https://pyenv.run | bash
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Python 3 installed
- [ ] `python3 --version` works
- [ ] `pip3 --version` works
- [ ] Know how to create virtual environment
- [ ] Know how to activate/deactivate venv
- [ ] Know basic pip commands

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
