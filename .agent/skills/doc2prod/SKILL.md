---
name: doc2prod
description: FULLY IMPLEMENT complete projects from requirements to production. This skill executes the ENTIRE software development lifecycle - from discovery to deployment. It does NOT just plan, it IMPLEMENTS completely with phased execution, testing, and validation.
---

# DOC2PROD - Documentation to Production

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

**Transform project requirements into fully functional production-ready applications through intelligent, phased implementation**

---

## 💡 THE MOOT POINT (MANDATORY PHILOSOPHY)

**THE MAIN JOB OF THIS SKILL IS COMPLETE PROJECT DELIVERY.**

1.  **NEVER ASSUME**: Always perform thorough discovery before implementation
2.  **PHASED EXECUTION**: Break complex projects into manageable, testable phases
3.  **CONTINUOUS VALIDATION**: Test after every phase, fix gaps before proceeding
4.  **USER APPROVAL GATES**: Never skip phases without explicit user confirmation
5.  **DOCUMENTATION FIRST**: Document decisions, architecture, and implementation details
6.  **PRODUCTION READY**: Every deliverable must be deployment-ready, not just MVP

---

## Behavior

When activated, this skill will:
7. ✅ Implement Phase 0: Foundation (auto + test)
8. ✅ Implement Phase 1: Core Features (auto + test)
9. ✅ Implement Phase 2+: Additional Features (auto + test)
10. ✅ Generate comprehensive test suite (auto)
11. ✅ Create manual testing guide (auto)
12. ✅ Validate production readiness (auto)
13. ✅ Report completion with deployment guide

**DO NOT ask "what would you like to do next?" after each phase - EXECUTE AUTOMATICALLY with user approval gates**

---

## Prerequisites (CHECK SILENTLY, DON'T ASK)

Check these silently and proceed:
- ✅ Working directory exists and is writable
- ✅ Node.js/Python/etc. installed (based on tech stack)
- ✅ Package manager available (npm/yarn/pip/etc.)
- ✅ Git initialized or can be initialized
- ✅ Database server available or can be containerized

---

## ⚠️ CRITICAL RULES - MUST FOLLOW

### Rule 1: DISCOVERY PROOF (MANDATORY)

**BEFORE ANY IMPLEMENTATION, YOU MUST:**

```bash
# Map workspace structure
echo "🔍 Mapping Workspace Topology..."
pwd
ls -la
find . -maxdepth 2 -not -path '*/.*' -type d
find . -maxdepth 1 -not -path '*/.*' -type f

# Check for existing projects
ls -la package.json 2>/dev/null || echo "No package.json found"
ls -la requirements.txt 2>/dev/null || echo "No requirements.txt found"
ls -la Gemfile 2>/dev/null || echo "No Gemfile found"
```

**Report to user:**
"Discovery Proof: I have mapped the workspace at `[path]`. Status: `[empty/existing project]`. I will create the new project in `[target_folder]`."

---

### Rule 2: AI-DRIVEN REQUIREMENTS ANALYSIS IS MANDATORY

**⚠️ NEW APPROACH - Ask ONE question, provide COMPLETE recommendations:**

1. **Single Question**: "Please describe your project in 2-3 sentences"
2. **AI Analysis**: Automatically detect project type, scale, features, and requirements
3. **Smart Recommendations**: Present complete architecture with justifications
4. **User Choice**: Approve, customize, or ask questions

**✅ ALWAYS DO THIS:**
- ✅ Ask for brief project description (2-3 sentences)
- ✅ Analyze description to detect project type and scale
- ✅ Automatically recommend complete tech stack with justifications
- ✅ Present comprehensive architecture plan
- ✅ Allow easy customization ("use MongoDB instead")
- ✅ Use smart defaults from configuration matrix
- ✅ Detect features from keywords automatically
- ✅ Assign features to phases automatically

**❌ ABSOLUTELY FORBIDDEN:**
- ❌ Ask 8-9 separate questions (old approach)
- ❌ Ask about tech stack preferences without providing recommendations first
- ❌ Proceed without presenting a complete architecture recommendation
- ❌ Ignore user's customization requests
- ❌ Ask questions that can be inferred from project description
- ❌ Present recommendations without justifications

**Example Flow:**
```
User: "I need a SaaS platform for invoice management with team collaboration"

AI: [Analyzes internally]
- Project Type: SaaS
- Scale: Medium (business users)
- Features: Invoice CRUD, team management, RBAC, possibly payments

AI: [Presents complete recommendation]
"Based on your description, I recommend:
- Backend: Node.js + Express + TypeScript (real-time, scalable)
- Database: PostgreSQL (ACID compliance for financial data)
- Frontend: React + Tailwind CSS (modern SaaS UI)
- Auth: JWT with RBAC (team permissions)
- Features: Invoice management, team collaboration, payment integration

Approve to start, or customize any aspect."
```

---

### Rule 3: PHASED IMPLEMENTATION IS MANDATORY

**Every project MUST be broken into phases:**

- **P0**: Foundation (auth, database, core infrastructure)
- **P1**: Primary features (main business logic)
- **P2**: Secondary features (nice-to-have functionality)
- **P3**: Advanced features (optimizations, analytics)
- **P4**: Testing, documentation, deployment

**After EACH phase:**
1. ✅ Implement all deliverables
2. ✅ Run automated tests
3. ✅ Perform gap analysis
4. ✅ Fix all gaps
5. ✅ Show summary to user
6. ✅ Wait for approval before next phase

**❌ ABSOLUTELY FORBIDDEN:**
- ❌ Skip to next phase without completing current phase
- ❌ Ignore test failures
- ❌ Proceed without user approval
- ❌ Implement multiple phases simultaneously

---

### Rule 4: TESTING IS NON-NEGOTIABLE

**After EVERY phase, you MUST:**

```bash
# Run tests
npm test || pytest || cargo test

# Check for errors
echo "Checking for compilation errors..."
npm run build || tsc --noEmit || python -m py_compile src/**/*.py

# Test server startup
echo "Testing server startup..."
timeout 10s npm start || echo "Server start test complete"

# Verify endpoints (if applicable)
curl http://localhost:4000/health || echo "Health check endpoint test"
```

**If tests fail:**
1. ✅ Analyze failure
2. ✅ Fix the issue
3. ✅ Re-run tests
4. ✅ Repeat until all tests pass

**❌ NEVER proceed with failing tests**

---

## 🛠️ CRITICAL IMPLEMENTATION GOTCHAS (READ THIS)

### 1. Python + SQLAlchemy JSON Serialization
**Issue:** UUIDs or Datetime objects in a dictionary passed to a `JSON` or `JSONB` column will cause a `TypeError: Object is not JSON serializable`.
**Fix:** Always recursively convert UUIDs/Datetimes to strings before saving to a JSON field.

### 2. Python 3.12+ Bcrypt Compatibility
**Issue:** Newer versions of `bcrypt` have issues with Python 3.12+ leading to `ValueError` or compilation errors.
**Fix:** Pin `bcrypt==4.0.1` in `requirements.txt`.

### 3. FastAPI Query Parameters (UUID)
**Issue:** If a frontend sends an empty string `?id=` for a parameter typed as `UUID`, FastAPI returns a `422 Unprocessable Content`. 
**Fix:** 
- **Frontend**: Clean up query objects to omit empty strings/nulls before passing to the API client.
- **Backend**: Use `Optional[str] = None` and manually validate or convert to UUID if it's not empty.

### 4. CORS & Redirects
**Issue:** Browser CORS policy may block redirects (e.g., from `/api/v1/resource` to `/api/v1/resource/`).
**Fix:** Ensure frontend calls ALWAYS include the trailing slash if the backend prefix/router expects it, and ensure `CORSMiddleware` is the outermost middleware.

### 5. Login Response Structure
**Issue:** Simple token-only responses force the frontend to make an extra call to `/me` immediately.
**Fix:** Include the basic `User` object in the login response: `{ "access_token": "...", "user": { "id": "...", "email": "...", "role": "..." } }`.

### 6. Empty Dashboard "Boring" Syndrome
**Issue:** App loads successfully but looks broken/empty because there is no data.
**Fix:** ALWAYS include a seeding step to populate 10-20 realistic records. A "premium" app must look alive on first launch.

### 7. Explicit Type Conversions (The "422" Fix)
**Issue:** Frontend inputs often return empty strings `""` for optional fields, but backends expect `null` or `None`.
**Fix:**
- **Frontend**: `const cleanData = Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v === '' ? null : v]));`
- **Backend (Pydantic)**: Use `@field_validator` to convert `""` to `None`.

### 1. **Requirements Discovery** 🔍
- Interactive requirement gathering
- Tech stack recommendations based on project needs
- Infrastructure planning (Docker vs standalone)
- Security architecture design
- Database selection and planning

### 2. **Project Planning** 📋
- Comprehensive project specification generation
- Phase-based breakdown (P0, P1, P2, etc.)
- Folder structure design
- Database schema design
- Architecture documentation

### 3. **Project Bootstrap** 🚀
- Automated project scaffolding
- Dependency installation
- Configuration setup
- Initial file structure creation
- Development environment setup

### 4. **Phased Implementation** 🔨
- Phase-by-phase development
- Automatic testing after each phase
- Gap analysis and remediation
- User approval gates between phases
- Continuous validation

### 5. **Quality Assurance** ✅
- Automated test suite generation
- Integration testing
- Manual testing documentation
- Feature validation
- Production readiness checklist

---

## EXECUTION PIPELINE

### Stage 1: Discovery & Requirements [INTERACTIVE]

**📂 Step 1.0: Context Rehydration (Existing Docs Check)**

**AI Actions:**
1. **Check for `docs/` folder**:
   ```bash
   if [ -d "docs" ]; then
     echo "📂 Found existing 'docs/' directory."
     ls -F docs/
     ls -F docs/phases/ 2>/dev/null
   fi
   ```

2. **Resume Logic**:
   - **IF** `docs/project-spec.md` AND `docs/requirements.md` exist:
     - Read these files to understand the project context.
     - **ASK USER**: "I found existing project specifications and phase plans in `docs/`. Would you like to skip discovery and start implementation based on these documents?"
     - **Branching**:
       - **YES**: 
         - Verify `docs/folder-structure.md` exists.
         - Verify `docs/phases/p0-foundation.md` exists.
         - **Jump to Stage 4 (Bootstrap)** or **Stage 5 (Implementation)** immediately.
       - **NO**: Proceed to Step 1.1 (Fresh Start).

**🔍 Step 1.1: Initial Discovery**
```bash
# Auto-execute workspace discovery
echo "📍 [1/13] Performing workspace discovery..."
pwd
ls -la
find . -maxdepth 2 -type d -not -path '*/.*' | head -20
```

**Report Format:**
```
✅ Discovery Complete
Workspace: /path/to/project
Status: Empty directory / Existing project detected
Next: Requirements gathering
```

**🎯 Step 1.2: AI-Driven Requirements Analysis (SMART APPROACH)**

**AI Actions:**

1. **Single Comprehensive Question**:
   ```
   📋 Please describe your project in 2-3 sentences:
   
   - What problem does it solve?
   - Who will use it?
   - What are the key features?
   
   Example: "I need a SaaS platform for small businesses to manage their invoices. 
   Users should be able to create, send, and track invoices, with payment integration. 
   It should support multiple team members with different permission levels."
   ```

2. **AI Analysis Process** (Internal - Execute Automatically):
   
   **A) Project Type Detection**:
   - **SaaS Platform**: Keywords like "subscription", "multi-tenant", "dashboard", "analytics", "SaaS"
   - **E-commerce**: Keywords like "shop", "products", "cart", "checkout", "inventory", "store"
   - **CMS/Blog**: Keywords like "content", "articles", "posts", "publishing", "blog"
   - **Internal Dashboard**: Keywords like "admin", "management", "internal", "reporting", "monitor"
   - **REST API**: Keywords like "API", "service", "integration", "webhook", "endpoint"
   - **Mobile Backend**: Keywords like "mobile app", "iOS", "Android", "app backend"
   
   **B) Scale Inference**:
   - **Small** (< 1K users): "personal", "small team", "startup MVP", "prototype"
   - **Medium** (1K-100K users): "growing", "B2B", "SaaS", "business"
   - **Large** (100K+ users): "enterprise", "millions", "high traffic", "scale"
   
   **C) Feature Extraction**:
   - **Auth**: "login", "signup", "user accounts", "authentication"
   - **Payments**: "payment", "subscription", "billing", "Stripe", "checkout"
   - **File Upload**: "upload", "files", "images", "media"
   - **Real-time**: "real-time", "live", "WebSocket", "chat", "notifications"
   - **Search**: "search", "filter", "find"
   - **Analytics**: "analytics", "metrics", "dashboard", "reports"
   - **Multi-tenant**: "multi-tenant", "organizations", "workspaces", "teams"
   - **RBAC**: "roles", "permissions", "admin", "access control"
   
   **D) Tech Stack Auto-Selection**:
   
   **Backend Framework:**
   - **Python + FastAPI**: Data-heavy apps, ML integration, rapid API development
   - **Node.js + Express + TypeScript**: Real-time apps, I/O-heavy, JavaScript ecosystem
   - **Node.js + NestJS**: Enterprise apps, complex architecture, TypeScript-first
   
   **Database:**
   - **PostgreSQL** (Default): Relational data, ACID compliance, JSON support
   - **MongoDB**: Flexible schema, rapid iteration, document storage
   - **SQLite**: Simple projects, prototypes, local-first apps
   
   **Frontend:**
   - **Tailwind + React + TypeScript**: Modern SaaS, dashboards, professional UI (Default for SaaS)
   - **Bootstrap 5 + HTML/React**: Corporate apps, admin panels, traditional (Default for internal tools)
   - **Next.js + Tailwind**: SEO-critical, marketing sites, e-commerce (Default for e-commerce)
   
   **Authentication:**
   - **JWT** (Default): APIs, mobile apps, stateless, scalable
   - **OAuth**: Social login, third-party integrations
   - **Session**: Traditional web apps, server-side rendering
   
   **Infrastructure:**
   - **Docker Compose** (Default): Local development, easy setup
   - **PostgreSQL in Docker** (Default): No external dependencies
   - **Redis**: If caching/real-time features detected

