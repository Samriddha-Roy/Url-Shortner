# 🐳 Docker Quick Start Guide

## 🚀 Super Simple Setup

### Step 1: Check Docker
Run this to check if Docker is ready:
```bash
docker-check.bat
```

### Step 2: Run the App
Choose one of these options:

#### Option A: Basic Version (Recommended for testing)
```bash
docker-compose up --build
```

#### Option B: With MongoDB (For persistence)
```bash
docker-compose --profile with-mongodb up --build
```

#### Option C: Production Setup (Full stack)
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Step 3: Open Your Browser
Go to: **http://localhost:3000**

## 🎯 What You Get

### Basic Version
- ✅ URL Shortener app
- ✅ React frontend
- ✅ In-memory database
- ✅ Perfect for testing

### With MongoDB
- ✅ Everything from basic
- ✅ Persistent MongoDB database
- ✅ Data survives container restarts

### Production Setup
- ✅ Everything from MongoDB version
- ✅ Redis caching
- ✅ Nginx reverse proxy (optional)
- ✅ Production optimizations

## 🛠️ Common Commands

```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down

# Stop and remove data
docker-compose down -v

# Restart
docker-compose restart
```

## 🔍 Troubleshooting

### Docker Desktop not running?
1. Start Docker Desktop
2. Wait for it to fully load
3. Run `docker-check.bat`

### Port 3000 already in use?
```bash
docker-compose down
# Then try again
```

### Build fails?
```bash
docker system prune -a
docker-compose build --no-cache
```

## 📱 Testing the App

Once running:
1. Open http://localhost:3000
2. Enter a long URL (e.g., https://www.google.com)
3. Click "Shorten URL"
4. Copy and test the short link
5. View statistics

## 🎉 That's It!

Your URL shortener is now running in Docker with:
- Professional React UI
- Scalable backend
- Optional database persistence
- Production-ready configuration

The Docker setup handles everything automatically!