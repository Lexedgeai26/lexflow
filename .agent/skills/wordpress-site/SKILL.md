---
name: wordpress-site
description: Generate a complete, production-ready WordPress website by orchestrating Theme, Data & Template, Content, and Commerce skills (v1.2).
---

# WordPress Modular Skills Specification (v1.2)

**Theme · Data & Template (ACF JSON + Auto-Loader) · Content · Commerce**

---

## 🎯 Purpose

This document defines a **modular, field-driven WordPress Skill system** that enables:

*   Template-based page creation
*   Dynamic, structured content management
*   Easy future page expansion
*   WooCommerce-ready commerce
*   Non-technical content updates

This version introduces:

*   ✅ **Strict Field Naming Standards**
*   ✅ **Flexible Content Blocks (page builder–like, but controlled)**
*   ✅ **ACF JSON + Auto-Loader Execution Layer**

---

## 🧠 Skill Composition Model

```
User / System Instructions
        ↓
┌──────────────────────────┐
│   Theme Skill            │  (Design & Layout)
└──────────────────────────┘
        ↓
┌──────────────────────────┐
│   Data & Template Skill  │  (Fields, Page Models, ACF JSON)
└──────────────────────────┘
        ↓
┌──────────────────────────┐
│   Content Skill          │  (Populate Data)
└──────────────────────────┘
        ↓
┌──────────────────────────┐
│   Commerce Skill (Opt.)  │  (WooCommerce)
└──────────────────────────┘
        ↓
Structured, Maintainable WordPress Website
```

---

# SKILL 1️⃣ — THEME SKILL

*(Design & layout only)*

*   Provides layout & styling
*   Declares template regions
*   Renders dynamic fields
*   WooCommerce compatible
*   No content logic

---

# SKILL 2️⃣ — DATA & TEMPLATE SKILL

*(Structure, fields, templates)*

---

## 🎯 Responsibility

Define **how content is structured**, not what the content is.

This Skill introduces:

*   Page templates (page models)
*   Custom fields
*   Reusable sections
*   Flexible content blocks
*   **ACF JSON Auto-Loading Execution Layer**

---

## 📦 INDUSTRY-SPECIFIC EXTENSIONS

**See:** [PACKS.md](PACKS.md)

This skill is extended by **Industry Packs** which provide domain-specific field groups and templates (e.g., SaaS, Clinic, Hotel).

---

## 🔹 FIELD NAMING STANDARDS (MANDATORY)

To ensure consistency, scalability, and automation-readiness, **all fields must follow these rules**.

### 1️⃣ General Rules

*   Use **snake_case**
*   Use **lowercase only**
*   Prefix fields by **context**
*   Avoid generic names (`title`, `text`, `data`)
*   Names must describe **purpose**, not appearance

✅ Good

```text
hero_title
service_list
cta_primary_text
testimonial_author_name
```

❌ Bad

```text
title
heading1
box_text
content
```

---

### 2️⃣ Page-Level Field Prefixes

| Context        | Prefix         |
| -------------- | -------------- |
| Hero section   | `hero_`        |
| Call to action | `cta_`         |
| Services       | `service_`     |
| Features       | `feature_`     |
| Testimonials   | `testimonial_` |
| FAQs           | `faq_`         |
| Pricing        | `pricing_`     |
| SEO            | `seo_`         |

Example:

```text
hero_title
hero_subtitle
cta_primary_text
cta_primary_link
```

---

### 3️⃣ Repeater & Group Naming

*   Repeaters must be **plural**
*   Child fields must be **singular**

Example:

```text
features
  ├── feature_title
  └── feature_description
```

---

### 4️⃣ SEO Field Standards

```text
seo_title
seo_description
seo_keywords
seo_schema_type
```

---

## 🔹 FLEXIBLE CONTENT BLOCKS ⭐

---

## 🎯 What Are Flexible Content Blocks?

Flexible Content Blocks allow editors to:

*   Build pages using **pre-defined section types**
*   Reorder sections freely
*   Add/remove sections without breaking design
*   Stay within **controlled structure**

This is similar to a page builder — **without chaos**.

---

## 🧱 Flexible Block Definition

Flexible blocks are defined at the **Data & Template Skill level**, not in content.

### Example: `flexible_blocks.json`

