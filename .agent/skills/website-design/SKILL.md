---
name: website-design
description: Design and implement high-quality, production-ready static websites with HTML/CSS/JS. Focuses on modern aesthetics, full content generation (no placeholders), SEO optimization (meta tags, Open Graph), and complete page implementation.
---

# Website Design Skill (Production-Ready)

**Design and build professional, SEO-optimized static websites with modern aesthetics and real content.**

This skill guides the user through the process of creating a complete, deployable static website. It emphasizes visual quality, clean code, user-centric design, and search engine optimization.

---

## 💡 PHILOSOPHY

1.  **Visual Impact**: First impressions matter. Use high-quality imagery, modern typography, and clean layouts.
2.  **Clean Code**: Maintainable, semantic HTML5, CSS3, and Vanilla JavaScript. No unnecessary frameworks unless requested.
3.  **Content First**: Structure follows content. Understand the user's goals before writing code.
4.  **Mobile First**: Ensure the design works flawlessly on all devices.
5.  **Performance**: Optimize for speed. Minify assets, use proper image formats.
6.  **SEO Optimized**: Every page MUST have unique title tags, meta descriptions, and Open Graph tags.
7.  **Real Content Only**: Absolutely NO "Lorem Ipsum". Generate meaningful, relevant copy for all sections based on the user's business context.
8.  **Full-Length Content**: WE DO NOT BUILD SKELETONS. Every page must be fully fleshed out with comprehensive content, multiple sections, and detailed information.
9.  **Image Integrity**: EVERY generated image MUST be used in the final website. Do not generate images and then discard them.
10. **Complete Implementation**: All linked pages (About, Services, Contact, etc.) must be fully built and functional, not just placeholders.

---

## 🏗️ BEHAVIOR

When activated, this skill will consistently follow this process:

### 1. 🔍 Analyze & Understand
   - Ask the user about the **Business Type/Goal** (e.g., Portfolio, Agency, Landing Page, Blog).
   - Identify **Target Audience**.
   - Determine **Style Preferences** (e.g., Minimalist, Bold, Corporate, Creative).
   - Ask for **Specific Features** (e.g., Contact Form, Gallery, Newsletter).
   - **SEO Strategy**: Ask for primary keywords and specific goals (e.g., "rank for 'wedding photographer in NYC'").

### 2. 📐 Propose Structure
   - Based on analysis, propose a **Sitemap** (e.g., Home, About, Services, Contact).
   - Suggest a **Menu Structure**.
   - Outline **Key Sections** for the Homepage (e.g., Hero, Features, Testimonials, Call to Action).
   - Recommend **Additional Features** that align with the user's goals.
   - **SEO Plan**: Suggest meta title/description templates for key pages.

### 3. 🎨 Execute Design
   - **Scaffold**: Create the directory structure (`css/`, `js/`, `images/`).
   - **Develop**: Write HTML, CSS, and JS files.
     - **Shared Assets**: Create `style.css` (or Tailwind) and `script.js` (for nav/interactions).
     - **Header/Footer**: Ensure consistent navigation and footer across all pages (either via duplication in static HTML or a simple JS loader if preferred by user, default to static HTML for SEO).
     - **Pages**: Generate `index.html` and ALL other pages defined in the sitemap (e.g., `about.html`, `services.html`, `contact.html`).
       - **FULL CONTENT**: Each page must have multiple sections (e.g., Hero, Features, Testimonials, FAQ, CTA). No short or empty pages.
   - **Assets**:
     - Use `generate_image` to create:
       - **Hero Images**: Impactful, high-resolution visuals.
       - **Backgrounds**: Subtle patterns or textures.
       - **Team/Product**: For specific sections.
     - **MANDATORY USAGE**: Every single image generated MUST be included in the HTML.
   - **SEO & Meta**:
     - Add `<title>`, `<meta name="description">`, `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">` to `<head>`.
     - Generate `sitemap.xml` and `robots.txt`.
   - **Refine**: Ensure responsiveness and accessibility.

---

## 🚀 EXECUTION PIPELINE

**Phase 1: Discovery**
1.  **Prompt**: "Welcome to the Website Design Skill! To get started, please tell me what kind of website you want to build (e.g., a portfolio for a photographer, a landing page for a SaaS product, etc.)."
2.  **Wait for User Input**.
3.  **Analyze**: "Great! To ensure the design fits your vision, do you have any specific color preferences or existing branding? Also, what are the primary goals of this site and target keywords for SEO?"
4.  **Proposal**: "Based on your input, here is a proposed structure and SEO strategy..." (List pages, sections, features, keywords). "Does this look good?"

**Phase 2: Implementation**
1.  **Setup**: Create project folder and subfolders.
2.  **Global Assets**:
    - **Step 2.1**: Create `style.css` with responsive styles (Flexbox/Grid), variables for theme colors.
    - **Step 2.2**: Create `script.js` for mobile menu, smooth scrolling, generic interactions.
3.  **Page Generation Loop**:
    - **Step 3.1**: "Building Home Page (`index.html`)..." -> Generate HTML with full content & SEO tags.
    - **Step 3.2**: "Building [Page Name] (`[page].html`)..." -> Generate HTML for inner pages, ensuring consistent header/footer.
4.  **Asset Generation**:
    - **Step 4.1**: "Generating images for [Page/Section]..." -> Call `generate_image`.
5.  **SEO Finalization**:
    - **Step 5.1**: Generate `sitemap.xml` listing all pages.
    - **Step 5.2**: Generate `robots.txt` allowing all crawlers.

**Phase 3: Review & Finalize**
1.  **Preview**: Instructions on how to view the site (e.g., "Open `index.html` in your browser").
2.  **Iterate**: "How does it look? Would you like to adjust any colors, spacing, or images?"

**Phase 4: Handover & Guidance**
1.  **Preview**: Guide the user on how to preview the site locally (e.g., using VS Code Live Server or opening files directly).
2.  **Test**: Instruct on how to test responsiveness (DevTools) and functionality (forms, links).
3.  **Update**: Explain how to modify content (edit HTML) or styles (edit CSS).
4.  **Deploy**: Provide a brief guide on deploying to Netlify, Vercel, or GitHub Pages (drag-and-drop or git push).

---

## ⚠️ CRITICAL RULES

- **Responsive**: ALWAYS use media queries to ensure mobile, tablet, and desktop compatibility.
- **Images**: NEVER leave `src=""` empty. Use `generate_image`. **EVERY GENERATED IMAGE MUST BE USED.**
- **Content**: **NO SKELETONS**. Pages must be scrollable with full-length content.
- **Navigation**: ALWAYS include a responsive navigation menu (hamburger menu on mobile).
- **Accessibility**: ALWAYS use semantic tags (`<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>`).
- **Modern CSS**: Use Flexbox and Grid layout. Avoid floats for layout. Use CSS variables for colors and fonts.
- **Real Content**: NEVER use Lorem Ipsum. Write realistic copy based on the business type.
- **SEO**: EVERY page MUST have `<title>`, `<meta name="description">`.
- **Links**: Ensure all internal links (`<a href="...">`) point to the correct `.html` files.

---
