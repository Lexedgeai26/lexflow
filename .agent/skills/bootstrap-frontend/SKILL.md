---
name: bootstrap-frontend
description: Generate production-ready frontend applications with Bootstrap 5, including comprehensive sample styles, templates, and components. Creates modern, responsive UIs with pre-built layouts, forms, navigation, and interactive elements.
---

# Bootstrap Frontend Generator

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

**Generate beautiful, production-ready frontend applications with Bootstrap 5, complete with sample styles, templates, and reusable components**

---

## 💡 THE MOOT POINT (MANDATORY PHILOSOPHY)

**THE MAIN JOB OF THIS SKILL IS COMPLETE FRONTEND GENERATION.**

1.  **MODERN BOOTSTRAP 5**: Always use the latest Bootstrap 5 with modern features (offcanvas, floating labels, etc.)
2.  **COMPREHENSIVE TEMPLATES**: Generate complete page templates, not just components
3.  **SAMPLE STYLES**: Include custom CSS that enhances Bootstrap's defaults
4.  **RESPONSIVE FIRST**: Every template must be mobile-responsive and tested
5.  **ACCESSIBILITY**: Follow WCAG 2.1 AA standards for all components
6.  **PRODUCTION READY**: Code must be deployment-ready, not just demos

---

## Behavior

When activated, this skill will:
1. ✅ Analyze project requirements
2. ✅ Generate Bootstrap 5 project structure
3. ✅ Create custom theme and styles
4. ✅ Generate comprehensive component library
5. ✅ Create page templates (dashboard, forms, tables, etc.)
6. ✅ Add sample data and interactive demos
7. ✅ Include documentation and usage examples
8. ✅ Test responsiveness across breakpoints

**DO NOT ask "what would you like to do next?" - EXECUTE AUTOMATICALLY**

---

## ⚠️ CRITICAL RULES

### Rule 1: ALWAYS USE BOOTSTRAP 5

- ✅ Use Bootstrap 5.3+ (latest stable)
- ✅ Include Bootstrap Icons
- ✅ Use modern Bootstrap features (offcanvas, floating labels, etc.)
- ❌ NEVER use Bootstrap 3 or 4 syntax
- ❌ NEVER mix Bootstrap with other CSS frameworks

### Rule 2: CUSTOM THEME IS MANDATORY

Every project MUST include:
- Custom color palette (primary, secondary, success, etc.)
- Custom typography (Google Fonts integration)
- Custom spacing utilities
- Custom component styles
- Dark mode support (optional but recommended)

### Rule 3: COMPREHENSIVE TEMPLATES

Generate ALL of these templates:
- **Dashboard**: Admin dashboard with charts, stats, tables
- **Forms**: Multi-step forms, validation, file uploads
- **Tables**: Data tables with sorting, filtering, pagination
- **Authentication**: Login, register, forgot password
- **Profile**: User profile with edit capabilities
- **Settings**: Application settings page
- **Error Pages**: 404, 500, maintenance
- **Landing Page**: Marketing/product landing page

### Rule 4: COMPONENT LIBRARY

Create reusable components:
- Navigation (navbar, sidebar, breadcrumbs)
- Cards (info cards, stat cards, product cards)
- Modals (confirm, form, info)
- Alerts and notifications
- Buttons and button groups
- Form controls (inputs, selects, checkboxes)
- Tables (basic, striped, hoverable, responsive)
- Lists (ordered, unordered, custom)
- Badges and tags
- Progress bars and spinners

### Rule 5: SAMPLE DATA INTEGRATION

- ✅ Include realistic sample data
- ✅ Use JSON files for mock data
- ✅ Add JavaScript to populate templates
- ✅ Make demos interactive (filters, sorting, etc.)
- ❌ NEVER leave templates empty

---

## EXECUTION PIPELINE

### Phase 1: Project Setup [AUTO]

**Step 1.1: Create Project Structure**
```bash
echo "📁 [1/8] Creating project structure..."

# Create directory structure
mkdir -p frontend/{css,js,img,fonts,data,pages,components,layouts}
mkdir -p frontend/pages/{dashboard,auth,profile,settings,errors}
mkdir -p frontend/components/{navigation,cards,forms,tables,modals}
mkdir -p frontend/layouts/{default,auth,dashboard}

echo "✅ Project structure created"
```

