# Bootstrap Frontend Skill

Generate production-ready frontend applications with Bootstrap 5, complete with comprehensive sample styles, templates, and reusable components.

## 🎯 Overview

This skill enables rapid development of modern, responsive web frontends using Bootstrap 5. It includes:

- ✅ **Complete Page Templates** - Dashboard, login, data tables, forms, and more
- ✅ **Custom Theme System** - Professional color palettes and typography
- ✅ **Component Library** - Pre-built, reusable UI components
- ✅ **Sample Data** - Realistic mock data for demos
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Production Ready** - Clean, documented, deployment-ready code

## 📚 Documentation

- **[SKILL.md](SKILL.md)** - Complete skill documentation and execution pipeline
- **[QUICK_START.md](QUICK_START.md)** - Get started in minutes
- **[references/README.md](references/README.md)** - Template and component documentation

## 🚀 Quick Start

### Basic Usage

Simply activate the skill in your request:

```
"Use bootstrap-frontend to create a dashboard with sidebar and data table"
```

The skill will automatically:
1. Create project structure
2. Generate HTML files with Bootstrap 5
3. Add custom theme CSS
4. Include sample data
5. Create responsive layouts

### Example Requests

**Create a Dashboard:**
```
"Create a Bootstrap admin dashboard with stats cards, charts, and a user table"
```

**Create a Login Page:**
```
"Create a modern Bootstrap login page with social login options"
```

**Create a Data Table:**
```
"Create a Bootstrap data table with sorting, filtering, and pagination"
```

**Create a Landing Page:**
```
"Create a Bootstrap landing page with hero section and feature cards"
```

## 📁 Project Structure

When you use this skill, it generates:

```
your-project/
├── index.html              # Main entry point
├── css/
│   ├── theme.css          # Custom theme variables
│   └── custom.css         # Additional styles
├── js/
│   └── main.js            # JavaScript functionality
├── pages/
│   ├── dashboard/         # Dashboard pages
│   ├── auth/              # Login/register pages
│   └── errors/            # Error pages
├── components/            # Reusable components
├── data/
│   └── sample-data.json   # Sample data
└── README.md              # Documentation
```

## 🎨 Available Templates

### 1. Dashboard (`dashboard.html`)
- Sidebar navigation
- Top navbar with search and notifications
- Stat cards with icons and trends
- Charts (revenue, traffic)
- Data tables
- Fully responsive

### 2. Login Page (`login.html`)
- Modern floating labels
- Password visibility toggle
- Social login buttons
- Form validation
- Responsive design

### 3. Data Table (`datatable.html`)
- Search and filtering
- Column sorting
- Pagination
- Bulk actions
- Row actions (edit, delete)
- Export functionality

### 4. Component Library (`components.html`)
- All Bootstrap 5 components
- Code examples
- Interactive demos
- Copy-paste ready

## 🎨 Features

### Custom Theme System

Professional color palette and typography:
```css
:root {
    --bs-primary: #4e73df;
    --bs-success: #1cc88a;
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Responsive Design

Mobile-first approach with Bootstrap breakpoints:
- Mobile: < 576px
- Tablet: ≥ 768px
- Desktop: ≥ 992px
- Large: ≥ 1200px

### Component Library

Pre-built components:
- Navigation (navbar, sidebar, breadcrumbs)
- Cards (stat cards, info cards, product cards)
- Forms (inputs, selects, validation)
- Tables (basic, striped, hoverable, responsive)
- Modals (confirmation, forms, info)
- Alerts & Notifications
- Buttons & Badges
- Progress Bars & Spinners

## 🛠️ Customization

### Change Colors

Edit `css/theme.css`:
```css
:root {
    --bs-primary: #your-brand-color;
}
```

### Change Font

Update theme and add Google Font:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

```css
:root {
    --font-family-sans-serif: 'Your Font', sans-serif;
}
```

### Modify Layout

Adjust spacing and sizing:
```css
:root {
    --sidebar-width: 280px;
    --topbar-height: 70px;
}
```

## 📦 Dependencies

All templates use CDN links (no build required):
- Bootstrap 5.3.2
- Bootstrap Icons 1.11.1
- Chart.js 4.4.0 (for charts)
- Google Fonts (Inter)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## ♿ Accessibility

All templates follow WCAG 2.1 AA standards:
- Semantic HTML5
- ARIA labels
- Keyboard navigation
- Color contrast
- Focus indicators

## 🚀 Deployment

### Static Hosting
- Netlify
- Vercel
- GitHub Pages
- AWS S3

### With Backend
- Node.js (Express)
- Python (Flask/Django)
- PHP (Laravel)
- Ruby (Rails)

## 📖 Examples

### Example 1: Admin Dashboard

**Request:**
```
"Create a Bootstrap admin dashboard for a SaaS application"
```

**Generated:**
- Dashboard with sidebar navigation
- 4 stat cards (users, revenue, orders, conversion)
- Revenue chart (line chart)
- Traffic sources chart (doughnut chart)
- Recent orders table
- Responsive design

### Example 2: User Management

**Request:**
```
"Create a user management page with Bootstrap data table"
```

**Generated:**
- Search functionality
- Role and status filters
- Sortable columns
- Pagination
- Bulk actions (delete, export)
- Edit/delete buttons per row

### Example 3: Authentication

**Request:**
```
"Create Bootstrap login and registration pages"
```

**Generated:**
- Login page with social options
- Registration page with validation
- Forgot password page
- Responsive design
- Form validation

## 🎓 Learning Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Chart.js Documentation](https://www.chartjs.org/)

## 💡 Pro Tips

1. **Start Simple** - Begin with a template and customize
2. **Use Components** - Leverage pre-built components
3. **Test Responsive** - Check all breakpoints
4. **Customize Theme** - Match your brand colors
5. **Add Interactivity** - Enhance with JavaScript

## 🤝 Support

For help:
1. Check [QUICK_START.md](QUICK_START.md)
2. Review reference templates
3. Consult Bootstrap documentation
4. Ask for specific modifications

## 📝 License

Part of ASG AI S2PROD skill system. Free to use in your projects.

## 🔗 Related Skills

- **app-init** - Initialize full-stack applications
- **doc2prod** - Documentation to production
- **secure-llm-proxy** - LLM proxy integration

---

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

**10× Faster Development with AI**

Copyright © 2024 AIShift. All rights reserved.
