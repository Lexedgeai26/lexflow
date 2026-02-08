# Phase 0: Foundation Template

**Purpose:** Establish core infrastructure, database, and authentication

**Estimated Time:** 4-8 hours (varies by complexity)

---

## Objectives

1. Set up project structure and dependencies
2. Configure database and ORM
3. Implement authentication system
4. Create basic middleware
5. Establish error handling patterns
6. Set up development environment

---

## Deliverables

### 1. Project Structure
- [ ] Folder structure created per design
- [ ] Configuration files in place
- [ ] Environment variables template (`.env.example`)
- [ ] `.gitignore` configured
- [ ] `README.md` with setup instructions

### 2. Database Setup
- [ ] Database schema defined
- [ ] ORM configured (Prisma/TypeORM/SQLAlchemy)
- [ ] Initial migrations created
- [ ] Database connection tested
- [ ] Seed data script (if needed)

### 3. Authentication System
- [ ] User model created
- [ ] Password hashing implemented
- [ ] Registration endpoint (`POST /api/auth/register`)
- [ ] Login endpoint (`POST /api/auth/login`)
- [ ] Logout endpoint (`POST /api/auth/logout`)
- [ ] Token generation (JWT) or session management
- [ ] Auth middleware for protected routes
- [ ] Current user endpoint (`GET /api/auth/me`)

### 4. Core Middleware
- [ ] Error handling middleware
- [ ] Request logging middleware
- [ ] CORS configuration
- [ ] Body parser setup
- [ ] Security headers (helmet)
- [ ] Rate limiting (if required)

### 5. Basic Endpoints
- [ ] Health check endpoint (`GET /health`)
- [ ] API version endpoint (`GET /api/version`)
- [ ] 404 handler
- [ ] Error response formatter

### 6. Development Setup
- [ ] Development server script
- [ ] Hot reload configured
- [ ] TypeScript compilation (if applicable)
- [ ] Linting setup
- [ ] Prettier/formatting configured

---

## File Structure Example

```
project-root/
├── src/
│   ├── index.ts                 # Server entry point
│   ├── config/
│   │   ├── database.ts          # DB configuration
│   │   └── env.ts               # Environment variables
│   ├── models/
│   │   └── user.model.ts        # User model
│   ├── controllers/
│   │   └── auth.controller.ts   # Auth logic
│   ├── routes/
│   │   └── auth.routes.ts       # Auth endpoints
│   ├── middleware/
│   │   ├── auth.middleware.ts   # JWT/session verification
│   │   ├── error.middleware.ts  # Error handler
│   │   └── logger.middleware.ts # Request logging
│   └── utils/
│       ├── jwt.utils.ts         # JWT helpers
│       └── password.utils.ts    # Password hashing
├── prisma/
│   └── schema.prisma            # Database schema
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## Database Schema (Example)

### User Table
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Session Table (if session-based auth)
```prisma
model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}
```

---

## API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}

Response: 201 Created
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token" // or session cookie
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt-token"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer jwt-token

Response: 200 OK
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "user"
}
```

#### Logout
```
POST /api/auth/logout
Authorization: Bearer jwt-token

Response: 200 OK
{
  "message": "Logged out successfully"
}
```

### System

#### Health Check
```
GET /health

Response: 200 OK
{
  "status": "healthy",
  "timestamp": "2026-01-19T10:00:00Z",
  "database": "connected"
}
```

---

## Acceptance Criteria

### Must Have ✅
- [ ] User can register with email and password
- [ ] User can login and receive token/session
- [ ] User can access protected routes with valid token
- [ ] Invalid credentials return appropriate errors
- [ ] Passwords are hashed (never stored plain text)
- [ ] Database connection is stable
- [ ] Server starts without errors
- [ ] Environment variables are documented

### Security ✅
- [ ] Passwords hashed with bcrypt (10+ rounds)
- [ ] JWT secret is strong and in environment variables
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection headers
- [ ] CORS configured properly
- [ ] Rate limiting on auth endpoints (optional but recommended)

### Code Quality ✅
- [ ] No hardcoded credentials
- [ ] Error messages don't leak sensitive info
- [ ] Consistent error response format
- [ ] Code follows project style guide
- [ ] TypeScript types defined (if using TS)

---

## Testing Checklist

### Manual Tests
1. **Registration**
   - [ ] Register with valid email/password
   - [ ] Try duplicate email (should fail)
   - [ ] Try weak password (should fail if validation exists)
   - [ ] Try invalid email format (should fail)

2. **Login**
   - [ ] Login with correct credentials
   - [ ] Login with wrong password (should fail)
   - [ ] Login with non-existent email (should fail)

3. **Protected Routes**
   - [ ] Access `/api/auth/me` without token (should fail)
   - [ ] Access `/api/auth/me` with valid token (should succeed)
   - [ ] Access `/api/auth/me` with expired token (should fail)

4. **Database**
   - [ ] Check user created in database
   - [ ] Verify password is hashed
   - [ ] Check timestamps are set

### Automated Tests (if implementing)
```typescript
// Example test structure
describe('Auth System', () => {
  describe('POST /api/auth/register', () => {
    it('should register new user', async () => {
      // Test implementation
    });
    
    it('should reject duplicate email', async () => {
      // Test implementation
    });
  });
  
  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // Test implementation
    });
    
    it('should reject invalid credentials', async () => {
      // Test implementation
    });
  });
});
```

---

## Common Issues & Solutions

### Issue: Database connection fails
**Solution:** 
- Check `DATABASE_URL` in `.env`
- Verify database server is running
- Check network connectivity
- Verify credentials

### Issue: JWT token not working
**Solution:**
- Check `JWT_SECRET` is set
- Verify token format in Authorization header
- Check token expiration
- Ensure middleware is applied to routes

### Issue: Password hashing slow
**Solution:**
- Reduce bcrypt rounds (10 is standard)
- Consider async hashing
- Don't hash in loops

### Issue: CORS errors in frontend
**Solution:**
- Configure CORS middleware
- Allow frontend origin
- Include credentials if needed

---

## Environment Variables

```bash
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d

# Security (optional)
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## Next Steps

After P0 completion:
1. Review all acceptance criteria
2. Test all endpoints manually
3. Fix any gaps identified
4. Get user approval
5. Proceed to Phase 1: Core Features

---

## Notes for AI

### Critical Rules
- ❌ NEVER store passwords in plain text
- ❌ NEVER hardcode secrets
- ❌ NEVER skip error handling
- ✅ ALWAYS hash passwords before storing
- ✅ ALWAYS validate input
- ✅ ALWAYS use environment variables for secrets

### Code Comments
Add comments explaining:
- Why bcrypt rounds are set to specific value
- JWT expiration strategy
- Error handling approach
- Security considerations

### Example Comment
```typescript
// Changed: Using bcrypt with 10 rounds for password hashing
// This provides good security while maintaining reasonable performance
// Higher rounds (12+) would be slower but more secure
const hashedPassword = await bcrypt.hash(password, 10);
```

---

**Template Version:** 1.0.0  
**Last Updated:** 2026-01-19
