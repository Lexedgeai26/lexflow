---
name: deploy-aws
description: Deploy your application to AWS (Amazon Web Services). The most comprehensive cloud platform. Recommended for production-grade applications.
---

# Deploy to AWS - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never used AWS before. That's okay.
2. **EXPLAIN EVERYTHING**: Every service, every term, every step.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is AWS?

**AWS (Amazon Web Services)** is the world's largest cloud platform with 200+ services.

**Why AWS?**
- ✅ **Enterprise-grade** - Used by Netflix, Airbnb, NASA
- ✅ **Global infrastructure** - Servers in 30+ regions
- ✅ **Free tier** - 12 months of free resources
- ✅ **Most services** - Whatever you need, AWS has it

**⚠️ COMPLEXITY WARNING**: AWS is powerful but complex. For simple apps, consider Vercel or Render first.

---

## 🧭 AWS Services Simplified

| What You Need | AWS Service | Simpler Alternative |
|---------------|-------------|---------------------|
| Host a website | S3 + CloudFront | Vercel/Netlify |
| Run a server | EC2 or ECS | Render |
| Database | RDS | Render PostgreSQL |
| Serverless functions | Lambda | Vercel Functions |
| File storage | S3 | Firebase Storage |

---

## 📋 PREREQUISITES

### 1. AWS Account
1. Go to https://aws.amazon.com
2. Click **"Create an AWS Account"**
3. Enter payment method (required, but free tier available)
4. Complete verification

### 2. AWS CLI
```bash
# Mac
brew install awscli

# Windows
# Download from https://aws.amazon.com/cli/

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### 3. Configure AWS CLI
```bash
aws configure
```

Enter:
- **Access Key ID**: (create in AWS Console → IAM → Security credentials)
- **Secret Access Key**: (shown once when you create access key)
- **Region**: `us-east-1` (or your preferred region)
- **Output format**: `json`

---

## 🚀 OPTION 1: Static Website (S3 + CloudFront)

### Best for: React, Vue, static sites

### Step 1: Build Your App
```bash
npm run build
```

### Step 2: Create S3 Bucket
```bash
aws s3 mb s3://my-app-bucket-12345 --region us-east-1
```

### Step 3: Enable Static Website Hosting
```bash
aws s3 website s3://my-app-bucket-12345 --index-document index.html --error-document index.html
```

### Step 4: Set Bucket Policy
Create `bucket-policy.json`:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-app-bucket-12345/*"
    }
  ]
}
```

Apply:
```bash
aws s3api put-bucket-policy --bucket my-app-bucket-12345 --policy file://bucket-policy.json
```

### Step 5: Upload Files
```bash
aws s3 sync dist/ s3://my-app-bucket-12345
```

### Step 6: Access Your Site
```
http://my-app-bucket-12345.s3-website-us-east-1.amazonaws.com
```

---

## 🚀 OPTION 2: Backend App (Elastic Beanstalk)

### Best for: Node.js, Python, Java backends

### Step 1: Install EB CLI
```bash
pip install awsebcli --upgrade
```

### Step 2: Initialize EB
```bash
cd your-project
eb init
```

Choose:
- Region: `us-east-1`
- Platform: `Node.js` or `Python`
- SSH: Yes (optional but helpful)

### Step 3: Create Environment
```bash
eb create my-app-env
```

Wait 5-10 minutes for environment creation.

### Step 4: Deploy Updates
```bash
eb deploy
```

### Step 5: Open Your App
```bash
eb open
```

---

## 🗄️ AWS Database (RDS)

### Create PostgreSQL Database
```bash
aws rds create-db-instance \
    --db-instance-identifier my-database \
    --db-instance-class db.t3.micro \
    --engine postgres \
    --master-username admin \
    --master-user-password MyPassword123! \
    --allocated-storage 20
```

### Get Connection Endpoint
```bash
aws rds describe-db-instances --db-instance-identifier my-database --query 'DBInstances[0].Endpoint.Address' --output text
```

### Connection String
```
postgresql://admin:MyPassword123!@your-endpoint.rds.amazonaws.com:5432/postgres
```

---

## ⚡ Serverless (Lambda + API Gateway)

### Step 1: Create Lambda Function

Create `index.js`:
```javascript
exports.handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Lambda!" }),
  };
};
```

### Step 2: Zip and Deploy
```bash
zip function.zip index.js

aws lambda create-function \
    --function-name my-function \
    --runtime nodejs18.x \
    --handler index.handler \
    --zip-file fileb://function.zip \
    --role arn:aws:iam::YOUR_ACCOUNT_ID:role/lambda-role
```

### Step 3: Create API Gateway (via Console)
1. Go to API Gateway in AWS Console
2. Create HTTP API
3. Add route: `GET /hello`
4. Integrate with your Lambda
5. Deploy

---

## 💰 FREE TIER LIMITS

| Service | Free Tier |
|---------|-----------|
| **EC2** | 750 hours/month of t2.micro |
| **S3** | 5GB storage |
| **RDS** | 750 hours/month of db.t2.micro |
| **Lambda** | 1 million requests/month |

⚠️ **Set billing alerts** to avoid surprise charges!

---

## 🛑 COMMON ISSUES

### "Access Denied"
Check IAM permissions. Your user needs proper policies attached.

### "Bucket name already exists"
S3 bucket names are globally unique. Add random numbers: `my-app-bucket-8472`

### "Connection timeout to RDS"
Check security group allows inbound traffic on port 5432.

---

## ✅ COMPLETION CHECKLIST

- [ ] AWS account created
- [ ] Billing alerts set up
- [ ] AWS CLI configured
- [ ] App deployed (S3/EB/Lambda)
- [ ] Database created (if needed)
- [ ] Security groups configured
- [ ] App accessible via URL

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
