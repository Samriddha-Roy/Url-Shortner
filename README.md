# 🔗 URL Shortener

A modern, scalable URL shortener built with React, Node.js, Express, and MongoDB. Features a beautiful UI, click analytics, and Docker support for easy deployment.

![URL Shortener Demo](https://img.shields.io/badge/demo-live-brightgreen)
![Docker](https://img.shields.io/badge/docker-ready-blue)
![React](https://img.shields.io/badge/react-18-61dafb)
![Node.js](https://img.shields.io/badge/node.js-18-green)

## ✨ Features

### 🎨 Frontend (React + Tailwind CSS)
- **Modern UI** - Clean, responsive design with Tailwind CSS
- **Real-time Feedback** - Toast notifications for user actions
- **URL Management** - Create, copy, and manage shortened URLs
- **Analytics Dashboard** - View click statistics and performance
- **Recent URLs** - Track your recently created short links
- **Mobile Responsive** - Works perfectly on all devices

### ⚡ Backend (Node.js + Express)
- **Fast API** - RESTful API with Express.js
- **Multiple Database Options** - MongoDB or in-memory for testing
- **Rate Limiting** - Protection against abuse (100 req/15min per IP)
- **Click Tracking** - Real-time analytics for shortened URLs
- **URL Validation** - Comprehensive input validation
- **Auto Expiration** - URLs expire after 30 days (configurable)

### 🐳 Docker Support
- **Multi-stage builds** - Optimized production images
- **Multiple configurations** - Basic, MongoDB, and production setups
- **Health checks** - Container monitoring and auto-restart
- **Security** - Non-root user, isolated networks

## 🚀 Quick Start

### Option 1: Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener

# Run with Docker
docker-compose up --build

# Open http://localhost:3000
```

### Option 2: Local Development
```bash
# Clone and install dependencies
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
npm install

# Build frontend
cd frontend && npm install && npm run build && cd ..

# Start the application
npm start

# Open http://localhost:3000
```

## 📋 API Endpoints

### Create Short URL
```http
POST /api/shorten
Content-Type: application/json

{
  "originalUrl": "https://example.com/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": "http://localhost:3000/abc1234",
  "shortCode": "abc1234",
  "originalUrl": "https://example.com/very/long/url"
}
```

### Get URL Statistics
```http
GET /api/stats/:shortCode
```

**Response:**
```json
{
  "originalUrl": "https://example.com/very/long/url",
  "shortCode": "abc1234",
  "clicks": 42,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Redirect to Original URL
```http
GET /:shortCode
```
Redirects to the original URL and increments click counter.

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications
- **Axios** - HTTP client for API calls

### Backend
- **Node.js 18** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (optional)
- **Mongoose** - MongoDB object modeling
- **nanoid** - URL-safe unique ID generator
- **express-rate-limit** - API protection

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy (production)
- **Redis** - Caching (production)

## 🐳 Docker Deployment

### Basic Setup (In-Memory Database)
```bash
docker-compose up --build
```

### With MongoDB
```bash
docker-compose --profile with-mongodb up --build
```

### Production Setup (MongoDB + Redis + Nginx)
```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Interactive Setup (Windows)
```bash
docker-run.bat
```

### Interactive Setup (Linux/Mac)
```bash
chmod +x docker-run.sh
./docker-run.sh
```

## 📁 Project Structure

```
url-shortener/
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.js            # Main app component
│   │   └── index.js          # Entry point
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies
├── src/                      # Backend application
│   ├── config/               # Configuration files
│   ├── middleware/           # Express middleware
│   ├── models/               # Database models
│   ├── routes/               # API routes
│   └── server.js             # Main server file
├── docker-compose.yml        # Docker configuration
├── Dockerfile               # Docker build instructions
├── package.json             # Backend dependencies
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file:
```env
PORT=3000
BASE_URL=http://localhost:3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/urlshortener  # Optional
```

### Docker Environment
```yaml
environment:
  - NODE_ENV=production
  - PORT=3000
  - BASE_URL=http://localhost:3000
  - MONGODB_URI=mongodb://admin:password123@mongodb:27017/urlshortener?authSource=admin
```

## 🚀 Deployment

### Heroku
```bash
# Install Heroku CLI and login
heroku create your-url-shortener
heroku config:set NODE_ENV=production
heroku config:set BASE_URL=https://your-url-shortener.herokuapp.com
git push heroku main
```

### DigitalOcean App Platform
1. Connect your GitHub repository
2. Set environment variables in the dashboard
3. Deploy with automatic builds

### AWS/GCP/Azure
Use the provided Docker configuration for container-based deployment.

## 🔒 Security Features

- **Rate Limiting** - 100 requests per 15 minutes per IP
- **Input Validation** - URL format and length validation
- **XSS Protection** - Sanitized inputs and outputs
- **CORS Configuration** - Controlled cross-origin requests
- **Environment Variables** - Sensitive data protection
- **Non-root Docker User** - Container security
- **Health Checks** - Application monitoring

## 📊 Performance Features

- **MongoDB Indexing** - Fast URL lookups
- **TTL Indexes** - Automatic cleanup of expired URLs
- **Connection Pooling** - Efficient database connections
- **Static File Serving** - Optimized asset delivery
- **Gzip Compression** - Reduced bandwidth usage
- **Docker Multi-stage Builds** - Smaller production images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [nanoid](https://github.com/ai/nanoid) for URL-safe ID generation
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful UI
- [Lucide](https://lucide.dev/) for the amazing icons
- [Docker](https://www.docker.com/) for containerization

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/yourusername/url-shortener/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide detailed information about your setup and the issue

---

⭐ **Star this repository if you found it helpful!**