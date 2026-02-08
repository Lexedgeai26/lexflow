---
name: setup-vscode
description: Install and configure VS Code for development. Complete beginner guide with essential extensions and settings.
---

# VS Code Setup - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never used a code editor before. That's okay.
2. **EXPLAIN EVERYTHING**: Every button, every setting, every extension.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is VS Code?

**VS Code (Visual Studio Code)** is a free code editor made by Microsoft.

**Think of it like Microsoft Word, but for code:**
- Syntax highlighting (code is colorful and easier to read)
- Auto-complete (suggests code as you type)
- Error detection (catches mistakes)
- Built-in terminal (run commands without leaving)

**Why VS Code?**
- ✅ **Free** and open-source
- ✅ **#1 most popular** code editor
- ✅ **Huge extension marketplace** - add any feature you need
- ✅ **Works with every language** - JavaScript, Python, Go, etc.

---

## 📥 INSTALLATION

### Mac

1. Go to https://code.visualstudio.com
2. Click **"Download for Mac"**
3. Open the downloaded `.zip` file
4. Drag **Visual Studio Code** to **Applications**
5. Open VS Code from Applications

**Add to Terminal (recommended):**
1. Open VS Code
2. Press **Cmd + Shift + P** (Command Palette)
3. Type `shell command`
4. Select **"Shell Command: Install 'code' command in PATH"**

Now you can open folders with:
```bash
code my-project
```

### Windows

1. Go to https://code.visualstudio.com
2. Click **"Download for Windows"**
3. Run the installer
4. ✅ Check **"Add to PATH"** when prompted
5. Click through installer

Open from Command Prompt:
```bash
code my-project
```

### Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install code

# Or download .deb from website
```

---

## 🎨 INTERFACE TOUR

When you open VS Code, you'll see:

```
┌─────────────────────────────────────────────────────────┐
│  Menu Bar (File, Edit, View...)                        │
├──────────┬────────────────────────────┬────────────────┤
│          │                            │                │
│ Sidebar  │     Editor Area            │  (Optional)    │
│          │                            │   Sidebar 2    │
│ -Explorer│     Your code goes here    │                │
│ -Search  │                            │                │
│ -Git     │                            │                │
│ -Debug   │                            │                │
│ -Ext.    │                            │                │
├──────────┴────────────────────────────┴────────────────┤
│  Terminal / Output / Problems                          │
└─────────────────────────────────────────────────────────┘
```

---

## ⌨️ ESSENTIAL KEYBOARD SHORTCUTS

### Most Used

| Shortcut | Mac | Windows | What it does |
|----------|-----|---------|--------------|
| Command Palette | Cmd+Shift+P | Ctrl+Shift+P | Access any command |
| Quick Open | Cmd+P | Ctrl+P | Open any file |
| Toggle Terminal | Cmd+` | Ctrl+` | Show/hide terminal |
| Save | Cmd+S | Ctrl+S | Save file |
| Find | Cmd+F | Ctrl+F | Search in file |
| Find in Files | Cmd+Shift+F | Ctrl+Shift+F | Search project |
| Go to Definition | F12 | F12 | Jump to function |
| Rename Symbol | F2 | F2 | Rename everywhere |

### Multi-cursor (Power User)

| Shortcut | Mac | Windows | What it does |
|----------|-----|---------|--------------|
| Add cursor | Cmd+D | Ctrl+D | Select next occurrence |
| Cursor column | Opt+Click | Alt+Click | Multiple cursors |
| Select line | Cmd+L | Ctrl+L | Select entire line |

---

## 🧩 ESSENTIAL EXTENSIONS

Open Extensions: Click the square icon in sidebar (or Cmd+Shift+X)

### For Everyone

1. **Prettier** - Auto-formats your code
   - Search: `esbenp.prettier-vscode`
   - After install, enable "Format on Save"

2. **GitLens** - See who wrote each line
   - Search: `GitLens`

3. **Error Lens** - Shows errors inline
   - Search: `Error Lens`

### For JavaScript/TypeScript

4. **ESLint** - Find JavaScript errors
   - Search: `ESLint`

5. **Auto Rename Tag** - Edit HTML tags together
   - Search: `Auto Rename Tag`

### For Python

6. **Python** - Official Python support
   - Search: `ms-python.python`

7. **Pylance** - Better Python IntelliSense
   - Search: `Pylance`

### For Web Development

8. **Live Server** - Auto-refresh browser
   - Search: `Live Server`

9. **REST Client** - Test APIs in VS Code
   - Search: `REST Client`

---

## ⚙️ RECOMMENDED SETTINGS

Press Cmd+, (Mac) or Ctrl+, (Windows) to open Settings.

### Search and enable these:

| Setting | Value | Why |
|---------|-------|-----|
| Format On Save | ✅ | Auto-format when saving |
| Auto Save | afterDelay | Never lose work |
| Tab Size | 2 | Smaller indentation |
| Word Wrap | on | No horizontal scrolling |

### settings.json (Advanced)

Press Cmd+Shift+P → "Preferences: Open Settings (JSON)"

```json
{
    "editor.formatOnSave": true,
    "editor.tabSize": 2,
    "editor.wordWrap": "on",
    "editor.fontSize": 14,
    "editor.minimap.enabled": false,
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 1000,
    "terminal.integrated.fontSize": 13,
    "workbench.colorTheme": "One Dark Pro"
}
```

---

## 🎨 THEMES

Make VS Code look nice!

1. Press Cmd+K Cmd+T (or Ctrl+K Ctrl+T)
2. Browse themes
3. Click to preview, Enter to apply

**Popular themes:**
- **One Dark Pro** - Dark, popular
- **Dracula** - Dark, purple accent
- **Night Owl** - Dark, blue accent
- **GitHub Theme** - Light/Dark, clean

---

## 📁 WORKSPACE TIPS

### Open a Folder (Not Files)

Always open entire project folders:
```bash
code my-project
```

Or: File → Open Folder

### Workspace Settings

Create `.vscode/settings.json` in your project for project-specific settings:

```json
{
    "editor.tabSize": 4,
    "[python]": {
        "editor.tabSize": 4
    }
}
```

---

## 🖥️ INTEGRATED TERMINAL

Toggle with: Cmd+` (backtick)

**Features:**
- Multiple terminals (click + button)
- Split terminals
- Different shells (bash, zsh, PowerShell)

**Tip:** All commands in this guide can be run in VS Code's terminal!

---

## 🛑 COMMON ISSUES

### "VS Code asks which Python"
Click "Select Interpreter" and choose your virtual environment.

### "Extensions not working"
Restart VS Code: Cmd+Shift+P → "Reload Window"

### "Format on Save not working"
1. Check Prettier is installed
2. Set default formatter: Settings → "Default Formatter" → Prettier

---

## ✅ COMPLETION CHECKLIST

- [ ] VS Code installed
- [ ] `code` command works in terminal
- [ ] Installed Prettier extension
- [ ] Installed GitLens extension
- [ ] Enabled "Format On Save"
- [ ] Chose a theme you like
- [ ] Know keyboard shortcuts (Cmd+P, Cmd+Shift+P, Cmd+`)

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
