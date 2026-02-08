# 🚀 LLM Proxy v2.0

**A production-ready, plug-and-play LLM proxy module with auto-user creation, quota management, and usage tracking.**

[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/yourusername/llm-proxy)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

---

## ✨ Features

- ⚡ **Zero-Setup User Management** - Auto-creates users from JWT tokens
- 🎯 **Multi-Provider Support** - Gemini, OpenAI, Claude out-of-the-box
- 📊 **Built-in Quota System** - Per-user rate limits and token tracking
- 🔐 **JWT-Based Authentication** - Works with your existing auth system
- 📈 **Usage Analytics** - Comprehensive tracking and metrics
- 🎨 **Bootstrap UI** - Beautiful dashboard for monitoring
- 🔄 **Hot-Swappable Providers** - Switch LLM providers without code changes
- 📦 **Database Agnostic** - PostgreSQL or SQLite
- 🚀 **Production Ready** - Health checks, metrics, error handling

---

## 🎯 Quick Start

### Installation

```bash
npm install llm-proxy-v2
# or
yarn add llm-proxy-v2
```

### Basic Usage

```typescript
import { initializeLLMProxy } from 'llm-proxy-v2';

// Initialize the module
await initializeLLMProxy({
  appName: 'My App',
  apiKeys: {
    gemini: process.env.GEMINI_API_KEY,
    openai: process.env.OPENAI_API_KEY,
  },
  features: {
    autoCreateUsers: true,
    enforceQuotas: true,
    trackUsage: true,
  },
});

// That's it! The proxy is ready to use.
```

### With Express

```typescript
import express from 'express';
import { initializeLLMProxy, proxyRoutes, healthRoutes } from 'llm-proxy-v2';

const app = express();

// Initialize
await initializeLLMProxy({ appName: 'My App' });

// Mount routes
app.use('/api/ai', proxyRoutes);   // LLM endpoints
app.use('/api/ai', healthRoutes);  // Health/status endpoints

app.listen(4000, () => {
  console.log('Server running with LLM Proxy!');
});
```

---

## 📖 How It Works

### Auto-User Creation

When a user makes their first request with a valid JWT:

1. **JWT Validation** - Token is verified
2. **User Extraction** - Email, ID, name extracted from JWT
3. **Auto-Creation** - User + default quotas created automatically
4. **Request Proceeds** - No manual setup required!

```
First Request with JWT
  ↓
JWT Verified
  ↓
User Not Found in Proxy DB
  ↓
Auto-Create User + Quotas
  ↓
Process Request
  ↓
Track Usage
```

### Quota Management

Per-user quotas with automatic enforcement:

- **Daily Token Limit**: 10,000 tokens (default)
- **Monthly Token Limit**: 300,000 tokens (default)
- **Rate Limit**: 10 requests/minute (default)
- **Automatic Resets**: Daily/monthly/minute

When quota exceeded:
```json
{
  "error": "Daily token limit exceeded",
  "code": "DAILY_LIMIT_EXCEEDED",
  "quota": {
    "daily": {
      "used": 10000,
      "limit": 10000
    }
  }
}
```

---

## ⚙️ Configuration

### Full Configuration Example

```typescript
import { initializeLLMProxy } from 'llm-proxy-v2';

await initializeLLMProxy({
  // Application name
  appName: 'My Awesome App',

  // Database configuration
  database: {
    type: 'postgresql', // or 'sqlite'
    url: 'postgresql://user:pass@localhost:5432/mydb',
  },

  // LLM API Keys
  apiKeys: {
    gemini: process.env.GEMINI_API_KEY,
    openai: process.env.OPENAI_API_KEY,
    claude: process.env.ANTHROPIC_API_KEY,
  },

  // Feature flags
  features: {
    autoCreateUsers: true,
    enforceQuotas: true,
    trackUsage: true,
    enableBootstrapUI: true,
  },

  // Default quotas for new users
  defaultUserQuota: {
    dailyTokenLimit: 10000,
    monthlyTokenLimit: 300000,
    requestsPerMinute: 10,
    maxConcurrent: 3,
  },

  // Global limits
  globalLimits: {
    dailyTokenLimit: 100000,
    monthlySpendLimit: 100.0,
  },

  // JWT configuration
  jwt: {
    secret: process.env.JWT_SECRET,
    userExtractor: (payload) => ({
      userId: payload.sub,
      email: payload.email,
      name: payload.name,
    }),
  },

  // Server configuration
  server: {
    port: 4000,
    corsOrigins: ['http://localhost:3000'],
    apiPrefix: '/api/ai',
  },
});
```

