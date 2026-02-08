---
name: tailwind-frontend
description: Generate production-ready frontend applications with Tailwind CSS and React/TypeScript, including modern UI components, animations, and responsive designs. Uses real-world patterns from professional legal tech applications.
---

# Tailwind Frontend Generator

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

**Generate beautiful, production-ready frontend applications with Tailwind CSS, complete with modern components, animations, and professional designs**

---

## 💡 THE MOOT POINT (MANDATORY PHILOSOPHY)

**THE MAIN JOB OF THIS SKILL IS COMPLETE TAILWIND FRONTEND GENERATION.**

1.  **MODERN TAILWIND CSS**: Always use Tailwind CSS 3+ with utility-first approach
2.  **REACT + TYPESCRIPT**: Generate type-safe React components with TypeScript
3.  **PROFESSIONAL DESIGNS**: Create polished, production-ready UIs, not basic demos
4.  **ANIMATIONS & TRANSITIONS**: Include smooth animations and micro-interactions
5.  **RESPONSIVE FIRST**: Every component must work perfectly on all devices
6.  **REAL-WORLD PATTERNS**: Use proven patterns from production applications

---

## Behavior

When activated, this skill will:
1. ✅ Analyze project requirements
2. ✅ Generate Vite + React + TypeScript project structure
3. ✅ Create Tailwind CSS configuration
4. ✅ Generate professional UI components
5. ✅ Add animations and transitions
6. ✅ Include sample data and state management
7. ✅ Create responsive layouts
8. ✅ Add documentation and usage examples

**DO NOT ask "what would you like to do next?" - EXECUTE AUTOMATICALLY**

---

## ⚠️ CRITICAL RULES

### Rule 1: ALWAYS USE TAILWIND CSS 3+

- ✅ Use Tailwind CSS 3+ utility classes
- ✅ Use Tailwind's built-in animations
- ✅ Leverage arbitrary values when needed
- ❌ NEVER use inline styles (use Tailwind utilities)
- ❌ NEVER mix with other CSS frameworks

### Rule 2: PROFESSIONAL DESIGN PATTERNS

Every project MUST include:
- Modern color palettes (slate, blue, indigo, etc.)
- Custom fonts (Inter, Playfair Display, etc.)
- Smooth transitions and animations
- Rounded corners and shadows
- Hover states and active states
- Loading states and skeletons
- Empty states with illustrations

### Rule 3: COMPONENT LIBRARY

Generate reusable components:
- **Authentication**: Login, register, forgot password
- **Dashboard**: Stats cards, charts, tables
- **Forms**: Inputs, selects, textareas with validation
- **Navigation**: Navbar, sidebar, breadcrumbs
- **Cards**: Info cards, stat cards, product cards
- **Modals**: Dialogs, confirmations, forms
- **Buttons**: Primary, secondary, outline, icon
- **Alerts**: Success, error, warning, info
- **Tables**: Data tables with sorting/filtering
- **Chat**: Chat widgets, message bubbles

### Rule 4: TYPESCRIPT TYPES

- ✅ Define interfaces for all data structures
- ✅ Use proper React types (FC, useState, etc.)
- ✅ Type all props and state
- ✅ Export types for reuse
- ❌ NEVER use `any` type

### Rule 5: ANIMATIONS & MICRO-INTERACTIONS

- ✅ Add hover effects to interactive elements
- ✅ Use transitions for state changes
- ✅ Include loading spinners
- ✅ Add slide-in/fade-in animations
- ✅ Implement smooth scrolling
- ❌ NEVER create static, lifeless UIs

---

## EXECUTION PIPELINE

### Phase 1: Project Setup [AUTO]

**Step 1.1: Create Project Structure**
```bash
echo "📁 [1/8] Creating Vite + React + TypeScript project..."

# Create Vite project
npm create vite@latest my-app -- --template react-ts
cd my-app

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install dependencies
npm install lucide-react

echo "✅ Project structure created"
```

**Step 1.2: Configure Tailwind CSS**

Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      animation: {
        'fadeIn': 'fadeIn 0.5s ease-in-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'slideDown': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

**Step 1.3: Update index.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply font-sans bg-slate-50 text-slate-900;
  }
}

@layer components {
  .btn-primary {
    @apply bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95;
  }
  
  .btn-secondary {
    @apply bg-slate-900 hover:bg-black text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg active:scale-95;
  }
  
  .card {
    @apply bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all;
  }
  
  .input-field {
    @apply w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all;
  }
}

