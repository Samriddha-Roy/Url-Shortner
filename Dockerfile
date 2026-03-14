# Multi-stage build for React + Node.js
FROM node:18-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package files
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm ci --only=production

# Copy frontend source code
COPY frontend/ ./

# Build React app
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy backend package files
COPY package*.json ./

# Install backend dependencies
RUN npm ci --only=production

# Copy backend source code
COPY src/ ./src/
COPY .env ./

# Copy built React app from frontend-build stage
COPY --from=frontend-build /app/frontend/build ./frontend/build

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "start"]