**Step 1.2: Generate index.html (Main Entry)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bootstrap Frontend - Home</title>
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/theme.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <i class="bi bi-bootstrap-fill"></i> Bootstrap App
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="pages/dashboard/index.html">Dashboard</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="pages/auth/login.html">Login</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section bg-gradient text-white py-5">
        <div class="container py-5">
            <div class="row align-items-center">
                <div class="col-lg-6">
                    <h1 class="display-4 fw-bold mb-4">Welcome to Bootstrap Frontend</h1>
                    <p class="lead mb-4">A comprehensive collection of Bootstrap 5 templates, components, and styles ready for production use.</p>
                    <div class="d-flex gap-3">
                        <a href="pages/dashboard/index.html" class="btn btn-light btn-lg">
                            <i class="bi bi-speedometer2"></i> View Dashboard
                        </a>
                        <a href="#features" class="btn btn-outline-light btn-lg">
                            <i class="bi bi-info-circle"></i> Learn More
                        </a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <img src="https://via.placeholder.com/600x400/4e73df/ffffff?text=Hero+Image" class="img-fluid rounded shadow-lg" alt="Hero">
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-5">
        <div class="container">
            <h2 class="text-center mb-5">Features</h2>
            <div class="row g-4">
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm">
                        <div class="card-body text-center">
                            <div class="feature-icon bg-primary text-white rounded-circle mx-auto mb-3">
                                <i class="bi bi-palette-fill"></i>
                            </div>
                            <h5 class="card-title">Custom Theming</h5>
                            <p class="card-text">Fully customizable color schemes and typography to match your brand.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm">
                        <div class="card-body text-center">
                            <div class="feature-icon bg-success text-white rounded-circle mx-auto mb-3">
                                <i class="bi bi-phone-fill"></i>
                            </div>
                            <h5 class="card-title">Fully Responsive</h5>
                            <p class="card-text">Mobile-first design that works perfectly on all devices.</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card h-100 border-0 shadow-sm">
                        <div class="card-body text-center">
                            <div class="feature-icon bg-info text-white rounded-circle mx-auto mb-3">
                                <i class="bi bi-box-seam-fill"></i>
                            </div>
                            <h5 class="card-title">Rich Components</h5>
                            <p class="card-text">Comprehensive library of pre-built, reusable components.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-dark text-white py-4 mt-5">
        <div class="container text-center">
            <p class="mb-0">&copy; 2024 Bootstrap Frontend. Built with <i class="bi bi-heart-fill text-danger"></i> using Bootstrap 5</p>
        </div>
    </footer>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="js/main.js"></script>
</body>
</html>
```

---

### Phase 2: Theme & Styles [AUTO]

**Step 2.1: Create Custom Theme (css/theme.css)**
```css
/* ============================================
   BOOTSTRAP FRONTEND - CUSTOM THEME
   ============================================ */

:root {
    /* Primary Colors */
    --bs-primary: #4e73df;
    --bs-primary-rgb: 78, 115, 223;
    --bs-secondary: #858796;
    --bs-success: #1cc88a;
    --bs-info: #36b9cc;
    --bs-warning: #f6c23e;
    --bs-danger: #e74a3b;
    --bs-light: #f8f9fc;
    --bs-dark: #5a5c69;

    /* Gradients */
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --gradient-success: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    --gradient-info: linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%);
    --gradient-warning: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

    /* Typography */
    --font-family-sans-serif: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    
    /* Spacing */
    --section-padding: 4rem;
    
    /* Shadows */
    --shadow-sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    --shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    --shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);
    
    /* Border Radius */
    --border-radius: 0.375rem;
    --border-radius-lg: 0.5rem;
    --border-radius-xl: 1rem;
}

/* Global Styles */
body {
    font-family: var(--font-family-sans-serif);
    color: var(--bs-dark);
    background-color: #f8f9fc;
}

/* Gradient Backgrounds */
.bg-gradient {
    background: var(--gradient-primary);
}

.bg-gradient-success {
    background: var(--gradient-success);
}

.bg-gradient-info {
    background: var(--gradient-info);
}

/* Custom Buttons */
.btn {
    font-weight: 500;
    border-radius: var(--border-radius);
    padding: 0.625rem 1.25rem;
    transition: all 0.3s ease;
}

.btn-lg {
    padding: 0.875rem 1.75rem;
    font-size: 1.125rem;
}

.btn-primary {
    background: var(--bs-primary);
    border-color: var(--bs-primary);
}

.btn-primary:hover {
    background: #2e59d9;
    border-color: #2653d4;
    transform: translateY(-2px);
    box-shadow: var(--shadow);
}

/* Custom Cards */
.card {
    border: none;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
}

.card:hover {
    box-shadow: var(--shadow);
    transform: translateY(-5px);
}

