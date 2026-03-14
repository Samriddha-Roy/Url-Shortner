// Simple in-memory database for testing without MongoDB
class MemoryDB {
  constructor() {
    this.urls = new Map();
    this.shortCodes = new Set();
  }

  async findOne(query) {
    if (query.shortCode) {
      return this.urls.get(query.shortCode) || null;
    }
    if (query.originalUrl) {
      for (let [shortCode, url] of this.urls) {
        if (url.originalUrl === query.originalUrl) {
          return url;
        }
      }
    }
    return null;
  }

  async save(urlData) {
    const url = {
      originalUrl: urlData.originalUrl,
      shortCode: urlData.shortCode,
      clicks: urlData.clicks || 0,
      createdAt: new Date()
    };
    this.urls.set(urlData.shortCode, url);
    this.shortCodes.add(urlData.shortCode);
    return url;
  }

  async updateOne(query, update) {
    if (query.shortCode && this.urls.has(query.shortCode)) {
      const url = this.urls.get(query.shortCode);
      if (update.$inc && update.$inc.clicks) {
        url.clicks += update.$inc.clicks;
      }
      this.urls.set(query.shortCode, url);
    }
  }
}

const memoryDB = new MemoryDB();

// Mock Mongoose model
class UrlModel {
  constructor(data) {
    this.originalUrl = data.originalUrl;
    this.shortCode = data.shortCode;
    this.clicks = data.clicks || 0;
    this.createdAt = new Date();
  }

  async save() {
    return await memoryDB.save(this);
  }

  static async findOne(query) {
    return await memoryDB.findOne(query);
  }

  static async updateOne(query, update) {
    return await memoryDB.updateOne(query, update);
  }
}

module.exports = { UrlModel, memoryDB };