# shre - Employee Data & Document Management Platform

A comprehensive, secure platform for managing employee data and documents with enterprise-grade security and scalability.

## 🚀 Features

- **Secure Authentication**: JWT-based authentication with refresh tokens
- **Role-Based Access Control (RBAC)**: Admin and User roles with granular permissions
- **Employee Management**: Complete CRUD operations for employee profiles
- **Document Management**: Secure storage, retrieval, and version control
- **GraphQL API**: Flexible data querying alongside REST endpoints
- **Scalable Architecture**: Microservices-ready design with Docker support
- **Production-Ready**: Comprehensive logging, error handling, and security measures

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL 15
- **ORM**: Prisma
- **Authentication**: Passport.js + JWT
- **API**: REST + GraphQL
- **Logging**: Winston
- **Security**: Helmet, CORS, Rate Limiting

### Frontend
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Query
- **HTTP Client**: Axios

### Mobile
- **Framework**: React Native
- **Platform**: iOS & Android

### DevOps
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Cloud**: AWS (S3 for document storage)

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL 15+
- Docker & Docker Compose (optional)
- AWS Account (for S3 document storage)

## 🚀 Quick Start

### Option 1: Local Development (Without Docker)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shre_package
   ```

2. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb shre_db
   ```

3. **Backend Setup**
   ```bash
   cd backend
   
   # Install dependencies
   npm install
   
   # Copy environment variables
   cp .env.example .env
   
   # Update .env with your database credentials
   # DATABASE_URL="postgresql://postgres:password@localhost:5432/shre_db?schema=public"
   
   # Generate Prisma Client
   npm run db:generate
   
   # Run database migrations
   npm run db:migrate
   
   # Seed database (optional)
   npm run db:seed
   
   # Start development server
   npm run dev
   ```

4. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   npm start
   ```

5. **Access the application**
   - Backend API: http://localhost:4000
   - GraphQL Playground: http://localhost:4000/api/v1/graphql
   - Frontend: http://localhost:3000
   - Health Check: http://localhost:4000/health

### Option 2: Docker Development

1. **Start all services**
   ```bash
   cd deployment
   docker-compose up -d
   ```

2. **Run database migrations**
   ```bash
   docker-compose exec backend npm run db:migrate
   ```

3. **Access the application**
   - Backend API: http://localhost:4000
   - Frontend: http://localhost:3000

## 📚 API Documentation

### REST Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `GET /api/v1/auth/me` - Get current user profile

#### Users
- `GET /api/v1/users` - Get all users (Admin only)
- `GET /api/v1/users/:id` - Get user by ID
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user (Admin only)

### GraphQL Endpoint

Access GraphQL Playground at: `http://localhost:4000/api/v1/graphql`

**Example Queries:**

```graphql
# Get all users
query {
  users {
    id
    username
    email
    role
    documents {
      id
      name
    }
  }
}

# Get user by ID
query {
  user(id: "user-id-here") {
    id
    username
    email
    documents {
      id
      name
      mimeType
    }
  }
}

# Update user
mutation {
  updateUser(id: "user-id-here", username: "newusername") {
    id
    username
    email
  }
}
```

## 🔐 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt with salt rounds
- **HTTPS Enforcement**: TLS 1.2+ for all communications
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS Protection**: Whitelist specific origins
- **Helmet.js**: Security headers
- **Input Validation**: Request validation and sanitization
- **SQL Injection Prevention**: Parameterized queries via Prisma

## 📁 Project Structure

```
shre_package/
├── backend/
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── graphql/         # GraphQL schema
│   │   └── index.ts         # Entry point
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   └── utils/           # Utilities
│   └── package.json
├── mobile/
│   └── src/                 # React Native app
├── deployment/
│   ├── docker-compose.yml
│   ├── Dockerfile
│   └── k8s/                 # Kubernetes configs
└── docs/                    # Documentation
```

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Watch mode
npm run test:watch
```

## 🚀 Deployment

### Docker Production Build

```bash
# Build images
docker-compose -f docker-compose.prod.yml build

# Start services
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes Deployment

```bash
# Apply configurations
kubectl apply -f deployment/k8s/

# Check status
kubectl get pods
```

## 📊 Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `username` (VARCHAR, Unique)
- `email` (VARCHAR, Unique)
- `password` (VARCHAR, Hashed)
- `role` (ENUM: ADMIN, USER)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### Documents Table
- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key)
- `name` (VARCHAR)
- `content` (BYTEA)
- `mimeType` (VARCHAR)
- `size` (INTEGER)
- `version` (INTEGER)
- `s3Key` (VARCHAR)
- `createdAt` (TIMESTAMP)
- `updatedAt` (TIMESTAMP)

### RefreshTokens Table
- `id` (UUID, Primary Key)
- `userId` (UUID, Foreign Key)
- `token` (VARCHAR, Unique)
- `expiresAt` (TIMESTAMP)
- `createdAt` (TIMESTAMP)

## 🔧 Environment Variables

See `.env.example` files in backend and frontend directories for required environment variables.

## 📝 License

MIT

## 👥 Contributors

- Development Team

## 📞 Support

For issues and questions, please open an issue in the repository.