3. **Generate Comprehensive Recommendation**:
   ```markdown
   🎯 AI ANALYSIS COMPLETE
   
   Based on your project description: "[user input]"
   
   I've analyzed this as a **[PROJECT_TYPE]** targeting **[SCALE]** scale.
   
   ---
   
   ## 🏗️ RECOMMENDED ARCHITECTURE
   
   ### Backend
   - **Framework**: [Choice] 
   - **Why**: [Justification based on project needs]
   
   ### Database
   - **Type**: [Choice]
   - **Setup**: PostgreSQL in Docker (no external dependencies needed)
   - **Why**: [Justification]
   
   ### Frontend
   - **Framework**: [Choice]
   - **Styling**: [Tailwind CSS / Bootstrap 5]
   - **Why**: [Justification]
   - **Quality**: Production-ready with animations, responsive design, professional UI
   
   ### Authentication & Security
   - **Auth Method**: [JWT / OAuth / Session]
   - **Authorization**: [RBAC / Custom]
   - **Password Hashing**: bcrypt 4.0.1 (Python 3.12+ compatible)
   - **API Security**: Rate limiting, input validation, CORS
   
   ### Infrastructure
   - **Local Dev**: Docker Compose
   - **Database**: PostgreSQL 15 in Docker
   - **Caching**: [Redis if needed]
   - **Deployment**: Docker-ready, cloud-agnostic
   
   ---
   
   ## ✨ AUTO-DETECTED FEATURES
   
   **Phase 0 - Foundation:**
   - [Auto-detected core features]
   
   **Phase 1 - Core Features:**
   - [Auto-detected primary features]
   
   **Phase 2 - Secondary Features:**
   - [Auto-detected nice-to-have features]
   
   **Phase 3 - Advanced Features:**
   - [Auto-detected advanced features]
   
   ---
   
   ## 📊 PROJECT ESTIMATES
   
   - **Complexity**: [Simple / Medium / Complex]
   - **Number of Phases**: [N] phases
   
   ---
   
   ## 🎨 UI/UX APPROACH
   
   - **Design System**: [Tailwind / Bootstrap]
   - **Components**: Production-ready, professionally designed
   - **Animations**: Smooth transitions and micro-interactions
   - **Sample Data**: Realistic mock data (not Lorem Ipsum)
   - **Responsive**: Mobile-first, all screen sizes
   - **Dark Mode**: [Yes/No based on project type]
   
   ---
   
   ✅ **READY TO PROCEED**
   
   This is my recommended approach based on industry best practices and your requirements.
   
   **Your Options:**
   
   1. ✅ **Approve and Start** - I'll begin implementation immediately
   2. 🔧 **Customize** - Override any choice (e.g., "use MongoDB instead", "add GraphQL")
   3. ❓ **Ask Questions** - Get more details about any aspect
   4. 📝 **Add Features** - Tell me about additional requirements
   
   What would you like to do?
   ```

4. **Handle User Response**:
   
   **If "Approve"**:
   - Proceed directly to Step 1.3 (Document Requirements)
   - Skip all other questions
   - Use recommended architecture
   
   **If "Customize"**:
   - Parse user's customization request
   - Update specific components
   - Re-present updated recommendation
   - Example: User says "use MongoDB" → Update database choice, regenerate recommendation
   
   **If "Questions"**:
   - Answer specific questions
   - Provide detailed justifications
   - Return to options menu
   
   **If "Add Features"**:
   - Incorporate additional features
   - Update phase breakdown
   - Re-present updated recommendation

5. **Optional Follow-up Questions** (Only if CRITICAL info missing):
   
   These are ONLY asked if absolutely necessary:
   
   - "Do you have an existing database server, or should I set one up in Docker?" 
     **(Default: Docker - only ask if user mentions "existing database")**
   
   - "Any specific compliance requirements (GDPR, HIPAA, SOC2)?" 
     **(Default: Basic security - only ask if user mentions "healthcare", "finance", "enterprise")**
   
   - "Preferred cloud provider for deployment guidance?" 
     **(Default: Cloud-agnostic Docker - only ask if user mentions specific cloud)**

**📝 Step 1.3: Document Requirements**
```bash
echo "📝 [2/13] Documenting requirements..."
mkdir -p docs
cat > docs/requirements.md << 'EOF'
# Project Requirements

## Executive Summary
[Auto-generated from user responses]

## Target Users
[User personas and characteristics]

## Core Features
### Must-Have (P0)
- [Feature 1]
- [Feature 2]

### Nice-to-Have (P1-P2)
- [Feature 3]

## Technical Requirements
### Scale
- Users: [number]
- Data: [volume]
- Traffic: [requests/day]

### Security
- Authentication: [method]
- Authorization: [model]
- Compliance: [requirements]

### Infrastructure
- Deployment: [target]
- Database: [type]
- Containerization: [yes/no]
EOF
```

**Output:** 
- ✅ `docs/requirements.md` created
- ✅ User confirmation received
- ✅ Ready for specification phase

---

## 🎯 SMART DEFAULTS SYSTEM

### Default Configuration Matrix

**For SaaS Applications:**
```yaml
backend: Node.js + Express + TypeScript
database: PostgreSQL
frontend: React + TypeScript + Tailwind CSS
auth: JWT with refresh tokens
authorization: RBAC
deployment: Docker Compose
features:
  - User authentication
  - Multi-tenant architecture
  - Dashboard with analytics
  - User management
  - Subscription management (if payment keywords detected)
  - Team/workspace management
```

**For E-commerce:**
```yaml
backend: Node.js + Express + TypeScript
database: PostgreSQL
frontend: Next.js + Tailwind CSS (for SEO)
auth: JWT + OAuth (social login)
features:
  - Product catalog with categories
  - Shopping cart
  - Checkout flow
  - Payment integration (Stripe)
  - Order management
  - Inventory tracking
  - Customer accounts
  - Product search and filtering
```

**For CMS/Blog:**
```yaml
backend: Node.js + Express + TypeScript
database: PostgreSQL
frontend: Next.js + Tailwind CSS (for SEO)
auth: JWT
features:
  - Content management (posts, pages)
  - Rich text editor
  - Media management
  - Categories and tags
  - Comments system
  - User profiles
  - SEO optimization
```

**For Internal Dashboards:**
```yaml
backend: Python + FastAPI
database: PostgreSQL
frontend: React + Tailwind CSS
auth: JWT or SSO/LDAP
authorization: RBAC
features:
  - Data visualization
  - Reporting and analytics
  - User management
  - Export functionality (CSV, PDF)
  - Audit logs
  - Real-time monitoring
```

**For REST APIs:**
```yaml
backend: Python + FastAPI or Node.js + Express
database: PostgreSQL
auth: API keys + JWT
features:
  - RESTful endpoints
  - API documentation (Swagger/OpenAPI)
  - Rate limiting
  - Webhook support
  - Request validation
  - Error handling
  - Logging and monitoring
```

**For Mobile Backends:**
```yaml
backend: Node.js + Express + TypeScript
database: PostgreSQL
auth: JWT with refresh tokens
features:
  - User authentication
  - Push notifications
  - File upload/download
  - Real-time sync
  - Offline support considerations
  - API versioning
```

### Override Mechanism

Users can override any default by simply stating:
- "Use MongoDB instead of PostgreSQL"
- "I prefer Vue.js for frontend"
- "Add GraphQL support"
- "Use OAuth for authentication"
- "Skip multi-tenant features"

AI will acknowledge and update the recommendation accordingly.

---

## 🔍 AUTOMATIC FEATURE DETECTION

### Keyword-Based Feature Mapping

**Authentication & Authorization:**
- "login", "signup", "user accounts" → User authentication system
- "admin", "roles", "permissions" → RBAC authorization
- "social login", "Google/Facebook" → OAuth integration
- "SSO", "LDAP", "Active Directory" → Enterprise SSO
- "multi-tenant", "organizations", "workspaces" → Multi-tenant architecture

**Data Management:**
- "upload", "files", "images" → File storage system (AWS S3/local)
- "export", "CSV", "Excel" → Data export functionality
- "import", "bulk upload" → Data import system
- "search", "filter" → Search functionality (PostgreSQL full-text or Elasticsearch)

**Communication:**
- "email", "notifications" → Email system (SendGrid/Nodemailer)
- "SMS", "text messages" → SMS integration (Twilio)
- "push notifications" → Push notification system (FCM/APNS)
- "chat", "messaging" → Real-time chat (WebSocket)

**Payments:**
- "payment", "subscription", "billing" → Payment gateway (Stripe)
- "invoice", "receipt" → Invoice generation system
- "refund", "cancellation" → Payment management

**Analytics & Reporting:**
- "analytics", "metrics", "dashboard" → Analytics dashboard
- "reports", "charts", "graphs" → Reporting system with visualizations
- "export reports", "PDF" → Report generation (PDF/Excel)

**Collaboration:**
- "comments", "feedback" → Comment system
- "share", "collaborate" → Sharing functionality
- "real-time", "live updates" → WebSocket integration
- "notifications", "alerts" → Notification system

**E-commerce Specific:**
- "cart", "shopping cart" → Shopping cart functionality
- "checkout", "order" → Checkout flow
- "inventory", "stock" → Inventory management
- "shipping", "delivery" → Shipping integration
- "reviews", "ratings" → Product review system

### Auto-Phase Assignment

Based on detected features, automatically assign to phases:

**P0 (Foundation):**
- User authentication
- Database setup and migrations
- Basic CRUD operations
- Core infrastructure
- Docker setup

**P1 (Core Features):**
- Primary business logic features
- Main user workflows
- Essential integrations
- Core UI components

**P2 (Secondary Features):**
- Nice-to-have functionality
- Additional user features
- Non-critical integrations
- Enhanced UI/UX

**P3 (Advanced Features):**
- Analytics and reporting
- Advanced search
- Optimization features
- Admin tools
- Advanced integrations

---

### Stage 2: Project Specification [AUTO]

**📋 Step 2.1: Generate Technical Architecture**
```bash
# Check if spec exists first
if [ -f "docs/project-spec.md" ]; then
    echo "✅ Found existing project specification. Reading..."
    cat docs/project-spec.md
    echo "SKIPPING GENERATION based on existing docs."
else
    echo "🏗️ [3/13] Generating project specification..."
fi
```

**AI Actions (If NO existing spec found):**

1. **Analyze Requirements & Design Architecture**
   ```typescript
   // Auto-generate based on requirements
   const architecture = {
     pattern: 'Monolithic' | 'Microservices' | 'Serverless',
     layers: ['Presentation', 'Business Logic', 'Data Access'],
     communication: 'REST' | 'GraphQL' | 'gRPC',
     caching: 'Redis' | 'Memcached' | 'None',
     queue: 'RabbitMQ' | 'Redis' | 'None'
   };
   ```

2. **Tech Stack Justification**
   ```markdown
   ## Recommended Tech Stack
   
   ### Backend: Node.js + Express + TypeScript
   **Justification:**
   - Fast development with TypeScript type safety
   - Large ecosystem of packages
   - Excellent for I/O-heavy applications
   - Strong community support
   
   ### Database: PostgreSQL
   **Justification:**
   - ACID compliance for data integrity
   - Advanced querying capabilities
   - JSON support for flexible schemas
   - Excellent performance at scale
      ### Frontend: Based on User Preference (Production-Ready Design)
    **Options:**
    
    **A) Tailwind CSS + React + TypeScript** (Recommended for Modern Apps)
    - **Skill Used:** `tailwind-frontend`
    - **Justification:**
      - Utility-first CSS for rapid, custom styling
      - Modern, polished UI components with animations
      - Best-in-class developer experience with Vite + PostCSS
      - Type-safe components with TypeScript
      - Production-ready designs, not mockups
      - Examples: Professional dashboards, stat cards, smooth transitions
      - Ecosystem: shadcn/ui, Radix UI, Lucide icons
    
    **B) Bootstrap 5 + HTML/React** (Recommended for Corporate Apps)
    - **Skill Used:** `bootstrap-frontend`
    - **Justification:**
      - Component-based CSS framework with proven patterns
      - Professional, corporate-friendly designs
      - Quick to prototype with pre-built components
      - Production-ready templates (not basic boilerplate)
      - Examples: Admin panels, data tables, form layouts
      - Ecosystem: Bootstrap Icons, Chart.js
    
    ⚠️ **CRITICAL DESIGN STANDARDS:**
    - ✅ Generate PRODUCTION-READY UI, not mockups or boilerplate
    - ✅ Include professional color schemes (not default blue/gray)
    - ✅ Add smooth animations and micro-interactions
    - ✅ Use realistic sample data (not Lorem Ipsum)
    - ✅ Implement responsive design for all screen sizes
    - ✅ Include proper typography and spacing
    - ✅ Add loading states, empty states, error states
    - ❌ NEVER generate basic unstyled forms
    - ❌ NEVER use default framework colors without customization
    - ❌ NEVER skip animations and transitions
    
    **Frontend Skill Integration:**
    - When user selects Tailwind: Invoke `tailwind-frontend` skill
    - When user selects Bootstrap: Invoke `bootstrap-frontend` skill
    - Both skills generate professional, production-ready components
    - Both skills include sample data and realistic UI states
    ```

