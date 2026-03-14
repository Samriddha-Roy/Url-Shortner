@echo off
setlocal enabledelayedexpansion

echo 🐳 URL Shortener Docker Setup
echo ==============================

REM Check if Docker is running
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not running. Please start Docker Desktop and try again.
    pause
    exit /b 1
)
echo ✅ Docker is running

:menu
echo.
echo Choose an option:
echo 1) Run Basic (In-Memory Database)
echo 2) Run with MongoDB
echo 3) Run Production Setup (MongoDB + Redis)
echo 4) Show Logs
echo 5) Stop All Containers
echo 6) Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto basic
if "%choice%"=="2" goto mongodb
if "%choice%"=="3" goto production
if "%choice%"=="4" goto logs
if "%choice%"=="5" goto stop
if "%choice%"=="6" goto exit
echo ❌ Invalid option. Please choose 1-6.
goto menu

:basic
echo 🚀 Building and running URL Shortener (In-Memory Database)...
docker-compose down >nul 2>&1
docker-compose up --build -d
echo ✅ URL Shortener is running!
echo 🌐 Open: http://localhost:3000
echo 📊 Health: http://localhost:3000/health
echo.
echo To stop: docker-compose down
goto continue

:mongodb
echo 🚀 Building and running URL Shortener with MongoDB...
docker-compose down >nul 2>&1
docker-compose --profile with-mongodb up --build -d
echo ✅ URL Shortener with MongoDB is running!
echo 🌐 App: http://localhost:3000
echo 🗄️  MongoDB: localhost:27017
echo 📊 Health: http://localhost:3000/health
echo.
echo To stop: docker-compose down
goto continue

:production
echo 🚀 Building and running Production setup...
docker-compose -f docker-compose.prod.yml down >nul 2>&1
docker-compose -f docker-compose.prod.yml up --build -d
echo ✅ Production setup is running!
echo 🌐 App: http://localhost:3000
echo 🗄️  MongoDB: localhost:27017
echo 🔄 Redis: localhost:6379
echo 📊 Health: http://localhost:3000/health
echo.
echo To stop: docker-compose -f docker-compose.prod.yml down
goto continue

:logs
echo 📋 Showing container logs...
docker-compose logs -f
goto continue

:stop
echo 🛑 Stopping all containers...
docker-compose down >nul 2>&1
docker-compose -f docker-compose.prod.yml down >nul 2>&1
echo ✅ All containers stopped
goto continue

:continue
echo.
pause
goto menu

:exit
echo 👋 Goodbye!
pause
exit /b 0