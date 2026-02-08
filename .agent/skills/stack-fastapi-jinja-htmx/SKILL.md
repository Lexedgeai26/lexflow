---
name: stack-fastapi-jinja-htmx
description: Create a full-stack Python application with FastAPI, Jinja2 templates, and HTMX for interactivity. No JavaScript framework needed. Beginner-friendly.
---

# FastAPI + Jinja2 + HTMX - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You know nothing about web development. That's okay.
2. **EXPLAIN EVERYTHING**: Every command, every term, every concept.
3. **COPY-PASTE READY**: All commands work as-is. Just copy and run.
4. **FAIL-SAFE**: Verification steps after every action.
5. **RECOMMEND, DON'T ENFORCE**: We suggest best practices but allow flexibility.

---

## 🎯 What is This Stack?

This is a **server-rendered** web application:

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend** | FastAPI (Python) | Handles requests and renders HTML |
| **Templates** | Jinja2 | HTML templates with Python data |
| **Interactivity** | HTMX | Makes pages dynamic without JavaScript |

**Why this stack?**
- ✅ No JavaScript frameworks to learn
- ✅ Pure Python - one language for everything
- ✅ Fast development - no build step needed
- ✅ Great for dashboards, admin panels, internal tools

**HTMX Magic:**
Instead of writing JavaScript, you add special attributes to HTML:
```html
<button hx-get="/api/data" hx-target="#result">Load Data</button>
<div id="result"></div>
```
When clicked, HTMX fetches `/api/data` and puts the response in `#result`. No JS needed!

---

## 📋 PREREQUISITES CHECKLIST

### 1. Python 3.11+
```bash
python3 --version
```
**If NOT installed:** https://www.python.org/downloads/

### 2. Docker Desktop (for database)
```bash
docker --version
```
**If NOT installed:** https://www.docker.com/products/docker-desktop/

---

## 🗄️ DATABASE SELECTION

**Which database would you like to use?**

| Database | Recommendation |
|----------|----------------|
| **PostgreSQL** ⭐ | **RECOMMENDED** - Best for most projects |
| SQLite | Simple local development only |
| MySQL | If migrating from WordPress/Laravel |

👉 **Use the `db-postgresql` skill to set up your database.**

---

## 🚀 EXECUTION PIPELINE

### Step 1: Create Project [AUTO]

```bash
echo "📁 [1/8] Creating project..."
mkdir my-htmx-app
cd my-htmx-app
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

---

### Step 2: Install Dependencies [AUTO]

```bash
echo "📦 [2/8] Installing dependencies..."
pip install fastapi uvicorn jinja2 python-multipart sqlalchemy psycopg2-binary alembic python-dotenv
```

---

### Step 3: Create Project Structure [AUTO]

```bash
echo "📂 [3/8] Creating folders..."
mkdir app
mkdir app/routers app/models app/templates app/templates/components app/static app/static/css
touch app/__init__.py app/main.py app/database.py
touch .env
```

---

### Step 4: Create Core Files [AUTO]

**Create `.env`:**
```bash
DATABASE_URL=postgresql://admin:password123@localhost:5432/myapp_db
SECRET_KEY=your-secret-key-change-this
```

**Create `app/main.py`:**
```python
from fastapi import FastAPI, Request, Form
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

app = FastAPI(title="HTMX App")

# Setup templates and static files
templates = Jinja2Templates(directory="app/templates")
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Sample data
todos = [
    {"id": 1, "task": "Learn FastAPI", "done": True},
    {"id": 2, "task": "Learn HTMX", "done": False},
    {"id": 3, "task": "Build something awesome", "done": False},
]

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {
        "request": request,
        "todos": todos
    })

@app.post("/todos", response_class=HTMLResponse)
async def add_todo(request: Request, task: str = Form(...)):
    new_id = max(t["id"] for t in todos) + 1 if todos else 1
    todos.append({"id": new_id, "task": task, "done": False})
    return templates.TemplateResponse("components/todo_list.html", {
        "request": request,
        "todos": todos
    })

@app.delete("/todos/{todo_id}", response_class=HTMLResponse)
async def delete_todo(request: Request, todo_id: int):
    global todos
    todos = [t for t in todos if t["id"] != todo_id]
    return templates.TemplateResponse("components/todo_list.html", {
        "request": request,
        "todos": todos
    })

@app.put("/todos/{todo_id}/toggle", response_class=HTMLResponse)
async def toggle_todo(request: Request, todo_id: int):
    for todo in todos:
        if todo["id"] == todo_id:
            todo["done"] = not todo["done"]
    return templates.TemplateResponse("components/todo_list.html", {
        "request": request,
        "todos": todos
    })
```

---

### Step 5: Create Templates [AUTO]

**Create `app/templates/base.html`:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}My HTMX App{% endblock %}</title>
    <script src="https://unpkg.com/htmx.org@1.9.10"></script>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div class="container">
        {% block content %}{% endblock %}
    </div>
</body>
</html>
```

**Create `app/templates/index.html`:**
```html
{% extends "base.html" %}

{% block title %}Todo App{% endblock %}

{% block content %}
<h1>📝 Todo List</h1>

<form hx-post="/todos" hx-target="#todo-list" hx-swap="innerHTML">
    <input type="text" name="task" placeholder="Add a new task..." required>
    <button type="submit">Add</button>
</form>

<div id="todo-list">
    {% include "components/todo_list.html" %}
</div>
{% endblock %}
```

**Create `app/templates/components/todo_list.html`:**
```html
<ul class="todo-list">
    {% for todo in todos %}
    <li class="{% if todo.done %}done{% endif %}">
        <span 
            hx-put="/todos/{{ todo.id }}/toggle" 
            hx-target="#todo-list"
            style="cursor: pointer;"
        >
            {% if todo.done %}✅{% else %}⬜{% endif %} {{ todo.task }}
        </span>
        <button 
            hx-delete="/todos/{{ todo.id }}" 
            hx-target="#todo-list"
            class="delete-btn"
        >
            ❌
        </button>
    </li>
    {% endfor %}
</ul>
```

**Create `app/static/css/style.css`:**
```css
* { box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f5f5;
    margin: 0;
    padding: 2rem;
}
.container {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
h1 { margin-top: 0; }
form {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
}
input[type="text"] {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
}
button {
    padding: 0.75rem 1.5rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
}
button:hover { background: #0056b3; }
.todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
}
.todo-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    border-bottom: 1px solid #eee;
}
.todo-list li.done span {
    text-decoration: line-through;
    color: #888;
}
.delete-btn {
    background: transparent;
    padding: 0.25rem;
    font-size: 0.8rem;
}
```

---

### Step 6: Run the Application [AUTO]

```bash
echo "🚀 [6/8] Starting server..."
uvicorn app.main:app --reload --port 8000
```

**Open:** http://localhost:8000

---

### Step 7: Verify [AUTO]

You should see a Todo app where:
- ✅ You can add new tasks
- ✅ Click a task to mark it done
- ✅ Delete tasks with the ❌ button
- ✅ **No page reloads!** (HTMX handles it)

---

## 📂 FINAL PROJECT STRUCTURE

```
my-htmx-app/
├── venv/
├── .env
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── database.py
│   ├── routers/
│   ├── models/
│   ├── templates/
│   │   ├── base.html
│   │   ├── index.html
│   │   └── components/
│   │       └── todo_list.html
│   └── static/
│       └── css/
│           └── style.css
└── requirements.txt
```

---

## ✅ COMPLETION CHECKLIST

- [ ] Python 3.11+ installed
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] Templates created
- [ ] Server running on http://localhost:8000
- [ ] Todo app works without page reloads

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