3. **Security Architecture Design**
   ```markdown
   ## Security Architecture
   
   ### Authentication
   - Method: JWT with refresh tokens
   - Token expiry: 15 minutes (access), 7 days (refresh)
   - Storage: HttpOnly cookies (web), Secure storage (mobile)
   
   ### Authorization
   - Model: RBAC (Role-Based Access Control)
   - Roles: Admin, Manager, User, Guest
   - Permissions: Resource-based with CRUD operations
   
   ### Data Protection
   - Encryption at rest: AES-256
   - Encryption in transit: TLS 1.3
   - Password hashing: **bcrypt (v4.0.1 for Python 3.12+ stability)** or Argon2
   - Sensitive data: Encrypted columns in database
   
   ### API Security
   - Rate limiting: 100 requests/minute per IP
   - CORS: Whitelist specific origins
   - Input validation: Joi/Zod schemas
   - SQL injection prevention: Parameterized queries
   - XSS protection: Content Security Policy
   ```

4. **Database Schema Design**
   ```sql
   -- Auto-generated based on features
   CREATE TABLE users (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     email VARCHAR(255) UNIQUE NOT NULL,
     password_hash VARCHAR(255) NOT NULL,
     role VARCHAR(50) NOT NULL DEFAULT 'user',
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );
   
   CREATE INDEX idx_users_email ON users(email);
   CREATE INDEX idx_users_role ON users(role);
   ```

5. **API Design**
   ```yaml
   # Auto-generated REST API specification
   /api/v1:
     /auth:
       POST /register: Register new user
       POST /login: Authenticate user
       POST /refresh: Refresh access token
       POST /logout: Invalidate tokens
     
     /users:
       GET /: List users (admin only)
       GET /:id: Get user details
       PUT /:id: Update user
       DELETE /:id: Delete user
   ```

6. **Folder Structure Design**
   ```
   project-root/
   ├── docs/                    # Documentation
   │   ├── requirements.md
   │   ├── project-spec.md
   │   ├── api-docs.md
   │   └── phases/
   ├── src/
   │   ├── server/             # Backend code
   │   │   ├── config/         # Configuration
   │   │   ├── middleware/     # Express middleware
   │   │   ├── routes/         # API routes
   │   │   ├── controllers/    # Request handlers
   │   │   ├── services/       # Business logic
   │   │   ├── models/         # Data models
   │   │   ├── utils/          # Utilities
   │   │   └── types/          # TypeScript types
   │   └── client/             # Frontend code (if applicable)
   ├── tests/
   │   ├── unit/
   │   ├── integration/
   │   └── e2e/
   ├── prisma/                 # Database schema
   │   └── schema.prisma
   ├── .env.example
   ├── .gitignore
   ├── docker-compose.yml
   ├── Dockerfile
   ├── package.json
   ├── tsconfig.json
   └── README.md
   ```

**📄 Step 2.2: Generate Specification Document**
```bash
cat > docs/project-spec.md << 'EOF'
# Project Specification

[Auto-generated comprehensive spec with all sections above]
EOF
```

**👤 Step 2.3: User Review & Approval**
```
📋 PROJECT SPECIFICATION GENERATED

Key Decisions:
- Architecture: [pattern]
- Backend: [stack]
- Frontend: [stack]
- Database: [type]
- Deployment: [method]

Complexity: [Simple/Medium/Complex]

📖 Full specification saved to: docs/project-spec.md

❓ Please review the specification. Approve to proceed with phase planning?
[Wait for user confirmation]
```

**Output:** 
- ✅ `docs/project-spec.md` created
- ✅ User approval received
- ✅ Ready for phase planning

---

### Stage 3: Phase Planning
**AI Actions:**
1. **Check for existing phases**:
   ```bash
   if [ -d "docs/phases" ] && [ "$(ls -A docs/phases)" ]; then
       echo "✅ Found existing phase plans. Verifying..."
       ls -la docs/phases/
       echo "SKIPPING GENERATION based on existing docs."
   else
       # PERFORM GENERATION LOGIC
       echo "📅 [4/13] Planning phases..."
       # ... logic to generate phases ...
   fi
   ```

2. **If generating (Fallback)**:
   - Analyze project complexity
   - Break down into phases (P0, P1, P2, P3, etc.):
     - **P0**: Core infrastructure, database, authentication
     - **P1**: Primary features and APIs
     - **P2**: Secondary features and integrations
     - **P3**: Advanced features and optimizations
     - **P4**: Testing, documentation, deployment
   - Create detailed phase documents:
     - Phase objectives
     - Deliverables
     - Acceptance criteria
     - Estimated complexity
   - Generate folder structure document
   - Generate database schema document

**Outputs (Verified or Created):**

**Outputs:**
- `docs/phases/p0-foundation.md`
- `docs/phases/p1-core-features.md`
- `docs/phases/p2-secondary-features.md`
- `docs/phases/p3-advanced-features.md`
- `docs/phases/p4-qa-deployment.md`
- `docs/folder-structure.md`
- `docs/database-schema.md`
- `docs/seed-data-plan.md`

---

### Stage 4: Project Bootstrap
**AI Actions:**
1. Ask user: "Ready to bootstrap the project?"
2. On confirmation:
   - **If `docs/folder-structure.md` exists**: Read it and create folders EXACTLY as specified.
   - **Else**: Create default structure.
   - Create all folders per structure document
   - Generate configuration files:
     - `package.json` / `requirements.txt` / etc.
     - `.env.example`
     - `.gitignore`
     - `docker-compose.yml` (if Docker selected)
     - `Dockerfile` (if Docker selected)
   - Create database schema files
   - Generate initial boilerplate code:
     - Server entry point
     - Database connection
     - Basic middleware
     - Health check endpoint
     - **Seed Script** (`seed.py` or `seed.ts`) enabling realistic data population
   - Install dependencies
   - Initialize git repository
3. **Data Seeding (Crucial for UI/UX)**:
    - If seeding requested:
      - Run: `npm run seed` or `python seed.py`
      - **Verify**: Check that dashboards are NOT empty. An empty dashboard is a failed delivery.
4. Test bootstrap:
   - Verify all files created
   - Check for syntax errors
   - Test server startup
   - Verify database connection

**Output:** Fully bootstrapped project ready for development

---

### Stage 5: Phased Implementation
**AI Actions:**

For each phase (P0 → P1 → P2 → P3 → P4):

1. **Announce Phase Start**
   - Display phase objectives
   - List deliverables

2. **Implementation**
   - Create/modify files per phase requirements
   - Follow best practices and patterns
   - Add inline comments explaining changes
   - Implement error handling
   - Add logging

3. **Phase Testing**
   - Run automated tests
   - Test all endpoints/features
   - Verify acceptance criteria
   - Check for errors/warnings

4. **USER UI VERIFICATION (Crucial)**
   - **Check**: Does this phase include UI changes?
   - **IF YES**:
     1. ensure app is running (`npm run dev`)
     2. **Prompt User to Test**:
        ```markdown
        🎨 **PHASE [X] UI READY FOR TESTING**
        
        The UI for this phase is ready. Please verify it now:
        
        1. **Open**: http://localhost:3000
        2. **Login** (if auth ready): 
           - Admin: admin@test.com / Admin123!
           - User: user@test.com / User123!
        3. **Test These Features**:
           - [Feature 1 created in this phase]
           - [Feature 2 created in this phase]
        
        Does it look correct?
        ```
     3. **Wait** for user confirmation before proceeding.

5. **Gap Analysis**
   - Compare deliverables vs acceptance criteria
   - Identify missing implementations
   - List any issues found

5. **Gap Remediation**
   - Fix all identified gaps
   - Re-test until all criteria met

6. **Phase Completion Gate**
   - Show phase summary
   - Display test results
   - Ask user: "Phase complete. Continue to next phase?"
   - Allow user override to proceed even with gaps

7. **Move to Next Phase**
   - Only proceed after user approval
   - Repeat process for next phase

**Critical Rules:**
- ❌ **NEVER** skip to next phase without completing current phase
- ❌ **NEVER** ignore test failures
- ✅ **ALWAYS** prompt user to verify UI changes after EACH phase
- ✅ **ALWAYS** provide test credentials and URL in verification prompts
- ✅ **ALWAYS** wait for user approval before next phase
- ✅ **ALWAYS** document what was implemented
- ✅ **ALWAYS** test thoroughly

---

### Stage 6: Final Validation & Testing
**AI Actions:**

1. **End-to-End Testing**
   - Test complete user flows
   - Verify all integrations
   - Check error handling
   - Validate security measures

2. **Generate Test Suite**
   - Create unit tests
   - Create integration tests
   - Create E2E tests
   - Use appropriate framework (Jest, Pytest, etc.)

3. **Run All Tests**
   - Execute full test suite
   - Report coverage
   - Fix any failures

4. **Manual Testing Documentation**
   - Create `docs/manual-testing-guide.md`
   - Step-by-step testing instructions
   - Expected results for each test
   - Screenshots/examples where helpful
   - Browser testing checklist

5. **Production Readiness Checklist**
   - Environment variables documented
   - Security best practices followed
   - Error handling comprehensive
   - Logging implemented
   - Performance optimized
   - Documentation complete

**Outputs:**
- Complete test suite in `tests/` or `__tests__/`
- `docs/manual-testing-guide.md`
- `docs/production-checklist.md`
- Test coverage report

---

### Stage 7: Automatic Data Seeding & Testing (BEFORE USER HANDOFF)

**Philosophy: NEVER hand over an untested app. Always seed data and verify everything works.**

---

#### Step 1: Create and Run Seed Script

**AI Actions:**

1. **Generate Seed Script** with realistic test data:

**For Node.js (TypeScript):**
```typescript
// scripts/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database with test data...\n');

  // Create test users with known credentials
  const testUsers = [
    {
      email: 'admin@test.com',
      password: 'Admin123!',
      name: 'Admin User',
      role: 'admin'
    },
    {
      email: 'user@test.com',
      password: 'User123!',
      name: 'Test User',
      role: 'user'
    },
    {
      email: 'demo@test.com',
      password: 'Demo123!',
      name: 'Demo User',
      role: 'user'
    }
  ];

  console.log('Creating test users...');
  for (const user of testUsers) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        password: hashedPassword,
        name: user.name,
        role: user.role
      }
    });
    console.log(`✅ Created user: ${user.email}`);
  }

  // Create sample data (e.g., invoices, posts, products, etc.)
  console.log('\nCreating sample data...');
  // ... create 10-20 sample records for each entity
  
  console.log('\n✅ Database seeded successfully!\n');
}

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

**For Python (FastAPI):**
```python
# scripts/seed.py
import asyncio
from sqlalchemy.ext.asyncio import AsyncSession
from database import engine, get_db
from models import User
from auth import hash_password

async def seed():
    print("🌱 Seeding database with test data...\n")
    
    async with AsyncSession(engine) as session:
        # Create test users
        test_users = [
            {
                "email": "admin@test.com",
                "password": "Admin123!",
                "name": "Admin User",
                "role": "admin"
            },
            {
                "email": "user@test.com",
                "password": "User123!",
                "name": "Test User",
                "role": "user"
            },
            {
                "email": "demo@test.com",
                "password": "Demo123!",
                "name": "Demo User",
                "role": "user"
            }
        ]
        
        print("Creating test users...")
        for user_data in test_users:
            user = User(
                email=user_data["email"],
                password=hash_password(user_data["password"]),
                name=user_data["name"],
                role=user_data["role"]
            )
            session.add(user)
            print(f"✅ Created user: {user_data['email']}")
        
        await session.commit()
        
        # Create sample data
        print("\nCreating sample data...")
        # ... create 10-20 sample records
        
        print("\n✅ Database seeded successfully!\n")

if __name__ == "__main__":
    asyncio.run(seed())
```

2. **Add seed command to package.json:**
```json
{
  "scripts": {
    "seed": "ts-node scripts/seed.ts",
    "seed:fresh": "npm run db:reset && npm run seed"
  }
}
```

3. **Run seeding automatically:**
```bash
echo "🌱 Seeding database with test data..."
npm run seed

