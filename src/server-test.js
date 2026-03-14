require('dotenv').config();
const express = require('express');
const path = require('path');
const urlRoutes = require('./routes/url-test');
const rateLimiter = require('./middleware/rateLimiter');
const { UrlModel } = require('./config/memoryDB');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Starting URL Shortener with in-memory database...');

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Apply rate limiter only to API routes
app.use('/api', rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api', urlRoutes);

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Redirect short URL (must be last to avoid conflicts)
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    // Validate shortCode format
    if (!/^[A-Za-z0-9_-]{7}$/.test(shortCode)) {
      return res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    }
    
    const url = await UrlModel.findOne({ shortCode });
    
    if (!url) {
      return res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    }

    // Increment click count atomically
    await UrlModel.updateOne({ shortCode }, { $inc: { clicks: 1 } });

    res.redirect(301, url.originalUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 URL Shortener running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`📝 API docs: Check README.md for endpoints`);
});
// Serve React app for all other routes
app.get('*', (req, res) => {
  // Check if it's a short code (7 characters, alphanumeric)
  const shortCode = req.path.slice(1);
  if (/^[A-Za-z0-9_-]{7}$/.test(shortCode)) {
    // Handle URL redirect
    UrlModel.findOne({ shortCode })
      .then(url => {
        if (url) {
          // Increment click count
          UrlModel.updateOne({ shortCode }, { $inc: { clicks: 1 } });
          return res.redirect(301, url.originalUrl);
        }
        // If not found, serve React app (will show 404 page)
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
      })
      .catch(error => {
        console.error('Error redirecting:', error);
        res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
      });
  } else {
    // Serve React app for all other routes
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  }
});