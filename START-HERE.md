# 🚀 START HERE - URL Shortener

## ⚠️ IMPORTANT: Use the RIGHT command!

### ✅ TO RUN THE APP (No MongoDB needed):
```bash
npm start
```
This runs the **test server** with in-memory database.

### ❌ DON'T USE (requires MongoDB):
```bash
npm run start:mongodb
npm run dev
```

## 🎯 Quick Start (3 steps):

### 1. Install dependencies:
```bash
npm install
```

### 2. Build the React frontend:
```bash
npm run build-frontend
```

### 3. Start the application:
```bash
npm start
```

### 4. Open your browser:
```
http://localhost:3000
```

## 🎉 That's it!

You'll see a beautiful React interface where you can:
- Shorten URLs instantly
- Copy short links
- View click statistics
- See recent URLs

## 🔧 If you want MongoDB later:
1. Install MongoDB or get MongoDB Atlas connection string
2. Update `.env` file with `MONGODB_URI`
3. Run: `npm run start:mongodb`

## 📁 Project Structure:
- `src/server-test.js` - Main server (no MongoDB)
- `src/server.js` - MongoDB server
- `frontend/` - React app with Tailwind CSS