# Verify seeding worked
echo "Verifying seed data..."
# Check database has records
```

---

#### Step 2: Automatic Testing (Before User Handoff)

**AI Actions:**

1. **Start the application:**
```bash
# Start backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 5

# Start frontend (if applicable)
cd client && npm run dev &
FRONTEND_PID=$!

# Wait for frontend to be ready
sleep 10
```

2. **Run automated tests:**
```bash
echo "🧪 Running automated tests..."

# Test 1: Health check
curl -s http://localhost:4000/health | jq

# Test 2: User registration
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!","name":"Test"}'

# Test 3: User login (with seeded credentials)
LOGIN_RESPONSE=$(curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"Admin123!"}')

TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.access_token')

# Test 4: Protected endpoint
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:4000/api/users/me

# Test 5: Main features
# ... test each core feature
```

3. **Verify UI loads:**
```bash
# Check if frontend is accessible
curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend accessible"

# Take screenshot (if possible)
# Open browser for visual verification
```

---

#### Step 3: User Handoff with Complete Details

**AI Presents:**

```markdown
🎉 **YOUR APPLICATION IS READY!**

I've built, tested, and verified everything. Here's how to use it:

---

## 🚀 START THE APPLICATION

**Run this command:**
```bash
npm run dev
```

**What you'll see:**
```
✅ Server running on http://localhost:4000
✅ Frontend running on http://localhost:3000
✅ Database connected
```

**Wait 10-15 seconds for everything to start, then continue below.**

---

## 🌐 OPEN YOUR APPLICATION

**Click this link or copy to your browser:**
👉 **http://localhost:3000**

**You should see:** Your application's home page with login/signup options

---

## 🔐 TEST LOGIN (I've already created test accounts for you!)

**Use these credentials to login:**

### Admin Account
- **Email:** `admin@test.com`
- **Password:** `Admin123!`
- **Access:** Full admin privileges

### Regular User Account
- **Email:** `user@test.com`
- **Password:** `User123!`
- **Access:** Standard user access

### Demo Account
- **Email:** `demo@test.com`
- **Password:** `Demo123!`
- **Access:** Demo/guest access

**To test login:**
1. Open http://localhost:3000
2. Click "Login"
3. Enter one of the emails above
4. Enter the corresponding password
5. Click "Sign In"
6. ✅ You should be redirected to the dashboard

---

## ✅ WHAT I'VE ALREADY TESTED

I've automatically verified:
- ✅ Database connection working
- ✅ All API endpoints responding
- ✅ User registration working
- ✅ User login working (tested with admin@test.com)
- ✅ Authentication tokens working
- ✅ Protected routes working
- ✅ Frontend builds successfully
- ✅ Sample data loaded (10+ records)

**All tests passed!** Your app is production-ready.

---

## 🎨 EXPLORE THE UI

**I strongly encourage you to:**
1. ✅ Login with the test accounts above
2. ✅ Click around and explore all features
3. ✅ Try creating new records
4. ✅ Test the main workflows
5. ✅ Check the dashboard/analytics
6. ✅ Verify everything looks good

**This is important!** Visual testing helps catch UI issues that automated tests miss.

---

## 📊 SAMPLE DATA INCLUDED

I've pre-loaded your database with realistic test data:
- 3 test user accounts (credentials above)
- 10-15 sample [invoices/posts/products/etc.]
- Sample categories/tags
- Realistic timestamps and relationships

**Why?** So your app looks alive and professional, not empty and broken.

---

## 🧪 API TESTING (Optional)

**If you want to test the API directly:**

**Health Check:**
```bash
curl http://localhost:4000/health
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"Admin123!"}'
```

**Get User Profile:**
```bash
# First login to get token, then:
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:4000/api/users/me
```

---

## 📁 PROJECT STRUCTURE

Your project is organized as:
```
project/
├── src/
│   ├── server/          # Backend code
│   ├── client/          # Frontend code
│   └── database/        # Database schemas
├── tests/               # Automated tests
├── docs/                # Documentation
├── scripts/             # Utility scripts (including seed.ts)
└── .env                 # Environment variables
```

---

## 🔄 USEFUL COMMANDS

**Start development:**
```bash
npm run dev
```

**Run tests:**
```bash
npm test
```

**Seed database:**
```bash
npm run seed
```

**Reset database:**
```bash
npm run db:reset && npm run seed
```

**Build for production:**
```bash
npm run build
```

---

## 🚀 NEXT STEPS

1. ✅ **Test the app** - Login and explore the UI
2. ✅ **Verify features** - Make sure everything works as expected
3. ✅ **Customize** - Add your own data, tweak the UI
4. ✅ **Deploy** - When ready, I can guide you through deployment

**Ready to deploy?** Just say "Let's deploy" and I'll provide step-by-step guides for:
- Vercel (frontend) - Free, 5 minutes
- Railway (backend) - Free $5/month, 10 minutes
- Supabase (database) - Free 500MB, 5 minutes

---

## 💡 TROUBLESHOOTING

**If the app doesn't start:**
```bash
# Make sure dependencies are installed
npm install

# Make sure database is running
docker-compose up -d

# Check for errors in terminal
```

**If you can't login:**
- Make sure you're using the exact credentials above
- Check that the database is running
- Verify the app is fully started (wait 15 seconds)

**If you see errors:**
- Check the terminal for error messages
- Make sure ports 3000 and 4000 are not in use
- Try restarting: `npm run dev`

---

## 🎉 YOU'RE ALL SET!

Your application is **fully functional** and **production-ready**.

**What to do now:**
1. Open http://localhost:3000
2. Login with admin@test.com / Admin123!
3. Explore and enjoy!

Questions? Just ask! 😊
```

---

#### Step 4: Open Browser Automatically (If Possible)

**AI Actions:**

```bash
# Try to open browser automatically
if command -v open &> /dev/null; then
    # macOS
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    # Linux
    xdg-open http://localhost:3000
elif command -v start &> /dev/null; then
    # Windows
    start http://localhost:3000
fi

echo "🌐 Opening http://localhost:3000 in your browser..."
echo "If it doesn't open automatically, click the link above!"
```

---

### Critical Rules for User Handoff

**✅ ALWAYS DO:**
1. ✅ Seed database with test data BEFORE handoff
2. ✅ Create test user accounts with known passwords
3. ✅ Run automated tests to verify everything works
4. ✅ Test login functionality specifically
5. ✅ Provide complete URLs and commands
6. ✅ Include test credentials prominently
7. ✅ Encourage UI testing ("Open and explore!")
8. ✅ Pre-load sample data so app looks alive
9. ✅ Try to open browser automatically
10. ✅ Provide troubleshooting steps

**❌ NEVER DO:**
1. ❌ Hand over an empty database
2. ❌ Skip testing login functionality
3. ❌ Provide vague instructions
4. ❌ Show time estimates to user
5. ❌ Assume user knows how to test
6. ❌ Hand over without verifying it works
7. ❌ Forget to provide test credentials

---

---

## 🧪 AUTOMATED TESTING & VERIFICATION (Non-Technical Users)

### Philosophy
**Non-technical users should NOT need to know how to test manually. We automate everything possible.**

---

### Step 1: Create Automated Verification Scripts

**AI Actions:**

1. **For Node.js Projects**, create `scripts/verify-project.js`:
```javascript
// Auto-generated verification script
const axios = require('axios');
const chalk = require('chalk');

async function verifyProject() {
  console.log(chalk.blue('\n🧪 Running Automated Verification...\n'));
  
  const checks = [];
  
  // Check 1: Environment Variables
  console.log('Checking environment variables...');
  const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET', 'PORT'];
  const missingVars = requiredEnvVars.filter(v => !process.env[v]);
  
  if (missingVars.length === 0) {
    console.log(chalk.green('✅ All environment variables set'));
    checks.push(true);
  } else {
    console.log(chalk.red(`❌ Missing: ${missingVars.join(', ')}`));
    checks.push(false);
  }
  
  // Check 2: Database Connection
  console.log('\nChecking database connection...');
  try {
    // Test database connection
    await testDatabaseConnection();
    console.log(chalk.green('✅ Database connected successfully'));
    checks.push(true);
  } catch (error) {
    console.log(chalk.red('❌ Database connection failed'));
    console.log(chalk.yellow(`   Error: ${error.message}`));
    checks.push(false);
  }
  
  // Check 3: API Endpoints
  console.log('\nChecking API endpoints...');
  const endpoints = [
    { method: 'GET', path: '/health', name: 'Health Check' },
    { method: 'POST', path: '/api/auth/register', name: 'Registration' },
    { method: 'POST', path: '/api/auth/login', name: 'Login' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await axios[endpoint.method.toLowerCase()](
        `http://localhost:${process.env.PORT}${endpoint.path}`
      );
      console.log(chalk.green(`✅ ${endpoint.name} working`));
      checks.push(true);
    } catch (error) {
      console.log(chalk.red(`❌ ${endpoint.name} failed`));
      checks.push(false);
    }
  }
  
  // Check 4: Frontend Build
  console.log('\nChecking frontend build...');
  try {
    const { execSync } = require('child_process');
    execSync('npm run build --prefix client', { stdio: 'ignore' });
    console.log(chalk.green('✅ Frontend builds successfully'));
    checks.push(true);
  } catch (error) {
    console.log(chalk.red('❌ Frontend build failed'));
    checks.push(false);
  }
  
  // Summary
  console.log(chalk.blue('\n📊 VERIFICATION SUMMARY\n'));
  const passed = checks.filter(c => c).length;
  const total = checks.length;
  
  if (passed === total) {
    console.log(chalk.green(`🎉 All checks passed! (${passed}/${total})`));
    console.log(chalk.green('\n✅ Your project is ready to use!\n'));
  } else {
    console.log(chalk.yellow(`⚠️  ${passed}/${total} checks passed`));
    console.log(chalk.yellow('\nPlease fix the issues above before deploying.\n'));
  }
}

verifyProject().catch(console.error);
```

2. **For Python Projects**, create `scripts/verify_project.py`:
```python
#!/usr/bin/env python3
import os
import sys
import requests
from colorama import Fore, Style, init

init(autoreset=True)

def verify_project():
    print(f"\n{Fore.BLUE}🧪 Running Automated Verification...\n")
    
    checks = []
    
    # Check 1: Environment Variables
    print("Checking environment variables...")
    required_vars = ['DATABASE_URL', 'JWT_SECRET', 'PORT']
    missing_vars = [v for v in required_vars if not os.getenv(v)]
    
    if not missing_vars:
        print(f"{Fore.GREEN}✅ All environment variables set")
        checks.append(True)
    else:
        print(f"{Fore.RED}❌ Missing: {', '.join(missing_vars)}")
        checks.append(False)
    
    # Check 2: Database Connection
    print("\nChecking database connection...")
    try:
        from database import test_connection
        test_connection()
        print(f"{Fore.GREEN}✅ Database connected successfully")
        checks.append(True)
    except Exception as e:
        print(f"{Fore.RED}❌ Database connection failed")
        print(f"{Fore.YELLOW}   Error: {str(e)}")
        checks.append(False)
    
    # Check 3: API Endpoints
    print("\nChecking API endpoints...")
    port = os.getenv('PORT', '8000')
    endpoints = [
        {'method': 'GET', 'path': '/health', 'name': 'Health Check'},
        {'method': 'POST', 'path': '/api/auth/register', 'name': 'Registration'},
        {'method': 'POST', 'path': '/api/auth/login', 'name': 'Login'}
    ]
    
    for endpoint in endpoints:
        try:
            url = f"http://localhost:{port}{endpoint['path']}"
            response = requests.request(endpoint['method'], url, timeout=5)
            print(f"{Fore.GREEN}✅ {endpoint['name']} working")
            checks.append(True)
        except Exception:
            print(f"{Fore.RED}❌ {endpoint['name']} failed")
            checks.append(False)
    
    # Summary
    print(f"\n{Fore.BLUE}📊 VERIFICATION SUMMARY\n")
    passed = sum(checks)
    total = len(checks)
    
    if passed == total:
        print(f"{Fore.GREEN}🎉 All checks passed! ({passed}/{total})")
        print(f"{Fore.GREEN}\n✅ Your project is ready to use!\n")
    else:
        print(f"{Fore.YELLOW}⚠️  {passed}/{total} checks passed")
        print(f"{Fore.YELLOW}\nPlease fix the issues above before deploying.\n")

if __name__ == '__main__':
    verify_project()
```

3. **Add to package.json** (Node.js):
```json
{
  "scripts": {
    "verify": "node scripts/verify-project.js",
    "test:all": "npm run verify && npm test"
  }
}
```

---

### Step 2: Create Beginner-Friendly Testing Guide

**AI Creates `docs/how-to-test.md`:**

```markdown
# How to Test Your Application (Non-Technical Guide)

## 🎯 What is Testing?

Testing means checking if your application works correctly. Think of it like test-driving a car before buying it.

---

## 📋 Quick Start (Automated)

**The easiest way to test everything:**

```bash
npm run verify
```

**What this does:**
- ✅ Checks if all required settings are configured
- ✅ Tests database connection
- ✅ Tests all API endpoints
- ✅ Verifies the frontend builds correctly

