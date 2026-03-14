@echo off
echo 🚀 GitHub Push Helper
echo ===================

echo.
echo Before running this script, make sure you have:
echo 1. Created a repository on GitHub
echo 2. Have your GitHub username ready
echo.

set /p username="Enter your GitHub username: "
set /p reponame="Enter repository name (default: url-shortener): "

if "%reponame%"=="" set reponame=url-shortener

echo.
echo Setting up remote origin...
git remote add origin https://github.com/%username%/%reponame%.git

echo.
echo Pushing to GitHub...
git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Push failed. This might be because:
    echo 1. Repository already exists with different content
    echo 2. Authentication issues
    echo 3. Network problems
    echo.
    echo Try these solutions:
    echo 1. Force push: git push -u origin main --force
    echo 2. Check your GitHub credentials
    echo 3. Make sure the repository exists on GitHub
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ Successfully pushed to GitHub!
echo 🌐 Your repository: https://github.com/%username%/%reponame%
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Add a description and topics
echo 3. Enable GitHub Pages if desired
echo 4. Set up branch protection rules
echo.
pause