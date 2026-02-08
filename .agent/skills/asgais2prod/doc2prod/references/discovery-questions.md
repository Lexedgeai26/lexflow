# Discovery Questions Reference

Comprehensive question templates for gathering project requirements.

---

## Phase 1: Project Overview

### Essential Questions

**1. What is the primary purpose of this project?**
- What problem does it solve?
- Who benefits from it?
- What's the core value proposition?

**2. Who are the end users?**
- Internal users (employees, admins)?
- External users (customers, public)?
- Different user roles?
- Technical proficiency level?

**3. What is the expected scale?**
- Number of users (current/projected)?
- Concurrent users expected?
- Data volume (records, files, transactions)?
- Geographic distribution?

**4. What are the critical features?**
- Must-have features (MVP)?
- Nice-to-have features?
- Future roadmap items?

**5. Are there any existing systems to integrate with?**
- Third-party APIs?
- Legacy systems?
- Payment processors?
- Email services?
- Cloud storage?

---

## Phase 2: Technical Requirements

### Backend Questions

**1. Do you have a preferred programming language/framework?**
- Node.js / Python / Java / Go / PHP?
- Any team expertise considerations?
- Performance requirements?

**If no preference, AI should recommend based on:**
- Project complexity
- Team size
- Performance needs
- Ecosystem requirements

**2. What type of application is this?**
- REST API only?
- GraphQL API?
- Full-stack web app?
- Mobile backend?
- Real-time application?
- Microservices?

**3. Do you need real-time features?**
- WebSockets?
- Server-Sent Events?
- Live updates?
- Chat functionality?
- Notifications?

---

### Database Questions

**1. What type of data will you store?**
- Structured relational data?
- Document-based data?
- Time-series data?
- File storage?
- Combination?

**2. Database preference?**
- PostgreSQL (relational, complex queries)
- MySQL (relational, simpler)
- MongoDB (document, flexible schema)
- Redis (caching, sessions)
- No preference (AI recommends)

**3. Do you have an existing database server?**
- Yes: Provide connection details
- No: AI will set up in Docker
- Cloud database preferred?

**4. Data relationships complexity?**
- Simple (few tables, basic relations)?
- Moderate (multiple tables, foreign keys)?
- Complex (many-to-many, nested relations)?

---

### Frontend Questions (if applicable)

**1. Do you need a frontend?**
- Yes: Web application
- Yes: Admin panel only
- No: API only

**2. Frontend framework preference?**
- React
- Vue.js
- Angular
- Next.js (SSR)
- Svelte
- No preference

**3. UI/UX requirements?**
- Modern/minimalist design?
- Corporate/professional?
- Colorful/creative?
- Mobile-first?
- Accessibility requirements?

**4. Responsive design needed?**
- Desktop only?
- Mobile + Desktop?
- Tablet support?

---

## Phase 3: Security & Authentication

### Authentication Questions

**1. What type of authentication do you need?**

**Options:**
- **JWT (JSON Web Tokens)**
  - ✅ Best for: APIs, mobile apps, microservices
  - ✅ Stateless, scalable
  - ✅ Works across domains
  
- **Session-based**
  - ✅ Best for: Traditional web apps
  - ✅ Server-side session management
  - ✅ Easier to revoke
  
- **OAuth 2.0**
  - ✅ Best for: Social login, third-party access
  - ✅ "Login with Google/GitHub/Facebook"
  
- **Multi-factor Authentication (MFA)**
  - ✅ Enhanced security
  - ✅ SMS, email, or authenticator app

**2. User registration requirements?**
- Email verification needed?
- Admin approval required?
- Self-service registration?
- Invitation-only?

**3. Password requirements?**
- Minimum complexity?
- Password reset flow?
- Password expiration?

---

### Authorization Questions

**1. Do you need role-based access control (RBAC)?**
- Different user roles (admin, user, moderator)?
- Permission-based access?
- Resource-level permissions?

