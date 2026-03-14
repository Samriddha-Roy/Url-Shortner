# URL Shortener with React Frontend

A complete URL shortener application with a modern React frontend and Node.js backend.

## 🚀 Quick Start

### Option 1: Automatic Setup
```bash
npm run setup
npm run start:full
```

### Option 2: Manual Setup

1. **Install backend dependencies:**
```bash
npm install
```

2. **Setup frontend:**
```bash
cd frontend
npm install
npm run build
cd ..
```

3. **Start the application:**
```bash
npm run start:full
```

## 🌟 Features

### Frontend (React + Tailwind CSS)
- **Modern UI** - Clean, responsive design with Tailwind CSS
- **Real-time Feedback** - Toast notifications for user actions
- **URL Management** - Create, copy, and manage shortened URLs
- **Analytics Dashboard** - View click statistics and performance
- **Recent URLs** - Track your recently created short links
- **Mobile Responsive** - Works perfectly on all devices

### Backend (Node.js + Express)
- **Fast API** - RESTful API with Express.js
- **In-Memory Database** - No MongoDB setup required for testing
- **Rate Limiting** - Protection against abuse
- **Click Tracking** - Analytics for shortened URLs
- **URL Validation** - Comprehensive input validation

## 📱 User Interface

The React frontend provides:

1. **URL Shortening Form** - Simple, intuitive interface
2. **Results Display** - Shows both short and original URLs
3. **Action Buttons** - Copy, open, and view statistics
4. **Statistics Modal** - Detailed analytics popup
5. **Recent URLs Panel** - Quick access to recent links
6. **Responsive Design** - Mobile-first approach

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **nanoid** - URL-safe ID generation
- **express-rate-limit** - API protection

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm start  # Runs on http://localhost:3001
```

### Backend Development
```bash
npm run dev  # Runs on http://localhost:3000
```

### Production Build
```bash
cd frontend
npm run build
cd ..
npm run start:full
```

## 📊 API Endpoints

- `POST /api/shorten` - Create short URL
- `GET /api/stats/:shortCode` - Get URL statistics
- `GET /:shortCode` - Redirect to original URL
- `GET /health` - Health check

## 🎨 UI Components

- **URLShortener** - Main application component
- **URLForm** - URL input form
- **URLResult** - Results display
- **URLStats** - Statistics modal
- **RecentURLs** - Recent links panel
- **Header/Footer** - Layout components

## 🚀 Deployment

The application is ready for deployment to platforms like:
- Heroku
- Vercel
- Netlify
- DigitalOcean App Platform

## 📝 Environment Variables

```env
PORT=3000
BASE_URL=http://localhost:3000
NODE_ENV=development
```

## 🎯 Next Steps

To enhance the application further:
1. Add user authentication
2. Implement custom short codes
3. Add MongoDB for persistence
4. Include more detailed analytics
5. Add bulk URL shortening
6. Implement QR code generation

The application is now ready to use with a beautiful, modern interface!