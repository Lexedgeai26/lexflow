---
name: stack-react-laravel
description: Create a full-stack application with Laravel (PHP) backend and React frontend. Beginner-friendly with Inertia.js integration.
---

# React + Laravel - Complete Beginner Guide

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

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Backend** | Laravel (PHP) | API, database, authentication |
| **Frontend** | React + Inertia.js | Interactive user interface |
| **Database** | MySQL (default) | Data storage |

**Two Integration Modes:**

1. **Inertia.js (Recommended)** - React components render inside Laravel, no separate frontend server
2. **API Mode** - Laravel as pure API, React as separate app

This guide uses **Inertia.js** for simpler development.

**Why Laravel + React?**
- ✅ Laravel is extremely beginner-friendly
- ✅ Built-in authentication, database migrations, queues
- ✅ React for modern, interactive UIs
- ✅ Huge ecosystem and community

---

## 📋 PREREQUISITES CHECKLIST

### 1. PHP 8.2+
```bash
php --version
```

**If NOT installed:**
- **Mac**: `brew install php`
- **Windows**: Download from https://windows.php.net/download/

### 2. Composer (PHP package manager)
```bash
composer --version
```

**If NOT installed:**
- Download from https://getcomposer.org/download/

### 3. Node.js 18+
```bash
node --version
```

**If NOT installed:** https://nodejs.org/

### 4. Docker Desktop (for database)
```bash
docker --version
```

**If NOT installed:** https://www.docker.com/products/docker-desktop/

---

## 🗄️ DATABASE SELECTION

**Which database would you like to use?**

| Database | Recommendation |
|----------|----------------|
| **MySQL** ⭐ | **RECOMMENDED** - Default for Laravel |
| PostgreSQL | Good alternative |
| SQLite | Local development only |

👉 **Use the `db-mysql` skill to set up MySQL.**

---

## 🚀 EXECUTION PIPELINE

### Step 1: Create Laravel Project [AUTO]

```bash
echo "🏗️ [1/10] Creating Laravel project..."
composer create-project laravel/laravel my-laravel-react-app
cd my-laravel-react-app
```

**What does this do?**
- Downloads Laravel framework
- Sets up folder structure
- Installs PHP dependencies

---

### Step 2: Setup Database [AUTO]

**Run the `db-mysql` skill** or use Laravel Sail (Docker):

```bash
echo "🐬 [2/10] Starting Laravel Sail (Docker)..."
php artisan sail:install --with=mysql
./vendor/bin/sail up -d
```

**Or use existing MySQL**, update `.env`:
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel_app
DB_USERNAME=admin
DB_PASSWORD=password123
```

---

### Step 3: Install Inertia.js [AUTO]

Inertia.js connects Laravel and React seamlessly:

```bash
echo "🔗 [3/10] Installing Inertia.js..."
composer require inertiajs/inertia-laravel
php artisan inertia:middleware
```

**Add middleware to `app/Http/Kernel.php`:**
```php
// In the 'web' middleware group:
\App\Http\Middleware\HandleInertiaRequests::class,
```

---

### Step 4: Install React [AUTO]

```bash
echo "⚛️ [4/10] Installing React..."
npm install @inertiajs/react react react-dom
npm install -D @vitejs/plugin-react
```

**Update `vite.config.js`:**
```javascript
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
```

---

### Step 5: Create React Entry Point [AUTO]

**Rename `resources/js/app.js` to `resources/js/app.jsx`:**

```jsx
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
```

---

### Step 6: Create Blade Layout [AUTO]

**Create `resources/views/app.blade.php`:**

```html
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Laravel + React</title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
</head>
<body>
    @inertia
</body>
</html>
```

---

### Step 7: Create First React Page [AUTO]

**Create `resources/js/Pages/Home.jsx`:**

```jsx
import React from 'react';

export default function Home({ message }) {
    return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>🚀 Laravel + React App</h1>
            <p>Message from Laravel: <strong>{message}</strong></p>
        </div>
    );
}
```

---

### Step 8: Create Laravel Route [AUTO]

**Update `routes/web.php`:**

```php
<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'message' => 'Hello from Laravel! 👋'
    ]);
});
```

---

### Step 9: Run Migrations [AUTO]

```bash
echo "🗄️ [9/10] Running database migrations..."
php artisan migrate
```

---

### Step 10: Start Development Servers [AUTO]

**Terminal 1 - Laravel:**
```bash
php artisan serve
```

**Terminal 2 - Vite (for React hot reload):**
```bash
npm run dev
```

**Open:** http://localhost:8000

---

## 📂 FINAL PROJECT STRUCTURE

```
my-laravel-react-app/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php
│   └── Models/
├── resources/
│   ├── js/
│   │   ├── app.jsx
│   │   └── Pages/
│   │       └── Home.jsx
│   └── views/
│       └── app.blade.php
├── routes/
│   └── web.php
├── .env
├── composer.json
├── package.json
└── vite.config.js
```

---

## ✅ COMPLETION CHECKLIST

- [ ] PHP 8.2+ installed
- [ ] Composer installed
- [ ] Node.js 18+ installed
- [ ] Laravel project created
- [ ] MySQL running (Sail or Docker)
- [ ] Inertia.js installed
- [ ] React configured
- [ ] First page renders at http://localhost:8000

---

## 🎁 BONUS: Add Authentication

Laravel Breeze provides pre-built auth with React:

```bash
composer require laravel/breeze --dev
php artisan breeze:install react
php artisan migrate
npm install
npm run dev
```

This adds:
- ✅ Login page
- ✅ Registration page
- ✅ Password reset
- ✅ Email verification

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
