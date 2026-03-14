require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const urlRoutes = require('./routes/url');
const rateLimiter = require('./middleware/rateLimiter');
const Url = require('./models/Url');

// Validate required environment variables
if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI environment variable is required');
  process.exit(1);
}

if (!process.env.BASE_URL) {
  console.error('BASE_URL environment variable is required');
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply rate limiter only to API routes
app.use('/api', rateLimiter);

// Routes
app.use('/api', urlRoutes);

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Redirect short URL
app.get('/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    // Validate shortCode format
    if (!/^[A-Za-z0-9_-]{7}$/.test(shortCode)) {
      return res.status(404).json({ error: 'Invalid short code format' });
    }
    
    const url = await Url.findOne({ shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    // Increment click count atomically
    await Url.updateOne({ shortCode }, { $inc: { clicks: 1 } });

    res.redirect(301, url.originalUrl);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