```json
{
  "hero_section": {
    "fields": {
      "hero_title": "text",
      "hero_subtitle": "textarea",
      "hero_background_image": "image",
      "cta_primary_text": "text",
      "cta_primary_link": "url"
    }
  },
  "feature_section": {
    "fields": {
      "features": {
        "type": "repeater",
        "fields": {
          "feature_title": "text",
          "feature_description": "textarea"
        }
      }
    }
  },
  "testimonial_section": {
    "fields": {
      "testimonials": {
        "type": "repeater",
        "fields": {
          "testimonial_quote": "textarea",
          "testimonial_author_name": "text",
          "testimonial_author_role": "text"
        }
      }
    }
  }
}
```

---

## 🧠 How Flexible Blocks Are Used

Editors can:

*   Add **Hero Section**
*   Add **Feature Section**
*   Add **Testimonial Section**
*   Reorder sections
*   Remove sections safely

All pages still:

*   Use templates
*   Use structured data
*   Render consistently

---

## 🧩 Template Rendering Pattern

Theme templates render blocks dynamically:

```php
<?php if (have_rows('page_sections')): ?>
  <?php while (have_rows('page_sections')): the_row(); ?>

    <?php if (get_row_layout() === 'hero_section'): ?>
      <h1><?php the_sub_field('hero_title'); ?></h1>
    <?php endif; ?>

    <?php if (get_row_layout() === 'feature_section'): ?>
      <!-- render features -->
    <?php endif; ?>

  <?php endwhile; ?>
<?php endif; ?>
```

---

## 🔹 ACF JSON + AUTO-LOADER PLUGIN (EXECUTION LAYER) ⭐

---

## 🎯 Objective

This section defines how to:

*   Generate **ACF field groups as JSON**
*   Store them in version control
*   Automatically load them via a **custom plugin**
*   Support:
    *   Page templates
    *   Flexible content blocks
    *   Global (site-wide) options
    *   Validation rules
*   Require **zero manual ACF admin setup**

---

## 📁 Folder Structure (MANDATORY)

```
/wp-content/plugins/site-acf-skill/
├── site-acf-skill.php
├── acf-json/
│   ├── field-groups/
│   │   ├── page-home.json
│   │   ├── page-flexible.json
│   │   └── globals.json
│   └── blocks/
│       ├── hero_section.json
│       ├── feature_section.json
│       └── testimonial_section.json
└── README.md
```

---

## 1️⃣ ACF AUTO-LOADER PLUGIN (FULL CODE)

### 📄 `site-acf-skill.php`

```php
<?php
/**
 * Plugin Name: Site ACF Skill
 * Description: Auto-loads ACF JSON field groups, flexible blocks, and global options.
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

define('SITE_ACF_SKILL_PATH', plugin_dir_path(__FILE__));

/**
 * Set custom ACF JSON load/save paths
 */
add_filter('acf/settings/load_json', function ($paths) {
    $paths[] = SITE_ACF_SKILL_PATH . 'acf-json/field-groups';
    $paths[] = SITE_ACF_SKILL_PATH . 'acf-json/blocks';
    return $paths;
});

add_filter('acf/settings/save_json', function ($path) {
    return SITE_ACF_SKILL_PATH . 'acf-json/field-groups';
});

/**
 * Register Global Options Page
 */
add_action('acf/init', function () {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_page([
            'page_title' => 'Site Global Settings',
            'menu_title' => 'Site Settings',
            'menu_slug'  => 'site-global-settings',
            'capability' => 'manage_options',
            'redirect'   => false
        ]);
    }
});
```

---

## 2️⃣ GLOBAL OPTIONS FIELD GROUP (ACF JSON)

### 📄 `acf-json/field-groups/globals.json`

```json
{
  "key": "group_site_globals",
  "title": "Site Global Options",
  "fields": [
    {
      "key": "field_company_name",
      "label": "Company Name",
      "name": "company_name",
      "type": "text",
      "required": 1,
      "maxlength": 100
    },
    {
      "key": "field_contact_email",
      "label": "Contact Email",
      "name": "contact_email",
      "type": "email",
      "required": 1
    },
    {
      "key": "field_site_logo",
      "label": "Site Logo",
      "name": "site_logo",
      "type": "image",
      "return_format": "url",
      "preview_size": "medium"
    }
  ],
  "location": [
    [
      {
        "param": "options_page",
        "operator": "==",
        "value": "site-global-settings"
      }
    ]
  ]
}
```

---

## 3️⃣ FLEXIBLE CONTENT FIELD GROUP (PAGE TEMPLATE)

### 📄 `acf-json/field-groups/page-flexible.json`