**2. What roles do you need?**
- Admin (full access)?
- Manager (moderate access)?
- User (basic access)?
- Guest (read-only)?
- Custom roles?

---

### Security Requirements

**1. What security level is required?**

**Basic:**
- Password hashing
- HTTPS
- Input validation
- Basic XSS/CSRF protection

**Standard:**
- All basic features
- JWT with refresh tokens
- Rate limiting
- SQL injection prevention
- Security headers

**Advanced:**
- All standard features
- Multi-factor authentication
- Audit logging
- Encryption at rest
- GDPR compliance
- SOC 2 compliance

**2. Do you need API rate limiting?**
- Per user?
- Per IP?
- Per endpoint?

**3. Data encryption requirements?**
- Sensitive data encryption?
- PII (Personally Identifiable Information)?
- Payment data (PCI compliance)?

---

## Phase 4: Infrastructure & Deployment

### Deployment Questions

**1. Deployment preference?**

**Docker (Recommended):**
- ✅ Consistent environments
- ✅ Easy scaling
- ✅ Isolated dependencies
- ✅ Portable

**Standalone:**
- ✅ Simpler for small projects
- ✅ Direct server deployment
- ✅ Less overhead

**2. Where will you deploy?**
- Cloud provider (AWS, GCP, Azure)?
- VPS (DigitalOcean, Linode)?
- Shared hosting?
- On-premise?
- Not decided yet?

**3. Do you need CI/CD?**
- Automated testing on commit?
- Automated deployment?
- GitHub Actions / GitLab CI / Jenkins?

---

### Scalability Questions

**1. Expected growth?**
- Current scale?
- 6-month projection?
- 1-year projection?

**2. Performance requirements?**
- Response time expectations?
- Concurrent request handling?
- Background job processing?

**3. Do you need caching?**
- Redis for session/cache?
- CDN for static assets?
- Database query caching?

---

## Phase 5: Integration & External Services

### Third-Party Services

**1. Payment processing?**
- Stripe?
- PayPal?
- Other payment gateway?

**2. Email service?**
- Transactional emails (SendGrid, Mailgun)?
- Marketing emails (Mailchimp)?
- SMTP server?

**3. File storage?**
- Local file system?
- AWS S3?
- Google Cloud Storage?
- Cloudinary (images)?

**4. Analytics?**
- Google Analytics?
- Custom analytics?
- User behavior tracking?

**5. Monitoring & Logging?**
- Error tracking (Sentry)?
- Application monitoring (New Relic, Datadog)?
- Log aggregation (ELK stack)?

---

## Phase 6: Development & Team

### Development Environment

**1. Team size?**
- Solo developer?
- Small team (2-5)?
- Large team (5+)?

**2. Development timeline?**
- Urgent (weeks)?
- Standard (months)?
- Long-term (6+ months)?

**3. Existing codebase?**
- Starting from scratch?
- Migrating from existing system?
- Refactoring existing code?

---

### Code Quality

**1. Testing requirements?**
- Unit tests?
- Integration tests?
- E2E tests?
- Test coverage target?

**2. Code style preferences?**
- Linting (ESLint, Pylint)?
- Code formatting (Prettier, Black)?
- Pre-commit hooks?

**3. Documentation needs?**
- API documentation (Swagger/OpenAPI)?
- Code comments?
- User documentation?
- Developer onboarding guide?

---

## Question Flow Examples

### Example 1: E-commerce Platform

```
AI: What is the primary purpose of this project?
User: E-commerce platform for selling handmade crafts

AI: Who are the end users?
User: Customers buying products and sellers listing products

AI: Expected scale?
User: Start with 50 sellers, maybe 1000 customers

AI: Critical features?
User: Product listings, shopping cart, checkout, seller dashboard

AI: Payment processing?
User: Yes, Stripe

AI: User authentication?
User: Yes, customers and sellers need accounts

AI: Preferred tech stack?
User: No preference

AI: Based on your requirements, I recommend:
- Backend: Node.js + Express (fast development, great Stripe integration)
- Database: PostgreSQL (complex product relationships)
- Frontend: React + Next.js (SEO for product pages)
- Auth: JWT (scalable for mobile app later)
- Deployment: Docker

Does this work for you?
```

