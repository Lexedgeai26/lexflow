# Bootstrap Frontend Skill - Quick Start Guide

Get started with the Bootstrap Frontend skill in minutes!

## 🚀 Quick Start

### Step 1: Activate the Skill

Simply mention the skill in your request:
```
"Use the bootstrap-frontend skill to create a dashboard"
```

### Step 2: The Skill Will Automatically:

1. ✅ Create project structure
2. ✅ Generate HTML files with Bootstrap 5
3. ✅ Add custom theme CSS
4. ✅ Include sample data and interactivity
5. ✅ Create responsive layouts
6. ✅ Add documentation

## 📋 Common Use Cases

### 1. Create a Complete Dashboard

**Request:**
```
Create a Bootstrap dashboard with sidebar, stats cards, and a data table
```

**What you get:**
- Responsive sidebar navigation
- Top navbar with search and notifications
- 4 stat cards with icons
- Charts (revenue, traffic)
- Data table with recent items
- Fully functional and responsive

### 2. Build an Authentication Page

**Request:**
```
Create a Bootstrap login page with social login options
```

**What you get:**
- Modern login form with floating labels
- Password visibility toggle
- Social login buttons (Google, GitHub)
- Form validation
- Responsive design
- Gradient background

### 3. Generate a Data Table

**Request:**
```
Create a Bootstrap data table with sorting and filtering
```

**What you get:**
- Search functionality
- Column sorting
- Filters (role, status, etc.)
- Pagination
- Bulk actions
- Export functionality
- Row actions (edit, delete)

### 4. Create a Landing Page

**Request:**
```
Create a Bootstrap landing page with hero section and features
```

**What you get:**
- Hero section with CTA
- Features grid
- Testimonials
- Pricing tables
- Contact form
- Footer

## 🎨 Customization Examples

### Change Colors

Edit the generated `css/theme.css`:
```css
:root {
    --bs-primary: #your-brand-color;
    --bs-success: #your-success-color;
}
```

### Change Font

Add Google Font and update theme:
```html
<!-- In HTML head -->
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
```

```css
/* In theme.css */
:root {
    --font-family-sans-serif: 'Poppins', sans-serif;
}
```

### Adjust Layout

Modify sidebar width or topbar height:
```css
:root {
    --sidebar-width: 280px;
    --topbar-height: 70px;
}
```

## 📁 Generated Project Structure

```
your-project/
├── index.html              # Main entry point
├── css/
│   ├── theme.css          # Custom theme variables
│   └── custom.css         # Additional custom styles
├── js/
│   └── main.js            # JavaScript functionality
├── pages/
│   ├── dashboard/
│   │   └── index.html     # Dashboard page
│   ├── auth/
│   │   ├── login.html     # Login page
│   │   └── register.html  # Registration page
│   └── errors/
│       └── 404.html       # Error page
├── components/            # Reusable components
├── data/
│   └── sample-data.json   # Sample data
└── README.md              # Documentation
```

## 🎯 Template Catalog

### Available Templates

1. **Dashboard** - Admin panel with charts and tables
2. **Login/Register** - Authentication pages
3. **Data Table** - Advanced table with sorting/filtering
4. **Forms** - Multi-step forms with validation
5. **Profile** - User profile page
6. **Settings** - Settings page with tabs
7. **Landing Page** - Marketing page
8. **Error Pages** - 404, 500, maintenance

### Component Library

- Navigation (navbar, sidebar, breadcrumbs)
- Cards (stat cards, info cards, product cards)
- Forms (inputs, selects, checkboxes, file uploads)
- Tables (basic, striped, hoverable, responsive)
- Modals (confirmation, forms, info)
- Alerts & Notifications
- Buttons & Button Groups
- Badges & Tags
- Progress Bars
- Spinners & Loaders

## 💡 Pro Tips

### 1. Start with a Template
```
"Create a Bootstrap dashboard based on the reference template"
```

### 2. Combine Components
```
"Add a data table to my existing dashboard"
```

### 3. Request Specific Features
```
"Create a login page with two-factor authentication UI"
```

### 4. Ask for Customization
```
"Change the dashboard color scheme to blue and orange"
```

### 5. Request Responsive Behavior
```
"Make the sidebar collapsible on mobile"
```

## 🔧 Common Modifications

### Add a New Page

1. Create HTML file in `pages/` directory
2. Copy header/footer from existing page
3. Add your content
4. Link from navigation

### Add a New Component

1. Create component in `components/` directory
2. Include Bootstrap classes
3. Add custom styles if needed
4. Import in your page

### Integrate with Backend

Replace sample data with API calls:
```javascript
// Before (sample data)
const users = sampleData.users;

// After (API call)
fetch('/api/users')
    .then(res => res.json())
    .then(users => {
        // Render users
    });
```

## 📱 Testing Responsiveness

### Browser DevTools
1. Open Chrome/Firefox DevTools (F12)
2. Click device toolbar icon
3. Test different screen sizes

### Common Breakpoints to Test
- Mobile: 375px (iPhone)
- Tablet: 768px (iPad)
- Desktop: 1920px (Full HD)

## 🐛 Troubleshooting

### Issue: Styles not loading
**Solution:** Check CDN links in HTML head

### Issue: JavaScript not working
**Solution:** Ensure Bootstrap JS is loaded before custom JS

### Issue: Layout breaks on mobile
**Solution:** Check responsive classes (d-none, d-md-block, etc.)

### Issue: Icons not showing
**Solution:** Verify Bootstrap Icons CDN link

## 📚 Learning Resources

### Bootstrap 5
- [Official Documentation](https://getbootstrap.com/docs/5.3/)
- [Examples](https://getbootstrap.com/docs/5.3/examples/)
- [Cheat Sheet](https://bootstrap-cheatsheet.themeselection.com/)

### Bootstrap Icons
- [Icon Library](https://icons.getbootstrap.com/)
- [Usage Guide](https://icons.getbootstrap.com/#usage)

### Chart.js
- [Documentation](https://www.chartjs.org/docs/latest/)
- [Examples](https://www.chartjs.org/docs/latest/samples/)

## 🎓 Next Steps

### Beginner
1. Start with a simple login page
2. Customize colors and fonts
3. Add your own content

### Intermediate
1. Create a full dashboard
2. Add data tables with filtering
3. Integrate with backend API

### Advanced
1. Build multi-page application
2. Add authentication flow
3. Implement real-time updates
4. Add advanced charts and visualizations

## 🤝 Getting Help

### Common Requests

**"Show me the dashboard template"**
- Opens the reference dashboard.html

**"How do I change the primary color?"**
- Explains CSS variable customization

**"Add a user table to my dashboard"**
- Generates table component with sample data

**"Make the sidebar collapsible"**
- Adds toggle functionality

**"Create a multi-step form"**
- Generates form with step indicators

## ✅ Checklist for Production

Before deploying your Bootstrap frontend:

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
- [ ] Minify CSS/JS (optional)

## 🚀 Deployment Options

### Static Hosting (Recommended)
- **Netlify**: Drag & drop deployment
- **Vercel**: Git-based deployment
- **GitHub Pages**: Free hosting
- **AWS S3**: Scalable hosting

### With Backend
- **Node.js**: Express server
- **Python**: Flask/Django
- **PHP**: Laravel
- **Ruby**: Rails

## 📞 Support

For issues or questions:
1. Check the reference templates
2. Review Bootstrap 5 documentation
3. Ask for specific modifications

---

**Ready to build amazing Bootstrap frontends? Let's get started!**

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**
