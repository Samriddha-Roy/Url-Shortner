#!/bin/bash

# URL Shortener Docker Runner Script

set -e

echo "🐳 URL Shortener Docker Setup"
echo "=============================="

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "❌ Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
    echo "✅ Docker is running"
}

# Function to build and run basic version
run_basic() {
    echo "🚀 Building and running URL Shortener (In-Memory Database)..."
    
    # Stop existing containers
    docker-compose down 2>/dev/null || true
    
    # Build and run
    docker-compose up --build -d
    
    echo "✅ URL Shortener is running!"
    echo "🌐 Open: http://localhost:3000"
    echo "📊 Health: http://localhost:3000/health"
    echo ""
    echo "To stop: docker-compose down"
}

# Function to run with MongoDB
run_with_mongodb() {
    echo "🚀 Building and running URL Shortener with MongoDB..."
    
    # Stop existing containers
    docker-compose down 2>/dev/null || true
    
    # Run with MongoDB profile
    docker-compose --profile with-mongodb up --build -d
    
    echo "✅ URL Shortener with MongoDB is running!"
    echo "🌐 App: http://localhost:3000"
    echo "🗄️  MongoDB: localhost:27017"
    echo "📊 Health: http://localhost:3000/health"
    echo ""
    echo "To stop: docker-compose down"
}

# Function to run production setup
run_production() {
    echo "🚀 Building and running Production setup..."
    
    # Stop existing containers
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    
    # Run production setup
    docker-compose -f docker-compose.prod.yml up --build -d
    
    echo "✅ Production setup is running!"
    echo "🌐 App: http://localhost:3000"
    echo "🗄️  MongoDB: localhost:27017"
    echo "🔄 Redis: localhost:6379"
    echo "📊 Health: http://localhost:3000/health"
    echo ""
    echo "To stop: docker-compose -f docker-compose.prod.yml down"
}

# Function to show logs
show_logs() {
    echo "📋 Showing container logs..."
    docker-compose logs -f
}

# Function to stop all containers
stop_all() {
    echo "🛑 Stopping all containers..."
    docker-compose down 2>/dev/null || true
    docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
    echo "✅ All containers stopped"
}

# Main menu
show_menu() {
    echo ""
    echo "Choose an option:"
    echo "1) Run Basic (In-Memory Database)"
    echo "2) Run with MongoDB"
    echo "3) Run Production Setup (MongoDB + Redis)"
    echo "4) Show Logs"
    echo "5) Stop All Containers"
    echo "6) Exit"
    echo ""
}

# Check Docker first
check_docker

# Main loop
while true; do
    show_menu
    read -p "Enter your choice (1-6): " choice
    
    case $choice in
        1)
            run_basic
            ;;
        2)
            run_with_mongodb
            ;;
        3)
            run_production
            ;;
        4)
            show_logs
            ;;
        5)
            stop_all
            ;;
        6)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please choose 1-6."
            ;;
    esac
    
    echo ""
    read -p "Press Enter to continue..."
done