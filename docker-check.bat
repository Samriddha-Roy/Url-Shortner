@echo off
echo 🐳 Docker Setup Checker
echo =====================

echo Checking Docker installation...
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed
    echo Please install Docker Desktop from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo ✅ Docker is installed
echo.

echo Checking if Docker Desktop is running...
docker info >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Desktop is not running
    echo.
    echo Please:
    echo 1. Start Docker Desktop
    echo 2. Wait for it to fully start
    echo 3. Run this script again
    echo.
    echo Starting Docker Desktop for you...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo.
    echo Waiting for Docker Desktop to start...
    echo This may take 30-60 seconds...
    
    :wait_loop
    timeout /t 5 /nobreak >nul
    docker info >nul 2>&1
    if errorlevel 1 (
        echo Still waiting...
        goto wait_loop
    )
    
    echo ✅ Docker Desktop is now running!
) else (
    echo ✅ Docker Desktop is running
)

echo.
echo 🚀 Ready to build and run the URL Shortener!
echo.
echo Choose what to do next:
echo 1) Build and run basic version (In-memory database)
echo 2) Build and run with MongoDB
echo 3) Just build the Docker image
echo 4) Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto basic
if "%choice%"=="2" goto mongodb
if "%choice%"=="3" goto build
if "%choice%"=="4" goto exit

:basic
echo 🏗️ Building and running basic version...
docker-compose up --build -d
if errorlevel 1 (
    echo ❌ Build failed. Check the error above.
    pause
    exit /b 1
)
echo ✅ URL Shortener is running!
echo 🌐 Open: http://localhost:3000
goto success

:mongodb
echo 🏗️ Building and running with MongoDB...
docker-compose --profile with-mongodb up --build -d
if errorlevel 1 (
    echo ❌ Build failed. Check the error above.
    pause
    exit /b 1
)
echo ✅ URL Shortener with MongoDB is running!
echo 🌐 App: http://localhost:3000
echo 🗄️ MongoDB: localhost:27017
goto success

:build
echo 🏗️ Building Docker image...
docker-compose build
if errorlevel 1 (
    echo ❌ Build failed. Check the error above.
    pause
    exit /b 1
)
echo ✅ Docker image built successfully!
goto success

:success
echo.
echo 📋 Useful commands:
echo - View logs: docker-compose logs -f
echo - Stop: docker-compose down
echo - Restart: docker-compose restart
echo.

:exit
pause