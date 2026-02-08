---
name: deploy-firebase
description: Deploy your application to Firebase. Best for real-time apps with Firebase backend. Includes Hosting, Functions, and Firestore.
---

# Deploy to Firebase - Complete Beginner Guide

**Part of ASG AI S2PROD by [AIShift](https://aishift.dev/)**

---

## 💡 PHILOSOPHY (NON-NEGOTIABLE)

1. **ZERO ASSUMPTIONS**: You've never deployed anything before. That's okay.
2. **EXPLAIN EVERYTHING**: Every step, every button, every concept.
3. **COPY-PASTE READY**: All commands work as-is.
4. **FAIL-SAFE**: Verification after every action.

---

## 🎯 What is Firebase?

**Firebase** is Google's platform for building apps. It includes:

| Service | Purpose |
|---------|---------|
| **Hosting** | Deploy your website |
| **Firestore** | NoSQL database |
| **Authentication** | User login/signup |
| **Functions** | Serverless backend |
| **Storage** | File uploads |

**Why Firebase?**
- ✅ **All-in-one** - Database, auth, hosting, storage
- ✅ **Real-time updates** - Data syncs instantly
- ✅ **Google infrastructure** - Fast and reliable
- ✅ **Generous free tier** - Spark plan is free

**Best for:**
- Real-time applications (chat, collaboration)
- Apps already using Firebase Auth/Firestore
- Quick prototypes and MVPs

---

## 📋 PREREQUISITES

### 1. Google Account
You'll use your Google account to sign in.

### 2. Node.js 18+
```bash
node --version
```

### 3. Firebase CLI
```bash
npm install -g firebase-tools
```

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Login to Firebase

```bash
firebase login
```

This opens a browser window. Sign in with your Google account.

---

### Step 2: Create a Firebase Project

**Option A: Web Console (Easier)**
1. Go to https://console.firebase.google.com
2. Click **"Add project"**
3. Enter a project name: `my-app`
4. Disable Google Analytics (optional)
5. Click **"Create project"**

**Option B: CLI**
```bash
firebase projects:create my-app-name
```

---

### Step 3: Initialize Firebase in Your Project

```bash
cd your-project-folder
firebase init
```

**Select options (use spacebar to select):**
1. ◉ Hosting: Configure files for Firebase Hosting
2. ◉ Functions: (if you need backend)
3. ◉ Firestore: (if you need database)

**Answer the prompts:**
```
? Please select an option: Use an existing project
? Select a default Firebase project: my-app (my-app)
? What do you want to use as your public directory? dist
? Configure as a single-page app? Yes
? Set up automatic builds with GitHub? No (do this later if needed)
```

---

### Step 4: Build Your Project

```bash
npm run build
```

This creates the `dist` folder with your production files.

---

### Step 5: Deploy

```bash
firebase deploy
```

**Expected output:**
```
✔  Deploy complete!

Hosting URL: https://my-app.web.app
```

Your app is live! 🎉

---

## 🔥 Firebase Hosting Configuration

Your `firebase.json` should look like:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

## ⚡ Firebase Functions (Serverless Backend)

### Step 1: Initialize Functions

```bash
firebase init functions
```

Choose **JavaScript** or **TypeScript**.

### Step 2: Create a Function

Edit `functions/index.js`:

```javascript
const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.json({ message: "Hello from Firebase!" });
});
```

### Step 3: Deploy Functions

```bash
firebase deploy --only functions
```

### Step 4: Access Your Function

```
https://us-central1-my-app.cloudfunctions.net/helloWorld
```

---

## 🗄️ Firestore Database

### Enable Firestore

1. Go to Firebase Console
2. Click **"Firestore Database"** in sidebar
3. Click **"Create database"**
4. Choose **"Start in test mode"** (for development)
5. Select a location

### Use in Your App

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  // ... other config
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Add data
await addDoc(collection(db, "users"), {
  name: "John",
  email: "john@example.com"
});

// Read data
const snapshot = await getDocs(collection(db, "users"));
snapshot.forEach((doc) => {
  console.log(doc.id, doc.data());
});
```

---

## 🔗 Custom Domain

1. Go to Firebase Console → Hosting
2. Click **"Add custom domain"**
3. Enter your domain: `myapp.com`
4. Add the DNS records Firebase shows you
5. Wait for SSL certificate (can take up to 24 hours)

---

## 🛑 COMMON ISSUES

### "Error: No project active"
```bash
firebase use my-app
```

### "Permission denied"
Update Firestore rules in `firestore.rules`:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### "Functions deploy failed"
- Check Node.js version matches (use Node 18)
- Run `cd functions && npm install`

---

## ✅ COMPLETION CHECKLIST

- [ ] Firebase CLI installed
- [ ] Logged in (`firebase login`)
- [ ] Project created
- [ ] `firebase init` completed
- [ ] Project built (`npm run build`)
- [ ] Deployed (`firebase deploy`)
- [ ] Site accessible at `.web.app` URL
- [ ] (Optional) Custom domain added
- [ ] (Optional) Firestore enabled

---

**Powered by [AIShift](https://aishift.dev/)** - 10× Faster Development
