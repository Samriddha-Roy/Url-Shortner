# 🐳 Docker Setup for URL Shortener

Complete Docker configuration for running the URL Shortener application with different setups.

## 🚀 Quick Start

### Windows Users:
```bash
docker-run.bat
```

### Linux/Mac Users:
```bash
chmod +x docker-run.sh
./docker-run.sh
```

## 📋 Available Configurations

### 1. Basic Setup (In-Memory Database)
- **Container**: URL Shortener app only
- **Database**: In-memory (no persistence)
- **Best for**: Testing and development

```bash
docker-compose up --build
```

### 2. With MongoDB
- **Containers**: App + MongoDB
- **Database**: Persistent MongoDB
- **Best for**: Development with data persistence

```bash
docker-compose --profile with-mongodb up --build
```

### 3. Production Setup
- **Containers**: App + MongoDB + Redis + Nginx (optional)
- **Features**: Full production stack
- **Best for**: Production deployment

```bash
docker-compose -f docker-compose.prod.yml up --build
```

## 🔧 Manual Docker Commands

### Build the Docker Image
```bash
docker build -t url-shortener .
```

### Run Single Container
```bash
docker run -p 3000:3000 --name url-shortener-app url-shortener
```

### Run with Environment Variables
```bash
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e BASE_URL=http://localhost:3000 \
  --name url-shortener-app \
  url-shortener
```

## 📊 Container Information

### Ports
- **3000**: Main application
- **27017**: MongoDB (when enabled)
- **6379**: Redis (when enabled)
- **80**: Nginx (when enabled)

### Volumes
- **mongodb_data**: MongoDB persistent storage
- **redis_data**: Redis persistent storage
- **./logs**: Application logs

### Health Checks
- **App**: `http://localhost:3000/health`
- **MongoDB**: Automatic connection check
- **Redis**: Automatic ping check

## 🛠️ Development

### View Logs
```bash
# All containers
docker-compose logs -f

# Specific container
docker-compose logs -f url-shortener
```

### Access Container Shell
```bash
docker exec -it url-shortener-app sh
```

### Stop Containers
```bash
# Basic setup
docker-compose down

# Production setup
docker-compose -f docker-compose.prod.yml down

# Remove volumes too
docker-compose down -v
```

## 🔒 Security Features

### Docker Security
- **Non-root user**: App runs as nodejs user
- **Multi-stage build**: Smaller final image
- **Health checks**: Container monitoring
- **.dockerignore**: Excludes sensitive files

### Nginx Security (Production)
- **Rate limiting**: API and redirect protection
- **Security headers**: XSS, CSRF protection
- **Gzip compression**: Better performance

## 🌐 Environment Variables

### Required
- `NODE_ENV`: production/development
- `PORT`: Application port (default: 3000)
- `BASE_URL`: Base URL for short links

### Optional (MongoDB Setup)
- `MONGODB_URI`: MongoDB connection string

### Docker Compose Variables
```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
  - BASE_URL=http://localhost:3000
  - MONGODB_URI=mongodb://admin:password123@mongodb:27017/urlshortener?authSource=admin
```

## 📈 Scaling

### Horizontal Scaling
```bash
docker-compose up --scale url-shortener=3
```

### Load Balancer (Nginx)
```bash
docker-compose -f docker-compose.prod.yml --profile with-nginx up
```

## 🔍 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   docker-compose down
   # Or change port in docker-compose.yml
   ```

2. **Permission denied**
   ```bash
   chmod +x docker-run.sh
   ```

3. **Docker not running**
   - Start Docker Desktop
   - Check: `docker info`

4. **Build fails**
   ```bash
   docker system prune -a
   docker-compose build --no-cache
   ```

### View Container Status
```bash
docker-compose ps
docker stats
```

### Clean Up
```bash
# Remove containers and networks
docker-compose down

# Remove everything including volumes
docker-compose down -v

# Remove all unused Docker resources
docker system prune -a
```

## 🚀 Production Deployment

For production deployment:

1. **Use production compose file**
2. **Set proper environment variables**
3. **Configure reverse proxy (Nginx)**
4. **Set up SSL certificates**
5. **Configure monitoring and logging**
6. **Set up backup for MongoDB**

The Docker setup is production-ready with security best practices, health checks, and scalability options!