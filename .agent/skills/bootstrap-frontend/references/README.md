# Bootstrap Frontend Skill - Reference Templates

This directory contains production-ready Bootstrap 5 templates and components that can be used as references when generating frontend applications.

## 📁 Directory Structure

```
references/
├── templates/          # Complete page templates
│   ├── dashboard.html  # Admin dashboard with charts and stats
│   ├── login.html      # Modern login page
│   ├── datatable.html  # Advanced data table with sorting/filtering
│   └── ...
├── styles/             # CSS files
│   ├── theme.css       # Custom theme variables and overrides
│   └── components.css  # Component-specific styles
└── components/         # Reusable component snippets
    ├── navigation/     # Navbar, sidebar, breadcrumbs
    ├── cards/          # Various card designs
    ├── forms/          # Form components
    └── modals/         # Modal dialogs
```

## 🎨 Available Templates

### 1. Dashboard (`dashboard.html`)
A comprehensive admin dashboard featuring:
- **Sidebar navigation** with collapsible menu
- **Top navbar** with search, notifications, and user menu
- **Stat cards** with icons and trend indicators
- **Charts** using Chart.js (revenue line chart, traffic doughnut chart)
- **Data table** with recent orders
- **Fully responsive** design

**Use cases:**
- Admin panels
- Analytics dashboards
- Business intelligence tools
- SaaS application backends

### 2. Login Page (`login.html`)
Modern authentication page with:
- **Floating labels** for clean design
- **Password toggle** visibility
- **Social login** buttons (Google, GitHub)
- **Remember me** checkbox
- **Forgot password** link
- **Form validation** with visual feedback
- **Gradient background** for visual appeal

**Use cases:**
- User authentication
- Admin login
- Customer portals
- Member areas

### 3. Data Table (`datatable.html`)
Advanced table component featuring:
- **Search functionality** across all columns
- **Column sorting** (ascending/descending)
- **Filters** by role and status
- **Pagination** with page numbers
- **Bulk actions** (select multiple rows)
- **Row actions** (edit, delete)
- **Export functionality**
- **Responsive design**

**Use cases:**
- User management
- Product listings
- Order management
- Any data-heavy interface

## 🎨 Styles

### Theme CSS (`theme.css`)
Comprehensive theme file with:
- **CSS Custom Properties** for easy customization
- **Color palette** (primary, secondary, success, etc.)
- **Typography** system with Inter font
- **Spacing** utilities
- **Shadow** definitions
- **Border radius** utilities
- **Component overrides** for Bootstrap
- **Responsive** breakpoints
- **Print styles**

**Key Features:**
```css
:root {
    --bs-primary: #4e73df;
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    --border-radius-lg: 0.5rem;
}
```

## 🚀 How to Use

### Option 1: Direct Copy
Copy any template file and customize:
```bash
cp references/templates/dashboard.html ./my-dashboard.html
```

### Option 2: Extract Components
Extract specific components from templates:
- Sidebar navigation from `dashboard.html`
- Login form from `login.html`
- Table component from `datatable.html`

### Option 3: Use as Reference
Study the templates to understand:
- Bootstrap 5 best practices
- Component composition
- Responsive design patterns
- JavaScript interactions

## 🎯 Customization Guide

### Colors
Edit CSS variables in `theme.css`:
```css
:root {
    --bs-primary: #your-color;
    --bs-success: #your-color;
}
```

### Typography
Change font family:
```css
:root {
    --font-family-sans-serif: 'Your Font', sans-serif;
}
```

Add Google Fonts in HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;600&display=swap" rel="stylesheet">
```

### Layout
Adjust spacing and sizing:
```css
:root {
    --sidebar-width: 280px;
    --topbar-height: 70px;
}
```

## 📦 Dependencies

All templates use CDN links for:
- **Bootstrap 5.3.2** - CSS framework
- **Bootstrap Icons 1.11.1** - Icon library
- **Chart.js 4.4.0** - Charts (dashboard only)
- **Google Fonts** - Inter font family

No build process required - just open in a browser!

## 🎨 Color Palette

### Primary Colors
- **Primary**: `#4e73df` - Main brand color
- **Secondary**: `#858796` - Supporting color
- **Success**: `#1cc88a` - Success states
- **Info**: `#36b9cc` - Informational
- **Warning**: `#f6c23e` - Warning states
- **Danger**: `#e74a3b` - Error states

### Gradients
- **Primary Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
- **Success Gradient**: `linear-gradient(135deg, #11998e 0%, #38ef7d 100%)`
- **Info Gradient**: `linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)`

## 📱 Responsive Breakpoints

Templates are responsive across all Bootstrap breakpoints:
- **xs**: < 576px (Mobile)
- **sm**: ≥ 576px (Mobile landscape)
- **md**: ≥ 768px (Tablet)
- **lg**: ≥ 992px (Desktop)
- **xl**: ≥ 1200px (Large desktop)
- **xxl**: ≥ 1400px (Extra large)

## ♿ Accessibility

All templates follow accessibility best practices:
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- Sufficient color contrast
- Focus indicators
- Screen reader friendly

## 🌐 Browser Support

Templates are tested and work on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

These templates are part of the ASG AI S2PROD skill system and can be used freely in your projects.

## 🤝 Contributing

To add new templates:
1. Create the template file in `references/templates/`
2. Follow existing naming conventions
3. Include comprehensive comments
4. Test across all breakpoints
5. Update this README

## 💡 Tips

1. **Start Simple**: Begin with a basic template and add features
2. **Customize Colors**: Change the color palette to match your brand
3. **Add Animations**: Enhance with CSS transitions and animations
4. **Optimize Images**: Use appropriate image formats and sizes
5. **Test Responsiveness**: Always test on multiple devices
6. **Validate HTML**: Use W3C validator for standards compliance

## 🔗 Related Resources

- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Chart.js Documentation](https://www.chartjs.org/)
- [Google Fonts](https://fonts.google.com/)

---

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**