**Expected output:**
```
🧪 Running Automated Verification...

✅ All environment variables set
✅ Database connected successfully
✅ Health Check working
✅ Registration working
✅ Login working
✅ Frontend builds successfully

🎉 All checks passed! (6/6)
✅ Your project is ready to use!
```

---

## 🖥️ Manual Testing (Step-by-Step)

### Step 1: Start the Application

**Open your terminal and run:**
```bash
npm run dev
```

**What you'll see:**
```
Server running on http://localhost:4000
Frontend running on http://localhost:3000
Database connected ✅
```

**What this means:**
Your application is now running on your computer. You can access it in your web browser.

**If you see an error:**
- Check the troubleshooting section below
- Make sure you ran `npm install` first
- Verify your `.env` file exists

---

### Step 2: Open in Browser

1. Open your web browser (Chrome, Firefox, or Safari)
2. Go to: **http://localhost:3000**
3. You should see your application's home page

**Expected result:**
- ✅ Page loads without errors
- ✅ You see the login/signup page
- ✅ No error messages in the browser console

**If the page doesn't load:**
- Wait 10-15 seconds (first load can be slow)
- Refresh the page (F5 or Cmd+R)
- Check the terminal for error messages

---

### Step 3: Test User Registration

**What to do:**
1. Click the **"Sign Up"** or **"Register"** button
2. Fill in the form:
   - Email: `test@example.com`
   - Password: `Test123!`
   - Name: `Test User`
3. Click **"Create Account"**

**Expected result:**
- ✅ Success message appears
- ✅ You're redirected to the dashboard or login page
- ✅ No error messages

**If it doesn't work:**
- Check if email is already registered
- Make sure password meets requirements
- Check browser console for errors (F12)

---

### Step 4: Test Login

**What to do:**
1. Go to the login page
2. Enter your credentials:
   - Email: `test@example.com`
   - Password: `Test123!`
3. Click **"Sign In"**

**Expected result:**
- ✅ Success message appears
- ✅ You're redirected to the dashboard
- ✅ You see your name or email displayed

**If it doesn't work:**
- Double-check your email and password
- Make sure you registered first
- Try resetting your password

---

### Step 5: Test Main Features

**For each feature in your app, follow this pattern:**

1. **Navigate to the feature** (e.g., "Create Invoice")
2. **Fill in the form** with test data
3. **Submit the form**
4. **Verify the result** (success message, data appears)

**Example: Creating an Invoice**
1. Click **"New Invoice"**
2. Fill in:
   - Customer: `Test Customer`
   - Amount: `$100.00`
   - Due Date: `Tomorrow's date`
3. Click **"Create Invoice"**
4. ✅ Invoice appears in the list

---

## 🔍 What to Look For

### ✅ Good Signs:
- Pages load quickly (under 3 seconds)
- Forms submit successfully
- Data appears after creation
- No error messages
- Buttons and links work
- Images load correctly

### ❌ Bad Signs:
- Error messages appear
- Pages don't load
- Forms don't submit
- Data doesn't save
- Buttons don't respond
- Blank pages

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to database"

**Solution:**
```bash
# Make sure Docker is running
docker ps

# If not, start it:
docker-compose up -d

# Wait 10 seconds, then try again
```

---

### Issue: "Port 3000 already in use"

**Solution:**
```bash
# Find what's using the port
lsof -i :3000

# Stop it (replace PID with the number shown)
kill -9 PID

# Or use a different port
PORT=3001 npm run dev
```

---

### Issue: "Module not found"

**Solution:**
```bash
# Reinstall dependencies
npm install

# Clear cache and reinstall
rm -rf node_modules
npm install
```

---

## 📱 Testing on Different Devices

### Desktop Browser
- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### Mobile (Optional)
1. Find your computer's IP address:
   ```bash
   # Mac/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```
2. On your phone, go to: `http://YOUR_IP:3000`
3. Test the same features

---

## ✅ Testing Checklist

Before deploying, make sure:

- [ ] Automated verification passes (`npm run verify`)
- [ ] User registration works
- [ ] User login works
- [ ] All main features work
- [ ] Forms validate correctly
- [ ] Error messages are clear
- [ ] Data persists after refresh
- [ ] Logout works
- [ ] No console errors
- [ ] Mobile responsive (optional)

---

## 🎉 Next Steps

Once all tests pass:
1. ✅ Your app is ready for deployment
2. 📖 See the deployment guide: `docs/deployment-guide.md`
3. 🚀 Choose a platform (Vercel, Railway, etc.)
4. 🌐 Deploy and share with users!

---

## 💡 Need Help?

If you're stuck:
1. Check the error message carefully
2. Look in the troubleshooting section
3. Check the terminal output
4. Search the error message online
5. Ask for help with the specific error message
```

---

### Step 3: Run Automated Verification

**AI Actions After Implementation:**

```bash
echo "🧪 Running automated verification..."
npm run verify

# Or for Python
python scripts/verify_project.py
```

**Present Results to User:**
```markdown
✅ VERIFICATION COMPLETE

**Results:**
- Database Connection: ✅ Connected successfully
- API Endpoints: ✅ All 12 endpoints working
- Frontend Build: ✅ Build successful (2.3 MB)
- Environment Variables: ✅ All required variables set
- Security Checks: ✅ No vulnerabilities found
- Performance: ✅ Average response time: 45ms

🎉 Your project is ready to use!

**What to do next:**

1. **Test it yourself:**
   - Open http://localhost:3000 in your browser
   - Follow the testing guide: `docs/how-to-test.md`

2. **Deploy to production:**
   - See deployment guide: `docs/deployment-guide.md`
   - I recommend Vercel (frontend) + Railway (backend)

3. **Share with users:**
   - Once deployed, share your live URL
   - Monitor usage in platform dashboards

Would you like me to guide you through deployment?
```

---

## 🚀 DEPLOYMENT GUIDES (Non-Technical Friendly)

### Platform Recommendations & Comparison

**AI Analysis:**
Based on your project type, here are the best deployment platforms:

| Platform | Best For | Free Tier | Difficulty | Setup Time | Database Included |
|----------|----------|-----------|------------|------------|-------------------|
| **Vercel** | Frontend, Next.js | ✅ Generous (100GB bandwidth) | ⭐ Easy | 5 min | ❌ (use Supabase) |
| **Railway** | Full-stack apps | ✅ $5/month credit | ⭐⭐ Medium | 10 min | ✅ PostgreSQL |
| **Render** | Backend + Database | ✅ Limited (750 hrs/month) | ⭐⭐ Medium | 15 min | ✅ PostgreSQL |
| **Fly.io** | Docker apps | ✅ Limited (3 VMs) | ⭐⭐⭐ Advanced | 20 min | ✅ PostgreSQL |
| **Supabase** | Database + Auth | ✅ Generous (500MB DB) | ⭐ Easy | 5 min | ✅ PostgreSQL |
| **Netlify** | Static sites, Jamstack | ✅ Generous (100GB bandwidth) | ⭐ Easy | 5 min | ❌ |
| **Heroku** | Full-stack apps | ❌ No free tier (paid only) | ⭐⭐ Medium | 15 min | ✅ PostgreSQL |

**My Recommendation for Your Project:**

**For SaaS/Full-Stack Apps:**
- **Frontend**: Vercel (free, easy, perfect for React/Next.js)
- **Backend**: Railway (free $5/month, supports PostgreSQL, easy setup)
- **Database**: Included with Railway OR use Supabase (more generous limits)

**For Static Sites/Landing Pages:**
- **Hosting**: Vercel or Netlify (both excellent, free, easy)
- **CMS**: Supabase (if you need a database)

**For API-Only Projects:**
- **Backend**: Railway or Render (both include database)
- **Database**: Included OR use Supabase separately

---

### 📘 Deployment Guide: Vercel (Frontend)

**Best for:** React, Next.js, Vue, Static sites  
**Free tier:** 100GB bandwidth, unlimited projects  
**Setup time:** 5 minutes

---

#### Step 1: Create Vercel Account

1. Go to [https://vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (recommended)
4. Authorize Vercel to access your GitHub

**Why GitHub?** Vercel will automatically deploy when you push code to GitHub.

---

#### Step 2: Prepare Your Project

**AI will create `vercel.json` for you:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

**For Next.js projects:** No configuration needed! Vercel auto-detects.

---

#### Step 3: Deploy from GitHub

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Go to [https://vercel.com/new](https://vercel.com/new)
3. Click **"Import Project"**
4. Select your GitHub repository
5. Vercel auto-detects settings ✅
6. Click **"Deploy"**

---

#### Step 4: Configure Environment Variables

**In Vercel Dashboard:**
1. Go to your project → **Settings** → **Environment Variables**
2. Add each variable:

```
NEXT_PUBLIC_API_URL = https://your-backend.railway.app
NEXT_PUBLIC_STRIPE_KEY = pk_live_...
```

**AI will provide all required variables in a file: `deployment/vercel-env.txt`**

---

#### Step 5: Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `myapp.com`)
3. Update DNS records (Vercel provides instructions)
4. Wait 5-10 minutes for DNS propagation

---

**✅ Deployment Complete!**

Your app is live at: `https://your-app.vercel.app`

**Automatic Updates:** Every time you push to GitHub, Vercel auto-deploys! 🎉

---

### 📘 Deployment Guide: Railway (Backend + Database)

**Best for:** Node.js, Python, Go backends with PostgreSQL  
**Free tier:** $5/month credit (enough for small apps)  
**Setup time:** 10 minutes

---

#### Step 1: Create Railway Account

