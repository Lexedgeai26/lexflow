# Tailwind Frontend Skill - Quick Start Guide

Get started with the Tailwind Frontend skill in minutes!

## 🚀 Quick Start

### Step 1: Activate the Skill

Simply mention the skill in your request:
```
"Use tailwind-frontend to create a React dashboard with TypeScript"
```

### Step 2: The Skill Will Automatically:

1. ✅ Create Vite + React + TypeScript project
2. ✅ Configure Tailwind CSS with custom theme
3. ✅ Generate professional components
4. ✅ Add animations and transitions
5. ✅ Include TypeScript types
6. ✅ Create sample data and state management

## 📋 Common Use Cases

### 1. Create a Complete Dashboard

**Request:**
```
Create a Tailwind dashboard with sidebar, stat cards, and data table
```

**What you get:**
- Responsive sidebar navigation
- Top navbar with user menu
- 4 stat cards with icons and trends
- Data table with sorting
- Professional animations
- TypeScript types

### 2. Build Authentication Pages

**Request:**
```
Create login and register pages with Tailwind CSS
```

**What you get:**
- Modern login form
- Registration form
- Password visibility toggle
- Form validation
- Responsive design
- Smooth animations

### 3. Generate a Chat Widget

**Request:**
```
Create a floating chat widget with Tailwind CSS
```

**What you get:**
- Floating button
- Expandable chat window
- Message bubbles
- Loading states
- Minimize/maximize
- Responsive design

### 4. Create a Settings Page

**Request:**
```
Create a user settings page with Tailwind CSS
```

**What you get:**
- Profile form
- Multi-column layout
- Checkbox groups
- Save functionality
- Responsive design

## 🎨 Customization Examples

### Change Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Change Fonts

Add Google Font in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
```

Update `tailwind.config.js`:
```javascript
fontFamily: {
  sans: ['Poppins', 'sans-serif'],
}
```

### Add Custom Animations

In `tailwind.config.js`:
```javascript
animation: {
  'bounce-slow': 'bounce 3s infinite',
}
```

## 📁 Generated Project Structure

```
your-project/
├── src/
│   ├── components/
│   │   ├── LoginPage.tsx
│   │   ├── Dashboard.tsx
│   │   ├── StatCard.tsx
│   │   └── ChatWidget.tsx
│   ├── types.ts
│   ├── utils.ts
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.js
├── package.json
└── README.md
```

## 🎯 Component Examples

### Stat Card
```tsx
<StatCard
  title="Total Users"
  value="1,250"
  icon={Users}
  trend={{ value: 12.5, isPositive: true }}
  color="blue"
/>
```

### Button
```tsx
<button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg hover:shadow-blue-500/20 active:scale-95">
  Click Me
</button>
```

### Input Field
```tsx
<div className="relative">
  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
  <input
    type="email"
    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="you@company.com"
  />
</div>
```

### Card
```tsx
<div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-slate-500">Card content</p>
</div>
```

## 💡 Pro Tips

### 1. Use Tailwind Play for Prototyping
```
"Create a prototype in Tailwind Play"
```

### 2. Combine Components
```
"Add a chat widget to my existing dashboard"
```

### 3. Request Specific Features
```
"Create a multi-step form with progress indicator"
```

### 4. Ask for Customization
```
"Change the color scheme to purple and orange"
```

### 5. Request Animations
```
"Add slide-in animations to the cards"
```

## 🔧 Common Modifications

### Add a New Component

1. Create file in `src/components/`
2. Use TypeScript interface for props
3. Use Tailwind utility classes
4. Export component

Example:
```tsx
interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
    </div>
  );
};
```

### Add State Management

```tsx
import { useState } from 'react';

const [data, setData] = useState<MyType[]>([]);
```

### Add API Integration

```tsx
useEffect(() => {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => setData(data));
}, []);
```

## 📱 Testing Responsiveness

### Browser DevTools
1. Open DevTools (F12)
2. Click device toolbar
3. Test different screen sizes

### Common Breakpoints
- **Mobile**: 375px (iPhone)
- **Tablet**: 768px (iPad)
- **Desktop**: 1920px (Full HD)

### Tailwind Breakpoints
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

## 🐛 Troubleshooting

### Issue: Tailwind classes not working
**Solution:** Check `tailwind.config.js` content paths

### Issue: Icons not showing
**Solution:** Install `lucide-react`: `npm install lucide-react`

### Issue: TypeScript errors
**Solution:** Check type definitions in `types.ts`

### Issue: Build fails
**Solution:** Run `npm install` to install dependencies

## 📚 Learning Resources

### Tailwind CSS
- [Official Documentation](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Tailwind Play](https://play.tailwindcss.com/)

### React + TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

### Icons
- [Lucide Icons](https://lucide.dev/)
- [Heroicons](https://heroicons.com/)

## 🎓 Next Steps

### Beginner
1. Start with login page
2. Customize colors
3. Add your own content

### Intermediate
1. Create full dashboard
2. Add data tables
3. Integrate with backend API

### Advanced
1. Build multi-page application
2. Add authentication flow
3. Implement real-time updates
4. Add advanced animations

## 🤝 Getting Help

### Common Requests

**"Show me the login template"**
- Opens reference LoginPage.tsx

**"How do I change colors?"**
- Explains Tailwind config customization

**"Add a sidebar to my dashboard"**
- Generates sidebar component

**"Make it responsive"**
- Adds responsive classes

**"Add animations"**
- Includes Tailwind animations

## ✅ Checklist for Production

Before deploying:

- [ ] Customize colors to match brand
- [ ] Replace sample data with real data
- [ ] Test on all major browsers
- [ ] Test on mobile devices
- [ ] Optimize images
- [ ] Add meta tags for SEO
- [ ] Set up analytics
- [ ] Configure error pages
- [ ] Add loading states
- [ ] Implement form validation
- [ ] Test accessibility
- [ ] Run production build

## 🚀 Deployment Options

### Static Hosting (Recommended)
- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop
- **GitHub Pages**: `npm run build` + push
- **AWS Amplify**: Connect repo

### With Backend
- **Node.js**: Express server
- **Python**: FastAPI
- **Go**: Gin framework

## 📞 Support

For issues or questions:
1. Check the reference templates
2. Review Tailwind documentation
3. Ask for specific modifications

---

**Ready to build amazing Tailwind frontends? Let's get started!**

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**