.card-header {
    background-color: transparent;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1.25rem 1.5rem;
    font-weight: 600;
}

/* Feature Icons */
.feature-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
}

/* Navbar Enhancements */
.navbar-brand {
    font-weight: 700;
    font-size: 1.5rem;
}

.nav-link {
    font-weight: 500;
    transition: all 0.3s ease;
}

.nav-link:hover {
    transform: translateY(-2px);
}

/* Form Controls */
.form-control,
.form-select {
    border-radius: var(--border-radius);
    border: 1px solid #d1d3e2;
    padding: 0.625rem 0.875rem;
}

.form-control:focus,
.form-select:focus {
    border-color: var(--bs-primary);
    box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
}

/* Tables */
.table {
    border-radius: var(--border-radius-lg);
    overflow: hidden;
}

.table thead th {
    background-color: var(--bs-light);
    border-bottom: 2px solid var(--bs-primary);
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.5px;
}

/* Badges */
.badge {
    padding: 0.375rem 0.75rem;
    font-weight: 500;
    border-radius: var(--border-radius);
}

/* Utilities */
.shadow-sm {
    box-shadow: var(--shadow-sm) !important;
}

.shadow {
    box-shadow: var(--shadow) !important;
}

.shadow-lg {
    box-shadow: var(--shadow-lg) !important;
}

/* Responsive Typography */
@media (max-width: 768px) {
    .display-4 {
        font-size: 2.5rem;
    }
    
    .lead {
        font-size: 1.125rem;
    }
}
```

**Step 2.2: Create Additional Custom Styles (css/custom.css)**
```css
/* ============================================
   CUSTOM COMPONENT STYLES
   ============================================ */

/* Stat Cards */
.stat-card {
    border-left: 4px solid var(--bs-primary);
}

.stat-card.success {
    border-left-color: var(--bs-success);
}

.stat-card.warning {
    border-left-color: var(--bs-warning);
}

.stat-card.danger {
    border-left-color: var(--bs-danger);
}

.stat-card .stat-icon {
    font-size: 2rem;
    opacity: 0.3;
}

/* Sidebar */
.sidebar {
    min-height: 100vh;
    background: linear-gradient(180deg, #4e73df 0%, #224abe 100%);
    box-shadow: var(--shadow);
}

.sidebar .nav-link {
    color: rgba(255, 255, 255, 0.8);
    padding: 0.875rem 1.5rem;
    border-radius: var(--border-radius);
    margin: 0.25rem 0.75rem;
    transition: all 0.3s ease;
}

.sidebar .nav-link:hover,
.sidebar .nav-link.active {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
}

.sidebar .nav-link i {
    margin-right: 0.75rem;
    width: 20px;
}

/* Progress Bars */
.progress {
    height: 1.25rem;
    border-radius: var(--border-radius);
}

.progress-bar {
    border-radius: var(--border-radius);
}

/* Timeline */
.timeline {
    position: relative;
    padding: 0;
    list-style: none;
}

.timeline:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--bs-light);
    left: 20px;
}

.timeline-item {
    position: relative;
    padding-left: 60px;
    margin-bottom: 2rem;
}

.timeline-item .timeline-badge {
    position: absolute;
    left: 10px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--bs-primary);
    border: 3px solid #fff;
    box-shadow: var(--shadow-sm);
}

/* Data Tables */
.datatable-wrapper {
    background: #fff;
    border-radius: var(--border-radius-lg);
    padding: 1.5rem;
    box-shadow: var(--shadow-sm);
}

.datatable-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.datatable-search {
    max-width: 300px;
}

/* Loading States */
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.5s ease-in-out;
}