---

### Example 2: Internal Dashboard

```
AI: What is the primary purpose?
User: Internal dashboard for monitoring sales metrics

AI: Who are the end users?
User: Sales team and managers, about 20 people

AI: Expected scale?
User: Small, internal only

AI: Critical features?
User: Real-time sales charts, export reports, user management

AI: Do you need authentication?
User: Yes, only company employees

AI: Preferred authentication?
User: Simple login, maybe SSO with our Google Workspace

AI: Database preference?
User: We have PostgreSQL already

AI: I recommend:
- Backend: Python + FastAPI (great for data/analytics)
- Database: PostgreSQL (your existing server)
- Frontend: React + Recharts (beautiful charts)
- Auth: OAuth 2.0 with Google (SSO integration)
- Deployment: Docker

Provide your PostgreSQL connection details?
```

---

## Decision Trees

### Database Selection

```
Does data have complex relationships?
├─ Yes → PostgreSQL or MySQL
│   └─ Need advanced features (JSON, full-text search)?
│       ├─ Yes → PostgreSQL
│       └─ No → MySQL
│
└─ No → Flexible schema needed?
    ├─ Yes → MongoDB
    └─ No → PostgreSQL (safe default)
```

### Authentication Selection

```
What type of application?
├─ API / Mobile App → JWT
├─ Traditional Web App → Session-based or JWT
├─ Need social login? → OAuth 2.0
└─ High security needs? → JWT + MFA
```

### Framework Selection

```
What language preference?
├─ JavaScript/TypeScript
│   ├─ Need structure? → NestJS
│   ├─ Simple/fast? → Express
│   └─ Full-stack? → Next.js
│
├─ Python
│   ├─ Modern/fast? → FastAPI
│   ├─ Full-featured? → Django
│   └─ Lightweight? → Flask
│
└─ No preference
    └─ Based on project type:
        ├─ Data-heavy → Python (FastAPI)
        ├─ Real-time → Node.js (Express)
        └─ Enterprise → NestJS or Django
```

---

## Red Flags to Watch For

### Unclear Requirements
- ❌ "I want a website" (too vague)
- ❌ "Make it scalable" (need specific numbers)
- ❌ "Best practices" (need concrete requirements)

**Action:** Ask more specific questions

### Unrealistic Expectations
- ❌ "Build Facebook in 2 weeks"
- ❌ "Support 1M users with $0 budget"
- ❌ "No testing needed, just make it work"

**Action:** Set realistic expectations, suggest MVP approach

### Missing Critical Info
- ❌ No authentication plan for user-facing app
- ❌ No database choice for data-heavy app
- ❌ No deployment plan

**Action:** Circle back to essential questions

---

## Summary Checklist

Before proceeding to specification, confirm you have:

**Project Basics:**
- ✅ Clear purpose and goals
- ✅ Target users identified
- ✅ Expected scale understood
- ✅ Critical features listed

**Technical Stack:**
- ✅ Backend framework decided
- ✅ Database selected
- ✅ Frontend framework (if needed)
- ✅ Authentication method chosen

**Security:**
- ✅ Authentication approach defined
- ✅ Authorization model clear
- ✅ Security level appropriate

**Infrastructure:**
- ✅ Deployment method chosen
- ✅ Database server plan
- ✅ Scaling considerations

**Integrations:**
- ✅ Third-party services identified
- ✅ API integrations listed
- ✅ External dependencies noted

If any items are unclear, ask follow-up questions before generating specification.

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-19