---

## 🔌 API Endpoints

### Core Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/generate` | POST | ✓ | Generate content |
| `/quota` | GET | ✓ | Get user quota status |
| `/usage` | GET | ✓ | Get usage history |
| `/health` | GET | ✗ | Health check |
| `/status` | GET | ✗ | Detailed status |
| `/metrics` | GET | ✗ | Prometheus metrics |
| `/config` | GET | ✗ | Configuration info |

### Generate Content Example

```typescript
const response = await fetch('http://localhost:4000/api/ai/generate', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [
      {
        role: 'user',
        parts: [{ text: 'Hello!' }],
      },
    ],
    model: 'gemini-2.0-flash-exp',
  }),
});

const data = await response.json();
console.log(data.candidates[0].content.parts[0].text);
```

---

## 🎨 Bootstrap UI

Access the dashboard at `http://localhost:4000`

Features:
- ✅ Real-time status monitoring
- ✅ User statistics
- ✅ Request/token analytics
- ✅ Provider usage breakdown
- ✅ Configuration display
- ✅ Auto-refresh (30s)

---

## 📊 Monitoring

### Prometheus Integration

```yaml
scrape_configs:
  - job_name: 'llm-proxy'
    static_configs:
      - targets: ['localhost:4000']
    metrics_path: '/api/ai/metrics'
```

### Health Checks (Kubernetes)

```yaml
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

---

## 🗄️ Database Schema

The module creates 5 tables:

- `llm_proxy_config` - Global configuration
- `llm_proxy_users` - Auto-created users
- `llm_proxy_user_quotas` - Per-user quotas
- `llm_proxy_usage_logs` - Usage tracking
- `llm_proxy_bootstrap` - Health/status

Migrations are handled automatically via Prisma.

---

## 🔒 Security

✅ **API Keys Never Exposed** - Only on server
✅ **JWT Authentication** - Industry standard
✅ **Rate Limiting** - Prevent abuse
✅ **Quota Enforcement** - Control costs
✅ **Input Validation** - Sanitize requests
✅ **Error Handling** - No sensitive data in errors

---

## 🚀 Deployment

### Environment Variables

```bash
# Required
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-jwt-secret
GEMINI_API_KEY=your-gemini-key

# Optional
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-claude-key
PORT=4000
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .

EXPOSE 4000
CMD ["npm", "start"]
```

---

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Test coverage:
```bash
npm run test:coverage
```

---

## 📚 Examples

Check the `/examples` folder for:
- Express integration
- NestJS integration
- Standalone usage
- Custom JWT extractors
- Multi-tenant setup

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Write tests
5. Submit a PR

---

## 📄 License

MIT © [Your Name]

---

## 🙏 Credits

Built with:
- [Prisma](https://www.prisma.io/) - Database ORM
- [Express](https://expressjs.com/) - Web framework
- [Google Gemini](https://ai.google.dev/) - LLM provider
- [OpenAI](https://openai.com/) - LLM provider

---

## 📞 Support

- 📧 Email: support@example.com
- 💬 Discord: [Join Server](https://discord.gg/example)
- 📖 Docs: [docs.example.com](https://docs.example.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/llm-proxy/issues)

---

**⭐ Star us on GitHub if you find this useful!**