/* Print Styles */
@media print {
    .sidebar,
    .navbar,
    .btn,
    footer {
        display: none !important;
    }
    
    .card {
        box-shadow: none !important;
        border: 1px solid #ddd !important;
    }
}
```

---

### Phase 3: Component Library [AUTO]

**Step 3.1: Create Navigation Component (components/navigation/navbar.html)**
```html
<!-- Top Navigation Bar -->
<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container-fluid">
        <button class="btn btn-link d-lg-none" id="sidebarToggle">
            <i class="bi bi-list fs-4"></i>
        </button>
        
        <form class="d-none d-md-flex ms-3 flex-grow-1" style="max-width: 400px;">
            <div class="input-group">
                <span class="input-group-text bg-light border-end-0">
                    <i class="bi bi-search"></i>
                </span>
                <input type="search" class="form-control bg-light border-start-0" placeholder="Search...">
            </div>
        </form>

        <ul class="navbar-nav ms-auto align-items-center">
            <!-- Notifications -->
            <li class="nav-item dropdown">
                <a class="nav-link position-relative" href="#" data-bs-toggle="dropdown">
                    <i class="bi bi-bell fs-5"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                    </span>
                </a>
                <ul class="dropdown-menu dropdown-menu-end shadow" style="min-width: 300px;">
                    <li class="dropdown-header">Notifications</li>
                    <li><hr class="dropdown-divider"></li>
                    <li>
                        <a class="dropdown-item" href="#">
                            <div class="d-flex align-items-start">
                                <i class="bi bi-info-circle text-primary me-3 fs-5"></i>
                                <div>
                                    <div class="fw-semibold">New update available</div>
                                    <small class="text-muted">2 minutes ago</small>
                                </div>
                            </div>
                        </a>
                    </li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-center small" href="#">View all notifications</a></li>
                </ul>
            </li>

            <!-- User Menu -->
            <li class="nav-item dropdown ms-3">
                <a class="nav-link d-flex align-items-center" href="#" data-bs-toggle="dropdown">
                    <img src="https://via.placeholder.com/40" class="rounded-circle me-2" alt="User">
                    <span class="d-none d-md-inline">John Doe</span>
                    <i class="bi bi-chevron-down ms-2"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-end shadow">
                    <li><a class="dropdown-item" href="#"><i class="bi bi-person me-2"></i> Profile</a></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-gear me-2"></i> Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#"><i class="bi bi-box-arrow-right me-2"></i> Logout</a></li>
                </ul>
            </li>
        </ul>
    </div>
</nav>
```

**Step 3.2: Create Sidebar Component (components/navigation/sidebar.html)**
```html
<!-- Sidebar Navigation -->
<div class="sidebar text-white" id="sidebar">
    <div class="p-4">
        <h4 class="mb-0">
            <i class="bi bi-bootstrap-fill"></i> Dashboard
        </h4>
    </div>
    
    <nav class="nav flex-column">
        <a class="nav-link active" href="index.html">
            <i class="bi bi-speedometer2"></i> Dashboard
        </a>
        <a class="nav-link" href="users.html">
            <i class="bi bi-people"></i> Users
        </a>
        <a class="nav-link" href="products.html">
            <i class="bi bi-box-seam"></i> Products
        </a>
        <a class="nav-link" href="orders.html">
            <i class="bi bi-cart"></i> Orders
        </a>
        <a class="nav-link" href="analytics.html">
            <i class="bi bi-graph-up"></i> Analytics
        </a>
        <a class="nav-link" href="settings.html">
            <i class="bi bi-gear"></i> Settings
        </a>
    </nav>
    
    <div class="mt-auto p-4">
        <div class="card bg-white bg-opacity-10 border-0">
            <div class="card-body">
                <h6 class="card-title">Need Help?</h6>
                <p class="card-text small">Check our documentation</p>
                <a href="#" class="btn btn-light btn-sm">Learn More</a>
            </div>
        </div>
    </div>
</div>
```

---

### Phase 4: Page Templates [AUTO]

**Step 4.1: Create Dashboard Page (pages/dashboard/index.html)**

This will be a comprehensive dashboard with stats, charts, and tables.

**Step 4.2: Create Login Page (pages/auth/login.html)**

**Step 4.3: Create Data Table Page (pages/dashboard/users.html)**

**Step 4.4: Create Form Page (pages/dashboard/forms.html)**

---

### Phase 5: JavaScript Functionality [AUTO]

**Step 5.1: Create Main JavaScript (js/main.js)**
```javascript
/* ============================================
   BOOTSTRAP FRONTEND - MAIN JAVASCRIPT
   ============================================ */

// Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    // Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Bootstrap popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('show');
        });
    }

    // Auto-hide alerts
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });
});

// Utility Functions
const Utils = {
    // Format currency
    formatCurrency: function(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    },

    // Format date
    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(date));
    },

    // Show toast notification
    showToast: function(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        if (!toastContainer) {
            const container = document.createElement('div');
            container.id = 'toastContainer';
            container.className = 'toast-container position-fixed top-0 end-0 p-3';
            document.body.appendChild(container);
        }

        const toastHTML = `
            <div class="toast align-items-center text-white bg-${type} border-0" role="alert">
                <div class="d-flex">
                    <div class="toast-body">${message}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        `;

        const toastElement = document.createElement('div');
        toastElement.innerHTML = toastHTML;
        document.getElementById('toastContainer').appendChild(toastElement.firstElementChild);

        const toast = new bootstrap.Toast(toastElement.firstElementChild);
        toast.show();
    },

    // Confirm dialog
    confirm: function(message, callback) {
        if (confirm(message)) {
            callback();
        }
    }
};