```json
{
  "key": "group_page_flexible",
  "title": "Flexible Page Sections",
  "fields": [
    {
      "key": "field_page_sections",
      "label": "Page Sections",
      "name": "page_sections",
      "type": "flexible_content",
      "button_label": "Add Section",
      "layouts": [
        {
          "key": "layout_hero_section",
          "name": "hero_section",
          "label": "Hero Section",
          "sub_fields": [
            {
              "key": "field_hero_title",
              "label": "Hero Title",
              "name": "hero_title",
              "type": "text",
              "required": 1,
              "maxlength": 80
            },
            {
              "key": "field_hero_subtitle",
              "label": "Hero Subtitle",
              "name": "hero_subtitle",
              "type": "textarea",
              "maxlength": 200
            }
          ]
        },
        {
          "key": "layout_feature_section",
          "name": "feature_section",
          "label": "Feature Section",
          "sub_fields": [
            {
              "key": "field_features",
              "label": "Features",
              "name": "features",
              "type": "repeater",
              "min": 1,
              "max": 6,
              "sub_fields": [
                {
                  "key": "field_feature_title",
                  "label": "Feature Title",
                  "name": "feature_title",
                  "type": "text",
                  "required": 1
                },
                {
                  "key": "field_feature_description",
                  "label": "Feature Description",
                  "name": "feature_description",
                  "type": "textarea",
                  "maxlength": 150
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "location": [
    [
      {
        "param": "page_template",
        "operator": "==",
        "value": "template-flexible.php"
      }
    ]
  ]
}
```

---

## 4️⃣ THEME TEMPLATE RENDERING PATTERN

### 📄 `template-flexible.php` (Theme)

```php
<?php
/* Template Name: Flexible Page */

get_header();

if (have_rows('page_sections')) :
  while (have_rows('page_sections')) : the_row();

    if (get_row_layout() === 'hero_section') :
      echo '<h1>' . esc_html(get_sub_field('hero_title')) . '</h1>';
      echo '<p>' . esc_html(get_sub_field('hero_subtitle')) . '</p>';
    endif;

    if (get_row_layout() === 'feature_section') :
      if (have_rows('features')) :
        echo '<ul>';
        while (have_rows('features')) : the_row();
          echo '<li>' . esc_html(get_sub_field('feature_title')) . '</li>';
        endwhile;
        echo '</ul>';
      endif;
    endif;

  endwhile;
endif;

get_footer();
```

---

## 5️⃣ VALIDATION ENFORCEMENT SUMMARY

Validation is handled by ACF automatically using:

*   `required`
*   `maxlength`
*   `min` / `max`
*   field type constraints

Rules are:

*   Enforced in admin UI
*   Block save/publish on invalid data
*   Visible editor feedback

---

# SKILL 3️⃣ — CONTENT SKILL

*(Populate structured fields)*

---

## 🎯 Responsibility

Populate **template fields and flexible blocks**, never raw HTML.

---

## 📄 Content Definition Example

```json
{
  "home": {
    "template": "flexible",
    "sections": [
      {
        "type": "hero_section",
        "fields": {
          "hero_title": "Build Faster with Confidence",
          "hero_subtitle": "AI-first digital engineering",
          "cta_primary_text": "Get Started",
          "cta_primary_link": "/contact"
        }
      },
      {
        "type": "feature_section",
        "fields": {
          "features": [
            {
              "feature_title": "Speed",
              "feature_description": "Rapid delivery cycles"
            }
          ]
        }
      }
    ]
  }
}
```

---

## 📐 Content Skill Rules

*   Populate fields only
*   Never modify templates
*   Safe to re-run
*   Supports adding new pages anytime

---

# SKILL 4️⃣ — COMMERCE SKILL

*(WooCommerce provisioning)*

Unchanged:

*   Installs WooCommerce
*   Creates products
*   Configure store
*   Uses WooCommerce APIs only

---

## 🏁 FINAL ARCHITECTURE SUMMARY

| Skill                 | Responsibility              |
| --------------------- | --------------------------- |
| Theme Skill           | Visual system & layout      |
| Data & Template Skill | Page models, fields, blocks |
| Content Skill         | Populate structured data    |
| Commerce Skill        | E-commerce                  |

---

## 🏁 Final Statement

> With **Field Naming Standards** and **Flexible Content Blocks**, this WordPress Skill system becomes **enterprise-grade**, editor-friendly, and future-proof — without sacrificing structure or control.

This document is the **authoritative v1.2 specification**.

---

**END OF FILE**
