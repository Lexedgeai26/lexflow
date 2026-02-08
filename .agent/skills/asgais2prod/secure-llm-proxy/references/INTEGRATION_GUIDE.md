# 🔌 LLM Proxy v2.0 - Integration Guide

Complete guide for integrating the LLM Proxy into any application.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Basic Integration](#basic-integration)
4. [Framework-Specific Integration](#framework-specific-integration)
5. [Configuration](#configuration)
6. [Testing](#testing)
7. [Deployment](#deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Requirements

- Node.js >= 18.0.0
- PostgreSQL >= 12 OR SQLite >= 3
- At least one LLM provider API key (Gemini, OpenAI, or Claude)
- Existing JWT authentication system

### What You Need to Know

- Your JWT token structure (`sub`, `email`, `name` fields)
- Your database connection details
- Your LLM provider API keys

---

## Installation

### Step 1: Install Package

```bash
npm install llm-proxy-v2
# or
yarn add llm-proxy-v2
# or
pnpm add llm-proxy-v2
```

### Step 2: Install Peer Dependencies

```bash
npm install @prisma/client express cors
```

### Step 3: Set Environment Variables

Create `.env`:

```bash
# Database (choose one)
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"
# OR
DATABASE_URL="file:./llm-proxy.db"

# JWT Secret (must match your app's secret)
JWT_SECRET="your-jwt-secret-here"

# LLM Provider API Keys (at least one required)
GEMINI_API_KEY="your-gemini-api-key"
OPENAI_API_KEY="your-openai-api-key"
ANTHROPIC_API_KEY="your-claude-api-key"

# Optional
PORT=4000
```

---

## Basic Integration

### Standalone Server

Create `server.js`:

```javascript
import express from 'express';
import { initializeLLMProxy, proxyRoutes, healthRoutes } from 'llm-proxy-v2';

const app = express();

// Initialize LLM Proxy
await initializeLLMProxy({
  appName: 'My Application',
  features: {
    autoCreateUsers: true,
    enforceQuotas: true,
    trackUsage: true,
  },
});

// Middleware
app.use(express.json());

// Mount LLM Proxy routes
app.use('/api/ai', proxyRoutes);   // LLM endpoints
app.use('/api/ai', healthRoutes);  // Health/metrics

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server with LLM Proxy running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
});
```

Run:
```bash
node server.js
```

---

## Framework-Specific Integration

### Express.js

```javascript
// app.js
import express from 'express';
import { initializeLLMProxy, proxyRoutes, healthRoutes } from 'llm-proxy-v2';

const app = express();

// Your existing routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Initialize LLM Proxy
await initializeLLMProxy({
  appName: 'My Express App',
  jwt: {
    secret: process.env.JWT_SECRET,
    userExtractor: (payload) => ({
      userId: payload.sub || payload.id,
      email: payload.email,
      name: payload.name || payload.username,
    }),
  },
});

// Mount LLM Proxy
app.use('/api/ai', proxyRoutes);
app.use('/api/ai', healthRoutes);

export default app;
```

### NestJS

```typescript
// app.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { initializeLLMProxy } from 'llm-proxy-v2';

@Module({
  imports: [
    // Your existing modules
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements OnModuleInit {
  async onModuleInit() {
    // Initialize LLM Proxy on startup
    await initializeLLMProxy({
      appName: 'My NestJS App',
      database: {
        type: 'postgresql',
        url: process.env.DATABASE_URL,
      },
    });
  }
}

// llm-proxy.controller.ts (create a controller to expose routes)
import { Controller, All, Req, Res } from '@nestjs/common';
import { proxyRoutes, healthRoutes } from 'llm-proxy-v2';

@Controller('api/ai')
export class LLMProxyController {
  @All('*')
  proxy(@Req() req, @Res() res) {
    // Forward to Express middleware
    return proxyRoutes(req, res, () => {});
  }
}
```

### Next.js (API Routes)

```typescript
// pages/api/ai/[...proxy].ts
import { initializeLLMProxy, proxyRoutes } from 'llm-proxy-v2';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize once
let initialized = false;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Initialize on first request
  if (!initialized) {
    await initializeLLMProxy({
      appName: 'My Next.js App',
    });
    initialized = true;
  }

  // Forward to proxy
  return proxyRoutes(req as any, res as any, () => {});
}
```

### Fastify

```javascript
import Fastify from 'fastify';
import { initializeLLMProxy } from 'llm-proxy-v2';
import express from 'express'; // For proxy middleware
import { proxyRoutes } from 'llm-proxy-v2';

const fastify = Fastify();

// Initialize
await initializeLLMProxy({ appName: 'Fastify App' });

// Use Express middleware adapter
import middie from '@fastify/middie';
await fastify.register(middie);

// Mount proxy
fastify.use('/api/ai', proxyRoutes);

await fastify.listen({ port: 4000 });
```

---

## Configuration

### Database Options

#### PostgreSQL (Recommended for Production)

```typescript
await initializeLLMProxy({
  database: {
    type: 'postgresql',
    url: 'postgresql://user:pass@localhost:5432/mydb',
  },
});
```

**Pros:**
- Scalable
- ACID compliant
- Multi-user support
- Better performance

**Cons:**
- Requires PostgreSQL server
- More complex setup

#### SQLite (Good for Development)

```typescript
await initializeLLMProxy({
  database: {
    type: 'sqlite',
    sqlitePath: './llm-proxy.db',
  },
});
```

**Pros:**
- Zero setup
- Portable (single file)
- Fast for small scale

**Cons:**
- Limited concurrency
- Not recommended for production

### JWT Configuration

If your JWT structure is different, customize the extractor:

```typescript
await initializeLLMProxy({
  jwt: {
    secret: process.env.JWT_SECRET,
    userExtractor: (payload) => {
      return {
        userId: payload.user_id,      // Your field name
        email: payload.user_email,    // Your field name
        name: payload.display_name,   // Your field name
      };
    },
  },
});
```

### Quota Customization

Set custom quotas for different user tiers:

```typescript
await initializeLLMProxy({
  defaultUserQuota: {
    // Free tier
    dailyTokenLimit: 5000,
    monthlyTokenLimit: 100000,
    requestsPerMinute: 5,
  },
});

// Or programmatically update for specific users:
import { getPrismaClient } from 'llm-proxy-v2';

const prisma = getPrismaClient();

await prisma.lLMProxyUserQuota.update({
  where: { userId: 'premium-user-id' },
  data: {
    dailyTokenLimit: 50000,      // Premium tier
    monthlyTokenLimit: 1000000,
    requestsPerMinute: 30,
  },
});
```

### Provider Configuration

Enable/disable providers:

```typescript
await initializeLLMProxy({
  apiKeys: {
    gemini: process.env.GEMINI_API_KEY,   // Enabled
    openai: process.env.OPENAI_API_KEY,   // Enabled
    claude: undefined,                     // Disabled
  },
});
```

---

## Testing

### Step 1: Get a JWT Token

From your app's login endpoint:

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}' \
  | jq -r '.accessToken'
```

### Step 2: Test Health

```bash
curl http://localhost:4000/api/ai/health | jq '.'
```

Expected:
```json
{
  "status": "healthy",
  "version": "2.0.0",
  "checks": {
    "database": "healthy",
    "providers": "healthy"
  }
}
```

### Step 3: Test Generate (with JWT)

```bash
TOKEN="your-jwt-token-here"

curl -X POST http://localhost:4000/api/ai/generate \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "role": "user",
      "parts": [{"text": "Hello!"}]
    }],
    "model": "gemini-2.0-flash-exp"
  }' | jq '.candidates[0].content.parts[0].text'
```

### Step 4: Check Auto-User Creation

```bash
curl -X GET http://localhost:4000/api/ai/quota \
  -H "Authorization: Bearer $TOKEN" | jq '.user'
```

Should show your auto-created user!

### Step 5: View Usage

```bash
curl -X GET http://localhost:4000/api/ai/usage \
  -H "Authorization: Bearer $TOKEN" | jq '.logs[0]'
```

### Step 6: Test Dashboard

Open in browser:
```
http://localhost:4000
```

---

## Deployment

### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --production

# Copy source
COPY . .

# Expose port
EXPOSE 4000

# Start
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t my-app-llm-proxy .
docker run -p 4000:4000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="..." \
  -e GEMINI_API_KEY="..." \
  my-app-llm-proxy
```

### Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
      - JWT_SECRET=${JWT_SECRET}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    depends_on:
      - db

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: llm-proxy
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: llm-proxy
        image: my-app-llm-proxy:latest
        ports:
        - containerPort: 4000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: llm-proxy-secrets
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: llm-proxy-secrets
              key: jwt-secret
        livenessProbe:
          httpGet:
            path: /api/ai/health
            port: 4000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /api/ai/status
            port: 4000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Vercel / Netlify

For serverless environments, you'll need to:

1. **Use SQLite** (not PostgreSQL)
2. **Initialize on cold start**
3. **Handle stateless nature**

Example for Vercel:
```typescript
// api/ai/[...proxy].ts
import { initializeLLMProxy, proxyRoutes } from 'llm-proxy-v2';

let initialized = false;

export default async function handler(req, res) {
  if (!initialized) {
    await initializeLLMProxy({
      database: { type: 'sqlite', sqlitePath: '/tmp/llm-proxy.db' },
    });
    initialized = true;
  }
  
  return proxyRoutes(req, res, () => {});
}
```

---

## Troubleshooting

### Common Issues

#### 1. "Prisma Client not initialized"

**Cause:** `initializeLLMProxy()` not called before using routes.

**Solution:**
```typescript
// Initialize BEFORE mounting routes
await initializeLLMProxy({ appName: 'My App' });

// THEN mount routes
app.use('/api/ai', proxyRoutes);
```

#### 2. "JWT verification failed"

**Cause:** JWT_SECRET mismatch or wrong token format.

**Solution:**
- Ensure JWT_SECRET matches your app's secret
- Check JWT payload structure
- Use custom `userExtractor` if needed

#### 3. "Database connection failed"

**Cause:** Wrong DATABASE_URL or database not accessible.

**Solution:**
```bash
# Test connection
psql "postgresql://user:pass@localhost:5432/db"

# Check env vars
echo $DATABASE_URL
```

#### 4. "No LLM provider configured"

**Cause:** Missing API keys.

**Solution:**
```bash
# Set at least one
export GEMINI_API_KEY="your-key"
# OR
export OPENAI_API_KEY="your-key"
```

#### 5. "Rate limit exceeded"

**Cause:** User hit quota limits.

**Solution:**
- Check quota: `GET /api/ai/quota`
- Wait for reset (daily/monthly)
- Increase user quota (see Configuration)

### Debug Mode

Enable debug logging:

```typescript
await initializeLLMProxy({
  logging: {
    level: 'debug',
    logRequests: true,
    logPerformance: true,
  },
});
```

### Health Check

Always verify system health:

```bash
curl http://localhost:4000/api/ai/status | jq '.checks'
```

---

## Advanced Usage

### Custom Middleware

Add custom logic before/after LLM calls:

```typescript
import { proxyRoutes } from 'llm-proxy-v2';

// Custom logging middleware
app.use('/api/ai', (req, res, next) => {
  console.log(`LLM Request: ${req.method} ${req.path}`);
  next();
});

// Mount proxy
app.use('/api/ai', proxyRoutes);

// Post-processing
app.use('/api/ai', (req, res, next) => {
  console.log(`Response sent`);
  next();
});
```

### Multi-Tenant Setup

Use different quotas per tenant:

```typescript
import { getPrismaClient } from 'llm-proxy-v2';

const prisma = getPrismaClient();

// On user creation
await prisma.lLMProxyUserQuota.update({
  where: { userId: user.id },
  data: {
    dailyTokenLimit: user.tenant.plan === 'premium' ? 50000 : 10000,
  },
});
```

### Custom Usage Tracking

Add custom metadata to usage logs:

```typescript
// Extend the middleware
app.use('/api/ai', (req, res, next) => {
  req.customMetadata = {
    tenantId: req.user.tenantId,
    feature: req.headers['x-feature'],
  };
  next();
});
```

---

## Next Steps

1. ✅ Test in development
2. ✅ Configure quotas for your use case
3. ✅ Set up monitoring (Prometheus)
4. ✅ Deploy to staging
5. ✅ Load test
6. ✅ Deploy to production
7. ✅ Monitor usage and costs

---

## Support

Need help? Contact us:

- 📧 Email: support@example.com
- 💬 Discord: [Join Server](https://discord.gg/example)
- 📖 Docs: [Full Documentation](https://docs.example.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/llm-proxy/issues)

---

**Happy Integrating! 🚀**