// Export for use in other scripts
window.Utils = Utils;
```

**Step 5.2: Create Sample Data (data/sample-data.json)**
```json
{
    "users": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "role": "Admin",
            "status": "Active",
            "avatar": "https://via.placeholder.com/40",
            "joinDate": "2024-01-15"
        },
        {
            "id": 2,
            "name": "Jane Smith",
            "email": "jane@example.com",
            "role": "User",
            "status": "Active",
            "avatar": "https://via.placeholder.com/40",
            "joinDate": "2024-02-20"
        }
    ],
    "stats": {
        "totalUsers": 1250,
        "revenue": 45678.90,
        "orders": 342,
        "growth": 12.5
    }
}
```

---

### Phase 6: Documentation [AUTO]

**Step 6.1: Create README.md**
```markdown
# Bootstrap Frontend

A comprehensive Bootstrap 5 frontend template with custom theming, components, and page templates.

## Features

- ✅ Bootstrap 5.3+ with modern components
- ✅ Custom theme and color palette
- ✅ Responsive design (mobile-first)
- ✅ Pre-built page templates
- ✅ Reusable component library
- ✅ Sample data integration
- ✅ Interactive demos

## Quick Start

1. Open `index.html` in your browser
2. Explore the different pages in the `pages/` directory
3. Customize the theme in `css/theme.css`
4. Add your own content and data

## Project Structure

```
frontend/
├── css/
│   ├── theme.css          # Custom theme variables
│   └── custom.css         # Additional custom styles
├── js/
│   └── main.js            # Main JavaScript file
├── pages/
│   ├── dashboard/         # Dashboard pages
│   ├── auth/              # Authentication pages
│   └── errors/            # Error pages
├── components/            # Reusable components
├── data/                  # Sample JSON data
└── index.html             # Main entry point
```

## Customization

### Colors
Edit `css/theme.css` to change the color palette:
```css
:root {
    --bs-primary: #4e73df;
    --bs-success: #1cc88a;
    /* ... */
}
```

### Typography
Change the font family in `css/theme.css`:
```css
--font-family-sans-serif: 'Inter', sans-serif;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use in your projects!
```

---

## Template Catalog

### Included Templates

1. **Landing Page** (`index.html`)
   - Hero section with CTA
   - Features showcase
   - Responsive navigation

2. **Dashboard** (`pages/dashboard/index.html`)
   - Stat cards
   - Charts and graphs
   - Recent activity
   - Data tables

3. **Login/Register** (`pages/auth/`)
   - Modern form design
   - Validation
   - Social login buttons

4. **User Management** (`pages/dashboard/users.html`)
   - Data table with sorting
   - Search and filters
   - Pagination
   - Bulk actions

5. **Forms** (`pages/dashboard/forms.html`)
   - Multi-step forms
   - Validation
   - File uploads
   - Rich text editor

6. **Profile** (`pages/profile/index.html`)
   - User information
   - Edit capabilities
   - Activity timeline

7. **Settings** (`pages/settings/index.html`)
   - Tabbed interface
   - Form controls
   - Preferences

8. **Error Pages** (`pages/errors/`)
   - 404 Not Found
   - 500 Server Error
   - Maintenance page

---

## Component Library

### Navigation
- Top navbar with search
- Sidebar navigation
- Breadcrumbs
- Pagination

### Cards
- Info cards
- Stat cards
- Product cards
- Profile cards

### Forms
- Text inputs
- Selects and dropdowns
- Checkboxes and radios
- File uploads
- Date pickers

### Tables
- Basic tables
- Striped tables
- Hoverable rows
- Responsive tables
- Data tables with sorting

### Modals
- Confirmation dialogs
- Form modals
- Info modals

### Alerts & Notifications
- Alert messages
- Toast notifications
- Progress indicators

---

## Best Practices

1. **Always use Bootstrap classes first** before adding custom CSS
2. **Keep custom CSS organized** in theme.css and custom.css
3. **Use CSS variables** for easy theming
4. **Test responsiveness** at all breakpoints
5. **Optimize images** for web use
6. **Minimize custom JavaScript** - leverage Bootstrap's built-in JS
7. **Follow accessibility guidelines** (ARIA labels, semantic HTML)

---

## Deployment

### Static Hosting
Upload all files to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3

### With Backend
Integrate with your backend framework:
- Use templates as views
- Replace sample data with API calls
- Add authentication logic

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development with AI

Copyright © 2024 AIShift. All rights reserved.
