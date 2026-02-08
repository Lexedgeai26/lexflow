# Tailwind Frontend Skill

Generate production-ready frontend applications with Tailwind CSS, React, and TypeScript. Includes modern UI components, animations, and professional designs based on real-world applications.

## 🎯 Overview

This skill enables rapid development of modern, beautiful web frontends using Tailwind CSS with React and TypeScript. It includes:

- ✅ **React + TypeScript** - Type-safe component development
- ✅ **Tailwind CSS 3+** - Utility-first CSS framework
- ✅ **Professional Designs** - Polished, production-ready UIs
- ✅ **Animations** - Smooth transitions and micro-interactions
- ✅ **Responsive** - Mobile-first, works on all devices
- ✅ **Real-World Patterns** - Based on production applications like LexReply

## 📚 Documentation

- **[SKILL.md](SKILL.md)** - Complete skill documentation
- **[QUICK_START.md](QUICK_START.md)** - Get started in minutes
- **[references/](references/)** - Templates and examples

## 🚀 Quick Start

### Basic Usage

```
"Use tailwind-frontend to create a dashboard with React and TypeScript"
```

The skill will automatically:
1. Create Vite + React + TypeScript project
2. Configure Tailwind CSS
3. Generate professional components
4. Add animations and transitions
5. Include sample data and state management

### Example Requests

**Create a Dashboard:**
```
"Create a Tailwind dashboard with stat cards and data table"
```

**Create Authentication:**
```
"Create login and register pages with Tailwind CSS"
```

**Create a Chat Widget:**
```
"Create a floating chat widget with Tailwind CSS"
```

## 🎨 Design System

### Color Palette
- **Primary**: `blue-600` - Main brand color
- **Secondary**: `slate-900` - Supporting color
- **Success**: `green-600` - Success states
- **Warning**: `amber-600` - Warning states
- **Danger**: `red-600` - Error states
- **Background**: `slate-50` - Page background

### Typography
- **Sans**: Inter - Body text
- **Serif**: Playfair Display - Headings
- **Mono**: System monospace - Code

### Spacing
- **Cards**: `p-8`, `rounded-3xl`
- **Buttons**: `py-3 px-6`, `rounded-xl`
- **Inputs**: `py-3 px-4`, `rounded-xl`

### Animations
- **Fade In**: `animate-fadeIn`
- **Slide Up**: `animate-slideUp`
- **Hover**: `hover:-translate-y-1`
- **Active**: `active:scale-95`

## 📦 Available Templates

### 1. Login/Register Page
- Modern authentication UI
- Floating labels
- Form validation
- Responsive design
- Smooth animations

### 2. Dashboard
- Stat cards with icons
- Data tables
- Charts integration
- Responsive grid layout

### 3. Settings Page
- User profile form
- Multi-column layout
- Checkbox groups
- Save functionality

### 4. Chat Widget
- Floating button
- Expandable chat window
- Message bubbles
- Loading states

### 5. Empty States
- Beautiful illustrations
- Call-to-action buttons
- Helpful messaging

## 🛠️ Tech Stack

- **Vite** - Build tool
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 3** - Styling
- **Lucide React** - Icons

## 🎨 Component Patterns

### Button Variants
```tsx
// Primary
<button className="btn-primary">Click Me</button>

// Secondary
<button className="btn-secondary">Click Me</button>

// Outline
<button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
  Click Me
</button>
```

### Card Component
```tsx
<div className="card">
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-slate-500">Card content goes here</p>
</div>
```

### Input Field
```tsx
<input
  type="text"
  className="input-field"
  placeholder="Enter text..."
/>
```

## 📱 Responsive Design

All components are mobile-first and responsive:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Responsive grid */}
</div>
```

## ♿ Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators
- Color contrast compliance

## 🚀 Deployment

### Development
```bash
npm install
npm run dev
```

### Production
```bash
npm run build
npm run preview
```

### Hosting
- Vercel (recommended)
- Netlify
- GitHub Pages
- AWS Amplify

## 💡 Best Practices

1. **Use Utility Classes** - Prefer Tailwind utilities over custom CSS
2. **Component Composition** - Build complex UIs from simple components
3. **Responsive First** - Use `md:`, `lg:` prefixes
4. **Type Safety** - Always use TypeScript interfaces
5. **Accessibility** - Include ARIA labels
6. **Performance** - Lazy load components

## 🎓 Learning Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Lucide Icons](https://lucide.dev/)

## 📝 License

Part of ASG AI S2PROD skill system. Free to use in your projects.

---

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

Copyright © 2024 AIShift. All rights reserved.
