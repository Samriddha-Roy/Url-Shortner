@echo off
echo 🚀 Complete GitHub Setup for URL Shortener
echo ==========================================

echo.
echo Your repository details:
echo - GitHub Username: Samriddha-Roy
echo - Repository Name: url-shortener
echo - Repository URL: https://github.com/Samriddha-Roy/url-shortener
echo.

echo Step 1: Checking Git configuration...
git config --global user.name
git config --global user.email

echo.
echo Step 2: Checking current repository status...
git status

echo.
echo Step 3: Checking remote origin...
git remote -v

echo.
echo Step 4: Attempting to push to GitHub...
echo (Make sure you've created the repository on GitHub first!)
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ❌ Push failed! 
    echo.
    echo SOLUTION:
    echo 1. Go to: https://github.com/new
    echo 2. Repository name: url-shortener
    echo 3. Make it Public
    echo 4. DON'T initialize with README, .gitignore, or license
    echo 5. Click "Create repository"
    echo 6. Then run this script again
    echo.
    pause
    exit /b 1
)

echo.
echo ✅ SUCCESS! Your URL Shortener is now on GitHub!
echo.
echo 🌐 Repository URL: https://github.com/Samriddha-Roy/url-shortener
echo.
echo What's included in your repository:
echo ✅ Complete React frontend with Tailwind CSS
echo ✅ Node.js backend with Express
echo ✅ Docker support (basic, MongoDB, production)
echo ✅ CI/CD pipeline with GitHub Actions
echo ✅ Professional README with documentation
echo ✅ Contributing guidelines
echo ✅ MIT License
echo ✅ Security workflows
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Add repository topics/tags
echo 3. Enable GitHub Pages (optional)
echo 4. Star your own repository 😄
echo.
pause