1. Go to [https://railway.app](https://railway.app)
2. Click **"Login with GitHub"**
3. Authorize Railway
4. You get **$5 free credit every month** 🎉

---

#### Step 2: Prepare Your Project

**AI will create `railway.json` for you:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**For Python projects:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "gunicorn main:app",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

---

#### Step 3: Deploy from GitHub

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. Go to [https://railway.app/new](https://railway.app/new)
3. Click **"Deploy from GitHub repo"**
4. Select your repository
5. Railway auto-detects your app ✅

---

#### Step 4: Add PostgreSQL Database

1. In your Railway project, click **"New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway creates the database instantly ✅
4. Connection string is auto-configured as `DATABASE_URL` ✅

**No manual setup needed!** Railway automatically connects your app to the database.

---

#### Step 5: Configure Environment Variables

**In Railway Dashboard:**
1. Click on your service
2. Go to **"Variables"** tab
3. Add variables:

```
DATABASE_URL = (auto-set by Railway)
JWT_SECRET = your-secret-key-here
FRONTEND_URL = https://your-app.vercel.app
PORT = (auto-set by Railway)
```

**AI will provide all required variables in: `deployment/railway-env.txt`**

---

#### Step 6: Generate Domain

1. Click on your service
2. Go to **"Settings"** tab
3. Click **"Generate Domain"**
4. Railway provides: `your-app.up.railway.app`

---

**✅ Deployment Complete!**

Your API is live at: `https://your-app.up.railway.app`

**Automatic Updates:** Every push to GitHub auto-deploys! 🎉

---

### 📘 Deployment Guide: Supabase (Database + Auth)

**Best for:** PostgreSQL database, Authentication, Storage  
**Free tier:** 500MB database, 50,000 monthly active users  
**Setup time:** 5 minutes

---

#### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"**
3. Sign in with GitHub
4. Click **"New project"**
5. Fill in:
   - **Name**: `my-app-db`
   - **Database Password**: (generate strong password)
   - **Region**: Choose closest to your users
6. Click **"Create new project"**
7. Wait 2 minutes for setup ⏳

---

#### Step 2: Get Database Connection String

1. Go to **Settings** → **Database**
2. Scroll to **"Connection string"**
3. Select **"URI"**
4. Copy the connection string:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```

---

#### Step 3: Update Your Application

**AI will update your `.env` file:**
```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
```

---

#### Step 4: Run Database Migrations

**AI will create a migration script:**
```bash
# For Node.js (Prisma)
npx prisma migrate deploy

# For Python (Alembic)
alembic upgrade head

# Or use Supabase SQL Editor
```

**In Supabase Dashboard:**
1. Go to **SQL Editor**
2. Paste your schema SQL
3. Click **"Run"**

---

#### Step 5: Setup Authentication (Optional)

**If using Supabase Auth:**

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Copy your API keys:
   - **Project URL**: `https://xxx.supabase.co`
   - **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**AI will configure your app to use Supabase Auth**

---

**✅ Database Ready!**

Your database is live and accessible from anywhere!

**Connection string:** Use in Railway, Vercel, or local development

---

### 📘 Deployment Guide: Render (Full-Stack Alternative)

**Best for:** Full-stack apps, Docker, Background workers  
**Free tier:** 750 hours/month (enough for one app)  
**Setup time:** 15 minutes

---

#### Step 1: Create Render Account

1. Go to [https://render.com](https://render.com)
2. Click **"Get Started"**
3. Sign up with GitHub

---

#### Step 2: Deploy Web Service

1. Click **"New"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `my-app-backend`
   - **Environment**: `Node` or `Python`
   - **Build Command**: `npm install` or `pip install -r requirements.txt`
   - **Start Command**: `npm start` or `gunicorn main:app`
   - **Plan**: **Free**

---

#### Step 3: Add PostgreSQL Database

1. Click **"New"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `my-app-db`
   - **Plan**: **Free**
3. Click **"Create Database"**
4. Copy **Internal Database URL**

---

#### Step 4: Connect Database to Web Service

1. Go to your web service
2. **Environment** → **Add Environment Variable**
3. Add:
   ```
   DATABASE_URL = [paste internal database URL]
   ```

---

**✅ Deployment Complete!**

Your app is live at: `https://my-app-backend.onrender.com`

**Note:** Free tier apps sleep after 15 minutes of inactivity (first request takes ~30 seconds to wake up)

---

### 🔧 Prerequisites & Troubleshooting

#### Automated Prerequisites Check

**AI will run this automatically:**

```bash
#!/bin/bash
echo "🔍 Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found"
    echo "📥 Install from: https://nodejs.org/"
    echo "   Or use alternative: GitHub Codespaces (no installation needed)"
    echo ""
    echo "Would you like to:"
    echo "1. Install Node.js locally"
    echo "2. Use GitHub Codespaces (cloud-based, no installation)"
    echo "3. Use Replit (browser-based IDE)"
else
    echo "✅ Node.js $(node --version) found"
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker not found"
    echo ""
    echo "No problem! You have 3 options:"
    echo ""
    echo "Option 1: Install Docker (Recommended)"
    echo "  - Download: https://www.docker.com/get-started"
    echo "  - Takes 5 minutes to install"
    echo "  - Best for local development"
    echo ""
    echo "Option 2: Use Cloud Database (No Installation)"
    echo "  - I can set up a free PostgreSQL database on Supabase"
    echo "  - No Docker needed"
    echo "  - Just say: 'Use Supabase database'"
    echo ""
    echo "Option 3: Use SQLite (Simplest)"
    echo "  - No installation needed"
    echo "  - Works immediately"
    echo "  - Good for testing, not for production"
    echo "  - Just say: 'Use SQLite instead'"
    echo ""
    read -p "Which option would you prefer? (1/2/3): " choice
else
    echo "✅ Docker $(docker --version) found"
fi

# Check Git
if ! command -v git &> /dev/null; then
    echo "❌ Git not found"
    echo "📥 Install from: https://git-scm.com/"
else
    echo "✅ Git $(git --version) found"
fi

echo ""
echo "✅ Prerequisites check complete!"
```

---

#### Common Issues & Solutions

**Issue: "Docker is not available"**

**AI Response:**
```markdown
No problem! You have 3 options:

**Option 1: Install Docker (Recommended)**
- Download: https://www.docker.com/get-started
- Takes 5 minutes to install
- Easiest for local development
- Works on Mac, Windows, Linux

**Option 2: Use Cloud Database (No Installation)**
- I can set up a free PostgreSQL database on Supabase
- No Docker needed
- Takes 5 minutes
- Free tier: 500MB database
- Just say: "Use Supabase database"

**Option 3: Use SQLite (Simplest)**
- No installation needed
- Works immediately
- Good for testing, not recommended for production
- Just say: "Use SQLite instead"

Which option would you prefer?
```

---

**Issue: "Port already in use"**

**AI Response:**
```markdown
Another application is using port 3000. Here's how to fix it:

**Option 1: Stop the other application**
```bash
# Find what's using the port
lsof -i :3000

# Stop it (replace PID with the number shown)
kill -9 PID
```

**Option 2: Use a different port**
I can configure your app to use port 3001 instead.
Just say: "Use port 3001"

**Option 3: Automatic fix**
I can create a script that automatically finds an available port.
Just say: "Auto-select port"

Which option would you prefer?
```

---

**Issue: "npm install fails"**

**AI Response:**
```markdown
Let's fix this step by step:

**Step 1: Clear npm cache**
```bash
npm cache clean --force
```

**Step 2: Delete node_modules and package-lock.json**
```bash
rm -rf node_modules package-lock.json
```

**Step 3: Reinstall**
```bash
npm install
```

**If still failing:**
- Check your Node.js version: `node --version`
- Required version: 16.x or higher
- Update Node.js: https://nodejs.org/

**Alternative:**
Use `yarn` instead of `npm`:
```bash
npm install -g yarn
yarn install
```

Would you like me to try these fixes automatically?
```

---

**Issue: "Database connection failed"**

**AI Response:**
```markdown
Let's troubleshoot the database connection:

**Step 1: Check if database is running**
```bash
# For Docker
docker ps | grep postgres

# If not running, start it
docker-compose up -d
```

**Step 2: Verify connection string**
```bash
# Check your .env file
cat .env | grep DATABASE_URL

# Correct format:
# DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

**Step 3: Test connection**
```bash
# For PostgreSQL
psql "$DATABASE_URL"

# If this works, your database is fine
# If not, check username/password
```

**Alternative Solutions:**

**Option 1: Use Supabase (Cloud Database)**
- No local setup needed
- Free tier available
- I can configure this for you
- Say: "Use Supabase instead"

**Option 2: Reset Database**
```bash
docker-compose down -v
docker-compose up -d
npm run migrate
```

Which option would you like to try?
```

---

### 📚 Beginner-Friendly Explanations

**What is Docker?**
> **Simple explanation:** Docker is like a "box" that contains your application and everything it needs to run. This makes it easy to run your app on any computer without installation headaches.
> 
> **Do you need it?** Not always! I can set up your project without Docker using cloud services like Supabase.

**What is PostgreSQL?**
> **Simple explanation:** PostgreSQL is a database - think of it as an organized filing cabinet for your app's data (users, posts, invoices, etc.).
> 
> **Alternatives:** 
> - SQLite (simpler, no setup, good for small apps)
> - MongoDB (different style, flexible structure)
> - Supabase (cloud-hosted PostgreSQL, free tier)

**What is JWT?**
> **Simple explanation:** JWT is like a "ticket" that proves a user is logged in. When users log in, they get a ticket, and they show this ticket for every request.
> 
> **Why it's good:** Secure, scalable, works great for modern apps and mobile apps.

**What is an API?**
> **Simple explanation:** An API is how your frontend (what users see) talks to your backend (where data is stored). Like a waiter taking orders from customers to the kitchen.

**What is Deployment?**
> **Simple explanation:** Deployment means putting your app on the internet so others can use it. Like moving from your computer to a public website.
> 
> **Platforms:** Vercel (frontend), Railway (backend), Render, etc. (I'll recommend the best one for you)

**What is a Domain?**
> **Simple explanation:** A domain is your website's address, like `google.com` or `myapp.com`. Without a custom domain, you get a free subdomain like `myapp.vercel.app`.
> 
> **Do you need one?** Not required! Free subdomains work great. Custom domains cost $10-15/year.

**What is Environment Variable?**
> **Simple explanation:** Environment variables are secret settings for your app (like passwords, API keys). They're kept separate from your code for security.
> 
> **Example:** `DATABASE_URL`, `JWT_SECRET`, `STRIPE_KEY`

---

### 📋 Post-Deployment Checklist

**AI Creates `docs/deployment-checklist.md`:**

```markdown
# Deployment Checklist

## ✅ Pre-Deployment

- [ ] All tests passing locally (`npm run verify`)
- [ ] Environment variables documented in `.env.example`
- [ ] Database migrations ready
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors or warnings
- [ ] Code pushed to GitHub
- [ ] README.md updated with project info

## ✅ During Deployment

### Frontend (Vercel)
- [ ] Project deployed to Vercel
- [ ] Environment variables set in Vercel dashboard
- [ ] Build successful
- [ ] Custom domain connected (optional)

### Backend (Railway)
- [ ] Project deployed to Railway
- [ ] PostgreSQL database created
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Health check endpoint working

### Database (Supabase - if separate)
- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Connection string added to backend
- [ ] Authentication configured (if using)

## ✅ Post-Deployment

- [ ] Test live URL (frontend)
- [ ] Test API endpoints (backend)
- [ ] Verify database connection
- [ ] Test user registration
- [ ] Test user login
- [ ] Test main features
- [ ] Check error logging
- [ ] Monitor performance
- [ ] Set up uptime monitoring (optional)

## 🎉 Your App is Live!

**URLs:**
- Frontend: https://your-app.vercel.app
- Backend API: https://your-api.railway.app
- Database: Supabase dashboard

**Next Steps:**
1. ✅ Share your app with users
2. 📊 Monitor usage in platform dashboards
3. 🌐 Set up custom domain (optional)
4. 📈 Configure analytics (optional)
5. 🔔 Set up error tracking (Sentry, optional)

**Monitoring:**
- Vercel: Check deployment logs and analytics
- Railway: Monitor resource usage and logs
- Supabase: Check database size and queries

**Costs:**
- Vercel: Free (100GB bandwidth/month)
- Railway: $5 free credit/month
- Supabase: Free (500MB database)

**When you'll need to upgrade:**
- Vercel: After 100GB bandwidth/month
- Railway: After $5 usage/month
- Supabase: After 500MB database or 50K users

**Estimated monthly cost for small app:** $0-5
**Estimated monthly cost for medium app:** $5-20
```

---

## Usage Examples

### Example 1: Simple REST API

```
User: I need a REST API for a task management system

AI: I'll help you build that! Let me gather some requirements.

1. What features do you need?
   - User authentication?
   - Task CRUD operations?
   - Task assignment to users?
   - Due dates and priorities?
   - Comments on tasks?

User: Yes to all

AI: Great! A few more questions:

2. Expected number of users?
User: Around 100-500 users

AI: 3. Tech stack preference?
   I recommend:
   - Backend: Node.js + Express + TypeScript
   - Database: PostgreSQL
   - Auth: JWT
   - ORM: Prisma
   
   Does this work for you?

User: Yes

AI: 4. Deployment preference?
   - Docker containerization? (Recommended)
   - Standalone?

User: Docker

AI: 5. Database server?
   - I can set up PostgreSQL in Docker
   - Or you can provide existing server details

User: Set it up in Docker

AI: Perfect! Generating project specification...

[Creates comprehensive spec]

Ready to proceed with phase planning?
```

---

### Example 2: Full-Stack Application

```
User: I want to build a SaaS platform for invoice management

AI: Excellent! Let's plan this properly.

[Goes through discovery questions]

AI: Based on your requirements, I recommend:

**Frontend:**
- React + TypeScript
- Tailwind CSS + shadcn/ui
- React Query for state management

**Backend:**
- Node.js + Express + TypeScript
- PostgreSQL with Prisma
- Redis for caching
- JWT authentication

**Infrastructure:**
- Docker Compose for local dev
- Nginx reverse proxy
- Multi-tenant architecture

**Security:**
- JWT with refresh tokens
- RBAC (Role-Based Access Control)
- API rate limiting
- Data encryption at rest

Does this align with your vision?

User: Perfect!

AI: [Generates detailed project spec]

I'll break this into 5 phases:
- P0: Foundation (auth, database, multi-tenancy)
- P1: Core features (invoice CRUD, PDF generation)
- P2: Advanced features (payments, notifications)
- P3: Reporting and analytics
- P4: Testing and deployment

Ready to bootstrap?
```

---

## Tech Stack Recommendations

### Backend Frameworks

**Node.js + Express**
- ✅ Best for: REST APIs, real-time apps, microservices
- ✅ Use when: JavaScript/TypeScript ecosystem preferred
- ✅ Strengths: Large ecosystem, fast development, good for I/O-heavy apps

**Python + FastAPI**
- ✅ Best for: Data-heavy apps, ML integration, rapid prototyping
- ✅ Use when: Python ecosystem needed, data science integration
- ✅ Strengths: Type safety, auto-generated docs, async support

**NestJS**
- ✅ Best for: Enterprise applications, complex architectures
- ✅ Use when: Need structure, dependency injection, scalability
- ✅ Strengths: Angular-like architecture, built-in features, TypeScript-first

### Databases

**PostgreSQL**
- ✅ Best for: Complex queries, relational data, ACID compliance
- ✅ Use when: Data integrity critical, complex relationships

**MongoDB**
- ✅ Best for: Flexible schemas, document storage, rapid iteration
- ✅ Use when: Schema evolves frequently, nested data structures

**MySQL**
- ✅ Best for: Traditional web apps, read-heavy workloads
- ✅ Use when: Proven stability needed, simpler queries

**Redis**
- ✅ Best for: Caching, sessions, real-time features
- ✅ Use when: Performance critical, temporary data storage

### Authentication

**JWT (JSON Web Tokens)**
- ✅ Best for: Stateless APIs, microservices, mobile apps
- ✅ Use when: Scalability important, no server-side sessions

**OAuth 2.0**
- ✅ Best for: Third-party integrations, social login
- ✅ Use when: Need "Login with Google/GitHub/etc."

**Session-based**
- ✅ Best for: Traditional web apps, server-side rendering
- ✅ Use when: Simpler security model preferred

### Frontend Frameworks

**React**
- ✅ Best for: SPAs, complex UIs, large ecosystems
- ✅ Use when: Component reusability important

**Vue.js**
- ✅ Best for: Progressive enhancement, simpler learning curve
- ✅ Use when: Rapid development needed

**Next.js**
- ✅ Best for: SEO-critical apps, server-side rendering
- ✅ Use when: Performance and SEO both critical

---

## Phase Complexity Guidelines

### Simple Projects (2-3 Phases)
- Basic CRUD apps
- Simple REST APIs
- Portfolio websites
- Landing pages

**Example Phases:**
- P0: Setup + Core features
- P1: Additional features
- P2: Testing + Deployment

### Medium Projects (4-5 Phases)
- Multi-user applications
- E-commerce platforms
- Content management systems
- SaaS MVPs

**Example Phases:**
- P0: Foundation (auth, database)
- P1: Core features
- P2: Secondary features
- P3: Integrations
- P4: Testing + Deployment

### Complex Projects (6+ Phases)
- Enterprise applications
- Multi-tenant platforms
- Real-time collaboration tools
- Complex integrations

**Example Phases:**
- P0: Infrastructure + Architecture
- P1: Authentication + Authorization
- P2: Core domain features
- P3: Advanced features
- P4: Integrations + APIs
- P5: Admin panel + Analytics
- P6: Testing + Deployment

---

## Critical Rules for AI

### 🛑 NEVER Do This:
1. ❌ Ask 8-9 separate questions when one comprehensive question suffices
2. ❌ Proceed without AI analysis and recommendations
3. ❌ Move to next phase with failing tests
4. ❌ Ignore user's tech stack customization requests
5. ❌ Create files without explaining purpose
6. ❌ Skip testing phases
7. ❌ Present recommendations without justifications
8. ❌ Use hardcoded credentials
9. ❌ Skip error handling
10. ❌ Forget to document changes

### ✅ ALWAYS Do This:
1. ✅ Ask for brief project description (2-3 sentences)
2. ✅ Analyze and provide complete architecture recommendations
3. ✅ Justify all tech stack choices
4. ✅ Use smart defaults from configuration matrix
5. ✅ Allow easy customization of recommendations
6. ✅ Wait for user approval at gates
7. ✅ Test after every phase
8. ✅ Document all decisions in `docs/`
9. ✅ Add comments explaining changes
10. ✅ Follow security best practices
11. ✅ Create `.env.example` with all variables
12. ✅ Generate comprehensive test suites
13. ✅ Provide manual testing guide
14. ✅ Auto-detect features from keywords
15. ✅ Assign features to phases automatically

### 📝 Documentation Requirements:
Every project MUST have:
- `docs/requirements.md` - Original requirements
- `docs/project-spec.md` - Technical specification
- `docs/folder-structure.md` - Directory layout
- `docs/database-schema.md` - Database design
- `docs/phases/p*.md` - Phase documentation
- `docs/manual-testing-guide.md` - Testing instructions
- `docs/production-checklist.md` - Deployment guide
- `README.md` - Project overview and setup
- `.env.example` - Environment variables template

---

## Testing Strategy

### Unit Tests
- Test individual functions/methods
- Mock external dependencies
- Aim for 80%+ coverage

### Integration Tests
- Test API endpoints
- Test database operations
- Test service interactions

### E2E Tests
- Test complete user flows
- Test critical paths
- Use tools like Playwright, Cypress

### Manual Testing
- Browser compatibility
- UI/UX validation
- Edge cases
- Error scenarios

---

## File Organization

```
project-root/
├── docs/
│   ├── requirements.md
│   ├── project-spec.md
│   ├── folder-structure.md
│   ├── database-schema.md
│   ├── manual-testing-guide.md
│   ├── production-checklist.md
│   └── phases/
│       ├── p0-foundation.md
│       ├── p1-core-features.md
│       ├── p2-secondary-features.md
│       └── ...
├── src/
│   ├── server/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── middleware/
│   └── utils/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── prisma/
│   └── schema.prisma
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## Success Criteria

A project is considered complete when:

✅ All phases implemented and tested
✅ All acceptance criteria met
✅ Test suite passing (80%+ coverage)
✅ Manual testing guide created
✅ Production checklist verified
✅ Documentation complete
✅ Environment variables documented
✅ Error handling comprehensive (no blank pages on API failures)
✅ Visual Excellence & Responsive Design (Tailwind/Modern UI)
✅ Security best practices followed (no plain text passwords)
✅ Code reviewed and optimized (proper TypeScript types used)

---

## Example Conversation Flow

```
User: Create a blog platform with user authentication

AI: I'll help you build a blog platform! Let me gather requirements.

**Project Discovery:**

1. What features do you need?
   - User registration/login?
   - Create/edit/delete posts?
   - Comments?
   - Categories/tags?
   - Rich text editor?
   - Image uploads?

User: Yes to all except image uploads for now

AI: 2. Expected scale?
   - Number of users?
   - Posts per day?

User: Start with 1000 users, maybe 50 posts/day

AI: 3. Tech Stack Recommendation:
   
   **Backend:**
   - Node.js + Express + TypeScript (fast development, great ecosystem)
   - PostgreSQL (relational data, complex queries)
   - Prisma ORM (type-safe, great DX)
   
   **Frontend:**
   - React + TypeScript (component reusability)
   - Tailwind CSS (rapid styling)
   - React Query (data fetching)
   - TipTap (rich text editor)
   
   **Authentication:**
   - JWT (stateless, scalable)
   
   Does this work for you or prefer different stack?

User: Looks good!

AI: 4. Deployment:
   - Docker containerization? (Recommended for consistency)
   - Or standalone?

User: Docker please

AI: 5. Database:
   - I'll set up PostgreSQL in Docker
   - Or provide existing server details?

User: Set it up in Docker

AI: Perfect! Generating comprehensive project specification...

[Creates detailed spec]

**Project Specification Summary:**

**Architecture:**
- Monolithic backend with REST API
- React SPA frontend
- PostgreSQL database
- JWT authentication
- Docker Compose for local dev

**Key Features:**
- User authentication (register, login, logout)
- Blog post CRUD with rich text
- Comments system
- Categories and tags
- User profiles
- Search functionality

**Security:**
- Password hashing (bcrypt)
- JWT with refresh tokens
- Input validation
- SQL injection prevention
- XSS protection

**Phase Breakdown:**
- P0: Foundation (4-6 hours)
  - Project setup, database, auth
- P1: Core Features (6-8 hours)
  - Post CRUD, rich text editor
- P2: Social Features (4-6 hours)
  - Comments, user profiles
- P3: Discovery (3-4 hours)
  - Categories, tags, search
- P4: Polish & Testing (4-6 hours)
  - Tests, documentation, deployment

Total Estimated: 21-30 hours

Approve specification?

User: Yes, let's do it!

AI: Excellent! Creating phase documents...

✅ Created docs/requirements.md
✅ Created docs/project-spec.md
✅ Created docs/folder-structure.md
✅ Created docs/database-schema.md
✅ Created docs/phases/p0-foundation.md
✅ Created docs/phases/p1-core-features.md
✅ Created docs/phases/p2-social-features.md
✅ Created docs/phases/p3-discovery.md
✅ Created docs/phases/p4-polish-testing.md

Ready to bootstrap the project?

User: Yes!

AI: Bootstrapping project...

✅ Created folder structure
✅ Generated package.json
✅ Generated tsconfig.json
✅ Created docker-compose.yml
✅ Created Dockerfile
✅ Generated Prisma schema
✅ Created .env.example
✅ Created .gitignore
✅ Generated server entry point
✅ Created basic middleware
✅ Added health check endpoint
✅ Installing dependencies...
✅ Dependencies installed
✅ Testing bootstrap...
✅ Server starts successfully
✅ Database connection verified

Project bootstrapped successfully!

Starting Phase 0: Foundation...

**P0 Objectives:**
- Set up authentication system
- Create user model and migrations
- Implement register/login/logout
- Add JWT middleware
- Create user routes

Implementing...

[Creates all files with detailed comments]

✅ Created src/models/user.model.ts
✅ Created src/controllers/auth.controller.ts
✅ Created src/routes/auth.routes.ts
✅ Created src/middleware/auth.middleware.ts
✅ Created src/utils/jwt.utils.ts
✅ Created src/utils/password.utils.ts
✅ Updated Prisma schema
✅ Generated Prisma client
✅ Ran migrations

Testing Phase 0...

✅ POST /api/auth/register - Success
✅ POST /api/auth/login - Success
✅ GET /api/auth/me - Success (with token)
✅ POST /api/auth/logout - Success

Gap Analysis:
✅ All P0 acceptance criteria met
✅ No gaps identified

**Phase 0 Complete!**

Summary:
- ✅ User authentication working
- ✅ JWT tokens generated
- ✅ Protected routes functional
- ✅ All tests passing

Continue to Phase 1: Core Features?

User: Yes!

[Continues through all phases...]

[After P4 completion]

AI: **All Phases Complete!**

Running final validation...

✅ End-to-end user flow tested
✅ All API endpoints working
✅ Database operations verified
✅ Authentication secure
✅ Error handling comprehensive

Generating test suite...

✅ Created tests/unit/auth.test.ts
✅ Created tests/unit/posts.test.ts
✅ Created tests/integration/api.test.ts
✅ Created tests/e2e/user-flow.test.ts

Running tests...

✅ 45 tests passing
✅ 87% code coverage

Creating manual testing guide...

✅ Created docs/manual-testing-guide.md

Creating production checklist...

✅ Created docs/production-checklist.md

**Project Complete! 🎉**

Your blog platform is ready for deployment.

Next steps:
1. Review docs/manual-testing-guide.md
2. Test features in browser
3. Review docs/production-checklist.md
4. Deploy to your hosting platform

Would you like help with deployment?
```

---

## 🔧 TROUBLESHOOTING GUIDE

### Common Issues & Solutions

#### Issue 1: Database Connection Failed
**Symptoms:**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Cause:** PostgreSQL not running or wrong connection string

**Solution:**
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# If using Docker Compose
docker-compose up -d postgres

# Verify connection
psql "$DATABASE_URL"

# Check .env file
cat .env | grep DATABASE_URL

# Correct format:
# DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

---

#### Issue 2: Port Already in Use
**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::4000
```

**Cause:** Another process using the port

**Solution:**
```bash
# Find process using port
lsof -i :4000

# Kill the process
kill -9 <PID>

# Or use different port in .env
PORT=4001 npm run dev
```

---

#### Issue 3: Prisma Migration Failed
**Symptoms:**
```
Error: P3009: migrate found failed migration
```

**Cause:** Previous migration failed or database schema drift

**Solution:**
```bash
# Reset database (DEVELOPMENT ONLY!)
npx prisma migrate reset

# Or resolve migration
npx prisma migrate resolve --rolled-back <migration_name>

# Then retry
npx prisma migrate dev
```

---

#### Issue 4: TypeScript Compilation Errors
**Symptoms:**
```
error TS2307: Cannot find module '@/types/user'
```

**Cause:** Missing type definitions or incorrect paths

**Solution:**
```bash
# Regenerate Prisma client
npx prisma generate

# Check tsconfig.json paths
cat tsconfig.json | grep paths

# Install missing types
npm install -D @types/node @types/express

# Clear TypeScript cache
rm -rf node_modules/.cache
```

---

#### Issue 5: JWT Token Verification Failed
**Symptoms:**
```
Error: JsonWebTokenError: invalid signature
```

**Cause:** JWT_SECRET mismatch or token corruption

**Solution:**
```bash
# Verify JWT_SECRET is consistent
echo $JWT_SECRET

# Check .env file
cat .env | grep JWT_SECRET

# Regenerate secret if needed
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Update .env with new secret
# Note: This will invalidate all existing tokens
```

---

#### Issue 6: CORS Errors in Browser
**Symptoms:**
```
Access to fetch at 'http://localhost:4000/api' from origin 
'http://localhost:3000' has been blocked by CORS policy
```

**Cause:** CORS not configured or wrong origin

**Solution:**
```typescript
// src/server/middleware/cors.ts
import cors from 'cors';

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

#### Issue 7: Environment Variables Not Loading
**Symptoms:**
```
undefined when accessing process.env.DATABASE_URL
```

**Cause:** .env file not loaded or wrong location

**Solution:**
```bash
# Install dotenv
npm install dotenv

# Load at app entry point
# src/server/index.ts
import 'dotenv/config';

# Verify .env location
ls -la .env

# Check if variables are loaded
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
```

---

#### Issue 8: Docker Build Failed
**Symptoms:**
```
ERROR [stage-1 3/5] RUN npm install
```

**Cause:** Network issues, wrong Node version, or missing files

**Solution:**
```bash
# Clear Docker cache
docker builder prune -a

# Rebuild with no cache
docker-compose build --no-cache

# Check Dockerfile Node version
cat Dockerfile | grep FROM

# Ensure .dockerignore exists
cat .dockerignore
```

---

#### Issue 9: Tests Failing After Deployment
**Symptoms:**
```
Expected 200, got 500
```

**Cause:** Environment-specific configuration or missing migrations

**Solution:**
```bash
# Run migrations on target environment
npx prisma migrate deploy

# Check environment variables
env | grep -E "DATABASE_URL|JWT_SECRET|NODE_ENV"

# Verify database connection
npx prisma db pull

# Check logs
docker logs <container_name> --tail 100
```

---

#### Issue 11: Blank Page / Infinite Loop / React Crash
**Symptoms:**
- Page loads but is completely blank.
- Infinite redirection between `/login` and `/`.
- Console shows `React Error #31` or `Property 'env' does not exist on type 'ImportMeta'`.

**Cause:**
- Improper error handling (rendering error objects directly).
- Leaked backend types into TypeScript (e.g., `str` instead of `string`).
- Missing Vite environment type definitions.

**Solution:**
1. **Fix Types**: Ensure all interfaces use `string` (TypeScript) not `str` (Python).
2. **Vite Env**: Create `src/vite-env.d.ts` with correct definitions:
```typescript
/// <reference types="vite/client" />
interface ImportMetaEnv { readonly VITE_API_BASE_URL: string }
interface ImportMeta { readonly env: ImportMetaEnv }
```
3. **Safe Redirections**: Use `useEffect` for state-based navigation instead of inline `Navigate` in the render body.
4. **Error Boundaries**: Handle API errors in `catch` blocks by checking if they are strings or objects before setting them to state.
```typescript
const detail = err.response?.data?.detail;
setError(typeof detail === 'string' ? detail : 'An error occurred');
```

---

## 🌍 ENVIRONMENT SETUP GUIDE

### Development Environment

**Required Tools:**
```bash
# Node.js (v18+ recommended)
node --version

# npm or yarn
npm --version

# Docker (if using containerization)
docker --version
docker-compose --version

# PostgreSQL client (for database access)
psql --version

# Git
git --version
```

**Setup Steps:**
```bash
# 1. Clone repository
git clone <repo-url>
cd <project-name>

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env

# 4. Update .env with your values
nano .env

# 5. Start database (if using Docker)
docker-compose up -d postgres

# 6. Run migrations
npx prisma migrate dev

# 7. Seed database (if seed script exists)
npm run seed

# 8. Start development server
npm run dev
```

**Environment Variables Template:**
```bash
# .env.example

# Server Configuration
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

# Email (if applicable)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Storage (if applicable)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# External APIs (if applicable)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Monitoring (if applicable)
SENTRY_DSN=https://...@sentry.io/...
LOG_LEVEL=debug
```

---

### Staging Environment

**Configuration:**
```bash
# .env.staging

NODE_ENV=staging
PORT=4000
FRONTEND_URL=https://staging.yourapp.com

DATABASE_URL="postgresql://user:password@staging-db:5432/dbname"

JWT_SECRET=<strong-random-secret>
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

LOG_LEVEL=info
SENTRY_DSN=<your-sentry-dsn>
```

**Deployment:**
```bash
# Build application
npm run build

# Run migrations
npx prisma migrate deploy

# Start server
npm start

# Or with PM2
pm2 start npm --name "app-staging" -- start
```

---

### Production Environment

**Configuration:**
```bash
# .env.production

NODE_ENV=production
PORT=4000
FRONTEND_URL=https://yourapp.com

DATABASE_URL="postgresql://user:password@prod-db:5432/dbname"

JWT_SECRET=<very-strong-random-secret>
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d

LOG_LEVEL=error
SENTRY_DSN=<your-sentry-dsn>

# Enable production optimizations
ENABLE_COMPRESSION=true
ENABLE_RATE_LIMITING=true
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=15
```

**Security Checklist:**
- [ ] All secrets are environment variables (never hardcoded)
- [ ] JWT_SECRET is cryptographically random (64+ characters)
- [ ] Database credentials are strong and unique
- [ ] HTTPS enabled (TLS 1.3)
- [ ] CORS configured with specific origins
- [ ] Rate limiting enabled
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection (Content Security Policy)
- [ ] Helmet.js middleware enabled
- [ ] Dependencies updated (npm audit)
- [ ] Error messages don't leak sensitive info
- [ ] Logging excludes sensitive data

---

## 📊 MONITORING & OBSERVABILITY

### Application Metrics

**Health Check Endpoint:**
```typescript
// src/server/routes/health.routes.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/health', async (req, res) => {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version,
      database: 'connected',
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    });
  } catch (error) {
    res.status(503).json({
      status: 'error',
      database: 'disconnected',
      error: error.message,
    });
  }
});

export default router;
```

**Performance Monitoring:**
```typescript
// src/server/middleware/metrics.ts
import { Request, Response, NextFunction } from 'express';

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    
    console.log({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    });
    
    // Send to monitoring service (e.g., Prometheus, DataDog)
    // metrics.recordHttpRequest(req.method, req.path, res.statusCode, duration);
  });
  
  next();
};
```

---

### Logging Best Practices

**Structured Logging:**
```typescript
// src/server/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'api-server' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  }));
}

export default logger;
```

**Usage:**
```typescript
import logger from './utils/logger';

// Info logs
logger.info('User logged in', { userId: user.id, email: user.email });

// Error logs
logger.error('Database query failed', { error: error.message, query: sql });

// Warning logs
logger.warn('Rate limit exceeded', { ip: req.ip, endpoint: req.path });
```

---

### Database Monitoring

**Query Performance:**
```sql
-- Slow query log (PostgreSQL)
ALTER SYSTEM SET log_min_duration_statement = 1000; -- Log queries > 1s
SELECT pg_reload_conf();

-- View slow queries
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  max_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

**Connection Pool Monitoring:**
```typescript
// src/server/config/database.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'stdout' },
    { level: 'warn', emit: 'stdout' },
  ],
});