@layer utilities {
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    @apply bg-slate-100 rounded-full;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    @apply bg-slate-300 rounded-full hover:bg-slate-400;
  }
}
```

---

### Phase 2: Type Definitions [AUTO]

**Step 2.1: Create types.ts**
```typescript
// Common Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
}

export interface Case {
  id: string;
  title: string;
  clientName: string;
  opposingParty?: string;
  caseNumber?: string;
  jurisdiction?: string;
  contextText?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AppState {
  user: User | null;
  cases: Case[];
  activeCaseId: string | null;
  isProcessing: boolean;
}

export interface FormField {
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: string[];
}
```

---

### Phase 3: Component Library [AUTO]

**Step 3.1: Authentication Components**

Create `src/components/LoginPage.tsx`:
```typescript
import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, Gavel } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [view, setView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full animate-slideUp">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg mb-4">
            <Gavel className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            Your App <span className="text-blue-600">AI</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1 text-center">
            Professional Dashboard Platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {view === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
            {view === 'login' ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
            {view === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="text-center text-sm text-slate-500 mt-6">
            {view === 'login' ? (
              <>
                New user?{' '}
                <button
                  type="button"
                  onClick={() => setView('register')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Create Account
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
```

**Step 3.2: Dashboard Components**

Create `src/components/StatCard.tsx`:
```typescript
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'amber' | 'red';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'text-blue-600 bg-blue-50',
    green: 'text-green-600 bg-green-50',
    amber: 'text-amber-600 bg-amber-50',
    red: 'text-red-600 bg-red-50',
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">
            {title}
          </div>
          <div className="text-3xl font-bold text-slate-900">{value}</div>
        </div>
        <div className={`p-3 rounded-2xl ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && (
        <div className="flex items-center gap-2 text-sm">
          <span
            className={`font-bold ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
          <span className="text-slate-500">vs last month</span>
        </div>
      )}
    </div>
  );
};
```

---

### Phase 4: Main Application [AUTO]

**Step 4.1: Create App.tsx**

This will be a comprehensive application with routing, state management, and all components integrated.

---

### Phase 5: Utilities & Helpers [AUTO]

**Step 5.1: Create utils.ts**
```typescript
// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date
export const formatDate = (date: string | Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Copy to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};
```

---

## Template Catalog

### Included Templates

1. **Login/Register** - Modern authentication with animations
2. **Dashboard** - Stats cards, charts, tables
3. **Data Table** - Sortable, filterable table with pagination
4. **Forms** - Multi-step forms with validation
5. **Settings** - User profile and preferences
6. **Chat Widget** - Floating chat assistant
7. **Empty States** - Beautiful empty state designs
8. **Loading States** - Skeletons and spinners

---

## Design Patterns from LexReply

### Color Palette
- **Primary**: `blue-600` (#4F46E5)
- **Secondary**: `slate-900` (#0F172A)
- **Success**: `green-600` (#16A34A)
- **Warning**: `amber-600` (#D97706)
- **Danger**: `red-600` (#DC2626)
- **Background**: `slate-50` (#F8FAFC)

### Typography
- **Sans**: Inter (body text)
- **Serif**: Playfair Display (headings)
- **Mono**: System monospace (code)

### Spacing
- **Cards**: `p-8` padding, `rounded-3xl` corners
- **Buttons**: `py-3 px-6` padding, `rounded-xl` corners
- **Inputs**: `py-3 px-4` padding, `rounded-xl` corners

### Animations
- **Fade In**: `animate-fadeIn`
- **Slide Up**: `animate-slideUp`
- **Hover**: `hover:-translate-y-1`
- **Active**: `active:scale-95`

---

## Best Practices

1. **Use Utility Classes** - Prefer Tailwind utilities over custom CSS
2. **Component Composition** - Build complex UIs from simple components
3. **Responsive Design** - Use `md:`, `lg:` prefixes for breakpoints
4. **Dark Mode Ready** - Use `dark:` prefix for dark mode support
5. **Accessibility** - Include ARIA labels and keyboard navigation
6. **Performance** - Lazy load components and images
7. **Type Safety** - Always use TypeScript interfaces

---

## Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Static Hosting
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development with AI

Copyright © 2024 AIShift. All rights reserved.
