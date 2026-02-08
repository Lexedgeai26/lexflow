# Industry-Specific ACF Packs

**Structured Content Presets for WordPress Skill System**

---

## 🎯 Purpose

Industry-Specific ACF Packs provide **predefined field groups, templates, and flexible blocks** tailored for specific business domains.

Each pack:

*   Extends the **Data & Template Skill**
*   Uses **ACF JSON only**
*   Is plug-and-play
*   Enforces industry best practices
*   Reduces setup time to minutes

---

## 🧠 Pack Architecture

```
Core ACF Skill
   ├── Global Options
   ├── Flexible Blocks
   └── Validation Rules
        ↓
Industry ACF Pack
        ↓
Ready-to-use Industry Website
```

---

## 📁 Folder Structure (Per Pack)

```
/acf-packs/
├── saas/
├── clinic/
├── hotel/
├── law-firm/
├── ecommerce/
└── startup/
```

Each pack contains:

```
├── field-groups/
├── flexible-blocks/
└── README.md
```

---

# PACK 1️⃣ — SAAS / SOFTWARE COMPANY

---

## 🎯 Use Cases

*   SaaS platforms
*   AI products
*   B2B software
*   Subscription services

---

### 📄 Global Additions

```json
{
  "product_name": { "type": "text", "required": true },
  "pricing_currency": { "type": "text", "required": true },
  "trial_available": { "type": "true_false" }
}
```

---

### 📄 Page Templates

#### Homepage Fields

```json
{
  "hero_product_tagline": { "type": "text", "required": true },
  "hero_product_value": { "type": "textarea", "max_length": 160 },
  "feature_list": {
    "type": "repeater",
    "min": 3,
    "fields": {
      "feature_title": "text",
      "feature_benefit": "textarea"
    }
  }
}
```

---

### 🧱 Flexible Blocks

*   Feature comparison
*   Pricing table
*   Integration logos
*   Customer logos
*   Product screenshots

---

# PACK 2️⃣ — CLINIC / HEALTHCARE

---

## 🎯 Use Cases

*   Clinics
*   Diagnostic centers
*   Therapists
*   Healthcare startups

---

### 📄 Global Additions

```json
{
  "clinic_name": { "type": "text", "required": true },
  "clinic_registration_id": { "type": "text" },
  "emergency_contact": { "type": "text" }
}
```

---

### 📄 Page Templates

#### Doctor Profile

```json
{
  "doctor_name": { "type": "text", "required": true },
  "doctor_specialization": { "type": "text" },
  "years_of_experience": { "type": "number", "min": 0 },
  "consultation_fee": { "type": "number" }
}
```

---

### 🧱 Flexible Blocks

*   Doctor cards
*   Appointment CTA
*   Timings & availability
*   Insurance logos
*   Patient testimonials

---

# PACK 3️⃣ — HOTEL / HOSPITALITY

---

## 🎯 Use Cases

*   Hotels
*   Resorts
*   Guest houses
*   Homestays

---

### 📄 Global Additions

```json
{
  "hotel_name": { "type": "text", "required": true },
  "star_rating": { "type": "number", "min": 1, "max": 5 },
  "check_in_time": { "type": "time" },
  "check_out_time": { "type": "time" }
}
```

---

### 📄 Page Templates

#### Room Type

```json
{
  "room_name": { "type": "text", "required": true },
  "room_price": { "type": "number" },
  "room_capacity": { "type": "number" },
  "amenities": {
    "type": "repeater",
    "fields": {
      "amenity_name": "text"
    }
  }
}
```

---

### 🧱 Flexible Blocks

*   Room gallery
*   Amenities grid
*   Booking CTA
*   Nearby attractions
*   Guest reviews

---

# PACK 4️⃣ — LAW FIRM

---

## 🎯 Use Cases

*   Law firms
*   Legal consultants
*   Corporate lawyers

---

### 📄 Global Additions

```json
{
  "firm_registration_number": { "type": "text" },
  "bar_association": { "type": "text" }
}
```

---

### 📄 Page Templates

#### Practice Area

```json
{
  "practice_area_name": { "type": "text", "required": true },
  "practice_description": { "type": "textarea" },
  "success_cases": { "type": "number" }
}
```

---

### 🧱 Flexible Blocks

*   Lawyer profiles
*   Case highlights
*   Consultation CTA
*   Compliance disclaimer

---

# PACK 5️⃣ — ECOMMERCE / RETAIL

---

## 🎯 Use Cases

*   Online stores
*   D2C brands
*   Marketplaces

---

### 📄 Global Additions

```json
{
  "store_currency": { "type": "text", "required": true },
  "return_policy_url": { "type": "url" }
}
```

---

### 🧱 Flexible Blocks

*   Product highlights
*   Category showcase
*   Trust badges
*   Shipping info
*   Offer banners

(Products handled by WooCommerce Skill)

---

# PACK 6️⃣ — STARTUP / LANDING PAGE

---

## 🎯 Use Cases

*   MVP launches
*   Pitch websites
*   Pre-launch pages

---

### 📄 Page Templates

```json
{
  "startup_tagline": { "type": "text", "required": true },
  "problem_statement": { "type": "textarea" },
  "solution_summary": { "type": "textarea" },
  "founder_quote": { "type": "textarea" }
}
```

---

### 🧱 Flexible Blocks

*   Problem–solution
*   Founder section
*   Roadmap
*   Email capture
*   Investor logos

---

## 🧠 Pack Selection Rules

*   One primary industry pack per site
*   Packs may extend global fields
*   Packs must NOT override core field keys
*   Packs must follow naming & validation standards

---

## 🏁 FINAL STATEMENT

> Industry-Specific ACF Packs allow rapid, structured, and scalable website generation by encoding **domain knowledge directly into content models**, not templates or pages.

This document defines the **official industry pack system** for your WordPress Skill architecture.

---

**END OF FILE**
