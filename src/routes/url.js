const express = require('express');
const router = express.Router();
const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../models/Url');

// Create short URL
router.post('/shorten', async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl || typeof originalUrl !== 'string') {
      return res.status(400).json({ error: 'URL is required and must be a string' });
    }

    // Trim and validate URL
    const trimmedUrl = originalUrl.trim();
    if (!validUrl.isUri(trimmedUrl)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    // Check URL length
    if (trimmedUrl.length > 2048) {
      return res.status(400).json({ error: 'URL too long (max 2048 characters)' });
    }

    // Check if URL already exists
    let url = await Url.findOne({ originalUrl: trimmedUrl });
    
    if (url) {
      return res.json({
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
        shortCode: url.shortCode,
        originalUrl: url.originalUrl
      });
    }

    // Generate unique short code with retry logic
    let shortCode;
    let attempts = 0;
    const maxAttempts = 5;
    
    do {
      shortCode = nanoid(7);
      const existingUrl = await Url.findOne({ shortCode });
      if (!existingUrl) break;
      attempts++;
    } while (attempts < maxAttempts);
    
    if (attempts >= maxAttempts) {
      return res.status(500).json({ error: 'Unable to generate unique short code' });
    }
    
    url = new Url({
      originalUrl: trimmedUrl,
      shortCode
    });

    await url.save();

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      shortCode: url.shortCode,
      originalUrl: url.originalUrl
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Short code already exists, please try again' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
});

// Get URL stats
router.get('/stats/:shortCode', async (req, res) => {
  try {
    const { shortCode } = req.params;
    
    // Validate shortCode format
    if (!/^[A-Za-z0-9_-]{7}$/.test(shortCode)) {
      return res.status(400).json({ error: 'Invalid short code format' });
    }
    
    const url = await Url.findOne({ shortCode });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json({
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      clicks: url.clicks,
      createdAt: url.createdAt
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