prisma.$on('query', (e) => {
  if (e.duration > 1000) {
    logger.warn('Slow query detected', {
      query: e.query,
      duration: `${e.duration}ms`,
    });
  }
});

export default prisma;
```

---

## 🚀 DEPLOYMENT STRATEGIES

### Docker Deployment

**Multi-stage Dockerfile:**
```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci
RUN npx prisma generate

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

ENV NODE_ENV=production

EXPOSE 4000

CMD ["npm", "start"]
```

**Docker Compose (Production):**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db
    depends_on:
      - postgres
      - redis
    restart: unless-stopped
    
  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
      - POSTGRES_DB=db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped
    
  redis:
    image: redis:7-alpine
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

---

### Cloud Deployment (AWS Example)

**Elastic Beanstalk:**
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js-18 my-app

# Create environment
eb create production-env

# Deploy
eb deploy

# View logs
eb logs
```

**ECS (Fargate):**
```bash
# Build and push Docker image
docker build -t my-app .
docker tag my-app:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-app:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/my-app:latest

# Create ECS task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Update service
aws ecs update-service --cluster my-cluster --service my-app --task-definition my-app:1
```

---

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm test
      - run: npm run build
      
  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1
      
      - name: Build and push Docker image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          ECR_REPOSITORY: my-app
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY:$IMAGE_TAG
      
      - name: Deploy to ECS
        run: |
          aws ecs update-service \
            --cluster my-cluster \
            --service my-app \
            --force-new-deployment
