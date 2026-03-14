// MongoDB initialization script
db = db.getSiblingDB('urlshortener');

// Create collections
db.createCollection('urls');

// Create indexes for better performance
db.urls.createIndex({ "shortCode": 1 }, { unique: true });
db.urls.createIndex({ "originalUrl": 1 });
db.urls.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 2592000 }); // 30 days TTL

// Insert sample data (optional)
db.urls.insertOne({
  originalUrl: "https://www.example.com",
  shortCode: "example",
  clicks: 0,
  createdAt: new Date()
});

print("Database initialized successfully!");