```

---

## 📈 PERFORMANCE OPTIMIZATION

### Database Optimization

**Indexing Strategy:**
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Composite indexes for multi-column queries
CREATE INDEX idx_posts_status_created ON posts(status, created_at DESC);

-- Partial indexes for filtered queries
CREATE INDEX idx_active_users ON users(email) WHERE status = 'active';
```

**Query Optimization:**
```typescript
// Bad: N+1 query problem
const posts = await prisma.post.findMany();
for (const post of posts) {
  const author = await prisma.user.findUnique({ where: { id: post.authorId } });
}

// Good: Use include/select
const posts = await prisma.post.findMany({
  include: {
    author: {
      select: { id: true, name: true, email: true }
    }
  }
});
```

---

### Caching Strategy

**Redis Integration:**
```typescript
// src/server/utils/cache.ts
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

export async function getCached<T>(key: string, fallback: () => Promise<T>, ttl = 3600): Promise<T> {
  const cached = await redis.get(key);
  
  if (cached) {
    return JSON.parse(cached);
  }
  
  const data = await fallback();
  await redis.setex(key, ttl, JSON.stringify(data));
  
  return data;
}

// Usage
const user = await getCached(
  `user:${userId}`,
  () => prisma.user.findUnique({ where: { id: userId } }),
  3600 // 1 hour
);
```

---

### API Response Compression

```typescript
// src/server/middleware/compression.ts
import compression from 'compression';

app.use(compression({
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
  level: 6 // Balance between speed and compression ratio
}));
```

---

## 📚 QUICK REFERENCE

### Command Cheat Sheet

**Development:**
```bash
# Start development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Check types
npm run type-check

# Lint code
npm run lint

# Format code
npm run format
```

**Database:**
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migrations (production)
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Generate Prisma client
npx prisma generate
```

**Docker:**
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Restart service
docker-compose restart app

# Stop all services
docker-compose down

# Rebuild specific service
docker-compose build app
```

---

## 🎯 SUCCESS METRICS

A DOC2PROD project is considered successful when:

### Technical Metrics
- ✅ All phases completed and tested
- ✅ Test coverage ≥ 80%
- ✅ All acceptance criteria met
- ✅ Zero critical security vulnerabilities
- ✅ API response time < 200ms (p95)
- ✅ Database queries optimized (< 100ms)
- ✅ Build time < 5 minutes
- ✅ Docker image size < 500MB

### Documentation Metrics
- ✅ README.md complete with setup instructions
- ✅ API documentation generated
- ✅ All environment variables documented
- ✅ Manual testing guide created
- ✅ Production deployment guide ready
- ✅ Troubleshooting guide available

### Quality Metrics
- ✅ Code follows consistent style guide
- ✅ No hardcoded secrets or credentials
- ✅ Error handling comprehensive
- ✅ Logging implemented throughout
- ✅ Input validation on all endpoints
- ✅ CORS properly configured
- ✅ Rate limiting implemented

### Deployment Metrics
- ✅ Application runs in Docker
- ✅ Health check endpoint responds
- ✅ Database migrations automated
- ✅ Environment-specific configs ready
- ✅ CI/CD pipeline configured
- ✅ Monitoring and alerting setup

---

## 🔄 CONTINUOUS IMPROVEMENT

### Post-Deployment Tasks

**Week 1:**
- [ ] Monitor error rates and response times
- [ ] Review user feedback
- [ ] Check database performance
- [ ] Verify backup procedures
- [ ] Test disaster recovery

**Month 1:**
- [ ] Analyze usage patterns
- [ ] Optimize slow queries
- [ ] Review and update documentation
- [ ] Security audit
- [ ] Dependency updates

**Quarter 1:**
- [ ] Performance benchmarking
- [ ] Scalability testing
- [ ] Feature usage analysis
- [ ] Cost optimization review
- [ ] Team retrospective

---

## Integration with Other Skills

DOC2PROD can work alongside:

- **app-init**: For initial project setup
- **schema-generation**: For complex database designs
- **secure-llm-proxy**: For AI-powered features
- **rag-integration**: For knowledge-based features
- **qa-automation**: For advanced testing
- **production-review**: For final security audit

---

## Skill Activation

This skill activates when user mentions:
- "Create a new project"
- "Build an application"
- "Start from scratch"
- "Generate full project"
- "Documentation to production"
- "I need to build [description]"
- "doc2prod"

---

## 📖 ADDITIONAL RESOURCES

### Learning Resources
- **Node.js Best Practices**: https://github.com/goldbergyoni/nodebestpractices
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/
- **Prisma Documentation**: https://www.prisma.io/docs
- **Express.js Guide**: https://expressjs.com/en/guide/
- **Docker Best Practices**: https://docs.docker.com/develop/dev-best-practices/

### Tools & Libraries
- **Testing**: Jest, Supertest, Playwright
- **Validation**: Zod, Joi, Yup
- **Logging**: Winston, Pino, Morgan
- **Monitoring**: Sentry, DataDog, New Relic
- **Documentation**: Swagger, TypeDoc, Docusaurus

---

## Version

**Version:** 2.0.0
**Last Updated:** 2026-01-19
**Status:** Active ✅
**Changelog:**
- v2.0.0: Complete rewrite with comprehensive detail matching asgais2prod standards
  - Added YAML frontmatter
  - Added Moot Point philosophy
  - Added detailed execution pipeline
  - Added comprehensive troubleshooting guide
  - Added environment setup guides
  - Added monitoring and observability section
  - Added deployment strategies
  - Added performance optimization guides
  - Enhanced with 800+ lines of production-ready examples
- v1.0.0: Initial release

---

## Support & Contribution

**Created by:** ASG AI S2PROD Team at [AIShift](https://aishift.dev/)

**For Support:**
- 📧 Email: info@aishift.dev
- 🌐 Website: https://aishift.dev
- 📚 Documentation: https://docs.aishift.dev

**Contributing:**
This skill is part of the ASG AI S2PROD framework. To contribute improvements:
1. Test changes thoroughly
2. Document new features
3. Follow existing patterns
4. Submit detailed change descriptions

---

**Powered by ASG AI S2PROD** - Transform Ideas into Production Reality

---

## 🎓 SKILL PHILOSOPHY

DOC2PROD embodies the core principles of modern software development:

1. **Automation First**: Automate repetitive tasks, let humans focus on creativity
2. **Quality by Design**: Build quality in from the start, not as an afterthought
3. **Documentation as Code**: Documentation should be as important as code
4. **Security by Default**: Security should be built-in, not bolted-on
5. **Continuous Validation**: Test early, test often, test everything
6. **User-Centric**: Always keep the end user's needs in focus
7. **Production Ready**: Every deliverable should be deployment-ready

---

**Remember:** The goal is not just to write code, but to deliver production-ready applications that solve real problems for real users.
